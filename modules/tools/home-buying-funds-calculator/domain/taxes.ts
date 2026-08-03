/**
 * 주택 매수 관련 세금 계산 함수
 */

import type { HomeBuyingInput } from './types.ts';

// 「지방세법」 제11조제1항제8호 가목~다목 (2026-01-01 시행, 공포일자 2025.12.31., 법률 제21308호)
// 무주택자·1주택자의 유상거래 주택 취득 표준세율 구간 경계값.
// 원문(law.go.kr, MST=282559, JO=001100):
//   가. 취득당시가액이 6억원 이하인 주택: 1천분의 10
//   나. 6억원 초과 9억원 이하: (취득당시가액 × 2 / 3억원 − 3) × 1/100
//       (소수점 다섯째자리에서 반올림하여 넷째자리까지 계산)
//   다. 9억원을 초과하는 주택: 1천분의 30
const STANDARD_RATE_LOWER_THRESHOLD = 600_000_000; // 6억원
const STANDARD_RATE_UPPER_THRESHOLD = 900_000_000; // 9억원

/**
 * 무주택자·1주택자의 유상거래 주택 취득 표준세율 기준 산출세액
 * 「지방세법」 제11조제1항제8호 가목~다목
 */
function calculateStandardHomeAcquisitionTax(salePrice: number): number {
  if (salePrice <= STANDARD_RATE_LOWER_THRESHOLD) {
    return Math.floor(salePrice * 0.01); // 가목: 1%
  }

  if (salePrice <= STANDARD_RATE_UPPER_THRESHOLD) {
    // 나목: (취득당시가액 × 2 / 3억원 − 3) × 1/100, 소수점 넷째자리까지 반올림
    const rawRate = (salePrice / 300_000_000) * 2 - 3;
    const percentRate = rawRate / 100;
    const roundedRate = Math.round(percentRate * 10_000) / 10_000;
    return Math.floor(salePrice * roundedRate);
  }

  return Math.floor(salePrice * 0.03); // 다목: 3%
}

/**
 * 취득세 계산
 * 주택 수, 지역, 면적, 생애최초 여부에 따라 세율 차등 적용
 */
export function calculateAcquisitionTax(input: HomeBuyingInput): number {
  const { salePrice, houseCount, isAdjustedArea, isTempTwoHouse, isFirstTime } =
    input;

  let rate = 0;

  // 생애최초 주택 구입 취득세 감면
  // 「지방세특례제한법」 제36조의3제1항 (2026-08-03 기준, [시행 2026.6.2.] [법률 제21738호])
  // 요건: 본인 및 배우자가 주택을 "소유한 사실이 없는 경우"(houseCount === 0으로 근사)로서
  //       취득당시가액 12억원 이하인 주택을 유상거래로 취득. 전용면적(85㎡ 등) 요건은 없음.
  if (
    isFirstTime &&
    houseCount === 0 &&
    salePrice <= 1_200_000_000 // 12억원 (제1항 본문)
  ) {
    const standardTax = calculateStandardHomeAcquisitionTax(salePrice);

    // 제1항제2호: 제1호 외 주택 — 산출세액 200만원 이하 면제, 초과분은 산출세액에서 200만원 공제.
    // 제1항제1호(전용 60㎡ 이하 공동주택/도시형생활주택, 다가구주택, 인구감소지역 주택)는
    // 300만원 한도가 적용되지만 이를 판별할 입력값이 없어 미구현 — 해당 유형이면 실제 감면 폭이
    // 여기 계산보다 더 클 수 있음(최대 100만원 차이).
    // 그 외 미성년자 취득 제외(제1항 단서), 3년 내 처분·타용도 사용 시 추징(제4항),
    // 2028-12-31 일몰(제1항 본문)도 모델링하지 않음.
    const FIRST_TIME_RELIEF_DEDUCTION = 2_000_000; // 200만원
    return standardTax <= FIRST_TIME_RELIEF_DEDUCTION
      ? 0
      : standardTax - FIRST_TIME_RELIEF_DEDUCTION;
  }

  // 일시적 2주택 (종전 주택 매도 조건)
  // 참고: 아래는 가격 구간과 무관하게 1%로 고정하는 기존 단순화 로직으로, 이번 태스크의
  // 검증 범위(제36조의3, 제11조제1항제8호)에 포함되지 않아 손대지 않았음. 고가 일시적
  // 2주택의 경우 실제로는 표준세율표(가~다목)를 적용해야 하므로 추가 검증이 필요할 수 있음.
  if (isTempTwoHouse && houseCount === 2) {
    rate = 0.01; // 1% (일반세율)
  } else if (houseCount === 0 || houseCount === 1) {
    // 무주택자 또는 1주택자 기본 세율 (지방세법 제11조제1항제8호 가~다목)
    return calculateStandardHomeAcquisitionTax(salePrice);
  } else if (houseCount === 2) {
    // 2주택자
    if (isAdjustedArea) {
      rate = 0.08; // 조정지역 8%
    } else {
      rate = 0.01; // 비조정 1%
    }
  } else if (houseCount >= 3) {
    // 3주택 이상
    if (isAdjustedArea) {
      rate = 0.12; // 조정지역 12%
    } else {
      rate = 0.03; // 비조정 3%
    }
  }

  return Math.floor(salePrice * rate);
}

/**
 * 지방교육세 계산
 * 취득세의 10%
 */
export function calculateLocalEducationTax(acquisitionTax: number): number {
  return Math.floor(acquisitionTax * 0.1);
}

/**
 * 농어촌특별세 계산
 * 조건에 따라 취득세의 10% 또는 면제
 */
export function calculateRuralSpecialTax(
  input: HomeBuyingInput,
  acquisitionTax: number
): number {
  const { houseCount, salePrice, isOver85m2 } = input;

  // 무주택 또는 1주택, 85㎡ 이하, 6억 이하 면제
  if (
    (houseCount === 0 || houseCount === 1) &&
    !isOver85m2 &&
    salePrice <= 600_000_000
  ) {
    return 0;
  }

  // 그 외 취득세의 10%
  return Math.floor(acquisitionTax * 0.1);
}

/**
 * 등록면허세 계산
 * 표준주택가격(시가표준액)의 0.2%
 */
export function calculateRegistrationTax(standardPrice: number): number {
  return Math.floor(standardPrice * 0.002);
}

/**
 * 인지세 계산
 * 대출금액 구간별 고정 금액
 */
export function calculateStampTax(loanAmount: number): number {
  if (loanAmount === 0) return 0;
  if (loanAmount <= 10_000_000) return 0;
  if (loanAmount <= 50_000_000) return 50_000;
  if (loanAmount <= 100_000_000) return 100_000;
  return 150_000;
}

/**
 * 국민주택채권 실부담액 계산
 * 지역별 요율 적용 후 할인율 반영
 */
export function calculateNationalHousingBond(
  standardPrice: number,
  isMetro: boolean
): number {
  let rate = 0;

  // 시가표준액 구간별 요율 적용
  if (standardPrice < 20_000_000) {
    rate = 0;
  } else if (standardPrice < 50_000_000) {
    rate = 0.013;
  } else if (standardPrice < 100_000_000) {
    rate = isMetro ? 0.019 : 0.014;
  } else if (standardPrice < 160_000_000) {
    rate = isMetro ? 0.021 : 0.016;
  } else if (standardPrice < 260_000_000) {
    rate = isMetro ? 0.023 : 0.018;
  } else if (standardPrice < 600_000_000) {
    rate = isMetro ? 0.026 : 0.021;
  } else {
    rate = isMetro ? 0.031 : 0.026;
  }

  const bondAmount = Math.floor(standardPrice * rate);
  // 즉시 매각 시 약 88~90% 가격으로 매도 = 약 10~12% 손실
  // 보수적으로 12% 손실 기준 적용
  return Math.floor(bondAmount * 0.12);
}

/**
 * 방공제 금액 계산
 * 소액임차인 최우선변제 보호를 위해 은행이 대출금액에서 차감하는 금액
 * 지역별로 다른 기준 적용
 */
export function calculateDefenseFundAmount(
  regionalType: 'seoul' | 'overconcentration' | 'metro' | 'other'
): number {
  switch (regionalType) {
    case 'seoul':
      return 55_000_000; // 서울: 5,500만원
    case 'overconcentration':
      return 50_000_000; // 과밀억제권역: 5,000만원
    case 'metro':
      return 28_000_000; // 광역시: 2,800만원
    case 'other':
      return 20_000_000; // 기타: 2,000만원
    default:
      return 20_000_000;
  }
}

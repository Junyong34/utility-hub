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
 *
 * 나목 구간은 BigInt 정수 연산으로 계산한다. `(salePrice / 300_000_000) * 2 - 3`처럼
 * 부동소수점 나눗셈을 거치면 이진수로 정확히 표현되지 않는 값(예: 0.01005)이 생겨
 * 정확히 .5에서 반올림해야 하는 지점(예: 600,750,000원 → 1.005% → 1.01%)에서
 * `Math.round`가 100.5 대신 99.99999999999999… 같은 값을 보고 한 자리 낮게
 * 반올림하는 사례가 실측으로 확인됐다(200개 tie 중 61개). 아래는 그 오차를 원천 차단한다.
 */
export function calculateStandardHomeAcquisitionTax(salePrice: number): number {
  // 리포지토리 tsconfig의 target(ES2017)이 BigInt 리터럴(`1n`) 문법을 emit할 수 없어
  // `BigInt(...)` 함수 호출 형태만 사용한다(값 자체는 리터럴과 동일하게 동작한다).
  const price = BigInt(salePrice);

  if (salePrice <= STANDARD_RATE_LOWER_THRESHOLD) {
    // 가목: 1천분의 10 = 1%. BigInt 정수 나눗셈(양수이므로 절사=버림)으로 계산해
    // 부동소수점 표현 오차 가능성을 배제한다.
    return Number((price * BigInt(1)) / BigInt(100));
  }

  if (salePrice <= STANDARD_RATE_UPPER_THRESHOLD) {
    // 나목: 세율 = (취득당시가액 × 2 / 3억원 − 3) × 1/100, 소수점 다섯째자리에서
    // 반올림하여 넷째자리까지 계산한다.
    //
    // 세율 × 10000 = (2 × salePrice − 9억) / 300만 을 정수(BigInt) 연산으로 구한다.
    // 이 구간(6억 초과 9억 이하)에서는 분자가 항상 양수이므로,
    // round-half-up(a / b) = floor((a + b/2) / b) (b가 짝수일 때 항상 성립) 공식을
    // 그대로 정수 나눗셈에 적용하면 부동소수점을 전혀 거치지 않고 정확한 반올림을 얻는다.
    const numerator = BigInt(2) * price - BigInt(900_000_000);
    const divisor = BigInt(3_000_000); // 항상 짝수
    const roundedRatePer10000 = (numerator + divisor / BigInt(2)) / divisor;
    // 산출세액 = salePrice × (roundedRatePer10000 / 10000), 원 단위 절사(버림)
    return Number((price * roundedRatePer10000) / BigInt(10_000));
  }

  // 다목: 1천분의 30 = 3%
  return Number((price * BigInt(3)) / BigInt(100));
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
 * 지방교육세 과세표준(취득세분) 계산.
 *
 * 「지방세법」 제151조제1항제1호 본문 + 제11조제1항제8호 특칙(law.go.kr, MST=282559,
 * JO=015100, 조문시행일자 2026-01-01) 원문:
 *   "취득물건에 대하여 … 과세표준에 제11조제1항제1호부터 제7호까지와 제12조의 세율에서
 *   1천분의 20을 뺀 세율을 적용하여 산출한 금액(제11조제1항제8호의 경우에는 해당 세율에
 *   100분의 50을 곱한 세율을 적용하여 산출한 금액)의 100분의 20."
 * 즉 주택 유상취득(제8호)의 지방교육세는 "과세표준 × (제8호 표준세율 × 50%) × 20%"이며,
 * 이는 표준세율 기준 산출세액 × 10%와 같다 — 실제로 감면을 받았는지와 무관하게 표준세율
 * 기준으로 계산한다는 뜻이다.
 *
 * 다만 같은 항 제1호다목은 "지방세감면법령에서 취득세의 감면율을 정하는 경우"에 한해
 * 지방교육세도 같은 감면율만큼 줄여준다고 정하는데, 「지방세특례제한법」 제36조의3의 생애최초
 * 감면은 비율(%)이 아니라 정액(200만원) 공제 방식이라 이 다목의 "감면율"에 해당하지 않는다.
 * 따라서 생애최초 감면이 적용돼도 지방교육세 과세표준은 줄어들지 않고, 감면 전 표준세율
 * 기준 산출세액을 그대로 사용해야 한다.
 *
 * 이 보정은 무주택자·1주택자(제11조제1항제8호가 실제로 적용되는 구간)에 자동 계산으로
 * 생애최초 감면이 적용된 경우에만 유효하다. 사용자가 취득세를 직접 입력했다면(manualAcquisitionTax)
 * 그 값을 그대로 지방교육세 기준으로 쓴다. 다주택 중과(제13조의2, 제151조제1항제1호나목 적용
 * 대상)는 이번 검증 범위 밖이라 손대지 않고 기존처럼 실제 취득세를 그대로 사용한다.
 */
export function calculateLocalEducationTaxBase(
  input: HomeBuyingInput,
  acquisitionTax: number
): number {
  const isAutoCalculatedFirstTimeRelief =
    input.manualAcquisitionTax === undefined &&
    input.isFirstTime &&
    input.houseCount === 0 &&
    input.salePrice <= 1_200_000_000;

  return isAutoCalculatedFirstTimeRelief
    ? calculateStandardHomeAcquisitionTax(input.salePrice)
    : acquisitionTax;
}

/**
 * 지방교육세 계산
 * 과세표준(취득세분 산출세액, `calculateLocalEducationTaxBase` 참고)의 10%
 */
export function calculateLocalEducationTax(acquisitionTax: number): number {
  return Math.floor(acquisitionTax * 0.1);
}

/**
 * 농어촌특별세 계산
 * 조건에 따라 취득세의 10% 또는 면제
 *
 * ⚠ 미해결 사항(2026-08-03 fix round 1 조사): 「농어촌특별세법」 제5조제1항(law.go.kr,
 * MST=285905, JO=000500)에는 이 세액 계산에 관련될 수 있는 항목이 최소 두 개 있다.
 *   - 제1호: "「지방세법」 및 「지방세특례제한법」에 따라 감면을 받는 … 취득세 … 의 감면세액"의
 *     100분의 20 — 즉 "감면받은 금액" 자체에 20%를 물리는 항목.
 *   - 제6호: "「지방세법」 제11조 및 제12조의 표준세율을 100분의 2로 적용하여 … 산출한
 *     취득세액"의 100분의 10 — 즉 실제 적용 세율과 무관하게 "2%로 의제한 가상의 취득세액"에
 *     10%를 물리는 항목.
 * 아래 구현은 이 둘 중 어느 것도 아닌 "실제 취득세액 × 10%"라는 기존 근사식을 그대로 쓰고
 * 있다. 제1호와 제6호가 이 사안(생애최초 감면을 받은 유상취득 주택)에 동시에 적용되는지,
 * 배타적으로 적용되는지, 「지방세특례제한법」 제36조의3처럼 정액 공제형 감면의 "감면세액"을
 * 제1호가 어떻게 산정하는지를 조문 원문만으로는 확정하지 못했다(농어촌특별세법 제4조 비과세
 * 목록도 확인했으나 제36조의3은 열거되어 있지 않다 — 즉 제1호 과세대상에서 제외되지 않는다는
 * 것만 확인됨). 잘못 추측해 고치는 대신, 이번 fix round에서는 기존 동작(감면 후 취득세 ×
 * 10%, 85㎡ 이하 국민주택 규모는 비과세)을 그대로 유지한다. 별도 태스크로 제1호·제6호의
 * 적용 관계를 확정한 뒤 다시 검토해야 한다.
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

  // 그 외 취득세의 10% (위 미해결 사항 참고)
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

/**
 * 주택 매수 관련 세금 계산 함수
 */

import type { HomeBuyingInput } from './types';

/**
 * 취득세 계산
 * 주택 수, 지역, 면적, 생애최초 여부에 따라 세율 차등 적용
 */
export function calculateAcquisitionTax(input: HomeBuyingInput): number {
  const { salePrice, houseCount, isAdjustedArea, isOver85m2, isFirstTime, isTempTwoHouse } =
    input;

  let rate = 0;

  // 생애최초 특례 (6억 이하, 85㎡ 이하, 무주택 또는 1주택)
  // 일반 세율에서 0.5%p 감면
  if (isFirstTime && (houseCount === 0 || houseCount === 1) && !isOver85m2 && salePrice <= 600_000_000) {
    if (salePrice <= 60_000_000) {
      return Math.floor(salePrice * 0.005); // 0.5% (일반 1% - 0.5%p)
    } else if (salePrice <= 600_000_000) {
      return Math.floor(300_000 + (salePrice - 60_000_000) * 0.008); // 30만원 + 0.8% (일반 1.3% - 0.5%p)
    }
  }

  // 일시적 2주택 (종전 주택 매도 조건)
  if (isTempTwoHouse && houseCount === 2) {
    rate = 0.01; // 1% (일반세율)
  } else if (houseCount === 0 || houseCount === 1) {
    // 무주택자 또는 1주택자 기본 세율 (동일)
    if (salePrice <= 60_000_000) {
      rate = 0.01;
    } else if (salePrice <= 600_000_000) {
      return 600_000 + (salePrice - 60_000_000) * 0.013;
    } else if (salePrice <= 900_000_000) {
      return 7_620_000 + (salePrice - 600_000_000) * 0.028;
    } else {
      return 16_020_000 + (salePrice - 900_000_000) * 0.04;
    }
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
  acquisitionTax: number,
): number {
  const { houseCount, salePrice, isOver85m2 } = input;

  // 무주택 또는 1주택, 85㎡ 이하, 6억 이하 면제
  if ((houseCount === 0 || houseCount === 1) && !isOver85m2 && salePrice <= 600_000_000) {
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
  isMetro: boolean,
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
  // 즉시 매각 시 약 20% 할인 (실거래 기준)
  return Math.floor(bondAmount * 0.8);
}

/**
 * 방공제 금액 계산
 * 소액임차인 최우선변제 보호를 위해 은행이 대출금액에서 차감하는 금액
 * 지역별로 다른 기준 적용
 */
export function calculateDefenseFundAmount(
  regionalType: 'seoul' | 'overconcentration' | 'metro' | 'other',
): number {
  switch (regionalType) {
    case 'seoul':
      return 55_000_000; // 서울: 5,500만원
    case 'overconcentration':
      return 48_000_000; // 과밀억제권역: 4,800만원
    case 'metro':
      return 28_000_000; // 광역시: 2,800만원
    case 'other':
      return 20_000_000; // 기타: 2,000만원
    default:
      return 20_000_000;
  }
}

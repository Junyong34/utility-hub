/**
 * 주택 매수 필요자금 계산기 프리셋 및 상수
 */

export const DEFAULT_DOWN_PAYMENT_RATIO = 10; // 계약금 10%

export const DEFAULT_CONTINGENCY_RATIO = 5; // 예비비 5%

export const DEFAULT_STANDARD_PRICE_RATIO = 0.7; // 시가표준액 70%

// 중개보수 상한 요율 (매매가 구간별)
export const BROKERAGE_FEE_RATES = [
  { max: 50_000_000, rate: 0.006, limit: 250_000 },
  { max: 200_000_000, rate: 0.005, limit: null },
  { max: 600_000_000, rate: 0.004, limit: null },
  { max: 900_000_000, rate: 0.005, limit: null },
  { max: Infinity, rate: 0.009, limit: null },
] as const;

// 법무사 비용 프리셋 (매매가 구간별)
export const LAWYER_FEE_PRESETS = [
  { max: 100_000_000, fee: 500_000 },
  { max: 300_000_000, fee: 700_000 },
  { max: 500_000_000, fee: 1_000_000 },
  { max: Infinity, fee: 1_500_000 },
] as const;

// 청소 비용 프리셋
export const CLEANING_FEE_PRESETS = {
  none: 0,
  basic: 200_000,
  premium: 500_000,
} as const;

// 이사 비용 프리셋
export const MOVING_FEE_PRESETS = {
  small: 1_000_000,
  medium: 1_500_000,
  large: 2_000_000,
} as const;

// 인테리어 비용 프리셋 (매매가 대비 비율)
export const INTERIOR_FEE_PRESETS = {
  none: 0,
  basic: 0.05, // 5%
  standard: 0.1, // 10%
  premium: 0.15, // 15%
} as const;

// 국민주택채권 매입 요율 (지역별)
export const NATIONAL_HOUSING_BOND_RATES = {
  seoul: 0.015, // 1.5%
  other: 0.01, // 1.0%
} as const;

// 국민주택채권 할인율 (즉시 매각 시)
export const NATIONAL_HOUSING_BOND_DISCOUNT_RATE = 0.1; // 10% 할인

// 관리비예치금 프리셋
export const MANAGEMENT_DEPOSIT_DEFAULT = 300_000; // 30만원

// 인지세 기준
export const STAMP_TAX_RATES = [
  { max: 10_000_000, tax: 0 },
  { max: 50_000_000, tax: 50_000 },
  { max: 100_000_000, tax: 100_000 },
  { max: Infinity, tax: 150_000 },
] as const;

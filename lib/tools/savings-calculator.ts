/**
 * 예금·적금 계산기 - 모든 계산 로직
 * 예금(정기예금), 적금(정기적금) 2가지 지원
 * 단리/복리, 과세방식(일반과세, 세금우대, 비과세) 지원
 */

/**
 * 이자 계산 방식
 */
export type InterestType = 'simple' | 'compound';

/**
 * 과세 방식
 */
export type TaxType = 'general' | 'tax-benefit' | 'tax-free';

/**
 * 과세율 정의
 */
export const TAX_RATES: Record<TaxType, number> = {
  general: 0.154, // 일반과세 15.4% (소득세 14% + 지방소득세 1.4%)
  'tax-benefit': 0.095, // 세금우대 9.5% (소득세 9% + 지방소득세 0.9%)
  'tax-free': 0, // 비과세 0%
};

/**
 * 월별 이자 적립 내역
 */
export interface MonthlyInterestItem {
  month: number;
  year: number;
  principal: number; // 해당 월의 원금
  interest: number; // 해당 월의 이자
  accumulatedInterest: number; // 누적 이자
  balance: number; // 잔액 (원금 + 누적이자)
}

/**
 * 예금 계산 결과
 */
export interface DepositCalculationResult {
  principal: number; // 원금
  grossInterest: number; // 세전 이자
  taxAmount: number; // 과세 금액
  netInterest: number; // 세후 이자
  totalAmount: number; // 실수령액 (원금 + 세후이자)
  months: number; // 예치 기간 (개월)
  schedule?: MonthlyInterestItem[]; // 월별 이자 내역
}

/**
 * 적금 계산 결과
 */
export interface InstallmentCalculationResult {
  totalPrincipal: number; // 총 납입액 (월납입액 × 개월수)
  grossInterest: number; // 세전 이자
  taxAmount: number; // 과세 금액
  netInterest: number; // 세후 이자
  totalAmount: number; // 실수령액 (총납입액 + 세후이자)
  months: number; // 적립 기간 (개월)
  schedule?: MonthlyInterestItem[]; // 월별 이자 내역
}

/**
 * 세율 계산 (커스텀 세율 지원)
 */
function getTaxRate(taxType: TaxType, customTaxRate?: number): number {
  if (taxType === 'tax-benefit' && customTaxRate !== undefined) {
    return customTaxRate / 100; // 퍼센트를 소수로 변환
  }
  return TAX_RATES[taxType];
}

/**
 * 예금 계산 (정기예금)
 * 한 번에 목돈을 예치하고 만기에 원금 + 이자를 받는 방식
 */
export function calculateDeposit(
  principal: number,
  annualRate: number,
  months: number,
  interestType: InterestType = 'simple',
  taxType: TaxType = 'general',
  includeSchedule: boolean = false,
  customTaxRate?: number
): DepositCalculationResult {
  if (principal <= 0 || months <= 0 || annualRate < 0) {
    return {
      principal: 0,
      grossInterest: 0,
      taxAmount: 0,
      netInterest: 0,
      totalAmount: 0,
      months: 0,
    };
  }

  const monthlyRate = annualRate / 100 / 12;
  const years = months / 12;
  let grossInterest = 0;

  if (interestType === 'simple') {
    // 단리: 원금 × 연이율 × 기간(년)
    grossInterest = principal * (annualRate / 100) * years;
  } else {
    // 복리: 원금 × ((1 + 월이율)^개월수 - 1)
    grossInterest = principal * (Math.pow(1 + monthlyRate, months) - 1);
  }

  const taxRate = getTaxRate(taxType, customTaxRate);
  const taxAmount = grossInterest * taxRate;
  const netInterest = grossInterest - taxAmount;
  const totalAmount = principal + netInterest;

  const result: DepositCalculationResult = {
    principal: Math.round(principal),
    grossInterest: Math.round(grossInterest),
    taxAmount: Math.round(taxAmount),
    netInterest: Math.round(netInterest),
    totalAmount: Math.round(totalAmount),
    months,
  };

  if (includeSchedule) {
    result.schedule = generateDepositSchedule(
      principal,
      monthlyRate,
      months,
      interestType
    );
  }

  return result;
}

/**
 * 예금 월별 이자 스케줄 생성
 */
function generateDepositSchedule(
  principal: number,
  monthlyRate: number,
  months: number,
  interestType: InterestType
): MonthlyInterestItem[] {
  const schedule: MonthlyInterestItem[] = [];
  const currentDate = new Date();
  let accumulatedInterest = 0;

  for (let month = 1; month <= months; month++) {
    let monthlyInterest = 0;

    if (interestType === 'simple') {
      // 단리: 매월 동일한 이자
      monthlyInterest = principal * monthlyRate;
    } else {
      // 복리: 이전 잔액에 이자 적용
      const previousBalance = month === 1 ? principal : schedule[month - 2].balance;
      monthlyInterest = previousBalance * monthlyRate;
    }

    accumulatedInterest += monthlyInterest;
    const balance = principal + accumulatedInterest;

    schedule.push({
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      principal,
      interest: Math.round(monthlyInterest),
      accumulatedInterest: Math.round(accumulatedInterest),
      balance: Math.round(balance),
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return schedule;
}

/**
 * 적금 계산 (정기적금)
 * 매월 일정 금액을 납입하고 만기에 원금 + 이자를 받는 방식
 */
export function calculateInstallment(
  monthlyPayment: number,
  annualRate: number,
  months: number,
  interestType: InterestType = 'simple',
  taxType: TaxType = 'general',
  includeSchedule: boolean = false,
  customTaxRate?: number
): InstallmentCalculationResult {
  if (monthlyPayment <= 0 || months <= 0 || annualRate < 0) {
    return {
      totalPrincipal: 0,
      grossInterest: 0,
      taxAmount: 0,
      netInterest: 0,
      totalAmount: 0,
      months: 0,
    };
  }

  const totalPrincipal = monthlyPayment * months;
  const monthlyRate = annualRate / 100 / 12;
  let grossInterest = 0;

  if (interestType === 'simple') {
    // 단리: 각 납입금에 대한 이자를 개별 계산 후 합산
    // 첫 달 납입금은 n개월, 두번째 달은 n-1개월, ... 이자 발생
    for (let i = 0; i < months; i++) {
      const remainingMonths = months - i;
      grossInterest += monthlyPayment * monthlyRate * remainingMonths;
    }
  } else {
    // 복리: 매월 납입금에 복리 적용
    for (let i = 0; i < months; i++) {
      const remainingMonths = months - i;
      grossInterest += monthlyPayment * (Math.pow(1 + monthlyRate, remainingMonths) - 1);
    }
  }

  const taxRate = getTaxRate(taxType, customTaxRate);
  const taxAmount = grossInterest * taxRate;
  const netInterest = grossInterest - taxAmount;
  const totalAmount = totalPrincipal + netInterest;

  const result: InstallmentCalculationResult = {
    totalPrincipal: Math.round(totalPrincipal),
    grossInterest: Math.round(grossInterest),
    taxAmount: Math.round(taxAmount),
    netInterest: Math.round(netInterest),
    totalAmount: Math.round(totalAmount),
    months,
  };

  if (includeSchedule) {
    result.schedule = generateInstallmentSchedule(
      monthlyPayment,
      monthlyRate,
      months,
      interestType
    );
  }

  return result;
}

/**
 * 적금 월별 이자 스케줄 생성
 */
function generateInstallmentSchedule(
  monthlyPayment: number,
  monthlyRate: number,
  months: number,
  interestType: InterestType
): MonthlyInterestItem[] {
  const schedule: MonthlyInterestItem[] = [];
  const currentDate = new Date();
  let accumulatedPrincipal = 0;
  let accumulatedInterest = 0;

  for (let month = 1; month <= months; month++) {
    accumulatedPrincipal += monthlyPayment;
    let monthlyInterest = 0;

    if (interestType === 'simple') {
      // 단리: 기존 원금에만 이자 적용
      const previousPrincipal = month === 1 ? 0 : schedule[month - 2].principal;
      monthlyInterest = previousPrincipal * monthlyRate;
    } else {
      // 복리: 기존 잔액(원금+이자)에 이자 적용
      const previousBalance = month === 1 ? 0 : schedule[month - 2].balance;
      monthlyInterest = previousBalance * monthlyRate;
    }

    accumulatedInterest += monthlyInterest;
    const balance = accumulatedPrincipal + accumulatedInterest;

    schedule.push({
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      principal: Math.round(accumulatedPrincipal),
      interest: Math.round(monthlyInterest),
      accumulatedInterest: Math.round(accumulatedInterest),
      balance: Math.round(balance),
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return schedule;
}

/**
 * 과세 방식 라벨
 */
export const TAX_TYPE_LABELS: Record<TaxType, string> = {
  general: '일반과세',
  'tax-benefit': '세금우대',
  'tax-free': '비과세',
};

/**
 * 이자 방식 라벨
 */
export const INTEREST_TYPE_LABELS: Record<InterestType, string> = {
  simple: '단리',
  compound: '복리',
};

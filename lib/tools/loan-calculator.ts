/**
 * 대출 계산기 - 모든 계산 로직
 * 원리금균등, 원금균등, 만기일시상환 3가지 상환 방식 지원
 */

/**
 * 월별 상환 계획 아이템
 */
export interface MonthlyScheduleItem {
  month: number;
  year: number;
  monthlyPayment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

/**
 * 대출 계산 결과 타입
 */
export interface LoanCalculationResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  months: number;
  schedule?: MonthlyScheduleItem[];
}

/**
 * 월별 상환 스케줄 생성 (원리금균등)
 */
function generateEqualPaymentSchedule(
  principal: number,
  monthlyRate: number,
  months: number,
  monthlyPayment: number
): MonthlyScheduleItem[] {
  const schedule: MonthlyScheduleItem[] = [];
  let remainingBalance = principal;
  const currentDate = new Date();

  for (let month = 1; month <= months; month++) {
    const interestPayment = Math.round(remainingBalance * monthlyRate);
    const principalPayment = Math.round(monthlyPayment - interestPayment);
    remainingBalance = Math.round(remainingBalance - principalPayment);

    schedule.push({
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      monthlyPayment: Math.round(monthlyPayment),
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance: Math.max(0, remainingBalance),
    });

    // 다음 월로 이동
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return schedule;
}

/**
 * 원리금균등 상환 (Equal Principal + Interest Payment)
 * 매월 동일 금액을 상환하는 방식
 */
export function calculateEqualPayment(
  principal: number,
  annualRate: number,
  months: number,
  includeSchedule: boolean = false
): LoanCalculationResult {
  if (principal <= 0 || months <= 0) {
    return {
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
      months: 0,
    };
  }

  const monthlyRate = annualRate / 100 / 12;

  let monthlyPayment: number;

  if (monthlyRate === 0) {
    // 금리 0%인 경우 단순 나눗셈
    monthlyPayment = principal / months;
  } else {
    // 공식: P × (i × (1+i)^n) / ((1+i)^n - 1)
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
    const denominator = Math.pow(1 + monthlyRate, months) - 1;
    monthlyPayment = principal * (numerator / denominator);
  }

  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;

  const result: LoanCalculationResult = {
    monthlyPayment: Math.round(monthlyPayment),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    months,
  };

  if (includeSchedule) {
    result.schedule = generateEqualPaymentSchedule(
      principal,
      monthlyRate,
      months,
      monthlyPayment
    );
  }

  return result;
}

/**
 * 월별 상환 스케줄 생성 (원금균등)
 */
function generateEqualPrincipalSchedule(
  principal: number,
  monthlyRate: number,
  months: number
): MonthlyScheduleItem[] {
  const schedule: MonthlyScheduleItem[] = [];
  const monthlyPrincipal = principal / months;
  const currentDate = new Date();

  for (let month = 1; month <= months; month++) {
    const remainingPrincipal = principal - monthlyPrincipal * (month - 1);
    const interestPayment = Math.round(remainingPrincipal * monthlyRate);
    const principalPayment = Math.round(monthlyPrincipal);
    const newBalance = Math.round(remainingPrincipal - principalPayment);

    schedule.push({
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      monthlyPayment: principalPayment + interestPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance: Math.max(0, newBalance),
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return schedule;
}

/**
 * 원금균등 상환 (Equal Principal Payment)
 * 매월 원금은 동일, 이자는 점차 감소
 */
export function calculateEqualPrincipal(
  principal: number,
  annualRate: number,
  months: number,
  includeSchedule: boolean = false
): LoanCalculationResult {
  if (principal <= 0 || months <= 0) {
    return {
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
      months: 0,
    };
  }

  const monthlyRate = annualRate / 100 / 12;
  const monthlyPrincipal = principal / months;

  let totalInterest = 0;
  let firstMonthlyPayment = 0;

  // 각 월별 이자 계산
  for (let month = 1; month <= months; month++) {
    const remainingPrincipal = principal - monthlyPrincipal * (month - 1);
    const monthlyInterest = remainingPrincipal * monthlyRate;
    totalInterest += monthlyInterest;

    // 첫 번째 월 상환액 (사용자 참고용)
    if (month === 1) {
      firstMonthlyPayment = monthlyPrincipal + monthlyInterest;
    }
  }

  const totalPayment = principal + totalInterest;

  const result: LoanCalculationResult = {
    monthlyPayment: Math.round(firstMonthlyPayment),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    months,
  };

  if (includeSchedule) {
    result.schedule = generateEqualPrincipalSchedule(principal, monthlyRate, months);
  }

  return result;
}

/**
 * 월별 상환 스케줄 생성 (만기일시)
 */
function generateLumpSumSchedule(
  principal: number,
  monthlyRate: number,
  months: number
): MonthlyScheduleItem[] {
  const schedule: MonthlyScheduleItem[] = [];
  const monthlyInterest = principal * monthlyRate;
  const currentDate = new Date();

  for (let month = 1; month <= months; month++) {
    schedule.push({
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      monthlyPayment: month === months ? principal + Math.round(monthlyInterest) : Math.round(monthlyInterest),
      principal: month === months ? principal : 0,
      interest: Math.round(monthlyInterest),
      remainingBalance: month === months ? 0 : principal,
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return schedule;
}

/**
 * 만기일시 상환 (Lump-sum at Maturity)
 * 대출 기간 동안 이자만 납부, 만기에 원금을 일시 상환
 */
export function calculateLumpSum(
  principal: number,
  annualRate: number,
  months: number,
  includeSchedule: boolean = false
): LoanCalculationResult {
  if (principal <= 0 || months <= 0) {
    return {
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
      months: 0,
    };
  }

  const monthlyRate = annualRate / 100 / 12;
  const monthlyInterest = principal * monthlyRate;
  const totalInterest = monthlyInterest * months;
  const totalPayment = principal + totalInterest;

  const result: LoanCalculationResult = {
    monthlyPayment: Math.round(monthlyInterest),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    months,
  };

  if (includeSchedule) {
    result.schedule = generateLumpSumSchedule(principal, monthlyRate, months);
  }

  return result;
}

/**
 * 대출 계산 (통합)
 */
export type RepaymentMethod = 'equal-payment' | 'equal-principal' | 'lump-sum';

export function calculateLoan(
  principal: number,
  annualRate: number,
  months: number,
  method: RepaymentMethod = 'equal-payment',
  includeSchedule: boolean = false
): LoanCalculationResult {
  switch (method) {
    case 'equal-principal':
      return calculateEqualPrincipal(principal, annualRate, months, includeSchedule);
    case 'lump-sum':
      return calculateLumpSum(principal, annualRate, months, includeSchedule);
    case 'equal-payment':
    default:
      return calculateEqualPayment(principal, annualRate, months, includeSchedule);
  }
}

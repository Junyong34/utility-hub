/**
 * 중도상환수수료 계산기
 * 대출 기간 중 조기 상환 시 발생하는 수수료 계산
 */

/**
 * 중도상환수수료 계산 결과
 */
export interface PrepaymentFeeResult {
  prepaymentFee: number;
  remainingDays: number;
  totalDays: number;
  appliedFeeRate: number;
  isExempted: boolean;
}

/**
 * 날짜 간 일수 계산 (일(day) 단위)
 * @param startDate 시작 날짜
 * @param endDate 종료 날짜
 * @returns 일수 (정수)
 */
function calculateDaysDifference(startDate: Date, endDate: Date): number {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const timeDifference = endDate.getTime() - startDate.getTime();
  return Math.max(0, Math.floor(timeDifference / millisecondsPerDay));
}

/**
 * 중도상환수수료 계산
 *
 * @param repaymentAmount 중도 상환할 금액
 * @param feeRate 수수료율 (%)
 * @param loanDate 대출일자
 * @param repaymentDate 실제 상환일자
 * @param maturityDate 계약 만기일자
 * @param exemptionYears 중도상환수수료 면제 기간 (년)
 * @returns 계산 결과
 */
export function calculatePrepaymentFee(
  repaymentAmount: number,
  feeRate: number,
  loanDate: Date,
  repaymentDate: Date,
  maturityDate: Date,
  exemptionYears: number = 0
): PrepaymentFeeResult {
  // 입력값 유효성 검사
  if (
    repaymentAmount <= 0 ||
    feeRate < 0 ||
    loanDate > repaymentDate ||
    repaymentDate > maturityDate
  ) {
    return {
      prepaymentFee: 0,
      remainingDays: 0,
      totalDays: 0,
      appliedFeeRate: 0,
      isExempted: false,
    };
  }

  // 전체 대출 기간 (일)
  const totalDays = calculateDaysDifference(loanDate, maturityDate);

  // 잔존 기간 (일)
  const remainingDays = calculateDaysDifference(repaymentDate, maturityDate);

  // 면제 기간 확인
  const exemptionMilliseconds = exemptionYears * 365.25 * 24 * 60 * 60 * 1000;
  const exemptionEndDate = new Date(
    loanDate.getTime() + exemptionMilliseconds
  );

  // 면제 기간 이후인 경우, 수수료 없음
  if (repaymentDate >= exemptionEndDate) {
    return {
      prepaymentFee: 0,
      remainingDays,
      totalDays,
      appliedFeeRate: 0,
      isExempted: true,
    };
  }

  // 일반 수수료 계산
  // 중도상환수수료 = 상환금액 × 수수료율 × (잔존일수 / 전체일수)
  let prepaymentFee = 0;

  if (totalDays > 0) {
    const feeRateDecimal = feeRate / 100;
    const ratio = remainingDays / totalDays;
    prepaymentFee = repaymentAmount * feeRateDecimal * ratio;
  }

  return {
    prepaymentFee: Math.round(prepaymentFee),
    remainingDays,
    totalDays,
    appliedFeeRate: feeRate,
    isExempted: false,
  };
}

/**
 * 날짜 문자열 파싱 (YYYY-MM-DD 형식)
 */
export function parseDate(dateString: string): Date | null {
  if (!dateString) return null;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

/**
 * 날짜를 문자열로 포맷팅 (YYYY-MM-DD)
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

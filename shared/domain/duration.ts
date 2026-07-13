/** 총 개월 수를 년과 월로 분리합니다. */
export function splitMonths(totalMonths: number): {
  years: number;
  months: number;
} {
  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  };
}

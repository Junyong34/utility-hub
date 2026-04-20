import type { FinanceComparisonMode } from './types.ts';

export function formatFinanceMonthLabel(month: string): string {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
    return month;
  }

  const [year, monthValue] = month.split('-');
  return `${year}.${monthValue}`;
}

export function formatFinanceQuarterLabel(year: number, quarter: number): string {
  return `${year}년 ${quarter}분기`;
}

export function formatFinanceHalfLabel(year: number, half: number): string {
  return `${year}년 ${half}반기`;
}

export function formatFinanceYearLabel(year: number): string {
  return `${year}년`;
}

export function getFinanceComparisonLabel(mode: FinanceComparisonMode): string {
  switch (mode) {
    case 'all':
      return '전체 통계';
    case 'half':
      return '반기 대비';
    case 'year':
      return '연도 대비';
    default:
      return '반기 대비';
  }
}

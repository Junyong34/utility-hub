import type { FinanceComparisonMode } from './types.ts';

const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

export function getSearchParamValue(
  value: string | string[] | undefined
): string | null {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return typeof value === 'string' ? value : null;
}

export function parseFinanceMonthParam(
  value: string | string[] | undefined
): string | null {
  const normalized = getSearchParamValue(value);

  if (!normalized || !MONTH_PATTERN.test(normalized)) {
    return null;
  }

  return normalized;
}

export function parseFinanceCompareParam(
  value: string | string[] | undefined
): FinanceComparisonMode {
  const normalized = getSearchParamValue(value);

  if (normalized === 'year' || normalized === 'all') {
    return normalized;
  }

  return 'half';
}

export function resolveFinanceMonth(
  availableMonths: string[],
  requestedMonth: string | null
): string | null {
  if (availableMonths.length === 0) {
    return null;
  }

  if (!requestedMonth) {
    return availableMonths.at(-1) ?? null;
  }

  if (availableMonths.includes(requestedMonth)) {
    return requestedMonth;
  }

  const previousMonths = availableMonths.filter((month) => month <= requestedMonth);

  return previousMonths.at(-1) ?? availableMonths.at(-1) ?? null;
}

export function getNextFinanceMonth(month: string): string {
  const [yearRaw, monthRaw] = month.split('-');
  const year = Number(yearRaw);
  const monthIndex = Number(monthRaw) - 1;
  const date = new Date(Date.UTC(year, monthIndex + 1, 1));

  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
}

export function getPreviousFinanceMonth(month: string): string {
  const [yearRaw, monthRaw] = month.split('-');
  const year = Number(yearRaw);
  const monthIndex = Number(monthRaw) - 1;
  const date = new Date(Date.UTC(year, monthIndex - 1, 1));

  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
}

export function buildFinanceHref(
  pathname: string,
  params: {
    month?: string | null;
    compare?: FinanceComparisonMode | null;
  } = {}
): string {
  const searchParams = new URLSearchParams();

  if (params.month) {
    searchParams.set('month', params.month);
  }

  if (params.compare && params.compare !== 'half') {
    searchParams.set('compare', params.compare);
  }

  const query = searchParams.toString();
  return query ? `${pathname}?${query}` : pathname;
}

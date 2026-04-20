import { formatFinanceMonthLabel } from './formatting.ts';
import type {
  FinanceProjectionPoint,
  FinanceProjectionSummary,
} from './types.ts';

const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;
export const FINANCE_PROJECTION_YEAR_LIMIT = 100;

export interface BuildFinanceProjectionSummaryParams {
  baseMonth: string;
  baseAssets: number;
  annualGrowthRate: number;
  targetYear: number;
}

function isValidMonth(month: string): boolean {
  return MONTH_PATTERN.test(month);
}

function parseMonthParts(month: string): { year: number; month: number } {
  const [yearRaw, monthRaw] = month.split('-');

  return {
    year: Number(yearRaw),
    month: Number(monthRaw),
  };
}

function shiftMonthByYears(month: string, years: number): string {
  const parts = parseMonthParts(month);
  const date = new Date(Date.UTC(parts.year + years, parts.month - 1, 1));

  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
}

function normalizeAmount(value: number): number {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }

  return Math.round(value);
}

function normalizeGrowthRate(value: number): number {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }

  return value;
}

function buildFallbackSummary(
  baseMonth: string,
  baseAssets: number,
  annualGrowthRate: number,
  targetYear: number
): FinanceProjectionSummary {
  return {
    baseMonth,
    baseAssets,
    annualGrowthRate,
    targetYear,
    targetMonth: baseMonth,
    years: 0,
    projectedAssets: baseAssets,
    cumulativeChange: 0,
    cumulativeChangeRate: baseAssets > 0 ? 0 : null,
    points: [],
  };
}

function calculateProjectedAssets(
  baseAssets: number,
  annualGrowthRate: number,
  years: number
): number {
  return Math.round(baseAssets * Math.pow(1 + annualGrowthRate / 100, years));
}

function buildProjectionPoints(
  baseMonth: string,
  baseAssets: number,
  annualGrowthRate: number,
  years: number
): FinanceProjectionPoint[] {
  const points: FinanceProjectionPoint[] = [];

  for (let yearIndex = 1; yearIndex <= years; yearIndex += 1) {
    const month = shiftMonthByYears(baseMonth, yearIndex);
    const projectedAssets = calculateProjectedAssets(
      baseAssets,
      annualGrowthRate,
      yearIndex
    );
    const previousAssets =
      yearIndex === 1
        ? baseAssets
        : points.at(-1)?.projectedAssets ?? baseAssets;
    const cumulativeChange = projectedAssets - baseAssets;

    points.push({
      month,
      label: formatFinanceMonthLabel(month),
      yearIndex,
      projectedAssets,
      annualChange: projectedAssets - previousAssets,
      annualGrowthRate,
      cumulativeChange,
      cumulativeChangeRate:
        baseAssets > 0 ? Math.round((cumulativeChange / baseAssets) * 100) : null,
    });
  }

  return points;
}

export function buildFinanceProjectionSummary({
  baseMonth,
  baseAssets,
  annualGrowthRate,
  targetYear,
}: BuildFinanceProjectionSummaryParams): FinanceProjectionSummary {
  const normalizedBaseAssets = normalizeAmount(baseAssets);
  const normalizedGrowthRate = normalizeGrowthRate(annualGrowthRate);
  const normalizedTargetYear = Number.isFinite(targetYear)
    ? Math.trunc(targetYear)
    : 0;

  if (!isValidMonth(baseMonth)) {
    return buildFallbackSummary(
      baseMonth,
      normalizedBaseAssets,
      normalizedGrowthRate,
      normalizedTargetYear
    );
  }

  const startYear = parseMonthParts(baseMonth).year;
  const years = Math.max(normalizedTargetYear - startYear, 0);
  if (years >= FINANCE_PROJECTION_YEAR_LIMIT) {
    return buildFallbackSummary(
      baseMonth,
      normalizedBaseAssets,
      normalizedGrowthRate,
      normalizedTargetYear
    );
  }
  const targetMonth = shiftMonthByYears(baseMonth, years);
  const points = buildProjectionPoints(
    baseMonth,
    normalizedBaseAssets,
    normalizedGrowthRate,
    years
  );
  const projectedAssets = points.at(-1)?.projectedAssets ?? normalizedBaseAssets;
  const cumulativeChange = projectedAssets - normalizedBaseAssets;

  return {
    baseMonth,
    baseAssets: normalizedBaseAssets,
    annualGrowthRate: normalizedGrowthRate,
    targetYear: normalizedTargetYear,
    targetMonth,
    years,
    projectedAssets,
    cumulativeChange,
    cumulativeChangeRate:
      normalizedBaseAssets > 0
        ? Math.round((cumulativeChange / normalizedBaseAssets) * 100)
        : null,
    points,
  };
}

import {
  formatFinanceHalfLabel,
  formatFinanceQuarterLabel,
  formatFinanceYearLabel,
} from './formatting.ts';
import { buildFinanceSnapshotSummary } from './summary.ts';
import type {
  FinanceMonthlySnapshot,
  FinanceReportBucketSummary,
  FinanceReportsSummary,
} from './types.ts';

function compareMonths(left: string, right: string): number {
  return left.localeCompare(right);
}

function parseMonthParts(month: string): { year: number; month: number } {
  const [year, monthValue] = month.split('-');
  return {
    year: Number(year),
    month: Number(monthValue),
  };
}

function buildQuarterBucketId(month: string): string {
  const parts = parseMonthParts(month);
  const quarter = Math.ceil(parts.month / 3);
  return `${parts.year}-Q${quarter}`;
}

function buildHalfBucketId(month: string): string {
  const parts = parseMonthParts(month);
  const half = parts.month <= 6 ? 1 : 2;
  return `${parts.year}-H${half}`;
}

function buildYearBucketId(month: string): string {
  const parts = parseMonthParts(month);
  return String(parts.year);
}

type BucketKind = FinanceReportBucketSummary['kind'];

function buildBucketLabel(kind: BucketKind, month: string): string {
  const parts = parseMonthParts(month);

  if (kind === 'quarter') {
    return formatFinanceQuarterLabel(parts.year, Math.ceil(parts.month / 3));
  }

  if (kind === 'half') {
    return formatFinanceHalfLabel(parts.year, parts.month <= 6 ? 1 : 2);
  }

  return formatFinanceYearLabel(parts.year);
}

function buildBucketSummaries(
  snapshots: FinanceMonthlySnapshot[],
  kind: BucketKind
): FinanceReportBucketSummary[] {
  const bucketMap = new Map<string, FinanceMonthlySnapshot[]>();

  for (const snapshot of snapshots.sort((left, right) =>
    compareMonths(left.month, right.month)
  )) {
    const bucketId =
      kind === 'quarter'
        ? buildQuarterBucketId(snapshot.month)
        : kind === 'half'
          ? buildHalfBucketId(snapshot.month)
          : buildYearBucketId(snapshot.month);
    const current = bucketMap.get(bucketId) ?? [];

    current.push(snapshot);
    bucketMap.set(bucketId, current);
  }

  const orderedBuckets = [...bucketMap.entries()].sort((left, right) =>
    left[0].localeCompare(right[0])
  );

  return orderedBuckets.map(([bucketId, bucketSnapshots], index) => {
    const orderedSnapshots = [...bucketSnapshots].sort((left, right) =>
      compareMonths(left.month, right.month)
    );
    const endSnapshot = orderedSnapshots.at(-1)!;
    const endSummary = buildFinanceSnapshotSummary(endSnapshot);
    const totalIncome = orderedSnapshots.reduce(
      (sum, snapshot) =>
        sum +
        buildFinanceSnapshotSummary(snapshot).totalIncome,
      0
    );
    const totalExpenses = orderedSnapshots.reduce(
      (sum, snapshot) =>
        sum +
        buildFinanceSnapshotSummary(snapshot).totalExpenses,
      0
    );
    const fixedExpenses = orderedSnapshots.reduce(
      (sum, snapshot) =>
        sum +
        buildFinanceSnapshotSummary(snapshot).fixedExpenses,
      0
    );
    const variableExpenses = orderedSnapshots.reduce(
      (sum, snapshot) =>
        sum +
        buildFinanceSnapshotSummary(snapshot).variableExpenses,
      0
    );
    const childRelatedExpenses = orderedSnapshots.reduce(
      (sum, snapshot) =>
        sum +
        buildFinanceSnapshotSummary(snapshot).childRelatedExpenses,
      0
    );
    const previousBucket = index > 0 ? orderedBuckets[index - 1][1].at(-1)! : null;
    const previousNetWorth = previousBucket
      ? buildFinanceSnapshotSummary(previousBucket).netWorth
      : null;
    const netWorthChangeAmount =
      previousNetWorth === null ? null : endSummary.netWorth - previousNetWorth;
    const netWorthChangeRate =
      previousNetWorth && previousNetWorth > 0 && netWorthChangeAmount !== null
        ? Math.round((netWorthChangeAmount / previousNetWorth) * 100)
        : null;

    return {
      bucketId,
      kind,
      label: buildBucketLabel(kind, endSnapshot.month),
      startMonth: orderedSnapshots[0].month,
      endMonth: orderedSnapshots.at(-1)!.month,
      endSnapshotMonth: endSnapshot.month,
      monthCount: orderedSnapshots.length,
      totalIncome,
      totalExpenses,
      fixedExpenses,
      variableExpenses,
      childRelatedExpenses,
      totalLivingAssets: endSummary.totalLivingAssets,
      totalInvestmentValuation: endSummary.totalInvestmentValuation,
      totalAssets: endSummary.totalAssets,
      totalDebt: endSummary.totalDebt,
      netWorth: endSummary.netWorth,
      netWorthChangeAmount,
      netWorthChangeRate,
      investmentProfitLoss: endSummary.totalInvestmentProfitLoss,
    };
  });
}

export function buildFinanceReportsSummary(
  snapshots: FinanceMonthlySnapshot[]
): FinanceReportsSummary {
  return {
    quarterly: buildBucketSummaries(snapshots, 'quarter'),
    semiAnnual: buildBucketSummaries(snapshots, 'half'),
    yearly: buildBucketSummaries(snapshots, 'year'),
  };
}

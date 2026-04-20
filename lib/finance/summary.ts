import { formatFinanceMonthLabel, getFinanceComparisonLabel } from './formatting.ts';
import type {
  FinanceComparisonMode,
  FinanceAssetFlowEvent,
  FinanceAssetFlowReason,
  FinanceDashboardSummary,
  FinanceComparisonMetricKey,
  FinanceMetricComparison,
  FinanceComparisonSummary,
  FinanceMonthlySnapshot,
  FinanceOwner,
  FinanceSnapshotSummary,
  FinanceTrendPoint,
  FinanceValueShareDatum,
} from './types.ts';

const COMPARISON_MONTH_OFFSETS: Record<Exclude<FinanceComparisonMode, 'all'>, number> = {
  half: 6,
  year: 12,
};

const COMPARISON_METRIC_KEYS: FinanceComparisonMetricKey[] = [
  'totalAssets',
  'totalLivingAssets',
  'totalDebt',
  'netWorth',
  'totalIncome',
  'totalExpenses',
  'savingsEstimate',
];

function isValidMonth(month: string | null | undefined): month is string {
  return typeof month === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(month);
}

function compareMonths(left: string, right: string): number {
  return left.localeCompare(right);
}

function shiftMonth(month: string, offset: number): string {
  const [yearRaw, monthRaw] = month.split('-');
  const year = Number(yearRaw);
  const monthIndex = Number(monthRaw) - 1;
  const date = new Date(Date.UTC(year, monthIndex + offset, 1));

  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
}

function calculateRatio(value: number, total: number): number {
  if (value <= 0 || total <= 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
}

function normalizeNumber(value: number): number {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }

  return Math.floor(value);
}

function buildShareData(
  entries: Array<{ id: string; label: string; value: number }>,
  total: number
): FinanceValueShareDatum[] {
  return entries
    .filter((entry) => entry.value > 0)
    .map((entry) => ({
      ...entry,
      ratio: calculateRatio(entry.value, total),
    }));
}

function buildOwnerBreakdowns(snapshot: FinanceMonthlySnapshot) {
  const owners: FinanceOwner[] = ['husband', 'wife', 'joint'];

  return owners.map((owner) => {
    const livingAssets = snapshot.assets
      .filter((row) => row.owner === owner)
      .reduce((sum, row) => sum + normalizeNumber(row.amount), 0);
    const investmentValuation = snapshot.investments
      .filter((row) => row.owner === owner)
      .reduce((sum, row) => sum + normalizeNumber(row.valuation), 0);
    const debt = snapshot.debts
      .filter((row) => row.owner === owner)
      .reduce((sum, row) => sum + normalizeNumber(row.balance), 0);
    const expenses = snapshot.expenses
      .filter((row) => row.owner === owner)
      .reduce((sum, row) => sum + normalizeNumber(row.amount), 0);

    return {
      owner,
      income:
        owner === 'husband'
          ? normalizeNumber(snapshot.incomes.husbandSalary)
          : owner === 'wife'
            ? normalizeNumber(snapshot.incomes.wifeSalary)
            : 0,
      livingAssets,
      investmentValuation,
      totalAssets: livingAssets + investmentValuation,
      debt,
      expenses,
      netWorth: livingAssets + investmentValuation - debt,
    };
  });
}

export function buildFinanceSnapshotSummary(
  snapshot: FinanceMonthlySnapshot
): FinanceSnapshotSummary {
  const totalIncome =
    normalizeNumber(snapshot.incomes.husbandSalary) +
    normalizeNumber(snapshot.incomes.wifeSalary);
  const totalLivingAssets = snapshot.assets.reduce(
    (sum, row) => sum + normalizeNumber(row.amount),
    0
  );
  const totalDebt = snapshot.debts.reduce(
    (sum, row) => sum + normalizeNumber(row.balance),
    0
  );
  const totalInvestmentPrincipal = snapshot.investments.reduce(
    (sum, row) => sum + normalizeNumber(row.principal),
    0
  );
  const totalInvestmentValuation = snapshot.investments.reduce(
    (sum, row) => sum + normalizeNumber(row.valuation),
    0
  );
  const totalAssets = totalLivingAssets + totalInvestmentValuation;
  const netWorth = totalAssets - totalDebt;
  const fixedExpenses = snapshot.expenses
    .filter((row) => row.type === 'fixed')
    .reduce((sum, row) => sum + normalizeNumber(row.amount), 0);
  const variableExpenses = snapshot.expenses
    .filter((row) => row.type === 'variable')
    .reduce((sum, row) => sum + normalizeNumber(row.amount), 0);
  const totalExpenses = fixedExpenses + variableExpenses;
  const childRelatedExpenses = snapshot.expenses
    .filter((row) => row.childRelated)
    .reduce((sum, row) => sum + normalizeNumber(row.amount), 0);
  const totalInvestmentProfitLoss =
    totalInvestmentValuation - totalInvestmentPrincipal;
  const totalInvestmentReturnRate =
    totalInvestmentPrincipal > 0
      ? Math.round((totalInvestmentProfitLoss / totalInvestmentPrincipal) * 100)
      : 0;

  const assetByCategory = buildShareData(
    snapshot.assets.map((row) => ({
      id: row.id,
      label: row.name,
      value: normalizeNumber(row.amount),
    })),
    totalLivingAssets
  );
  const debtByCategory = buildShareData(
    snapshot.debts.map((row) => ({
      id: row.id,
      label: row.name,
      value: normalizeNumber(row.balance),
    })),
    totalDebt
  );
  const investmentByCategory = buildShareData(
    snapshot.investments.map((row) => ({
      id: row.id,
      label: row.name,
      value: normalizeNumber(row.valuation),
    })),
    totalInvestmentValuation
  );
  const expenseByCategory = buildShareData(
    snapshot.expenses.map((row) => ({
      id: row.id,
      label: row.name,
      value: normalizeNumber(row.amount),
    })),
    totalExpenses
  );

  return {
    month: snapshot.month,
    totalIncome,
    totalLivingAssets,
    totalInvestmentPrincipal,
    totalInvestmentValuation,
    totalInvestmentProfitLoss,
    totalInvestmentReturnRate,
    totalAssets,
    totalDebt,
    netWorth,
    totalExpenses,
    fixedExpenses,
    variableExpenses,
    childRelatedExpenses,
    savingsEstimate: totalIncome - totalExpenses,
    fixedExpenseRatio: calculateRatio(fixedExpenses, totalExpenses),
    variableExpenseRatio: calculateRatio(variableExpenses, totalExpenses),
    assetByCategory,
    debtByCategory,
    investmentByCategory,
    expenseByCategory,
    ownerBreakdowns: buildOwnerBreakdowns(snapshot),
  };
}

function resolveEffectiveSnapshot(
  snapshots: FinanceMonthlySnapshot[],
  requestedMonth?: string | null
): FinanceMonthlySnapshot | null {
  if (snapshots.length === 0) {
    return null;
  }

  if (!isValidMonth(requestedMonth)) {
    return snapshots.at(-1) ?? null;
  }

  const exact = snapshots.find((snapshot) => snapshot.month === requestedMonth);

  if (exact) {
    return exact;
  }

  const previousCandidates = snapshots.filter(
    (snapshot) => compareMonths(snapshot.month, requestedMonth) <= 0
  );

  return previousCandidates.at(-1) ?? snapshots.at(-1) ?? null;
}

function resolveReferenceSnapshot(
  snapshots: FinanceMonthlySnapshot[],
  effectiveMonth: string,
  mode: FinanceComparisonMode
): FinanceMonthlySnapshot | null {
  if (mode === 'all') {
    return (
      snapshots
        .filter((snapshot) => compareMonths(snapshot.month, effectiveMonth) < 0)
        .sort((left, right) => compareMonths(left.month, right.month))[0] ?? null
    );
  }

  const targetMonth = shiftMonth(effectiveMonth, -COMPARISON_MONTH_OFFSETS[mode]);
  const previousCandidates = snapshots.filter(
    (snapshot) => compareMonths(snapshot.month, targetMonth) <= 0
  );

  return previousCandidates.at(-1) ?? null;
}

function buildComparisonSummary(
  current: FinanceSnapshotSummary,
  reference: FinanceSnapshotSummary | null,
  mode: FinanceComparisonMode
): FinanceComparisonSummary {
  const metricComparisons = COMPARISON_METRIC_KEYS.reduce<
    Record<FinanceComparisonMetricKey, FinanceMetricComparison>
  >((accumulator, key) => {
    const currentValue = current[key];
    const referenceValue = reference ? reference[key] : null;
    const absoluteChange = referenceValue === null ? null : currentValue - referenceValue;
    const percentChange =
      referenceValue === null || referenceValue === 0 || absoluteChange === null
        ? null
        : Math.round((absoluteChange / referenceValue) * 100);

    accumulator[key] = {
      key,
      currentValue,
      referenceValue,
      absoluteChange,
      percentChange,
    };

    return accumulator;
  }, {} as Record<FinanceComparisonMetricKey, FinanceMetricComparison>);

  if (!reference) {
    return {
      mode,
      label: getFinanceComparisonLabel(mode),
      currentMonth: current.month,
      referenceMonth: null,
      currentValue: current.netWorth,
      referenceValue: null,
      absoluteChange: null,
      percentChange: null,
      metricComparisons,
    };
  }

  const absoluteChange = current.netWorth - reference.netWorth;
  const percentChange =
    reference.netWorth > 0
      ? Math.round((absoluteChange / reference.netWorth) * 100)
      : null;

  return {
    mode,
    label: getFinanceComparisonLabel(mode),
    currentMonth: current.month,
    referenceMonth: reference.month,
    currentValue: current.netWorth,
    referenceValue: reference.netWorth,
    absoluteChange,
    percentChange,
    metricComparisons,
  };
}

function buildHistory(
  snapshots: FinanceMonthlySnapshot[]
): FinanceTrendPoint[] {
  return snapshots
    .sort((left, right) => compareMonths(left.month, right.month))
    .map((snapshot) => {
      const summary = buildFinanceSnapshotSummary(snapshot);

      return {
        month: snapshot.month,
        label: formatFinanceMonthLabel(snapshot.month),
        totalIncome: summary.totalIncome,
        totalLivingAssets: summary.totalLivingAssets,
        totalInvestmentValuation: summary.totalInvestmentValuation,
        totalAssets: summary.totalAssets,
        totalDebt: summary.totalDebt,
        netWorth: summary.netWorth,
        totalExpenses: summary.totalExpenses,
        fixedExpenses: summary.fixedExpenses,
        variableExpenses: summary.variableExpenses,
        childRelatedExpenses: summary.childRelatedExpenses,
        savingsEstimate: summary.savingsEstimate,
      };
    });
}

function buildHistoryRangeLabel(points: FinanceTrendPoint[]): string | null {
  const first = points.at(0);
  const last = points.at(-1);

  if (!first || !last) {
    return null;
  }

  return first.month === last.month
    ? formatFinanceMonthLabel(first.month)
    : `${formatFinanceMonthLabel(first.month)} ~ ${formatFinanceMonthLabel(last.month)}`;
}

function filterSnapshotsForDashboardMode(
  snapshots: FinanceMonthlySnapshot[],
  effectiveMonth: string,
  mode: FinanceComparisonMode
): FinanceMonthlySnapshot[] {
  const orderedSnapshots = [...snapshots].sort((left, right) =>
    compareMonths(left.month, right.month)
  );

  if (mode === 'all') {
    return orderedSnapshots;
  }

  if (mode === 'year') {
    const selectedYear = Number(effectiveMonth.slice(0, 4));
    const previousYear = selectedYear - 1;

    return orderedSnapshots.filter((snapshot) => {
      const snapshotYear = Number(snapshot.month.slice(0, 4));
      return snapshotYear === previousYear || snapshotYear === selectedYear;
    });
  }

  const startMonth = shiftMonth(effectiveMonth, -6);

  return orderedSnapshots.filter(
    (snapshot) =>
      compareMonths(snapshot.month, startMonth) >= 0 &&
      compareMonths(snapshot.month, effectiveMonth) <= 0
  );
}

function buildRowValueMap<T extends { id: string; name: string }>(
  rows: T[],
  getValue: (row: T) => number
): Map<string, { label: string; value: number }> {
  return new Map(
    rows.map((row) => [
      row.id,
      {
        label: row.name || row.id,
        value: getValue(row),
      },
    ])
  );
}

function buildChangeReasons(
  current: FinanceMonthlySnapshot,
  previous: FinanceMonthlySnapshot
): FinanceAssetFlowReason[] {
  const reasons: FinanceAssetFlowReason[] = [];
  const assetCurrentMap = buildRowValueMap(current.assets, (row) =>
    normalizeNumber(row.amount)
  );
  const assetPreviousMap = buildRowValueMap(previous.assets, (row) =>
    normalizeNumber(row.amount)
  );
  const investmentCurrentMap = buildRowValueMap(current.investments, (row) =>
    normalizeNumber(row.valuation)
  );
  const investmentPreviousMap = buildRowValueMap(previous.investments, (row) =>
    normalizeNumber(row.valuation)
  );
  const debtCurrentMap = buildRowValueMap(current.debts, (row) =>
    normalizeNumber(row.balance)
  );
  const debtPreviousMap = buildRowValueMap(previous.debts, (row) =>
    normalizeNumber(row.balance)
  );

  for (const [id, currentValue] of assetCurrentMap) {
    const previousValue = assetPreviousMap.get(id)?.value ?? 0;
    const delta = currentValue.value - previousValue;

    if (delta !== 0) {
      reasons.push({
        id: `asset-${id}`,
        label: currentValue.label,
        value: delta,
        kind: 'asset',
      });
    }
  }

  for (const [id, previousValue] of assetPreviousMap) {
    if (!assetCurrentMap.has(id)) {
      reasons.push({
        id: `asset-removed-${id}`,
        label: previousValue.label,
        value: -previousValue.value,
        kind: 'asset',
      });
    }
  }

  for (const [id, currentValue] of investmentCurrentMap) {
    const previousValue = investmentPreviousMap.get(id)?.value ?? 0;
    const delta = currentValue.value - previousValue;

    if (delta !== 0) {
      reasons.push({
        id: `investment-${id}`,
        label: currentValue.label,
        value: delta,
        kind: 'investment',
      });
    }
  }

  for (const [id, currentValue] of debtCurrentMap) {
    const previousValue = debtPreviousMap.get(id)?.value ?? 0;
    const delta = previousValue - currentValue.value;

    if (delta !== 0) {
      reasons.push({
        id: `debt-${id}`,
        label: currentValue.label,
        value: delta,
        kind: 'debt',
      });
    }
  }

  return reasons.sort((left, right) => Math.abs(right.value) - Math.abs(left.value));
}

function buildAssetFlowEvents(
  snapshots: FinanceMonthlySnapshot[]
): FinanceAssetFlowEvent[] {
  const orderedSnapshots = [...snapshots].sort((left, right) =>
    compareMonths(left.month, right.month)
  );

  return orderedSnapshots.slice(1).map((current, index) => {
    const previous = orderedSnapshots[index];
    const currentSummary = buildFinanceSnapshotSummary(current);
    const previousSummary = buildFinanceSnapshotSummary(previous);

    return {
      month: current.month,
      label: formatFinanceMonthLabel(current.month),
      previousMonth: previous.month,
      totalAssetsChange: currentSummary.totalAssets - previousSummary.totalAssets,
      livingAssetsChange:
        currentSummary.totalLivingAssets - previousSummary.totalLivingAssets,
      investmentChange:
        currentSummary.totalInvestmentValuation -
        previousSummary.totalInvestmentValuation,
      debtChange: previousSummary.totalDebt - currentSummary.totalDebt,
      netWorthChange: currentSummary.netWorth - previousSummary.netWorth,
      reasons: buildChangeReasons(current, previous).slice(0, 5),
    };
  });
}

export function buildFinanceDashboardSummary(
  snapshots: FinanceMonthlySnapshot[],
  requestedMonth?: string | null,
  mode: FinanceComparisonMode = 'half'
): FinanceDashboardSummary {
  const availableMonths = [...snapshots]
    .sort((left, right) => compareMonths(left.month, right.month))
    .map((snapshot) => snapshot.month);
  const effectiveSnapshot = resolveEffectiveSnapshot(snapshots, requestedMonth);

  if (!effectiveSnapshot) {
    return {
      requestedMonth: requestedMonth ?? null,
      effectiveMonth: null,
      availableMonths,
      current: null,
      comparison: null,
      history: [],
      historyRangeLabel: null,
      assetFlowEvents: [],
    };
  }

  const current = buildFinanceSnapshotSummary(effectiveSnapshot);
  const referenceSnapshot = resolveReferenceSnapshot(
    snapshots,
    effectiveSnapshot.month,
    mode
  );
  const comparison = buildComparisonSummary(
    current,
    referenceSnapshot ? buildFinanceSnapshotSummary(referenceSnapshot) : null,
    mode
  );
  const dashboardSnapshots = filterSnapshotsForDashboardMode(
    snapshots,
    effectiveSnapshot.month,
    mode
  );
  const history = buildHistory(dashboardSnapshots);

  return {
    requestedMonth: requestedMonth ?? null,
    effectiveMonth: effectiveSnapshot.month,
    availableMonths,
    current,
    comparison,
    history,
    historyRangeLabel: buildHistoryRangeLabel(history),
    assetFlowEvents: buildAssetFlowEvents(dashboardSnapshots),
  };
}

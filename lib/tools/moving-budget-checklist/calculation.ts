import {
  MOVING_BUDGET_TEMPLATE_GROUPS,
  MOVING_BUDGET_TEMPLATE_ITEMS,
} from './templates.ts';
import type {
  MovingBudgetChartDatum,
  MovingBudgetComparisonDatum,
  MovingBudgetCustomItem,
  MovingBudgetState,
  MovingBudgetSummary,
  MovingBudgetTemplateItemState,
} from './types.ts';

const DOMINANT_GROUP_THRESHOLD = 0.6;

function normalizeAmount(value: number): number {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }

  return Math.floor(value);
}

function normalizeTemplateItemState(
  item: MovingBudgetTemplateItemState | undefined
): MovingBudgetTemplateItemState {
  return {
    amount: normalizeAmount(item?.amount ?? 0),
  };
}

function normalizeCustomItem(item: MovingBudgetCustomItem): MovingBudgetCustomItem {
  return {
    ...item,
    amount: normalizeAmount(item.amount),
  };
}

function buildProgressChartData(
  completedChecklistCount: number,
  totalChecklistCount: number
): MovingBudgetChartDatum[] {
  return [
    { id: 'completed', label: '완료', value: completedChecklistCount },
    {
      id: 'remaining',
      label: '남은 체크',
      value: Math.max(totalChecklistCount - completedChecklistCount, 0),
    },
  ];
}

function calculateRatio(value: number, total: number): number {
  if (value <= 0 || total <= 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
}

function buildComparisonData(
  items: Array<{ id: string; label: string; value: number }>,
  total: number
): MovingBudgetComparisonDatum[] {
  return items.map((item) => ({
    ...item,
    ratio: calculateRatio(item.value, total),
  }));
}

export function calculateMovingBudgetSummary(
  rawState: MovingBudgetState
): MovingBudgetSummary {
  const assets = {
    cash: normalizeAmount(rawState.assets.cash),
    stocks: normalizeAmount(rawState.assets.stocks),
    deposit: normalizeAmount(rawState.assets.deposit),
    savings: normalizeAmount(rawState.assets.savings),
    loan: normalizeAmount(rawState.assets.loan),
  };

  const normalizedTemplateItems = Object.fromEntries(
    MOVING_BUDGET_TEMPLATE_ITEMS.map((item) => [
      item.id,
      normalizeTemplateItemState(rawState.templateItems[item.id]),
    ])
  );
  const normalizedCustomItems = rawState.customItems.map(normalizeCustomItem);

  const totalAssets = Object.values(assets).reduce((sum, amount) => sum + amount, 0);
  const validChecklistIds = new Set(
    MOVING_BUDGET_TEMPLATE_ITEMS.map((item) => item.id)
  );
  const normalizedChecklistProgress = rawState.checklistProgress.filter((id) =>
    validChecklistIds.has(id)
  );
  const checklistProgressSet = new Set(normalizedChecklistProgress);

  const groupSummaries = MOVING_BUDGET_TEMPLATE_GROUPS.map((group) => {
    const customItemsForGroup = normalizedCustomItems.filter(
      (item) => item.groupId === group.id
    );
    const templateAmount = group.items.reduce(
      (sum, item) => sum + normalizedTemplateItems[item.id].amount,
      0
    );
    const customAmount = customItemsForGroup.reduce((sum, item) => sum + item.amount, 0);
    const templateItemCount = group.items.length;
    const completedChecklistCount = group.items.filter((item) =>
      checklistProgressSet.has(item.id)
    ).length;
    const totalChecklistCount = templateItemCount;

    return {
      id: group.id,
      label: group.label,
      totalAmount: templateAmount + customAmount,
      templateAmount,
      customAmount,
      templateItemCount,
      customItemCount: customItemsForGroup.length,
      itemCount: templateItemCount + customItemsForGroup.length,
      sharePercentage: 0,
      completedChecklistCount,
      totalChecklistCount,
      progressPercentage:
        totalChecklistCount === 0
          ? 0
          : Math.floor((completedChecklistCount / totalChecklistCount) * 100),
    };
  });

  const totalEstimatedCost = groupSummaries.reduce(
    (sum, group) => sum + group.totalAmount,
    0
  );
  const groupSummariesWithShare = groupSummaries.map((group) => ({
    ...group,
    sharePercentage: calculateRatio(group.totalAmount, totalEstimatedCost),
  }));
  const balanceAmount = totalAssets - totalEstimatedCost;
  const totalChecklistCount = MOVING_BUDGET_TEMPLATE_ITEMS.length;
  const completedChecklistCount = normalizedChecklistProgress.length;
  const progressPercentage =
    totalChecklistCount === 0
      ? 0
      : Math.floor((completedChecklistCount / totalChecklistCount) * 100);
  const costCompositionData = buildComparisonData(
    groupSummariesWithShare.map((group) => ({
      id: group.id,
      label: group.label,
      value: group.totalAmount,
    })),
    totalEstimatedCost
  );
  const sortedGroupsByCost = [...groupSummariesWithShare]
    .filter((group) => group.totalAmount > 0)
    .sort((a, b) => b.totalAmount - a.totalAmount);
  const dominantGroup =
    sortedGroupsByCost.length > 0 &&
    totalEstimatedCost > 0 &&
    sortedGroupsByCost[0].totalAmount / totalEstimatedCost >= DOMINANT_GROUP_THRESHOLD
      ? sortedGroupsByCost[0]
      : null;
  const adjustableGroups = (
    dominantGroup
      ? groupSummariesWithShare.filter(
          (group) => group.id !== dominantGroup.id && group.totalAmount > 0
        )
      : groupSummariesWithShare.filter((group) => group.totalAmount > 0)
  ).sort((a, b) => b.totalAmount - a.totalAmount);
  const adjustableComparisonTotal = adjustableGroups.reduce(
    (sum, group) => sum + group.totalAmount,
    0
  );
  const adjustableCostComparisonData = buildComparisonData(
    adjustableGroups.map((group) => ({
      id: group.id,
      label: group.label,
      value: group.totalAmount,
    })),
    adjustableComparisonTotal
  );

  return {
    totalAssets,
    totalEstimatedCost,
    balanceAmount,
    isShortage: balanceAmount < 0,
    completedChecklistCount,
    totalChecklistCount,
    progressPercentage,
    dominantGroupId: dominantGroup?.id ?? null,
    dominantGroupLabel: dominantGroup?.label ?? null,
    groupSummaries: groupSummariesWithShare,
    costChartData: groupSummariesWithShare.map((group) => ({
      id: group.id,
      label: group.label,
      value: group.totalAmount,
    })),
    progressChartData: buildProgressChartData(
      completedChecklistCount,
      totalChecklistCount
    ),
    costCompositionData,
    adjustableCostComparisonData,
  };
}

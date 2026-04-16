export type MovingBudgetGroupId =
  | 'purchase-costs'
  | 'pre-move-costs'
  | 'move-in-costs';

export type MovingBudgetAssetId =
  | 'cash'
  | 'stocks'
  | 'deposit'
  | 'savings'
  | 'loan';

export interface MovingBudgetTemplateItemDefinition {
  id: string;
  groupId: MovingBudgetGroupId;
  label: string;
}

export interface MovingBudgetTemplateGroupDefinition {
  id: MovingBudgetGroupId;
  label: string;
  items: MovingBudgetTemplateItemDefinition[];
}

export interface MovingBudgetAssets {
  cash: number;
  stocks: number;
  deposit: number;
  savings: number;
  loan: number;
}

export interface MovingBudgetTemplateItemState {
  amount: number;
}

export interface MovingBudgetCustomItem {
  id: string;
  groupId: MovingBudgetGroupId;
  label: string;
  amount: number;
}

export interface MovingBudgetState {
  assets: MovingBudgetAssets;
  templateItems: Record<string, MovingBudgetTemplateItemState>;
  checklistProgress: string[];
  customItems: MovingBudgetCustomItem[];
}

export interface MovingBudgetGroupSummary {
  id: MovingBudgetGroupId;
  label: string;
  totalAmount: number;
  templateAmount: number;
  customAmount: number;
  templateItemCount: number;
  customItemCount: number;
  itemCount: number;
  sharePercentage: number;
  completedChecklistCount: number;
  totalChecklistCount: number;
  progressPercentage: number;
}

export interface MovingBudgetChartDatum {
  id: string;
  label: string;
  value: number;
}

export interface MovingBudgetComparisonDatum extends MovingBudgetChartDatum {
  ratio: number;
}

export interface MovingBudgetSummary {
  totalAssets: number;
  totalEstimatedCost: number;
  balanceAmount: number;
  isShortage: boolean;
  completedChecklistCount: number;
  totalChecklistCount: number;
  progressPercentage: number;
  dominantGroupId: MovingBudgetGroupId | null;
  dominantGroupLabel: string | null;
  groupSummaries: MovingBudgetGroupSummary[];
  costChartData: MovingBudgetChartDatum[];
  progressChartData: MovingBudgetChartDatum[];
  costCompositionData: MovingBudgetComparisonDatum[];
  adjustableCostComparisonData: MovingBudgetComparisonDatum[];
}

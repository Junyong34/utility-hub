export type FinanceOwner = 'husband' | 'wife' | 'joint';

export type FinanceAssetCategory =
  | 'cash'
  | 'deposit'
  | 'saving'
  | 'cma'
  | 'housing_subscription'
  | 'other_liquid'
  | 'real_estate'
  | 'other_asset';

export type FinanceDebtCategory =
  | 'mortgage'
  | 'jeonse_loan'
  | 'credit_loan'
  | 'card_balance'
  | 'other_debt';

export type FinanceInvestmentCategory =
  | 'stock'
  | 'etf'
  | 'fund'
  | 'pension'
  | 'irp'
  | 'isa'
  | 'other_investment';

export type FinanceExpenseType = 'fixed' | 'variable';

export type FinanceFixedExpenseCategory =
  | 'insurance'
  | 'housing'
  | 'loan_interest'
  | 'child_education'
  | 'child_care'
  | 'communication'
  | 'subscription'
  | 'maintenance_fee'
  | 'other_fixed';

export type FinanceVariableExpenseCategory =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'medical'
  | 'dining'
  | 'leisure'
  | 'living'
  | 'event'
  | 'other_variable';

export type FinanceExpenseCategory =
  | FinanceFixedExpenseCategory
  | FinanceVariableExpenseCategory;

export interface FinanceIncomeSnapshot {
  husbandSalary: number;
  wifeSalary: number;
  memo?: string;
}

export interface FinanceBaseRow {
  id: string;
  owner: FinanceOwner;
  name: string;
  memo?: string;
}

export interface FinanceAssetRow extends FinanceBaseRow {
  category: FinanceAssetCategory;
  amount: number;
  autoAccumulate?: boolean;
  monthlyContribution?: number | null;
}

export interface FinanceDebtRow extends FinanceBaseRow {
  category: FinanceDebtCategory;
  balance: number;
  interestRate?: number | null;
  monthlyPayment?: number | null;
  monthlyInterest?: number | null;
}

export interface FinanceInvestmentRow extends FinanceBaseRow {
  category: FinanceInvestmentCategory;
  principal: number;
  valuation: number;
}

export interface FinanceExpenseRow extends FinanceBaseRow {
  type: FinanceExpenseType;
  category: FinanceExpenseCategory;
  amount: number;
  childRelated?: boolean;
}

export interface FinanceMonthlySnapshot {
  month: string;
  updatedAt: string;
  incomes: FinanceIncomeSnapshot;
  assets: FinanceAssetRow[];
  debts: FinanceDebtRow[];
  investments: FinanceInvestmentRow[];
  expenses: FinanceExpenseRow[];
}

export interface FinanceSnapshotsDataset {
  version: 1;
  snapshots: FinanceMonthlySnapshot[];
}

export interface CreateFinanceSnapshotResult {
  snapshot: FinanceMonthlySnapshot;
  created: boolean;
  sourceMonth: string | null;
}

export type FinanceComparisonMode = 'half' | 'year' | 'all';

export interface FinanceValueShareDatum {
  id: string;
  label: string;
  value: number;
  ratio: number;
}

export interface FinanceOwnerBreakdown {
  owner: FinanceOwner;
  income: number;
  livingAssets: number;
  investmentValuation: number;
  totalAssets: number;
  debt: number;
  expenses: number;
  netWorth: number;
}

export type FinanceComparisonMetricKey =
  | 'totalAssets'
  | 'totalLivingAssets'
  | 'totalDebt'
  | 'netWorth'
  | 'totalIncome'
  | 'totalExpenses'
  | 'savingsEstimate';

export interface FinanceMetricComparison {
  key: FinanceComparisonMetricKey;
  currentValue: number;
  referenceValue: number | null;
  absoluteChange: number | null;
  percentChange: number | null;
}

export interface FinanceSnapshotSummary {
  month: string;
  totalIncome: number;
  totalLivingAssets: number;
  totalInvestmentPrincipal: number;
  totalInvestmentValuation: number;
  totalInvestmentProfitLoss: number;
  totalInvestmentReturnRate: number;
  totalAssets: number;
  totalDebt: number;
  netWorth: number;
  totalExpenses: number;
  fixedExpenses: number;
  variableExpenses: number;
  childRelatedExpenses: number;
  savingsEstimate: number;
  fixedExpenseRatio: number;
  variableExpenseRatio: number;
  assetByCategory: FinanceValueShareDatum[];
  debtByCategory: FinanceValueShareDatum[];
  investmentByCategory: FinanceValueShareDatum[];
  expenseByCategory: FinanceValueShareDatum[];
  ownerBreakdowns: FinanceOwnerBreakdown[];
}

export interface FinanceTrendPoint {
  month: string;
  label: string;
  totalIncome: number;
  totalLivingAssets: number;
  totalInvestmentValuation: number;
  totalAssets: number;
  totalDebt: number;
  netWorth: number;
  totalExpenses: number;
  fixedExpenses: number;
  variableExpenses: number;
  childRelatedExpenses: number;
  savingsEstimate: number;
}

export interface FinanceProjectionPoint {
  month: string;
  label: string;
  yearIndex: number;
  projectedAssets: number;
  annualChange: number;
  annualGrowthRate: number;
  cumulativeChange: number;
  cumulativeChangeRate: number | null;
}

export interface FinanceProjectionSummary {
  baseMonth: string;
  baseAssets: number;
  annualGrowthRate: number;
  targetYear: number;
  targetMonth: string;
  years: number;
  projectedAssets: number;
  cumulativeChange: number;
  cumulativeChangeRate: number | null;
  points: FinanceProjectionPoint[];
}

export interface FinanceAssetFlowReason {
  id: string;
  label: string;
  value: number;
  kind: 'asset' | 'investment' | 'debt';
}

export interface FinanceAssetFlowEvent {
  month: string;
  label: string;
  previousMonth: string;
  totalAssetsChange: number;
  livingAssetsChange: number;
  investmentChange: number;
  debtChange: number;
  netWorthChange: number;
  reasons: FinanceAssetFlowReason[];
}

export interface FinanceComparisonSummary {
  mode: FinanceComparisonMode;
  label: string;
  currentMonth: string;
  referenceMonth: string | null;
  currentValue: number;
  referenceValue: number | null;
  absoluteChange: number | null;
  percentChange: number | null;
  metricComparisons: Record<FinanceComparisonMetricKey, FinanceMetricComparison>;
}

export interface FinanceDashboardSummary {
  requestedMonth: string | null;
  effectiveMonth: string | null;
  availableMonths: string[];
  current: FinanceSnapshotSummary | null;
  comparison: FinanceComparisonSummary | null;
  history: FinanceTrendPoint[];
  historyRangeLabel: string | null;
  assetFlowEvents: FinanceAssetFlowEvent[];
}

export interface FinanceReportBucketSummary {
  bucketId: string;
  kind: 'quarter' | 'half' | 'year';
  label: string;
  startMonth: string;
  endMonth: string;
  endSnapshotMonth: string;
  monthCount: number;
  totalIncome: number;
  totalExpenses: number;
  fixedExpenses: number;
  variableExpenses: number;
  childRelatedExpenses: number;
  totalLivingAssets: number;
  totalInvestmentValuation: number;
  totalAssets: number;
  totalDebt: number;
  netWorth: number;
  netWorthChangeAmount: number | null;
  netWorthChangeRate: number | null;
  investmentProfitLoss: number;
}

export interface FinanceReportsSummary {
  quarterly: FinanceReportBucketSummary[];
  semiAnnual: FinanceReportBucketSummary[];
  yearly: FinanceReportBucketSummary[];
}

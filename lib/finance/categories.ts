import type {
  FinanceAssetCategory,
  FinanceDebtCategory,
  FinanceExpenseType,
  FinanceFixedExpenseCategory,
  FinanceInvestmentCategory,
  FinanceVariableExpenseCategory,
} from './types.ts';

export interface FinanceCategoryOption<TCategory extends string> {
  value: TCategory;
  label: string;
}

export interface FinanceExpenseCategoryOption<TCategory extends string>
  extends FinanceCategoryOption<TCategory> {
  type: FinanceExpenseType;
  childRelated: boolean;
}

export const FINANCE_ASSET_CATEGORIES: FinanceCategoryOption<FinanceAssetCategory>[] = [
  { value: 'cash', label: '현금' },
  { value: 'deposit', label: '예금' },
  { value: 'saving', label: '적금' },
  { value: 'cma', label: 'CMA' },
  { value: 'housing_subscription', label: '청약통장' },
  { value: 'other_liquid', label: '기타 현금성 자산' },
  { value: 'real_estate', label: '부동산' },
  { value: 'other_asset', label: '기타 자산' },
];

export const FINANCE_DEBT_CATEGORIES: FinanceCategoryOption<FinanceDebtCategory>[] = [
  { value: 'mortgage', label: '주택담보대출' },
  { value: 'jeonse_loan', label: '전세대출' },
  { value: 'credit_loan', label: '신용대출' },
  { value: 'card_balance', label: '카드 미결제금' },
  { value: 'other_debt', label: '기타 대출' },
];

export const FINANCE_INVESTMENT_CATEGORIES: FinanceCategoryOption<FinanceInvestmentCategory>[] =
  [
    { value: 'stock', label: '주식' },
    { value: 'etf', label: 'ETF' },
    { value: 'fund', label: '펀드' },
    { value: 'pension', label: '연금' },
    { value: 'irp', label: 'IRP' },
    { value: 'isa', label: 'ISA' },
    { value: 'other_investment', label: '기타 투자자산' },
  ];

export const FINANCE_FIXED_EXPENSE_CATEGORIES: FinanceExpenseCategoryOption<FinanceFixedExpenseCategory>[] =
  [
    { value: 'insurance', label: '보험', type: 'fixed', childRelated: false },
    { value: 'housing', label: '주거비', type: 'fixed', childRelated: false },
    {
      value: 'loan_interest',
      label: '대출이자',
      type: 'fixed',
      childRelated: false,
    },
    {
      value: 'child_education',
      label: '자녀 교육비',
      type: 'fixed',
      childRelated: true,
    },
    {
      value: 'child_care',
      label: '자녀 돌봄/보육비',
      type: 'fixed',
      childRelated: true,
    },
    {
      value: 'communication',
      label: '통신비',
      type: 'fixed',
      childRelated: false,
    },
    {
      value: 'subscription',
      label: '구독료',
      type: 'fixed',
      childRelated: false,
    },
    {
      value: 'maintenance_fee',
      label: '관리비',
      type: 'fixed',
      childRelated: false,
    },
    {
      value: 'other_fixed',
      label: '기타 고정지출',
      type: 'fixed',
      childRelated: false,
    },
  ];

export const FINANCE_VARIABLE_EXPENSE_CATEGORIES: FinanceExpenseCategoryOption<FinanceVariableExpenseCategory>[] =
  [
    { value: 'food', label: '식비', type: 'variable', childRelated: false },
    { value: 'transport', label: '교통비', type: 'variable', childRelated: false },
    { value: 'shopping', label: '쇼핑', type: 'variable', childRelated: false },
    { value: 'medical', label: '의료비', type: 'variable', childRelated: false },
    { value: 'dining', label: '외식', type: 'variable', childRelated: false },
    { value: 'leisure', label: '문화/여가', type: 'variable', childRelated: false },
    { value: 'living', label: '생활용품', type: 'variable', childRelated: false },
    { value: 'event', label: '경조사비', type: 'variable', childRelated: false },
    {
      value: 'other_variable',
      label: '기타 변동지출',
      type: 'variable',
      childRelated: false,
    },
  ];

export const FINANCE_EXPENSE_CATEGORIES = [
  ...FINANCE_FIXED_EXPENSE_CATEGORIES,
  ...FINANCE_VARIABLE_EXPENSE_CATEGORIES,
] as const;

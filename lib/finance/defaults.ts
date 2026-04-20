import {
  FINANCE_FIXED_EXPENSE_CATEGORIES,
  FINANCE_VARIABLE_EXPENSE_CATEGORIES,
} from './categories.ts';
import type {
  FinanceExpenseRow,
  FinanceIncomeSnapshot,
  FinanceMonthlySnapshot,
} from './types.ts';

export function createDefaultIncomeSnapshot(): FinanceIncomeSnapshot {
  return {
    husbandSalary: 0,
    wifeSalary: 0,
    memo: '',
  };
}

export function createDefaultExpenseRows(): FinanceExpenseRow[] {
  const fixedRows = FINANCE_FIXED_EXPENSE_CATEGORIES.map((category) => ({
    id: `fixed-${category.value}`,
    owner: 'joint' as const,
    type: 'fixed' as const,
    category: category.value,
    name: category.label,
    amount: 0,
    childRelated: category.childRelated,
    memo: '',
  }));

  const variableRows = FINANCE_VARIABLE_EXPENSE_CATEGORIES.map((category) => ({
    id: `variable-${category.value}`,
    owner: 'joint' as const,
    type: 'variable' as const,
    category: category.value,
    name: category.label,
    amount: 0,
    childRelated: category.childRelated,
    memo: '',
  }));

  return [...fixedRows, ...variableRows];
}

export function createEmptyFinanceSnapshot(
  month: string,
  updatedAt = new Date().toISOString()
): FinanceMonthlySnapshot {
  return {
    month,
    updatedAt,
    incomes: createDefaultIncomeSnapshot(),
    assets: [],
    debts: [],
    investments: [],
    expenses: createDefaultExpenseRows(),
  };
}

export function cloneFinanceSnapshot(
  snapshot: FinanceMonthlySnapshot,
  month: string,
  updatedAt = new Date().toISOString()
): FinanceMonthlySnapshot {
  return {
    month,
    updatedAt,
    incomes: {
      husbandSalary: snapshot.incomes.husbandSalary,
      wifeSalary: snapshot.incomes.wifeSalary,
      memo: snapshot.incomes.memo ?? '',
    },
    assets: snapshot.assets.map((row) => ({ ...row })),
    debts: snapshot.debts.map((row) => ({ ...row })),
    investments: snapshot.investments.map((row) => ({ ...row })),
    expenses: snapshot.expenses.map((row) => ({ ...row })),
  };
}

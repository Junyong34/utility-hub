'use client';

import type {
  FinanceExpenseRow,
  FinanceMonthlySnapshot,
} from '@/lib/finance/types';
import {
  AmountField,
  OWNER_OPTIONS,
  RowShell,
  SelectField,
  TextField,
} from './InputPrimitives';

interface ExpensesTabProps {
  draft: FinanceMonthlySnapshot;
  onChange: (nextDraft: FinanceMonthlySnapshot) => void;
}

function ExpenseRowEditor({
  row,
  onUpdate,
}: {
  row: FinanceExpenseRow;
  onUpdate: (patch: Partial<FinanceExpenseRow>) => void;
}) {
  return (
    <RowShell title={row.name}>
      <SelectField
        id={`${row.id}-owner`}
        label="소유"
        value={row.owner}
        options={OWNER_OPTIONS}
        onChange={(value) => onUpdate({ owner: value })}
      />
      <AmountField
        id={`${row.id}-amount`}
        label="월 합계"
        value={row.amount}
        onChange={(value) => onUpdate({ amount: value ?? 0 })}
      />
      <TextField
        id={`${row.id}-memo`}
        label="메모"
        value={row.memo ?? ''}
        onChange={(value) => onUpdate({ memo: value })}
      />
    </RowShell>
  );
}

export function ExpensesTab({ draft, onChange }: ExpensesTabProps) {
  const updateRow = (rowId: string, patch: Partial<FinanceExpenseRow>) => {
    onChange({
      ...draft,
      expenses: draft.expenses.map((row) =>
        row.id === rowId ? { ...row, ...patch } : row
      ),
    });
  };
  const fixedExpenses = draft.expenses.filter((row) => row.type === 'fixed');
  const variableExpenses = draft.expenses.filter((row) => row.type === 'variable');

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <div className="space-y-1">
          <h3 className="text-base font-medium text-foreground">고정지출</h3>
          <p className="text-sm text-muted-foreground">
            매달 반복되는 지출은 카테고리별 월 합계로 관리합니다.
          </p>
        </div>
        {fixedExpenses.map((row) => (
          <ExpenseRowEditor
            key={row.id}
            row={row}
            onUpdate={(patch) => updateRow(row.id, patch)}
          />
        ))}
      </section>

      <section className="space-y-3">
        <div className="space-y-1">
          <h3 className="text-base font-medium text-foreground">변동지출</h3>
          <p className="text-sm text-muted-foreground">
            생활 소비는 개별 거래가 아니라 월별 카테고리 합계로 입력합니다.
          </p>
        </div>
        {variableExpenses.map((row) => (
          <ExpenseRowEditor
            key={row.id}
            row={row}
            onUpdate={(patch) => updateRow(row.id, patch)}
          />
        ))}
      </section>
    </div>
  );
}

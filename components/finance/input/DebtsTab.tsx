'use client';

import { Button } from '@/components/ui/button';
import { FINANCE_DEBT_CATEGORIES } from '@/lib/finance/categories';
import type {
  FinanceDebtCategory,
  FinanceDebtRow,
  FinanceMonthlySnapshot,
} from '@/lib/finance/types';
import {
  AmountField,
  nextRowId,
  OWNER_OPTIONS,
  RowShell,
  SelectField,
  TextField,
} from './InputPrimitives';

interface DebtsTabProps {
  draft: FinanceMonthlySnapshot;
  onChange: (nextDraft: FinanceMonthlySnapshot) => void;
}

function parseOptionalNumber(value: string): number | null {
  if (value.trim() === '') {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function createDebtRow(): FinanceDebtRow {
  return {
    id: nextRowId('debt'),
    owner: 'joint',
    category: 'mortgage',
    name: '',
    balance: 0,
    interestRate: null,
    monthlyPayment: null,
    monthlyInterest: null,
    memo: '',
  };
}

export function DebtsTab({ draft, onChange }: DebtsTabProps) {
  const updateRow = (rowId: string, patch: Partial<FinanceDebtRow>) => {
    onChange({
      ...draft,
      debts: draft.debts.map((row) =>
        row.id === rowId ? { ...row, ...patch } : row
      ),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            onChange({ ...draft, debts: [...draft.debts, createDebtRow()] })
          }
        >
          부채 추가
        </Button>
      </div>
      {draft.debts.length === 0 ? (
        <p className="rounded-lg border p-4 text-sm text-muted-foreground">
          등록된 부채 항목이 없습니다.
        </p>
      ) : (
        draft.debts.map((row, index) => (
          <RowShell
            key={row.id}
            title={`부채 ${index + 1}`}
            onRemove={() =>
              onChange({
                ...draft,
                debts: draft.debts.filter((item) => item.id !== row.id),
              })
            }
          >
            <SelectField
              id={`${row.id}-owner`}
              label="소유"
              value={row.owner}
              options={OWNER_OPTIONS}
              onChange={(value) => updateRow(row.id, { owner: value })}
            />
            <SelectField
              id={`${row.id}-category`}
              label="카테고리"
              value={row.category}
              options={FINANCE_DEBT_CATEGORIES}
              onChange={(value: FinanceDebtCategory) =>
                updateRow(row.id, { category: value })
              }
            />
            <TextField
              id={`${row.id}-name`}
              label="부채명"
              value={row.name}
              onChange={(value) => updateRow(row.id, { name: value })}
            />
            <AmountField
              id={`${row.id}-balance`}
              label="잔액"
              value={row.balance}
              onChange={(value) =>
                updateRow(row.id, { balance: value ?? 0 })
              }
            />
            <TextField
              id={`${row.id}-interest-rate`}
              label="이자율"
              type="number"
              value={row.interestRate ?? ''}
              onChange={(value) =>
                updateRow(row.id, { interestRate: parseOptionalNumber(value) })
              }
            />
            <AmountField
              id={`${row.id}-monthly-payment`}
              label="월 상환액"
              value={row.monthlyPayment}
              onChange={(value) =>
                updateRow(row.id, { monthlyPayment: value })
              }
              allowEmpty
            />
            <AmountField
              id={`${row.id}-monthly-interest`}
              label="월 이자"
              value={row.monthlyInterest}
              onChange={(value) =>
                updateRow(row.id, { monthlyInterest: value })
              }
              allowEmpty
            />
            <TextField
              id={`${row.id}-memo`}
              label="메모"
              value={row.memo ?? ''}
              onChange={(value) => updateRow(row.id, { memo: value })}
            />
          </RowShell>
        ))
      )}
    </div>
  );
}

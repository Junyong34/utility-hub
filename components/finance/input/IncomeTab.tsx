'use client';

import type { FinanceMonthlySnapshot } from '@/lib/finance/types';
import { AmountField, TextField } from './InputPrimitives';

interface IncomeTabProps {
  draft: FinanceMonthlySnapshot;
  onChange: (nextDraft: FinanceMonthlySnapshot) => void;
}

export function IncomeTab({ draft, onChange }: IncomeTabProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <AmountField
        id="husband-salary"
        label="남편 월급"
        value={draft.incomes.husbandSalary}
        onChange={(value) =>
          onChange({
            ...draft,
            incomes: {
              ...draft.incomes,
              husbandSalary: value ?? 0,
            },
          })
        }
      />
      <AmountField
        id="wife-salary"
        label="아내 월급"
        value={draft.incomes.wifeSalary}
        onChange={(value) =>
          onChange({
            ...draft,
            incomes: {
              ...draft.incomes,
              wifeSalary: value ?? 0,
            },
          })
        }
      />
      <div className="md:col-span-2">
        <TextField
          id="income-memo"
          label="수입 메모"
          value={draft.incomes.memo ?? ''}
          onChange={(value) =>
            onChange({
              ...draft,
              incomes: {
                ...draft.incomes,
                memo: value,
              },
            })
          }
        />
      </div>
    </div>
  );
}

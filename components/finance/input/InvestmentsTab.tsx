'use client';

import { Button } from '@/components/ui/button';
import { FINANCE_INVESTMENT_CATEGORIES } from '@/lib/finance/categories';
import type {
  FinanceInvestmentCategory,
  FinanceInvestmentRow,
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

interface InvestmentsTabProps {
  draft: FinanceMonthlySnapshot;
  onChange: (nextDraft: FinanceMonthlySnapshot) => void;
}

function createInvestmentRow(): FinanceInvestmentRow {
  return {
    id: nextRowId('investment'),
    owner: 'joint',
    category: 'etf',
    name: '',
    principal: 0,
    valuation: 0,
    memo: '',
  };
}

export function InvestmentsTab({ draft, onChange }: InvestmentsTabProps) {
  const updateRow = (rowId: string, patch: Partial<FinanceInvestmentRow>) => {
    onChange({
      ...draft,
      investments: draft.investments.map((row) =>
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
            onChange({
              ...draft,
              investments: [...draft.investments, createInvestmentRow()],
            })
          }
        >
          투자 추가
        </Button>
      </div>
      {draft.investments.length === 0 ? (
        <p className="rounded-lg border p-4 text-sm text-muted-foreground">
          등록된 투자 항목이 없습니다.
        </p>
      ) : (
        draft.investments.map((row, index) => (
          <RowShell
            key={row.id}
            title={`투자 ${index + 1}`}
            onRemove={() =>
              onChange({
                ...draft,
                investments: draft.investments.filter(
                  (item) => item.id !== row.id
                ),
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
              options={FINANCE_INVESTMENT_CATEGORIES}
              onChange={(value: FinanceInvestmentCategory) =>
                updateRow(row.id, { category: value })
              }
            />
            <TextField
              id={`${row.id}-name`}
              label="상품명"
              value={row.name}
              onChange={(value) => updateRow(row.id, { name: value })}
            />
            <AmountField
              id={`${row.id}-principal`}
              label="원금"
              value={row.principal}
              onChange={(value) =>
                updateRow(row.id, { principal: value ?? 0 })
              }
            />
            <AmountField
              id={`${row.id}-valuation`}
              label="평가금액"
              value={row.valuation}
              onChange={(value) =>
                updateRow(row.id, { valuation: value ?? 0 })
              }
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

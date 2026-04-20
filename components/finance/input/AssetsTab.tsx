'use client';

import { Button } from '@/components/ui/button';
import { FINANCE_ASSET_CATEGORIES } from '@/lib/finance/categories';
import type {
  FinanceAssetCategory,
  FinanceAssetRow,
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

interface AssetsTabProps {
  draft: FinanceMonthlySnapshot;
  onChange: (nextDraft: FinanceMonthlySnapshot) => void;
}

function createAssetRow(): FinanceAssetRow {
  return {
    id: nextRowId('asset'),
    owner: 'joint',
    category: 'deposit',
    name: '',
    amount: 0,
    autoAccumulate: false,
    monthlyContribution: null,
    memo: '',
  };
}

export function AssetsTab({ draft, onChange }: AssetsTabProps) {
  const updateRow = (rowId: string, patch: Partial<FinanceAssetRow>) => {
    onChange({
      ...draft,
      assets: draft.assets.map((row) =>
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
            onChange({ ...draft, assets: [...draft.assets, createAssetRow()] })
          }
        >
          자산 추가
        </Button>
      </div>
      {draft.assets.length === 0 ? (
        <p className="rounded-lg border p-4 text-sm text-muted-foreground">
          등록된 자산 항목이 없습니다.
        </p>
      ) : (
        draft.assets.map((row, index) => (
          <RowShell
            key={row.id}
            title={`자산 ${index + 1}`}
            onRemove={() =>
              onChange({
                ...draft,
                assets: draft.assets.filter((item) => item.id !== row.id),
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
              options={FINANCE_ASSET_CATEGORIES}
              onChange={(value: FinanceAssetCategory) =>
                updateRow(row.id, { category: value })
              }
            />
            <TextField
              id={`${row.id}-name`}
              label="자산명"
              value={row.name}
              onChange={(value) => updateRow(row.id, { name: value })}
            />
            <AmountField
              id={`${row.id}-amount`}
              label="금액"
              value={row.amount}
              onChange={(value) =>
                updateRow(row.id, { amount: value ?? 0 })
              }
            />
            <div className="space-y-2 rounded-lg border border-emerald-200 bg-emerald-50/40 p-3 dark:border-emerald-900/60 dark:bg-emerald-950/20">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  checked={Boolean(row.autoAccumulate)}
                  onChange={(event) =>
                    updateRow(row.id, {
                      autoAccumulate: event.target.checked,
                      monthlyContribution: event.target.checked
                        ? row.monthlyContribution ?? 0
                        : null,
                    })
                  }
                />
                매월 자동 누적
              </label>
              {row.autoAccumulate ? (
                <AmountField
                  id={`${row.id}-monthly-contribution`}
                  label="월 납입액"
                  value={row.monthlyContribution}
                  onChange={(value) =>
                    updateRow(row.id, { monthlyContribution: value ?? 0 })
                  }
                  allowEmpty
                />
              ) : (
                <p className="text-xs text-muted-foreground">
                  적금, 청약처럼 매달 같은 금액이 쌓이는 자산에만 사용합니다.
                </p>
              )}
            </div>
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

'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { MovingBudgetCustomItem } from '@/lib/tools/moving-budget-checklist';
import { MOVING_BUDGET_ARIA_LABELS } from '../accessibility';
import { formatAmountInputValue, parseAmountInput } from '../constants';

interface CustomBudgetItemRowProps {
  item: MovingBudgetCustomItem;
  index: number;
  onChange: (itemId: string, updates: Partial<MovingBudgetCustomItem>) => void;
  onRemove: (itemId: string) => void;
}

export function CustomBudgetItemRow({
  item,
  index,
  onChange,
  onRemove,
}: CustomBudgetItemRowProps) {
  return (
    <div className="rounded-lg border border-dashed border-border p-3">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_140px_auto]">
        <div className="space-y-2">
          <Label htmlFor={`${item.id}-label`} className="text-sm">
            추가 항목 이름 {index}
          </Label>
          <Input
            id={`${item.id}-label`}
            aria-label={MOVING_BUDGET_ARIA_LABELS.customItemName(index)}
            value={item.label}
            onChange={(event) => onChange(item.id, { label: event.target.value })}
            placeholder="추가 항목 이름"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${item.id}-amount`} className="text-sm">
            추가 항목 금액 {index}
          </Label>
          <Input
            id={`${item.id}-amount`}
            aria-label={MOVING_BUDGET_ARIA_LABELS.customItemAmount(index)}
            inputMode="numeric"
            value={formatAmountInputValue(item.amount)}
            onChange={(event) =>
              onChange(item.id, { amount: parseAmountInput(event.target.value) })
            }
            placeholder="0"
          />
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`추가 항목 삭제 ${index}`}
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

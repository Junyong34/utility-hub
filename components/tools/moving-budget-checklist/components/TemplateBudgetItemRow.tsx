'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type {
  MovingBudgetTemplateItemDefinition,
  MovingBudgetTemplateItemState,
} from '@/lib/tools/moving-budget-checklist';
import { MOVING_BUDGET_ARIA_LABELS } from '../accessibility';
import { formatAmountInputValue, parseAmountInput } from '../constants';

interface TemplateBudgetItemRowProps {
  item: MovingBudgetTemplateItemDefinition;
  state: MovingBudgetTemplateItemState;
  checklistProgress: string[];
  onChange: (itemId: string, updates: Partial<MovingBudgetTemplateItemState>) => void;
  onChecklistToggle: (entryId: string) => void;
}

export function TemplateBudgetItemRow({
  item,
  state,
  checklistProgress,
  onChange,
  onChecklistToggle,
}: TemplateBudgetItemRowProps) {
  const checked = checklistProgress.includes(item.id);
  const ariaLabel = MOVING_BUDGET_ARIA_LABELS.checklist(item.label, '완료');

  return (
    <div className="rounded-lg border border-border/70 p-3">
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor={`${item.id}-amount`}>{item.label}</Label>
          <Input
            id={`${item.id}-amount`}
            aria-label={item.label}
            inputMode="numeric"
            value={formatAmountInputValue(state.amount)}
            onChange={(event) =>
              onChange(item.id, { amount: parseAmountInput(event.target.value) })
            }
            placeholder="0"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm">
          <Checkbox
            checked={checked}
            onCheckedChange={() => onChecklistToggle(item.id)}
            aria-label={ariaLabel}
          />
          <span>완료</span>
        </label>
      </div>
    </div>
  );
}

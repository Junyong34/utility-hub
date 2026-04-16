'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import type {
  MovingBudgetCustomItem,
  MovingBudgetGroupId,
  MovingBudgetTemplateGroupDefinition,
  MovingBudgetTemplateItemState,
} from '@/lib/tools/moving-budget-checklist';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MOVING_BUDGET_ARIA_LABELS } from '../accessibility';
import { TemplateBudgetItemRow } from './TemplateBudgetItemRow';
import { CustomBudgetItemRow } from './CustomBudgetItemRow';

interface BudgetGroupCardProps {
  group: MovingBudgetTemplateGroupDefinition;
  templateItemState: Record<string, MovingBudgetTemplateItemState>;
  checklistProgress: string[];
  customItems: MovingBudgetCustomItem[];
  onTemplateItemChange: (itemId: string, updates: Partial<MovingBudgetTemplateItemState>) => void;
  onChecklistToggle: (entryId: string) => void;
  onAddCustomItem: (groupId: MovingBudgetGroupId) => void;
  onUpdateCustomItem: (itemId: string, updates: Partial<MovingBudgetCustomItem>) => void;
  onRemoveCustomItem: (itemId: string) => void;
}

export function BudgetGroupCard({
  group,
  templateItemState,
  checklistProgress,
  customItems,
  onTemplateItemChange,
  onChecklistToggle,
  onAddCustomItem,
  onUpdateCustomItem,
  onRemoveCustomItem,
}: BudgetGroupCardProps) {
  const [open, setOpen] = useState(true);

  return (
    <Card>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>{group.label}</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                aria-label={MOVING_BUDGET_ARIA_LABELS.addCustomItem(group.label)}
                onClick={() => onAddCustomItem(group.id)}
              >
                <Plus className="mr-1 h-4 w-4" />
                항목 추가
              </Button>
              <CollapsibleTrigger asChild>
                <Button type="button" size="icon" variant="ghost" aria-label={`${group.label} 접기`}>
                  {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-3">
            {group.items.map((item) => (
              <TemplateBudgetItemRow
                key={item.id}
                item={item}
                state={templateItemState[item.id]}
                checklistProgress={checklistProgress}
                onChange={onTemplateItemChange}
                onChecklistToggle={onChecklistToggle}
              />
            ))}

            {customItems.map((item, index) => (
              <CustomBudgetItemRow
                key={item.id}
                item={item}
                index={index + 1}
                onChange={onUpdateCustomItem}
                onRemove={onRemoveCustomItem}
              />
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

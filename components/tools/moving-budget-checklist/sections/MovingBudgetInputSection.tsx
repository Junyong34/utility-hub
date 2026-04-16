'use client';

import type { useMovingBudgetChecklist } from '../hooks/useMovingBudgetChecklist';
import { AssetsSectionCard } from '../components/AssetsSectionCard';
import { BudgetGroupCard } from '../components/BudgetGroupCard';
import { MOVING_BUDGET_GROUPS } from '../constants';

interface MovingBudgetInputSectionProps {
  checklist: ReturnType<typeof useMovingBudgetChecklist>;
}

export function MovingBudgetInputSection({
  checklist,
}: MovingBudgetInputSectionProps) {
  return (
    <div className="space-y-4">
      <AssetsSectionCard
        assets={checklist.state.assets}
        onChange={checklist.setAsset}
      />

      {MOVING_BUDGET_GROUPS.map((group) => (
        <BudgetGroupCard
          key={group.id}
          group={group}
          templateItemState={checklist.state.templateItems}
          checklistProgress={checklist.state.checklistProgress}
          customItems={checklist.state.customItems.filter(
            (item) => item.groupId === group.id
          )}
          onTemplateItemChange={checklist.setTemplateItem}
          onChecklistToggle={checklist.toggleChecklist}
          onAddCustomItem={checklist.addCustomItem}
          onUpdateCustomItem={checklist.updateCustomItem}
          onRemoveCustomItem={checklist.removeCustomItem}
        />
      ))}
    </div>
  );
}

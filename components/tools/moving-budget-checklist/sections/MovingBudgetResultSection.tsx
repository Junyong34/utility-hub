'use client';

import type { useMovingBudgetChecklist } from '../hooks/useMovingBudgetChecklist';
import { ResultHeroCard } from '../components/ResultHeroCard';
import { CostStructurePanel } from '../components/CostStructurePanel';
import { GroupSummaryBoard } from '../components/GroupSummaryBoard';
import { ChecklistProgressBoard } from '../components/ChecklistProgressBoard';
import { ShareButton } from '../components/ShareButton';

interface MovingBudgetResultSectionProps {
  checklist: ReturnType<typeof useMovingBudgetChecklist>;
}

export function MovingBudgetResultSection({
  checklist,
}: MovingBudgetResultSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ShareButton />
      </div>
      <ResultHeroCard summary={checklist.summary} />
      <CostStructurePanel summary={checklist.summary} />
      <GroupSummaryBoard summary={checklist.summary} />
      <ChecklistProgressBoard summary={checklist.summary} />
    </div>
  );
}

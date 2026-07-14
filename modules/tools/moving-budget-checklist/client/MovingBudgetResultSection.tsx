'use client';

import {
  ChecklistProgressBoard,
  CostStructurePanel,
  GroupSummaryBoard,
} from '../ui';
import { ResultHeroCard } from './ResultHeroCard';
import { ShareButton } from './ShareButton';
import type { useMovingBudgetChecklist } from './useMovingBudgetChecklist';

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

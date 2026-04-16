'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type {
  MovingBudgetGroupId,
  MovingBudgetSummary,
} from '@/lib/tools/moving-budget-checklist';
import { cn } from '@/lib/utils';
import { MOVING_BUDGET_GROUP_META } from '../constants';

interface ChecklistProgressBoardProps {
  summary: MovingBudgetSummary;
}

export function ChecklistProgressBoard({ summary }: ChecklistProgressBoardProps) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>체크 진행 보드</CardTitle>
        <p className="text-sm text-muted-foreground">
          전체 진행률과 그룹별 막힘 지점을 같이 확인합니다.
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        <section className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">전체 진행</p>
              <p className="text-sm text-muted-foreground">
                {summary.completedChecklistCount}/{summary.totalChecklistCount} 항목 완료
              </p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {summary.progressPercentage}%
            </p>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground transition-[width]"
              style={{ width: `${summary.progressPercentage}%` }}
            />
          </div>
        </section>

        <section className="space-y-3">
          {summary.groupSummaries.map((group) => {
            const meta = MOVING_BUDGET_GROUP_META[group.id as MovingBudgetGroupId];

            return (
              <div key={group.id} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {group.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {group.completedChecklistCount}/{group.totalChecklistCount} 항목 완료
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-foreground">
                    {group.progressPercentage}%
                  </span>
                </div>

                <div className={cn('h-2 overflow-hidden rounded-full bg-muted')}>
                  <div
                    className={cn('h-full rounded-full', meta.barClass)}
                    style={{ width: `${group.progressPercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </section>
      </CardContent>
    </Card>
  );
}

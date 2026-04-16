'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrencyToKoreanUnits } from '@/lib/tools/formatting';
import type {
  MovingBudgetGroupId,
  MovingBudgetSummary,
} from '@/lib/tools/moving-budget-checklist';
import { cn } from '@/lib/utils';
import { MOVING_BUDGET_GROUP_META } from '../constants';

interface GroupSummaryBoardProps {
  summary: MovingBudgetSummary;
}

export function GroupSummaryBoard({ summary }: GroupSummaryBoardProps) {
  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-foreground">그룹 상태 보드</h2>
        <p className="text-sm text-muted-foreground">
          그룹별 금액, 비중, 체크 진행 상태를 한 번에 봅니다.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {summary.groupSummaries.map((group) => {
          const meta = MOVING_BUDGET_GROUP_META[group.id as MovingBudgetGroupId];
          const isDominant = summary.dominantGroupId === group.id;

          return (
            <Card
              key={group.id}
              className={cn(
                'overflow-hidden',
                isDominant && 'ring-2 ring-teal-500/30 ring-offset-0'
              )}
            >
              <div className={cn('h-1 w-full', meta.accentClass)} />
              <CardContent className="space-y-4 pt-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{group.label}</p>
                    <p className="text-xs text-muted-foreground">
                      항목 {group.itemCount}개 · 체크 {group.completedChecklistCount}/
                      {group.totalChecklistCount}
                    </p>
                  </div>
                  <Badge variant="outline" className={meta.textClass}>
                    {group.sharePercentage}%
                  </Badge>
                </div>

                <div className="space-y-1">
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    {formatCurrencyToKoreanUnits(group.totalAmount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    템플릿 {formatCurrencyToKoreanUnits(group.templateAmount)} · 추가{' '}
                    {formatCurrencyToKoreanUnits(group.customAmount)}
                  </p>
                </div>

                <div className={cn('rounded-lg px-3 py-3', meta.bgClass)}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-foreground">체크 진행</span>
                    <span className="font-medium text-foreground">
                      {group.progressPercentage}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-background/80">
                    <div
                      className={cn('h-full rounded-full', meta.barClass)}
                      style={{ width: `${group.progressPercentage}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                    <span>템플릿 {group.templateItemCount}개</span>
                    <span>추가 {group.customItemCount}개</span>
                  </div>
                </div>

                {isDominant ? (
                  <p className="text-xs text-muted-foreground">
                    현재 총예상비용에서 가장 큰 비중을 차지하는 그룹입니다.
                  </p>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

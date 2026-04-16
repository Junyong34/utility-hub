'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrencyToKoreanUnits } from '@/lib/tools/formatting';
import type {
  MovingBudgetComparisonDatum,
  MovingBudgetSummary,
  MovingBudgetGroupId,
} from '@/lib/tools/moving-budget-checklist';
import { MOVING_BUDGET_GROUP_META } from '../constants';

interface CostStructurePanelProps {
  summary: MovingBudgetSummary;
}

function GroupLegendRow({ item }: { item: MovingBudgetComparisonDatum }) {
  const meta = MOVING_BUDGET_GROUP_META[item.id as MovingBudgetGroupId];

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border/60 px-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${meta.barClass}`} />
        <span className="truncate text-sm text-foreground">{item.label}</span>
      </div>
      <div className="flex shrink-0 items-center gap-3 text-sm">
        <span className="font-medium text-foreground">
          {formatCurrencyToKoreanUnits(item.value)}
        </span>
        <span className="text-muted-foreground">{item.ratio}%</span>
      </div>
    </div>
  );
}

export function CostStructurePanel({ summary }: CostStructurePanelProps) {
  const hasCostData = summary.totalEstimatedCost > 0;

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle>비용 구조 해석</CardTitle>
          {summary.dominantGroupLabel ? (
            <Badge variant="outline" className="text-xs">
              큰 비중: {summary.dominantGroupLabel}
            </Badge>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {hasCostData ? (
          <>
            <section className="space-y-3">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground">전체 예산 비중</h3>
                <p className="text-sm text-muted-foreground">
                  전체 총예상비용 안에서 각 그룹이 차지하는 비중입니다.
                </p>
              </div>

              <div className="overflow-hidden rounded-full bg-muted">
                <div className="flex h-3 w-full">
                  {summary.costCompositionData.map((item) => {
                    const meta = MOVING_BUDGET_GROUP_META[item.id as MovingBudgetGroupId];

                    return (
                      <div
                        key={item.id}
                        className={meta.barClass}
                        style={{ width: `${item.ratio}%` }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                {summary.costCompositionData.map((item) => (
                  <GroupLegendRow key={item.id} item={item} />
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground">
                  {summary.dominantGroupId ? '조정 가능 비교' : '그룹 비교'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {summary.dominantGroupId
                    ? `${summary.dominantGroupLabel}이(가) 전체 비용을 크게 좌우해, 나머지 그룹끼리 다시 비교했습니다.`
                    : '현재는 모든 그룹을 같은 축에서 비교할 수 있습니다.'}
                </p>
              </div>

              {summary.adjustableCostComparisonData.length > 0 ? (
                <div className="space-y-3">
                  {summary.adjustableCostComparisonData.map((item, index) => {
                    const meta =
                      MOVING_BUDGET_GROUP_META[item.id as MovingBudgetGroupId];

                    return (
                      <div key={item.id} className="space-y-2">
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="text-muted-foreground">
                              {index + 1}.
                            </span>
                            <span className="truncate text-foreground">
                              {item.label}
                            </span>
                          </div>
                          <div className="flex shrink-0 items-center gap-3">
                            <span className="font-medium text-foreground">
                              {formatCurrencyToKoreanUnits(item.value)}
                            </span>
                            <span className="text-muted-foreground">{item.ratio}%</span>
                          </div>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${meta.barClass}`}
                            style={{ width: `${item.ratio}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border px-4 py-5 text-sm text-muted-foreground">
                  아직 비교할 다른 비용 그룹이 없습니다. 다른 그룹에도 금액을 입력하면
                  상대 비교가 보입니다.
                </div>
              )}
            </section>
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
            아직 비용 구조를 해석할 데이터가 없습니다. 아파트 가격이나 입주 비용을
            하나만 입력해도 전체 비중과 비교 보드가 바로 열립니다.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

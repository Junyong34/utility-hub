'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { CostBreakdownItem } from '@/lib/tools/home-buying-funds-calculator';
import { STAGE_LABELS } from '../constants';

interface SpendingFlowChartProps {
  breakdown: CostBreakdownItem[];
}

export function SpendingFlowChart({ breakdown }: SpendingFlowChartProps) {
  // 단계별로 그룹화하고 금액 합산
  const stageGroups = breakdown.reduce(
    (acc, item) => {
      if (!acc[item.stage]) {
        acc[item.stage] = {
          stage: item.stage,
          label: STAGE_LABELS[item.stage],
          amount: 0,
          items: [],
        };
      }
      acc[item.stage].amount += item.amount;
      acc[item.stage].items.push(item);
      return acc;
    },
    {} as Record<
      string,
      {
        stage: string;
        label: string;
        amount: number;
        items: CostBreakdownItem[];
      }
    >
  );

  const stages = ['contract', 'loan', 'balance', 'registration', 'move'];
  const flowItems = stages
    .map(stage => stageGroups[stage])
    .filter(Boolean);

  return (
    <Card>
      <CardHeader>
        <CardTitle>지출 흐름도</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {flowItems.map((item, index) => (
            <div key={item.stage}>
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      <h3 className="font-semibold">{item.label}</h3>
                    </div>
                    <div className="mt-3 ml-8 space-y-1">
                      {item.items.map(subItem => (
                        <div
                          key={subItem.id}
                          className="flex justify-between items-baseline text-sm"
                        >
                          <span className="text-muted-foreground">{subItem.label}</span>
                          <span className="font-medium">
                            {subItem.amount.toLocaleString('ko-KR')}원
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm text-muted-foreground">단계 합계</p>
                    <p className="text-lg font-bold">
                      {item.amount.toLocaleString('ko-KR')}원
                    </p>
                  </div>
                </div>
              </div>
              {index < flowItems.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 총계 */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-baseline">
            <span className="text-lg font-bold">전체 흐름 합계</span>
            <span className="text-2xl font-bold text-primary">
              {breakdown.reduce((sum, item) => sum + item.amount, 0).toLocaleString('ko-KR')}원
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

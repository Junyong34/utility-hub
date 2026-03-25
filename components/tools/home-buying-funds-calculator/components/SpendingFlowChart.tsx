'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CostBreakdownItem } from '@/lib/tools/home-buying-funds-calculator';
import { STAGE_LABELS } from '../constants';

interface SpendingFlowChartProps {
  breakdown: CostBreakdownItem[];
  hasDownPaymentPaid?: boolean;
}

const STAGE_ORDER = ['contract', 'loan', 'balance', 'registration', 'move'] as const;

const STAGE_COLORS: Record<string, string> = {
  contract: 'bg-blue-500 text-white',
  loan: 'bg-violet-500 text-white',
  balance: 'bg-orange-500 text-white',
  registration: 'bg-teal-500 text-white',
  move: 'bg-green-500 text-white',
};

const STAGE_CONNECTOR_COLORS: Record<string, string> = {
  contract: 'border-blue-500/40',
  loan: 'border-violet-500/40',
  balance: 'border-orange-500/40',
  registration: 'border-teal-500/40',
  move: 'border-green-500/40',
};

export function SpendingFlowChart({ breakdown, hasDownPaymentPaid = false }: SpendingFlowChartProps) {
  // 단계별로 그룹화 및 금액 합산
  const stageGroups = breakdown.reduce(
    (acc, item) => {
      if (!acc[item.stage]) {
        acc[item.stage] = {
          stage: item.stage,
          label: STAGE_LABELS[item.stage as keyof typeof STAGE_LABELS],
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
    >,
  );

  const flowItems = STAGE_ORDER.map(stage => stageGroups[stage]).filter(Boolean);

  // 계약금 지불 완료 시 총 비용에서 제외
  const downPaymentAmount = breakdown.find(item => item.id === 'down-payment')?.amount ?? 0;
  const totalAmount = breakdown.reduce((sum, item) => sum + item.amount, 0);
  const displayTotalAmount = hasDownPaymentPaid ? totalAmount - downPaymentAmount : totalAmount;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">순서 흐름도</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="relative">
          {flowItems.map((item, index) => {
            const isLast = index === flowItems.length - 1;
            const circleColor = STAGE_COLORS[item.stage] ?? 'bg-primary text-primary-foreground';
            const connectorColor = STAGE_CONNECTOR_COLORS[item.stage] ?? 'border-border';

            return (
              <div key={item.stage} className="flex gap-4">
                {/* 좌측: 번호 원형 + 연결선 */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shrink-0 ${circleColor}`}
                  >
                    {index + 1}
                  </div>
                  {!isLast && (
                    <div
                      className={`mt-1 flex-1 w-0 border-l-2 border-dashed min-h-[2.5rem] ${connectorColor}`}
                    />
                  )}
                </div>

                {/* 우측: 단계 콘텐츠 */}
                <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-4'}`}>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm">{item.label}</h3>
                    <span className="text-sm font-bold tabular-nums shrink-0 text-foreground">
                      {item.amount.toLocaleString('ko-KR')}원
                    </span>
                  </div>

                  {/* 항목 목록 */}
                  {item.items.length > 0 && (
                    <div className="rounded-md bg-muted/40 border border-border/50 px-3 py-2 space-y-1.5">
                      {item.items.map(subItem => (
                        <div
                          key={subItem.id}
                          className="flex items-baseline justify-between gap-2 text-xs"
                        >
                          <span className="text-muted-foreground">
                            {subItem.label}
                            {subItem.id === 'down-payment' && hasDownPaymentPaid && ' (지불완료)'}
                          </span>
                          <span className="font-medium tabular-nums text-foreground shrink-0">
                            {subItem.amount.toLocaleString('ko-KR')}원
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 총계 */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-muted-foreground">전체 합계</span>
            <span className="text-2xl font-bold text-primary tabular-nums">
              {displayTotalAmount.toLocaleString('ko-KR')}
              <span className="text-base ml-0.5">원</span>
            </span>
          </div>
          {hasDownPaymentPaid && downPaymentAmount > 0 && (
            <p className="text-xs text-muted-foreground mt-2 text-right">
              * 계약금({downPaymentAmount.toLocaleString('ko-KR')}원)은 이미 지불 완료
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CostBreakdownItem } from '@/lib/tools/home-buying-funds-calculator';
import { STAGE_LABELS, CATEGORY_LABELS } from '../constants';
import { NationalHousingBondInfoDialog } from './NationalHousingBondInfoDialog';

interface CostBreakdownTableProps {
  breakdown: CostBreakdownItem[];
  hasDownPaymentPaid?: boolean;
}

const STAGE_ORDER = ['contract', 'loan', 'balance', 'registration', 'move'] as const;

const STAGE_BADGE_COLORS: Record<string, string> = {
  contract: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  loan: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  balance: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  registration: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
  move: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
};

function ConfidenceBadge({ confidence }: { confidence: 'high' | 'medium' | 'low' }) {
  const map = {
    high: { label: '정확', className: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20' },
    medium: { label: '보통', className: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20' },
    low: { label: '참고', className: 'bg-muted text-muted-foreground border-border' },
  };
  const { label, className } = map[confidence];
  return (
    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${className}`}>
      {label}
    </Badge>
  );
}

export function CostBreakdownTable({ breakdown, hasDownPaymentPaid = false }: CostBreakdownTableProps) {
  const groupedByStage = breakdown.reduce(
    (acc, item) => {
      if (!acc[item.stage]) acc[item.stage] = [];
      acc[item.stage].push(item);
      return acc;
    },
    {} as Record<string, CostBreakdownItem[]>,
  );

  // 계약금 지불 완료 시 총 비용에서 제외
  const downPaymentAmount = breakdown.find(item => item.id === 'down-payment')?.amount ?? 0;
  const totalAmount = breakdown.reduce((sum, item) => sum + item.amount, 0);
  const displayTotalAmount = hasDownPaymentPaid ? totalAmount - downPaymentAmount : totalAmount;

  const shouldShowNationalHousingBondInfo = (item: CostBreakdownItem) =>
    item.id === 'national-housing-bond';

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">필요한 지출</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-5">
          {STAGE_ORDER.filter(stage => groupedByStage[stage]).map(stage => {
            const items = groupedByStage[stage];
            const stageTotal = items.reduce((s, i) => s + i.amount, 0);
            const badgeColor = STAGE_BADGE_COLORS[stage] ?? '';

            return (
              <div key={stage} className="space-y-2">
                {/* 단계 헤더 */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`text-xs font-semibold px-2 py-0.5 ${badgeColor}`}>
                    {STAGE_LABELS[stage as keyof typeof STAGE_LABELS]}
                  </Badge>
                  <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                    소계 {stageTotal.toLocaleString('ko-KR')}원
                  </span>
                </div>

                {/* 항목 목록 */}
                <div className="space-y-1">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-1.5 rounded-md border border-border/60 bg-card px-3 py-2.5 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-sm font-medium">
                              {item.label}
                              {item.id === 'down-payment' && hasDownPaymentPaid && ' (지불완료)'}
                            </span>
                            {shouldShowNationalHousingBondInfo(item) && (
                              <NationalHousingBondInfoDialog />
                            )}
                            {item.calculationMode === 'manual' && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                직접입력
                              </Badge>
                            )}
                          </div>
                          {item.note && (
                            <p className="text-xs text-muted-foreground mt-0.5">{item.note}</p>
                          )}
                          {item.formula && (
                            <p className="text-xs text-muted-foreground/70 mt-0.5 font-mono">
                              {item.formula}
                            </p>
                          )}
                        </div>
                        <p className="text-sm font-semibold tabular-nums shrink-0">
                          {item.amount.toLocaleString('ko-KR')}원
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-muted-foreground">
                          {CATEGORY_LABELS[item.category as keyof typeof CATEGORY_LABELS]}
                        </span>
                        <span className="text-[11px] text-muted-foreground">·</span>
                        <ConfidenceBadge confidence={item.confidence} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 총계 */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-muted-foreground">총 비용</span>
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

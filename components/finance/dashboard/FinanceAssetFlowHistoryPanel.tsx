'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FinanceAssetFlowEvent } from '@/lib/finance/types';
import { formatFinanceMonthLabel } from '@/lib/finance/formatting';

interface FinanceAssetFlowHistoryPanelProps {
  events: FinanceAssetFlowEvent[];
}

function reasonKindLabel(kind: FinanceAssetFlowEvent['reasons'][number]['kind']) {
  switch (kind) {
    case 'investment':
      return '투자';
    case 'debt':
      return '부채';
    case 'asset':
    default:
      return '자산';
  }
}

function formatSignedWon(value: number): string {
  const sign = value >= 0 ? '+' : '-';
  return `${sign}${Math.abs(value).toLocaleString('ko-KR')}원`;
}

export function FinanceAssetFlowHistoryPanel({
  events,
}: FinanceAssetFlowHistoryPanelProps) {
  const recentEvents = [...events]
    .filter(
      (event) =>
        event.netWorthChange !== 0 ||
        event.totalAssetsChange !== 0 ||
        event.livingAssetsChange !== 0 ||
        event.investmentChange !== 0 ||
        event.debtChange !== 0 ||
        event.reasons.length > 0
    )
    .reverse()
    .slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>자산 증감 이력</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentEvents.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            표시할 자산 증감 이력이 없습니다.
          </p>
        ) : (
          recentEvents.map((event) => (
            <div key={event.month} className="space-y-2 border-b pb-3 last:border-b-0 last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-medium text-foreground">
                  {formatFinanceMonthLabel(event.previousMonth)} → {event.label}
                </p>
                <p
                  className={
                    event.netWorthChange >= 0
                      ? 'text-sm font-medium text-emerald-700'
                      : 'text-sm font-medium text-destructive'
                  }
                >
                  순자산 {formatSignedWon(event.netWorthChange)}
                </p>
              </div>
              <div className="grid gap-1 text-xs text-muted-foreground sm:grid-cols-3">
                <span>생활자산 {formatSignedWon(event.livingAssetsChange)}</span>
                <span>투자 {formatSignedWon(event.investmentChange)}</span>
                <span>부채 영향 {formatSignedWon(event.debtChange)}</span>
              </div>
              {event.reasons.length > 0 ? (
                <ul className="space-y-1">
                  {event.reasons.map((reason) => (
                    <li
                      key={reason.id}
                      className="flex items-center justify-between gap-3 rounded-lg bg-muted/40 px-2 py-1 text-xs"
                    >
                      <span className="text-muted-foreground">
                        {reasonKindLabel(reason.kind)} · {reason.label}
                      </span>
                      <span
                        className={
                          reason.value >= 0
                            ? 'font-medium text-emerald-700'
                            : 'font-medium text-destructive'
                        }
                      >
                        {formatSignedWon(reason.value)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground">
                  항목별 변화는 없고 다른 지표 변화만 있습니다.
                </p>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

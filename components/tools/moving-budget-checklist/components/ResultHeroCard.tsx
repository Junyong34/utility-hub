'use client';

import NumberTicker from '@/components/magicui/number-ticker';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrencyToKoreanUnits } from '@/lib/tools/formatting';
import type { MovingBudgetSummary } from '@/lib/tools/moving-budget-checklist';
import { cn } from '@/lib/utils';

interface ResultHeroCardProps {
  summary: MovingBudgetSummary;
}

export function ResultHeroCard({ summary }: ResultHeroCardProps) {
  const isEmpty =
    summary.totalAvailableFunds === 0 && summary.totalEstimatedCost === 0;
  const balanceAmount = Math.abs(summary.balanceAmount);
  const dominantGroup = summary.groupSummaries.find(
    (group) => group.id === summary.dominantGroupId
  );

  const tone = isEmpty
    ? {
        stripe: 'bg-slate-400',
        badgeClass:
          'border-slate-400/30 bg-slate-500/10 text-slate-700 dark:text-slate-300',
        valueClass: 'text-foreground',
      }
    : summary.isShortage
      ? {
          stripe: 'bg-destructive',
          badgeClass:
            'border-destructive/30 bg-destructive/10 text-destructive',
          valueClass: 'text-destructive',
        }
      : {
          stripe: 'bg-green-500',
          badgeClass:
            'border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300',
          valueClass: 'text-green-700 dark:text-green-300',
        };

  const headline = isEmpty
    ? '내 자산과 비용을 입력하면 바로 결론을 계산합니다'
    : summary.isShortage
      ? '현재 예산으로는 자금이 부족합니다'
      : '현재 예산 안에서 이사를 진행할 수 있습니다';

  const description = isEmpty
    ? '현금, 보증금, 대출 예정금과 주요 비용을 먼저 입력해 보세요.'
    : summary.isShortage
      ? `총예상비용이 대출 포함 가용자금보다 ${formatCurrencyToKoreanUnits(balanceAmount)} 더 큽니다.`
      : `현재 대출 포함 가용자금 기준으로 ${formatCurrencyToKoreanUnits(balanceAmount)} 여유가 남아 있습니다.`;

  return (
    <Card className="overflow-hidden">
      <div className={cn('h-1 w-full', tone.stripe)} />
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>현재 결론</CardTitle>
            <CardDescription>{headline}</CardDescription>
          </div>
          <Badge variant="outline" className={tone.badgeClass}>
            {isEmpty ? '입력 대기' : summary.isShortage ? '부족' : '여유'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-wide text-muted-foreground">
            {isEmpty ? '예산 차이' : summary.isShortage ? '부족 금액' : '여유 금액'}
          </p>
          <div className="flex flex-wrap items-end gap-2">
            <span className={cn('text-4xl font-bold tracking-tight', tone.valueClass)}>
              {isEmpty ? '' : summary.isShortage ? '-' : '+'}
              <NumberTicker
                value={balanceAmount}
                className={cn('text-4xl font-bold tracking-tight', tone.valueClass)}
              />
              <span className="ml-1 text-xl font-semibold">원</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          {dominantGroup && dominantGroup.sharePercentage > 0 ? (
            <p className="text-sm text-muted-foreground">
              총예상비용의 {dominantGroup.sharePercentage}%는{' '}
              <span className="font-medium text-foreground">
                {dominantGroup.label}
              </span>
              에서 발생합니다.
            </p>
          ) : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
            <p className="text-xs text-muted-foreground">총현금자산</p>
            <p className="mt-1 text-base font-semibold text-foreground">
              {formatCurrencyToKoreanUnits(summary.totalAssets)}
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
            <p className="text-xs text-muted-foreground">총예상비용</p>
            <p className="mt-1 text-base font-semibold text-foreground">
              {formatCurrencyToKoreanUnits(summary.totalEstimatedCost)}
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
            <p className="text-xs text-muted-foreground">아파트 실지급액</p>
            <p className="mt-1 text-base font-semibold text-foreground">
              {formatCurrencyToKoreanUnits(summary.apartmentCashNeeded)}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              아파트 가격 - 대출 예정금
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">전체 진행률</p>
              <p className="text-xs font-medium text-foreground">
                {summary.completedChecklistCount}/{summary.totalChecklistCount} 항목
              </p>
            </div>
            <p className="mt-1 text-base font-semibold text-foreground">
              {summary.progressPercentage}%
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-foreground/80 transition-[width]"
                style={{ width: `${summary.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-muted/10">
          <div className="border-b border-border/70 px-3 py-2">
            <p className="text-sm font-medium text-foreground">대출+현금 표</p>
          </div>
          <div className="px-3 py-2">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-border/50">
                  <th className="py-2 text-left font-normal text-muted-foreground">
                    총현금자산
                  </th>
                  <td className="py-2 text-right font-medium text-foreground">
                    {formatCurrencyToKoreanUnits(summary.totalAssets)}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <th className="py-2 text-left font-normal text-muted-foreground">
                    대출 예정금
                  </th>
                  <td className="py-2 text-right font-medium text-foreground">
                    {formatCurrencyToKoreanUnits(summary.plannedLoanAmount)}
                  </td>
                </tr>
                <tr>
                  <th className="py-2 text-left font-medium text-foreground">
                    대출 포함 가용자금
                  </th>
                  <td className="py-2 text-right font-semibold text-foreground">
                    {formatCurrencyToKoreanUnits(summary.totalAvailableFunds)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

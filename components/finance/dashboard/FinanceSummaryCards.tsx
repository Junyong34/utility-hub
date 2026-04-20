'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Minus } from 'lucide-react';
import { formatFinanceMonthLabel } from '@/lib/finance/formatting';
import type {
  FinanceComparisonSummary,
  FinanceComparisonMetricKey,
  FinanceSnapshotSummary,
} from '@/lib/finance/types';
import {
  formatPercent,
  formatSignedPercent,
  formatSignedWon,
  formatWon,
} from './finance-dashboard-formatting';

interface FinanceSummaryCardsProps {
  summary: FinanceSnapshotSummary;
  comparison: FinanceComparisonSummary;
}

type FinanceSummaryCardDirection = 'higher-is-good' | 'lower-is-good';

const CARD_DEFINITIONS: Array<{
  key: FinanceComparisonMetricKey;
  title: string;
  tone?: 'primary' | 'danger';
  direction: FinanceSummaryCardDirection;
}> = [
  { key: 'totalAssets', title: '투자 포함 총자산', tone: 'primary', direction: 'higher-is-good' },
  { key: 'totalLivingAssets', title: '투자 제외 생활자산', direction: 'higher-is-good' },
  { key: 'totalDebt', title: '총부채', tone: 'danger', direction: 'lower-is-good' },
  { key: 'netWorth', title: '순자산', tone: 'primary', direction: 'higher-is-good' },
  { key: 'totalIncome', title: '월 수입', direction: 'higher-is-good' },
  { key: 'totalExpenses', title: '월 총지출', tone: 'danger', direction: 'lower-is-good' },
  { key: 'savingsEstimate', title: '저축 가능 금액', tone: 'primary', direction: 'higher-is-good' },
];

function getChangeTone(
  value: number,
  direction: FinanceSummaryCardDirection
): string {
  if (value > 0) {
    return direction === 'higher-is-good' ? 'text-emerald-700' : 'text-destructive';
  }

  if (value < 0) {
    return direction === 'higher-is-good' ? 'text-destructive' : 'text-emerald-700';
  }

  return 'text-muted-foreground';
}

function getComparisonLabel(referenceMonth: string | null) {
  if (!referenceMonth) {
    return '비교 기준 데이터 없음';
  }

  return `기준 ${formatFinanceMonthLabel(referenceMonth)} 대비`;
}

function formatChangeIcon(value: number) {
  if (value > 0) {
    return <ChevronUp className="h-4 w-4" />;
  }

  if (value < 0) {
    return <ChevronDown className="h-4 w-4" />;
  }

  return <Minus className="h-4 w-4" />;
}

export function FinanceSummaryCards({
  summary,
  comparison,
}: FinanceSummaryCardsProps) {
  const isComparable = comparison.referenceMonth !== null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {CARD_DEFINITIONS.map((card) => {
        const value = summary[card.key];
        const metric = comparison.metricComparisons[card.key];
        const hasMetricReference = metric.referenceValue !== null;
        const absolute = metric.absoluteChange;
        const percent = metric.percentChange;
        const direction = hasMetricReference ? absolute ?? 0 : 0;

        return (
          <Card key={card.key} size="sm">
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className={
                  card.tone === 'danger'
                    ? 'text-3xl font-semibold text-destructive'
                    : card.tone === 'primary'
                      ? 'text-3xl font-semibold text-foreground'
                      : 'text-3xl font-semibold text-foreground'
                }
              >
                {formatWon(value)}
              </p>
              <div className="mt-2 space-y-1">
                <p
                  className={`text-base font-bold ${isComparable ? getChangeTone(direction, card.direction) : 'text-muted-foreground'}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {isComparable ? formatChangeIcon(direction) : null}
                    {isComparable
                      ? `${formatSignedWon(absolute)} (${formatSignedPercent(percent)})`
                      : '증감치 계산 불가'}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {getComparisonLabel(comparison.referenceMonth)}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
      <Card size="sm">
        <CardHeader>
          <CardTitle>고정/변동 지출 비율</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            고정 {formatPercent(summary.fixedExpenseRatio)} · 변동{' '}
            {formatPercent(summary.variableExpenseRatio)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

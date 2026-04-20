'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  formatPercent,
  formatWon,
} from '@/components/finance/dashboard/finance-dashboard-formatting';
import type { FinanceSnapshotSummary } from '@/lib/finance/types';
import { cn } from '@/lib/utils';

const BAR_COLORS = ['var(--chart-4)', 'var(--chart-3)'];

interface FinanceExpenseStructureCardProps {
  summary: FinanceSnapshotSummary;
  testId?: string;
}

interface ExpenseStructureTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload?: {
      label: string;
      value: number;
      ratio: number;
    };
  }>;
}

function ExpenseStructureTooltip({
  active,
  payload,
}: ExpenseStructureTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const entry = payload[0]?.payload;

  if (!entry) {
    return null;
  }

  return (
    <div className="min-w-48 rounded-xl border border-border bg-popover px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">{entry.label}</p>
      <div className="mt-2 space-y-1 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">금액</span>
          <span className="font-medium text-foreground">{formatWon(entry.value)}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">비율</span>
          <span className="font-medium text-foreground">{formatPercent(entry.ratio)}</span>
        </div>
      </div>
    </div>
  );
}

function formatAxisValue(value: number | string): string {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return '-';
  }

  return `${Math.round(numericValue / 10000).toLocaleString('ko-KR')}만`;
}

export function FinanceExpenseStructureCard({
  summary,
  testId,
}: FinanceExpenseStructureCardProps) {
  const chartData = [
    {
      label: '고정지출',
      value: summary.fixedExpenses,
      ratio: summary.fixedExpenseRatio,
    },
    {
      label: '변동지출',
      value: summary.variableExpenses,
      ratio: summary.variableExpenseRatio,
    },
  ];

  return (
    <Card
      className="border-amber-200/70 bg-gradient-to-br from-amber-50/70 to-background dark:border-amber-900/40 dark:from-amber-950/20 dark:to-background"
      data-testid={testId}
    >
      <CardHeader className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-amber-700 dark:text-amber-300">
              지출 구조
            </CardTitle>
            <Badge variant="outline" className="border-amber-200/70 text-amber-700">
              자녀 관련 {formatWon(summary.childRelatedExpenses)}
            </Badge>
          </div>
        <p className="text-sm text-muted-foreground">
          고정지출과 변동지출을 분리해서 보고, 자녀 관련 지출과 저축 가능 금액을 함께
          확인합니다.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-amber-200/60 bg-background/80 p-4 dark:border-amber-900/40">
            <p className="text-xs font-medium uppercase tracking-wide text-amber-700/80 dark:text-amber-300/80">
              고정/변동
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatPercent(summary.fixedExpenseRatio)} / {formatPercent(summary.variableExpenseRatio)}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200/60 bg-background/80 p-4 dark:border-emerald-900/40">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700/80 dark:text-emerald-300/80">
              자녀 관련 지출
            </p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-emerald-700 dark:text-emerald-300">
              {formatWon(summary.childRelatedExpenses)}
            </p>
          </div>
          <div className="rounded-2xl border border-sky-200/60 bg-background/80 p-4 dark:border-sky-900/40">
            <p className="text-xs font-medium uppercase tracking-wide text-sky-700/80 dark:text-sky-300/80">
              저축 가능 금액
            </p>
            <p className={cn('mt-1 text-lg font-semibold tracking-tight text-sky-700 dark:text-sky-300')}>
              {formatWon(summary.savingsEstimate)}
            </p>
          </div>
        </div>

        <div className="h-72 rounded-2xl border bg-background/80 p-2 ring-1 ring-amber-200/70 dark:ring-amber-900/40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} accessibilityLayer>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={84}
                tickFormatter={formatAxisValue}
              />
              <Tooltip content={<ExpenseStructureTooltip />} isAnimationActive={false} />
              <Bar
                dataKey="value"
                name="지출 금액"
                radius={[8, 8, 0, 0]}
                isAnimationActive={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={entry.label} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

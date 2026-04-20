'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  formatSignedPercent,
  formatSignedWon,
  formatWon,
} from '@/components/finance/dashboard/finance-dashboard-formatting';
import type { FinanceReportBucketSummary } from '@/lib/finance/types';
import { cn } from '@/lib/utils';

const ACCENT_STYLES: Record<
  'emerald' | 'rose' | 'sky' | 'amber',
  { card: string; title: string; bar: string; ring: string }
> = {
  emerald: {
    card:
      'border-emerald-200/70 bg-gradient-to-br from-emerald-50/70 to-background dark:border-emerald-900/40 dark:from-emerald-950/20 dark:to-background',
    title: 'text-emerald-700 dark:text-emerald-300',
    bar: 'var(--chart-1)',
    ring: 'ring-emerald-200/80 dark:ring-emerald-900/40',
  },
  rose: {
    card:
      'border-rose-200/70 bg-gradient-to-br from-rose-50/70 to-background dark:border-rose-900/40 dark:from-rose-950/20 dark:to-background',
    title: 'text-rose-700 dark:text-rose-300',
    bar: 'var(--chart-4)',
    ring: 'ring-rose-200/80 dark:ring-rose-900/40',
  },
  sky: {
    card:
      'border-sky-200/70 bg-gradient-to-br from-sky-50/70 to-background dark:border-sky-900/40 dark:from-sky-950/20 dark:to-background',
    title: 'text-sky-700 dark:text-sky-300',
    bar: 'var(--chart-2)',
    ring: 'ring-sky-200/80 dark:ring-sky-900/40',
  },
  amber: {
    card:
      'border-amber-200/70 bg-gradient-to-br from-amber-50/70 to-background dark:border-amber-900/40 dark:from-amber-950/20 dark:to-background',
    title: 'text-amber-700 dark:text-amber-300',
    bar: 'var(--chart-3)',
    ring: 'ring-amber-200/80 dark:ring-amber-900/40',
  },
};

interface FinanceBucketTimelineCardProps {
  title: string;
  description: string;
  buckets: FinanceReportBucketSummary[];
  accent: keyof typeof ACCENT_STYLES;
  metricLabel: string;
  getMetricValue: (bucket: FinanceReportBucketSummary) => number;
  testId?: string;
}

interface FinanceBucketTimelineTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload?: {
      label: string;
      metricValue: number;
      netWorth: number;
      changeAmount: number | null;
      changeRate: number | null;
      range: string;
      monthCount: number;
    };
  }>;
}

function FinanceBucketTimelineTooltip({
  active,
  payload,
}: FinanceBucketTimelineTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const entry = payload[0]?.payload;

  if (!entry) {
    return null;
  }

  return (
    <div className="min-w-56 rounded-xl border border-border bg-popover px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">{entry.label}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{entry.range}</p>
      <div className="mt-2 space-y-1.5 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">주요 지표</span>
          <span className="font-medium text-foreground">
            {formatWon(entry.metricValue)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">순자산</span>
          <span className="font-medium text-foreground">{formatWon(entry.netWorth)}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">변화</span>
          <span className="font-medium text-foreground">
            {formatSignedWon(entry.changeAmount)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">증감률</span>
          <span className="font-medium text-foreground">
            {formatSignedPercent(entry.changeRate)}
          </span>
        </div>
      </div>
    </div>
  );
}

function formatTimelineAxisValue(value: number | string): string {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return '-';
  }

  return `${Math.round(numericValue / 10000).toLocaleString('ko-KR')}만`;
}

export function FinanceBucketTimelineCard({
  title,
  description,
  buckets,
  accent,
  metricLabel,
  getMetricValue,
  testId,
}: FinanceBucketTimelineCardProps) {
  const style = ACCENT_STYLES[accent];
  const orderedBuckets = [...buckets].sort((left, right) =>
    left.bucketId.localeCompare(right.bucketId)
  );
  const hasBuckets = orderedBuckets.length > 0;
  const chartData = orderedBuckets.map((bucket) => {
    return {
      label: bucket.label,
      metricValue: getMetricValue(bucket),
      netWorth: bucket.netWorth,
      changeAmount: bucket.netWorthChangeAmount,
      changeRate: bucket.netWorthChangeRate,
      range: `${bucket.startMonth} ~ ${bucket.endMonth}`,
      monthCount: bucket.monthCount,
      isLatest: bucket === orderedBuckets.at(-1),
    };
  });

  const latestBucket = orderedBuckets.at(-1) ?? null;

  return (
    <Card className={style.card} data-testid={testId}>
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className={style.title}>{title}</CardTitle>
          {latestBucket ? (
            <Badge variant="outline" className={cn('border-current/30', style.title)}>
              최신 {latestBucket.label}
            </Badge>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasBuckets ? (
          <p className="text-sm text-muted-foreground">표시할 리포트가 없습니다.</p>
        ) : (
          <>
            <div className={cn('h-64 rounded-2xl border bg-background/80 p-2 ring-1', style.ring)}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} accessibilityLayer>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    minTickGap={12}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={84}
                    tickFormatter={formatTimelineAxisValue}
                  />
                  <Tooltip
                    content={<FinanceBucketTimelineTooltip />}
                    isAnimationActive={false}
                    cursor={{ fill: 'var(--muted)' }}
                  />
                  <Bar
                    dataKey="metricValue"
                    name={metricLabel}
                    fill={style.bar}
                    radius={[8, 8, 0, 0]}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              {chartData.map((entry) => (
                <div
                  key={entry.label}
                  className={cn(
                    'space-y-2 rounded-2xl border bg-background/80 p-4',
                    entry.isLatest && 'ring-1',
                    entry.isLatest && style.ring
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{entry.label}</p>
                      <p className="text-xs text-muted-foreground">{entry.range}</p>
                    </div>
                    <Badge variant={entry.isLatest ? 'default' : 'outline'}>
                      {entry.monthCount}개월
                    </Badge>
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {metricLabel}
                      </p>
                      <p className={cn('text-xl font-semibold tracking-tight', style.title)}>
                        {formatWon(entry.metricValue)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        순자산
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {formatWon(entry.netWorth)}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                      <span>전 bucket 대비</span>
                      <span>{formatSignedWon(entry.changeAmount)}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.max(Math.min(Math.abs(entry.changeRate ?? 0), 100), 0)}%`,
                          backgroundColor: style.bar,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

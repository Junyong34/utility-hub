'use client';

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatWon } from '@/components/finance/dashboard/finance-dashboard-formatting';
import type { FinanceValueShareDatum } from '@/lib/finance/types';
import { cn } from '@/lib/utils';

const PIE_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

const ACCENT_STYLES: Record<
  'emerald' | 'rose' | 'sky' | 'amber',
  { card: string; title: string; ring: string }
> = {
  emerald: {
    card:
      'border-emerald-200/70 bg-gradient-to-br from-emerald-50/70 to-background dark:border-emerald-900/40 dark:from-emerald-950/20 dark:to-background',
    title: 'text-emerald-700 dark:text-emerald-300',
    ring: 'ring-emerald-200/80 dark:ring-emerald-900/40',
  },
  rose: {
    card:
      'border-rose-200/70 bg-gradient-to-br from-rose-50/70 to-background dark:border-rose-900/40 dark:from-rose-950/20 dark:to-background',
    title: 'text-rose-700 dark:text-rose-300',
    ring: 'ring-rose-200/80 dark:ring-rose-900/40',
  },
  sky: {
    card:
      'border-sky-200/70 bg-gradient-to-br from-sky-50/70 to-background dark:border-sky-900/40 dark:from-sky-950/20 dark:to-background',
    title: 'text-sky-700 dark:text-sky-300',
    ring: 'ring-sky-200/80 dark:ring-sky-900/40',
  },
  amber: {
    card:
      'border-amber-200/70 bg-gradient-to-br from-amber-50/70 to-background dark:border-amber-900/40 dark:from-amber-950/20 dark:to-background',
    title: 'text-amber-700 dark:text-amber-300',
    ring: 'ring-amber-200/80 dark:ring-amber-900/40',
  },
};

interface FinanceCategoryCompositionCardProps {
  title: string;
  description: string;
  totalLabel: string;
  totalValue: number;
  entries: FinanceValueShareDatum[];
  accent: keyof typeof ACCENT_STYLES;
  emptyText: string;
  testId?: string;
}

interface FinanceCategoryTooltipProps {
  active?: boolean;
  payload?: Array<{ payload?: FinanceValueShareDatum }>;
}

function FinanceCategoryTooltip({
  active,
  payload,
}: FinanceCategoryTooltipProps) {
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
          <span className="text-muted-foreground">비중</span>
          <span className="font-medium text-foreground">{entry.ratio}%</span>
        </div>
      </div>
    </div>
  );
}

export function FinanceCategoryCompositionCard({
  title,
  description,
  totalLabel,
  totalValue,
  entries,
  accent,
  emptyText,
  testId,
}: FinanceCategoryCompositionCardProps) {
  const style = ACCENT_STYLES[accent];
  const orderedEntries = [...entries].sort((left, right) => right.value - left.value);
  const hasEntries = orderedEntries.length > 0;

  return (
    <Card className={style.card} data-testid={testId}>
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className={style.title}>{title}</CardTitle>
          <Badge variant="outline" className={cn('border-current/30', style.title)}>
            {totalLabel}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        {!hasEntries ? (
          <p className="text-sm text-muted-foreground">{emptyText}</p>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
            <div>
              <div className={cn('relative h-64 rounded-2xl border bg-background/80 p-2 ring-1', style.ring)}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart accessibilityLayer>
                    <Tooltip content={<FinanceCategoryTooltip />} isAnimationActive={false} />
                    <Pie
                      data={orderedEntries}
                      dataKey="value"
                      nameKey="label"
                      innerRadius={72}
                      outerRadius={100}
                      paddingAngle={2}
                      stroke="var(--background)"
                      strokeWidth={2}
                      isAnimationActive={false}
                    >
                      {orderedEntries.map((entry, index) => (
                        <Cell
                          key={entry.id}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {totalLabel}
                    </p>
                    <p className={cn('text-2xl font-semibold tracking-tight', style.title)}>
                      {formatWon(totalValue)}
                    </p>
                    <p className="text-xs text-muted-foreground">{orderedEntries.length}개 항목</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {orderedEntries.map((entry, index) => (
                <div key={entry.id} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-foreground">{entry.label}</span>
                    <span className="text-muted-foreground">
                      {formatWon(entry.value)} · {entry.ratio}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${entry.ratio}%`,
                        backgroundColor:
                          PIE_COLORS[index % PIE_COLORS.length],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

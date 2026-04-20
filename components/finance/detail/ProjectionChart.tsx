'use client';

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatFinanceMonthLabel } from '@/lib/finance/formatting';
import type {
  FinanceProjectionSummary,
  FinanceSnapshotSummary,
} from '@/lib/finance/types';
import {
  formatSignedPercent,
  formatSignedWon,
  formatWon,
} from '@/components/finance/dashboard/finance-dashboard-formatting';

interface ProjectionChartProps {
  summary: FinanceSnapshotSummary;
  projection: FinanceProjectionSummary;
}

interface ProjectionChartDatum {
  label: string;
  projectedAssets: number;
  baseAssets: number;
  cumulativeChange: number;
  cumulativeChangeRate: number | null;
}

interface ProjectionChartTooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: Array<{
    dataKey?: string | number;
    value?: number | string;
  }>;
}

function formatChartAxisValue(value: number | string): string {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return '-';
  }

  return `${Math.round(numericValue / 10000).toLocaleString('ko-KR')}만`;
}

function ProjectionChartTooltip({
  active,
  label,
  payload,
}: ProjectionChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const projectedAssets = payload.find(
    (item) => item.dataKey === 'projectedAssets'
  )?.value;
  const baseAssets = payload.find((item) => item.dataKey === 'baseAssets')?.value;
  const projectedAssetsValue = Number(projectedAssets);
  const baseAssetsValue = Number(baseAssets);
  const safeProjectedAssetsValue = Number.isFinite(projectedAssetsValue)
    ? projectedAssetsValue
    : null;
  const safeBaseAssetsValue = Number.isFinite(baseAssetsValue)
    ? baseAssetsValue
    : null;
  const change =
    safeProjectedAssetsValue !== null && safeBaseAssetsValue !== null
      ? safeProjectedAssetsValue - safeBaseAssetsValue
      : null;
  const changeRate =
    change !== null && safeBaseAssetsValue !== null && safeBaseAssetsValue > 0
      ? Math.round((change / safeBaseAssetsValue) * 100)
      : null;
  const labelText =
    typeof label === 'string'
      ? label
      : typeof label === 'number'
        ? String(label)
        : '';

  return (
    <div className="min-w-56 rounded-xl border border-border bg-popover px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">
        {labelText}
      </p>
      <div className="mt-2 space-y-1.5 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">예상 총자산</span>
          <span className="font-medium text-foreground">
            {formatWon(safeProjectedAssetsValue)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">기준 자산</span>
          <span className="font-medium text-foreground">
            {formatWon(safeBaseAssetsValue)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">증가액</span>
          <span className="font-medium text-foreground">{formatSignedWon(change)}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">증감률</span>
          <span className="font-medium text-foreground">
            {formatSignedPercent(changeRate)}
          </span>
        </div>
      </div>
    </div>
  );
}

function ProjectionLegendItem({
  color,
  label,
  dashed = false,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden="true"
        className="inline-block size-2.5 rounded-full"
        style={{
          backgroundColor: dashed ? 'transparent' : color,
          borderColor: color,
          borderStyle: dashed ? 'dashed' : 'solid',
          borderWidth: '1.5px',
        }}
      />
      {label}
    </span>
  );
}

export function ProjectionChart({ summary, projection }: ProjectionChartProps) {
  const chartData: ProjectionChartDatum[] = [
    {
      label: formatFinanceMonthLabel(summary.month),
      projectedAssets: projection.baseAssets,
      baseAssets: projection.baseAssets,
      cumulativeChange: 0,
      cumulativeChangeRate: 0,
    },
    ...projection.points.map((point) => ({
      label: point.label,
      projectedAssets: point.projectedAssets,
      baseAssets: projection.baseAssets,
      cumulativeChange: point.cumulativeChange,
      cumulativeChangeRate: point.cumulativeChangeRate,
    })),
  ];

  return (
    <Card data-testid="finance-projection-chart">
      <CardHeader className="space-y-2">
        <CardTitle>복리 시각화</CardTitle>
        <p className="text-sm text-muted-foreground">
          {formatFinanceMonthLabel(summary.month)}의 총자산에서 출발해 목표 연도까지의
          증가 경로를 보여줍니다.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <ProjectionLegendItem
            color="var(--chart-1)"
            label="예상 총자산"
          />
          <ProjectionLegendItem
            color="var(--muted-foreground)"
            label="기준 자산"
            dashed
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} accessibilityLayer>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                minTickGap={16}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={84}
                tickFormatter={formatChartAxisValue}
              />
              <Tooltip
                content={<ProjectionChartTooltip />}
                isAnimationActive={false}
                cursor={{ stroke: 'var(--border)', strokeDasharray: '4 4' }}
              />
              <Area
                type="monotone"
                dataKey="projectedAssets"
                name="예상 총자산"
                stroke="var(--chart-1)"
                fill="var(--chart-1)"
                fillOpacity={0.14}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="baseAssets"
                name="기준 자산"
                stroke="var(--muted-foreground)"
                strokeDasharray="6 4"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

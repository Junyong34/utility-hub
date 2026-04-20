'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import {
  buildFinanceProjectionSummary,
  FINANCE_PROJECTION_YEAR_LIMIT,
} from '@/lib/finance/projection';
import { formatFinanceMonthLabel, formatFinanceYearLabel } from '@/lib/finance/formatting';
import type { FinanceSnapshotSummary } from '@/lib/finance/types';
import { cn } from '@/lib/utils';
import {
  formatSignedPercent,
  formatSignedWon,
  formatWon,
} from '@/components/finance/dashboard/finance-dashboard-formatting';
import { ProjectionChart } from './ProjectionChart';

interface ProjectionSectionProps {
  summary: FinanceSnapshotSummary | null;
}

function formatProjectionYears(years: number): string {
  if (years <= 0) {
    return '-';
  }

  return `${years}년`;
}

function parsePositiveNumber(value: string, fallback: number): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return fallback;
  }

  return parsed;
}

export function ProjectionSection({ summary }: ProjectionSectionProps) {
  const startYear = summary ? Number(summary.month.slice(0, 4)) : 0;
  const targetYearMinimum = startYear + 1;
  const targetYearMaximum = startYear + FINANCE_PROJECTION_YEAR_LIMIT - 1;
  const [draftAnnualGrowthRate, setDraftAnnualGrowthRate] = useState('10');
  const [draftTargetYear, setDraftTargetYear] = useState(
    String(targetYearMinimum + 4)
  );
  const [annualGrowthRate, setAnnualGrowthRate] = useState(10);
  const [targetYear, setTargetYear] = useState(targetYearMinimum + 4);

  if (!summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>표시할 자산 데이터가 없습니다</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          먼저 월 스냅샷을 만든 뒤 미래 자산 계산을 확인할 수 있습니다.
        </CardContent>
      </Card>
    );
  }

  const projection = buildFinanceProjectionSummary({
    baseMonth: summary.month,
    baseAssets: summary.totalAssets,
    annualGrowthRate,
    targetYear,
  });
  const finalRowIndex = projection.points.length - 1;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <Card className="h-fit">
          <CardHeader className="space-y-2">
            <CardTitle>시뮬레이션 조건</CardTitle>
            <p className="text-sm text-muted-foreground">
              입력값을 바꾼 뒤 조회를 눌러 다시 계산합니다.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form
              className="space-y-4"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                const nextAnnualGrowthRate = parsePositiveNumber(
                  draftAnnualGrowthRate,
                  0
                );
                const nextTargetYear = Math.max(
                  targetYearMinimum,
                  Math.trunc(
                    parsePositiveNumber(draftTargetYear, targetYearMinimum)
                  )
                );
                const requestedYears = nextTargetYear - startYear;

                if (requestedYears >= FINANCE_PROJECTION_YEAR_LIMIT) {
                  window.alert(
                    '100년 이상은 계산할 수 없습니다. 목표 연도를 99년 이내로 설정해 주세요.'
                  );
                  return;
                }

                setAnnualGrowthRate(nextAnnualGrowthRate);
                setTargetYear(nextTargetYear);
              }}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="finance-growth-rate"
                    className="text-sm font-medium text-foreground"
                  >
                    연간 자산 증가률
                  </label>
                  <InputGroup
                    data-testid="finance-growth-rate-field"
                    className="w-full"
                  >
                    <InputGroupInput
                      id="finance-growth-rate"
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="0.1"
                      value={draftAnnualGrowthRate}
                      onChange={(event) => {
                        setDraftAnnualGrowthRate(event.target.value);
                      }}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>%</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="finance-target-year"
                    className="text-sm font-medium text-foreground"
                  >
                    목표 연도
                  </label>
                  <Input
                    id="finance-target-year"
                    type="number"
                    inputMode="numeric"
                    min={targetYearMinimum}
                    max={targetYearMaximum}
                    step="1"
                    value={draftTargetYear}
                    onChange={(event) => {
                      setDraftTargetYear(event.target.value);
                    }}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                조회
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
              기준월의 같은 월을 기준으로 매년 한 번씩 복리로 계산합니다. 최대
              {FINANCE_PROJECTION_YEAR_LIMIT - 1}년 이후까지만 조회할 수 있습니다.
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200/70 bg-gradient-to-br from-emerald-50/70 to-background dark:border-emerald-900/40 dark:from-emerald-950/20 dark:to-background">
          <CardHeader className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-emerald-700 dark:text-emerald-300">
                예상 결과
              </CardTitle>
              <Badge variant="outline">
                {formatFinanceMonthLabel(summary.month)} 기준
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {formatWon(summary.totalAssets)}을 기준으로 {formatSignedPercent(projection.annualGrowthRate)}
              복리를 적용한 예상 경로입니다.
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-700/80 dark:text-emerald-300/80">
                예상 최종 자산
              </p>
              <p className="text-4xl font-semibold tracking-tight text-emerald-700 dark:text-emerald-300">
                {formatWon(projection.projectedAssets)}
              </p>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border bg-background/70 p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  누적 증가액
                </dt>
                <dd className="mt-1 text-lg font-semibold text-foreground">
                  {formatSignedWon(projection.cumulativeChange)}
                </dd>
              </div>
              <div className="rounded-xl border bg-background/70 p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  누적 증감률
                </dt>
                <dd className="mt-1 text-lg font-semibold text-foreground">
                  {formatSignedPercent(projection.cumulativeChangeRate)}
                </dd>
              </div>
              <div className="rounded-xl border bg-background/70 p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  예측 기간
                </dt>
                <dd className="mt-1 text-lg font-semibold text-foreground">
                  {formatProjectionYears(projection.years)}
                </dd>
              </div>
              <div className="rounded-xl border bg-background/70 p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  목표 기준월
                </dt>
                <dd className="mt-1 text-lg font-semibold text-foreground">
                  {formatFinanceMonthLabel(projection.targetMonth)}
                </dd>
              </div>
            </dl>

            <p className="text-xs text-muted-foreground">
              연복리 가정 {formatSignedPercent(projection.annualGrowthRate)} · 목표 연도{' '}
              {formatFinanceYearLabel(projection.targetYear)}
            </p>
          </CardContent>
        </Card>
      </div>

      <ProjectionChart summary={summary} projection={projection} />

      <Card>
        <CardHeader>
          <CardTitle>연도별 복리 경로</CardTitle>
          <p className="text-sm text-muted-foreground">
            {formatFinanceMonthLabel(summary.month)}에서 {formatFinanceMonthLabel(projection.targetMonth)}
            까지의 총자산 변화를 연도별로 보여줍니다.
          </p>
        </CardHeader>
        <CardContent>
          {projection.points.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="border-b px-3 py-2 font-medium">기준월</th>
                    <th className="border-b px-3 py-2 font-medium">예상 총자산</th>
                    <th className="border-b px-3 py-2 font-medium">전년 대비 증감액</th>
                    <th className="border-b px-3 py-2 font-medium">전년 대비 증감률</th>
                    <th className="border-b px-3 py-2 font-medium">기준 대비 증감률</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-foreground [&>th]:border-b [&>td]:border-b [&>th]:border-border/60 [&>td]:border-border/60">
                    <th scope="row" className="px-3 py-3 text-left font-medium">
                      {formatFinanceMonthLabel(summary.month)}
                    </th>
                    <td className="px-3 py-3">{formatWon(summary.totalAssets)}</td>
                    <td className="px-3 py-3 text-muted-foreground">-</td>
                    <td className="px-3 py-3 text-muted-foreground">-</td>
                    <td className="px-3 py-3 text-muted-foreground">기준</td>
                  </tr>
                  {projection.points.map((point, index) => (
                    <tr
                      key={point.month}
                      className={cn(
                        '[&>th]:border-b [&>td]:border-b [&>th]:border-border/60 [&>td]:border-border/60',
                        index === finalRowIndex && 'bg-emerald-50/70 dark:bg-emerald-950/20'
                      )}
                    >
                      <th scope="row" className="px-3 py-3 text-left font-medium text-foreground">
                        {point.label}
                      </th>
                      <td className="px-3 py-3 text-foreground">
                        {formatWon(point.projectedAssets)}
                      </td>
                      <td className="px-3 py-3 text-foreground">
                        {formatSignedWon(point.annualChange)}
                      </td>
                      <td className="px-3 py-3 text-foreground">
                        {formatSignedPercent(point.annualGrowthRate)}
                      </td>
                      <td className="px-3 py-3 text-foreground">
                        {formatSignedPercent(point.cumulativeChangeRate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              목표 연도를 시작 연도 이후로 설정하면 연도별 복리 경로가 표시됩니다.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

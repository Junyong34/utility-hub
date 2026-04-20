'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FinanceReportsSummary } from '@/lib/finance/types';
import {
  formatSignedWon,
  formatWon,
} from '@/components/finance/dashboard/finance-dashboard-formatting';
import { FinanceBucketTimelineCard } from './FinanceBucketTimelineCard';
import { FinanceMetricTile } from './FinanceMetricTile';

interface ReportsSectionProps {
  reports: FinanceReportsSummary;
}

export function ReportsSection({ reports }: ReportsSectionProps) {
  const latestQuarter = reports.quarterly.at(-1) ?? null;
  const latestHalf = reports.semiAnnual.at(-1) ?? null;
  const latestYear = reports.yearly.at(-1) ?? null;

  return (
    <div className="space-y-4">
      <Card className="border-amber-200/70 bg-gradient-to-br from-amber-50/70 to-background dark:border-amber-900/40 dark:from-amber-950/20 dark:to-background">
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-amber-700 dark:text-amber-300">
              리포트 요약
            </CardTitle>
            <Badge variant="outline" className="border-amber-200/70 text-amber-700">
              최신 기준 비교
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            분기, 반기, 연도 기준 버킷을 한 화면에서 비교하고 최근 흐름을 빠르게
            읽습니다.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            <FinanceMetricTile
              label="최신 분기 순자산"
              value={latestQuarter ? formatWon(latestQuarter.netWorth) : '-'}
              tone="sky"
              description={latestQuarter ? latestQuarter.label : '분기 데이터 없음'}
            />
            <FinanceMetricTile
              label="최신 반기 총지출"
              value={latestHalf ? formatWon(latestHalf.totalExpenses) : '-'}
              tone="amber"
              description={latestHalf ? latestHalf.label : '반기 데이터 없음'}
            />
            <FinanceMetricTile
              label="최신 연도 투자 손익"
              value={latestYear ? formatSignedWon(latestYear.investmentProfitLoss) : '-'}
              tone="emerald"
              description={latestYear ? latestYear.label : '연도 데이터 없음'}
            />
          </div>
        </CardContent>
      </Card>

      <FinanceBucketTimelineCard
        title="분기 리포트"
        description="분기별 순자산 변화를 확인합니다."
        buckets={reports.quarterly}
        accent="sky"
        metricLabel="순자산"
        getMetricValue={(bucket) => bucket.netWorth}
        testId="finance-reports-quarterly"
      />

      <FinanceBucketTimelineCard
        title="반기 리포트"
        description="반기별 총지출 구조를 확인합니다."
        buckets={reports.semiAnnual}
        accent="amber"
        metricLabel="총지출"
        getMetricValue={(bucket) => bucket.totalExpenses}
        testId="finance-reports-half"
      />

      <FinanceBucketTimelineCard
        title="연도 리포트"
        description="연도별 투자 손익과 순자산 흐름을 확인합니다."
        buckets={reports.yearly}
        accent="emerald"
        metricLabel="투자 손익"
        getMetricValue={(bucket) => bucket.investmentProfitLoss}
        testId="finance-reports-yearly"
      />
    </div>
  );
}

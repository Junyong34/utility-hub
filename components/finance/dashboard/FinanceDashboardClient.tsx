'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type {
  FinanceComparisonMode,
  FinanceComparisonSummary,
  FinanceDashboardSummary,
} from '@/lib/finance/types';
import { FinanceAssetFlowHistoryPanel } from './FinanceAssetFlowHistoryPanel';
import { FinanceAssetTrendPanel } from './FinanceAssetTrendPanel';
import { FinanceComparisonFilter } from './FinanceComparisonFilter';
import { FinanceExpenseMixPanel } from './FinanceExpenseMixPanel';
import { FinanceInvestmentTrendPanel } from './FinanceInvestmentTrendPanel';
import { FinanceSummaryCards } from './FinanceSummaryCards';

interface FinanceDashboardClientProps {
  dashboard: FinanceDashboardSummary;
  compare: FinanceComparisonMode;
}

export function FinanceDashboardClient({
  dashboard,
  compare,
}: FinanceDashboardClientProps) {
  if (!dashboard.current) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>아직 월 스냅샷이 없습니다</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          첫 월 데이터를 만든 뒤 이 대시보드에서 재무 흐름을 확인할 수 있습니다.
        </CardContent>
      </Card>
    );
  }

  const comparison: FinanceComparisonSummary =
    dashboard.comparison ?? {
      mode: compare,
      label: '비교 기준 없음',
      currentMonth: dashboard.current.month,
      referenceMonth: null,
      currentValue: dashboard.current.netWorth,
      referenceValue: null,
      absoluteChange: null,
      percentChange: null,
      metricComparisons: {
        totalAssets: {
          key: 'totalAssets',
          currentValue: dashboard.current.totalAssets,
          referenceValue: null,
          absoluteChange: null,
          percentChange: null,
        },
        totalLivingAssets: {
          key: 'totalLivingAssets',
          currentValue: dashboard.current.totalLivingAssets,
          referenceValue: null,
          absoluteChange: null,
          percentChange: null,
        },
        totalDebt: {
          key: 'totalDebt',
          currentValue: dashboard.current.totalDebt,
          referenceValue: null,
          absoluteChange: null,
          percentChange: null,
        },
        netWorth: {
          key: 'netWorth',
          currentValue: dashboard.current.netWorth,
          referenceValue: null,
          absoluteChange: null,
          percentChange: null,
        },
        totalIncome: {
          key: 'totalIncome',
          currentValue: dashboard.current.totalIncome,
          referenceValue: null,
          absoluteChange: null,
          percentChange: null,
        },
        totalExpenses: {
          key: 'totalExpenses',
          currentValue: dashboard.current.totalExpenses,
          referenceValue: null,
          absoluteChange: null,
          percentChange: null,
        },
        savingsEstimate: {
          key: 'savingsEstimate',
          currentValue: dashboard.current.savingsEstimate,
          referenceValue: null,
          absoluteChange: null,
          percentChange: null,
        },
      },
    };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <FinanceComparisonFilter month={dashboard.effectiveMonth} compare={compare} />
        <p className="text-xs text-muted-foreground">
          {compare === 'half'
            ? `선택한 월 기준 최근 6개월 구간을 차트에 표시합니다${
                dashboard.historyRangeLabel ? `: ${dashboard.historyRangeLabel}` : ''
              }.`
            : compare === 'year'
              ? `선택한 연도와 전년도 구간을 차트에 표시합니다${
                  dashboard.historyRangeLabel ? `: ${dashboard.historyRangeLabel}` : ''
                }.`
              : `등록된 전체 월 이력을 차트에 표시합니다${
                  dashboard.historyRangeLabel ? `: ${dashboard.historyRangeLabel}` : ''
                }.`}
        </p>
      </div>

      <FinanceSummaryCards summary={dashboard.current} comparison={comparison} />

      <div className="grid gap-4 xl:grid-cols-2">
        <FinanceAssetTrendPanel history={dashboard.history} />
        <FinanceExpenseMixPanel
          history={dashboard.history}
          fixedExpenses={dashboard.current.fixedExpenses}
          variableExpenses={dashboard.current.variableExpenses}
          childRelatedExpenses={dashboard.current.childRelatedExpenses}
        />
        <FinanceInvestmentTrendPanel
          history={dashboard.history}
          investmentValuation={dashboard.current.totalInvestmentValuation}
        />
        <FinanceAssetFlowHistoryPanel events={dashboard.assetFlowEvents} />
      </div>
    </div>
  );
}

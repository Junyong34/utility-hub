import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatFinanceMonthLabel } from '@/lib/finance/formatting';
import type { FinanceSnapshotSummary } from '@/lib/finance/types';
import {
  formatPercent,
  formatSignedWon,
  formatWon,
} from '@/components/finance/dashboard/finance-dashboard-formatting';
import { FinanceCategoryCompositionCard } from './FinanceCategoryCompositionCard';
import { FinanceMetricTile } from './FinanceMetricTile';

interface InvestmentsDetailSectionProps {
  summary: FinanceSnapshotSummary | null;
}

export function InvestmentsDetailSection({
  summary,
}: InvestmentsDetailSectionProps) {
  if (!summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>표시할 투자 데이터가 없습니다</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const isProfitPositive = summary.totalInvestmentProfitLoss > 0;
  const isProfitNeutral = summary.totalInvestmentProfitLoss === 0;

  return (
    <div className="space-y-4">
      <Card className="border-sky-200/70 bg-gradient-to-br from-sky-50/70 to-background dark:border-sky-900/40 dark:from-sky-950/20 dark:to-background">
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-sky-700 dark:text-sky-300">
              {formatFinanceMonthLabel(summary.month)} 투자 현황
            </CardTitle>
            <Badge
              variant={isProfitPositive ? 'default' : isProfitNeutral ? 'outline' : 'destructive'}
            >
              {isProfitPositive ? '수익 중' : isProfitNeutral ? '손익 없음' : '손실 중'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            원금과 평가금액의 차이를 보고, 어떤 투자군이 비중을 차지하는지 함께
            확인합니다.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <FinanceMetricTile
              label="원금"
              value={formatWon(summary.totalInvestmentPrincipal)}
              tone="neutral"
            />
            <FinanceMetricTile
              label="평가금액"
              value={formatWon(summary.totalInvestmentValuation)}
              tone="sky"
            />
            <FinanceMetricTile
              label="손익"
              value={formatSignedWon(summary.totalInvestmentProfitLoss)}
              tone={isProfitPositive ? 'emerald' : isProfitNeutral ? 'neutral' : 'rose'}
            />
            <FinanceMetricTile
              label="수익률"
              value={formatPercent(summary.totalInvestmentReturnRate)}
              tone={isProfitPositive ? 'emerald' : isProfitNeutral ? 'neutral' : 'rose'}
              description="원금 대비 평가금액 기준"
            />
          </div>
        </CardContent>
      </Card>

      <FinanceCategoryCompositionCard
        title="투자 구성"
        description="상품군별 평가 비중과 투자 집중도를 보여줍니다."
        totalLabel="투자 평가금액"
        totalValue={summary.totalInvestmentValuation}
        entries={summary.investmentByCategory}
        accent="sky"
        emptyText="표시할 투자 항목이 없습니다."
        testId="finance-investments-composition"
      />
    </div>
  );
}

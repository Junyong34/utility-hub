import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatFinanceMonthLabel } from '@/lib/finance/formatting';
import type { FinanceSnapshotSummary } from '@/lib/finance/types';
import { formatWon } from '@/components/finance/dashboard/finance-dashboard-formatting';
import { FinanceCategoryCompositionCard } from './FinanceCategoryCompositionCard';
import { FinanceMetricTile } from './FinanceMetricTile';

interface AssetsDetailSectionProps {
  summary: FinanceSnapshotSummary | null;
}

export function AssetsDetailSection({ summary }: AssetsDetailSectionProps) {
  if (!summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>표시할 자산 데이터가 없습니다</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const livingAssetShare =
    summary.totalAssets > 0
      ? Math.round((summary.totalLivingAssets / summary.totalAssets) * 100)
      : 0;

  return (
    <div className="space-y-4">
      <Card className="border-emerald-200/70 bg-gradient-to-br from-emerald-50/70 to-background dark:border-emerald-900/40 dark:from-emerald-950/20 dark:to-background">
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-emerald-700 dark:text-emerald-300">
              {formatFinanceMonthLabel(summary.month)} 자산 인사이트
            </CardTitle>
            <Badge variant="outline" className="border-emerald-200/70 text-emerald-700">
              생활자산 {livingAssetShare}%
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            생활자산이 어디에 쌓였는지 확인하고, 투자 포함 총자산과 순자산까지 함께
            봅니다.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <FinanceMetricTile
              label="생활자산"
              value={formatWon(summary.totalLivingAssets)}
              tone="emerald"
            />
            <FinanceMetricTile
              label="투자 평가금액"
              value={formatWon(summary.totalInvestmentValuation)}
              tone="sky"
            />
            <FinanceMetricTile
              label="투자 포함 총자산"
              value={formatWon(summary.totalAssets)}
              tone="neutral"
            />
            <FinanceMetricTile
              label="순자산"
              value={formatWon(summary.netWorth)}
              tone="emerald"
              description={`생활자산 비중 ${livingAssetShare}%`}
            />
          </div>
        </CardContent>
      </Card>

      <FinanceCategoryCompositionCard
        title="생활자산 구성"
        description="생활자산 항목을 비중이 큰 순서로 보여줍니다."
        totalLabel="생활자산 합계"
        totalValue={summary.totalLivingAssets}
        entries={summary.assetByCategory}
        accent="emerald"
        emptyText="표시할 생활자산 항목이 없습니다."
        testId="finance-assets-composition"
      />
    </div>
  );
}

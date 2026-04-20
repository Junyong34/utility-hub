import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatFinanceMonthLabel } from '@/lib/finance/formatting';
import type { FinanceSnapshotSummary } from '@/lib/finance/types';
import { formatWon } from '@/components/finance/dashboard/finance-dashboard-formatting';
import { FinanceCategoryCompositionCard } from './FinanceCategoryCompositionCard';
import { FinanceMetricTile } from './FinanceMetricTile';

interface DebtsDetailSectionProps {
  summary: FinanceSnapshotSummary | null;
}

function getDebtRiskTone(debtRatio: number): 'emerald' | 'amber' | 'rose' {
  if (debtRatio >= 40) {
    return 'rose';
  }

  if (debtRatio >= 20) {
    return 'amber';
  }

  return 'emerald';
}

function getDebtRiskLabel(debtRatio: number): string {
  if (debtRatio >= 40) {
    return '높음';
  }

  if (debtRatio >= 20) {
    return '주의';
  }

  return '낮음';
}

export function DebtsDetailSection({ summary }: DebtsDetailSectionProps) {
  if (!summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>표시할 부채 데이터가 없습니다</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const debtRatio =
    summary.totalAssets > 0
      ? Math.round((summary.totalDebt / summary.totalAssets) * 100)
      : 0;
  const debtRiskTone = getDebtRiskTone(debtRatio);
  const debtRiskLabel = getDebtRiskLabel(debtRatio);

  return (
    <div className="space-y-4">
      <Card className="border-rose-200/70 bg-gradient-to-br from-rose-50/70 to-background dark:border-rose-900/40 dark:from-rose-950/20 dark:to-background">
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-rose-700 dark:text-rose-300">
              {formatFinanceMonthLabel(summary.month)} 부채 현황
            </CardTitle>
            <Badge
              variant={debtRiskTone === 'rose' ? 'destructive' : 'outline'}
              className={
                debtRiskTone === 'amber'
                  ? 'border-amber-200/70 text-amber-700'
                  : debtRiskTone === 'emerald'
                    ? 'border-emerald-200/70 text-emerald-700'
                    : undefined
              }
            >
              위험도 {debtRiskLabel}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            총부채와 부채 비율, 순자산을 함께 보고 부채 집중도를 확인합니다.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <FinanceMetricTile
              label="총부채"
              value={formatWon(summary.totalDebt)}
              tone="rose"
            />
            <FinanceMetricTile
              label="부채 비율"
              value={`${debtRatio}%`}
              tone={debtRiskTone}
              description={`총자산 대비 ${debtRatio}%`}
            />
            <FinanceMetricTile
              label="순자산"
              value={formatWon(summary.netWorth)}
              tone="emerald"
            />
            <FinanceMetricTile
              label="총자산"
              value={formatWon(summary.totalAssets)}
              tone="neutral"
            />
          </div>
        </CardContent>
      </Card>

      <FinanceCategoryCompositionCard
        title="부채 구성"
        description="부채 유형별 잔액과 집중도를 보여줍니다."
        totalLabel="총부채 합계"
        totalValue={summary.totalDebt}
        entries={summary.debtByCategory}
        accent="rose"
        emptyText="표시할 부채 항목이 없습니다."
        testId="finance-debts-composition"
      />
    </div>
  );
}

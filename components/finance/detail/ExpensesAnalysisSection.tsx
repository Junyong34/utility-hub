import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FinanceSnapshotSummary } from '@/lib/finance/types';
import { formatFinanceMonthLabel } from '@/lib/finance/formatting';
import {
  formatPercent,
  formatWon,
} from '@/components/finance/dashboard/finance-dashboard-formatting';
import { FinanceCategoryCompositionCard } from './FinanceCategoryCompositionCard';
import { FinanceExpenseStructureCard } from './FinanceExpenseStructureCard';
import { FinanceMetricTile } from './FinanceMetricTile';

interface ExpensesAnalysisSectionProps {
  summary: FinanceSnapshotSummary | null;
}

export function ExpensesAnalysisSection({
  summary,
}: ExpensesAnalysisSectionProps) {
  if (!summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>표시할 지출 데이터가 없습니다</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const childRelatedRatio =
    summary.totalExpenses > 0
      ? Math.round((summary.childRelatedExpenses / summary.totalExpenses) * 100)
      : 0;

  return (
    <div className="space-y-4">
      <Card className="border-amber-200/70 bg-gradient-to-br from-amber-50/70 to-background dark:border-amber-900/40 dark:from-amber-950/20 dark:to-background">
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-amber-700 dark:text-amber-300">
              {formatFinanceMonthLabel(summary.month)} 지출 인사이트
            </CardTitle>
            <Badge variant="outline" className="border-amber-200/70 text-amber-700">
              자녀 관련 {formatPercent(childRelatedRatio)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            총지출을 한눈에 보고, 고정/변동/자녀 관련 지출의 구조를 같이 살핍니다.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <FinanceMetricTile
              label="총지출"
              value={formatWon(summary.totalExpenses)}
              tone="amber"
            />
            <FinanceMetricTile
              label="고정지출"
              value={formatWon(summary.fixedExpenses)}
              tone="rose"
              description={formatPercent(summary.fixedExpenseRatio)}
            />
            <FinanceMetricTile
              label="변동지출"
              value={formatWon(summary.variableExpenses)}
              tone="sky"
              description={formatPercent(summary.variableExpenseRatio)}
            />
            <FinanceMetricTile
              label="자녀 관련 지출"
              value={formatWon(summary.childRelatedExpenses)}
              tone="emerald"
              description={`${formatPercent(childRelatedRatio)} · 자녀 관련`}
            />
          </div>
        </CardContent>
      </Card>

      <FinanceExpenseStructureCard
        summary={summary}
        testId="finance-expenses-structure"
      />

      <FinanceCategoryCompositionCard
        title="지출 항목 구성"
        description="지출 카테고리별 비중과 집중도를 확인합니다."
        totalLabel="총지출 합계"
        totalValue={summary.totalExpenses}
        entries={summary.expenseByCategory}
        accent="amber"
        emptyText="표시할 지출 항목이 없습니다."
        testId="finance-expenses-composition"
      />
    </div>
  );
}

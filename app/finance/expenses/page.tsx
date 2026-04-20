import type { Metadata } from 'next';
import { ExpensesAnalysisSection } from '@/components/finance/detail/ExpensesAnalysisSection';
import {
  buildFinanceDashboardSummary,
  createFinanceRepository,
  FINANCE_PAGE_METADATA,
  parseFinanceCompareParam,
  parseFinanceMonthParam,
} from '@/lib/finance';
import { FinanceShell } from '@/components/finance/FinanceShell';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = FINANCE_PAGE_METADATA;

export default async function FinanceExpensesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const repository = createFinanceRepository();
  const snapshots = await repository.getSnapshots();
  const compare = parseFinanceCompareParam(resolvedSearchParams.compare);
  const month = parseFinanceMonthParam(resolvedSearchParams.month);
  const dashboard = buildFinanceDashboardSummary(snapshots, month, compare);

  return (
    <FinanceShell
      title="지출 분석"
      description="고정지출, 변동지출, 자녀 관련 지출을 기준 월 기준으로 확인합니다."
      currentPath="/finance/expenses"
      availableMonths={dashboard.availableMonths}
      month={dashboard.effectiveMonth}
      compare={compare}
    >
      <ExpensesAnalysisSection summary={dashboard.current} />
    </FinanceShell>
  );
}

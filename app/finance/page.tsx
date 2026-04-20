import type { Metadata } from 'next';
import { FinanceDashboardClient } from '@/components/finance/dashboard/FinanceDashboardClient';
import {
  buildFinanceDashboardSummary,
  FINANCE_PAGE_METADATA,
  parseFinanceCompareParam,
  parseFinanceMonthParam,
} from '@/lib/finance';
import { FinanceShell } from '@/components/finance/FinanceShell';
import { createFinanceRepository } from '@/lib/finance/server';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = FINANCE_PAGE_METADATA;

export default async function FinanceDashboardPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const repository = createFinanceRepository();
  const snapshots = await repository.getSnapshots();
  const compare = parseFinanceCompareParam(resolvedSearchParams.compare);
  const requestedMonth = parseFinanceMonthParam(resolvedSearchParams.month);
  const dashboard = buildFinanceDashboardSummary(
    snapshots,
    requestedMonth,
    compare
  );

  return (
    <FinanceShell
      title="재무 대시보드"
      description="선택한 비교 기준에 따라 카드별 금액과 증감량을 한 번에 확인하고, 아래에서 자산·지출·투자 흐름을 확인합니다."
      currentPath="/finance"
      availableMonths={dashboard.availableMonths}
      month={dashboard.effectiveMonth}
      compare={compare}
    >
      <FinanceDashboardClient dashboard={dashboard} compare={compare} />
    </FinanceShell>
  );
}

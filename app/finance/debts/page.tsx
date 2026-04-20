import type { Metadata } from 'next';
import { DebtsDetailSection } from '@/components/finance/detail/DebtsDetailSection';
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

export default async function FinanceDebtsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const repository = createFinanceRepository();
  const snapshots = await repository.getSnapshots();
  const compare = parseFinanceCompareParam(resolvedSearchParams.compare);
  const month = parseFinanceMonthParam(resolvedSearchParams.month);
  const dashboard = buildFinanceDashboardSummary(snapshots, month, compare);

  return (
    <FinanceShell
      title="부채 상세"
      description="기준 월의 부채 잔액과 자산 대비 부채 비율을 확인합니다."
      currentPath="/finance/debts"
      availableMonths={dashboard.availableMonths}
      month={dashboard.effectiveMonth}
      compare={compare}
    >
      <DebtsDetailSection summary={dashboard.current} />
    </FinanceShell>
  );
}

import type { Metadata } from 'next';
import { InvestmentsDetailSection } from '@/components/finance/detail/InvestmentsDetailSection';
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

export default async function FinanceInvestmentsPage({
  searchParams,
}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const repository = createFinanceRepository();
  const snapshots = await repository.getSnapshots();
  const compare = parseFinanceCompareParam(resolvedSearchParams.compare);
  const month = parseFinanceMonthParam(resolvedSearchParams.month);
  const dashboard = buildFinanceDashboardSummary(snapshots, month, compare);

  return (
    <FinanceShell
      title="투자 상세"
      description="기준 월의 투자 평가금액, 손익, 수익률을 확인합니다."
      currentPath="/finance/investments"
      availableMonths={dashboard.availableMonths}
      month={dashboard.effectiveMonth}
      compare={compare}
    >
      <InvestmentsDetailSection summary={dashboard.current} />
    </FinanceShell>
  );
}

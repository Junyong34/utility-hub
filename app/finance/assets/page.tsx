import type { Metadata } from 'next';
import { AssetsDetailSection } from '@/components/finance/detail/AssetsDetailSection';
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

export default async function FinanceAssetsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const repository = createFinanceRepository();
  const snapshots = await repository.getSnapshots();
  const compare = parseFinanceCompareParam(resolvedSearchParams.compare);
  const month = parseFinanceMonthParam(resolvedSearchParams.month);
  const dashboard = buildFinanceDashboardSummary(snapshots, month, compare);

  return (
    <FinanceShell
      title="자산 상세"
      description="투자 제외 생활자산과 자산 구성 항목을 기준 월 기준으로 확인합니다."
      currentPath="/finance/assets"
      availableMonths={dashboard.availableMonths}
      month={dashboard.effectiveMonth}
      compare={compare}
    >
      <AssetsDetailSection summary={dashboard.current} />
    </FinanceShell>
  );
}

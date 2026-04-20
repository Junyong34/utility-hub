import type { Metadata } from 'next';
import { FinanceShell } from '@/components/finance/FinanceShell';
import { ProjectionSection } from '@/components/finance/detail/ProjectionSection';
import {
  buildFinanceDashboardSummary,
  FINANCE_PAGE_METADATA,
  parseFinanceCompareParam,
  parseFinanceMonthParam,
} from '@/lib/finance';
import { createFinanceRepository } from '@/lib/finance/server';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = FINANCE_PAGE_METADATA;

export default async function FinanceProjectionPage({ searchParams }: PageProps) {
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
      title="미래 자산 계산"
      description="선택한 월의 총자산을 기준으로 연복리 증가율과 목표 연도를 입력해 미래 자산 경로를 확인합니다."
      currentPath="/finance/projection"
      availableMonths={dashboard.availableMonths}
      month={dashboard.effectiveMonth}
      compare={compare}
    >
      <ProjectionSection
        key={dashboard.current?.month ?? 'empty'}
        summary={dashboard.current}
      />
    </FinanceShell>
  );
}

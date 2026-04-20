import type { Metadata } from 'next';
import { ReportsSection } from '@/components/finance/detail/ReportsSection';
import {
  buildFinanceReportsSummary,
  FINANCE_PAGE_METADATA,
  parseFinanceCompareParam,
  parseFinanceMonthParam,
  resolveFinanceMonth,
} from '@/lib/finance';
import { FinanceShell } from '@/components/finance/FinanceShell';
import { createFinanceRepository } from '@/lib/finance/server';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = FINANCE_PAGE_METADATA;

export default async function FinanceReportsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const repository = createFinanceRepository();
  const snapshots = await repository.getSnapshots();
  const compare = parseFinanceCompareParam(resolvedSearchParams.compare);
  const availableMonths = snapshots.map((snapshot) => snapshot.month);
  const month = resolveFinanceMonth(
    availableMonths,
    parseFinanceMonthParam(resolvedSearchParams.month)
  );
  const reports = buildFinanceReportsSummary(snapshots);

  return (
    <FinanceShell
      title="리포트"
      description="분기, 반기, 연도 기준 bucket으로 순자산과 지출 흐름을 확인합니다."
      currentPath="/finance/reports"
      availableMonths={availableMonths}
      month={month}
      compare={compare}
    >
      <ReportsSection reports={reports} />
    </FinanceShell>
  );
}

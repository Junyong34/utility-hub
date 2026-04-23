import type { Metadata } from 'next';
import { FinanceWorkspacePageClient } from '@/components/finance/FinanceWorkspacePageClient';
import {
  FINANCE_PAGE_METADATA,
  parseFinanceCompareParam,
  parseFinanceMonthParam,
} from '@/lib/finance';
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
  const requestedMonth = parseFinanceMonthParam(resolvedSearchParams.month);

  return (
    <FinanceWorkspacePageClient
      view="reports"
      title="리포트"
      description="분기, 반기, 연도 기준 bucket으로 순자산과 지출 흐름을 확인합니다."
      currentPath="/finance/reports"
      fallbackSnapshots={snapshots}
      requestedMonth={requestedMonth}
      compare={compare}
    />
  );
}

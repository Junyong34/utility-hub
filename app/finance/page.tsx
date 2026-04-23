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

export default async function FinanceDashboardPage({
  searchParams,
}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const repository = createFinanceRepository();
  const snapshots = await repository.getSnapshots();
  const compare = parseFinanceCompareParam(resolvedSearchParams.compare);
  const requestedMonth = parseFinanceMonthParam(resolvedSearchParams.month);

  return (
    <FinanceWorkspacePageClient
      view="dashboard"
      title="재무 대시보드"
      description="선택한 비교 기준에 따라 카드별 금액과 증감량을 한 번에 확인하고, 아래에서 자산·지출·투자 흐름을 확인합니다."
      currentPath="/finance"
      fallbackSnapshots={snapshots}
      requestedMonth={requestedMonth}
      compare={compare}
    />
  );
}

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

export default async function FinanceDebtsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const repository = createFinanceRepository();
  const snapshots = await repository.getSnapshots();
  const compare = parseFinanceCompareParam(resolvedSearchParams.compare);
  const requestedMonth = parseFinanceMonthParam(resolvedSearchParams.month);

  return (
    <FinanceWorkspacePageClient
      view="debts"
      title="부채 상세"
      description="기준 월의 부채 잔액과 자산 대비 부채 비율을 확인합니다."
      currentPath="/finance/debts"
      fallbackSnapshots={snapshots}
      requestedMonth={requestedMonth}
      compare={compare}
    />
  );
}

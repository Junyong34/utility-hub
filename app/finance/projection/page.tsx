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

export default async function FinanceProjectionPage({
  searchParams,
}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const repository = createFinanceRepository();
  const snapshots = await repository.getSnapshots();
  const compare = parseFinanceCompareParam(resolvedSearchParams.compare);
  const requestedMonth = parseFinanceMonthParam(resolvedSearchParams.month);

  return (
    <FinanceWorkspacePageClient
      view="projection"
      title="미래 자산 계산"
      description="선택한 월의 총자산을 기준으로 연복리 증가율과 목표 연도를 입력해 미래 자산 경로를 확인합니다."
      currentPath="/finance/projection"
      fallbackSnapshots={snapshots}
      requestedMonth={requestedMonth}
      compare={compare}
    />
  );
}

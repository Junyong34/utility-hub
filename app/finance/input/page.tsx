import type { Metadata } from 'next';
import { FinanceShell } from '@/components/finance/FinanceShell';
import { FinanceCreateMonthCard } from '@/components/finance/input/FinanceCreateMonthCard';
import { FinanceInputPageClient } from '@/components/finance/input/FinanceInputPageClient';
import {
  FINANCE_PAGE_METADATA,
  getNextFinanceMonth,
  getPreviousFinanceMonth,
  parseFinanceCompareParam,
  parseFinanceMonthParam,
} from '@/lib/finance';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = FINANCE_PAGE_METADATA;
export const dynamic = 'force-dynamic';

export default async function FinanceInputPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const compare = parseFinanceCompareParam(resolvedSearchParams.compare);
  const requestedMonth = parseFinanceMonthParam(resolvedSearchParams.month);
  const localDraftMonth =
    resolvedSearchParams.local === '1' ? requestedMonth : null;
  const month = localDraftMonth;
  const availableMonths: string[] = [];
  const temporaryMonths = localDraftMonth ? [localDraftMonth] : [];
  const createMonthBase = localDraftMonth;
  const now = new Date();
  const suggestedMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const createMonthDefault = createMonthBase
    ? getNextFinanceMonth(createMonthBase)
    : suggestedMonth;
  const previousMonthDefault = localDraftMonth
    ? getPreviousFinanceMonth(localDraftMonth)
    : null;

  return (
    <FinanceShell
      title="재무 입력"
      description="월별 스냅샷은 전월 복사 후 수정합니다."
      currentPath="/finance/input"
      availableMonths={availableMonths}
      temporaryMonths={temporaryMonths}
      month={month}
      compare={compare}
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,320px)_1fr]">
        <FinanceCreateMonthCard
          month={localDraftMonth}
          createMonthDefault={createMonthDefault}
          previousMonthDefault={previousMonthDefault}
        />

        <FinanceInputPageClient month={localDraftMonth} />
      </div>
    </FinanceShell>
  );
}

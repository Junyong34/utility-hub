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
  resolveFinanceMonth,
} from '@/lib/finance';
import { createFinanceRepository } from '@/lib/finance/server';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = FINANCE_PAGE_METADATA;
export const dynamic = 'force-dynamic';

export default async function FinanceInputPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const repository = createFinanceRepository();
  const compare = parseFinanceCompareParam(resolvedSearchParams.compare);
  const duplicateMonthAlert = resolvedSearchParams.duplicate === '1';
  const requestedMonth = parseFinanceMonthParam(resolvedSearchParams.month);
  const localDraftMonth =
    resolvedSearchParams.local === '1' ? requestedMonth : null;
  const availableMonths = await repository.listMonths();
  const persistedMonth = resolveFinanceMonth(availableMonths, requestedMonth);
  const month = localDraftMonth ?? persistedMonth;
  const temporaryMonths =
    localDraftMonth && !availableMonths.includes(localDraftMonth)
      ? [localDraftMonth]
      : [];
  const snapshot = persistedMonth
    ? await repository.getSnapshot(persistedMonth)
    : null;
  const createMonthBase = persistedMonth ?? localDraftMonth;
  const now = new Date();
  const suggestedMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const createMonthDefault = createMonthBase
    ? getNextFinanceMonth(createMonthBase)
    : suggestedMonth;
  const previousMonthDefault = persistedMonth
    ? getPreviousFinanceMonth(persistedMonth)
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
          availableMonths={availableMonths}
          month={persistedMonth}
          createMonthDefault={createMonthDefault}
          previousMonthDefault={previousMonthDefault}
        />

        <FinanceInputPageClient
          key={snapshot?.month ?? 'empty'}
          snapshot={snapshot}
          saved={resolvedSearchParams.saved === '1'}
          duplicateMonthAlert={duplicateMonthAlert}
        />
      </div>
    </FinanceShell>
  );
}

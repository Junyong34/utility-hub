import type { Metadata } from 'next';
import { FinanceShell } from '@/components/finance/FinanceShell';
import { FinanceInputPageClient } from '@/components/finance/input/FinanceInputPageClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FINANCE_PAGE_METADATA,
  getNextFinanceMonth,
  getPreviousFinanceMonth,
  parseFinanceCompareParam,
  parseFinanceMonthParam,
  resolveFinanceMonth,
} from '@/lib/finance';
import { createFinanceRepository } from '@/lib/finance/server';
import { createFinanceMonthAction, saveFinanceSnapshotAction } from './actions';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = FINANCE_PAGE_METADATA;

export default async function FinanceInputPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const repository = createFinanceRepository();
  const compare = parseFinanceCompareParam(resolvedSearchParams.compare);
  const duplicateMonthAlert = resolvedSearchParams.duplicate === '1';
  const availableMonths = await repository.listMonths();
  const month = resolveFinanceMonth(
    availableMonths,
    parseFinanceMonthParam(resolvedSearchParams.month)
  );
  const snapshot = month ? await repository.getSnapshot(month) : null;
  const now = new Date();
  const suggestedMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const createMonthDefault = month
    ? getNextFinanceMonth(month)
    : suggestedMonth;
  const previousMonthDefault = month ? getPreviousFinanceMonth(month) : null;

  return (
    <FinanceShell
      title="재무 입력"
      description="월별 스냅샷은 전월 복사 후 수정합니다."
      currentPath="/finance/input"
      availableMonths={availableMonths}
      month={month}
      compare={compare}
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,320px)_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>새 월 생성</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              기준 월을 만들면 가장 가까운 이전 스냅샷을 복사해 새 월 데이터를
              시작합니다.
            </p>
            {month && previousMonthDefault ? (
              <div className="grid gap-2 sm:grid-cols-2">
                <form action={createFinanceMonthAction}>
                  <input
                    type="hidden"
                    name="month"
                    value={previousMonthDefault}
                  />
                  <input type="hidden" name="sourceMonth" value={month} />
                  <Button type="submit" variant="outline" className="w-full">
                    이전 월 스냅샷 생성
                  </Button>
                </form>
                <form action={createFinanceMonthAction}>
                  <input
                    type="hidden"
                    name="month"
                    value={createMonthDefault}
                  />
                  <input type="hidden" name="sourceMonth" value={month} />
                  <Button type="submit" variant="outline" className="w-full">
                    다음 월 스냅샷 생성
                  </Button>
                </form>
              </div>
            ) : null}
            <form action={createFinanceMonthAction} className="space-y-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="finance-new-month"
                  className="text-sm font-medium text-foreground"
                >
                  새 월 생성
                </label>
                <input
                  id="finance-new-month"
                  name="month"
                  type="month"
                  defaultValue={createMonthDefault}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="finance-source-month"
                  className="text-sm font-medium text-foreground"
                >
                  복사 기준월
                </label>
                <select
                  id="finance-source-month"
                  name="sourceMonth"
                  defaultValue={month ?? ''}
                  className="h-9 w-full rounded-lg border bg-background px-3 text-sm text-foreground"
                >
                  <option value="">가장 가까운 이전 월</option>
                  {availableMonths.map(availableMonth => (
                    <option key={availableMonth} value={availableMonth}>
                      {availableMonth}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input
                  name="overwriteExisting"
                  type="checkbox"
                  className="mt-1"
                />
                <span>
                  대상 월이 이미 있으면 복사 기준월 내용으로 다시 덮어쓰기
                </span>
              </label>
              <Button type="submit" className="w-full">
                월 스냅샷 생성/복사
              </Button>
            </form>
          </CardContent>
        </Card>

        <FinanceInputPageClient
          key={snapshot?.month ?? 'empty'}
          snapshot={snapshot}
          saved={resolvedSearchParams.saved === '1'}
          duplicateMonthAlert={duplicateMonthAlert}
          action={saveFinanceSnapshotAction}
        />
      </div>
    </FinanceShell>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createEmptyFinanceSnapshot } from '@/lib/finance/defaults';
import {
  buildLocalDraftHref,
  getLocalDraftMonths,
  readLocalDraft,
  writeLocalDraft,
} from './localDraft';

interface FinanceCreateMonthCardProps {
  month: string | null;
  createMonthDefault: string;
  previousMonthDefault: string | null;
}

export function FinanceCreateMonthCard({
  month,
  createMonthDefault,
  previousMonthDefault,
}: FinanceCreateMonthCardProps) {
  const router = useRouter();
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pending = pendingAction !== null;

  const submitCreate = async (actionKey: string, nextMonth: string) => {
    setError(null);
    setPendingAction(actionKey);

    try {
      const existingDraft = readLocalDraft();
      const existingMonths = getLocalDraftMonths();

      if (
        existingMonths.includes(nextMonth) &&
        !window.confirm(
          '이미 같은 월 입력 데이터가 있습니다. 빈 값으로 덮어쓸까요?'
        )
      ) {
        return;
      }

      writeLocalDraft([
        ...existingDraft,
        createEmptyFinanceSnapshot(nextMonth),
      ]);
      router.replace(buildLocalDraftHref(nextMonth), { scroll: false });
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : '월 스냅샷 생성에 실패했습니다.'
      );
    } finally {
      setPendingAction(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const targetMonth = formData.get('month');

    if (typeof targetMonth !== 'string' || targetMonth.length === 0) {
      setError('유효한 기준 월이 필요합니다.');
      return;
    }

    void submitCreate('custom', targetMonth);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>새 월 생성</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>
          기준 월을 선택하면 빈 재무 입력 화면을 열고, 내용은 브라우저
          로컬스토리지에만 보관합니다.
        </p>
        {month && previousMonthDefault ? (
          <div className="grid gap-2 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={pending}
              onClick={() =>
                void submitCreate('previous', previousMonthDefault)
              }
            >
              {pendingAction === 'previous'
                ? '열는 중...'
                : '이전 월 입력 열기'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={pending}
              onClick={() => void submitCreate('next', createMonthDefault)}
            >
              {pendingAction === 'next' ? '열는 중...' : '다음 월 입력 열기'}
            </Button>
          </div>
        ) : null}
        <form onSubmit={handleSubmit} className="space-y-3">
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
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {pendingAction === 'custom' ? '열는 중...' : '빈 입력 시작'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

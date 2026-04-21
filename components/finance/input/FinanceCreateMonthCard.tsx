'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FinanceCreateMonthCardProps {
  availableMonths: string[];
  month: string | null;
  createMonthDefault: string;
  previousMonthDefault: string | null;
}

interface CreateSnapshotResponse {
  redirectTo?: string;
  error?: string;
}

async function createFinanceSnapshot(input: {
  month: string;
  sourceMonth: string | null;
  overwriteExisting: boolean;
}): Promise<string> {
  const response = await fetch('/api/finance/snapshots', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'create',
      ...input,
    }),
  });
  const payload = (await response.json()) as CreateSnapshotResponse;

  if (!response.ok || !payload.redirectTo) {
    throw new Error(payload.error ?? '월 스냅샷 생성에 실패했습니다.');
  }

  return payload.redirectTo;
}

export function FinanceCreateMonthCard({
  availableMonths,
  month,
  createMonthDefault,
  previousMonthDefault,
}: FinanceCreateMonthCardProps) {
  const router = useRouter();
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pending = pendingAction !== null;

  const submitCreate = async (
    actionKey: string,
    input: {
      month: string;
      sourceMonth: string | null;
      overwriteExisting: boolean;
    }
  ) => {
    setError(null);
    setPendingAction(actionKey);

    try {
      const redirectTo = await createFinanceSnapshot(input);
      router.push(redirectTo);
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
    const sourceMonth = formData.get('sourceMonth');

    if (typeof targetMonth !== 'string' || targetMonth.length === 0) {
      setError('유효한 기준 월이 필요합니다.');
      return;
    }

    void submitCreate('custom', {
      month: targetMonth,
      sourceMonth: typeof sourceMonth === 'string' ? sourceMonth : null,
      overwriteExisting: formData.get('overwriteExisting') === 'on',
    });
  };

  return (
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
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={pending}
              onClick={() =>
                void submitCreate('previous', {
                  month: previousMonthDefault,
                  sourceMonth: month,
                  overwriteExisting: false,
                })
              }
            >
              {pendingAction === 'previous'
                ? '생성 중...'
                : '이전 월 스냅샷 생성'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={pending}
              onClick={() =>
                void submitCreate('next', {
                  month: createMonthDefault,
                  sourceMonth: month,
                  overwriteExisting: false,
                })
              }
            >
              {pendingAction === 'next' ? '생성 중...' : '다음 월 스냅샷 생성'}
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
            <input name="overwriteExisting" type="checkbox" className="mt-1" />
            <span>
              대상 월이 이미 있으면 복사 기준월 내용으로 다시 덮어쓰기
            </span>
          </label>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {pendingAction === 'custom' ? '생성 중...' : '월 스냅샷 생성/복사'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

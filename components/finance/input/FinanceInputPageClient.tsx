'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { FinanceMonthlySnapshot } from '@/lib/finance/types';
import { FinanceInputTabs } from './FinanceInputTabs';
import { FinanceSnapshotToolbar } from './FinanceSnapshotToolbar';

interface FinanceInputPageClientProps {
  snapshot: FinanceMonthlySnapshot;
  saved: boolean;
  duplicateMonthAlert: boolean;
  importAction: (formData: FormData) => Promise<string>;
  action: (formData: FormData) => void | Promise<void>;
}

function cloneSnapshot(snapshot: FinanceMonthlySnapshot): FinanceMonthlySnapshot {
  return {
    ...snapshot,
    incomes: { ...snapshot.incomes },
    assets: snapshot.assets.map((row) => ({ ...row })),
    debts: snapshot.debts.map((row) => ({ ...row })),
    investments: snapshot.investments.map((row) => ({ ...row })),
    expenses: snapshot.expenses.map((row) => ({ ...row })),
  };
}

export function FinanceInputPageClient({
  snapshot,
  saved,
  duplicateMonthAlert,
  importAction,
  action,
}: FinanceInputPageClientProps) {
  const [draft, setDraft] = useState(() => cloneSnapshot(snapshot));
  const [baseline, setBaseline] = useState(() => JSON.stringify(snapshot));
  const serializedDraft = useMemo(() => JSON.stringify(draft), [draft]);
  const dirty = serializedDraft !== baseline;
  const duplicateAlertShown = useRef(false);

  useEffect(() => {
    setDraft(cloneSnapshot(snapshot));
    setBaseline(JSON.stringify(snapshot));
  }, [snapshot]);

  useEffect(() => {
    if (duplicateMonthAlert && !duplicateAlertShown.current) {
      duplicateAlertShown.current = true;
      window.alert('이미 존재하는 월입니다. 기존 월을 그대로 불러왔습니다.');
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.delete('duplicate');
      window.history.replaceState({}, '', nextUrl.pathname + nextUrl.search);
    }
  }, [duplicateMonthAlert]);

  const handleReset = () => {
    if (
      dirty &&
      !window.confirm('현재 입력한 값을 초기화할까요? 저장되지 않은 내용은 사라집니다.')
    ) {
      return;
    }

    const nextSnapshot = cloneSnapshot(snapshot);
    setDraft(nextSnapshot);
    setBaseline(JSON.stringify(snapshot));
  };

  return (
    <div className="space-y-4">
      <Card>
        <form
          action={async (formData) => {
            setBaseline(serializedDraft);
            await action(formData);
          }}
        >
          <input type="hidden" name="snapshot" value={serializedDraft} />
          <FinanceSnapshotToolbar
            month={draft.month}
            updatedAt={draft.updatedAt}
            dirty={dirty}
            saved={saved}
            importAction={importAction}
            onReset={handleReset}
          />
          <CardContent className="pt-4">
            <FinanceInputTabs draft={draft} onChange={setDraft} />
          </CardContent>
        </form>
      </Card>
    </div>
  );
}

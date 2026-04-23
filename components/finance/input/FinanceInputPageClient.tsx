'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FinanceMonthlySnapshot } from '@/lib/finance/types';
import { FinanceInputTabs } from './FinanceInputTabs';
import { FinanceImportDialog } from './FinanceImportDialog';
import { FinanceSnapshotToolbar } from './FinanceSnapshotToolbar';
import {
  buildLocalDraftHref,
  clearLocalDraft,
  cloneFinanceLocalDraft,
  getLocalDraftSnapshot,
  getServerLocalDraftSnapshot,
  overwriteLocalDraft,
  parseStoredLocalDraft,
  subscribeToLocalDraft,
  upsertLocalDraftSnapshot,
} from './localDraft';

interface FinanceInputPageClientProps {
  month: string | null;
}

function downloadSnapshotJson(snapshot: FinanceMonthlySnapshot) {
  const payload = `${JSON.stringify(snapshot, null, 2)}\n`;
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `finance-snapshot-${snapshot.month}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function FinanceInputPageClient({ month }: FinanceInputPageClientProps) {
  const router = useRouter();
  const localDraftRaw = useSyncExternalStore(
    subscribeToLocalDraft,
    getLocalDraftSnapshot,
    getServerLocalDraftSnapshot
  );
  const localDraftSnapshots = useMemo(
    () => parseStoredLocalDraft(localDraftRaw),
    [localDraftRaw]
  );
  const storedDraft = useMemo(
    () =>
      !month
        ? (localDraftSnapshots.at(-1) ?? null)
        : (localDraftSnapshots.find(snapshot => snapshot.month === month) ??
          localDraftSnapshots.at(-1) ??
          null),
    [localDraftSnapshots, month]
  );

  useEffect(() => {
    if (!storedDraft) {
      return;
    }

    if (month !== storedDraft.month) {
      router.replace(buildLocalDraftHref(storedDraft.month), { scroll: false });
    }
  }, [month, router, storedDraft]);

  const handleImport = (snapshots: FinanceMonthlySnapshot[]) => {
    const nextDraft = snapshots.at(-1);

    if (!nextDraft) {
      throw new Error('가져올 스냅샷이 없습니다.');
    }

    const clonedDraft = cloneFinanceLocalDraft(nextDraft);

    overwriteLocalDraft(snapshots);
    router.replace(buildLocalDraftHref(clonedDraft.month), { scroll: false });
  };

  const handleClearLocalDraft = () => {
    if (
      !window.confirm(
        '브라우저에 보관 중인 가져온 데이터를 초기화할까요? 서버에 저장된 데이터는 유지됩니다.'
      )
    ) {
      return;
    }

    clearLocalDraft();
    router.replace('/finance/input', { scroll: false });
    router.refresh();
  };

  if (!storedDraft) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>입력 준비 상태</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            아직 입력 데이터가 없습니다. 빈 입력을 시작하거나 JSON을 가져오면
            현재 브라우저 로컬스토리지에만 저장됩니다.
          </p>
          <FinanceImportDialog
            onImport={handleImport}
            buttonClassName="w-full justify-center"
          />
          <Button asChild variant="outline">
            <Link href="/finance">대시보드로 돌아가기</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <FinanceInputDraftEditor
      key={`${storedDraft.month}-${localDraftSnapshots.map(snapshot => snapshot.month).join(',')}`}
      initialSnapshot={storedDraft}
      onImport={handleImport}
      onClearLocalDraft={handleClearLocalDraft}
    />
  );
}

interface FinanceInputDraftEditorProps {
  initialSnapshot: FinanceMonthlySnapshot;
  onImport: (snapshots: FinanceMonthlySnapshot[]) => void;
  onClearLocalDraft: () => void;
}

function FinanceInputDraftEditor({
  initialSnapshot,
  onImport,
  onClearLocalDraft,
}: FinanceInputDraftEditorProps) {
  const [draft, setDraft] = useState<FinanceMonthlySnapshot>(() =>
    cloneFinanceLocalDraft(initialSnapshot)
  );

  useEffect(() => {
    upsertLocalDraftSnapshot(draft);
  }, [draft]);

  useEffect(() => {
    setDraft(cloneFinanceLocalDraft(initialSnapshot));
  }, [initialSnapshot]);

  const handleDownload = () => {
    downloadSnapshotJson(draft);
  };

  const formContent = (
    <>
      <FinanceSnapshotToolbar
        month={draft.month}
        updatedAt={draft.updatedAt}
        onImport={onImport}
        onDownload={handleDownload}
        onClearLocalDraft={onClearLocalDraft}
      />
      <CardContent className="pt-4">
        <FinanceInputTabs
          draft={draft}
          onChange={nextDraft => setDraft(nextDraft)}
        />
      </CardContent>
    </>
  );

  return (
    <div className="space-y-4">
      <Card>
        <div>{formContent}</div>
      </Card>
    </div>
  );
}

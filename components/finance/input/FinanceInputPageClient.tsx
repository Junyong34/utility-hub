'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FinanceMonthlySnapshot } from '@/lib/finance/types';
import { FinanceInputTabs } from './FinanceInputTabs';
import { FinanceImportDialog } from './FinanceImportDialog';
import { FinanceSnapshotToolbar } from './FinanceSnapshotToolbar';

interface FinanceInputPageClientProps {
  snapshot: FinanceMonthlySnapshot | null;
  saved: boolean;
  duplicateMonthAlert: boolean;
}

const LOCAL_DRAFT_STORAGE_KEY = 'zento-finance-input-local-draft-v1';
const LOCAL_DRAFT_STORAGE_EVENT = 'finance-input-local-draft-change';

interface StoredLocalDraft {
  version: 1;
  snapshot: FinanceMonthlySnapshot;
}

interface SaveSnapshotResponse {
  redirectTo?: string;
  error?: string;
}

function cloneSnapshot(
  snapshot: FinanceMonthlySnapshot
): FinanceMonthlySnapshot {
  return {
    ...snapshot,
    incomes: { ...snapshot.incomes },
    assets: snapshot.assets.map(row => ({ ...row })),
    debts: snapshot.debts.map(row => ({ ...row })),
    investments: snapshot.investments.map(row => ({ ...row })),
    expenses: snapshot.expenses.map(row => ({ ...row })),
  };
}

function isStoredLocalDraft(value: unknown): value is StoredLocalDraft {
  if (typeof value !== 'object' || value === null || !('snapshot' in value)) {
    return false;
  }

  const draft = value as Partial<StoredLocalDraft>;
  const snapshot = draft.snapshot;

  return (
    draft.version === 1 &&
    typeof snapshot === 'object' &&
    snapshot !== null &&
    typeof snapshot.month === 'string'
  );
}

function parseStoredLocalDraft(
  raw: string | null
): FinanceMonthlySnapshot | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;

    if (!isStoredLocalDraft(parsed)) {
      return null;
    }

    return cloneSnapshot(parsed.snapshot);
  } catch {
    return null;
  }
}

function subscribeToLocalDraft(callback: () => void) {
  window.addEventListener(LOCAL_DRAFT_STORAGE_EVENT, callback);
  window.addEventListener('storage', callback);

  return () => {
    window.removeEventListener(LOCAL_DRAFT_STORAGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

function getLocalDraftSnapshot() {
  return window.localStorage.getItem(LOCAL_DRAFT_STORAGE_KEY);
}

function getServerLocalDraftSnapshot() {
  return null;
}

function emitLocalDraftChange() {
  window.dispatchEvent(new Event(LOCAL_DRAFT_STORAGE_EVENT));
}

function writeLocalDraft(snapshot: FinanceMonthlySnapshot) {
  const payload: StoredLocalDraft = {
    version: 1,
    snapshot,
  };

  window.localStorage.setItem(LOCAL_DRAFT_STORAGE_KEY, JSON.stringify(payload));
  emitLocalDraftChange();
}

function clearLocalDraft() {
  window.localStorage.removeItem(LOCAL_DRAFT_STORAGE_KEY);
  emitLocalDraftChange();
}

function buildLocalDraftHref(month: string) {
  return `/finance/input?month=${month}&local=1`;
}

function buildServerSnapshotHref(snapshot: FinanceMonthlySnapshot | null) {
  return snapshot ? `/finance/input?month=${snapshot.month}` : '/finance/input';
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

async function saveFinanceSnapshot(
  snapshot: FinanceMonthlySnapshot
): Promise<string> {
  const response = await fetch('/api/finance/snapshots', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'save',
      snapshot,
    }),
  });
  const payload = (await response.json()) as SaveSnapshotResponse;

  if (!response.ok || !payload.redirectTo) {
    throw new Error(payload.error ?? '스냅샷 저장에 실패했습니다.');
  }

  return payload.redirectTo;
}

export function FinanceInputPageClient({
  snapshot,
  saved,
  duplicateMonthAlert,
}: FinanceInputPageClientProps) {
  const router = useRouter();
  const localDraftRaw = useSyncExternalStore(
    subscribeToLocalDraft,
    getLocalDraftSnapshot,
    getServerLocalDraftSnapshot
  );
  const storedDraft = useMemo(
    () => parseStoredLocalDraft(localDraftRaw),
    [localDraftRaw]
  );
  const activeSnapshot = storedDraft ?? snapshot;
  const localDraft = Boolean(storedDraft);

  const handleImport = (snapshots: FinanceMonthlySnapshot[]) => {
    const nextDraft = snapshots.at(-1);

    if (!nextDraft) {
      throw new Error('가져올 스냅샷이 없습니다.');
    }

    const clonedDraft = cloneSnapshot(nextDraft);

    writeLocalDraft(clonedDraft);
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
    router.replace(buildServerSnapshotHref(snapshot), { scroll: false });
    router.refresh();
  };

  if (!activeSnapshot) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>입력 준비 상태</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            아직 생성된 월 스냅샷이 없습니다. JSON을 가져오면 서버에 저장하지
            않고 이 브라우저에서만 입력 화면을 열 수 있습니다.
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
      key={`${localDraft ? 'local' : 'server'}-${activeSnapshot.month}`}
      initialSnapshot={activeSnapshot}
      localDraft={localDraft}
      saved={saved}
      duplicateMonthAlert={duplicateMonthAlert}
      onImport={handleImport}
      onClearLocalDraft={handleClearLocalDraft}
    />
  );
}

interface FinanceInputDraftEditorProps {
  initialSnapshot: FinanceMonthlySnapshot;
  localDraft: boolean;
  saved: boolean;
  duplicateMonthAlert: boolean;
  onImport: (snapshots: FinanceMonthlySnapshot[]) => void;
  onClearLocalDraft: () => void;
}

function FinanceInputDraftEditor({
  initialSnapshot,
  localDraft,
  saved,
  duplicateMonthAlert,
  onImport,
  onClearLocalDraft,
}: FinanceInputDraftEditorProps) {
  const router = useRouter();
  const [draft, setDraft] = useState<FinanceMonthlySnapshot>(() =>
    cloneSnapshot(initialSnapshot)
  );
  const [baseline, setBaseline] = useState(() =>
    JSON.stringify(initialSnapshot)
  );
  const [savePending, setSavePending] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const serializedDraft = useMemo(() => JSON.stringify(draft), [draft]);
  const dirty = serializedDraft !== baseline;
  const duplicateAlertShown = useRef(false);

  useEffect(() => {
    if (!localDraft) {
      return;
    }

    writeLocalDraft(draft);
  }, [draft, localDraft]);

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
      !window.confirm(
        '현재 입력한 값을 초기화할까요? 저장되지 않은 내용은 사라집니다.'
      )
    ) {
      return;
    }

    const nextSnapshot = cloneSnapshot(initialSnapshot);
    setDraft(nextSnapshot);
    setBaseline(JSON.stringify(initialSnapshot));
  };

  const handleDownload = () => {
    downloadSnapshotJson(draft);
  };

  const handleSave = async () => {
    setSaveError(null);
    setSavePending(true);

    try {
      const redirectTo = await saveFinanceSnapshot(draft);
      setBaseline(serializedDraft);
      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : '스냅샷 저장에 실패했습니다.'
      );
    } finally {
      setSavePending(false);
    }
  };

  const formContent = (
    <>
      <FinanceSnapshotToolbar
        month={draft.month}
        updatedAt={draft.updatedAt}
        dirty={dirty}
        saved={saved}
        localDraft={localDraft}
        savePending={savePending}
        onSave={handleSave}
        onImport={onImport}
        onDownload={handleDownload}
        onClearLocalDraft={onClearLocalDraft}
        onReset={handleReset}
      />
      <CardContent className="pt-4">
        <FinanceInputTabs
          draft={draft}
          onChange={nextDraft => setDraft(nextDraft)}
        />
        {saveError ? (
          <p className="mt-4 text-sm text-destructive">{saveError}</p>
        ) : null}
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

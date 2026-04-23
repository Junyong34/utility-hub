'use client';

import type {
  FinanceMonthlySnapshot,
  FinanceSnapshotsDataset,
} from '@/lib/finance/types';

export const LOCAL_DRAFT_STORAGE_KEY = 'zento-finance-input-local-draft-v1';
const LOCAL_DRAFT_STORAGE_EVENT = 'finance-input-local-draft-change';

type StoredLocalDraft = FinanceSnapshotsDataset;

export function cloneFinanceLocalDraft(
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
  if (
    typeof value !== 'object' ||
    value === null ||
    !('snapshots' in value) ||
    !Array.isArray((value as { snapshots?: unknown }).snapshots)
  ) {
    return false;
  }

  const draft = value as Partial<StoredLocalDraft>;

  return draft.version === 1;
}

function dedupeAndSortLocalDraftSnapshots(
  snapshots: FinanceMonthlySnapshot[]
): FinanceMonthlySnapshot[] {
  const snapshotByMonth = new Map<string, FinanceMonthlySnapshot>();

  for (const snapshot of snapshots) {
    snapshotByMonth.set(snapshot.month, cloneFinanceLocalDraft(snapshot));
  }

  return [...snapshotByMonth.values()].sort((left, right) =>
    left.month.localeCompare(right.month)
  );
}

export function parseStoredLocalDraft(
  raw: string | null
): FinanceMonthlySnapshot[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;

    if (!isStoredLocalDraft(parsed)) {
      return [];
    }

    return dedupeAndSortLocalDraftSnapshots(parsed.snapshots);
  } catch {
    return [];
  }
}

export function subscribeToLocalDraft(callback: () => void) {
  window.addEventListener(LOCAL_DRAFT_STORAGE_EVENT, callback);
  window.addEventListener('storage', callback);

  return () => {
    window.removeEventListener(LOCAL_DRAFT_STORAGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

export function getLocalDraftSnapshot() {
  return window.localStorage.getItem(LOCAL_DRAFT_STORAGE_KEY);
}

export function getServerLocalDraftSnapshot() {
  return null;
}

function emitLocalDraftChange() {
  window.dispatchEvent(new Event(LOCAL_DRAFT_STORAGE_EVENT));
}

export function readLocalDraft() {
  return parseStoredLocalDraft(getLocalDraftSnapshot());
}

export function readLocalDraftSnapshot(
  month: string | null
): FinanceMonthlySnapshot | null {
  const snapshots = readLocalDraft();

  if (snapshots.length === 0) {
    return null;
  }

  if (!month) {
    return snapshots.at(-1) ?? null;
  }

  return (
    snapshots.find(snapshot => snapshot.month === month) ??
    snapshots.at(-1) ??
    null
  );
}

export function getLocalDraftMonths(raw?: string | null): string[] {
  const snapshots =
    raw === undefined ? readLocalDraft() : parseStoredLocalDraft(raw);

  return snapshots.map(snapshot => snapshot.month);
}

export function writeLocalDraft(snapshots: FinanceMonthlySnapshot[]) {
  const payload: StoredLocalDraft = {
    version: 1,
    snapshots: dedupeAndSortLocalDraftSnapshots(snapshots),
  };

  window.localStorage.setItem(LOCAL_DRAFT_STORAGE_KEY, JSON.stringify(payload));
  emitLocalDraftChange();
}

export function overwriteLocalDraft(snapshots: FinanceMonthlySnapshot[]) {
  writeLocalDraft(snapshots);
}

export function upsertLocalDraftSnapshot(snapshot: FinanceMonthlySnapshot) {
  const snapshots = readLocalDraft();
  writeLocalDraft([...snapshots, snapshot]);
}

export function clearLocalDraft() {
  window.localStorage.removeItem(LOCAL_DRAFT_STORAGE_KEY);
  emitLocalDraftChange();
}

export function buildLocalDraftHref(month: string) {
  return `/finance/input?month=${month}&local=1`;
}

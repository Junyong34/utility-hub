import type { FinanceMonthlySnapshot } from './types.ts';

const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;
const DATASET_VERSION = 1 as const;

export interface FinanceSnapshotImportStore {
  saveSnapshot(
    snapshot: FinanceMonthlySnapshot
  ): Promise<FinanceMonthlySnapshot>;

  saveSnapshots?(
    snapshots: FinanceMonthlySnapshot[]
  ): Promise<FinanceMonthlySnapshot[]>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isValidMonth(value: unknown): value is string {
  return typeof value === 'string' && MONTH_PATTERN.test(value);
}

function dedupeAndSortSnapshots(
  snapshots: FinanceMonthlySnapshot[]
): FinanceMonthlySnapshot[] {
  const snapshotByMonth = new Map<string, FinanceMonthlySnapshot>();

  for (const snapshot of snapshots) {
    snapshotByMonth.set(snapshot.month, snapshot);
  }

  return [...snapshotByMonth.values()].sort((left, right) =>
    left.month.localeCompare(right.month)
  );
}

function parseSnapshotCandidate(raw: unknown): FinanceMonthlySnapshot {
  if (!isRecord(raw) || !isValidMonth(raw.month)) {
    throw new Error('가져올 수 있는 재무 스냅샷이 아닙니다.');
  }

  return raw as unknown as FinanceMonthlySnapshot;
}

function parseFinanceDataset(raw: Record<string, unknown>): FinanceMonthlySnapshot[] {
  if (raw.version !== DATASET_VERSION || !Array.isArray(raw.snapshots)) {
    throw new Error('재무 데이터셋 형식이 올바르지 않습니다.');
  }

  if (raw.snapshots.length === 0) {
    throw new Error('가져올 스냅샷이 없습니다.');
  }

  const snapshots = raw.snapshots.map((item, index) => {
    if (!isRecord(item) || !isValidMonth(item.month)) {
      throw new Error(
        `${index + 1}번째 스냅샷의 month가 유효하지 않습니다.`
      );
    }

    return item as unknown as FinanceMonthlySnapshot;
  });

  return dedupeAndSortSnapshots(snapshots);
}

export function parseFinanceSnapshotImports(
  rawJson: string
): FinanceMonthlySnapshot[] {
  let parsed: unknown;

  try {
    parsed = JSON.parse(rawJson);
  } catch {
    throw new Error('유효하지 않은 JSON입니다.');
  }

  if (!isRecord(parsed)) {
    throw new Error('가져올 수 있는 재무 스냅샷이 아닙니다.');
  }

  if ('version' in parsed || 'snapshots' in parsed) {
    return parseFinanceDataset(parsed);
  }

  return [parseSnapshotCandidate(parsed)];
}

export function parseFinanceSnapshotImport(
  rawJson: string
): FinanceMonthlySnapshot {
  const snapshots = parseFinanceSnapshotImports(rawJson);
  return snapshots.at(-1)!;
}

async function saveSnapshotsWithStore(
  store: FinanceSnapshotImportStore,
  snapshots: FinanceMonthlySnapshot[]
): Promise<FinanceMonthlySnapshot[]> {
  if (typeof store.saveSnapshots === 'function') {
    return store.saveSnapshots(snapshots);
  }

  const savedSnapshots: FinanceMonthlySnapshot[] = [];

  for (const snapshot of snapshots) {
    savedSnapshots.push(await store.saveSnapshot(snapshot));
  }

  return savedSnapshots.sort((left, right) =>
    left.month.localeCompare(right.month)
  );
}

export async function importFinanceSnapshotsFromRawJson(
  rawJson: string,
  store: FinanceSnapshotImportStore
): Promise<FinanceMonthlySnapshot[]> {
  const snapshots = parseFinanceSnapshotImports(rawJson);
  return saveSnapshotsWithStore(store, snapshots);
}

export async function importFinanceSnapshotFromRawJson(
  rawJson: string,
  store: FinanceSnapshotImportStore
): Promise<FinanceMonthlySnapshot> {
  const snapshots = await importFinanceSnapshotsFromRawJson(rawJson, store);
  return snapshots.at(-1)!;
}

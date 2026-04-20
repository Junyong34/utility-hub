import path from 'node:path';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import {
  cloneFinanceSnapshot,
  createDefaultExpenseRows,
  createDefaultIncomeSnapshot,
  createEmptyFinanceSnapshot,
} from './defaults.ts';
import type {
  CreateFinanceSnapshotResult,
  FinanceAssetRow,
  FinanceDebtRow,
  FinanceExpenseRow,
  FinanceExpenseType,
  FinanceIncomeSnapshot,
  FinanceInvestmentRow,
  FinanceMonthlySnapshot,
  FinanceSnapshotsDataset,
  FinanceOwner,
} from './types.ts';

const DATASET_VERSION = 1 as const;
const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

export const DEFAULT_FINANCE_SNAPSHOTS_PATH = path.join(
  process.cwd(),
  'data/private/finance-snapshots.json'
);

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function ensureMonth(month: string): string {
  if (!MONTH_PATTERN.test(month)) {
    throw new Error(`Invalid finance snapshot month: ${month}`);
  }

  return month;
}

function normalizeInteger(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    return 0;
  }

  return Math.floor(value);
}

function normalizeNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }

  return value;
}

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function normalizeOwner(value: unknown): FinanceOwner {
  return value === 'husband' || value === 'wife' ? value : 'joint';
}

function ensureId(value: unknown, fallback: string): string {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }

  return fallback;
}

function normalizeIncomes(raw: unknown): FinanceIncomeSnapshot {
  if (!isObject(raw)) {
    return createDefaultIncomeSnapshot();
  }

  return {
    husbandSalary: normalizeInteger(raw.husbandSalary),
    wifeSalary: normalizeInteger(raw.wifeSalary),
    memo: normalizeText(raw.memo),
  };
}

function normalizeAssetRows(raw: unknown): FinanceAssetRow[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((item, index) => {
    if (!isObject(item) || typeof item.category !== 'string') {
      return [];
    }

    return [
      {
        id: ensureId(item.id, `asset-${index + 1}`),
        owner: normalizeOwner(item.owner),
        category: item.category as FinanceAssetRow['category'],
        name: normalizeText(item.name),
        amount: normalizeInteger(item.amount),
        autoAccumulate: Boolean(item.autoAccumulate),
        monthlyContribution: normalizeNullableNumber(item.monthlyContribution),
        memo: normalizeText(item.memo),
      },
    ];
  });
}

function calculateMonthDistance(sourceMonth: string, targetMonth: string): number {
  const [sourceYearRaw, sourceMonthRaw] = sourceMonth.split('-');
  const [targetYearRaw, targetMonthRaw] = targetMonth.split('-');
  const sourceIndex = Number(sourceYearRaw) * 12 + Number(sourceMonthRaw);
  const targetIndex = Number(targetYearRaw) * 12 + Number(targetMonthRaw);

  return targetIndex - sourceIndex;
}

function applyAssetAutoAccumulation(
  source: FinanceMonthlySnapshot,
  target: FinanceMonthlySnapshot
): FinanceMonthlySnapshot {
  const monthDistance = calculateMonthDistance(source.month, target.month);

  if (monthDistance === 0) {
    return target;
  }

  return {
    ...target,
    assets: target.assets.map((row) => {
      if (!row.autoAccumulate || !row.monthlyContribution) {
        return row;
      }

      return {
        ...row,
        amount: Math.max(
          normalizeInteger(row.amount) +
            normalizeInteger(row.monthlyContribution) * monthDistance,
          0
        ),
      };
    }),
  };
}

function normalizeDebtRows(raw: unknown): FinanceDebtRow[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((item, index) => {
    if (!isObject(item) || typeof item.category !== 'string') {
      return [];
    }

    return [
      {
        id: ensureId(item.id, `debt-${index + 1}`),
        owner: normalizeOwner(item.owner),
        category: item.category as FinanceDebtRow['category'],
        name: normalizeText(item.name),
        balance: normalizeInteger(item.balance),
        interestRate: normalizeNullableNumber(item.interestRate),
        monthlyPayment: normalizeNullableNumber(item.monthlyPayment),
        monthlyInterest: normalizeNullableNumber(item.monthlyInterest),
        memo: normalizeText(item.memo),
      },
    ];
  });
}

function normalizeInvestmentRows(raw: unknown): FinanceInvestmentRow[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((item, index) => {
    if (!isObject(item) || typeof item.category !== 'string') {
      return [];
    }

    return [
      {
        id: ensureId(item.id, `investment-${index + 1}`),
        owner: normalizeOwner(item.owner),
        category: item.category as FinanceInvestmentRow['category'],
        name: normalizeText(item.name),
        principal: normalizeInteger(item.principal),
        valuation: normalizeInteger(item.valuation),
        memo: normalizeText(item.memo),
      },
    ];
  });
}

function normalizeExpenseType(value: unknown): FinanceExpenseType {
  return value === 'variable' ? 'variable' : 'fixed';
}

function normalizeExpenseRows(raw: unknown): FinanceExpenseRow[] {
  if (!Array.isArray(raw)) {
    return createDefaultExpenseRows();
  }

  return raw.flatMap((item, index) => {
    if (!isObject(item) || typeof item.category !== 'string') {
      return [];
    }

    return [
      {
        id: ensureId(item.id, `expense-${index + 1}`),
        owner: normalizeOwner(item.owner),
        type: normalizeExpenseType(item.type),
        category: item.category as FinanceExpenseRow['category'],
        name: normalizeText(item.name),
        amount: normalizeInteger(item.amount),
        childRelated: Boolean(item.childRelated),
        memo: normalizeText(item.memo),
      },
    ];
  });
}

function normalizeSnapshot(raw: unknown, index: number): FinanceMonthlySnapshot {
  if (!isObject(raw) || typeof raw.month !== 'string') {
    throw new Error(`Invalid finance snapshot at index ${index}`);
  }

  const month = ensureMonth(raw.month);

  return {
    month,
    updatedAt:
      typeof raw.updatedAt === 'string' && raw.updatedAt.length > 0
        ? raw.updatedAt
        : new Date().toISOString(),
    incomes: normalizeIncomes(raw.incomes),
    assets: normalizeAssetRows(raw.assets),
    debts: normalizeDebtRows(raw.debts),
    investments: normalizeInvestmentRows(raw.investments),
    expenses: normalizeExpenseRows(raw.expenses),
  };
}

function sortSnapshots(
  snapshots: FinanceMonthlySnapshot[]
): FinanceMonthlySnapshot[] {
  return [...snapshots].sort((left, right) => left.month.localeCompare(right.month));
}

function normalizeDataset(raw: unknown): FinanceSnapshotsDataset {
  if (!isObject(raw)) {
    throw new Error('Invalid finance snapshots dataset');
  }

  const version =
    typeof raw.version === 'number' ? raw.version : Number.NaN;

  if (version !== DATASET_VERSION) {
    throw new Error(`Unsupported finance snapshots dataset version: ${String(raw.version)}`);
  }

  if (!Array.isArray(raw.snapshots)) {
    throw new Error('Finance snapshots dataset must contain a snapshots array');
  }

  return {
    version: DATASET_VERSION,
    snapshots: sortSnapshots(raw.snapshots.map(normalizeSnapshot)),
  };
}

function createEmptyDataset(): FinanceSnapshotsDataset {
  return {
    version: DATASET_VERSION,
    snapshots: [],
  };
}

async function ensureParentDirectory(filePath: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
}

async function readDatasetFromFile(filePath: string): Promise<FinanceSnapshotsDataset> {
  try {
    const file = await readFile(filePath, 'utf8');
    const raw = JSON.parse(file) as unknown;
    return normalizeDataset(raw);
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      return createEmptyDataset();
    }

    if (error instanceof SyntaxError) {
      throw new Error(`Invalid finance snapshots JSON at ${filePath}`);
    }

    throw error;
  }
}

async function writeDatasetToFile(
  filePath: string,
  dataset: FinanceSnapshotsDataset
): Promise<void> {
  await ensureParentDirectory(filePath);

  const tempFilePath = `${filePath}.tmp`;
  const payload = `${JSON.stringify(dataset, null, 2)}\n`;

  await writeFile(tempFilePath, payload, 'utf8');
  await rename(tempFilePath, filePath);
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

function upsertSnapshots(
  existingSnapshots: FinanceMonthlySnapshot[],
  incomingSnapshots: FinanceMonthlySnapshot[]
): FinanceMonthlySnapshot[] {
  const snapshotByMonth = new Map(
    existingSnapshots.map((snapshot) => [snapshot.month, snapshot])
  );

  for (const snapshot of incomingSnapshots) {
    snapshotByMonth.set(snapshot.month, snapshot);
  }

  return dedupeAndSortSnapshots([...snapshotByMonth.values()]);
}

export interface FinanceRepositoryOptions {
  filePath?: string;
}

export function createFinanceRepository(options: FinanceRepositoryOptions = {}) {
  const filePath = options.filePath ?? DEFAULT_FINANCE_SNAPSHOTS_PATH;

  async function listMonths(): Promise<string[]> {
    const dataset = await readDatasetFromFile(filePath);
    return dataset.snapshots.map((snapshot) => snapshot.month);
  }

  async function getSnapshots(): Promise<FinanceMonthlySnapshot[]> {
    const dataset = await readDatasetFromFile(filePath);
    return dataset.snapshots;
  }

  async function getLatestMonth(): Promise<string | null> {
    const months = await listMonths();
    return months.at(-1) ?? null;
  }

  async function getSnapshot(month: string): Promise<FinanceMonthlySnapshot | null> {
    const targetMonth = ensureMonth(month);
    const dataset = await readDatasetFromFile(filePath);

    return dataset.snapshots.find((snapshot) => snapshot.month === targetMonth) ?? null;
  }

  async function saveSnapshot(
    snapshot: FinanceMonthlySnapshot
  ): Promise<FinanceMonthlySnapshot> {
    const targetMonth = ensureMonth(snapshot.month);
    const savedSnapshot = {
      ...normalizeSnapshot(snapshot, 0),
      month: targetMonth,
      updatedAt: new Date().toISOString(),
    };

    await saveSnapshots([savedSnapshot]);

    return savedSnapshot;
  }

  async function saveSnapshots(
    snapshots: FinanceMonthlySnapshot[]
  ): Promise<FinanceMonthlySnapshot[]> {
    if (snapshots.length === 0) {
      return [];
    }

    const dataset = await readDatasetFromFile(filePath);
    const normalizedSnapshots = dedupeAndSortSnapshots(
      snapshots.map((snapshot, index) => normalizeSnapshot(snapshot, index))
    );

    const nextDataset: FinanceSnapshotsDataset = {
      version: DATASET_VERSION,
      snapshots: upsertSnapshots(dataset.snapshots, normalizedSnapshots),
    };

    await writeDatasetToFile(filePath, nextDataset);

    return normalizedSnapshots;
  }

  async function createSnapshotFromPrevious(
    month: string,
    options: { sourceMonth?: string | null; overwrite?: boolean } = {}
  ): Promise<CreateFinanceSnapshotResult> {
    const targetMonth = ensureMonth(month);
    const dataset = await readDatasetFromFile(filePath);
    const existing = dataset.snapshots.find((snapshot) => snapshot.month === targetMonth);

    if (existing && !options.overwrite) {
      return {
        snapshot: existing,
        created: false,
        sourceMonth: existing.month,
      };
    }

    const explicitSourceMonth = options.sourceMonth
      ? ensureMonth(options.sourceMonth)
      : null;
    const explicitSource = explicitSourceMonth
      ? dataset.snapshots.find((snapshot) => snapshot.month === explicitSourceMonth) ?? null
      : null;
    const previousCandidates = dataset.snapshots.filter(
      (snapshot) => snapshot.month < targetMonth
    );
    const source = explicitSource ?? previousCandidates.at(-1) ?? null;
    const nextSnapshot = source
      ? applyAssetAutoAccumulation(source, cloneFinanceSnapshot(source, targetMonth))
      : createEmptyFinanceSnapshot(targetMonth);
    const savedSnapshot = await saveSnapshot(nextSnapshot);

    return {
      snapshot: savedSnapshot,
      created: true,
      sourceMonth: source?.month ?? null,
    };
  }

  return {
    filePath,
    getSnapshots,
    listMonths,
    getLatestMonth,
    getSnapshot,
    saveSnapshot,
    saveSnapshots,
    createSnapshotFromPrevious,
  };
}

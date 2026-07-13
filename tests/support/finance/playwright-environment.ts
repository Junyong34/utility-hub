import { randomUUID } from 'node:crypto';
import { tmpdir } from 'node:os';
import path from 'node:path';

export const FINANCE_E2E_TEMP_ROOT_ENV = 'FINANCE_E2E_TEMP_ROOT';
export const FINANCE_E2E_RUN_ID_ENV = 'FINANCE_E2E_RUN_ID';
export const FINANCE_SNAPSHOTS_PATH_ENV = 'FINANCE_SNAPSHOTS_PATH';

const TEMP_ROOT_PREFIX = 'utility-hub-finance-e2e-';
const SNAPSHOTS_RELATIVE_PATH = path.join(
  'data',
  'private',
  'finance-snapshots.json'
);

function isPathInside(parentPath: string, candidatePath: string): boolean {
  const relativePath = path.relative(parentPath, candidatePath);

  return (
    relativePath.length > 0 &&
    !relativePath.startsWith(`..${path.sep}`) &&
    relativePath !== '..' &&
    !path.isAbsolute(relativePath)
  );
}

function isOwnedTempRoot(tempRoot: string, runId: string): boolean {
  const resolvedTempRoot = path.resolve(tempRoot);

  return (
    runId.length > 0 &&
    path.basename(resolvedTempRoot) === `${TEMP_ROOT_PREFIX}${runId}` &&
    isPathInside(path.resolve(tmpdir()), resolvedTempRoot)
  );
}

function copyProcessEnvironment(): Record<string, string> {
  return Object.fromEntries(
    Object.entries(process.env).flatMap(([name, value]) =>
      value === undefined ? [] : [[name, value]]
    )
  );
}

function getReusableEnvironment(): FinanceE2eEnvironment | null {
  const tempRoot = process.env[FINANCE_E2E_TEMP_ROOT_ENV]?.trim();
  const runId = process.env[FINANCE_E2E_RUN_ID_ENV]?.trim();

  if (!tempRoot || !runId || !isOwnedTempRoot(tempRoot, runId)) {
    return null;
  }

  const snapshotsPath = path.join(tempRoot, SNAPSHOTS_RELATIVE_PATH);

  return {
    tempRoot,
    snapshotsPath,
    env: {
      ...copyProcessEnvironment(),
      [FINANCE_E2E_TEMP_ROOT_ENV]: tempRoot,
      [FINANCE_E2E_RUN_ID_ENV]: runId,
      [FINANCE_SNAPSHOTS_PATH_ENV]: snapshotsPath,
    },
  };
}

export interface FinanceE2eEnvironment {
  tempRoot: string;
  snapshotsPath: string;
  env: Record<string, string>;
}

export function createFinanceE2eEnvironment(): FinanceE2eEnvironment {
  const reusableEnvironment = getReusableEnvironment();

  if (reusableEnvironment) {
    process.env[FINANCE_SNAPSHOTS_PATH_ENV] = reusableEnvironment.snapshotsPath;
    return reusableEnvironment;
  }

  const runId = randomUUID();
  const tempRoot = path.join(tmpdir(), `${TEMP_ROOT_PREFIX}${runId}`);
  const snapshotsPath = path.join(tempRoot, SNAPSHOTS_RELATIVE_PATH);
  const env = {
    ...copyProcessEnvironment(),
    [FINANCE_E2E_TEMP_ROOT_ENV]: tempRoot,
    [FINANCE_E2E_RUN_ID_ENV]: runId,
    [FINANCE_SNAPSHOTS_PATH_ENV]: snapshotsPath,
  };

  Object.assign(process.env, env);

  return { tempRoot, snapshotsPath, env };
}

export function getFinanceE2eTempRoot(): string {
  const tempRoot = process.env[FINANCE_E2E_TEMP_ROOT_ENV]?.trim();
  const runId = process.env[FINANCE_E2E_RUN_ID_ENV]?.trim();

  if (!tempRoot || !runId || !isOwnedTempRoot(tempRoot, runId)) {
    throw new Error(
      'Finance E2E temp root is missing or unsafe. Run this test through the finance Playwright configuration.'
    );
  }

  return path.resolve(tempRoot);
}

export function getFinanceE2eSnapshotsPath(): string {
  const tempRoot = getFinanceE2eTempRoot();
  const configuredPath = process.env[FINANCE_SNAPSHOTS_PATH_ENV]?.trim();
  const expectedPath = path.join(tempRoot, SNAPSHOTS_RELATIVE_PATH);

  if (!configuredPath || path.resolve(configuredPath) !== expectedPath) {
    throw new Error(
      'Finance E2E snapshots path is missing or unsafe. The production data file will not be used.'
    );
  }

  return expectedPath;
}

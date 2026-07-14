import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import {
  getFinanceE2eSnapshotsPath,
  getFinanceE2eTempRoot,
} from './playwright-environment.ts';

interface FileState {
  exists: boolean;
  sha256: string | null;
}

const PRODUCTION_SNAPSHOTS_PATH = path.resolve(
  process.cwd(),
  'data/private/finance-snapshots.json'
);
const GUARD_FILE_NAME = '.production-finance-data-guard.json';

async function readFileState(filePath: string): Promise<FileState> {
  try {
    const contents = await readFile(filePath);

    return {
      exists: true,
      sha256: createHash('sha256').update(contents).digest('hex'),
    };
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      return { exists: false, sha256: null };
    }

    throw error;
  }
}

function guardFilePath(): string {
  return path.join(getFinanceE2eTempRoot(), GUARD_FILE_NAME);
}

export async function initializeProductionDataGuard(): Promise<void> {
  const tempRoot = getFinanceE2eTempRoot();
  const snapshotsPath = getFinanceE2eSnapshotsPath();
  const productionState = await readFileState(PRODUCTION_SNAPSHOTS_PATH);

  await mkdir(tempRoot, { recursive: true });
  await rm(snapshotsPath, { force: true });
  await writeFile(
    guardFilePath(),
    `${JSON.stringify(productionState, null, 2)}\n`,
    'utf8'
  );
}

export async function verifyProductionDataGuard(): Promise<void> {
  const tempRoot = getFinanceE2eTempRoot();
  let verificationError: Error | null = null;

  try {
    const expectedState = JSON.parse(
      await readFile(guardFilePath(), 'utf8')
    ) as FileState;
    const currentState = await readFileState(PRODUCTION_SNAPSHOTS_PATH);

    if (
      expectedState.exists !== currentState.exists ||
      expectedState.sha256 !== currentState.sha256
    ) {
      verificationError = new Error(
        'Finance E2E safety guard detected a change to data/private/finance-snapshots.json.'
      );
    }
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }

  if (verificationError) {
    throw verificationError;
  }
}

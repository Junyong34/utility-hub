import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { getFinanceE2eSnapshotsPath } from './playwright-environment.ts';

export async function resetFinanceE2eData(): Promise<void> {
  await rm(getFinanceE2eSnapshotsPath(), { force: true });
}

export async function writeFinanceE2eDataset(dataset: unknown): Promise<void> {
  const snapshotsPath = getFinanceE2eSnapshotsPath();

  await mkdir(path.dirname(snapshotsPath), { recursive: true });
  await writeFile(
    snapshotsPath,
    `${JSON.stringify(dataset, null, 2)}\n`,
    'utf8'
  );
}

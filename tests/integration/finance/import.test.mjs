import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { importFinanceSnapshotsFromRawJson } from '../../../lib/finance/import.ts';
import { createFinanceRepository } from '../../../lib/finance/server.ts';

async function createRepoFixture(initialPayload) {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'finance-import-'));
  const filePath = path.join(tempDir, 'data/private/finance-snapshots.json');

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(
    filePath,
    `${JSON.stringify(initialPayload, null, 2)}\n`,
    'utf8'
  );

  return {
    tempDir,
    filePath,
    repository: createFinanceRepository({ filePath }),
  };
}

test('import_helper_persists_every_month_from_dataset_json', async t => {
  const { tempDir, repository, filePath } = await createRepoFixture({
    version: 1,
    snapshots: [],
  });
  t.after(() => rm(tempDir, { recursive: true, force: true }));

  const result = await importFinanceSnapshotsFromRawJson(
    JSON.stringify({
      version: 1,
      snapshots: [
        {
          month: '2026-04',
          updatedAt: '2026-04-30T12:00:00.000Z',
          incomes: { husbandSalary: 4200000, wifeSalary: 4100000, memo: '' },
          assets: [],
          debts: [],
          investments: [],
          expenses: [],
        },
        {
          month: '2026-06',
          updatedAt: '2026-06-30T12:00:00.000Z',
          incomes: { husbandSalary: 5200000, wifeSalary: 4300000, memo: '' },
          assets: [
            {
              id: 'asset-1',
              owner: 'joint',
              category: 'deposit',
              name: '생활비 통장',
              amount: 18000000,
              memo: '',
            },
          ],
          debts: [],
          investments: [],
          expenses: [],
        },
      ],
    }),
    repository
  );

  const persisted = JSON.parse(await readFile(filePath, 'utf8'));

  assert.deepEqual(
    result.map(snapshot => snapshot.month),
    ['2026-04', '2026-06']
  );
  assert.deepEqual(
    persisted.snapshots.map(snapshot => snapshot.month),
    ['2026-04', '2026-06']
  );
  assert.equal(persisted.snapshots[1].assets[0].amount, 18000000);
});

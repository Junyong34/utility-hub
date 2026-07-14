import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  resetFinanceE2eData,
  writeFinanceE2eDataset,
} from '../../support/finance/e2e-data.ts';
import {
  FINANCE_E2E_RUN_ID_ENV,
  FINANCE_E2E_TEMP_ROOT_ENV,
  FINANCE_SNAPSHOTS_PATH_ENV,
} from '../../support/finance/playwright-environment.ts';

const PRODUCTION_DATA_PATH = path.resolve(
  process.cwd(),
  'data/private/finance-snapshots.json'
);
const ENVIRONMENT_NAMES = [
  FINANCE_E2E_RUN_ID_ENV,
  FINANCE_E2E_TEMP_ROOT_ENV,
  FINANCE_SNAPSHOTS_PATH_ENV,
];

async function readOptionalFile(filePath) {
  try {
    return await readFile(filePath);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

function configureOwnedTempPath(t) {
  const previousEnvironment = Object.fromEntries(
    ENVIRONMENT_NAMES.map(name => [name, process.env[name]])
  );
  const runId = randomUUID();
  const tempRoot = path.join(tmpdir(), `utility-hub-finance-e2e-${runId}`);
  const snapshotsPath = path.join(
    tempRoot,
    'data/private/finance-snapshots.json'
  );

  process.env[FINANCE_E2E_RUN_ID_ENV] = runId;
  process.env[FINANCE_E2E_TEMP_ROOT_ENV] = tempRoot;
  process.env[FINANCE_SNAPSHOTS_PATH_ENV] = snapshotsPath;

  t.after(async () => {
    await rm(tempRoot, { recursive: true, force: true });

    for (const [name, value] of Object.entries(previousEnvironment)) {
      if (value === undefined) {
        delete process.env[name];
      } else {
        process.env[name] = value;
      }
    }
  });

  return { snapshotsPath };
}

test('finance_e2e_fixture_preserves_production_data_when_writing_temp_dataset', async t => {
  const productionDataBefore = await readOptionalFile(PRODUCTION_DATA_PATH);
  const { snapshotsPath } = configureOwnedTempPath(t);
  const dataset = { version: 1, snapshots: [] };

  await writeFinanceE2eDataset(dataset);

  assert.deepEqual(JSON.parse(await readFile(snapshotsPath, 'utf8')), dataset);
  assert.deepEqual(
    await readOptionalFile(PRODUCTION_DATA_PATH),
    productionDataBefore
  );

  await resetFinanceE2eData();
  assert.equal(await readOptionalFile(snapshotsPath), null);
});

test('finance_e2e_fixture_rejects_production_path_when_override_is_unsafe', async t => {
  const productionDataBefore = await readOptionalFile(PRODUCTION_DATA_PATH);
  configureOwnedTempPath(t);
  process.env[FINANCE_SNAPSHOTS_PATH_ENV] = PRODUCTION_DATA_PATH;

  await assert.rejects(
    writeFinanceE2eDataset({ version: 1, snapshots: [] }),
    /missing or unsafe/
  );
  assert.deepEqual(
    await readOptionalFile(PRODUCTION_DATA_PATH),
    productionDataBefore
  );
});

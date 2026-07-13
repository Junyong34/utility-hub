import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import {
  NETLIFY_FINANCE_SNAPSHOTS_PATH,
  isBundleAnalysisEnabled,
  isDevelopmentRuntime,
  isNetlifyRuntime,
  resolveFinanceSnapshotsPath,
} from './server.ts';

test('runtime flags preserve development, bundle-analysis, and Netlify detection', () => {
  assert.deepEqual(
    {
      development: isDevelopmentRuntime({ NODE_ENV: 'development' }),
      production: isDevelopmentRuntime({ NODE_ENV: 'production' }),
      analyze: isBundleAnalysisEnabled({ ANALYZE: 'true' }),
      analyzeDisabled: isBundleAnalysisEnabled({ ANALYZE: '1' }),
      netlifyTrue: isNetlifyRuntime({ NETLIFY: 'true' }),
      netlifyOne: isNetlifyRuntime({ NETLIFY: '1' }),
      aws: isNetlifyRuntime({ AWS_LAMBDA_FUNCTION_NAME: 'function-name' }),
    },
    {
      development: true,
      production: false,
      analyze: true,
      analyzeDisabled: false,
      netlifyTrue: true,
      netlifyOne: true,
      aws: true,
    }
  );
});

test('finance snapshot path preserves local and Netlify defaults', () => {
  const cwd = '/workspace/utility-hub';

  assert.equal(
    resolveFinanceSnapshotsPath({}, cwd),
    path.join(cwd, 'data/private/finance-snapshots.json')
  );
  assert.equal(
    resolveFinanceSnapshotsPath({ NETLIFY: 'true' }, cwd),
    NETLIFY_FINANCE_SNAPSHOTS_PATH
  );
});

test('absolute finance snapshot overrides take precedence over runtime defaults', () => {
  assert.equal(
    resolveFinanceSnapshotsPath(
      {
        FINANCE_SNAPSHOTS_PATH: ' /tmp/utility-hub-finance/snapshots.json ',
        NETLIFY: 'true',
      },
      '/workspace/utility-hub'
    ),
    '/tmp/utility-hub-finance/snapshots.json'
  );
});

test('relative finance snapshot overrides fail without echoing the configured value', () => {
  const configuredValue = 'relative/private-snapshots.json';

  assert.throws(
    () =>
      resolveFinanceSnapshotsPath(
        { FINANCE_SNAPSHOTS_PATH: configuredValue },
        '/workspace/utility-hub'
      ),
    error => {
      assert.match(error.message, /FINANCE_SNAPSHOTS_PATH/);
      assert.match(error.message, /absolute/);
      assert.doesNotMatch(error.message, new RegExp(configuredValue));
      return true;
    }
  );
});

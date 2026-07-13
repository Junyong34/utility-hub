import assert from 'node:assert/strict';
import test, { mock } from 'node:test';

const ENVIRONMENT_KEYS = [
  'GA4_PROPERTY_ID',
  'GA4_CLIENT_EMAIL',
  'GA4_PRIVATE_KEY',
  'GA4_BASELINE_DATE',
  'GA4_TIMEZONE',
];

function replaceGa4Environment(values) {
  const original = Object.fromEntries(
    ENVIRONMENT_KEYS.map(key => [key, process.env[key]])
  );

  for (const key of ENVIRONMENT_KEYS) {
    const value = values[key];

    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  return () => {
    for (const key of ENVIRONMENT_KEYS) {
      const value = original[key];

      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  };
}

test('analytics stays unavailable safely and falls back to stale data after a GA4 failure', async t => {
  let reportMode = 'success';
  let now = Date.parse('2026-07-13T00:00:00.000Z');

  mock.module('googleapis', {
    namedExports: {
      google: {
        auth: {
          JWT: class FakeJwt {},
        },
        analyticsdata: () => ({
          properties: {
            runReport: async ({ requestBody }) => {
              if (reportMode === 'failure') {
                throw new Error('boundary unavailable');
              }

              const startDate = requestBody.dateRanges[0].startDate;
              const value = startDate === 'today' ? '7' : '42';

              return {
                data: {
                  rows: [{ metricValues: [{ value }] }],
                },
              };
            },
          },
        }),
      },
    },
  });
  mock.method(Date, 'now', () => now);

  const restoreEnvironment = replaceGa4Environment({});
  t.after(() => {
    restoreEnvironment();
    mock.restoreAll();
  });

  const { CACHE_TTL_SECONDS, getVisitorStats } = await import('./ga4.ts');

  const missingResult = await getVisitorStats();
  assert.equal(missingResult.ok, false);
  assert.match(missingResult.error.message, /server-only/i);

  replaceGa4Environment({
    GA4_PROPERTY_ID: 'property-secret-value',
    GA4_PRIVATE_KEY: 'private-secret-value',
  });
  const partialResult = await getVisitorStats();
  assert.equal(partialResult.ok, false);
  assert.match(partialResult.error.message, /GA4_CLIENT_EMAIL/);
  assert.doesNotMatch(partialResult.error.message, /property-secret-value/);
  assert.doesNotMatch(partialResult.error.message, /private-secret-value/);

  replaceGa4Environment({
    GA4_PROPERTY_ID: '123456',
    GA4_CLIENT_EMAIL: 'service@example.com',
    GA4_PRIVATE_KEY: 'private-key',
    GA4_BASELINE_DATE: '2026-13-40',
  });
  const invalidDateResult = await getVisitorStats();
  assert.equal(invalidDateResult.ok, false);
  assert.match(invalidDateResult.error.message, /GA4_BASELINE_DATE/);
  assert.doesNotMatch(invalidDateResult.error.message, /2026-13-40/);

  replaceGa4Environment({
    GA4_PROPERTY_ID: '123456',
    GA4_CLIENT_EMAIL: 'service@example.com',
    GA4_PRIVATE_KEY: 'first\\nsecond',
    GA4_BASELINE_DATE: '2024-01-01',
    GA4_TIMEZONE: 'Asia/Seoul',
  });
  const freshResult = await getVisitorStats();
  assert.deepEqual(freshResult, {
    ok: true,
    data: {
      todayVisitors: 7,
      totalVisitors: 42,
      metric: 'activeUsers',
      timeZone: 'Asia/Seoul',
      lastUpdatedAt: freshResult.data.lastUpdatedAt,
    },
    stale: false,
  });

  now += CACHE_TTL_SECONDS * 1000 + 1;
  reportMode = 'failure';

  const staleResult = await getVisitorStats();
  assert.deepEqual(staleResult, {
    ok: true,
    data: freshResult.data,
    stale: true,
  });
});

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  DEFAULT_GA4_BASELINE_DATE,
  DEFAULT_GA4_TIME_ZONE,
  readGa4ServerConfig,
} from './ga4.server.ts';

test('GA4 capability remains unavailable without leaking values when credentials are absent', () => {
  const result = readGa4ServerConfig({});

  assert.equal(result.ok, false);
  assert.match(result.error.message, /server-only/i);
  assert.match(result.error.message, /GA4_PROPERTY_ID/);
  assert.match(result.error.message, /GA4_CLIENT_EMAIL/);
  assert.match(result.error.message, /GA4_PRIVATE_KEY/);
});

test('GA4 validation identifies only missing field names for a partial configuration', () => {
  const propertyId = 'property-secret-value';
  const privateKey = 'private-secret-value';
  const result = readGa4ServerConfig({
    GA4_PROPERTY_ID: propertyId,
    GA4_PRIVATE_KEY: privateKey,
  });

  assert.equal(result.ok, false);
  assert.match(result.error.message, /GA4_CLIENT_EMAIL/);
  assert.doesNotMatch(result.error.message, new RegExp(propertyId));
  assert.doesNotMatch(result.error.message, new RegExp(privateKey));
});

test('GA4 credentials are trimmed and escaped private-key newlines are normalized lazily', () => {
  const result = readGa4ServerConfig({
    GA4_PROPERTY_ID: ' 123456 ',
    GA4_CLIENT_EMAIL: ' service@example.com ',
    GA4_PRIVATE_KEY: ' first\\nsecond ',
  });

  assert.deepEqual(result, {
    ok: true,
    config: {
      propertyId: '123456',
      clientEmail: 'service@example.com',
      privateKey: 'first\nsecond',
      baselineDate: DEFAULT_GA4_BASELINE_DATE,
      timeZone: DEFAULT_GA4_TIME_ZONE,
    },
  });
});

test('invalid GA4 baseline dates fail with a field-only server configuration error', () => {
  for (const invalidValue of ['not-a-date-secret', '2024-13-40']) {
    const result = readGa4ServerConfig({
      GA4_PROPERTY_ID: '123456',
      GA4_CLIENT_EMAIL: 'service@example.com',
      GA4_PRIVATE_KEY: 'private-key',
      GA4_BASELINE_DATE: invalidValue,
    });

    assert.equal(result.ok, false);
    assert.match(result.error.message, /GA4_BASELINE_DATE/);
    assert.match(result.error.message, /server-only/i);
    assert.doesNotMatch(result.error.message, new RegExp(invalidValue));
  }
});

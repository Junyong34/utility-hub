import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { DEFAULT_SITE_URL, readPublicEnv } from './public.ts';

test('public site URL falls back when the environment value is absent or invalid', () => {
  assert.deepEqual(readPublicEnv({}), { siteUrl: DEFAULT_SITE_URL });
  assert.deepEqual(readPublicEnv({ NEXT_PUBLIC_SITE_URL: 'not-a-url' }), {
    siteUrl: DEFAULT_SITE_URL,
  });
});

test('public site URL is trimmed and normalized without a trailing slash', () => {
  assert.deepEqual(
    readPublicEnv({ NEXT_PUBLIC_SITE_URL: ' https://preview.zento.kr/ ' }),
    { siteUrl: 'https://preview.zento.kr' }
  );
});

test('public config source does not expose GA4 credentials or Node builtins', async () => {
  const source = await readFile(
    new URL('./public.ts', import.meta.url),
    'utf8'
  );

  assert.doesNotMatch(source, /GA4_(?:PROPERTY_ID|CLIENT_EMAIL|PRIVATE_KEY)/);
  assert.doesNotMatch(source, /from ['"]node:/);
});

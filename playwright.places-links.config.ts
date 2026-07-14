import { defineConfig } from '@playwright/test';

if (process.env.RUN_LIVE_TESTS !== '1') {
  throw new Error(
    'External place-link tests are disabled by default. Set RUN_LIVE_TESTS=1 to run them.'
  );
}

export default defineConfig({
  testDir: './tests/live/places',
  testMatch: 'links.spec.ts',
  timeout: 45_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  use: {
    browserName: 'chromium',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
});

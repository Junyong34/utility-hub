import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'places-links.spec.ts',
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

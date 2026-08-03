import { defineConfig } from '@playwright/test';
import path from 'node:path';

import { createFinanceE2eEnvironment } from './tests/support/finance/playwright-environment.ts';

const financeEnvironment = createFinanceE2eEnvironment();
const financeSupportPath = path.resolve(process.cwd(), 'tests/support/finance');

const e2ePort = process.env.E2E_PORT ?? '3000';
const e2eBaseUrl = `http://127.0.0.1:${e2ePort}`;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  globalSetup: path.join(financeSupportPath, 'global-setup.ts'),
  globalTeardown: path.join(financeSupportPath, 'global-teardown.ts'),
  use: {
    baseURL: e2eBaseUrl,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chrome-public',
      testIgnore: '**/finance/**',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
    {
      name: 'chrome-finance',
      testMatch: '**/finance/**/*.spec.ts',
      workers: 1,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
  ],
  webServer: {
    command: `/bin/zsh -lc 'source ~/.nvm/nvm.sh && nvm use 22 >/dev/null && pnpm dev --hostname 127.0.0.1 --port ${e2ePort}'`,
    env: financeEnvironment.env,
    url: e2eBaseUrl,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});

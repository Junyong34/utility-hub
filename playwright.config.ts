import { defineConfig } from '@playwright/test';
import path from 'node:path';

import { createFinanceE2eEnvironment } from './tests/support/finance/playwright-environment.ts';

const financeEnvironment = createFinanceE2eEnvironment();
const financeSupportPath = path.resolve(process.cwd(), 'tests/support/finance');

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  globalSetup: path.join(financeSupportPath, 'global-setup.ts'),
  globalTeardown: path.join(financeSupportPath, 'global-teardown.ts'),
  use: {
    baseURL: 'http://127.0.0.1:3000',
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
    command:
      "/bin/zsh -lc 'source ~/.nvm/nvm.sh && nvm use 22 >/dev/null && pnpm dev --hostname 127.0.0.1 --port 3000'",
    env: financeEnvironment.env,
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});

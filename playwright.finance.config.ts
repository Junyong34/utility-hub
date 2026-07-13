import { defineConfig } from '@playwright/test';
import path from 'node:path';

import { createFinanceE2eEnvironment } from './tests/support/finance/playwright-environment.ts';

const financeEnvironment = createFinanceE2eEnvironment();
const financeSupportPath = path.resolve(process.cwd(), 'tests/support/finance');

export default defineConfig({
  testDir: './tests/e2e/finance',
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  globalSetup: path.join(financeSupportPath, 'global-setup.ts'),
  globalTeardown: path.join(financeSupportPath, 'global-teardown.ts'),
  use: {
    baseURL: 'http://127.0.0.1:3101',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chrome-finance',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
  ],
  webServer: {
    command:
      "/bin/zsh -lc 'source ~/.nvm/nvm.sh && nvm use 22 >/dev/null && pnpm dev --hostname 127.0.0.1 --port 3101'",
    env: financeEnvironment.env,
    url: 'http://127.0.0.1:3101',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});

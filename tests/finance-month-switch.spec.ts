import { expect, test } from '@playwright/test';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const FINANCE_DATA_PATH = path.join(
  process.cwd(),
  'data/private/finance-snapshots.json'
);
let originalFinanceData: string | null = null;

async function readExistingFinanceData(): Promise<string | null> {
  try {
    return await readFile(FINANCE_DATA_PATH, 'utf8');
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      return null;
    }

    throw error;
  }
}

async function seedMonthSwitchData() {
  await mkdir(path.dirname(FINANCE_DATA_PATH), { recursive: true });
  await writeFile(
    FINANCE_DATA_PATH,
    `${JSON.stringify(
      {
        version: 1,
        snapshots: [
          {
            month: '2026-11',
            updatedAt: '2026-11-30T12:00:00.000Z',
            incomes: { husbandSalary: 0, wifeSalary: 0, memo: '' },
            assets: [],
            debts: [],
            investments: [],
            expenses: [],
          },
          {
            month: '2026-12',
            updatedAt: '2026-12-31T12:00:00.000Z',
            incomes: { husbandSalary: 0, wifeSalary: 0, memo: '' },
            assets: [
              {
                id: 'asset-saving',
                owner: 'joint',
                category: 'saving',
                name: '12월 적금',
                amount: 30000000,
                memo: '',
              },
            ],
            debts: [],
            investments: [],
            expenses: [],
          },
        ],
      },
      null,
      2
    )}\n`,
    'utf8'
  );
}

test.describe('/finance/input month switching', () => {
  test.beforeAll(async () => {
    originalFinanceData = await readExistingFinanceData();
  });

  test.beforeEach(async () => {
    await rm(FINANCE_DATA_PATH, { force: true });
    await seedMonthSwitchData();
  });

  test.afterAll(async () => {
    if (originalFinanceData === null) {
      await rm(FINANCE_DATA_PATH, { force: true });
      return;
    }

    await mkdir(path.dirname(FINANCE_DATA_PATH), { recursive: true });
    await writeFile(FINANCE_DATA_PATH, originalFinanceData, 'utf8');
  });

  test('기준월을 바꾸면 입력 draft도 해당 월 스냅샷으로 바뀐다', async ({ page }) => {
    await page.goto('/finance/input?month=2026-12', { waitUntil: 'networkidle' });

    await page.getByRole('tab', { name: '자산' }).click();
    await expect(page.getByLabel('자산명')).toHaveValue('12월 적금');

    await page.getByRole('button', { name: '11월' }).click();
    await expect(page).toHaveURL(/\/finance\/input\?month=2026-11/);
    await page.getByRole('tab', { name: '자산' }).click();
    await expect(page.getByText('등록된 자산 항목이 없습니다.')).toBeVisible();
    await expect(page.getByLabel('자산명')).toHaveCount(0);
  });
});

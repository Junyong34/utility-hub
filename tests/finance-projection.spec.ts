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

async function seedProjectionData() {
  await mkdir(path.dirname(FINANCE_DATA_PATH), { recursive: true });
  await writeFile(
    FINANCE_DATA_PATH,
    `${JSON.stringify(
      {
        version: 1,
        snapshots: [
          {
            month: '2026-05',
            updatedAt: '2026-05-31T12:00:00.000Z',
            incomes: { husbandSalary: 0, wifeSalary: 0, memo: '' },
            assets: [
              {
                id: 'asset-1',
                owner: 'joint',
                category: 'deposit',
                name: '예금',
                amount: 15000000,
                memo: '',
              },
            ],
            debts: [],
            investments: [
              {
                id: 'investment-1',
                owner: 'wife',
                category: 'etf',
                name: 'ETF',
                principal: 10000000,
                valuation: 10000000,
                memo: '',
              },
            ],
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

test.describe.configure({ mode: 'serial' });

test.describe('/finance/projection', () => {
  test.beforeAll(async () => {
    originalFinanceData = await readExistingFinanceData();
  });

  test.beforeEach(async () => {
    await rm(FINANCE_DATA_PATH, { force: true });
    await seedProjectionData();
  });

  test.afterAll(async () => {
    if (originalFinanceData === null) {
      await rm(FINANCE_DATA_PATH, { force: true });
      return;
    }

    await mkdir(path.dirname(FINANCE_DATA_PATH), { recursive: true });
    await writeFile(FINANCE_DATA_PATH, originalFinanceData, 'utf8');
  });

  test('미래 자산 계산 화면은 복리 입력을 반영해 연도별 경로를 보여준다', async ({
    page,
  }) => {
    await page.goto('/finance/projection?month=2026-05', {
      waitUntil: 'networkidle',
    });

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/
    );
    await expect(page.getByRole('link', { name: '미래 자산' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    await expect(page.getByTestId('finance-projection-chart')).toBeVisible();
    await expect(
      page.getByTestId('finance-projection-chart').locator('svg')
    ).toHaveCount(1);
    await expect(page.getByLabel('연간 자산 증가률')).toHaveValue('10');
    await expect(
      page.getByTestId('finance-growth-rate-field').getByText('%', { exact: true })
    ).toBeVisible();
    await expect(page.getByLabel('목표 연도')).toHaveValue('2031');
    await expect(page.getByRole('button', { name: '조회' })).toBeVisible();

    await expect(page.getByRole('row', { name: /2031\.05/ })).toContainText(
      '40,262,750원'
    );
    await page.getByLabel('연간 자산 증가률').fill('12');
    await page.getByLabel('목표 연도').fill('2029');
    await expect(page.getByRole('row', { name: /2031\.05/ })).toContainText(
      '40,262,750원'
    );
    await page.getByRole('button', { name: '조회' }).click();

    await expect(page.getByRole('row', { name: /2029\.05/ })).toContainText(
      '35,123,200원'
    );
    await expect(page.getByText('+10,123,200원')).toBeVisible();
  });

  test('100년 이상 조회하면 경고창을 띄우고 계산을 막는다', async ({
    page,
  }) => {
    await page.goto('/finance/projection?month=2026-05', {
      waitUntil: 'networkidle',
    });

    await expect(page.getByRole('row', { name: /2031\.05/ })).toContainText(
      '40,262,750원'
    );

    const dialogMessagePromise = page.waitForEvent('dialog').then(
      async (dialog) => {
        expect(dialog.message()).toBe(
          '100년 이상은 계산할 수 없습니다. 목표 연도를 99년 이내로 설정해 주세요.'
        );
        await dialog.accept();
      }
    );

    await page.getByLabel('목표 연도').fill('2126');
    await page.getByRole('button', { name: '조회' }).click();
    await dialogMessagePromise;

    await expect(page.getByRole('row', { name: /2031\.05/ })).toContainText(
      '40,262,750원'
    );
    await expect(page.getByLabel('목표 연도')).toHaveValue('2126');
  });
});

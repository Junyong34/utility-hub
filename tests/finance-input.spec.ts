import { expect, test } from '@playwright/test';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createDefaultExpenseRows } from '../lib/finance/defaults.ts';
import type { FinanceMonthlySnapshot } from '../lib/finance/types.ts';

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

async function seedFinanceData() {
  await mkdir(path.dirname(FINANCE_DATA_PATH), { recursive: true });
  await writeFile(
    FINANCE_DATA_PATH,
    `${JSON.stringify(
      {
        version: 1,
        snapshots: [
          {
            month: '2026-01',
            updatedAt: '2026-01-31T12:00:00.000Z',
            incomes: { husbandSalary: 5000000, wifeSalary: 4000000, memo: '' },
            assets: [
              {
                id: 'asset-1',
                owner: 'joint',
                category: 'deposit',
                name: '생활비 통장',
                amount: 12000000,
                memo: '',
              },
            ],
            debts: [],
            investments: [],
            expenses: [],
          },
          {
            month: '2026-02',
            updatedAt: '2026-02-28T12:00:00.000Z',
            incomes: { husbandSalary: 5200000, wifeSalary: 4100000, memo: '' },
            assets: [
              {
                id: 'asset-2',
                owner: 'joint',
                category: 'deposit',
                name: '생활비 통장',
                amount: 18000000,
                memo: '',
              },
            ],
            debts: [
              {
                id: 'debt-1',
                owner: 'joint',
                category: 'mortgage',
                name: '주담대',
                balance: 5000000,
                interestRate: null,
                monthlyPayment: null,
                monthlyInterest: null,
                memo: '',
              },
            ],
            investments: [
              {
                id: 'investment-1',
                owner: 'wife',
                category: 'etf',
                name: 'ETF 계좌',
                principal: 8000000,
                valuation: 10000000,
                memo: '',
              },
            ],
            expenses: [
              {
                id: 'fixed-housing',
                owner: 'joint',
                type: 'fixed',
                category: 'housing',
                name: '주거비',
                amount: 800000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'fixed-child_education',
                owner: 'joint',
                type: 'fixed',
                category: 'child_education',
                name: '자녀 교육비',
                amount: 350000,
                childRelated: true,
                memo: '',
              },
              {
                id: 'variable-food',
                owner: 'joint',
                type: 'variable',
                category: 'food',
                name: '식비',
                amount: 600000,
                childRelated: false,
                memo: '',
              },
            ],
          },
        ],
      },
      null,
      2
    )}\n`,
    'utf8'
  );
}

function createImportSnapshot(
  month: string,
  overrides: Partial<FinanceMonthlySnapshot> = {}
) {
  return {
    month,
    updatedAt: `${month}-28T12:00:00.000Z`,
    incomes: {
      husbandSalary: 5000000,
      wifeSalary: 4000000,
      memo: '',
      ...(overrides.incomes ?? {}),
    },
    assets: overrides.assets ?? [
      {
        id: `${month}-asset-1`,
        owner: 'joint',
        category: 'deposit',
        name: '생활비 통장',
        amount: 20000000,
        memo: '',
      },
    ],
    debts: overrides.debts ?? [],
    investments: overrides.investments ?? [],
    expenses: overrides.expenses ?? createDefaultExpenseRows(),
  };
}

test.describe.configure({ mode: 'serial' });

test.describe('/finance', () => {
  test.beforeAll(async () => {
    originalFinanceData = await readExistingFinanceData();
  });

  test.beforeEach(async () => {
    await rm(FINANCE_DATA_PATH, { force: true });
  });

  test.afterAll(async () => {
    if (originalFinanceData === null) {
      await rm(FINANCE_DATA_PATH, { force: true });
      return;
    }

    await mkdir(path.dirname(FINANCE_DATA_PATH), { recursive: true });
    await writeFile(FINANCE_DATA_PATH, originalFinanceData, 'utf8');
  });

  test('첫 월 생성 후 수입과 자산을 저장하면 새로고침 후 유지된다', async ({
    page,
  }) => {
    await page.goto('/finance/input', { waitUntil: 'networkidle' });

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/
    );
    await expect(page.getByText('월 일괄 덮어쓰기')).toHaveCount(0);
    await page.getByLabel('새 월 생성').fill('2026-01');
    await page.getByRole('button', { name: '월 스냅샷 생성/복사' }).click();

    await expect(page).toHaveURL(/\/finance\/input\?month=2026-01/);
    await expect(page.getByText('2026.01 스냅샷')).toBeVisible();

    await page.getByLabel('남편 월급').fill('5200000');
    await page.getByLabel('아내 월급').fill('4100000');
    await page.getByRole('tab', { name: '자산' }).click();
    await page.getByRole('button', { name: '자산 추가' }).click();
    await page.getByLabel('자산명').fill('생활비 통장');
    await page.getByLabel('금액').fill('18000000');
    await page.getByRole('button', { name: '스냅샷 저장' }).click();

    await expect(page).toHaveURL(/\/finance\/input\?month=2026-01&saved=1/);
    await page.reload({ waitUntil: 'networkidle' });

    await expect(page.getByLabel('남편 월급')).toHaveValue('5,200,000');
    await expect(page.getByLabel('아내 월급')).toHaveValue('4,100,000');
    await page.getByRole('tab', { name: '자산' }).click();
    await expect(page.getByLabel('자산명')).toHaveValue('생활비 통장');
    await expect(page.getByLabel('금액')).toHaveValue('18,000,000');
  });

  test('대시보드와 상세 페이지는 기준 월을 유지하고 noindex를 가진다', async ({
    page,
  }) => {
    await seedFinanceData();
    await page.goto('/finance?month=2026-02&compare=year', {
      waitUntil: 'networkidle',
    });

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/
    );
    await expect(page.getByText('투자 포함 총자산')).toBeVisible();
    await expect(page.getByText('28,000,000원')).toBeVisible();
    await expect(page.getByText('비교 기준 데이터 없음').first()).toBeVisible();
    await expect(page.getByRole('link', { name: '전체 통계' })).toBeVisible();

    await page.getByRole('link', { name: '자산', exact: true }).click();
    await expect(page).toHaveURL(/\/finance\/assets\?month=2026-02/);
    await expect(page.getByText('생활비 통장: 18,000,000원')).toBeVisible();

    await page.getByRole('link', { name: '투자', exact: true }).click();
    await expect(page).toHaveURL(/\/finance\/investments\?month=2026-02/);
    await expect(page.getByText('ETF 계좌: 10,000,000원')).toBeVisible();
  });

  test('JSON 문자열을 붙여넣어 가져오면 해당 월 스냅샷이 저장되고 새로고침 후 유지된다', async ({
    page,
  }) => {
    await seedFinanceData();
    await page.goto('/finance/input?month=2026-02', { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: '가져오기' }).first().click();
    const snapshotPayload = JSON.stringify(
      createImportSnapshot('2026-03', {
        incomes: {
          husbandSalary: 6100000,
          wifeSalary: 4200000,
          memo: 'imported',
        },
        assets: [
          {
            id: 'asset-import-1',
            owner: 'joint',
            category: 'deposit',
            name: '새 생활비 통장',
            amount: 25000000,
            memo: '',
          },
        ],
      }),
      null,
      2
    );

    const dialog = page.getByRole('dialog');
    await dialog.getByLabel('JSON 문자열').fill(snapshotPayload);
    await expect(dialog.getByText('2026.03', { exact: true })).toBeVisible();
    await dialog.getByRole('button', { name: '가져오기' }).click();

    await expect(page).toHaveURL(/\/finance\/input\?month=2026-03&saved=1/);
    await expect(page.getByLabel('남편 월급')).toHaveValue('6,100,000');
    await expect(page.getByLabel('아내 월급')).toHaveValue('4,200,000');
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByLabel('남편 월급')).toHaveValue('6,100,000');
    await expect(page.getByLabel('아내 월급')).toHaveValue('4,200,000');
    await page.getByRole('tab', { name: '자산' }).click();
    await expect(page.getByLabel('자산명')).toHaveValue('새 생활비 통장');
    await expect(page.getByLabel('금액')).toHaveValue('25,000,000');
  });

  test('JSON 파일을 업로드해도 모든 월 스냅샷을 저장한다', async ({ page }) => {
    await seedFinanceData();
    await page.goto('/finance/input?month=2026-02', { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: '가져오기' }).first().click();
    const datasetPayload = JSON.stringify(
      {
        version: 1,
        snapshots: [
          createImportSnapshot('2026-04', {
            incomes: {
              husbandSalary: 5300000,
              wifeSalary: 4300000,
            },
            assets: [
              {
                id: 'asset-2026-04-1',
                owner: 'joint',
                category: 'deposit',
                name: '4월 통장',
                amount: 21000000,
                memo: '',
              },
            ],
          }),
          createImportSnapshot('2026-06', {
            incomes: {
              husbandSalary: 6300000,
              wifeSalary: 4400000,
            },
            assets: [
              {
                id: 'asset-2026-06-1',
                owner: 'joint',
                category: 'deposit',
                name: '6월 통장',
                amount: 28000000,
                memo: '',
              },
            ],
          }),
          createImportSnapshot('2026-05', {
            incomes: {
              husbandSalary: 5800000,
              wifeSalary: 4350000,
            },
            assets: [
              {
                id: 'asset-2026-05-1',
                owner: 'joint',
                category: 'deposit',
                name: '5월 통장',
                amount: 24000000,
                memo: '',
              },
            ],
          }),
        ],
      },
      null,
      2
    );

    await page
      .getByLabel('JSON 파일')
      .setInputFiles({
        name: 'finance-import.json',
        mimeType: 'application/json',
        buffer: Buffer.from(datasetPayload, 'utf8'),
      });

    const dialog = page.getByRole('dialog');
    await expect(dialog.getByText('선택된 파일: finance-import.json')).toBeVisible();
    await expect(dialog.getByText('2026.06', { exact: true })).toBeVisible();
    await expect(dialog.getByText('총 3개월')).toBeVisible();
    await dialog.getByRole('button', { name: '가져오기' }).click();

    await expect(page).toHaveURL(/\/finance\/input\?month=2026-06&saved=1/);
    await expect(page.getByLabel('남편 월급')).toHaveValue('6,300,000');
    await expect(page.getByLabel('아내 월급')).toHaveValue('4,400,000');

    const persisted = JSON.parse(await readFile(FINANCE_DATA_PATH, 'utf8'));
    const persistedMonths = persisted.snapshots.map(
      (snapshot: { month: string }) => snapshot.month
    );
    expect(persistedMonths).toContain('2026-04');
    expect(persistedMonths).toContain('2026-05');
    expect(persistedMonths).toContain('2026-06');
    expect(persistedMonths.at(-1)).toBe('2026-06');

    await page.getByRole('tab', { name: '자산' }).click();
    await expect(page.getByLabel('자산명')).toHaveValue('6월 통장');
    await expect(page.getByLabel('금액')).toHaveValue('28,000,000');
  });
});

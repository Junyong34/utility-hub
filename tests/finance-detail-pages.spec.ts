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

async function seedDetailPageData() {
  await mkdir(path.dirname(FINANCE_DATA_PATH), { recursive: true });
  await writeFile(
    FINANCE_DATA_PATH,
    `${JSON.stringify(
      {
        version: 1,
        snapshots: [
          {
            month: '2025-12',
            updatedAt: '2025-12-31T12:00:00.000Z',
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
              {
                id: 'asset-2',
                owner: 'joint',
                category: 'saving',
                name: '적금',
                amount: 8000000,
                memo: '',
              },
              {
                id: 'asset-3',
                owner: 'joint',
                category: 'cma',
                name: 'CMA',
                amount: 3000000,
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
              {
                id: 'debt-2',
                owner: 'joint',
                category: 'credit_loan',
                name: '신용대출',
                balance: 2000000,
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
                name: 'ETF',
                principal: 6000000,
                valuation: 7000000,
                memo: '',
              },
              {
                id: 'investment-2',
                owner: 'wife',
                category: 'stock',
                name: '주식',
                principal: 4000000,
                valuation: 5000000,
                memo: '',
              },
            ],
            expenses: [
              {
                id: 'expense-1',
                owner: 'joint',
                type: 'fixed',
                category: 'housing',
                name: '주거비',
                amount: 800000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-2',
                owner: 'joint',
                type: 'fixed',
                category: 'child_education',
                name: '자녀 교육비',
                amount: 350000,
                childRelated: true,
                memo: '',
              },
              {
                id: 'expense-3',
                owner: 'joint',
                type: 'fixed',
                category: 'subscription',
                name: '구독료',
                amount: 120000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-4',
                owner: 'joint',
                type: 'variable',
                category: 'food',
                name: '식비',
                amount: 700000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-5',
                owner: 'joint',
                type: 'variable',
                category: 'transport',
                name: '교통비',
                amount: 150000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-6',
                owner: 'joint',
                type: 'variable',
                category: 'shopping',
                name: '쇼핑',
                amount: 250000,
                childRelated: false,
                memo: '',
              },
            ],
          },
          {
            month: '2026-01',
            updatedAt: '2026-01-31T12:00:00.000Z',
            incomes: { husbandSalary: 5100000, wifeSalary: 4100000, memo: '' },
            assets: [
              {
                id: 'asset-1',
                owner: 'joint',
                category: 'deposit',
                name: '생활비 통장',
                amount: 14000000,
                memo: '',
              },
              {
                id: 'asset-2',
                owner: 'joint',
                category: 'saving',
                name: '적금',
                amount: 9000000,
                memo: '',
              },
              {
                id: 'asset-3',
                owner: 'joint',
                category: 'cma',
                name: 'CMA',
                amount: 3500000,
                memo: '',
              },
            ],
            debts: [
              {
                id: 'debt-1',
                owner: 'joint',
                category: 'mortgage',
                name: '주담대',
                balance: 4800000,
                interestRate: null,
                monthlyPayment: null,
                monthlyInterest: null,
                memo: '',
              },
              {
                id: 'debt-2',
                owner: 'joint',
                category: 'credit_loan',
                name: '신용대출',
                balance: 1800000,
                interestRate: null,
                monthlyPayment: null,
                monthlyInterest: null,
                memo: '',
              },
              {
                id: 'debt-3',
                owner: 'joint',
                category: 'card_balance',
                name: '카드값',
                balance: 500000,
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
                name: 'ETF',
                principal: 7000000,
                valuation: 8200000,
                memo: '',
              },
              {
                id: 'investment-2',
                owner: 'wife',
                category: 'stock',
                name: '주식',
                principal: 4500000,
                valuation: 4800000,
                memo: '',
              },
              {
                id: 'investment-3',
                owner: 'joint',
                category: 'fund',
                name: '펀드',
                principal: 2000000,
                valuation: 2200000,
                memo: '',
              },
            ],
            expenses: [
              {
                id: 'expense-1',
                owner: 'joint',
                type: 'fixed',
                category: 'housing',
                name: '주거비',
                amount: 800000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-2',
                owner: 'joint',
                type: 'fixed',
                category: 'child_education',
                name: '자녀 교육비',
                amount: 350000,
                childRelated: true,
                memo: '',
              },
              {
                id: 'expense-3',
                owner: 'joint',
                type: 'fixed',
                category: 'subscription',
                name: '구독료',
                amount: 120000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-4',
                owner: 'joint',
                type: 'variable',
                category: 'food',
                name: '식비',
                amount: 700000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-5',
                owner: 'joint',
                type: 'variable',
                category: 'transport',
                name: '교통비',
                amount: 150000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-6',
                owner: 'joint',
                type: 'variable',
                category: 'shopping',
                name: '쇼핑',
                amount: 250000,
                childRelated: false,
                memo: '',
              },
            ],
          },
          {
            month: '2026-03',
            updatedAt: '2026-03-31T12:00:00.000Z',
            incomes: { husbandSalary: 5200000, wifeSalary: 4200000, memo: '' },
            assets: [
              {
                id: 'asset-1',
                owner: 'joint',
                category: 'deposit',
                name: '생활비 통장',
                amount: 17000000,
                memo: '',
              },
              {
                id: 'asset-2',
                owner: 'joint',
                category: 'saving',
                name: '적금',
                amount: 10000000,
                memo: '',
              },
              {
                id: 'asset-3',
                owner: 'joint',
                category: 'cma',
                name: 'CMA',
                amount: 4000000,
                memo: '',
              },
            ],
            debts: [
              {
                id: 'debt-1',
                owner: 'joint',
                category: 'mortgage',
                name: '주담대',
                balance: 4600000,
                interestRate: null,
                monthlyPayment: null,
                monthlyInterest: null,
                memo: '',
              },
              {
                id: 'debt-2',
                owner: 'joint',
                category: 'credit_loan',
                name: '신용대출',
                balance: 1500000,
                interestRate: null,
                monthlyPayment: null,
                monthlyInterest: null,
                memo: '',
              },
              {
                id: 'debt-3',
                owner: 'joint',
                category: 'card_balance',
                name: '카드값',
                balance: 300000,
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
                name: 'ETF',
                principal: 7200000,
                valuation: 9500000,
                memo: '',
              },
              {
                id: 'investment-2',
                owner: 'wife',
                category: 'stock',
                name: '주식',
                principal: 4700000,
                valuation: 5200000,
                memo: '',
              },
              {
                id: 'investment-3',
                owner: 'joint',
                category: 'fund',
                name: '펀드',
                principal: 2200000,
                valuation: 2500000,
                memo: '',
              },
            ],
            expenses: [
              {
                id: 'expense-1',
                owner: 'joint',
                type: 'fixed',
                category: 'housing',
                name: '주거비',
                amount: 800000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-2',
                owner: 'joint',
                type: 'fixed',
                category: 'child_education',
                name: '자녀 교육비',
                amount: 350000,
                childRelated: true,
                memo: '',
              },
              {
                id: 'expense-3',
                owner: 'joint',
                type: 'fixed',
                category: 'subscription',
                name: '구독료',
                amount: 120000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-4',
                owner: 'joint',
                type: 'variable',
                category: 'food',
                name: '식비',
                amount: 700000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-5',
                owner: 'joint',
                type: 'variable',
                category: 'transport',
                name: '교통비',
                amount: 150000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-6',
                owner: 'joint',
                type: 'variable',
                category: 'shopping',
                name: '쇼핑',
                amount: 250000,
                childRelated: false,
                memo: '',
              },
            ],
          },
          {
            month: '2026-07',
            updatedAt: '2026-07-31T12:00:00.000Z',
            incomes: { husbandSalary: 5300000, wifeSalary: 4300000, memo: '' },
            assets: [
              {
                id: 'asset-1',
                owner: 'joint',
                category: 'deposit',
                name: '생활비 통장',
                amount: 20000000,
                memo: '',
              },
              {
                id: 'asset-2',
                owner: 'joint',
                category: 'saving',
                name: '적금',
                amount: 12000000,
                memo: '',
              },
              {
                id: 'asset-3',
                owner: 'joint',
                category: 'cma',
                name: 'CMA',
                amount: 5000000,
                memo: '',
              },
              {
                id: 'asset-4',
                owner: 'joint',
                category: 'real_estate',
                name: '아파트',
                amount: 45000000,
                memo: '',
              },
            ],
            debts: [
              {
                id: 'debt-1',
                owner: 'joint',
                category: 'mortgage',
                name: '주담대',
                balance: 5200000,
                interestRate: null,
                monthlyPayment: null,
                monthlyInterest: null,
                memo: '',
              },
              {
                id: 'debt-2',
                owner: 'joint',
                category: 'credit_loan',
                name: '신용대출',
                balance: 1200000,
                interestRate: null,
                monthlyPayment: null,
                monthlyInterest: null,
                memo: '',
              },
              {
                id: 'debt-3',
                owner: 'joint',
                category: 'card_balance',
                name: '카드값',
                balance: 200000,
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
                name: 'ETF',
                principal: 8000000,
                valuation: 11000000,
                memo: '',
              },
              {
                id: 'investment-2',
                owner: 'wife',
                category: 'stock',
                name: '주식',
                principal: 5000000,
                valuation: 6200000,
                memo: '',
              },
              {
                id: 'investment-3',
                owner: 'joint',
                category: 'fund',
                name: '펀드',
                principal: 2500000,
                valuation: 3100000,
                memo: '',
              },
            ],
            expenses: [
              {
                id: 'expense-1',
                owner: 'joint',
                type: 'fixed',
                category: 'housing',
                name: '주거비',
                amount: 800000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-2',
                owner: 'joint',
                type: 'fixed',
                category: 'child_education',
                name: '자녀 교육비',
                amount: 350000,
                childRelated: true,
                memo: '',
              },
              {
                id: 'expense-3',
                owner: 'joint',
                type: 'fixed',
                category: 'subscription',
                name: '구독료',
                amount: 120000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-4',
                owner: 'joint',
                type: 'variable',
                category: 'food',
                name: '식비',
                amount: 700000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-5',
                owner: 'joint',
                type: 'variable',
                category: 'transport',
                name: '교통비',
                amount: 150000,
                childRelated: false,
                memo: '',
              },
              {
                id: 'expense-6',
                owner: 'joint',
                type: 'variable',
                category: 'shopping',
                name: '쇼핑',
                amount: 250000,
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

test.describe.configure({ mode: 'serial' });

test.describe('/finance detail pages', () => {
  test.beforeAll(async () => {
    originalFinanceData = await readExistingFinanceData();
  });

  test.beforeEach(async () => {
    await rm(FINANCE_DATA_PATH, { force: true });
    await seedDetailPageData();
  });

  test.afterAll(async () => {
    if (originalFinanceData === null) {
      await rm(FINANCE_DATA_PATH, { force: true });
      return;
    }

    await mkdir(path.dirname(FINANCE_DATA_PATH), { recursive: true });
    await writeFile(FINANCE_DATA_PATH, originalFinanceData, 'utf8');
  });

  test('자산, 부채, 투자, 리포트 화면은 카드와 차트로 구성된다', async ({
    page,
  }) => {
    await page.goto('/finance/assets?month=2026-07', { waitUntil: 'networkidle' });
    await expect(page.getByText('2026.07 자산 인사이트')).toBeVisible();
    await expect(page.getByTestId('finance-assets-composition')).toBeVisible();
    await expect(
      page.getByTestId('finance-assets-composition').locator('svg')
    ).toHaveCount(1);

    await page.goto('/finance/debts?month=2026-07', { waitUntil: 'networkidle' });
    await expect(page.getByText('2026.07 부채 현황')).toBeVisible();
    await expect(page.getByTestId('finance-debts-composition')).toBeVisible();
    await expect(
      page.getByTestId('finance-debts-composition').locator('svg')
    ).toHaveCount(1);

    await page.goto('/finance/investments?month=2026-07', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByText('2026.07 투자 현황')).toBeVisible();
    await expect(page.getByTestId('finance-investments-composition')).toBeVisible();
    await expect(
      page.getByTestId('finance-investments-composition').locator('svg')
    ).toHaveCount(1);

    await page.goto('/finance/expenses?month=2026-07', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByText('2026.07 지출 인사이트')).toBeVisible();
    await expect(page.getByTestId('finance-expenses-structure')).toBeVisible();
    await expect(page.getByTestId('finance-expenses-composition')).toBeVisible();
    await expect(
      page.getByTestId('finance-expenses-structure').locator('svg')
    ).toHaveCount(1);
    await expect(
      page.getByTestId('finance-expenses-composition').locator('svg')
    ).toHaveCount(1);

    await page.goto('/finance/reports?month=2026-07', {
      waitUntil: 'networkidle',
    });
    await expect(page.getByText('리포트 요약')).toBeVisible();
    await expect(page.getByTestId('finance-reports-quarterly')).toBeVisible();
    await expect(page.getByTestId('finance-reports-half')).toBeVisible();
    await expect(page.getByTestId('finance-reports-yearly')).toBeVisible();
    await expect(
      page.getByTestId('finance-reports-quarterly').locator('svg')
    ).toHaveCount(1);
    await expect(page.getByTestId('finance-reports-half').locator('svg')).toHaveCount(
      1
    );
    await expect(
      page.getByTestId('finance-reports-yearly').locator('svg')
    ).toHaveCount(1);
  });
});

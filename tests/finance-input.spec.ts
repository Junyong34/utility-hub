import { expect, test } from '@playwright/test';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createDefaultExpenseRows } from '../lib/finance/defaults.ts';
import type { FinanceMonthlySnapshot } from '../lib/finance/types.ts';

const FINANCE_DATA_PATH = path.join(
  process.cwd(),
  'data/private/finance-snapshots.json'
);
const LOCAL_DRAFT_STORAGE_KEY = 'zento-finance-input-local-draft-v1';
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

  test('입력 화면은 처음에는 비어 있고 빈 입력 시작 후 로컬 드래프트가 유지된다', async ({
    page,
  }) => {
    await page.goto('/finance/input', { waitUntil: 'networkidle' });

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/
    );
    await expect(
      page.getByText('아직 생성된 월 데이터가 없습니다.')
    ).toBeVisible();
    await expect(page.getByText('아직 입력 데이터가 없습니다.')).toBeVisible();
    await page.getByLabel('새 월 생성').fill('2026-01');
    await page.getByRole('button', { name: '빈 입력 시작' }).click();

    await expect(page).toHaveURL(/\/finance\/input\?month=2026-01&local=1/);
    await expect(page.getByText('2026.01 스냅샷')).toBeVisible();
    await expect(page.getByText('임시 1개월')).toBeVisible();

    await page.getByLabel('남편 월급').fill('5200000');
    await page.getByLabel('아내 월급').fill('4100000');
    await page.getByRole('tab', { name: '자산' }).click();
    await page.getByRole('button', { name: '자산 추가' }).click();
    await page.getByLabel('자산명').fill('생활비 통장');
    await page.getByLabel('금액').fill('18000000');
    await page.reload({ waitUntil: 'networkidle' });

    await expect(page.getByLabel('남편 월급')).toHaveValue('5,200,000');
    await expect(page.getByLabel('아내 월급')).toHaveValue('4,100,000');
    await page.getByRole('tab', { name: '자산' }).click();
    await expect(page.getByLabel('자산명')).toHaveValue('생활비 통장');
    await expect(page.getByLabel('금액')).toHaveValue('18,000,000');
    expect(
      await page.evaluate(
        key => window.localStorage.getItem(key),
        LOCAL_DRAFT_STORAGE_KEY
      )
    ).not.toBeNull();
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
    await expect(
      page.getByTestId('finance-assets-composition').getByText('생활비 통장')
    ).toBeVisible();
    await expect(
      page
        .getByTestId('finance-assets-composition')
        .getByText('18,000,000원 · 100%')
    ).toBeVisible();

    await page.getByRole('link', { name: '투자', exact: true }).click();
    await expect(page).toHaveURL(/\/finance\/investments\?month=2026-02/);
    await expect(
      page.getByTestId('finance-investments-composition').getByText('ETF')
    ).toBeVisible();
    await expect(
      page
        .getByTestId('finance-investments-composition')
        .getByText('10,000,000원 · 100%')
    ).toBeVisible();
  });

  test('JSON 문자열을 붙여넣어 가져오면 브라우저에 보관되고 초기화할 때만 원본으로 돌아간다', async ({
    page,
  }) => {
    await page.goto('/finance/input', { waitUntil: 'networkidle' });

    await page.getByLabel('새 월 생성').fill('2026-02');
    await page.getByRole('button', { name: '빈 입력 시작' }).click();
    await expect(page).toHaveURL(/\/finance\/input\?month=2026-02&local=1/);
    await page.getByLabel('남편 월급').fill('5100000');
    await page.getByLabel('아내 월급').fill('4050000');

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

    await expect(page).toHaveURL(/\/finance\/input\?month=2026-03&local=1/);
    await expect(page.getByText('임시 1개월')).toBeVisible();
    await expect(page.getByRole('button', { name: '3월' })).toBeEnabled();
    await expect(page.getByLabel('남편 월급')).toHaveValue('6,100,000');
    await expect(page.getByLabel('아내 월급')).toHaveValue('4,200,000');

    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByLabel('남편 월급')).toHaveValue('6,100,000');
    await expect(page.getByLabel('아내 월급')).toHaveValue('4,200,000');
    await page.getByRole('tab', { name: '자산' }).click();
    await expect(page.getByLabel('자산명')).toHaveValue('새 생활비 통장');
    await expect(page.getByLabel('금액')).toHaveValue('25,000,000');

    page.once('dialog', dialogEvent => dialogEvent.accept());
    await page.getByRole('button', { name: '입력 데이터 초기화' }).click();

    await expect(page).toHaveURL(/\/finance\/input$/);
    await expect
      .poll(() =>
        page.evaluate(
          key => window.localStorage.getItem(key),
          LOCAL_DRAFT_STORAGE_KEY
        )
      )
      .toBeNull();
    await expect(page.getByText('아직 입력 데이터가 없습니다.')).toBeVisible();
    await expect(
      page.getByText('아직 생성된 월 데이터가 없습니다.')
    ).toBeVisible();

    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByText('아직 입력 데이터가 없습니다.')).toBeVisible();
  });

  test('JSON 파일 업로드 후 수정한 값은 새로고침에 유지되고 JSON으로 다운로드된다', async ({
    page,
  }) => {
    await page.goto('/finance/input', { waitUntil: 'networkidle' });
    await page.getByLabel('새 월 생성').fill('2027-01');
    await page.getByRole('button', { name: '빈 입력 시작' }).click();
    await expect(page).toHaveURL(/\/finance\/input\?month=2027-01&local=1/);

    await page.getByRole('button', { name: '가져오기' }).first().click();
    const yearlySnapshots = Array.from({ length: 12 }, (_, index) => {
      const month = `2026-${String(index + 1).padStart(2, '0')}`;

      return createImportSnapshot(month, {
        incomes: {
          husbandSalary: 5000000 + (index + 1) * 100000,
          wifeSalary: 4000000 + (index + 1) * 50000,
        },
        assets: [
          {
            id: `asset-${month}`,
            owner: 'joint',
            category: 'deposit',
            name: `${index + 1}월 통장`,
            amount: 20000000 + (index + 1) * 1000000,
            memo: '',
          },
        ],
      });
    });
    const datasetPayload = JSON.stringify(
      {
        version: 1,
        snapshots: yearlySnapshots,
      },
      null,
      2
    );

    await page.getByLabel('JSON 파일').setInputFiles({
      name: 'finance-import.json',
      mimeType: 'application/json',
      buffer: Buffer.from(datasetPayload, 'utf8'),
    });

    const dialog = page.getByRole('dialog');
    await expect(
      dialog.getByText('선택된 파일: finance-import.json')
    ).toBeVisible();
    await expect(dialog.getByText('2026.12', { exact: true })).toBeVisible();
    await expect(dialog.getByText('총 12개월')).toBeVisible();
    await dialog.getByRole('button', { name: '가져오기' }).click();

    await expect(page).toHaveURL(/\/finance\/input\?month=2026-12&local=1/);
    await expect(page.getByText('임시 12개월')).toBeVisible();
    await expect(
      page.getByRole('button', { name: '1월', exact: true })
    ).toBeEnabled();
    await expect(
      page.getByRole('button', { name: '6월', exact: true })
    ).toBeEnabled();
    await expect(
      page.getByRole('button', { name: '12월', exact: true })
    ).toBeEnabled();
    await expect(page.getByLabel('남편 월급')).toHaveValue('6,200,000');
    await expect(page.getByLabel('아내 월급')).toHaveValue('4,600,000');

    await page.getByRole('tab', { name: '자산' }).click();
    await expect(page.getByLabel('자산명')).toHaveValue('12월 통장');
    await expect(page.getByLabel('금액')).toHaveValue('32,000,000');

    await page.getByRole('button', { name: '1월', exact: true }).click();
    await expect(page).toHaveURL(/\/finance\/input\?month=2026-01&local=1/);
    await page.getByRole('tab', { name: '수입' }).click();
    await expect(page.getByLabel('남편 월급')).toHaveValue('5,100,000');
    await expect(page.getByLabel('아내 월급')).toHaveValue('4,050,000');
    await page.getByRole('tab', { name: '자산' }).click();
    await expect(page.getByLabel('자산명')).toHaveValue('1월 통장');
    await expect(page.getByLabel('금액')).toHaveValue('21,000,000');

    await page.getByRole('link', { name: '자산', exact: true }).click();
    await expect(page).toHaveURL(/\/finance\/assets\?month=2026-01/);
    await expect(
      page.getByTestId('finance-assets-composition').getByText('1월 통장')
    ).toBeVisible();
    await expect(
      page
        .getByTestId('finance-assets-composition')
        .getByText('21,000,000원 · 100%')
    ).toBeVisible();

    await page.getByRole('link', { name: '리포트', exact: true }).click();
    await expect(page).toHaveURL(/\/finance\/reports\?month=2026-01/);
    await expect(page.getByText('리포트 요약')).toBeVisible();
    await expect(page.getByText('총 12개월 저장됨')).toBeVisible();

    await page.getByRole('link', { name: '입력', exact: true }).click();
    await expect(page).toHaveURL(/\/finance\/input\?month=2026-01/);
    await page.getByRole('tab', { name: '수입' }).click();
    await page.getByLabel('남편 월급').fill('6400000');
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByLabel('남편 월급')).toHaveValue('6,400,000');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'JSON 다운로드' }).click();
    const download = await downloadPromise;
    const downloadPath = await download.path();
    expect(downloadPath).not.toBeNull();
    const downloadedSnapshot = JSON.parse(
      await readFile(downloadPath!, 'utf8')
    ) as FinanceMonthlySnapshot;

    expect(download.suggestedFilename()).toBe('finance-snapshot-2026-01.json');
    expect(downloadedSnapshot.month).toBe('2026-01');
    expect(downloadedSnapshot.incomes.husbandSalary).toBe(6400000);
  });

  test('JSON으로 가져온 로컬 스냅샷은 자산·부채·투자 상세 화면에 같은 월 데이터로 반영된다', async ({
    page,
  }) => {
    await page.goto('/finance/input', { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: '가져오기' }).first().click();
    const datasetPayload = JSON.stringify(
      {
        version: 1,
        snapshots: [
          createImportSnapshot('2026-01', {
            assets: [
              {
                id: 'asset-import-jan',
                owner: 'joint',
                category: 'deposit',
                name: '로컬 가져오기 자산',
                amount: 21000000,
                memo: '',
              },
            ],
            debts: [
              {
                id: 'debt-import-jan',
                owner: 'joint',
                category: 'mortgage',
                name: '로컬 가져오기 부채',
                balance: 7000000,
                interestRate: null,
                monthlyPayment: null,
                monthlyInterest: null,
                memo: '',
              },
            ],
            investments: [
              {
                id: 'investment-import-jan',
                owner: 'wife',
                category: 'etf',
                name: '로컬 가져오기 투자',
                principal: 8000000,
                valuation: 9500000,
                memo: '',
              },
            ],
          }),
        ],
      },
      null,
      2
    );

    await page.getByLabel('JSON 파일').setInputFiles({
      name: 'finance-import.json',
      mimeType: 'application/json',
      buffer: Buffer.from(datasetPayload, 'utf8'),
    });
    await page.getByRole('dialog').getByRole('button', { name: '가져오기' }).click();

    await expect(page).toHaveURL(/\/finance\/input\?month=2026-01&local=1/);

    await page.getByRole('link', { name: '자산', exact: true }).click();
    await expect(page).toHaveURL(/\/finance\/assets\?month=2026-01/);
    await expect(
      page
        .getByTestId('finance-assets-composition')
        .getByText('로컬 가져오기 자산')
    ).toBeVisible();
    await expect(
      page
        .getByTestId('finance-assets-composition')
        .getByText('21,000,000원 · 100%')
    ).toBeVisible();

    await page.getByRole('link', { name: '부채', exact: true }).click();
    await expect(page).toHaveURL(/\/finance\/debts\?month=2026-01/);
    await expect(
      page
        .getByTestId('finance-debts-composition')
        .getByText('로컬 가져오기 부채')
    ).toBeVisible();
    await expect(
      page
        .getByTestId('finance-debts-composition')
        .getByText('7,000,000원 · 100%')
    ).toBeVisible();

    await page.getByRole('link', { name: '투자', exact: true }).click();
    await expect(page).toHaveURL(/\/finance\/investments\?month=2026-01/);
    await expect(
      page
        .getByTestId('finance-investments-composition')
        .getByText('로컬 가져오기 투자')
    ).toBeVisible();
    await expect(
      page
        .getByTestId('finance-investments-composition')
        .getByText('9,500,000원 · 100%')
    ).toBeVisible();
  });
});

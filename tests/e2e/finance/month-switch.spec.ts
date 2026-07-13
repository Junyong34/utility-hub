import { expect, test } from '@playwright/test';

import {
  resetFinanceE2eData,
  writeFinanceE2eDataset,
} from '../../support/finance/e2e-data.ts';

async function seedMonthSwitchData() {
  await writeFinanceE2eDataset({
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
  });
}

test.describe('/finance/input month switching', () => {
  test.beforeEach(async () => {
    await resetFinanceE2eData();
    await seedMonthSwitchData();
  });

  test('기준월을 바꾸면 입력 draft도 해당 월 스냅샷으로 바뀐다', async ({
    page,
  }) => {
    await page.goto('/finance/input?month=2026-12', {
      waitUntil: 'networkidle',
    });

    await page.getByRole('tab', { name: '자산' }).click();
    await expect(page.getByLabel('자산명')).toHaveValue('12월 적금');

    await page.getByRole('button', { name: '11월' }).click();
    await expect(page).toHaveURL(/\/finance\/input\?month=2026-11/);
    await page.getByRole('tab', { name: '자산' }).click();
    await expect(page.getByText('등록된 자산 항목이 없습니다.')).toBeVisible();
    await expect(page.getByLabel('자산명')).toHaveCount(0);
  });
});

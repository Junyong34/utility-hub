import { expect, test } from '@playwright/test';

test.describe('/tools/dsr-calculator', () => {
  test('연소득과 기본 신규 대출로 DSR을 계산하고 URL 상태를 유지한다', async ({
    page,
  }) => {
    await page.goto('/tools/dsr-calculator', {
      waitUntil: 'domcontentloaded',
    });

    await page.getByPlaceholder('연소득을 입력하세요').fill('60000000');
    await page.getByRole('button', { name: 'DSR 계산하기' }).click();

    await expect(
      page.getByText('DSR 계산 결과', { exact: true })
    ).toBeVisible();
    await expect(page.getByText('29.34%', { exact: true })).toBeVisible();
    await expect(page.getByText('40.73%', { exact: true })).toBeVisible();
    await expect(page.getByText('₩294,642,787', { exact: true })).toBeVisible();

    await expect(page).toHaveURL(/income=60000000/);
    await expect(page).toHaveURL(/calculated=true/);
  });
});

import { expect, test } from '@playwright/test';

test.describe('/tools/savings-calculator', () => {
  test('예금과 적금의 세후 총 수령액을 계산한다', async ({ page }) => {
    await page.goto('/tools/savings-calculator', { waitUntil: 'networkidle' });

    await page.getByPlaceholder('예치금액을 입력하세요').fill('10000000');
    await page.getByPlaceholder('이자율을 입력하세요').fill('3.5');
    await page.getByLabel('월', { exact: true }).click();
    await page.getByPlaceholder('기간을 입력하세요').fill('12');
    await page.getByRole('button', { name: '계산하기' }).click();

    const depositDialog = page.getByRole('dialog', {
      name: '월별 이자 상세',
    });
    await expect(
      depositDialog.getByText('총 수령액', { exact: true }).locator('..')
    ).toContainText('₩10,296,100');
    await depositDialog.getByRole('button', { name: '닫기' }).click();

    await page.getByRole('tab', { name: '적금 계산기' }).click();
    await page.getByPlaceholder('월 납입금액을 입력하세요').fill('500000');
    await page.getByPlaceholder('이자율을 입력하세요').fill('4');
    await page.getByLabel('월', { exact: true }).click();
    await page.getByPlaceholder('기간을 입력하세요').fill('24');
    await page.getByRole('button', { name: '계산하기' }).click();

    const installmentDialog = page.getByRole('dialog', {
      name: '월별 적립 상세',
    });
    await expect(
      installmentDialog.getByText('총 수령액', { exact: true }).locator('..')
    ).toContainText('₩12,423,000');
  });
});

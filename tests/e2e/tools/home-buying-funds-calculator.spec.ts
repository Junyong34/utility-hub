import { expect, test } from '@playwright/test';

test.describe('/tools/home-buying-funds-calculator', () => {
  test('기본 필요자금을 보여주고 매매가 변경을 URL과 계산 결과에 즉시 반영한다', async ({
    page,
  }) => {
    await page.goto('/tools/home-buying-funds-calculator', {
      waitUntil: 'networkidle',
    });

    await expect(
      page.getByRole('heading', { name: '주택 구입 비용 계산기' })
    ).toBeVisible();

    const salePriceInput = page.getByLabel('매매가', { exact: true });
    const totalCost = page.getByText('총 비용', { exact: true }).locator('..');

    await expect(salePriceInput).toHaveValue('0');
    await expect(totalCost).toContainText('1,575,000원');

    await salePriceInput.fill('500000000');

    await expect(salePriceInput).toHaveValue('500,000,000');
    await expect(page).toHaveURL(url => {
      return url.searchParams.get('salePrice') === '500000000';
    });
    await expect(page.getByText('계약금: 50,000,000원')).toBeVisible();
    await expect(totalCost).toContainText('511,499,600원');
  });
});

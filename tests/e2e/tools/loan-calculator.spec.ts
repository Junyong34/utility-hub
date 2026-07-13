import { expect, test } from '@playwright/test';

test.describe('/tools/loan-calculator', () => {
  test('대출을 계산하고 두 계산기 탭을 오가도 결과를 유지한다', async ({
    page,
  }) => {
    await page.goto('/tools/loan-calculator', { waitUntil: 'networkidle' });

    await page.getByPlaceholder('대출 원금을 입력하세요').fill('100000000');
    await page.getByPlaceholder('이자율을 입력하세요').fill('3.5');
    await page.getByLabel('년', { exact: true }).click();
    await page.getByPlaceholder('상환 기간을 입력하세요').fill('30');
    await page.getByRole('button', { name: '계산하기' }).click();

    const repaymentPlanDialog = page.getByRole('dialog', {
      name: '상환 계획 상세',
    });
    await expect(
      repaymentPlanDialog
        .getByText('매월 상환금액', { exact: true })
        .locator('..')
    ).toContainText('₩449,045');
    await repaymentPlanDialog.getByRole('button', { name: '닫기' }).click();

    await page.getByRole('tab', { name: '중도상환 수수료' }).click();
    await expect(
      page.getByText('중도상환 정보 입력', { exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('tab', { name: '중도상환 수수료' })
    ).toHaveAttribute('aria-selected', 'true');

    await page.getByRole('tab', { name: '대출 계산기' }).click();
    await expect(
      page.getByText('매월 상환금액', { exact: true }).first().locator('..')
    ).toContainText('₩449,045');
  });
});

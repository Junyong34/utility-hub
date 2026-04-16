import { expect, test } from '@playwright/test';

test.describe('/tools/home-check', () => {
  test('직접 URL로 접근 가능하고 noindex 메타를 가진다', async ({ page }) => {
    await page.goto('/tools/home-check', {
      waitUntil: 'networkidle',
    });

    await expect(
      page.getByRole('heading', { name: '이사 예산 체크리스트' })
    ).toBeVisible();
    await expect(page.getByText('현재 결론')).toBeVisible();
    await expect(page.getByLabel('줄눈', { exact: true })).toBeVisible();
    await expect(page.getByText('목표일')).toHaveCount(0);

    const robots = await page
      .locator('meta[name="robots"]')
      .getAttribute('content');

    expect(robots).toContain('noindex');
    expect(robots).toContain('nofollow');
  });

  test('자산과 비용 입력을 바꾸면 요약 카드와 진행률이 즉시 갱신된다', async ({
    page,
  }) => {
    await page.goto('/tools/home-check', {
      waitUntil: 'networkidle',
    });

    await page.getByLabel('현금', { exact: true }).fill('50000000');
    await page.getByLabel('주식계좌', { exact: true }).fill('10000000');
    await page.getByLabel('아파트 가격', { exact: true }).fill('450000000');
    await page.getByLabel('입주청소', { exact: true }).fill('350000');
    await page.getByLabel('줄눈', { exact: true }).fill('700000');

    await expect(page.getByLabel('현금', { exact: true })).toHaveValue('50,000,000');
    await expect(page.getByLabel('주식계좌', { exact: true })).toHaveValue('10,000,000');
    await expect(page.getByLabel('아파트 가격', { exact: true })).toHaveValue('450,000,000');
    await expect(page.getByLabel('입주청소', { exact: true })).toHaveValue('350,000');

    await expect(page.getByText('현재 예산으로는 자금이 부족합니다')).toBeVisible();
    await expect(page.getByText('총자산')).toBeVisible();
    await expect(page.getByText('6,000만원')).toBeVisible();
    await expect(page.getByText('총예상비용')).toBeVisible();
    await expect(page.getByText('4억 5,105만원')).toBeVisible();
    await expect(page.getByText('비용 구조 해석')).toBeVisible();
    await expect(page.getByText('조정 가능 비교')).toBeVisible();
    await expect(page.getByText('그룹 상태 보드')).toBeVisible();
    await expect(page.getByText('체크 진행 보드')).toBeVisible();
    await expect(page.getByText('0/14 항목 완료')).toBeVisible();

    await page.getByRole('checkbox', { name: '아파트 가격 완료' }).click();
    await expect(page.getByText('1/14 항목 완료')).toBeVisible();
    await expect(page.getByText('7%').first()).toBeVisible();
  });

  test('사용자 추가 항목과 체크 상태는 새로고침 후에도 유지된다', async ({
    page,
  }) => {
    await page.goto('/tools/home-check', {
      waitUntil: 'networkidle',
    });

    await page
      .getByRole('button', {
        name: '아파트 입주 전 시공 및 부대비용 항목 추가',
      })
      .click();
    await page.getByLabel('추가 항목 이름 1').fill('줄눈 시공');
    await page.getByLabel('추가 항목 금액 1').fill('900000');
    await page.getByRole('checkbox', { name: '입주청소 완료' }).click();

    await page.reload({ waitUntil: 'networkidle' });

    await expect(page.getByLabel('추가 항목 이름 1')).toHaveValue('줄눈 시공');
    await expect(page.getByLabel('추가 항목 금액 1')).toHaveValue('900,000');
    await expect(
      page.getByRole('checkbox', { name: '입주청소 완료' })
    ).toBeChecked();
  });
});

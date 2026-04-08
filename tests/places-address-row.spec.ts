import { expect, test } from '@playwright/test';

test('place card renders the naver map link after the address text', async ({
  page,
}) => {
  await page.goto('/places/seoul');

  const card = page
    .locator('[data-slot="card"]')
    .filter({ has: page.getByRole('heading', { name: '국립어린이박물관' }) })
    .first();

  await expect(card).toBeVisible();

  const childOrder = await card.evaluate(node => {
    const addressRow = Array.from(node.querySelectorAll('div')).find(div => {
      const children = Array.from(div.children);

      return (
        children.some(child => child.matches('a[aria-label*="네이버지도"]')) &&
        children.some(child => child.matches('button[aria-label*="주소 복사"]')) &&
        children.some(
          child =>
            child.tagName.toLowerCase() === 'span' &&
            child.textContent?.includes('서울 용산구 서빙고로 137')
        )
      );
    });

    if (!addressRow) {
      return null;
    }

    return Array.from(addressRow.children).map(child => {
      if (child.matches('a[aria-label*="네이버지도"]')) {
        return 'naver';
      }

      if (child.matches('button[aria-label*="주소 복사"]')) {
        return 'copy';
      }

      if (
        child.tagName.toLowerCase() === 'span' &&
        child.textContent?.includes('서울 용산구 서빙고로 137')
      ) {
        return 'address';
      }

      return 'icon';
    });
  });

  expect(childOrder).toEqual(['icon', 'address', 'naver', 'copy']);
});

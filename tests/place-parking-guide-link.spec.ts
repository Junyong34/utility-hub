import { expect, test } from '@playwright/test';

import { ALL_PLACES } from '../content/places/index.ts';
import { PUBLISHABLE_STATUSES } from '../types/place-source.ts';

test('museum detail links to its verified parking guide', async ({ page }) => {
  await page.goto('/places/seoul/national-children-museum');

  const parkingGuideLink = page.getByRole('link', {
    name: '주차 이용방법·꿀팁 자세히 보기',
  });

  await expect(parkingGuideLink).toBeVisible();
  await expect(parkingGuideLink).toHaveAttribute(
    'href',
    '/blog/parking/national-children-museum-parking'
  );
});

test('refreshed parking guide shows both publication and update dates', async ({
  page,
}) => {
  await page.goto('/blog/parking/national-children-museum-parking');

  await expect(page.getByText('발행 2026년 5월 8일')).toBeVisible();
  await expect(page.getByText('업데이트 2026년 7월 13일')).toBeVisible();
  await expect(
    page.locator('meta[property="article:modified_time"]')
  ).toHaveAttribute('content', '2026-07-13T00:00:00.000Z');

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();

  expect(jsonLd.join('\n')).toContain(
    '"dateModified":"2026-07-13T00:00:00.000Z"'
  );
});

test('place without a linked parking guide does not show the guide card', async ({
  page,
}) => {
  const place = ALL_PLACES.find(
    item =>
      item.category !== 'museum' &&
      PUBLISHABLE_STATUSES.includes(item.verificationStatus) &&
      !item.linkedPostSlugs?.length
  );

  expect(place).toBeTruthy();
  await page.goto(`/places/${place!.region}/${place!.id}`);

  await expect(
    page.getByRole('link', {
      name: '주차 이용방법·꿀팁 자세히 보기',
    })
  ).toHaveCount(0);
});

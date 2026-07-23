import { expect, test } from '@playwright/test';
import { queryPlaceList } from '../../../lib/places/place-list-query.ts';

test.describe('crawlable places pagination', () => {
  test('global places page exposes page navigation and detail anchors without scrolling', async ({
    page,
  }) => {
    await page.goto('/places', { waitUntil: 'domcontentloaded' });

    await expect(page.getByTestId('places-pagination-nav')).toBeVisible();
    await expect(page.getByRole('link', { name: '2페이지' })).toBeVisible();

    const anchors = await page
      .locator('a[href]')
      .evaluateAll(elements =>
        elements.map(element => element.getAttribute('href') ?? '')
      );

    expect(anchors).toContain('/places?page=2');
    expect(
      anchors.some(href => /^\/places\/[^/?#]+\/[^/?#]+$/.test(href))
    ).toBe(true);
  });

  test('region places page exposes region-scoped page navigation', async ({
    page,
  }) => {
    await page.goto('/places/seoul', { waitUntil: 'domcontentloaded' });

    await expect(page.getByTestId('places-pagination-nav')).toBeVisible();
    await expect(page.getByRole('link', { name: '2페이지' })).toBeVisible();
  });

  test('direct region page navigation renders the requested page slice', async ({
    page,
  }) => {
    const expected = queryPlaceList({ region: 'seoul', page: 2 });

    await page.goto('/places/seoul?page=2', { waitUntil: 'domcontentloaded' });

    await expect(page.getByTestId('place-card').first()).toContainText(
      expected.places[0].name
    );
    await expect(page.locator('span[aria-current="page"]')).toHaveText('2');
    await expect(page.getByRole('link', { name: '1페이지' })).toBeVisible();
  });

  test('excessive direct page navigation resolves to the last available page', async ({
    page,
  }) => {
    const expected = queryPlaceList({ region: 'seoul', page: 999 });

    await page.goto('/places/seoul?page=999', {
      waitUntil: 'domcontentloaded',
    });

    await expect(page.getByTestId('place-card').first()).toContainText(
      expected.places[0].name
    );
    await expect(page.locator('span[aria-current="page"]')).toHaveText(
      String(expected.currentPage)
    );
    await expect(
      page.locator(`a[href="/places/seoul?page=${expected.totalPages}"]`)
    ).toHaveCount(0);
  });

  test('filtered pagination links preserve filters for users', async ({
    page,
  }) => {
    await page.goto('/places?free=true', { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('link', { name: '2페이지' })).toBeVisible();
    await expect(page.getByRole('link', { name: '2페이지' })).toHaveAttribute(
      'href',
      '/places?page=2&free=true'
    );
  });

  test('indexable pagination and filtered variations render distinct metadata', async ({
    page,
  }) => {
    await page.goto('/places?page=2', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.zento.kr/places?page=2'
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /(^|,)\s*index/
    );
    await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute(
      'content',
      /noindex/
    );
    await expect(
      page.locator('script[type="application/ld+json"]').first()
    ).toHaveText(/"url":"https:\/\/www\.zento\.kr\/places\?page=2"/);

    await page.goto('/places?free=true&page=2', {
      waitUntil: 'domcontentloaded',
    });

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.zento.kr/places'
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/
    );

    await page.goto('/places?utm_source=newsletter', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.zento.kr/places'
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/
    );
  });

  test('redirects transport and legacy region query variations to canonical routes', async ({
    page,
  }) => {
    const limitResponse = await page.goto('/places?limit=10&page=2', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page).toHaveURL(/\/places\?page=2$/);
    expect(
      limitResponse?.request().redirectedFrom()?.response()?.status()
    ).toBe(308);

    const regionResponse = await page.goto('/places?region=seoul', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page).toHaveURL(/\/places\/seoul$/);
    expect(
      regionResponse?.request().redirectedFrom()?.response()?.status()
    ).toBe(308);
  });
});

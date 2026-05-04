import { expect, test, type Page } from '@playwright/test';
import { DEFAULT_PLACES_PAGE_SIZE } from '../lib/places/place-list-contract.ts';
import { queryPlaceList } from '../lib/places/place-list-query.ts';

async function waitForPlaceCardCount(page: Page, count: number) {
  await expect
    .poll(async () => await page.getByTestId('place-card').count())
    .toBe(count);
}

async function loadMoreOnce(page: Page) {
  const cards = page.getByTestId('place-card');
  const countBefore = await cards.count();

  await cards.last().scrollIntoViewIfNeeded();

  await expect
    .poll(async () => await cards.count(), {
      timeout: 10_000,
    })
    .toBeGreaterThan(countBefore);
}

async function loadAllCards(page: Page) {
  const cards = page.getByTestId('place-card');
  let previousCount = -1;

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const currentCount = await cards.count();

    if (currentCount === previousCount) {
      break;
    }

    previousCount = currentCount;
    await cards.last().scrollIntoViewIfNeeded();

    await page.waitForTimeout(300);

    const doneMessage = page.getByText('조건에 맞는 장소를 모두 불러왔습니다.');
    if (await doneMessage.isVisible().catch(() => false)) {
      break;
    }
  }
}

async function applyPlaceTitleSearch(page: Page, search: string) {
  const searchInput = page.getByRole('searchbox', { name: '장소명 검색' });

  await searchInput.fill(search);
  await searchInput.press('Enter');
}

test.describe('/places infinite scroll', () => {
  test('places API applies title search query param', async ({ request }) => {
    const expected = queryPlaceList({ search: '서울' });

    const response = await request.get('/api/places?search=서울');
    const payload = await response.json();

    expect(response.ok()).toBe(true);
    expect(payload.total).toBe(expected.total);
    expect(payload.filters.search).toBe('서울');
    expect(payload.places.map((place: { id: string }) => place.id)).toEqual(
      expected.places.map(place => place.id)
    );
  });

  test('global places page appends the next page instead of rendering every card up front', async ({
    page,
  }) => {
    const total = queryPlaceList().total;
    expect(total).toBeGreaterThan(DEFAULT_PLACES_PAGE_SIZE);

    await page.goto('/places', { waitUntil: 'networkidle' });
    await waitForPlaceCardCount(page, DEFAULT_PLACES_PAGE_SIZE);

    await loadMoreOnce(page);

    await expect(page.getByTestId('place-card')).toHaveCount(
      DEFAULT_PLACES_PAGE_SIZE * 2
    );
  });

  test('region page keeps the region scope while loading remaining pages', async ({
    page,
  }) => {
    const seoulTotal = queryPlaceList({ region: 'seoul' }).total;
    expect(seoulTotal).toBeGreaterThan(DEFAULT_PLACES_PAGE_SIZE);

    await page.goto('/places/seoul', { waitUntil: 'networkidle' });
    await waitForPlaceCardCount(page, DEFAULT_PLACES_PAGE_SIZE);

    await loadAllCards(page);

    await expect(page.getByTestId('place-card')).toHaveCount(seoulTotal);
    await expect(
      page.getByText('조건에 맞는 장소를 모두 불러왔습니다.')
    ).toBeVisible();
  });

  test('changing filters resets the list back to the first page for the new query', async ({
    page,
  }) => {
    const libraryTotal = queryPlaceList({ category: 'library' }).total;
    expect(libraryTotal).toBeGreaterThan(0);

    await page.goto('/places', { waitUntil: 'networkidle' });
    await waitForPlaceCardCount(page, DEFAULT_PLACES_PAGE_SIZE);

    await loadMoreOnce(page);
    await expect(page.getByTestId('place-card')).toHaveCount(
      DEFAULT_PLACES_PAGE_SIZE * 2
    );

    await page
      .getByTestId('places-filter-track-category')
      .getByRole('button', { name: '도서관' })
      .click();

    await waitForPlaceCardCount(
      page,
      Math.min(DEFAULT_PLACES_PAGE_SIZE, libraryTotal)
    );
  });

  test('title search updates the URL and resets results to the matching first page', async ({
    page,
  }) => {
    const expected = queryPlaceList({ search: '서울' });
    expect(expected.total).toBeGreaterThan(0);

    await page.goto('/places', { waitUntil: 'networkidle' });
    await waitForPlaceCardCount(page, DEFAULT_PLACES_PAGE_SIZE);

    await loadMoreOnce(page);
    await expect(page.getByTestId('place-card')).toHaveCount(
      DEFAULT_PLACES_PAGE_SIZE * 2
    );

    await applyPlaceTitleSearch(page, '서울');

    await expect
      .poll(() => new URL(page.url()).searchParams.get('search'))
      .toBe('서울');
    await waitForPlaceCardCount(
      page,
      Math.min(DEFAULT_PLACES_PAGE_SIZE, expected.total)
    );
    await expect(page.getByTestId('place-card').first()).toContainText(
      expected.places[0].name
    );
  });

  test('direct title search URL restores the matching first page', async ({
    page,
  }) => {
    const expected = queryPlaceList({ region: 'seoul', search: '서울' });
    expect(expected.total).toBeGreaterThan(0);

    await page.goto('/places/seoul?search=서울', { waitUntil: 'networkidle' });

    await waitForPlaceCardCount(
      page,
      Math.min(DEFAULT_PLACES_PAGE_SIZE, expected.total)
    );
    await expect(
      page.getByRole('searchbox', { name: '장소명 검색' })
    ).toHaveValue('서울');
    await expect(page.getByTestId('place-card').first()).toContainText(
      expected.places[0].name
    );
  });

  test('clear all removes title search and existing filters', async ({
    page,
  }) => {
    await page.goto('/places?search=서울&free=true', {
      waitUntil: 'networkidle',
    });

    await expect(
      page.getByRole('searchbox', { name: '장소명 검색' })
    ).toHaveValue('서울');

    await page.getByRole('button', { name: '초기화' }).click();

    await expect
      .poll(() => {
        const url = new URL(page.url());
        return {
          search: url.searchParams.get('search'),
          free: url.searchParams.get('free'),
        };
      })
      .toEqual({ search: null, free: null });
    await expect(
      page.getByRole('searchbox', { name: '장소명 검색' })
    ).toHaveValue('');
    await waitForPlaceCardCount(page, DEFAULT_PLACES_PAGE_SIZE);
  });

  test('blank title search does not leave a search query param', async ({
    page,
  }) => {
    await page.goto('/places', { waitUntil: 'networkidle' });

    await applyPlaceTitleSearch(page, '   ');

    await expect
      .poll(() => new URL(page.url()).searchParams.get('search'))
      .toBe(null);
    await waitForPlaceCardCount(page, DEFAULT_PLACES_PAGE_SIZE);
  });
});

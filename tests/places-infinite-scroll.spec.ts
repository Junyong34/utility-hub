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

test.describe('/places infinite scroll', () => {
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
});

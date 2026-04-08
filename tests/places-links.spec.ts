import { expect, test, type Page } from '@playwright/test';

import { ALL_PLACES } from '../content/places/index.ts';
import {
  NAVER_MAP_BLOCK_TEXT_PATTERNS,
  NAVER_MAP_ERROR_TEXT_PATTERNS,
  SOURCE_PAGE_ERROR_TEXT_PATTERNS,
  getNaverMapLinkExpectation,
  getSourceLinkExpectation,
  getNaverMapTestPlaces,
  getSourceUrlTestPlaces,
  matchesAnyNormalizedText,
  normalizeMatchText,
} from '../content/places/link-verification.ts';

async function readNormalizedPageText(page: Page) {
  const chunks: string[] = [];
  const title = await page.title().catch(() => '');
  const body = page.locator('body');
  const bodyText =
    (await body
      .innerText()
      .catch(async () => (await body.textContent()) ?? '')) ?? '';

  chunks.push(title, bodyText);

  for (const frame of page.frames()) {
    if (frame === page.mainFrame()) {
      continue;
    }

    const frameBody =
      (await frame
        .locator('body')
        .innerText()
        .catch(async () => (await frame.locator('body').textContent()) ?? '')
        .catch(() => '')) ?? '';

    chunks.push(frameBody);
  }

  return normalizeMatchText(chunks.join(' '));
}

for (const place of getSourceUrlTestPlaces(ALL_PLACES)) {
  test(`${place.id} sourceUrl resolves to the expected place`, async ({
    page,
  }) => {
    const expectation = getSourceLinkExpectation(place);

    await page.goto(place.sourceUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30_000,
    });

    await page
      .waitForLoadState('networkidle', { timeout: 10_000 })
      .catch(() => {});
    await page.waitForTimeout(1_500);

    const normalizedText = await readNormalizedPageText(page);

    expect(
      normalizedText.length,
      `${place.id} sourceUrl did not render enough text to validate`
    ).toBeGreaterThan(0);

    expect(
      matchesAnyNormalizedText(normalizedText, SOURCE_PAGE_ERROR_TEXT_PATTERNS),
      `${place.id} sourceUrl looks like an error page`
    ).toBe(false);

    expect(
      matchesAnyNormalizedText(normalizedText, expectation.matchAny),
      `${place.id} sourceUrl did not expose any expected keywords: ${expectation.matchAny.join(', ')}`
    ).toBe(true);

    if (expectation.rejectAny.length > 0) {
      expect(
        matchesAnyNormalizedText(normalizedText, expectation.rejectAny),
        `${place.id} sourceUrl exposed reject keywords: ${expectation.rejectAny.join(', ')}`
      ).toBe(false);
    }
  });
}

for (const place of getNaverMapTestPlaces(ALL_PLACES)) {
  test(`${place.id} naverMapUrl resolves to the expected place`, async ({
    page,
  }) => {
    const expectation = getNaverMapLinkExpectation(place);

    await page.goto(place.naverMapUrl!, {
      waitUntil: 'domcontentloaded',
      timeout: 30_000,
    });

    await page
      .waitForLoadState('networkidle', { timeout: 10_000 })
      .catch(() => {});
    await page.waitForTimeout(1_500);

    const normalizedText = await readNormalizedPageText(page);
    const blockedByNaver = matchesAnyNormalizedText(
      normalizedText,
      NAVER_MAP_BLOCK_TEXT_PATTERNS
    );

    expect(
      normalizedText.length,
      `${place.id} naverMapUrl did not render enough text to validate`
    ).toBeGreaterThan(0);

    test.skip(
      blockedByNaver,
      `${place.id} naverMapUrl was blocked by Naver automated-access protection`
    );

    expect(
      matchesAnyNormalizedText(normalizedText, NAVER_MAP_ERROR_TEXT_PATTERNS),
      `${place.id} naverMapUrl looks like an error or search page`
    ).toBe(false);

    expect(
      matchesAnyNormalizedText(normalizedText, expectation.matchAny),
      `${place.id} naverMapUrl did not expose any expected keywords: ${expectation.matchAny.join(', ')}`
    ).toBe(true);

    if (expectation.rejectAny.length > 0) {
      expect(
        matchesAnyNormalizedText(normalizedText, expectation.rejectAny),
        `${place.id} naverMapUrl exposed reject keywords: ${expectation.rejectAny.join(', ')}`
      ).toBe(false);
    }
  });
}

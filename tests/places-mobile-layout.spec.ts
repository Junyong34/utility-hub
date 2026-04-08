import { expect, test } from '@playwright/test';

declare global {
  interface Window {
    __sharedUrl: string | null;
  }
}

const REGION_CARD_LINKS = [
  '/places/seoul',
  '/places/gyeonggi-south',
  '/places/gyeonggi-north',
  '/places/incheon',
] as const;

test.describe('/places mobile layout', () => {
  test('360px width keeps region cards in a single column', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 900 });
    await page.goto('/places', { waitUntil: 'networkidle' });

    await page.waitForFunction(
      ([firstHref, secondHref]) =>
        Boolean(
          document.querySelector(`a[href="${firstHref}"]`) &&
            document.querySelector(`a[href="${secondHref}"]`)
        ),
      [...REGION_CARD_LINKS]
    );

    const topPositions = await page.evaluate(([firstHref, secondHref]) => {
      const firstCard = document.querySelector(`a[href="${firstHref}"]`);
      const secondCard = document.querySelector(`a[href="${secondHref}"]`);

      return {
        firstTop: firstCard?.getBoundingClientRect().top ?? null,
        secondTop: secondCard?.getBoundingClientRect().top ?? null,
      };
    }, [REGION_CARD_LINKS[0], REGION_CARD_LINKS[1]]);

    expect(topPositions.firstTop).not.toBeNull();
    expect(topPositions.secondTop).not.toBeNull();
    expect(Math.round(topPositions.firstTop!)).not.toBe(
      Math.round(topPositions.secondTop!)
    );
  });

  test('390px width shows the first two region cards in two columns', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/places', { waitUntil: 'networkidle' });

    await page.waitForFunction(
      ([firstHref, secondHref]) =>
        Boolean(
          document.querySelector(`a[href="${firstHref}"]`) &&
            document.querySelector(`a[href="${secondHref}"]`)
        ),
      [REGION_CARD_LINKS[0], REGION_CARD_LINKS[1]]
    );

    const topPositions = await page.evaluate(([firstHref, secondHref]) => {
      const firstCard = document.querySelector(`a[href="${firstHref}"]`);
      const secondCard = document.querySelector(`a[href="${secondHref}"]`);

      return {
        firstTop: firstCard?.getBoundingClientRect().top ?? null,
        secondTop: secondCard?.getBoundingClientRect().top ?? null,
      };
    }, [REGION_CARD_LINKS[0], REGION_CARD_LINKS[1]]);

    expect(topPositions.firstTop).not.toBeNull();
    expect(topPositions.secondTop).not.toBeNull();
    expect(Math.round(topPositions.firstTop!)).toBe(
      Math.round(topPositions.secondTop!)
    );
  });

  test('shows inline share button and copies the current URL when native share is unavailable', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, '__sharedUrl', {
        configurable: true,
        writable: true,
        value: null,
      });

      Object.defineProperty(navigator, 'share', {
        configurable: true,
        value: undefined,
      });

      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (value: string) => {
            window.__sharedUrl = value;
          },
        },
      });
    });

    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/places?indoor=true&free=true');

    const shareButton = page.getByRole('button', { name: '현재 필터 링크 공유' });

    await expect(shareButton).toBeVisible();
    await shareButton.click();

    await expect(shareButton).toContainText('링크 복사됨');

    const copiedUrl = await page.evaluate(() => window.__sharedUrl);

    expect(copiedUrl).toBe('http://127.0.0.1:3000/places?indoor=true&free=true');
  });

  test('does not trigger hydration mismatch when native share is available', async ({
    page,
  }) => {
    const pageErrors: string[] = [];

    page.on('pageerror', error => {
      pageErrors.push(String(error));
    });

    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'share', {
        configurable: true,
        value: async () => undefined,
      });
    });

    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/places', { waitUntil: 'networkidle' });

    await expect(
      page.getByRole('button', { name: '현재 필터 링크 공유' })
    ).toBeVisible();

    await page.waitForTimeout(500);

    expect(
      pageErrors.some(message => message.includes('Hydration failed'))
    ).toBe(false);
  });

  test('category filter lane supports horizontal drag scrolling on mobile', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/places', { waitUntil: 'networkidle' });

    const categoryTrack = page.getByTestId('places-filter-track-category');

    await expect(categoryTrack).toBeVisible();
    await categoryTrack.scrollIntoViewIfNeeded();

    const initialMetrics = await categoryTrack.evaluate(element => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      scrollLeft: element.scrollLeft,
    }));

    expect(initialMetrics.scrollWidth).toBeGreaterThan(initialMetrics.clientWidth);

    const box = await categoryTrack.boundingBox();

    expect(box).not.toBeNull();

    await page.mouse.move(box!.x + box!.width * 0.8, box!.y + box!.height / 2);
    await page.mouse.down();
    await page.mouse.move(box!.x + box!.width * 0.2, box!.y + box!.height / 2, {
      steps: 10,
    });
    await page.mouse.up();

    const finalScrollLeft = await categoryTrack.evaluate(
      element => element.scrollLeft
    );

    expect(finalScrollLeft).toBeGreaterThan(initialMetrics.scrollLeft);
  });

  test('category filter lane shows edge blur only on the scrollable side', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/places', { waitUntil: 'networkidle' });

    const categoryTrack = page.getByTestId('places-filter-track-category');
    const startEdge = page.getByTestId('places-filter-track-category-edge-start');
    const endEdge = page.getByTestId('places-filter-track-category-edge-end');

    await expect(categoryTrack).toBeVisible();
    await categoryTrack.scrollIntoViewIfNeeded();

    const metrics = await categoryTrack.evaluate(element => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));

    expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth);

    const readEdgeState = async () => ({
      start: await startEdge.evaluate(element => ({
        opacity: getComputedStyle(element).opacity,
        visibility: getComputedStyle(element).visibility,
      })),
      end: await endEdge.evaluate(element => ({
        opacity: getComputedStyle(element).opacity,
        visibility: getComputedStyle(element).visibility,
      })),
    });

    await expect
      .poll(readEdgeState)
      .toEqual({
        start: { opacity: '0', visibility: 'hidden' },
        end: { opacity: '1', visibility: 'visible' },
      });

    await categoryTrack.evaluate(element => {
      element.scrollLeft = (element.scrollWidth - element.clientWidth) / 2;
    });

    await expect
      .poll(readEdgeState)
      .toEqual({
        start: { opacity: '1', visibility: 'visible' },
        end: { opacity: '1', visibility: 'visible' },
      });

    await categoryTrack.evaluate(element => {
      element.scrollLeft = element.scrollWidth - element.clientWidth;
    });

    await expect
      .poll(readEdgeState)
      .toEqual({
        start: { opacity: '1', visibility: 'visible' },
        end: { opacity: '0', visibility: 'hidden' },
      });
  });
});

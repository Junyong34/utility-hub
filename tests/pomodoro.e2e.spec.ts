import { expect, test, type Page } from '@playwright/test';

async function resetPomodoroState(page: Page) {
  await page.goto('/tools/pomodoro');
  await page.evaluate(() => {
    window.localStorage.removeItem('zento:pomodoro');
  });
  await page.reload();
}

test.beforeEach(async ({ page }) => {
  await resetPomodoroState(page);
});

async function seedPomodoroRecord(page: Page) {
  await page.evaluate(() => {
    window.localStorage.setItem(
      'zento:pomodoro',
      JSON.stringify({
        version: 1,
        settings: {
          defaultFocusTime: 1500,
          soundEnabled: true,
          preferredMode: 'simple',
          theme: 'tomato',
        },
        activeSession: null,
        records: [
          {
            id: 'record-1',
            mode: 'simple',
            title: '기록 삭제 테스트',
            taskId: null,
            duration: 1500,
            completedAt: '2026-04-01T00:00:00.000Z',
          },
        ],
        tasks: [],
      })
    );
  });
  await page.reload();
}

test('quick start flow can start, pause, and reset a session', async ({
  page,
}) => {
  await expect(page.locator('body')).toContainText('시작 대기');
  await expect(page.locator('body')).toContainText('25:00');

  await page.getByRole('button', { name: '시작' }).click();

  await expect(page.locator('body')).toContainText('집중 중');
  await expect(page.getByRole('button', { name: '일시정지' })).toBeVisible();

  await page.getByRole('button', { name: '일시정지' }).click();

  await expect(page.locator('body')).toContainText('재개');
  await expect(page.getByRole('button', { name: '재개' })).toBeVisible();

  await page.getByRole('button', { name: '리셋' }).click();

  await expect(page.locator('body')).toContainText('시작 대기');
  await expect(page.locator('body')).toContainText('25:00');
});

test('simple duration input can be fully cleared and typed without snapping back', async ({
  page,
}) => {
  const durationInput = page.locator('#pomodoro-simple-duration');

  await durationInput.click();
  await durationInput.press('Meta+A');
  await durationInput.press('Backspace');
  await durationInput.type('2');

  await expect(durationInput).toHaveValue('2');
});

test('task mode preview reflects the selected task duration before starting', async ({
  page,
}) => {
  await page.getByRole('tab', { name: 'Task Mode' }).click();
  await page.getByPlaceholder('새 작업 제목').fill('문서 정리');
  await page.locator('input[type="number"]').first().fill('15');
  await page.getByRole('button', { name: '추가' }).click();

  await expect(page.locator('body')).toContainText('문서 정리');
  await expect(page.locator('body')).toContainText('15:00');
  await expect(page.locator('body')).toContainText('15분');
});

test('selected pomodoro theme persists after reload', async ({ page }) => {
  const visualThemeButton = page
    .locator('button')
    .filter({ hasText: 'Visual Timer' })
    .first();

  await visualThemeButton.click();
  await expect(page.locator('body')).toContainText('비주얼 타이머');

  await page.reload();

  await expect(page.locator('body')).toContainText('비주얼 타이머');
  await expect(visualThemeButton).toHaveAttribute('data-state', 'on');
});

test('theme copy and primary action styling follow the selected theme', async ({
  page,
}) => {
  await expect(page.locator('body')).toContainText('4가지 집중 화면');

  const startButton = page.getByRole('button', { name: '시작' });
  const tomatoStartBackground = await startButton.evaluate(element =>
    window.getComputedStyle(element).backgroundImage
  );

  await page.locator('button').filter({ hasText: 'Cozy Garden' }).first().click();
  await expect(page.locator('body')).toContainText('코지 가든');

  const gardenStartBackground = await startButton.evaluate(element =>
    window.getComputedStyle(element).backgroundImage
  );

  expect(gardenStartBackground).not.toBe(tomatoStartBackground);
});

test('garden theme separates timer information from the growth scene', async ({
  page,
}) => {
  await page.locator('button').filter({ hasText: 'Cozy Garden' }).first().click();

  const header = page.getByTestId('garden-timer-header');
  const scene = page.getByTestId('garden-growth-scene');

  await expect(header).toBeVisible();
  await expect(scene).toBeVisible();

  const headerBox = await header.boundingBox();
  const sceneBox = await scene.boundingBox();

  expect(headerBox).not.toBeNull();
  expect(sceneBox).not.toBeNull();
  expect(headerBox!.y + headerBox!.height).toBeLessThan(sceneBox!.y);
});

test('recent record can be deleted from the list', async ({ page }) => {
  await seedPomodoroRecord(page);

  await expect(page.locator('body')).toContainText('기록 삭제 테스트');
  await page.locator('button').filter({ hasText: '삭제' }).last().click();

  await expect(page.locator('body')).not.toContainText('기록 삭제 테스트');
  await expect(page.locator('body')).toContainText(
    '아직 완료한 기록이 없습니다.'
  );
});

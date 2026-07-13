import { expect, test } from '@playwright/test';
import { getAllToolConfigs } from '../../../lib/tools/tool-config.ts';

const tools = getAllToolConfigs();
const featuredToolIds = [
  'home-buying-funds-calculator',
  'savings-calculator',
  'dsr-calculator',
];
const featuredTools = featuredToolIds.flatMap(toolId => {
  const tool = tools.find(item => item.id === toolId);
  return tool ? [tool] : [];
});

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

test.describe('/tools', () => {
  test('renders hero, compact featured shortcuts, and all tool cards', async ({
    page,
  }) => {
    await page.goto('/tools', { waitUntil: 'networkidle' });

    await expect(
      page.getByRole('heading', { name: '필요한 계산과 비교를 찾아보세요' })
    ).toBeVisible();

    const featuredSection = page.getByLabel('주요 도구 바로가기');
    await expect(featuredSection).toBeVisible();
    await expect(
      featuredSection.getByRole('heading', { name: '바로 쓰는 도구' })
    ).toBeVisible();
    await expect(featuredSection.getByRole('link')).toHaveCount(3);
    await expect(featuredSection.getByText('사용하기')).toHaveCount(0);

    const allToolsSection = page
      .locator('section')
      .filter({ has: page.getByRole('heading', { name: '모든 도구' }) });
    await expect(allToolsSection.getByRole('link')).toHaveCount(tools.length);
  });

  test('featured and all tool links keep the public tool hrefs', async ({
    page,
  }) => {
    const firstFeaturedTool = featuredTools[0]!;
    const firstTool = tools[0]!;

    await page.goto('/tools', { waitUntil: 'networkidle' });

    await expect(
      page.getByLabel(`${firstFeaturedTool.name} 바로가기`)
    ).toHaveAttribute('href', `/tools/${firstFeaturedTool.id}`);

    const allToolsSection = page
      .locator('section')
      .filter({ has: page.getByRole('heading', { name: '모든 도구' }) });
    await expect(
      allToolsSection
        .getByRole('link', {
          name: new RegExp(escapeRegExp(firstTool.name)),
        })
        .first()
    ).toHaveAttribute('href', `/tools/${firstTool.id}`);
  });

  test('search hides featured shortcuts and narrows the tool list', async ({
    page,
  }) => {
    await page.goto('/tools', { waitUntil: 'networkidle' });

    await page.getByPlaceholder(/도구 검색/).fill('DSR');

    await expect(page.getByLabel('주요 도구 바로가기')).toHaveCount(0);
    await expect(
      page.getByRole('heading', { name: '검색 결과' })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: '필터 초기화' })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /DSR 계산기/ })).toBeVisible();
    await expect(
      page.getByRole('link', { name: /AI 로또 번호 추천/ })
    ).toHaveCount(0);
  });

  test('category filters keep count chips and update visible tools', async ({
    page,
  }) => {
    await page.goto('/tools', { waitUntil: 'networkidle' });

    await expect(
      page.getByRole('button', { name: /전체\s+\d+/ })
    ).toBeVisible();
    await page.getByRole('button', { name: /생성기\s+\d+/ }).click();

    await expect(page.getByLabel('주요 도구 바로가기')).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: /생성기\s+\d+/ })
    ).toHaveAttribute('aria-pressed', 'true');
    await expect(
      page.getByRole('link', { name: /AI 로또 번호 추천/ })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /DSR 계산기/ })).toHaveCount(0);
  });

  test('empty search state remains available after filtering', async ({
    page,
  }) => {
    await page.goto('/tools', { waitUntil: 'networkidle' });

    await page.getByPlaceholder(/도구 검색/).fill('존재하지않는도구');

    await expect(page.getByText('검색 결과가 없습니다')).toBeVisible();
    await expect(
      page.getByText('다른 검색어나 카테고리를 시도해 보세요.')
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: '전체 도구 보기' })
    ).toBeVisible();
  });
});

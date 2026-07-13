import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { ALL_BENEFITS } from '../../content/benefits/index.ts';
import { ALL_PLACES, PLACES_BY_REGION } from '../../content/places/index.ts';
import {
  buildLocalDraftHref,
  LOCAL_DRAFT_STORAGE_KEY,
} from '../../components/finance/input/localDraft.ts';
import {
  LOAN_QUERY_PARSERS,
  PREPAYMENT_QUERY_PARSERS,
  TAB_QUERY_PARSER,
} from '../../components/tools/loan-calculator/hooks/parsers.ts';
import {
  DEPOSIT_QUERY_PARSERS,
  INSTALLMENT_QUERY_PARSERS,
} from '../../components/tools/savings-calculator/hooks/parsers.ts';
import * as homeBuyingParsers from '../../components/tools/home-buying-funds-calculator/hooks/parsers.ts';
import { queryBlogPostsPage } from '../../lib/blog/pagination.ts';
import { getAllPosts, getCategoryName } from '../../lib/blog/posts.ts';
import { buildBlogPostUrl } from '../../lib/blog/url.ts';
import { FINANCE_PAGE_METADATA } from '../../lib/finance/metadata.ts';
import { buildFinanceHref } from '../../lib/finance/url-state.ts';
import {
  LOTTO_RECOMMEND_DEFAULTS,
  LOTTO_RECOMMEND_QUERY_KEYS,
} from '../../lib/lotto/types/recommendation.ts';
import {
  buildPlaceListSearchParams,
  DEFAULT_PLACES_PAGE_SIZE,
} from '../../lib/places/place-list-contract.ts';
import { queryPlaceList } from '../../lib/places/place-list-query.ts';
import {
  buildCustomOgImagePath,
  buildToolOgImagePath,
} from '../../lib/seo/og.ts';
import {
  collectSitemapEntries,
  collectStaticPageEntries,
} from '../../lib/seo/sitemap.ts';
import { getAllToolConfigs } from '../../lib/tools/tool-config.ts';
import {
  POMODORO_STORAGE_KEY,
  POMODORO_STORAGE_VERSION,
} from '../../lib/tools/pomodoro/storage.ts';

const REPOSITORY_ROOT = fileURLToPath(new URL('../..', import.meta.url));
const APP_ROOT = path.join(REPOSITORY_ROOT, 'app');

const EXPECTED_PUBLIC_APP_ROUTES = [
  '/',
  '/about',
  '/api/analytics/visitors',
  '/api/og/blog/[category]/[slug]',
  '/api/og/custom',
  '/api/og/tools/[toolId]',
  '/api/places',
  '/api/posts',
  '/benefits',
  '/blog',
  '/blog/[category]',
  '/blog/[category]/[slug]',
  '/faq',
  '/favicon.ico',
  '/finance',
  '/finance/assets',
  '/finance/debts',
  '/finance/expenses',
  '/finance/input',
  '/finance/investments',
  '/finance/projection',
  '/finance/reports',
  '/places',
  '/places/[region]',
  '/places/[region]/[placeId]',
  '/robots.txt',
  '/rss.xml',
  '/sitemap.xml',
  '/tools',
  '/tools/dsr-calculator',
  '/tools/home-buying-funds-calculator',
  '/tools/home-check',
  '/tools/last-digit-game',
  '/tools/loan-calculator',
  '/tools/lotto',
  '/tools/lotto/round/[round]',
  '/tools/lotto/stats',
  '/tools/og-image-studio',
  '/tools/pomodoro',
  '/tools/savings-calculator',
].sort();

const EXPECTED_TOOL_CONFIG_DIGESTS = {
  'loan-calculator':
    '68f9cf7006e80b6c771af3fe0d6b7d5c39f18bfbe583573cafc5cc0fddf6a5e6',
  'dsr-calculator':
    '89d41094b722889af9be9f94b6989f213104e2cc3fc992be9626c5ed4628ab66',
  'savings-calculator':
    '87d80f07b42ca7655565f1585d8777fc080a1370f9fc852f2a589ddc75177b83',
  lotto: '92e5f4f832a79f633ec610e670053cbf6d2b1dcf353c012da2580733d2facddf',
  'last-digit-game':
    'bd6f428030b1447e9186ff20ee9b8d151a3f08021dd7aaf3aec2d488d94d9851',
  pomodoro: '58086be8e8b66d2fbf0c8700ca6b7f7ccbd43413fc3a128563a2642f38b0260a',
  'home-buying-funds-calculator':
    '26276c5abb7b08d739f79baa2d41a5c65a5c5a0ebcae3784e0a88e1b90c1973f',
};

function listFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(directory, entry.name);

    return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
  });
}

function toPublicRoute(filePath) {
  const relativePath = path.relative(APP_ROOT, filePath).split(path.sep);
  const fileName = relativePath.pop();
  const routeSegments = relativePath.filter(
    segment => !(segment.startsWith('(') && segment.endsWith(')'))
  );

  if (fileName === 'favicon.ico') {
    return '/favicon.ico';
  }

  if (fileName === 'robots.ts') {
    return '/robots.txt';
  }

  if (fileName === 'sitemap.ts') {
    return '/sitemap.xml';
  }

  const route = `/${routeSegments.join('/')}`;
  return route === '/' ? route : route.replace(/\/$/, '');
}

function discoverPublicAppRoutes() {
  const routeFileNames = new Set([
    'favicon.ico',
    'page.tsx',
    'robots.ts',
    'route.ts',
    'sitemap.ts',
  ]);

  return listFiles(APP_ROOT)
    .filter(filePath => routeFileNames.has(path.basename(filePath)))
    .map(toPublicRoute)
    .sort();
}

function getToolSurface() {
  return getAllToolConfigs().map(({ id }) => ({
    id,
    href: `/tools/${id}`,
  }));
}

function getSerializableToolConfig(tool) {
  return {
    id: tool.id,
    name: tool.name,
    shortName: tool.shortName,
    breadcrumbLabel: tool.breadcrumbLabel,
    publishedAt: tool.publishedAt,
    description: tool.description,
    keywords: tool.keywords,
    category: tool.category,
    ogImage: tool.ogImage,
    badge: tool.badge,
    homeFeatured: tool.homeFeatured,
    color: tool.color,
    features: tool.features,
    useCases: tool.useCases,
    faq: tool.faq,
    howTo: tool.howTo,
    applicationCategory: tool.applicationCategory,
    estimatedTime: tool.estimatedTime,
    tools: tool.tools,
    relatedTools: tool.relatedTools,
  };
}

function sortSerializableValue(value) {
  if (Array.isArray(value)) {
    return value.map(sortSerializableValue);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, nestedValue]) => nestedValue !== undefined)
        .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
        .map(([key, nestedValue]) => [key, sortSerializableValue(nestedValue)])
    );
  }

  return value;
}

function digestSerializableValue(value) {
  return createHash('sha256')
    .update(JSON.stringify(sortSerializableValue(value)))
    .digest('hex');
}

function readRepositoryFile(relativePath) {
  return readFileSync(path.join(REPOSITORY_ROOT, relativePath), 'utf8');
}

function getExportedHttpMethods(relativePath) {
  return [
    ...readRepositoryFile(relativePath).matchAll(
      /export\s+(?:async\s+)?function\s+(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b/g
    ),
  ].map(([, method]) => method);
}

function getSearchParamKeys(relativePath) {
  const source = readRepositoryFile(relativePath);
  const directKeys = [
    ...source.matchAll(/searchParams\.get\(['"`]([^'"`]+)['"`]\)/g),
  ].map(([, key]) => key);
  const pickedKeys = [
    ...source.matchAll(/pickValue\(searchParams,\s*['"`]([^'"`]+)['"`]\)/g),
  ].map(([, key]) => key);

  return [...new Set([...directKeys, ...pickedKeys])].sort();
}

function getExplicitStatusCodes(relativePath) {
  return [
    ...new Set(
      [
        ...readRepositoryFile(relativePath).matchAll(/status:\s*(\d{3})\b/g),
      ].map(([, status]) => Number(status))
    ),
  ].sort((left, right) => left - right);
}

function getSuccessStatus(relativePath) {
  const source = readRepositoryFile(relativePath);
  const explicitSuccess = source.match(/status:\s*(2\d{2})\b/);

  if (explicitSuccess) {
    return Number(explicitSuccess[1]);
  }

  const usesDefaultResponseStatus =
    source.includes('return NextResponse.json(payload);') ||
    source.includes('return await createOgImageResponse(') ||
    source.includes('return new NextResponse(rssFeed,');

  assert.ok(
    usesDefaultResponseStatus,
    `${relativePath}의 성공 status 계약을 판별할 수 없습니다.`
  );
  return 200;
}

function assertSourceContains(relativePath, expectedSnippets) {
  const source = readRepositoryFile(relativePath);

  for (const snippet of expectedSnippets) {
    assert.ok(
      source.includes(snippet),
      `${relativePath} 공개 계약에서 다음 항목을 찾을 수 없습니다: ${snippet}`
    );
  }
}

function extractStringConstant(relativePath, constantName) {
  const source = readRepositoryFile(relativePath);
  const match = source.match(
    new RegExp(
      `(?:export\\s+)?const\\s+${constantName}\\s*=\\s*['\"\\x60]([^'\"\\x60]+)['\"\\x60]`
    )
  );

  assert.ok(
    match,
    `${relativePath}에서 ${constantName} 문자열 상수를 찾을 수 없습니다.`
  );
  return match[1];
}

function summarizeParserDefaults(parsers) {
  return Object.fromEntries(
    Object.entries(parsers).map(([key, parser]) => [key, parser.defaultValue])
  );
}

function extractStaticHrefs(filePath) {
  const source = readFileSync(filePath, 'utf8');
  return [...source.matchAll(/href\s*[:=]\s*['"`]([^'"`]+)['"`]/g)].map(
    ([, href]) => href
  );
}

test('공개 App Router 표면은 현재 URL 패턴을 유지한다', () => {
  assert.deepEqual(discoverPublicAppRoutes(), EXPECTED_PUBLIC_APP_ROUTES);
});

test('도구 catalog는 ID 순서와 metadata·FAQ·HowTo·OG 입력 shape를 유지한다', () => {
  const tools = getAllToolConfigs();
  const catalogSurface = tools.map(tool => ({
    id: tool.id,
    href: `/tools/${tool.id}`,
    name: tool.name,
    publishedAt: tool.publishedAt,
    category: tool.category,
    ogImage: tool.ogImage ?? null,
    badge: tool.badge ?? null,
    faqCount: tool.faq?.length ?? 0,
    howToCount: tool.howTo?.length ?? 0,
    applicationCategory: tool.applicationCategory ?? null,
    estimatedTime: tool.estimatedTime ?? null,
    relatedTools: tool.relatedTools ?? [],
  }));

  assert.deepEqual(catalogSurface, [
    {
      id: 'loan-calculator',
      href: '/tools/loan-calculator',
      name: '대출, 중도상환수수료 계산기',
      publishedAt: '2026-03-06',
      category: 'calculator',
      ogImage: '/og-images/post/loan-calc.webp',
      badge: null,
      faqCount: 9,
      howToCount: 6,
      applicationCategory: 'UtilityApplication',
      estimatedTime: 'PT1M',
      relatedTools: [],
    },
    {
      id: 'dsr-calculator',
      href: '/tools/dsr-calculator',
      name: 'DSR 계산기',
      publishedAt: '2026-03-12',
      category: 'calculator',
      ogImage: null,
      badge: 'NEW',
      faqCount: 6,
      howToCount: 5,
      applicationCategory: 'FinanceApplication',
      estimatedTime: 'PT2M',
      relatedTools: ['loan-calculator', 'savings-calculator'],
    },
    {
      id: 'savings-calculator',
      href: '/tools/savings-calculator',
      name: '예금, 적금 계산기',
      publishedAt: '2026-03-10',
      category: 'calculator',
      ogImage: '/og-images/post/savings-calc.webp',
      badge: null,
      faqCount: 10,
      howToCount: 8,
      applicationCategory: 'UtilityApplication',
      estimatedTime: 'PT1M',
      relatedTools: ['loan-calculator'],
    },
    {
      id: 'lotto',
      href: '/tools/lotto',
      name: 'AI 로또 번호 추천',
      publishedAt: '2026-03-05',
      category: 'generator',
      ogImage: '/og-images/post/tool-lotto.webp',
      badge: '인기',
      faqCount: 7,
      howToCount: 5,
      applicationCategory: 'UtilityApplication',
      estimatedTime: 'PT1M',
      relatedTools: [],
    },
    {
      id: 'last-digit-game',
      href: '/tools/last-digit-game',
      name: '랜덤 스톱워치 게임',
      publishedAt: '2026-03-20',
      category: 'other',
      ogImage: '/og-images/post/last-digit-game.webp',
      badge: 'NEW',
      faqCount: 5,
      howToCount: 5,
      applicationCategory: 'UtilityApplication',
      estimatedTime: 'PT2M',
      relatedTools: ['lotto'],
    },
    {
      id: 'pomodoro',
      href: '/tools/pomodoro',
      name: '뽀모도로 타이머',
      publishedAt: '2026-04-01',
      category: 'utility',
      ogImage: '/og-images/post/tool-pomodoro.webp',
      badge: 'NEW',
      faqCount: 4,
      howToCount: 4,
      applicationCategory: 'ProductivityApplication',
      estimatedTime: 'PT1M',
      relatedTools: ['last-digit-game'],
    },
    {
      id: 'home-buying-funds-calculator',
      href: '/tools/home-buying-funds-calculator',
      name: '주택 구입 비용 계산기',
      publishedAt: '2026-03-25',
      category: 'calculator',
      ogImage: '/og-images/post/home-buying-funds.webp',
      badge: '인기',
      faqCount: 6,
      howToCount: 5,
      applicationCategory: 'FinanceApplication',
      estimatedTime: 'PT3M',
      relatedTools: ['loan-calculator', 'dsr-calculator'],
    },
  ]);

  for (const tool of tools) {
    assert.ok(
      tool.description.length > 0,
      `${tool.id} description이 비어 있습니다.`
    );
    assert.ok(tool.keywords.length > 0, `${tool.id} keywords가 비어 있습니다.`);
    assert.ok(
      tool.faq?.every(
        item =>
          typeof item.question === 'string' && typeof item.answer === 'string'
      ),
      `${tool.id} FAQ 공개 shape가 question/answer 계약과 다릅니다.`
    );
    assert.ok(
      tool.howTo?.every(
        step => typeof step.name === 'string' && typeof step.text === 'string'
      ),
      `${tool.id} HowTo 공개 shape가 name/text 계약과 다릅니다.`
    );
    assert.equal(
      digestSerializableValue(getSerializableToolConfig(tool)),
      EXPECTED_TOOL_CONFIG_DIGESTS[tool.id],
      `${tool.id} 공개 config 값(metadata/keywords/FAQ/HowTo/OG input)이 변경됐습니다.`
    );
  }
});

test('모든 현재 blog category 디렉터리는 명시적 표시 이름을 갖는다', () => {
  const postsRoot = path.join(REPOSITORY_ROOT, 'content/posts');
  const categories = readdirSync(postsRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();

  assert.deepEqual(
    categories.map(slug => ({ slug, name: getCategoryName(slug) })),
    [
      { slug: 'ai-image-creator', name: 'AI' },
      { slug: 'benefits', name: '혜택·지원금' },
      { slug: 'consumer', name: '소비자 정보' },
      { slug: 'investment', name: '투자' },
      { slug: 'lotto', name: '로또' },
      { slug: 'parenting', name: '육아' },
      { slug: 'parking', name: '주차' },
      { slug: 'places', name: '아이와 갈 곳' },
    ]
  );
});

test('places와 benefits content entry는 공개 집계 결과를 제공한다', () => {
  assert.deepEqual(
    {
      placeRegions: Object.keys(PLACES_BY_REGION),
      hasPlaces: ALL_PLACES.length > 0,
      hasBenefits: ALL_BENEFITS.length > 0,
    },
    {
      placeRegions: ['seoul', 'gyeonggi-south', 'gyeonggi-north', 'incheon'],
      hasPlaces: true,
      hasBenefits: true,
    }
  );
});

test('Places API는 GET 200/500·query·기본값·DTO 계약을 유지한다', () => {
  const routePath = 'app/api/places/route.ts';
  const defaultPayload = queryPlaceList();
  const normalizedDefaultPayload = queryPlaceList({
    page: '0',
    limit: 'invalid',
    region: 'unknown',
    search: '   ',
    age: 'unknown',
    category: 'unknown',
    theme: 'unknown',
    season: 'unknown',
    indoor: '0',
    outdoor: 'false',
    free: 'no',
    feeding: null,
    stroller: undefined,
    rain: '',
  });
  const serializedQuery = buildPlaceListSearchParams({
    page: 2,
    limit: 9,
    region: 'seoul',
    filters: {
      search: '  어린이  ',
      age: '3-6y',
      category: 'museum',
      theme: 'animal',
      season: 'summer',
      indoor: true,
      outdoor: true,
      free: true,
      feeding: true,
      stroller: true,
      rain: true,
    },
  });

  assert.deepEqual(
    {
      methods: getExportedHttpMethods(routePath),
      queryKeys: getSearchParamKeys(routePath),
      successStatus: getSuccessStatus(routePath),
      explicitStatuses: getExplicitStatusCodes(routePath),
    },
    {
      methods: ['GET'],
      queryKeys: [
        'age',
        'category',
        'feeding',
        'free',
        'indoor',
        'limit',
        'outdoor',
        'page',
        'rain',
        'region',
        'search',
        'season',
        'stroller',
        'theme',
      ],
      successStatus: 200,
      explicitStatuses: [500],
    }
  );
  assert.deepEqual(Object.keys(defaultPayload), [
    'places',
    'hasMore',
    'total',
    'scopeTotal',
    'currentPage',
    'totalPages',
    'pageSize',
    'region',
    'filters',
  ]);
  assert.deepEqual(
    {
      currentPage: normalizedDefaultPayload.currentPage,
      pageSize: normalizedDefaultPayload.pageSize,
      region: normalizedDefaultPayload.region,
      filters: normalizedDefaultPayload.filters,
    },
    {
      currentPage: 1,
      pageSize: DEFAULT_PLACES_PAGE_SIZE,
      region: null,
      filters: {
        search: null,
        age: null,
        category: null,
        theme: null,
        season: null,
        indoor: false,
        outdoor: false,
        free: false,
        feeding: false,
        stroller: false,
        rain: false,
      },
    }
  );
  assert.equal(defaultPayload.places.length, DEFAULT_PLACES_PAGE_SIZE);
  assert.ok(
    defaultPayload.places.every(
      place =>
        typeof place.id === 'string' &&
        typeof place.name === 'string' &&
        typeof place.region === 'string' &&
        typeof place.category === 'string' &&
        Array.isArray(place.ageBands) &&
        Array.isArray(place.seasons)
    ),
    'Places API의 place DTO 필수 필드 shape가 변경됐습니다.'
  );
  assert.equal(
    serializedQuery.toString(),
    'page=2&limit=9&region=seoul&search=%EC%96%B4%EB%A6%B0%EC%9D%B4&age=3-6y&category=museum&theme=animal&season=summer&indoor=true&outdoor=true&free=true&feeding=true&stroller=true&rain=true'
  );
  assertSourceContains(routePath, [
    'return NextResponse.json(payload);',
    "{ error: 'Failed to fetch places' }",
  ]);
  assert.doesNotMatch(
    readRepositoryFile(routePath),
    /Cache-Control/i,
    'Places route는 현재 명시적 Cache-Control을 선언하지 않습니다.'
  );
});

test('Posts API는 GET 200/500·query·20개 기본 페이지·DTO 계약을 유지한다', () => {
  const routePath = 'app/api/posts/route.ts';
  const payload = queryBlogPostsPage(getAllPosts());

  assert.deepEqual(
    {
      methods: getExportedHttpMethods(routePath),
      queryKeys: getSearchParamKeys(routePath),
      successStatus: getSuccessStatus(routePath),
      explicitStatuses: getExplicitStatusCodes(routePath),
    },
    {
      methods: ['GET'],
      queryKeys: ['category', 'limit', 'page', 'search'],
      successStatus: 200,
      explicitStatuses: [500],
    }
  );
  assert.deepEqual(Object.keys(payload), [
    'posts',
    'hasMore',
    'total',
    'currentPage',
    'totalPages',
  ]);
  assert.deepEqual(
    {
      currentPage: payload.currentPage,
      postsPerPage: payload.posts.length,
    },
    { currentPage: 1, postsPerPage: 20 }
  );
  assert.ok(
    payload.posts.every(
      post =>
        typeof post.slug === 'string' &&
        typeof post.title === 'string' &&
        typeof post.categorySlug === 'string' &&
        Array.isArray(post.tags)
    ),
    'Posts API의 post summary DTO 필수 필드 shape가 변경됐습니다.'
  );
  assertSourceContains(routePath, [
    "searchParams.get('page') || '1'",
    "searchParams.get('limit') || '20'",
    'return NextResponse.json(payload);',
    "{ error: 'Failed to fetch posts' }",
  ]);
  assert.doesNotMatch(
    readRepositoryFile(routePath),
    /Cache-Control/i,
    'Posts route는 현재 명시적 Cache-Control을 선언하지 않습니다.'
  );
});

test('Analytics API는 Node GET의 200/503 JSON·cache 계약을 유지한다', () => {
  const routePath = 'app/api/analytics/visitors/route.ts';

  assert.deepEqual(
    {
      methods: getExportedHttpMethods(routePath),
      queryKeys: getSearchParamKeys(routePath),
      successStatus: getSuccessStatus(routePath),
      explicitStatuses: getExplicitStatusCodes(routePath),
    },
    {
      methods: ['GET'],
      queryKeys: [],
      successStatus: 200,
      explicitStatuses: [200, 503],
    }
  );
  assertSourceContains(routePath, [
    "export const runtime = 'nodejs'",
    "export const dynamic = 'force-dynamic'",
    "'Cache-Control': VISITOR_CACHE_CONTROL_HEADER",
    'ok: true',
    'data: result.data',
    'stale: result.stale',
    'cacheTtlSeconds: CACHE_TTL_SECONDS',
    'ok: false',
    "errorCode: 'GA_UNAVAILABLE'",
    "message: 'Visitor analytics data is currently unavailable'",
  ]);
  assertSourceContains('lib/analytics/ga4.ts', [
    'const CACHE_TTL_MS = 10 * 60 * 1000',
    "'public, s-maxage=600, stale-while-revalidate=300'",
  ]);
});

test('OG API는 GET 200/404·query·기본 model·cache 계약을 유지한다', () => {
  const customRoute = 'app/api/og/custom/route.ts';
  const toolRoute = 'app/api/og/tools/[toolId]/route.ts';
  const blogRoute = 'app/api/og/blog/[category]/[slug]/route.ts';
  const fullCustomPath = buildCustomOgImagePath({
    title: '공개 계약',
    description: 'OG 설명',
    image: '/images/contract.png',
    bgColor: '#fffdf8',
    accentColor: '#ff6a00',
    label: 'CONTRACT',
    themePreset: 'cream',
    layoutVariant: 'custom-studio',
    mascotEnabled: false,
    format: 'webp',
    download: true,
  });

  assert.deepEqual(
    {
      customMethods: getExportedHttpMethods(customRoute),
      customQueryKeys: getSearchParamKeys(customRoute),
      customSuccessStatus: getSuccessStatus(customRoute),
      customStatuses: getExplicitStatusCodes(customRoute),
      toolMethods: getExportedHttpMethods(toolRoute),
      toolSuccessStatus: getSuccessStatus(toolRoute),
      toolStatuses: getExplicitStatusCodes(toolRoute),
      blogMethods: getExportedHttpMethods(blogRoute),
      blogSuccessStatus: getSuccessStatus(blogRoute),
      blogStatuses: getExplicitStatusCodes(blogRoute),
    },
    {
      customMethods: ['GET'],
      customQueryKeys: [
        'accentColor',
        'bgColor',
        'description',
        'download',
        'format',
        'image',
        'label',
        'layoutVariant',
        'mascotEnabled',
        'themePreset',
        'title',
      ],
      customSuccessStatus: 200,
      customStatuses: [],
      toolMethods: ['GET'],
      toolSuccessStatus: 200,
      toolStatuses: [404],
      blogMethods: ['GET'],
      blogSuccessStatus: 200,
      blogStatuses: [404],
    }
  );
  assert.equal(
    fullCustomPath,
    '/api/og/custom?title=%EA%B3%B5%EA%B0%9C+%EA%B3%84%EC%95%BD&description=OG+%EC%84%A4%EB%AA%85&image=%2Fimages%2Fcontract.png&bgColor=%23fffdf8&accentColor=%23ff6a00&label=CONTRACT&themePreset=cream&layoutVariant=custom-studio&mascotEnabled=0&format=webp&download=1'
  );
  assert.equal(
    buildToolOgImagePath('loan calculator'),
    '/api/og/tools/loan%20calculator'
  );
  assertSourceContains(customRoute, [
    "export const runtime = 'nodejs'",
    "title: pickValue(searchParams, 'title') || 'Zento OG Image'",
    "label: pickValue(searchParams, 'label') || 'GUIDE'",
    "themePreset: themePreset ?? 'cream'",
    "layoutVariant: layoutVariant ?? 'play-card'",
    "const mascotEnabled = searchParams.get('mascotEnabled') !== '0'",
    "`custom-og-image.${format ?? 'png'}`",
  ]);
  assertSourceContains(toolRoute, [
    "return new Response('Tool not found'",
    'title: tool.name',
    'description: tool.description',
    "label: tool.badge || 'TOOL'",
    'footerText: `zento.kr/tools/${tool.id}`',
    "layoutVariant: 'tool-card'",
    'mascotEnabled: true',
  ]);
  assertSourceContains(blogRoute, [
    "return new Response('Post not found'",
    'title: post.title',
    'description: post.excerpt',
    'label: post.category',
    'footerText: `zento.kr/blog/${post.categorySlug}`',
    "layoutVariant: 'play-card'",
    'mascotEnabled: true',
  ]);
  assertSourceContains('lib/seo/og-renderer.tsx', [
    "'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'",
    "const format = responseOptions.format ?? 'png'",
  ]);
});

test('robots·sitemap·RSS는 공개 SEO와 feed 계약을 유지한다', () => {
  const robotsRoute = 'app/robots.ts';
  const rssRoute = 'app/rss.xml/route.ts';
  const staticSitemapPaths = collectStaticPageEntries().map(
    entry => new URL(entry.url).pathname
  );
  const sitemapBlogPostPaths = collectSitemapEntries()
    .map(entry => new URL(entry.url).pathname)
    .filter(
      pathname =>
        pathname.split('/').length === 4 && pathname.startsWith('/blog/')
    )
    .sort();
  const rssBlogPostPaths = getAllPosts()
    .map(
      post =>
        new URL(
          buildBlogPostUrl('https://www.zento.kr', {
            categorySlug: post.categorySlug,
            slug: post.slug,
          })
        ).pathname
    )
    .sort();

  assert.deepEqual(staticSitemapPaths, [
    '/',
    '/blog',
    '/places',
    '/benefits',
    '/tools',
    '/about',
    '/faq',
  ]);
  assert.deepEqual(sitemapBlogPostPaths, rssBlogPostPaths);
  assertSourceContains(robotsRoute, [
    "userAgent: '*'",
    "'/api/'",
    "'/_next/'",
    "'/admin/'",
    "'/private/'",
    "'GPTBot'",
    "'ChatGPT-User'",
    "'PerplexityBot'",
    "'ClaudeBot'",
    "'anthropic-ai'",
    'sitemap: `${baseUrl}/sitemap.xml`',
  ]);
  assert.deepEqual(
    {
      methods: getExportedHttpMethods(rssRoute),
      successStatus: getSuccessStatus(rssRoute),
    },
    { methods: ['GET'], successStatus: 200 }
  );
  assertSourceContains(rssRoute, [
    "'Content-Type': 'application/xml'",
    "'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate'",
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    'buildBlogPostUrl(SITE_CONFIG.url',
    'rel="self" type="application/rss+xml"',
  ]);
});

test('Finance는 noindex metadata를 공유하고 nav·tool·sitemap에 노출되지 않는다', () => {
  const publicRoutes = discoverPublicAppRoutes();
  const financeRoutes = publicRoutes.filter(
    route => route === '/finance' || route.startsWith('/finance/')
  );
  const financePageFiles = listFiles(path.join(APP_ROOT, 'finance'))
    .filter(filePath => path.basename(filePath) === 'page.tsx')
    .sort();
  const navigationHrefs = [
    ...extractStaticHrefs(
      path.join(REPOSITORY_ROOT, 'components/layout/nav-config.ts')
    ),
    ...extractStaticHrefs(
      path.join(REPOSITORY_ROOT, 'components/layout/site-footer.tsx')
    ),
  ];
  const sitemapPaths = collectSitemapEntries().map(
    entry => new URL(entry.url).pathname
  );

  assert.deepEqual(
    {
      routes: financeRoutes,
      navExposure: navigationHrefs.filter(href => href.startsWith('/finance')),
      toolCatalogExposure: getToolSurface().filter(({ href }) =>
        href.startsWith('/finance')
      ),
      sitemapExposure: sitemapPaths.filter(
        href => href === '/finance' || href.startsWith('/finance/')
      ),
      metadata: {
        title: FINANCE_PAGE_METADATA.title,
        description: FINANCE_PAGE_METADATA.description,
        robots: FINANCE_PAGE_METADATA.robots,
        canonical: FINANCE_PAGE_METADATA.alternates?.canonical ?? null,
        openGraph: FINANCE_PAGE_METADATA.openGraph ?? null,
      },
      pagesUsingPrivateMetadata: financePageFiles
        .map(filePath => ({
          route: toPublicRoute(filePath),
          usesFinanceMetadata: readFileSync(filePath, 'utf8').includes(
            'export const metadata: Metadata = FINANCE_PAGE_METADATA;'
          ),
        }))
        .sort((left, right) => left.route.localeCompare(right.route)),
    },
    {
      routes: [
        '/finance',
        '/finance/assets',
        '/finance/debts',
        '/finance/expenses',
        '/finance/input',
        '/finance/investments',
        '/finance/projection',
        '/finance/reports',
      ],
      navExposure: [],
      toolCatalogExposure: [],
      sitemapExposure: [],
      metadata: {
        title: 'Finance Workspace',
        description: '개인용 재무 워크스페이스',
        robots: {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        },
        canonical: null,
        openGraph: null,
      },
      pagesUsingPrivateMetadata: [
        { route: '/finance', usesFinanceMetadata: true },
        { route: '/finance/assets', usesFinanceMetadata: true },
        { route: '/finance/debts', usesFinanceMetadata: true },
        { route: '/finance/expenses', usesFinanceMetadata: true },
        { route: '/finance/input', usesFinanceMetadata: true },
        { route: '/finance/investments', usesFinanceMetadata: true },
        { route: '/finance/projection', usesFinanceMetadata: true },
        { route: '/finance/reports', usesFinanceMetadata: true },
      ],
    }
  );
});

test('공유 URL query key와 기본값은 현재 직렬화 계약을 유지한다', () => {
  const homeBuyingBindings = {
    salePrice: 'salePriceParser',
    loanAmount: 'loanAmountParser',
    currentCash: 'currentCashParser',
    downPaymentRatio: 'downPaymentRatioParser',
    hasDefenseFund: 'hasDefenseFundParser',
    hasDownPaymentPaid: 'hasDownPaymentPaidParser',
    isAdjustedArea: 'isAdjustedAreaParser',
    houseCount: 'houseCountParser',
    isOver85m2: 'isOver85m2Parser',
    isFirstTime: 'isFirstTimeParser',
    isTempTwoHouse: 'isTempTwoHouseParser',
    standardPrice: 'standardPriceParser',
    regionalType: 'regionalTypeParser',
    brokerageFeePreset: 'brokerageFeePresetParser',
    lawyerFeePreset: 'lawyerFeePresetParser',
    cleaningFeePreset: 'cleaningFeePresetParser',
    movingFeePreset: 'movingFeePresetParser',
    interiorFeePreset: 'interiorFeePresetParser',
    manualAcquisitionTax: 'manualAcquisitionTaxParser',
    manualLocalEducationTax: 'manualLocalEducationTaxParser',
    manualRuralSpecialTax: 'manualRuralSpecialTaxParser',
    manualRegistrationTax: 'manualRegistrationTaxParser',
    manualNationalHousingBond: 'manualNationalHousingBondParser',
    manualBrokerageFee: 'manualBrokerageFeeParser',
    manualLawyerFee: 'manualLawyerFeeParser',
    manualManagementDeposit: 'manualManagementDepositParser',
    manualCleaningFee: 'manualCleaningFeeParser',
    manualMovingFee: 'manualMovingFeeParser',
    manualInteriorFee: 'manualInteriorFeeParser',
    manualDefenseFundAmount: 'manualDefenseFundAmountParser',
    contingencyRatio: 'contingencyRatioParser',
  };

  assert.deepEqual(
    {
      loan: summarizeParserDefaults(LOAN_QUERY_PARSERS),
      prepayment: summarizeParserDefaults(PREPAYMENT_QUERY_PARSERS),
      loanTab: summarizeParserDefaults(TAB_QUERY_PARSER),
      deposit: summarizeParserDefaults(DEPOSIT_QUERY_PARSERS),
      installment: summarizeParserDefaults(INSTALLMENT_QUERY_PARSERS),
      lottoKeys: LOTTO_RECOMMEND_QUERY_KEYS,
      lottoDefaults: LOTTO_RECOMMEND_DEFAULTS,
      financeUrls: {
        defaultComparison: buildFinanceHref('/finance', {
          month: '2026-07',
          compare: 'half',
        }),
        explicitComparison: buildFinanceHref('/finance', {
          month: '2026-07',
          compare: 'year',
        }),
        localDraft: buildLocalDraftHref('2026-07'),
      },
      homeBuyingDefaults: {
        salePrice: homeBuyingParsers.salePriceParser.defaultValue,
        loanAmount: homeBuyingParsers.loanAmountParser.defaultValue,
        currentCash: homeBuyingParsers.currentCashParser.defaultValue,
        downPaymentRatio: homeBuyingParsers.downPaymentRatioParser.defaultValue,
        hasDefenseFund: homeBuyingParsers.hasDefenseFundParser.defaultValue,
        hasDownPaymentPaid:
          homeBuyingParsers.hasDownPaymentPaidParser.defaultValue,
        regionalType: homeBuyingParsers.regionalTypeParser.defaultValue,
        brokerageFeePreset:
          homeBuyingParsers.brokerageFeePresetParser.defaultValue,
        cleaningFeePreset:
          homeBuyingParsers.cleaningFeePresetParser.defaultValue,
        movingFeePreset: homeBuyingParsers.movingFeePresetParser.defaultValue,
        interiorFeePreset:
          homeBuyingParsers.interiorFeePresetParser.defaultValue,
        contingencyRatio: homeBuyingParsers.contingencyRatioParser.defaultValue,
      },
    },
    {
      loan: {
        principal: 0,
        rate: 0,
        term: 0,
        termMode: undefined,
        method: 'equal-payment',
      },
      prepayment: {
        amount: 0,
        feeRate: 0,
        loanDate: undefined,
        repaymentDate: undefined,
        maturityDate: undefined,
        exemptionYears: 0,
      },
      loanTab: { tab: 'loan-calculator' },
      deposit: {
        amount: 0,
        period: 0,
        periodMode: undefined,
        rate: 0,
        interestType: 'simple',
        taxType: 'general',
        customTaxRate: 9.5,
      },
      installment: {
        monthly: 0,
        period: 0,
        periodMode: undefined,
        rate: 0,
        interestType: 'simple',
        taxType: 'general',
        customTaxRate: 9.5,
      },
      lottoKeys: {
        mode: 'mode',
        count: 'count',
        numbers: 'numbers',
      },
      lottoDefaults: {
        mode: 'stats',
        count: 5,
      },
      financeUrls: {
        defaultComparison: '/finance?month=2026-07',
        explicitComparison: '/finance?month=2026-07&compare=year',
        localDraft: '/finance/input?month=2026-07&local=1',
      },
      homeBuyingDefaults: {
        salePrice: 0,
        loanAmount: 0,
        currentCash: 0,
        downPaymentRatio: 10,
        hasDefenseFund: false,
        hasDownPaymentPaid: false,
        regionalType: 'seoul',
        brokerageFeePreset: 'auto',
        cleaningFeePreset: 'none',
        movingFeePreset: 'small',
        interiorFeePreset: 'none',
        contingencyRatio: 5,
      },
    }
  );

  assertSourceContains(
    'components/tools/home-buying-funds-calculator/hooks/useHomeBuyingFundsCalculator.ts',
    Object.entries(homeBuyingBindings).map(
      ([queryKey, parserName]) => `${queryKey}: ${parserName}`
    )
  );
  assertSourceContains('components/tools/dsr-calculator/hooks/parsers.ts', [
    'income: parseAsInteger.withDefault(0)',
    "policy: parseAsStringLiteral(POLICY_VERSIONS).withDefault('2026-h1')",
    'calculated: parseAsBoolean.withDefault(false)',
    'newLoan: newLoanParser.withDefault(createDefaultNewLoan())',
    'existingLoans: existingLoansParser.withDefault([])',
  ]);
  assertSourceContains(
    'components/tools/moving-budget-checklist/hooks/parsers.ts',
    [
      'mba: assetsParser',
      'mbt: templateItemsParser',
      'mbc: checklistProgressParser',
      'mbx: customItemsParser',
    ]
  );
});

test('LocalStorage key와 schema version은 사용자 저장 상태 계약을 유지한다', () => {
  assert.deepEqual(
    {
      financeLocalDraft: LOCAL_DRAFT_STORAGE_KEY,
      pomodoro: POMODORO_STORAGE_KEY,
      pomodoroVersion: POMODORO_STORAGE_VERSION,
      lottoWeeklyPick: extractStringConstant(
        'components/lotto/LottoRecommend/LottoRecommendProvider.tsx',
        'WEEKLY_PICK_STORAGE_KEY'
      ),
    },
    {
      financeLocalDraft: 'zento-finance-input-local-draft-v1',
      pomodoro: 'zento:pomodoro',
      pomodoroVersion: 1,
      lottoWeeklyPick: 'lotto-weekly-pick',
    }
  );
});

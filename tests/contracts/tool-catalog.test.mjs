import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  TOOL_CONFIGS,
  TOOL_MANIFESTS,
  getAllToolConfigs,
  getToolConfig,
  listToolNavigationItems,
} from '../../modules/tools/catalog/public.ts';
import {
  generateToolMetadata,
  getToolStructuredDataArray,
} from '../../modules/tools/catalog/server.ts';
import {
  getToolBreadcrumbItems,
  getToolStructuredDataBreadcrumbs,
} from '../../modules/tools/catalog/public.ts';
import { collectToolEntries } from '../../lib/seo/sitemap.ts';
import * as legacyToolExports from '../../lib/tools/index.ts';

const REPOSITORY_ROOT = fileURLToPath(new URL('../..', import.meta.url));

const EXPECTED_TOOL_IDS = [
  'loan-calculator',
  'dsr-calculator',
  'savings-calculator',
  'lotto',
  'last-digit-game',
  'pomodoro',
  'home-buying-funds-calculator',
];

const EXPECTED_MANIFEST_DIGESTS = {
  'loan-calculator':
    'b68f5aff1cd27bfcf38f2aaea954ab5d04b3db1fcacbeba2260eb0f1a5336a46',
  'dsr-calculator':
    '52fae31aa37dcb5aac1ab23c08fe837611205e6be1759f168535e2152f70b3eb',
  'savings-calculator':
    '192c0e8b2d9c11c95b0bff27e8acb1a9ff81cd519110ccb5d58debd26941a587',
  lotto: '0c7ce7d963a68ba161c1060af4648747e0a095c75ff882cc79068dc5d98e14c5',
  'last-digit-game':
    '9d2d945dd153070174189494110bc13f775de3b748b88d32ecedc814a952f42f',
  pomodoro: '13b2526d85708311b7d1392ed9f3866e4b32c388d10dab5ebc85b688dd60cd3d',
  'home-buying-funds-calculator':
    '426f47ba6da600e71b4dddc2f3bb86068211adb4902ef43a88cb2ca764aaf58a',
};

const EXPECTED_LEGACY_RUNTIME_EXPORTS = [
  'TOOLS_MAIN_LABEL',
  'TOOLS_MAIN_URL',
  'TOOL_CONFIGS',
  'assertToolStructuredData',
  'clearIconCache',
  'createToolApplicationSchema',
  'createToolStructuredData',
  'createToolSubPageStructuredData',
  'createToolsMainStructuredData',
  'generateToolMetadata',
  'generateToolsMainMetadata',
  'getAllToolConfigs',
  'getAvailableIcons',
  'getToolBreadcrumbItems',
  'getToolConfig',
  'getToolCount',
  'getToolIcon',
  'getToolIcons',
  'getToolShareText',
  'getToolStructuredDataArray',
  'getToolStructuredDataBreadcrumbs',
  'getToolSubPageStructuredDataArray',
  'getToolTitle',
  'getToolUrl',
  'getToolsByCategory',
  'getToolsMainBreadcrumbItems',
  'getToolsMainStructuredDataArray',
  'isValidIcon',
  'isValidToolId',
  'validateToolStructuredData',
].sort();

const EXPECTED_LEGACY_TYPE_EXPORTS = [
  'ToolCategory',
  'ToolConfig',
  'ToolFAQItem',
  'ToolHowToStep',
  'ToolListItem',
].sort();

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

function digest(value) {
  return createHash('sha256')
    .update(JSON.stringify(sortSerializableValue(value)))
    .digest('hex');
}

test('catalog 공개 인터페이스는 manifest 전체 값과 등록 순서를 유지한다', () => {
  assert.deepEqual(
    TOOL_MANIFESTS.map(manifest => manifest.id),
    EXPECTED_TOOL_IDS
  );
  assert.deepEqual(Object.keys(TOOL_CONFIGS), EXPECTED_TOOL_IDS);
  assert.deepEqual(
    Object.fromEntries(
      getAllToolConfigs().map(manifest => [manifest.id, digest(manifest)])
    ),
    EXPECTED_MANIFEST_DIGESTS
  );

  for (const manifest of TOOL_MANIFESTS) {
    assert.equal(TOOL_CONFIGS[manifest.id], manifest);
    assert.equal(getToolConfig(manifest.id), manifest);
  }

  assert.equal(getToolConfig('missing-tool'), null);
});

test('legacy tools index는 기존 35개 named export와 Node ESM 경로를 유지한다', () => {
  assert.deepEqual(
    Object.keys(legacyToolExports).sort(),
    EXPECTED_LEGACY_RUNTIME_EXPORTS
  );

  const indexSource = readFileSync(
    path.join(REPOSITORY_ROOT, 'lib/tools/index.ts'),
    'utf8'
  );
  const typeExportBlock = indexSource.match(
    /export\s+type\s*\{([^}]+)\}\s*from\s*['"]\.\/types\.ts['"]/
  );

  assert.ok(typeExportBlock);
  assert.deepEqual(
    typeExportBlock[1]
      .split(',')
      .map(name => name.trim())
      .filter(Boolean)
      .sort(),
    EXPECTED_LEGACY_TYPE_EXPORTS
  );
  assert.equal(
    [...indexSource.matchAll(/from\s*['"](\.\/[^'"]+)['"]/g)].every(
      ([, specifier]) => specifier.endsWith('.ts')
    ),
    true
  );
});

test('catalog 등록은 유일한 공개 route와 존재하는 related tool만 가리킨다', () => {
  const ids = TOOL_MANIFESTS.map(manifest => manifest.id);
  const idSet = new Set(ids);

  assert.equal(idSet.size, ids.length);

  for (const manifest of TOOL_MANIFESTS) {
    assert.equal(
      existsSync(
        path.join(REPOSITORY_ROOT, 'app', 'tools', manifest.id, 'page.tsx')
      ),
      true,
      `${manifest.id} 공개 route가 없습니다.`
    );

    for (const relatedToolId of manifest.relatedTools ?? []) {
      assert.equal(
        idSet.has(relatedToolId),
        true,
        `${manifest.id}의 related tool ${relatedToolId}가 등록되지 않았습니다.`
      );
    }
  }

  assert.deepEqual(
    collectToolEntries().map(entry => new URL(entry.url).pathname),
    [...EXPECTED_TOOL_IDS.map(id => `/tools/${id}`), '/tools/lotto/stats']
  );
});

test('client navigation DTO는 전체 FAQ와 HowTo를 노출하지 않는다', () => {
  assert.deepEqual(listToolNavigationItems(), [
    {
      id: 'loan-calculator',
      name: '대출, 중도상환수수료 계산기',
      shortName: '대출, 중도상환수수료 계산기',
      category: 'calculator',
      href: '/tools/loan-calculator',
    },
    {
      id: 'dsr-calculator',
      name: 'DSR 계산기',
      shortName: 'DSR 계산기',
      category: 'calculator',
      href: '/tools/dsr-calculator',
    },
    {
      id: 'savings-calculator',
      name: '예금, 적금 계산기',
      shortName: '예금·적금 계산기',
      category: 'calculator',
      href: '/tools/savings-calculator',
    },
    {
      id: 'lotto',
      name: 'AI 로또 번호 추천',
      shortName: '로또',
      category: 'generator',
      href: '/tools/lotto',
    },
    {
      id: 'last-digit-game',
      name: '랜덤 스톱워치 게임',
      shortName: '랜덤 스톱워치 게임',
      category: 'other',
      href: '/tools/last-digit-game',
    },
    {
      id: 'pomodoro',
      name: '뽀모도로 타이머',
      shortName: '뽀모도로 타이머',
      category: 'utility',
      href: '/tools/pomodoro',
    },
    {
      id: 'home-buying-funds-calculator',
      name: '주택 구입 비용 계산기',
      shortName: '주택 구입 비용 계산기',
      category: 'calculator',
      href: '/tools/home-buying-funds-calculator',
    },
  ]);
});

test('tool metadata는 canonical과 정적 또는 동적 OG 정책을 유지한다', () => {
  const loan = generateToolMetadata('loan-calculator');
  const dsr = generateToolMetadata('dsr-calculator');

  assert.deepEqual(
    {
      title: loan.title,
      canonical: loan.alternates?.canonical,
      openGraphImage: loan.openGraph?.images,
      twitterImage: loan.twitter?.images,
      robots: loan.robots,
    },
    {
      title: {
        default: '대출, 중도상환수수료 계산기',
        template: '%s | Zento',
      },
      canonical: 'https://www.zento.kr/tools/loan-calculator',
      openGraphImage: [
        {
          url: 'https://www.zento.kr/og-images/post/loan-calc.webp',
          width: 1200,
          height: 630,
          alt: '대출, 중도상환수수료 계산기',
        },
      ],
      twitterImage: ['https://www.zento.kr/og-images/post/loan-calc.webp'],
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  );

  assert.deepEqual(dsr.openGraph?.images, [
    {
      url: 'https://www.zento.kr/api/og/tools/dsr-calculator',
      width: 1200,
      height: 630,
      alt: 'DSR 계산기',
    },
  ]);
  assert.throws(
    () => generateToolMetadata('missing-tool'),
    /Tool configuration not found: missing-tool/
  );
});

test('tool JSON-LD와 breadcrumb는 공개 schema 및 fallback을 유지한다', () => {
  const structuredData = getToolStructuredDataArray('dsr-calculator');
  const application = structuredData.find(
    item => item['@type'] === 'WebApplication'
  );
  const breadcrumb = structuredData.find(
    item => item['@type'] === 'BreadcrumbList'
  );

  assert.deepEqual(
    structuredData.map(item => item['@type']),
    ['WebPage', 'BreadcrumbList', 'WebApplication', 'FAQPage', 'HowTo']
  );
  assert.deepEqual(application, {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'DSR 계산기',
    description:
      '연소득, 보유 대출, 신규 대출 조건을 바탕으로 현재 DSR과 스트레스 DSR, 가능한 신규 대출 한도를 계산해주는 정책형 자기진단 계산기입니다.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    featureList: [
      '현재 DSR과 스트레스 DSR 동시 계산',
      '보유 대출별 연원금·연이자 자동 계산',
      '주담대·신용대출 신규 시나리오 지원',
      '수도권·지방 스트레스 DSR 분기 반영',
      '가능한 신규 대출 한도 역산',
      '정책 버전 프리셋 구조로 유지보수 용이',
    ],
    url: 'https://www.zento.kr/tools/dsr-calculator',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  });
  assert.deepEqual(breadcrumb?.itemListElement, [
    {
      '@type': 'ListItem',
      position: 1,
      name: '홈',
      item: 'https://www.zento.kr/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '도구',
      item: 'https://www.zento.kr/tools',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'DSR 계산기',
      item: undefined,
    },
  ]);

  assert.deepEqual(getToolBreadcrumbItems('loan-calculator'), [
    { name: '도구', url: '/tools' },
    { name: '대출 계산기', url: undefined },
  ]);
  assert.deepEqual(getToolBreadcrumbItems('missing-tool'), [
    { name: '도구', url: '/tools' },
  ]);
  assert.deepEqual(
    getToolStructuredDataBreadcrumbs('lotto', 'stats', '번호 통계'),
    [
      { name: '홈', url: '/' },
      { name: '도구', url: '/tools' },
      { name: 'AI 로또 번호 추천', url: '/tools/lotto' },
      { name: '번호 통계' },
    ]
  );
});

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createBlogIndexMetadataInput,
  createBenefitsMetadataInput,
  createHomeMetadataInput,
  createPlaceRegionMetadataInput,
  createPlacesMetadataInput,
  createToolsMainMetadataInput,
} from './site-section-seo.ts';

test('createPlacesMetadataInput은 places  canonical과 제목을 반환한다', () => {
  const result = createPlacesMetadataInput('https://www.zento.kr');

  assert.equal(result.title, '아이와 가볼 곳');
  assert.equal(result.canonical, 'https://www.zento.kr/places');
});

test('createPlacesMetadataInput은 unfiltered 페이지네이션 canonical을 자기 URL로 반환한다', () => {
  const result = createPlacesMetadataInput('https://www.zento.kr', {
    page: '2',
  });

  assert.equal(result.title, '아이와 가볼 곳 - 페이지 2');
  assert.equal(result.canonical, 'https://www.zento.kr/places?page=2');
});

test('createPlacesMetadataInput은 과한 페이지 canonical을 마지막 페이지로 보정한다', () => {
  const result = createPlacesMetadataInput('https://www.zento.kr', {
    page: '999',
    totalPages: 13,
  });

  assert.equal(result.title, '아이와 가볼 곳 - 페이지 13');
  assert.equal(result.canonical, 'https://www.zento.kr/places?page=13');
});

test('createPlacesMetadataInput은 필터 URL을 places 대표 URL로 canonical 처리한다', () => {
  const result = createPlacesMetadataInput('https://www.zento.kr', {
    page: '2',
    free: 'true',
  });

  assert.equal(result.title, '아이와 가볼 곳');
  assert.equal(result.canonical, 'https://www.zento.kr/places');
});

test('createBenefitsMetadataInput은 benefits  canonical과 제목을 반환한다', () => {
  const result = createBenefitsMetadataInput('https://www.zento.kr');

  assert.equal(result.title, '육아 혜택·지원금');
  assert.equal(result.canonical, 'https://www.zento.kr/benefits');
});

test('createPlaceRegionMetadataInput은 지역  canonical과 제목을 반환한다', () => {
  const result = createPlaceRegionMetadataInput('https://www.zento.kr', {
    slug: 'seoul',
    name: '서울',
    description: '공공 놀이시설과 박물관 중심의 서울 아이 가볼 곳',
  });

  assert.equal(result.title, '서울 아이와 가볼 곳');
  assert.equal(result.canonical, 'https://www.zento.kr/places/seoul');
});

test('createPlaceRegionMetadataInput은 지역 페이지네이션 canonical을 자기 URL로 반환한다', () => {
  const result = createPlaceRegionMetadataInput(
    'https://www.zento.kr',
    {
      slug: 'seoul',
      name: '서울',
      description: '공공 놀이시설과 박물관 중심의 서울 아이 가볼 곳',
    },
    { page: '2' }
  );

  assert.equal(result.title, '서울 아이와 가볼 곳 - 페이지 2');
  assert.equal(result.canonical, 'https://www.zento.kr/places/seoul?page=2');
});

test('createPlaceRegionMetadataInput은 과한 지역 페이지 canonical을 마지막 페이지로 보정한다', () => {
  const result = createPlaceRegionMetadataInput(
    'https://www.zento.kr',
    {
      slug: 'seoul',
      name: '서울',
      description: '공공 놀이시설과 박물관 중심의 서울 아이 가볼 곳',
    },
    { page: '999', totalPages: 6 }
  );

  assert.equal(result.title, '서울 아이와 가볼 곳 - 페이지 6');
  assert.equal(result.canonical, 'https://www.zento.kr/places/seoul?page=6');
});

test('createPlaceRegionMetadataInput은 지역 필터 URL을 지역 대표 URL로 canonical 처리한다', () => {
  const result = createPlaceRegionMetadataInput(
    'https://www.zento.kr',
    {
      slug: 'seoul',
      name: '서울',
      description: '공공 놀이시설과 박물관 중심의 서울 아이 가볼 곳',
    },
    { page: '2', free: 'true' }
  );

  assert.equal(result.title, '서울 아이와 가볼 곳');
  assert.equal(result.canonical, 'https://www.zento.kr/places/seoul');
});

test('주요 네비게이션 페이지는 서로 다른 정적 OG 이미지를 반환한다', () => {
  const baseUrl = 'https://www.zento.kr';
  const metadataByPath = {
    '/': createHomeMetadataInput(baseUrl),
    '/places': createPlacesMetadataInput(baseUrl),
    '/tools': createToolsMainMetadataInput(baseUrl),
    '/benefits': createBenefitsMetadataInput(baseUrl),
    '/blog': createBlogIndexMetadataInput(baseUrl),
  };

  const ogImagesByPath = Object.fromEntries(
    Object.entries(metadataByPath).map(([path, metadata]) => [
      path,
      metadata.ogImage,
    ])
  );

  assert.equal(
    new Set(Object.values(metadataByPath).map(metadata => metadata.ogImage))
      .size,
    5
  );
  assert.deepEqual(ogImagesByPath, {
    '/': '/og-images/home-og-image.webp',
    '/places': '/og-images/places-og-image.webp',
    '/tools': '/og-images/tools-og-image.webp',
    '/benefits': '/og-images/benefits-og-image.webp',
    '/blog': '/og-images/blog-og-image.webp',
  });
});

test('createBlogIndexMetadataInput은 블로그 페이지네이션 canonical을 자기 URL로 반환한다', () => {
  const result = createBlogIndexMetadataInput('https://www.zento.kr', {
    page: '2',
  });

  assert.equal(result.title, '블로그 - 페이지 2');
  assert.equal(result.canonical, 'https://www.zento.kr/blog?page=2');
});

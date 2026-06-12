import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'content/posts/places');

const EXPECTED_POSTS = [
  {
    slug: 'capital-area-rainy-day-indoor-places',
    title: '수도권 비 오는 날 아이와 갈 만한 실내 장소',
    requiredLinks: [
      '/blog/places/seoul-rainy-day-indoor-places',
      '/blog/places/rainy-day-free-low-cost-indoor-places',
      '/blog/places/same-day-indoor-places-without-reservation',
      '/blog/places/incheon-rainy-day-indoor-places',
      '/blog/places/gyeonggi-south-rainy-day-indoor-places',
      '/blog/places/toddlers-rainy-day-indoor-places',
      '/blog/places/preschoolers-rainy-day-indoor-places',
    ],
  },
  {
    slug: 'seoul-rainy-day-indoor-places',
    title: '서울 비 오는 날 아이랑 갈 만한 실내 장소',
    requiredLinks: [
      '/blog/places/capital-area-rainy-day-indoor-places',
      '/places/seoul',
    ],
  },
  {
    slug: 'rainy-day-free-low-cost-indoor-places',
    title: '비 오는 날 무료·저렴한 실내 나들이',
    requiredLinks: [
      '/blog/places/capital-area-rainy-day-indoor-places',
      '/benefits',
    ],
  },
  {
    slug: 'same-day-indoor-places-without-reservation',
    title: '예약 없이 갈 수 있는 실내 아이 나들이',
    requiredLinks: [
      '/blog/places/capital-area-rainy-day-indoor-places',
      '/places?indoor=true',
    ],
  },
  {
    slug: 'incheon-rainy-day-indoor-places',
    title: '인천 비 오는 날 아이랑 갈 만한 실내 장소',
    requiredLinks: [
      '/blog/places/capital-area-rainy-day-indoor-places',
      '/places/incheon',
    ],
  },
  {
    slug: 'gyeonggi-south-rainy-day-indoor-places',
    title: '경기 남부 비 오는 날 아이랑 갈 만한 실내 장소',
    requiredLinks: [
      '/blog/places/capital-area-rainy-day-indoor-places',
      '/places/gyeonggi-south',
    ],
  },
  {
    slug: 'toddlers-rainy-day-indoor-places',
    title: '1~3세 아이와 비 오는 날 갈 만한 실내 장소',
    requiredLinks: [
      '/blog/places/capital-area-rainy-day-indoor-places',
      '/places?age=1-3y',
    ],
  },
  {
    slug: 'preschoolers-rainy-day-indoor-places',
    title: '3~6세 아이와 비 오는 날 갈 만한 실내 장소',
    requiredLinks: [
      '/blog/places/capital-area-rainy-day-indoor-places',
      '/places?age=3-6y',
    ],
  },
];

const REQUIRED_HEADINGS = [
  '## 기준일과 읽는 법',
  '## 한눈에 보는 추천 장소',
  '## 장소별로 고르는 기준',
  '## 방문 전 확인 체크리스트',
  '## 같이 보면 좋은 글과 페이지',
  '## FAQ',
  '## 마무리',
];

const DISALLOWED_PATTERNS = [
  new RegExp('T' + 'BD', 'i'),
  new RegExp('TO' + 'DO', 'i'),
  new RegExp('FIX' + 'ME', 'i'),
  new RegExp('작성 ' + '예정'),
  new RegExp('추후 ' + '작성'),
  new RegExp('place' + 'holder', 'i'),
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function readPost(slug) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return matter(fileContents);
}

test('rainy day indoor cluster has all planned posts', () => {
  for (const post of EXPECTED_POSTS) {
    assert.equal(
      fs.existsSync(path.join(POSTS_DIR, `${post.slug}.md`)),
      true,
      post.slug
    );
  }
});

test('rainy day indoor posts use the places category and trusted metadata', () => {
  for (const post of EXPECTED_POSTS) {
    const { data, content } = readPost(post.slug);

    assert.equal(data.title, post.title, post.slug);
    assert.equal(data.date, '2026-06-12', post.slug);
    assert.equal(data.author, 'Zento 편집실', post.slug);
    assert.equal(data.category, '아이와 갈 곳', post.slug);
    assert.equal(data.categorySlug, 'places', post.slug);
    assert.equal(data.indoorOutdoor, 'indoor', post.slug);
    assert.equal(Array.isArray(data.placeIds), true, post.slug);
    assert.equal(data.placeIds.length >= 8, true, post.slug);
    assert.equal(new Set(data.placeIds).size, data.placeIds.length, post.slug);
    assert.equal(Array.isArray(data.regions), true, post.slug);
    assert.equal(data.regions.length >= 1, true, post.slug);
    assert.equal(Array.isArray(data.ageBands), true, post.slug);
    assert.equal(data.ageBands.length >= 1, true, post.slug);
    assert.equal(data.tags.includes('비 오는 날'), true, post.slug);
    assert.equal(data.tags.includes('아이와 실내'), true, post.slug);
    assert.match(data.excerpt, /아이|실내|비/, post.slug);
    assert.match(content, /기준일: 2026년 6월/, post.slug);
    assert.match(content, /방문 전 공식 페이지/, post.slug);
  }
});

test('rainy day indoor posts have the required editorial structure and links', () => {
  for (const post of EXPECTED_POSTS) {
    const { content } = readPost(post.slug);

    for (const heading of REQUIRED_HEADINGS) {
      assert.match(
        content,
        new RegExp(escapeRegExp(heading)),
        `${post.slug} ${heading}`
      );
    }

    for (const link of post.requiredLinks) {
      assert.match(
        content,
        new RegExp(escapeRegExp(link)),
        `${post.slug} ${link}`
      );
    }

    for (const pattern of DISALLOWED_PATTERNS) {
      assert.equal(pattern.test(content), false, `${post.slug} ${pattern}`);
    }
  }
});

test('rainy day indoor posts reference only publishable place ids', async () => {
  const { ALL_PLACES } = await import('../../places/index.ts');
  const placeById = new Map(ALL_PLACES.map(place => [place.id, place]));
  const publishableStatuses = new Set(['official_verified', 'semi_verified']);

  for (const post of EXPECTED_POSTS) {
    const { data } = readPost(post.slug);

    for (const placeId of data.placeIds) {
      const place = placeById.get(placeId);
      assert.ok(place, `${post.slug} references missing place ${placeId}`);
      assert.equal(
        publishableStatuses.has(place.verificationStatus),
        true,
        `${post.slug} references non-publishable place ${placeId}`
      );
    }
  }
});

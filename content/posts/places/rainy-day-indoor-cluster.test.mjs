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
    placeIds: [
      'national-children-museum',
      'seoul-national-museum-of-korea',
      'seoul-sangsangnara',
      'songpa-book-museum-bookium',
      'gyeonggi-children-museum',
      'goyang-children-museum',
      'incheon-children-science-museum',
      'national-museum-of-world-writing',
      'bucheon-robopark',
      'national-aviation-museum',
    ],
    regions: ['seoul', 'gyeonggi-south', 'gyeonggi-north', 'incheon'],
    ageBands: ['1-3y', '3-6y'],
    requiredLinks: [
      '/places',
      '/places/seoul',
      '/places/incheon',
      '/places/gyeonggi-south',
      '/places/gyeonggi-north',
      '/blog/places/seoul-rainy-day-indoor-places',
      '/blog/places/rainy-day-free-low-cost-indoor-places',
      '/blog/places/same-day-indoor-places-without-reservation',
      '/blog/places/incheon-rainy-day-indoor-places',
      '/blog/places/gyeonggi-south-rainy-day-indoor-places',
      '/blog/places/toddlers-rainy-day-indoor-places',
      '/blog/places/preschoolers-rainy-day-indoor-places',
      '/blog/parking/songpa-book-museum-bookium-parking',
      '/blog/parking/national-aviation-museum-parking',
      '/blog/parking/gyeonggi-children-museum-parking',
      '/blog/parking/incheon-children-science-museum-parking',
    ],
  },
  {
    slug: 'seoul-rainy-day-indoor-places',
    title: '서울 비 오는 날 아이랑 갈 만한 실내 장소',
    placeIds: [
      'national-children-museum',
      'seoul-sangsangnara',
      'songpa-book-museum-bookium',
      'national-aviation-museum',
      'seoul-life-museum-ompang',
      'seoul-public-kids-cafe-hwagok3',
      'seoul-public-kids-cafe-omok',
      'dooly-museum',
      'seoul-baekje-childrens-museum',
      'national-children-science-center',
    ],
    regions: ['seoul'],
    ageBands: ['1-3y', '3-6y'],
    requiredLinks: [
      '/blog/places/capital-area-rainy-day-indoor-places',
      '/blog/places/rainy-day-free-low-cost-indoor-places',
      '/blog/places/toddlers-rainy-day-indoor-places',
      '/places/seoul',
      '/places?rain=true',
      '/blog/parking/songpa-book-museum-bookium-parking',
      '/blog/parking/seoul-sangsangnara-parking',
      '/blog/parking/national-children-museum-parking',
      '/blog/parking/seoul-baekje-childrens-museum-parking',
    ],
  },
  {
    slug: 'rainy-day-free-low-cost-indoor-places',
    title: '비 오는 날 무료·저렴한 실내 나들이',
    placeIds: [
      'seoul-life-museum-ompang',
      'songpa-book-museum-bookium',
      'national-children-museum',
      'incheon-student-science-museum',
      'ganghwa-history-museum',
      'ganghwa-natural-history-museum',
      'gyeyang-fortress-museum',
      'national-institute-of-biological-resources',
      'gyeonggi-south-isarang-cityhall',
      'gyeonggi-south-ansan-ilovemom-cafe',
      'bucheon-ilovemom-cafe-bambak',
    ],
    regions: ['seoul', 'gyeonggi-south', 'incheon'],
    ageBands: ['0-12m', '1-3y', '3-6y'],
    requiredLinks: [
      '/blog/places/capital-area-rainy-day-indoor-places',
      '/blog/benefits/seoul-public-kids-cafe-guide',
      '/blog/benefits/2026-parenting-benefits-guide',
      '/benefits',
      '/places?free=true',
    ],
  },
  {
    slug: 'same-day-indoor-places-without-reservation',
    title: '예약 없이 갈 수 있는 실내 아이 나들이',
    placeIds: [
      'seoul-sangsangnara',
      'seoul-national-museum-of-korea',
      'national-aviation-museum',
      'incheon-oktokki-space-center',
      'incheon-naughty-child-cheongna',
      'incheon-children-science-museum',
      'gyeonggi-children-museum',
      'bucheon-robopark',
      'korea-comics-museum',
      'railroad-museum',
    ],
    regions: ['seoul', 'gyeonggi-south', 'incheon'],
    ageBands: ['1-3y', '3-6y', '6-10y'],
    requiredLinks: [
      '/blog/places/capital-area-rainy-day-indoor-places',
      '/blog/places/seoul-rainy-day-indoor-places',
      '/places?indoor=true',
      '/places?rain=true',
    ],
    requiredText: [
      '예약 없이 갈 수 있는 곳이라도 주말, 방학, 우천일에는 현장 대기나 회차 마감이 생길 수 있습니다.',
    ],
  },
  {
    slug: 'incheon-rainy-day-indoor-places',
    title: '인천 비 오는 날 아이랑 갈 만한 실내 장소',
    placeIds: [
      'incheon-children-science-museum',
      'national-museum-of-world-writing',
      'incheon-metropolitan-city-museum',
      'incheon-urban-history-museum',
      'national-incheon-marine-museum',
      'geomdan-prehistory-museum',
      'incheon-student-science-museum',
      'gyeyang-fortress-museum',
      'incheon-naughty-child-cheongna',
      'incheon-oktokki-space-center',
    ],
    regions: ['incheon'],
    ageBands: ['1-3y', '3-6y'],
    requiredLinks: [
      '/blog/places/capital-area-rainy-day-indoor-places',
      '/blog/places/rainy-day-free-low-cost-indoor-places',
      '/places/incheon',
      '/places?rain=true',
      '/blog/parking/incheon-children-science-museum-parking',
      '/blog/parking/national-museum-of-world-writing-parking',
      '/blog/parking/national-incheon-marine-museum-parking',
    ],
  },
  {
    slug: 'gyeonggi-south-rainy-day-indoor-places',
    title: '경기 남부 비 오는 날 아이랑 갈 만한 실내 장소',
    placeIds: [
      'gyeonggi-children-museum',
      'bucheon-robopark',
      'korea-comics-museum',
      'railroad-museum',
      'korea-job-world-children-experience-center',
      'yongin-children-imagination-forest',
      'byeolmadang-kids-suwon',
      'gyeonggi-south-isarang-cityhall',
      'gyeonggi-south-anyang-ilovemom-cafe',
      'bucheon-ilovemom-cafe-bambak',
    ],
    regions: ['gyeonggi-south'],
    ageBands: ['1-3y', '3-6y'],
    requiredLinks: [
      '/blog/places/capital-area-rainy-day-indoor-places',
      '/blog/places/preschoolers-rainy-day-indoor-places',
      '/places/gyeonggi-south',
      '/places?rain=true',
      '/blog/parking/gyeonggi-children-museum-parking',
      '/blog/parking/bucheon-robopark-parking',
      '/blog/parking/korea-comics-museum-parking',
      '/blog/parking/railroad-museum-parking',
    ],
  },
  {
    slug: 'toddlers-rainy-day-indoor-places',
    title: '1~3세 아이와 비 오는 날 갈 만한 실내 장소',
    placeIds: [
      'seoul-public-kids-cafe-jegi',
      'seoul-public-kids-cafe-jangan1',
      'seoul-public-kids-cafe-guro4',
      'seoul-public-kids-cafe-omok',
      'seoul-public-kids-cafe-beon3',
      'gyeonggi-south-isarang-cityhall',
      'gyeonggi-south-ansan-ilovemom-cafe',
      'gyeonggi-south-hwaseong-ilovemom-bansong',
      'incheon-aisarang-dream-center-jung-gu-1',
      'incheon-baby-angels-homeplus-songdo',
    ],
    regions: ['seoul', 'gyeonggi-south', 'incheon'],
    ageBands: ['0-12m', '1-3y'],
    requiredLinks: [
      '/blog/places/capital-area-rainy-day-indoor-places',
      '/blog/places/rainy-day-free-low-cost-indoor-places',
      '/places?age=1-3y',
      '/places?indoor=true',
      '/blog/benefits/seoul-public-kids-cafe-guide',
    ],
  },
  {
    slug: 'preschoolers-rainy-day-indoor-places',
    title: '3~6세 아이와 비 오는 날 갈 만한 실내 장소',
    placeIds: [
      'seoul-sangsangnara',
      'national-children-museum',
      'seoul-baekje-childrens-museum',
      'national-aviation-museum',
      'gyeonggi-children-museum',
      'bucheon-robopark',
      'korea-comics-museum',
      'incheon-children-science-museum',
      'national-museum-of-world-writing',
      'incheon-naughty-child-cheongna',
    ],
    regions: ['seoul', 'gyeonggi-south', 'incheon'],
    ageBands: ['3-6y'],
    requiredLinks: [
      '/blog/places/capital-area-rainy-day-indoor-places',
      '/blog/places/gyeonggi-south-rainy-day-indoor-places',
      '/places?age=3-6y',
      '/places?indoor=true',
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

const SUMMARY_TABLE_HEADER =
  '| 장소 | 지역 | 권장 연령 | 비용 | 예약 | 주차 | 이럴 때 추천 |';
const SUMMARY_TABLE_SEPARATOR = '| --- | --- | --- | --- | --- | --- | --- |';
const TRUST_SENTENCE =
  '이 글은 **기준일: 2026년 6월**에 확인한 장소 seed와 공식·준공식 출처를 바탕으로 정리했습니다. 운영시간, 요금, 예약 가능 여부는 바뀔 수 있으니 방문 전 공식 페이지를 다시 확인하세요.';

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
    assert.deepEqual(data.placeIds, post.placeIds, post.slug);
    assert.equal(data.placeIds.length >= 8, true, post.slug);
    assert.equal(new Set(data.placeIds).size, data.placeIds.length, post.slug);
    assert.equal(Array.isArray(data.regions), true, post.slug);
    assert.deepEqual(data.regions, post.regions, post.slug);
    assert.equal(Array.isArray(data.ageBands), true, post.slug);
    assert.deepEqual(data.ageBands, post.ageBands, post.slug);
    assert.equal(data.tags.includes('비 오는 날'), true, post.slug);
    assert.equal(data.tags.includes('아이와 실내'), true, post.slug);
    assert.equal(
      data.excerpt.length >= 80 && data.excerpt.length <= 120,
      true,
      `${post.slug} excerpt length`
    );
    assert.match(data.excerpt, /아이|실내|비/, post.slug);
    assert.match(content, new RegExp(escapeRegExp(TRUST_SENTENCE)), post.slug);
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

    for (const requiredText of post.requiredText ?? []) {
      assert.match(
        content,
        new RegExp(escapeRegExp(requiredText)),
        `${post.slug} ${requiredText}`
      );
    }

    assert.match(
      content,
      new RegExp(escapeRegExp(SUMMARY_TABLE_HEADER)),
      `${post.slug} summary table header`
    );
    assert.match(
      content,
      new RegExp(escapeRegExp(SUMMARY_TABLE_SEPARATOR)),
      `${post.slug} summary table separator`
    );

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

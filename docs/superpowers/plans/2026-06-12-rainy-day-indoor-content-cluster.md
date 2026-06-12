# Rainy Day Indoor Content Cluster Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 비 오는 날 아이와 갈 만한 수도권 실내 장소 검색 유입을 받는 8개 글 콘텐츠 클러스터를 추가한다.

**Architecture:** 새 블로그 카테고리 `places`를 `아이와 갈 곳`으로 등록하고, `content/posts/places`에 상황형 Markdown 글 8개를 추가한다. 장소 사실 정보는 `content/places` seed의 `placeIds` frontmatter로 연결하고, 계약 테스트가 카테고리, 링크, 기준일, 추천 장소 검증 상태를 확인한다.

**Tech Stack:** Next.js App Router, TypeScript, Markdown, gray-matter, node:test, pnpm.

---

## Spec Source

- Design spec: `docs/superpowers/specs/2026-06-12-rainy-day-indoor-content-cluster-design.md`
- Rebrand taxonomy: `docs/superpowers/specs/parenting-guide-rebrand/03-content-model-and-taxonomy.md`
- Source data: `content/places`

## File Map

- Modify: `lib/blog/posts.ts`
  - Add `places: '아이와 갈 곳'` to category mapping.
  - Preserve place-related frontmatter in `getAllPosts()` and `getPostBySlug()`.
- Create: `lib/blog/posts.test.mjs`
  - Verifies the `places` category label and blog loader place metadata.
- Create: `content/posts/places/rainy-day-indoor-cluster.test.mjs`
  - Verifies all 8 content files, frontmatter, internal links, 기준일, and publishable place IDs.
- Create: `content/posts/places/capital-area-rainy-day-indoor-places.md`
- Create: `content/posts/places/seoul-rainy-day-indoor-places.md`
- Create: `content/posts/places/rainy-day-free-low-cost-indoor-places.md`
- Create: `content/posts/places/same-day-indoor-places-without-reservation.md`
- Create: `content/posts/places/incheon-rainy-day-indoor-places.md`
- Create: `content/posts/places/gyeonggi-south-rainy-day-indoor-places.md`
- Create: `content/posts/places/toddlers-rainy-day-indoor-places.md`
- Create: `content/posts/places/preschoolers-rainy-day-indoor-places.md`
- Create: `lib/seo/sitemap.test.mjs`
  - Verifies new category and hub post appear in sitemap collectors.

## Shared Article Requirements

Every Markdown post must include this frontmatter shape:

```yaml
---
title: '<article title>'
date: '2026-06-12'
author: 'Zento 편집실'
excerpt: '<80-120자 요약>'
tags:
  - '비 오는 날'
  - '비오는날 아이와'
  - '아이와 실내'
  - '아이와 갈 곳'
category: '아이와 갈 곳'
categorySlug: 'places'
placeIds:
  - '<publishable-place-id>'
regions:
  - 'seoul'
ageBands:
  - '1-3y'
indoorOutdoor: 'indoor'
---
```

Every article body must include these headings:

```markdown
## 기준일과 읽는 법
## 한눈에 보는 추천 장소
## 장소별로 고르는 기준
## 방문 전 확인 체크리스트
## 같이 보면 좋은 글과 페이지
## FAQ
## 마무리
```

Every article must include this exact trust sentence near the top:

```markdown
이 글은 **기준일: 2026년 6월**에 확인한 장소 seed와 공식·준공식 출처를 바탕으로 정리했습니다. 운영시간, 요금, 예약 가능 여부는 바뀔 수 있으니 방문 전 공식 페이지를 다시 확인하세요.
```

Every article must include a summary table with these columns:

```markdown
| 장소 | 지역 | 권장 연령 | 비용 | 예약 | 주차 | 이럴 때 추천 |
| --- | --- | --- | --- | --- | --- | --- |
```

Use `placeIds` from `content/places` only. Representative recommendations must be `official_verified` or `semi_verified`.

## Article Inventory

| File | Title | Primary Role |
| --- | --- | --- |
| `capital-area-rainy-day-indoor-places.md` | `수도권 비 오는 날 아이와 갈 만한 실내 장소` | 클러스터 허브 |
| `seoul-rainy-day-indoor-places.md` | `서울 비 오는 날 아이랑 갈 만한 실내 장소` | 서울 지역 지원 글 |
| `rainy-day-free-low-cost-indoor-places.md` | `비 오는 날 무료·저렴한 실내 나들이` | 비용 기준 지원 글 |
| `same-day-indoor-places-without-reservation.md` | `예약 없이 갈 수 있는 실내 아이 나들이` | 당일 선택 지원 글 |
| `incheon-rainy-day-indoor-places.md` | `인천 비 오는 날 아이랑 갈 만한 실내 장소` | 인천 지역 지원 글 |
| `gyeonggi-south-rainy-day-indoor-places.md` | `경기 남부 비 오는 날 아이랑 갈 만한 실내 장소` | 경기 남부 지역 지원 글 |
| `toddlers-rainy-day-indoor-places.md` | `1~3세 아이와 비 오는 날 갈 만한 실내 장소` | 영유아 연령 지원 글 |
| `preschoolers-rainy-day-indoor-places.md` | `3~6세 아이와 비 오는 날 갈 만한 실내 장소` | 유아 연령 지원 글 |

## Place ID Sets

Use these place ID lists in frontmatter. If any ID fails the content contract test, check for typo first; do not replace with `discovery_only` or `needs_refresh` places.

### `capital-area-rainy-day-indoor-places.md`

```yaml
placeIds:
  - 'national-children-museum'
  - 'seoul-national-museum-of-korea'
  - 'seoul-sangsangnara'
  - 'songpa-book-museum-bookium'
  - 'gyeonggi-children-museum'
  - 'goyang-children-museum'
  - 'incheon-children-science-museum'
  - 'national-museum-of-world-writing'
  - 'bucheon-robopark'
  - 'national-aviation-museum'
regions:
  - 'seoul'
  - 'gyeonggi-south'
  - 'gyeonggi-north'
  - 'incheon'
ageBands:
  - '1-3y'
  - '3-6y'
indoorOutdoor: 'indoor'
```

### `seoul-rainy-day-indoor-places.md`

```yaml
placeIds:
  - 'national-children-museum'
  - 'seoul-sangsangnara'
  - 'songpa-book-museum-bookium'
  - 'national-aviation-museum'
  - 'seoul-life-museum-ompang'
  - 'seoul-public-kids-cafe-hwagok3'
  - 'seoul-public-kids-cafe-omok'
  - 'dooly-museum'
  - 'seoul-baekje-childrens-museum'
  - 'national-children-science-center'
regions:
  - 'seoul'
ageBands:
  - '1-3y'
  - '3-6y'
indoorOutdoor: 'indoor'
```

### `rainy-day-free-low-cost-indoor-places.md`

```yaml
placeIds:
  - 'seoul-life-museum-ompang'
  - 'songpa-book-museum-bookium'
  - 'national-children-museum'
  - 'incheon-student-science-museum'
  - 'ganghwa-history-museum'
  - 'ganghwa-natural-history-museum'
  - 'gyeyang-fortress-museum'
  - 'national-institute-of-biological-resources'
  - 'gyeonggi-south-isarang-cityhall'
  - 'gyeonggi-south-ansan-ilovemom-cafe'
  - 'bucheon-ilovemom-cafe-bambak'
regions:
  - 'seoul'
  - 'gyeonggi-south'
  - 'incheon'
ageBands:
  - '0-12m'
  - '1-3y'
  - '3-6y'
indoorOutdoor: 'indoor'
```

### `same-day-indoor-places-without-reservation.md`

```yaml
placeIds:
  - 'seoul-sangsangnara'
  - 'seoul-national-museum-of-korea'
  - 'national-aviation-museum'
  - 'incheon-oktokki-space-center'
  - 'incheon-naughty-child-cheongna'
  - 'incheon-children-science-museum'
  - 'gyeonggi-children-museum'
  - 'bucheon-robopark'
  - 'korea-comics-museum'
  - 'railroad-museum'
regions:
  - 'seoul'
  - 'gyeonggi-south'
  - 'incheon'
ageBands:
  - '1-3y'
  - '3-6y'
  - '6-10y'
indoorOutdoor: 'indoor'
```

### `incheon-rainy-day-indoor-places.md`

```yaml
placeIds:
  - 'incheon-children-science-museum'
  - 'national-museum-of-world-writing'
  - 'incheon-metropolitan-city-museum'
  - 'incheon-urban-history-museum'
  - 'national-incheon-marine-museum'
  - 'geomdan-prehistory-museum'
  - 'incheon-student-science-museum'
  - 'gyeyang-fortress-museum'
  - 'incheon-naughty-child-cheongna'
  - 'incheon-oktokki-space-center'
regions:
  - 'incheon'
ageBands:
  - '1-3y'
  - '3-6y'
indoorOutdoor: 'indoor'
```

### `gyeonggi-south-rainy-day-indoor-places.md`

```yaml
placeIds:
  - 'gyeonggi-children-museum'
  - 'bucheon-robopark'
  - 'korea-comics-museum'
  - 'railroad-museum'
  - 'korea-job-world-children-experience-center'
  - 'yongin-children-imagination-forest'
  - 'byeolmadang-kids-suwon'
  - 'gyeonggi-south-isarang-cityhall'
  - 'gyeonggi-south-anyang-ilovemom-cafe'
  - 'bucheon-ilovemom-cafe-bambak'
regions:
  - 'gyeonggi-south'
ageBands:
  - '1-3y'
  - '3-6y'
indoorOutdoor: 'indoor'
```

### `toddlers-rainy-day-indoor-places.md`

```yaml
placeIds:
  - 'seoul-public-kids-cafe-jegi'
  - 'seoul-public-kids-cafe-jangan1'
  - 'seoul-public-kids-cafe-guro4'
  - 'seoul-public-kids-cafe-omok'
  - 'seoul-public-kids-cafe-beon3'
  - 'gyeonggi-south-isarang-cityhall'
  - 'gyeonggi-south-ansan-ilovemom-cafe'
  - 'gyeonggi-south-hwaseong-ilovemom-bansong'
  - 'incheon-aisarang-dream-center-jung-gu-1'
  - 'incheon-baby-angels-homeplus-songdo'
regions:
  - 'seoul'
  - 'gyeonggi-south'
  - 'incheon'
ageBands:
  - '0-12m'
  - '1-3y'
indoorOutdoor: 'indoor'
```

### `preschoolers-rainy-day-indoor-places.md`

```yaml
placeIds:
  - 'seoul-sangsangnara'
  - 'national-children-museum'
  - 'seoul-baekje-childrens-museum'
  - 'national-aviation-museum'
  - 'gyeonggi-children-museum'
  - 'bucheon-robopark'
  - 'korea-comics-museum'
  - 'incheon-children-science-museum'
  - 'national-museum-of-world-writing'
  - 'incheon-naughty-child-cheongna'
regions:
  - 'seoul'
  - 'gyeonggi-south'
  - 'incheon'
ageBands:
  - '3-6y'
indoorOutdoor: 'indoor'
```

## Task 1: Register The Parenting Places Blog Category

**Files:**

- Create: `lib/blog/posts.test.mjs`
- Modify: `lib/blog/posts.ts`

- [ ] **Step 1: Write the failing category test**

Create `lib/blog/posts.test.mjs`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'

test('places category is labeled for parenting place guides', async () => {
  const { getCategoryName } = await import('./posts.ts')

  assert.equal(getCategoryName('places'), '아이와 갈 곳')
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
node --test lib/blog/posts.test.mjs
```

Expected: FAIL because `getCategoryName('places')` returns `places`.

- [ ] **Step 3: Add the category label**

In `lib/blog/posts.ts`, update `CATEGORY_NAMES`:

```ts
const CATEGORY_NAMES: Record<string, string> = {
  parking: '주차',
  development: '개발',
  consumer: '소비자 정보',
  'ai-image-creator': 'AI',
  investment: '투자',
  lotto: '로또',
  benefits: '혜택·지원금',
  places: '아이와 갈 곳',
  uncategorized: '미분류',
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run:

```bash
node --test lib/blog/posts.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit**

Run:

```bash
git add lib/blog/posts.ts lib/blog/posts.test.mjs
git commit -m "[main][add]: 아이와 갈 곳 블로그 카테고리 추가"
```

## Task 2: Add The Rainy-Day Content Contract Test

**Files:**

- Create: `content/posts/places/rainy-day-indoor-cluster.test.mjs`

- [ ] **Step 1: Create the content directory**

Run:

```bash
mkdir -p content/posts/places
```

- [ ] **Step 2: Write the failing content contract test**

Create `content/posts/places/rainy-day-indoor-cluster.test.mjs`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content/posts/places')

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
]

const REQUIRED_HEADINGS = [
  '## 기준일과 읽는 법',
  '## 한눈에 보는 추천 장소',
  '## 장소별로 고르는 기준',
  '## 방문 전 확인 체크리스트',
  '## 같이 보면 좋은 글과 페이지',
  '## FAQ',
  '## 마무리',
]

const DISALLOWED_PATTERNS = [
  new RegExp('T' + 'BD', 'i'),
  new RegExp('TO' + 'DO', 'i'),
  new RegExp('FIX' + 'ME', 'i'),
  new RegExp('작성 ' + '예정'),
  new RegExp('추후 ' + '작성'),
  new RegExp('place' + 'holder', 'i'),
]

function readPost(slug) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return matter(fileContents)
}

test('rainy day indoor cluster has all planned posts', () => {
  for (const post of EXPECTED_POSTS) {
    assert.equal(
      fs.existsSync(path.join(POSTS_DIR, `${post.slug}.md`)),
      true,
      post.slug
    )
  }
})

test('rainy day indoor posts use the places category and trusted metadata', () => {
  for (const post of EXPECTED_POSTS) {
    const { data, content } = readPost(post.slug)

    assert.equal(data.title, post.title, post.slug)
    assert.equal(data.date, '2026-06-12', post.slug)
    assert.equal(data.author, 'Zento 편집실', post.slug)
    assert.equal(data.category, '아이와 갈 곳', post.slug)
    assert.equal(data.categorySlug, 'places', post.slug)
    assert.equal(data.indoorOutdoor, 'indoor', post.slug)
    assert.equal(Array.isArray(data.placeIds), true, post.slug)
    assert.equal(data.placeIds.length >= 8, true, post.slug)
    assert.equal(new Set(data.placeIds).size, data.placeIds.length, post.slug)
    assert.equal(Array.isArray(data.regions), true, post.slug)
    assert.equal(data.regions.length >= 1, true, post.slug)
    assert.equal(Array.isArray(data.ageBands), true, post.slug)
    assert.equal(data.ageBands.length >= 1, true, post.slug)
    assert.equal(data.tags.includes('비 오는 날'), true, post.slug)
    assert.equal(data.tags.includes('아이와 실내'), true, post.slug)
    assert.match(data.excerpt, /아이|실내|비/, post.slug)
    assert.match(content, /기준일: 2026년 6월/, post.slug)
    assert.match(content, /방문 전 공식 페이지/, post.slug)
  }
})

test('rainy day indoor posts have the required editorial structure and links', () => {
  for (const post of EXPECTED_POSTS) {
    const { content } = readPost(post.slug)

    for (const heading of REQUIRED_HEADINGS) {
      assert.match(content, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${post.slug} ${heading}`)
    }

    for (const link of post.requiredLinks) {
      assert.match(content, new RegExp(link.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${post.slug} ${link}`)
    }

    for (const pattern of DISALLOWED_PATTERNS) {
      assert.equal(pattern.test(content), false, `${post.slug} ${pattern}`)
    }
  }
})

test('rainy day indoor posts reference only publishable place ids', async () => {
  const { ALL_PLACES } = await import('../../places/index.ts')
  const placeById = new Map(ALL_PLACES.map(place => [place.id, place]))
  const publishableStatuses = new Set(['official_verified', 'semi_verified'])

  for (const post of EXPECTED_POSTS) {
    const { data } = readPost(post.slug)

    for (const placeId of data.placeIds) {
      const place = placeById.get(placeId)
      assert.ok(place, `${post.slug} references missing place ${placeId}`)
      assert.equal(
        publishableStatuses.has(place.verificationStatus),
        true,
        `${post.slug} references non-publishable place ${placeId}`
      )
    }
  }
})
```

- [ ] **Step 3: Run the test to verify it fails**

Run:

```bash
node --test content/posts/places/rainy-day-indoor-cluster.test.mjs
```

Expected: FAIL because the 8 Markdown files do not exist yet.

Do not commit this failing test by itself.

## Task 3: Add The 8 Markdown Posts

**Files:**

- Create: all 8 Markdown files listed in the Article Inventory
- Test: `content/posts/places/rainy-day-indoor-cluster.test.mjs`

- [ ] **Step 1: Create the hub article**

Create `content/posts/places/capital-area-rainy-day-indoor-places.md` with:

- Title: `수도권 비 오는 날 아이와 갈 만한 실내 장소`
- Frontmatter: use the `capital-area-rainy-day-indoor-places.md` Place ID Set above.
- Required decision angle: `서울·인천·경기 남부·경기 북부 중 어디로 좁힐지 고르게 한다.`
- Required internal links:
  - `/places`
  - `/places/seoul`
  - `/places/incheon`
  - `/places/gyeonggi-south`
  - `/places/gyeonggi-north`
  - all 7 supporting article links from the content contract test.
- Required parking support links:
  - `/blog/parking/songpa-book-museum-bookium-parking`
  - `/blog/parking/national-aviation-museum-parking`
  - `/blog/parking/gyeonggi-children-museum-parking`
  - `/blog/parking/incheon-children-science-museum-parking`

- [ ] **Step 2: Create the Seoul article**

Create `content/posts/places/seoul-rainy-day-indoor-places.md` with:

- Title: `서울 비 오는 날 아이랑 갈 만한 실내 장소`
- Frontmatter: use the `seoul-rainy-day-indoor-places.md` Place ID Set above.
- Required decision angle: `서울 안에서 강서, 송파, 광진, 도봉, 용산/종로권처럼 생활권을 나눠 고르게 한다.`
- Required internal links:
  - `/blog/places/capital-area-rainy-day-indoor-places`
  - `/blog/places/rainy-day-free-low-cost-indoor-places`
  - `/blog/places/toddlers-rainy-day-indoor-places`
  - `/places/seoul`
  - `/places?rain=true`
- Required parking support links:
  - `/blog/parking/songpa-book-museum-bookium-parking`
  - `/blog/parking/seoul-sangsangnara-parking`
  - `/blog/parking/national-children-museum-parking`
  - `/blog/parking/seoul-baekje-childrens-museum-parking`

- [ ] **Step 3: Create the free and low-cost article**

Create `content/posts/places/rainy-day-free-low-cost-indoor-places.md` with:

- Title: `비 오는 날 무료·저렴한 실내 나들이`
- Frontmatter: use the `rainy-day-free-low-cost-indoor-places.md` Place ID Set above.
- Required decision angle: `입장료 부담이 낮은 공공 시설과 부분 무료 시설을 먼저 고르게 한다.`
- Required internal links:
  - `/blog/places/capital-area-rainy-day-indoor-places`
  - `/blog/benefits/seoul-public-kids-cafe-guide`
  - `/blog/benefits/2026-parenting-benefits-guide`
  - `/benefits`
  - `/places?free=true`

- [ ] **Step 4: Create the same-day article**

Create `content/posts/places/same-day-indoor-places-without-reservation.md` with:

- Title: `예약 없이 갈 수 있는 실내 아이 나들이`
- Frontmatter: use the `same-day-indoor-places-without-reservation.md` Place ID Set above.
- Required decision angle: `예약 여부가 바뀔 수 있음을 전제로 당일 방문 가능성을 빠르게 확인하게 한다.`
- Required caution sentence:

```markdown
예약 없이 갈 수 있는 곳이라도 주말, 방학, 우천일에는 현장 대기나 회차 마감이 생길 수 있습니다.
```

- Required internal links:
  - `/blog/places/capital-area-rainy-day-indoor-places`
  - `/blog/places/seoul-rainy-day-indoor-places`
  - `/places?indoor=true`
  - `/places?rain=true`

- [ ] **Step 5: Create the Incheon article**

Create `content/posts/places/incheon-rainy-day-indoor-places.md` with:

- Title: `인천 비 오는 날 아이랑 갈 만한 실내 장소`
- Frontmatter: use the `incheon-rainy-day-indoor-places.md` Place ID Set above.
- Required decision angle: `연수, 서구, 계양, 중구, 강화권을 나눠 실내 이동 부담을 줄이게 한다.`
- Required internal links:
  - `/blog/places/capital-area-rainy-day-indoor-places`
  - `/blog/places/rainy-day-free-low-cost-indoor-places`
  - `/places/incheon`
  - `/places?rain=true`
- Required parking support links:
  - `/blog/parking/incheon-children-science-museum-parking`
  - `/blog/parking/national-museum-of-world-writing-parking`
  - `/blog/parking/national-incheon-marine-museum-parking`

- [ ] **Step 6: Create the Gyeonggi South article**

Create `content/posts/places/gyeonggi-south-rainy-day-indoor-places.md` with:

- Title: `경기 남부 비 오는 날 아이랑 갈 만한 실내 장소`
- Frontmatter: use the `gyeonggi-south-rainy-day-indoor-places.md` Place ID Set above.
- Required decision angle: `수원, 성남, 용인, 부천, 안양 생활권을 중심으로 이동 시간을 줄이게 한다.`
- Required internal links:
  - `/blog/places/capital-area-rainy-day-indoor-places`
  - `/blog/places/preschoolers-rainy-day-indoor-places`
  - `/places/gyeonggi-south`
  - `/places?rain=true`
- Required parking support links:
  - `/blog/parking/gyeonggi-children-museum-parking`
  - `/blog/parking/bucheon-robopark-parking`
  - `/blog/parking/korea-comics-museum-parking`
  - `/blog/parking/railroad-museum-parking`

- [ ] **Step 7: Create the toddler article**

Create `content/posts/places/toddlers-rainy-day-indoor-places.md` with:

- Title: `1~3세 아이와 비 오는 날 갈 만한 실내 장소`
- Frontmatter: use the `toddlers-rainy-day-indoor-places.md` Place ID Set above.
- Required decision angle: `짧은 체류, 유모차, 낮잠 전후 이동, 빠른 이탈 가능성을 기준으로 고르게 한다.`
- Required internal links:
  - `/blog/places/capital-area-rainy-day-indoor-places`
  - `/blog/places/rainy-day-free-low-cost-indoor-places`
  - `/places?age=1-3y`
  - `/places?indoor=true`
  - `/blog/benefits/seoul-public-kids-cafe-guide`

- [ ] **Step 8: Create the preschooler article**

Create `content/posts/places/preschoolers-rainy-day-indoor-places.md` with:

- Title: `3~6세 아이와 비 오는 날 갈 만한 실내 장소`
- Frontmatter: use the `preschoolers-rainy-day-indoor-places.md` Place ID Set above.
- Required decision angle: `전시 관람, 체험 활동, 체력 소모, 반복 놀이 가능성을 기준으로 고르게 한다.`
- Required internal links:
  - `/blog/places/capital-area-rainy-day-indoor-places`
  - `/blog/places/gyeonggi-south-rainy-day-indoor-places`
  - `/places?age=3-6y`
  - `/places?indoor=true`

- [ ] **Step 9: Run the content contract test**

Run:

```bash
node --test content/posts/places/rainy-day-indoor-cluster.test.mjs
```

Expected: PASS. If it fails on a missing place ID, fix the typo or choose another publishable place from `content/places`.

- [ ] **Step 10: Commit**

Run:

```bash
git add content/posts/places
git commit -m "[main][add]: 비 오는 날 실내 콘텐츠 클러스터 글 추가"
```

## Task 4: Preserve Place Metadata In Blog Loaders

**Files:**

- Modify: `lib/blog/posts.test.mjs`
- Modify: `lib/blog/posts.ts`

- [ ] **Step 1: Extend the blog loader test**

Append this test to `lib/blog/posts.test.mjs`:

```js
test('rainy day hub exposes place metadata through the blog loader', async () => {
  const { getPostBySlug, getAllPosts } = await import('./posts.ts')

  const post = getPostBySlug(
    'capital-area-rainy-day-indoor-places',
    'places'
  )

  assert.ok(post)
  assert.deepEqual(post.regions, [
    'seoul',
    'gyeonggi-south',
    'gyeonggi-north',
    'incheon',
  ])
  assert.deepEqual(post.ageBands, ['1-3y', '3-6y'])
  assert.equal(post.indoorOutdoor, 'indoor')
  assert.equal(post.placeIds.length >= 8, true)
  assert.equal(post.placeIds.includes('national-children-museum'), true)

  const summary = getAllPosts().find(
    item =>
      item.categorySlug === 'places' &&
      item.slug === 'capital-area-rainy-day-indoor-places'
  )

  assert.ok(summary)
  assert.equal(summary.placeIds.includes('national-children-museum'), true)
  assert.deepEqual(summary.regions, [
    'seoul',
    'gyeonggi-south',
    'gyeonggi-north',
    'incheon',
  ])
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
node --test lib/blog/posts.test.mjs
```

Expected: FAIL because `placeIds`, `regions`, `ageBands`, and `indoorOutdoor` are not returned from `lib/blog/posts.ts` yet.

- [ ] **Step 3: Add metadata passthrough to `getAllPosts()`**

In `lib/blog/posts.ts`, update the object returned inside `getAllPosts()`:

```ts
    return {
      slug: fileName,
      title: data.title,
      date: data.date,
      author: data.author,
      excerpt: data.excerpt,
      tags: data.tags || [],
      category,
      categorySlug,
      ogImage: data.ogImage,
      homeFeatured: data.homeFeatured,
      placeIds: data.placeIds || [],
      regions: data.regions || [],
      ageBands: data.ageBands || [],
      indoorOutdoor: data.indoorOutdoor,
    };
```

- [ ] **Step 4: Add metadata passthrough to `getPostBySlug()`**

In `lib/blog/posts.ts`, update the object returned inside `getPostBySlug()`:

```ts
    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      excerpt: data.excerpt,
      tags: data.tags || [],
      category,
      categorySlug: finalCategorySlug,
      ogImage: data.ogImage,
      homeFeatured: data.homeFeatured,
      placeIds: data.placeIds || [],
      regions: data.regions || [],
      ageBands: data.ageBands || [],
      indoorOutdoor: data.indoorOutdoor,
      content,
    };
```

- [ ] **Step 5: Run the blog loader test**

Run:

```bash
node --test lib/blog/posts.test.mjs
```

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```bash
git add lib/blog/posts.ts lib/blog/posts.test.mjs
git commit -m "[main][feat]: 블로그 장소 메타데이터 로딩 지원"
```

## Task 5: Add Sitemap Regression Coverage

**Files:**

- Create: `lib/seo/sitemap.test.mjs`

- [ ] **Step 1: Write the sitemap regression test**

Create `lib/seo/sitemap.test.mjs`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'

test('sitemap includes rainy day places category and hub post', async () => {
  const { collectBlogCategoryEntries, collectBlogPostEntries } = await import(
    './sitemap.ts'
  )

  const categoryUrls = collectBlogCategoryEntries().map(entry => entry.url)
  const postUrls = collectBlogPostEntries().map(entry => entry.url)

  assert.equal(
    categoryUrls.some(url => url.endsWith('/blog/places')),
    true
  )
  assert.equal(
    postUrls.some(url =>
      url.endsWith('/blog/places/capital-area-rainy-day-indoor-places')
    ),
    true
  )
})
```

- [ ] **Step 2: Run the sitemap test**

Run:

```bash
node --test lib/seo/sitemap.test.mjs
```

Expected: PASS because the category and posts were added in earlier tasks.

- [ ] **Step 3: Commit**

Run:

```bash
git add lib/seo/sitemap.test.mjs
git commit -m "[main][test]: 아이와 갈 곳 사이트맵 회귀 테스트 추가"
```

## Task 6: Verification Pass

**Files:**

- Verify: `lib/blog/posts.test.mjs`
- Verify: `content/posts/places/rainy-day-indoor-cluster.test.mjs`
- Verify: `lib/seo/sitemap.test.mjs`
- Verify: `lib/blog/markdown.test.mjs`
- Verify: `lib/blog/url.test.ts`

- [ ] **Step 1: Run focused tests**

Run:

```bash
node --test lib/blog/posts.test.mjs
node --test content/posts/places/rainy-day-indoor-cluster.test.mjs
node --test lib/seo/sitemap.test.mjs
node --test lib/blog/markdown.test.mjs
node --test lib/blog/url.test.ts
```

Expected: all PASS.

- [ ] **Step 2: Run type checking**

Run:

```bash
pnpm type-check
```

Expected: PASS.

- [ ] **Step 3: Run format check**

Run:

```bash
pnpm format:check
```

Expected: PASS. If Markdown formatting differs, run `pnpm format` and review only files touched by this plan.

- [ ] **Step 4: Run lint check**

Run:

```bash
pnpm lint:check
```

Expected: PASS.

- [ ] **Step 5: Check generated routes through the blog loader**

Run:

```bash
node --input-type=module -e "const { getAllPostSlugs } = await import('./lib/blog/posts.ts'); const slugs = getAllPostSlugs().filter(item => item.categorySlug === 'places').map(item => item.slug).sort(); console.log(slugs.join('\n'));"
```

Expected output includes exactly these 8 slugs:

```text
capital-area-rainy-day-indoor-places
gyeonggi-south-rainy-day-indoor-places
incheon-rainy-day-indoor-places
preschoolers-rainy-day-indoor-places
rainy-day-free-low-cost-indoor-places
same-day-indoor-places-without-reservation
seoul-rainy-day-indoor-places
toddlers-rainy-day-indoor-places
```

- [ ] **Step 6: Optional build verification**

Run this when the earlier checks pass and no unrelated local changes are blocking:

```bash
pnpm build
```

Expected: PASS.

- [ ] **Step 7: Commit verification-only formatting fixes if any**

If Step 3 required formatting changes, run:

```bash
git add content/posts/places lib/blog lib/seo
git commit -m "[main][chore]: 비 오는 날 콘텐츠 클러스터 형식 정리"
```

If no files changed during verification, skip this commit.

## Self-Review Checklist

Before handing off the implementation branch:

- Confirm all 8 posts contain `기준일: 2026년 6월`.
- Confirm every support post links to `/blog/places/capital-area-rainy-day-indoor-places`.
- Confirm the hub post links to all 7 support posts.
- Confirm every `placeIds` entry exists in `content/places`.
- Confirm no post uses `discovery_only` or `needs_refresh` representative places.
- Confirm `lib/blog/posts.ts` returns place metadata from both `getAllPosts()` and `getPostBySlug()`.
- Confirm Search Console target URLs are the article URLs, not faceted `/places?...` URLs.

## Brief Conclusion

This implementation should land in small commits: category registration, content contract plus 8 posts, metadata passthrough, sitemap regression, and verification. The result is a search-oriented but source-backed content cluster that reuses existing place seed data without adding a new rendering system.

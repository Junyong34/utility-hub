# Place Naver Blog Review Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 키즈카페 place 상세 페이지에 선별된 최신 네이버 블로그 후기 링크를 안전하게 확장해, 사용자가 공식 정보와 실제 방문 후기를 함께 확인하고 외부 링크로 이동할 수 있게 한다.

**Architecture:** 공식 운영 사실은 기존 `sourceUrl`, `verifiedAt`, `lastObservedAt`를 계속 기준으로 삼고, 네이버 블로그는 `externalBlogLinks`에 큐레이션 링크로만 저장한다. 런타임 크롤링 없이 정적 seed 데이터에 반영하며, UI는 최대 3개 링크만 노출하고 외부 후기 링크에는 `nofollow ugc`를 부여한다.

**Tech Stack:** Next.js App Router, React 19, TypeScript, `node --experimental-strip-types --test`, Playwright 선택 검증.

---

## Current Baseline

- `PlaceExternalBlogLink` 타입과 `externalBlogLinks` 필드는 이미 있다.
- `components/places/PlaceDetailPage.tsx`는 `PlaceBlogReviewSection`을 통해 외부 블로그 링크를 이미 렌더링한다.
- 2026-06-12 기준 키즈카페/베이비키즈카페 place는 76개이고, 이 중 36개에 `externalBlogLinks`가 있다.
- 인천 키즈카페 6개는 모두 `externalBlogLinks`가 없다.
- 기존 조사 문서:
  - `docs/research/places/place-blog-review-links-2026-05-08.md`
  - `docs/research/places/place-blog-review-pass-2026-05-08.md`

## File Structure

- Modify: `types/place-source.ts`
  - 외부 후기 링크에 발행일, 확인일, 선정 사유 메타데이터를 추가한다.
- Create: `lib/places/place-external-blog-links.ts`
  - 네이버 블로그 링크 판정, 표시 가능 여부, 외부 링크 `rel` 값을 한 곳에서 관리한다.
- Create: `lib/places/place-external-blog-links.test.mjs`
  - 링크 helper의 순수 동작을 검증한다.
- Modify: `components/places/PlaceBlogReviewSection.tsx`
  - helper를 사용하고 외부 링크에 `noopener noreferrer nofollow ugc`를 적용한다.
- Create: `content/places/external-blog-link-contract.test.mjs`
  - seed 데이터의 외부 블로그 링크 품질 계약을 검증한다.
- Modify: `content/places/incheon/index.ts`
  - 1차 배치로 인천 키즈카페 6개에 선별 링크를 추가하거나, 기준 미달 사유를 조사 문서에 남긴다.
- Modify: `content/places/gyeonggi-south/index.ts`
  - 1차 배치로 경기 남부의 고의도 키즈카페 후보 5개를 보강한다.
- Create: `docs/research/places/place-blog-review-links-2026-06-12.md`
  - 이번 배치에서 채택한 링크와 제외 사유를 기록한다.

## Curation Rules

1. place당 외부 블로그 링크는 1~3개만 둔다.
2. `title`, `href`, `sourceLabel`, `description`, `publishedAt`, `checkedAt`, `selectionReasons`를 입력한다.
3. `href`는 `https://blog.naver.com/...` 또는 `https://m.blog.naver.com/...`만 허용한다.
4. 본문 문장을 복사하지 않는다. 제목, URL, OG 메타, 직접 작성한 짧은 설명만 저장한다.
5. 공식 운영 사실은 블로그 후기에서 가져오지 않는다.
6. 광고·협찬 신호가 명확한 글은 제외한다.
7. 최신순만 보지 않고, 아래 사유 중 1개 이상을 만족하는 글을 우선한다.
   - `parking`: 주차 흐름이 있다.
   - `photos`: 실내 사진이 충분하다.
   - `reservation`: 예약·입장 흐름이 있다.
   - `age-fit`: 아이 연령 맥락이 있다.
   - `price`: 이용권·가격 체감이 있다.
   - `congestion`: 주말·혼잡도 맥락이 있다.
   - `recent-visit`: 최근 방문 신호가 있다.

## Task 1: Link Metadata And Helper

**Files:**

- Modify: `types/place-source.ts`
- Create: `lib/places/place-external-blog-links.ts`
- Test: `lib/places/place-external-blog-links.test.mjs`

- [ ] **Step 1: Extend external blog link types**

Update `types/place-source.ts` near `PlaceExternalBlogLink`.

```ts
export type PlaceExternalBlogLinkReason =
  | 'parking'
  | 'photos'
  | 'reservation'
  | 'age-fit'
  | 'price'
  | 'congestion'
  | 'recent-visit';

/** 외부 블로그 후기 링크 */
export interface PlaceExternalBlogLink {
  title: string;
  href: string;
  sourceLabel?: string;
  description?: string;
  /** 원문 발행일. 확인 불가 시 생략한다. */
  publishedAt?: string;
  /** 큐레이션 확인일. 새로 추가하는 링크는 반드시 입력한다. */
  checkedAt?: string;
  /** 이 링크를 선택한 이유. 새로 추가하는 링크는 1개 이상 입력한다. */
  selectionReasons?: PlaceExternalBlogLinkReason[];
  /** 원문/검색 메타데이터. 외부 이미지 URL은 참고용으로만 보관하고 썸네일로 사용하지 않는다. */
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}
```

- [ ] **Step 2: Write failing helper tests**

Create `lib/places/place-external-blog-links.test.mjs`.

```js
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  EXTERNAL_BLOG_LINK_REL,
  getExternalBlogSourceLabel,
  isDisplayableExternalBlogLink,
  isNaverBlogLink,
} from './place-external-blog-links.ts';

test('isNaverBlogLink accepts secure desktop and mobile naver blog URLs', () => {
  assert.equal(isNaverBlogLink('https://blog.naver.com/example/123'), true);
  assert.equal(isNaverBlogLink('https://m.blog.naver.com/example/123'), true);
});

test('isNaverBlogLink rejects insecure or non-naver URLs', () => {
  assert.equal(isNaverBlogLink('http://blog.naver.com/example/123'), false);
  assert.equal(isNaverBlogLink('https://example.com/post'), false);
  assert.equal(isNaverBlogLink('/blog/places/example'), false);
});

test('isDisplayableExternalBlogLink requires title and href', () => {
  assert.equal(
    isDisplayableExternalBlogLink({
      title: '아이와 방문 후기',
      href: 'https://blog.naver.com/example/123',
      sourceLabel: 'Naver Blog',
    }),
    true
  );

  assert.equal(
    isDisplayableExternalBlogLink({
      title: '',
      href: 'https://blog.naver.com/example/123',
    }),
    false
  );
});

test('getExternalBlogSourceLabel prefers sourceLabel and falls back to hostname', () => {
  assert.equal(
    getExternalBlogSourceLabel({
      title: '아이와 방문 후기',
      href: 'https://blog.naver.com/example/123',
      sourceLabel: 'Naver Blog',
    }),
    'Naver Blog'
  );

  assert.equal(
    getExternalBlogSourceLabel({
      title: '아이와 방문 후기',
      href: 'https://blog.naver.com/example/123',
    }),
    'blog.naver.com'
  );
});

test('external blog links use nofollow ugc rel', () => {
  assert.equal(EXTERNAL_BLOG_LINK_REL, 'noopener noreferrer nofollow ugc');
});
```

- [ ] **Step 3: Run helper tests and confirm failure**

Run:

```bash
node --experimental-strip-types --test lib/places/place-external-blog-links.test.mjs
```

Expected: FAIL because `lib/places/place-external-blog-links.ts` does not exist yet.

- [ ] **Step 4: Implement helper**

Create `lib/places/place-external-blog-links.ts`.

```ts
import type { PlaceExternalBlogLink } from '../../types/place-source.ts';

export const EXTERNAL_BLOG_LINK_REL = 'noopener noreferrer nofollow ugc';

const NAVER_BLOG_HOSTS = new Set(['blog.naver.com', 'm.blog.naver.com']);

export function isNaverBlogLink(href: string): boolean {
  try {
    const url = new URL(href);
    return url.protocol === 'https:' && NAVER_BLOG_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

export function isDisplayableExternalBlogLink(
  link: PlaceExternalBlogLink
): boolean {
  return Boolean(link.title.trim() && link.href.trim());
}

export function getExternalBlogSourceLabel(
  link: PlaceExternalBlogLink
): string {
  if (link.sourceLabel?.trim()) {
    return link.sourceLabel;
  }

  try {
    return new URL(link.href).hostname.replace(/^www\./, '');
  } catch {
    return '외부 블로그';
  }
}
```

- [ ] **Step 5: Run helper tests and confirm pass**

Run:

```bash
node --experimental-strip-types --test lib/places/place-external-blog-links.test.mjs
```

Expected: PASS.

## Task 2: Render External Review Links Safely

**Files:**

- Modify: `components/places/PlaceBlogReviewSection.tsx`
- Test: `lib/places/place-external-blog-links.test.mjs`

- [ ] **Step 1: Replace local external-link helpers**

In `components/places/PlaceBlogReviewSection.tsx`, import the helper.

```ts
import {
  EXTERNAL_BLOG_LINK_REL,
  getExternalBlogSourceLabel,
  isDisplayableExternalBlogLink,
} from '@/lib/places/place-external-blog-links';
```

Replace:

```ts
const visibleExternalLinks = externalLinks.filter(isValidLink).slice(0, 3);
```

with:

```ts
const visibleExternalLinks = externalLinks
  .filter(isDisplayableExternalBlogLink)
  .slice(0, 3);
```

Replace external link `rel`.

```tsx
rel = { EXTERNAL_BLOG_LINK_REL };
```

Replace source label rendering.

```tsx
{
  getExternalBlogSourceLabel(link);
}
```

Delete the local `isValidLink` and `getExternalSourceLabel` functions.

- [ ] **Step 2: Run helper tests**

Run:

```bash
node --experimental-strip-types --test lib/places/place-external-blog-links.test.mjs
```

Expected: PASS.

- [ ] **Step 3: Run type check**

Run:

```bash
pnpm type-check
```

Expected: PASS.

## Task 3: Add Data Contract Tests

**Files:**

- Create: `content/places/external-blog-link-contract.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write contract test**

Create `content/places/external-blog-link-contract.test.mjs`.

```js
import test from 'node:test';
import assert from 'node:assert/strict';

import { ALL_PLACES } from './index.ts';
import { isNaverBlogLink } from '../../lib/places/place-external-blog-links.ts';
import { PUBLISHABLE_STATUSES } from '../../types/place-source.ts';

const placesWithExternalLinks = ALL_PLACES.filter(place => {
  return (
    PUBLISHABLE_STATUSES.includes(place.verificationStatus) &&
    Array.isArray(place.externalBlogLinks) &&
    place.externalBlogLinks.length > 0
  );
});

test('publishable place external blog links are capped at three links', () => {
  for (const place of placesWithExternalLinks) {
    assert.equal(
      place.externalBlogLinks.length <= 3,
      true,
      `${place.id} must expose at most 3 external blog links`
    );
  }
});

test('publishable place external blog links point to secure naver blog URLs', () => {
  for (const place of placesWithExternalLinks) {
    for (const link of place.externalBlogLinks) {
      assert.equal(
        isNaverBlogLink(link.href),
        true,
        `${place.id} external blog link must be a secure Naver Blog URL: ${link.href}`
      );
    }
  }
});

test('publishable place external blog links include reader-facing labels', () => {
  for (const place of placesWithExternalLinks) {
    for (const link of place.externalBlogLinks) {
      assert.equal(
        Boolean(link.title?.trim()),
        true,
        `${place.id} link title is required`
      );
      assert.equal(
        Boolean(link.description?.trim()),
        true,
        `${place.id} link description is required`
      );
      assert.equal(
        link.sourceLabel,
        'Naver Blog',
        `${place.id} sourceLabel must be Naver Blog`
      );
    }
  }
});

test('newly curated external blog links use normalized metadata when present', () => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  for (const place of placesWithExternalLinks) {
    for (const link of place.externalBlogLinks) {
      if (link.publishedAt) {
        assert.match(
          link.publishedAt,
          datePattern,
          `${place.id} publishedAt must use YYYY-MM-DD`
        );
      }

      if (link.checkedAt) {
        assert.match(
          link.checkedAt,
          datePattern,
          `${place.id} checkedAt must use YYYY-MM-DD`
        );
      }

      if (link.selectionReasons) {
        assert.equal(
          link.selectionReasons.length > 0,
          true,
          `${place.id} selectionReasons must not be empty`
        );
      }
    }
  }
});
```

- [ ] **Step 2: Run contract test**

Run:

```bash
node --experimental-strip-types --test content/places/external-blog-link-contract.test.mjs
```

Expected: PASS after Task 1 helper exists. If it fails on an existing URL, correct the seed data instead of weakening the test.

- [ ] **Step 3: Add package script**

Add this script to `package.json`.

```json
"test:places:external-blog-links": "node --experimental-strip-types --test content/places/external-blog-link-contract.test.mjs"
```

- [ ] **Step 4: Run the new script**

Run:

```bash
pnpm test:places:external-blog-links
```

Expected: PASS.

## Task 4: Research Batch A, Incheon Kids Cafes

**Files:**

- Modify: `content/places/incheon/index.ts`
- Create: `docs/research/places/place-blog-review-links-2026-06-12.md`

Batch A targets:

| Place ID                                      | Place Name                           | Query 1                                            | Query 2                           | Query 3                                 |
| --------------------------------------------- | ------------------------------------ | -------------------------------------------------- | --------------------------------- | --------------------------------------- |
| `incheon-naughty-child-cheongna`              | 너티차일드 청라점                    | `너티차일드 청라점 아이랑 후기`                    | `너티차일드 청라점 주차 후기`     | `너티차일드 청라점 예약 가격 후기`      |
| `incheon-champion-black-belt-homeplus-songdo` | 챔피언더블랙벨트 홈플러스 인천송도점 | `챔피언더블랙벨트 홈플러스 인천송도점 아이랑 후기` | `챔피언더블랙벨트 송도 주차 후기` | `챔피언더블랙벨트 인천송도점 가격 후기` |
| `incheon-baby-angels-homeplus-songdo`         | 베이비엔젤스 홈플러스 인천송도점     | `베이비엔젤스 홈플러스 인천송도점 아기랑 후기`     | `베이비엔젤스 송도 주차 후기`     | `베이비엔젤스 인천송도점 가격 후기`     |
| `incheon-champion-1250-guwol-traders`         | 챔피언1250 트레이더스 구월점         | `챔피언1250 트레이더스 구월점 아이랑 후기`         | `챔피언1250 구월점 주차 후기`     | `챔피언1250 구월점 가격 후기`           |
| `incheon-monster-park-guwol`                  | 몬스터파크 구월점                    | `몬스터파크 구월점 아이랑 후기`                    | `몬스터파크 구월점 주차 후기`     | `몬스터파크 구월점 가격 후기`           |
| `incheon-dinosaur-world`                      | 공룡월드 인천점                      | `공룡월드 인천점 아이랑 후기`                      | `공룡월드 인천점 주차 후기`       | `공룡월드 인천점 가격 후기`             |

- [ ] **Step 1: For each target, inspect the latest search results**

Use Naver search or browser search. Accept 1~3 links per place. A link is accepted only if it has:

- exact or near-exact place match,
- child visit context,
- one of parking, photos, reservation, age, price, congestion, or recent visit,
- no obvious ad-only or unrelated-place signal.

- [ ] **Step 2: Record accepted and rejected candidates**

Create `docs/research/places/place-blog-review-links-2026-06-12.md` with this structure.

```md
# 장소 외부 블로그 링크 추가 내역

- 생성일: 2026-06-12
- 배치: 인천 키즈카페 6곳 + 경기 남부 고의도 후보 5곳
- 원칙: 공식 운영 사실은 place seed의 `sourceUrl`을 기준으로 유지하고, 네이버 블로그는 방문 전 참고 후기 링크로만 사용한다.
- 외부 이미지 정책: 외부 이미지 URL은 OG 메타데이터로만 보관하고 렌더링 이미지로 사용하지 않는다.

## incheon-naughty-child-cheongna

- 장소명: 너티차일드 청라점
- 판정: 채택 또는 pass
- 채택 링크:
  - 제목:
  - URL:
  - 작성일:
  - 선정 사유:
- 제외 링크:
  - 제목:
  - URL:
  - 제외 사유:
```

If a place has zero accepted links, write `판정: pass` and the exact rejection reasons.

- [ ] **Step 3: Add accepted links to Incheon seed**

For each accepted link, add this shape to the matching place in `content/places/incheon/index.ts`.

```ts
externalBlogLinks: [
  {
    title: '네이버 블로그 원문 제목',
    href: 'https://blog.naver.com/example/123456789',
    sourceLabel: 'Naver Blog',
    description:
      '주차와 입장 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
    publishedAt: '2026-06-01',
    checkedAt: '2026-06-12',
    selectionReasons: ['parking', 'photos', 'recent-visit'],
    ogTitle: '네이버 블로그 원문 제목',
    ogDescription: '검색 결과 또는 OG 설명에서 확인한 짧은 설명',
    ogImage: 'https://search.pstatic.net/common/example.jpg',
  },
],
```

If `publishedAt` or `ogImage` cannot be confirmed, omit that field. Do not invent dates or image URLs.

- [ ] **Step 4: Run data contract tests**

Run:

```bash
pnpm test:places:external-blog-links
pnpm test:places:contracts
```

Expected: both PASS.

## Task 5: Research Batch B, High-Intent Gyeonggi-South Kids Cafes

**Files:**

- Modify: `content/places/gyeonggi-south/index.ts`
- Modify: `docs/research/places/place-blog-review-links-2026-06-12.md`

Batch B targets:

| Place ID                                               | Place Name                            | Query 1                                      | Query 2                                | Query 3                              |
| ------------------------------------------------------ | ------------------------------------- | -------------------------------------------- | -------------------------------------- | ------------------------------------ |
| `gyeonggi-south-dinosaur-world-dongtan`                | 공룡월드 동탄점                       | `공룡월드 동탄점 아이랑 후기`                | `공룡월드 동탄점 주차 후기`            | `공룡월드 동탄점 가격 후기`          |
| `gyeonggi-south-superwings-lotte-mart-suwon-yeongtong` | 슈퍼윙스 키즈카페 롯데마트 수원영통점 | `슈퍼윙스 키즈카페 수원영통점 후기`          | `슈퍼윙스 롯데마트 수원영통 주차 후기` | `슈퍼윙스 수원영통점 가격 후기`      |
| `gyeonggi-south-pororo-park-ansan`                     | 뽀로로파크 안산점                     | `뽀로로파크 안산점 아이랑 후기`              | `뽀로로파크 안산점 주차 후기`          | `뽀로로파크 안산점 가격 후기`        |
| `toy-kingdom-suwon`                                    | 토이킹덤 스타필드 수원                | `토이킹덤 스타필드 수원 아이랑 후기`         | `토이킹덤 스타필드 수원 주차 후기`     | `토이킹덤 스타필드 수원 아기랑 후기` |
| `champion-black-belt-bucheon`                          | 챔피언 더 블랙벨트 스타필드 시티 부천 | `챔피언 더 블랙벨트 스타필드 시티 부천 후기` | `챔피언 블랙벨트 부천 주차 후기`       | `챔피언 스타필드 부천 아이랑 후기`   |

- [ ] **Step 1: Research accepted links with the same rules as Task 4**

Use the exact queries above. Prefer links that mention parking, price, age, or weekend crowding.

- [ ] **Step 2: Record accepted and rejected candidates**

Append the same research structure to `docs/research/places/place-blog-review-links-2026-06-12.md`.

- [ ] **Step 3: Add accepted links to Gyeonggi South seed**

Use the same `externalBlogLinks` shape from Task 4.

- [ ] **Step 4: Run data contract tests**

Run:

```bash
pnpm test:places:external-blog-links
pnpm test:places:contracts
```

Expected: both PASS.

## Task 6: Surface Review Availability In Place Cards

**Files:**

- Modify: `components/places/PlaceCard.tsx`
- Test: `pnpm type-check`

- [ ] **Step 1: Add a compact review badge**

In `components/places/PlaceCard.tsx`, derive review count.

```ts
const externalReviewCount = place.externalBlogLinks?.length ?? 0;
```

Render a compact text badge near the existing metadata row.

```tsx
{
  externalReviewCount > 0 ? (
    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/7 px-2 py-0.5 text-[11px] font-bold text-primary-deep">
      후기 {Math.min(externalReviewCount, 3)}개
    </span>
  ) : null;
}
```

Do not link directly to Naver from the card. The card should still send users to the place detail page where official information and external reviews are separated.

- [ ] **Step 2: Run type check**

Run:

```bash
pnpm type-check
```

Expected: PASS.

## Task 7: Verification

**Files:**

- No new source files unless tests reveal a defect.

- [ ] **Step 1: Run focused tests**

Run:

```bash
node --experimental-strip-types --test lib/places/place-external-blog-links.test.mjs
pnpm test:places:external-blog-links
pnpm test:places:contracts
```

Expected: all PASS.

- [ ] **Step 2: Run project type check**

Run:

```bash
pnpm type-check
```

Expected: PASS.

- [ ] **Step 3: Run formatting check**

Run:

```bash
pnpm format:check
```

Expected: PASS. If it fails on edited files, run `pnpm format` and re-run `pnpm format:check`.

- [ ] **Step 4: Browser spot check**

Run the dev server:

```bash
pnpm dev
```

Open:

- `http://127.0.0.1:3000/places/incheon/incheon-naughty-child-cheongna`
- `http://127.0.0.1:3000/places/gyeonggi-south/gyeonggi-south-dinosaur-world-dongtan`

Expected:

- Detail page shows official info and map buttons.
- If accepted links were added, `방문 전 읽어볼 후기` appears.
- External review links open in a new tab.
- Links include `rel="noopener noreferrer nofollow ugc"` in the rendered anchor.

## Task 8: Post-Launch Measurement

**Files:**

- No code changes in this task.

- [ ] **Step 1: Record baseline before deployment**

Record these values in the deployment note:

- number of kids-cafe places with external blog links,
- number of incheon kids-cafe places with external blog links,
- number of gyeonggi-south high-intent targets with external blog links.

- [ ] **Step 2: Check Search Console after 14 days**

Review:

- `/places/incheon/*` impressions and clicks,
- `/places/gyeonggi-south/*` impressions and clicks,
- queries containing `후기`, `주차`, `가격`, `아이랑`, `아기랑`,
- place detail pages with improved engagement.

- [ ] **Step 3: Decide next batch**

Proceed only if at least one of these signals appears:

- place detail pages gain impressions,
- Search Console queries include review/parking/price modifiers,
- users click from blog posts to place detail pages,
- high-intent place pages begin ranking for exact place names.

Next batch priority:

1. remaining Incheon kids cafes with pass status now showing fresh posts,
2. 경기 북부 고양·파주 키즈카페,
3. 서울 pass places where new 2026 reviews now exist,
4. public-play places only when review value is stronger than official info.

## Self-Review

- Spec coverage: The plan covers safe external link rendering, metadata, tests, first data batch, research logging, and post-launch measurement.
- Placeholder scan: No implementation step depends on unnamed files or undefined functions. Research tasks use exact target place IDs and exact query strings.
- Type consistency: `PlaceExternalBlogLinkReason`, `selectionReasons`, `publishedAt`, and `checkedAt` are introduced in Task 1 and reused consistently in data tasks.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-12-place-naver-blog-review-links.md`.

Two execution options:

1. Subagent-Driven (recommended) - dispatch a fresh subagent per task, review between tasks, fast iteration.
2. Inline Execution - execute tasks in this session using executing-plans, batch execution with checkpoints.

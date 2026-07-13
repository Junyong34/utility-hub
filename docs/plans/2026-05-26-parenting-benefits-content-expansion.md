# Parenting Benefits Content Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 혜택·지원금 메뉴에 육아 관련 혜택 데이터를 구조화해서 노출하고, 서울·경기·인천 중심의 우선순위 콘텐츠를 추가한다.

**Architecture:** 장소 seed가 `content/places`에 쌓이는 방식과 맞춰, 혜택도 `content/benefits`에 타입스크립트 seed를 둔다. 필터링과 정렬은 `lib/benefits` 쿼리 함수로 분리하고, `/benefits` 허브는 seed에서 대표 혜택 카드를 렌더링한다. 상세 설명은 기존 블로그 시스템의 `content/posts/benefits/*.md`를 사용한다.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, lucide-react, node:test, pnpm.

---

## Scope

Phase A에서 추가할 혜택 축은 아래 3개다.

1. 전국 공통: 출생·보육·저소득 영아 지원
2. 지역 혜택: 서울·경기·인천의 키즈카페, 돌봄, 교통, 다자녀 혜택
3. 절약 가이드: 아이와 갈 곳 콘텐츠와 연결되는 할인·바우처·공공시설 이용 정보

Phase A에서 새로 만드는 기능은 “검색 가능한 전체 혜택 DB”가 아니라 “공식 출처가 있는 대표 혜택 카드와 글 연결”이다.

## File Map

- Create: `types/benefit-source.ts`
  - 혜택 seed의 타입, 지역/연령/혜택 형태/검증 상태를 정의한다.
- Create: `content/benefits/index.ts`
  - 공식 출처가 확인된 Phase A 혜택 seed와 중복 ID 검사를 담는다.
- Create: `content/benefits/index.test.mjs`
  - 혜택 seed의 최소 품질 조건을 검증한다.
- Create: `lib/benefits/benefit-queries.ts`
  - 발행 가능 혜택 필터링, 카테고리/지역/추천 정렬을 제공한다.
- Create: `lib/benefits/benefit-queries.test.mjs`
  - 혜택 쿼리 함수의 동작을 순수 데이터 fixture로 검증한다.
- Create: `components/benefits/BenefitCard.tsx`
  - 혜택 seed 한 개를 카드로 렌더링한다.
- Modify: `components/benefits/BenefitsHub.tsx`
  - “먼저 볼 혜택” 섹션을 추가하고 대표 혜택 카드를 노출한다.
- Create: `content/posts/benefits/seoul-public-kids-cafe-guide.md`
  - 서울형 키즈카페와 서울형키즈카페머니를 장소 탐색 관점에서 정리한다.
- Create: `content/posts/benefits/gyeonggi-family-care-allowance-guide.md`
  - 경기도 가족돌봄수당을 24~48개월 돌봄 공백 관점에서 정리한다.
- Create: `content/posts/benefits/incheon-cheonsa-support-guide.md`
  - 인천 천사지원금을 1~7세 가정 관점에서 정리한다.
- Modify: `lib/benefits/config.ts`
  - 공식 출처 목록에 서울시, 경기도, 인천시를 추가한다.
- Optional Modify: `rules/changelog.md`
  - 사용자가 변경 이력 기록을 원하면 혜택 메뉴 확장 내역을 추가한다.

## Data Source Policy

모든 seed와 글은 아래 기준을 만족해야 한다.

- `officialSourceUrl`은 정부, 지자체, 공공기관 공식 URL만 허용한다.
- `verifiedAt`은 실제 확인일인 `2026-05-26`으로 시작한다.
- 지원 금액, 대상, 신청 경로는 공식 페이지 확인 후 글에 쓴다.
- 공식 페이지에서 확인하지 못한 금액은 카드 summary에 단정적으로 쓰지 않는다.
- 민간 블로그, 카페, 뉴스 요약은 발행 근거로 쓰지 않는다.

Phase A 공식 출처 후보:

- 정부24 행복출산 원스톱서비스: `https://www.gov.kr/portal/onestopSvc/happyBirth`
- 첫만남이용권 지원 안내: `http://www.voucher.go.kr/voucher/firstEncounter.do`
- 첫만남이용권 사용처·제외 업종: `http://www.voucher.go.kr/store/firstEncounter.do`
- 복지로 기저귀·조제분유 지원: `https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000092`
- 서울형 키즈카페: `https://umppa.seoul.go.kr/hmpg/sprt/bzin/bzmgComtDetail.do?biz_mng_no=6DD24707FB4941C09D10B50AF4917997`
- 서울형키즈카페머니: `https://umppa.seoul.go.kr/icare/dolbomMENU5/dolbomMENU5_3.jsp`
- 서울 다둥이 행복카드: `https://news.seoul.go.kr/welfare/archives/100261`
- 경기도 가족돌봄수당: `https://gnews.gg.go.kr/briefing/brief_gongbo_view.do?BS_CODE=S017&number=68925`
- 경기도 어린이·청소년 교통비 지원: `https://www.gg.go.kr/contents/contents.do?ciIdx=987119&menuId=266082`
- 인천 천사지원금: `https://www.incheon.go.kr/IC010205/view?curPage=1&repSeq=DOM_0000000014462863`
- 인천 New 아이모아카드: `https://www.incheon.go.kr/earlychild/EC040302`

---

### Task 1: Define Benefit Source Types

**Files:**

- Create: `types/benefit-source.ts`

- [ ] **Step 1: Create the type file**

Use this exact structure:

```ts
import type { RegionSlug, VerificationStatus } from './place-source.ts';

export type BenefitRegionSlug = 'national' | RegionSlug;

export type BenefitCategoryId = 'government' | 'regional' | 'savings';

export type BenefitAgeBand =
  | 'pregnancy-birth'
  | '0-23m'
  | '24-36m'
  | '3-5y'
  | '6-7y'
  | 'all';

export type BenefitForm =
  | 'cash'
  | 'voucher'
  | 'discount'
  | 'transport'
  | 'care'
  | 'facility';

export type BenefitApplicationMethod =
  | 'online'
  | 'resident-center'
  | 'card'
  | 'reservation'
  | 'provider'
  | 'mixed';

export interface BenefitSource {
  id: string;
  title: string;
  summary: string;
  categoryId: BenefitCategoryId;
  regions: BenefitRegionSlug[];
  ageBands: BenefitAgeBand[];
  benefitForms: BenefitForm[];
  applicationMethod: BenefitApplicationMethod;
  primaryActionLabel: string;
  primaryActionHref: string;
  officialSourceName: string;
  officialSourceUrl: string;
  verifiedAt: string;
  lastObservedAt: string;
  verificationStatus: VerificationStatus;
  priority: number;
  relatedPlaceIds?: string[];
  relatedToolIds?: string[];
  relatedPostSlug?: string;
  editorNote?: string;
}
```

- [ ] **Step 2: Run type checking**

Run:

```bash
pnpm type-check
```

Expected: existing project type check should pass, or fail only on pre-existing unrelated errors. If it fails on `types/benefit-source.ts`, fix the type import or exported union names before moving on.

- [ ] **Step 3: Commit**

```bash
git add types/benefit-source.ts
git commit -m "[현재브랜치명][add]: 육아 혜택 데이터 타입 추가

- 혜택 seed용 지역, 연령, 혜택 형태 타입 추가
- 공식 출처와 검증 상태 필드 정의"
```

### Task 2: Add Phase A Benefit Seed Data

**Files:**

- Create: `content/benefits/index.ts`
- Create: `content/benefits/index.test.mjs`

- [ ] **Step 1: Write seed contract tests first**

Create `content/benefits/index.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';

test('benefits index exposes phase a seed data', async () => {
  const { ALL_BENEFITS } = await import('./index.ts');

  assert.equal(ALL_BENEFITS.length >= 8, true);
});

test('benefits index rejects duplicate ids', async () => {
  const { assertUniqueBenefitIds } = await import('./index.ts');

  assert.throws(
    () =>
      assertUniqueBenefitIds([
        { id: 'duplicate-benefit', title: 'A' },
        { id: 'duplicate-benefit', title: 'B' },
      ]),
    /Duplicate benefit id: duplicate-benefit/
  );
});

test('every benefit has an official https source and verification date', async () => {
  const { ALL_BENEFITS } = await import('./index.ts');

  for (const benefit of ALL_BENEFITS) {
    assert.match(benefit.officialSourceUrl, /^https:\/\//, benefit.id);
    assert.match(benefit.verifiedAt, /^\d{4}-\d{2}-\d{2}$/, benefit.id);
    assert.match(benefit.lastObservedAt, /^\d{4}-\d{2}-\d{2}$/, benefit.id);
    assert.equal(
      ['official_verified', 'semi_verified'].includes(
        benefit.verificationStatus
      ),
      true,
      benefit.id
    );
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
node --test content/benefits/index.test.mjs
```

Expected: FAIL because `content/benefits/index.ts` does not exist.

- [ ] **Step 3: Create seed data**

Create `content/benefits/index.ts` with these 8 Phase A items:

```ts
import type { BenefitSource } from '../../types/benefit-source.ts';

export function assertUniqueBenefitIds<T extends { id: string }>(
  benefits: T[]
): void {
  const seenIds = new Set<string>();

  for (const benefit of benefits) {
    if (seenIds.has(benefit.id)) {
      throw new Error(`Duplicate benefit id: ${benefit.id}`);
    }

    seenIds.add(benefit.id);
  }
}

export const ALL_BENEFITS: BenefitSource[] = [
  {
    id: 'seoul-public-kids-cafe',
    title: '서울형 키즈카페',
    summary:
      '서울 공공 키즈카페 예약과 민간 키즈카페 할인 정보를 함께 확인하는 장소형 혜택입니다.',
    categoryId: 'regional',
    regions: ['seoul'],
    ageBands: ['0-23m', '24-36m', '3-5y', '6-7y'],
    benefitForms: ['facility', 'discount'],
    applicationMethod: 'reservation',
    primaryActionLabel: '서울형 키즈카페 보기',
    primaryActionHref: '/blog/benefits/seoul-public-kids-cafe-guide',
    officialSourceName: '서울시 몽땅정보 만능키',
    officialSourceUrl:
      'https://umppa.seoul.go.kr/hmpg/sprt/bzin/bzmgComtDetail.do?biz_mng_no=6DD24707FB4941C09D10B50AF4917997',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 10,
    relatedPostSlug: 'seoul-public-kids-cafe-guide',
    editorNote:
      '장소 탐색과 직접 연결되는 혜택이므로 /places 서울 공공 놀이시설과 함께 연결한다.',
  },
  {
    id: 'seoul-kids-cafe-money',
    title: '서울형키즈카페머니',
    summary:
      '서울형키즈카페머니 사용처와 민간 키즈카페 할인 여부를 확인하는 절약형 혜택입니다.',
    categoryId: 'savings',
    regions: ['seoul'],
    ageBands: ['0-23m', '24-36m', '3-5y', '6-7y'],
    benefitForms: ['discount', 'voucher'],
    applicationMethod: 'card',
    primaryActionLabel: '사용처 확인하기',
    primaryActionHref:
      'https://umppa.seoul.go.kr/icare/dolbomMENU5/dolbomMENU5_3.jsp',
    officialSourceName: '서울시 몽땅정보 만능키',
    officialSourceUrl:
      'https://umppa.seoul.go.kr/icare/dolbomMENU5/dolbomMENU5_3.jsp',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 9,
  },
  {
    id: 'gyeonggi-family-care-allowance',
    title: '경기도 가족돌봄수당',
    summary:
      '조부모·친인척·이웃 돌봄을 이용하는 가정이 확인할 수 있는 경기 지역 돌봄 혜택입니다.',
    categoryId: 'regional',
    regions: ['gyeonggi-south', 'gyeonggi-north'],
    ageBands: ['24-36m', '3-5y'],
    benefitForms: ['cash', 'care'],
    applicationMethod: 'online',
    primaryActionLabel: '신청 조건 보기',
    primaryActionHref: '/blog/benefits/gyeonggi-family-care-allowance-guide',
    officialSourceName: '경기도',
    officialSourceUrl:
      'https://gnews.gg.go.kr/briefing/brief_gongbo_view.do?BS_CODE=S017&number=68925',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 8,
    relatedPostSlug: 'gyeonggi-family-care-allowance-guide',
  },
  {
    id: 'gyeonggi-child-teen-transport',
    title: '경기도 어린이·청소년 교통비 지원',
    summary:
      '아이와 대중교통 나들이를 자주 하는 경기 가정이 확인할 수 있는 교통비 지원입니다.',
    categoryId: 'savings',
    regions: ['gyeonggi-south', 'gyeonggi-north'],
    ageBands: ['6-7y'],
    benefitForms: ['transport'],
    applicationMethod: 'online',
    primaryActionLabel: '교통비 지원 보기',
    primaryActionHref:
      'https://www.gg.go.kr/contents/contents.do?ciIdx=987119&menuId=266082',
    officialSourceName: '경기도',
    officialSourceUrl:
      'https://www.gg.go.kr/contents/contents.do?ciIdx=987119&menuId=266082',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 7,
  },
  {
    id: 'incheon-cheonsa-support',
    title: '인천 천사지원금',
    summary:
      '인천 1~7세 아동 가정이 확인해야 할 아이드림 계열 현금성 지원입니다.',
    categoryId: 'regional',
    regions: ['incheon'],
    ageBands: ['0-23m', '24-36m', '3-5y', '6-7y'],
    benefitForms: ['cash'],
    applicationMethod: 'online',
    primaryActionLabel: '인천 지원금 보기',
    primaryActionHref: '/blog/benefits/incheon-cheonsa-support-guide',
    officialSourceName: '인천광역시',
    officialSourceUrl:
      'https://www.incheon.go.kr/IC010205/view?curPage=1&repSeq=DOM_0000000014462863',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 10,
    relatedPostSlug: 'incheon-cheonsa-support-guide',
  },
  {
    id: 'incheon-new-imoa-card',
    title: '인천 New 아이모아카드',
    summary:
      '인천 다자녀 가정이 공공시설, 문화시설, 생활 할인 혜택을 확인할 때 쓰는 카드 혜택입니다.',
    categoryId: 'savings',
    regions: ['incheon'],
    ageBands: ['all'],
    benefitForms: ['discount'],
    applicationMethod: 'card',
    primaryActionLabel: '카드 혜택 보기',
    primaryActionHref: 'https://www.incheon.go.kr/earlychild/EC040302',
    officialSourceName: '인천광역시 영유아정책과',
    officialSourceUrl: 'https://www.incheon.go.kr/earlychild/EC040302',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 6,
  },
  {
    id: 'national-first-encounter-voucher',
    title: '첫만남이용권',
    summary:
      '출생 초기 바우처로 조리원, 육아용품, 병원비 지출 계획을 세울 때 함께 확인합니다.',
    categoryId: 'government',
    regions: ['national'],
    ageBands: ['pregnancy-birth', '0-23m'],
    benefitForms: ['voucher'],
    applicationMethod: 'mixed',
    primaryActionLabel: '사용처 확인하기',
    primaryActionHref: 'http://www.voucher.go.kr/store/firstEncounter.do',
    officialSourceName: '국민행복카드',
    officialSourceUrl: 'http://www.voucher.go.kr/store/firstEncounter.do',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 8,
  },
  {
    id: 'national-diaper-formula-voucher',
    title: '기저귀·조제분유 지원',
    summary:
      '0~24개월 영아 가정 중 지원 대상에 해당하는지 확인해야 하는 바우처형 혜택입니다.',
    categoryId: 'government',
    regions: ['national'],
    ageBands: ['0-23m'],
    benefitForms: ['voucher'],
    applicationMethod: 'mixed',
    primaryActionLabel: '복지로에서 보기',
    primaryActionHref:
      'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000092',
    officialSourceName: '복지로',
    officialSourceUrl:
      'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000092',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 5,
  },
];

assertUniqueBenefitIds(ALL_BENEFITS);
```

- [ ] **Step 4: Run seed tests**

Run:

```bash
node --test content/benefits/index.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add content/benefits/index.ts content/benefits/index.test.mjs
git commit -m "[현재브랜치명][add]: 육아 혜택 Phase A seed 추가

- 서울·경기·인천 중심 대표 혜택 seed 추가
- 중복 ID와 공식 출처 검증 테스트 추가"
```

### Task 3: Add Benefit Query Utilities

**Files:**

- Create: `lib/benefits/benefit-queries.ts`
- Create: `lib/benefits/benefit-queries.test.mjs`

- [ ] **Step 1: Write query tests first**

Create `lib/benefits/benefit-queries.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';

const BENEFIT_FIXTURES = [
  {
    id: 'seoul-card',
    title: '서울 카드',
    categoryId: 'regional',
    regions: ['seoul'],
    ageBands: ['3-5y'],
    benefitForms: ['discount'],
    verificationStatus: 'official_verified',
    priority: 2,
  },
  {
    id: 'national-voucher',
    title: '전국 바우처',
    categoryId: 'government',
    regions: ['national'],
    ageBands: ['0-23m'],
    benefitForms: ['voucher'],
    verificationStatus: 'semi_verified',
    priority: 4,
  },
  {
    id: 'draft-benefit',
    title: '미검증 혜택',
    categoryId: 'regional',
    regions: ['incheon'],
    ageBands: ['all'],
    benefitForms: ['cash'],
    verificationStatus: 'needs_refresh',
    priority: 10,
  },
];

test('getPublishableBenefitsFrom keeps only verified benefits', async () => {
  const { getPublishableBenefitsFrom } = await import('./benefit-queries.ts');

  assert.deepEqual(
    getPublishableBenefitsFrom(BENEFIT_FIXTURES).map(benefit => benefit.id),
    ['seoul-card', 'national-voucher']
  );
});

test('getBenefitsByRegionFrom includes national benefits for regional queries', async () => {
  const { getBenefitsByRegionFrom } = await import('./benefit-queries.ts');

  assert.deepEqual(
    getBenefitsByRegionFrom(BENEFIT_FIXTURES, 'seoul').map(
      benefit => benefit.id
    ),
    ['seoul-card', 'national-voucher']
  );
});

test('getFeaturedBenefitsFrom sorts publishable benefits by priority descending', async () => {
  const { getFeaturedBenefitsFrom } = await import('./benefit-queries.ts');

  assert.deepEqual(
    getFeaturedBenefitsFrom(BENEFIT_FIXTURES, 2).map(benefit => benefit.id),
    ['national-voucher', 'seoul-card']
  );
});

test('getBenefitsByCategoryFrom returns publishable benefits in a category', async () => {
  const { getBenefitsByCategoryFrom } = await import('./benefit-queries.ts');

  assert.deepEqual(
    getBenefitsByCategoryFrom(BENEFIT_FIXTURES, 'government').map(
      benefit => benefit.id
    ),
    ['national-voucher']
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
node --test lib/benefits/benefit-queries.test.mjs
```

Expected: FAIL because `lib/benefits/benefit-queries.ts` does not exist.

- [ ] **Step 3: Implement query utilities**

Create `lib/benefits/benefit-queries.ts`:

```ts
import type {
  BenefitCategoryId,
  BenefitRegionSlug,
  BenefitSource,
} from '../../types/benefit-source.ts';
import { PUBLISHABLE_STATUSES } from '../../types/place-source.ts';

function isPublishableBenefit(benefit: BenefitSource): boolean {
  return PUBLISHABLE_STATUSES.includes(benefit.verificationStatus);
}

export function getPublishableBenefitsFrom(
  benefits: BenefitSource[]
): BenefitSource[] {
  return benefits.filter(isPublishableBenefit);
}

export function getBenefitsByCategoryFrom(
  benefits: BenefitSource[],
  categoryId: BenefitCategoryId
): BenefitSource[] {
  return getPublishableBenefitsFrom(benefits).filter(
    benefit => benefit.categoryId === categoryId
  );
}

export function getBenefitsByRegionFrom(
  benefits: BenefitSource[],
  region: BenefitRegionSlug
): BenefitSource[] {
  return getPublishableBenefitsFrom(benefits).filter(
    benefit =>
      benefit.regions.includes(region) || benefit.regions.includes('national')
  );
}

export function getFeaturedBenefitsFrom(
  benefits: BenefitSource[],
  limit = 6
): BenefitSource[] {
  return getPublishableBenefitsFrom(benefits)
    .toSorted((a, b) => b.priority - a.priority)
    .slice(0, limit);
}

export function getBenefitByIdFrom(
  benefits: BenefitSource[],
  id: string
): BenefitSource | undefined {
  return benefits.find(benefit => benefit.id === id);
}
```

- [ ] **Step 4: Run query tests**

Run:

```bash
node --test lib/benefits/benefit-queries.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/benefits/benefit-queries.ts lib/benefits/benefit-queries.test.mjs
git commit -m "[현재브랜치명][add]: 육아 혜택 조회 유틸 추가

- 발행 가능 혜택 필터링 추가
- 카테고리, 지역, 추천 혜택 조회 함수 추가"
```

### Task 4: Render Featured Benefit Cards On Benefits Hub

**Files:**

- Create: `components/benefits/BenefitCard.tsx`
- Modify: `components/benefits/BenefitsHub.tsx`

- [ ] **Step 1: Create `BenefitCard`**

Create `components/benefits/BenefitCard.tsx`:

```tsx
import Link from 'next/link';
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react';
import type { BenefitSource } from '@/types/benefit-source';

function isInternalHref(href: string): boolean {
  return href.startsWith('/');
}

export function BenefitCard({ benefit }: { benefit: BenefitSource }) {
  const external = !isInternalHref(benefit.primaryActionHref);

  return (
    <article className="flex h-full flex-col rounded-[24px] border border-[#e3d8ca] bg-white/78 p-5 shadow-[0_14px_36px_rgba(56,46,33,0.06)]">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {benefit.regions.map(region => (
            <span
              key={region}
              className="rounded-full bg-[#eef3e7] px-2.5 py-1 text-[11px] font-semibold text-[#526049]"
            >
              {region === 'national' ? '전국' : region}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-[#2d271f]">
          {benefit.title}
        </h3>
        <p className="text-sm leading-6 text-[#6a5d4d]">{benefit.summary}</p>
      </div>

      <div className="mt-5 border-t border-[#ece2d6] pt-4 text-xs leading-5 text-[#7a6a58]">
        <p>출처: {benefit.officialSourceName}</p>
        <p>기준일: {benefit.verifiedAt}</p>
      </div>

      <Link
        href={benefit.primaryActionHref}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[#4c6651] transition-colors hover:text-[#2f4634]"
      >
        <span>{benefit.primaryActionLabel}</span>
        {external ? (
          <ExternalLinkIcon className="h-3.5 w-3.5" />
        ) : (
          <ArrowRightIcon className="h-3.5 w-3.5" />
        )}
      </Link>
    </article>
  );
}
```

- [ ] **Step 2: Update `BenefitsHub` imports**

Modify `components/benefits/BenefitsHub.tsx`:

```tsx
import { ALL_BENEFITS } from '@/content/benefits';
import { getFeaturedBenefitsFrom } from '@/lib/benefits/benefit-queries';
import { BenefitCard } from '@/components/benefits/BenefitCard';
```

- [ ] **Step 3: Add featured benefits constant inside component**

Inside `BenefitsHub`, before the `return`, add:

```tsx
const featuredBenefits = getFeaturedBenefitsFrom(ALL_BENEFITS, 6);
```

- [ ] **Step 4: Add featured benefits section after category cards**

Insert this section after the “주제별 탐색” section:

```tsx
<section className="space-y-5">
  <div className="max-w-2xl space-y-2">
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
      먼저 볼 혜택
    </p>
    <h2
      className="text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem]"
      style={{
        fontFamily:
          '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
      }}
    >
      아이 나이와 지역에 맞춰 바로 확인하기
    </h2>
    <p className="text-sm leading-6 text-muted-foreground">
      공식 출처가 확인된 혜택부터 카드로 모았습니다. 신청 전에는 각 공식
      페이지의 최신 기준을 다시 확인하세요.
    </p>
  </div>

  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    {featuredBenefits.map(benefit => (
      <BenefitCard key={benefit.id} benefit={benefit} />
    ))}
  </div>
</section>
```

- [ ] **Step 5: Run quality checks for touched code**

Run:

```bash
pnpm type-check
pnpm lint:check
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add components/benefits/BenefitCard.tsx components/benefits/BenefitsHub.tsx
git commit -m "[현재브랜치명][feat]: 혜택 허브 대표 혜택 카드 추가

- 혜택 seed 기반 대표 카드 컴포넌트 추가
- /benefits 허브에 우선 확인 혜택 섹션 추가"
```

### Task 5: Add Priority Benefit Blog Posts

**Files:**

- Create: `content/posts/benefits/seoul-public-kids-cafe-guide.md`
- Create: `content/posts/benefits/gyeonggi-family-care-allowance-guide.md`
- Create: `content/posts/benefits/incheon-cheonsa-support-guide.md`

- [ ] **Step 1: Verify official sources before writing**

Open the official URLs listed in the Data Source Policy and record these facts inside each post:

- 대상
- 신청 기간 또는 신청 시점
- 지원 형태
- 신청 경로
- 같이 보면 좋은 장소 또는 도구 링크
- 공식 출처와 기준일

- [ ] **Step 2: Create Seoul post**

Create `content/posts/benefits/seoul-public-kids-cafe-guide.md` with this structure:

```md
---
title: '서울형 키즈카페 예약과 서울형키즈카페머니, 아이와 갈 곳 비용 줄이는 방법'
date: '2026-05-26'
author: 'Zento 편집실'
excerpt: '서울형 키즈카페 예약, 민간 키즈카페 할인, 아이와 실내 나들이 비용을 공식 출처 기준으로 정리했습니다.'
tags:
  - '서울형 키즈카페'
  - '서울형키즈카페머니'
  - '서울 육아 혜택'
  - '아이와 실내'
category: '혜택·지원금'
categorySlug: 'benefits'
---

## 한눈에 요약

서울에서 아이와 실내로 갈 곳을 찾는다면 서울형 키즈카페와 서울형키즈카페머니를 함께 확인합니다.

## 누가 먼저 보면 좋나

## 예약 전에 확인할 것

## 서울형키즈카페머니는 어디에 쓰나

## 아이와 갈 곳 콘텐츠와 같이 보는 방법

| 목적                    | 같이 볼 페이지                         |
| ----------------------- | -------------------------------------- |
| 서울 공공 놀이시설 찾기 | [아이와 가볼 곳 - 서울](/places/seoul) |
| 혜택 모아보기           | [육아 혜택·지원금](/benefits)          |

## 공식 출처

| 출처                                                                                                                      | 확인한 내용      |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| [서울형 키즈카페](https://umppa.seoul.go.kr/hmpg/sprt/bzin/bzmgComtDetail.do?biz_mng_no=6DD24707FB4941C09D10B50AF4917997) | 예약과 이용 기준 |
| [서울형키즈카페머니](https://umppa.seoul.go.kr/icare/dolbomMENU5/dolbomMENU5_3.jsp)                                       | 할인·사용처 안내 |
```

- [ ] **Step 3: Create Gyeonggi post**

Create `content/posts/benefits/gyeonggi-family-care-allowance-guide.md` with this structure:

```md
---
title: '경기도 가족돌봄수당, 조부모·친인척 돌봄도 지원받을 수 있을까'
date: '2026-05-26'
author: 'Zento 편집실'
excerpt: '경기도 가족돌봄수당의 대상, 돌봄 조건, 신청 전 확인할 점을 공식 출처 기준으로 정리했습니다.'
tags:
  - '경기도 가족돌봄수당'
  - '경기 육아 혜택'
  - '조부모 돌봄'
  - '아이돌봄'
category: '혜택·지원금'
categorySlug: 'benefits'
---

## 한눈에 요약

경기도에서 24개월 이후 아이 돌봄 공백이 생긴 가정은 가족돌봄수당 대상 여부를 먼저 확인합니다.

## 누가 먼저 보면 좋나

## 신청 전에 확인할 조건

## 어린이집·아이돌봄서비스와 같이 볼 점

## 경기 지역 장소 콘텐츠와 같이 보는 방법

| 목적                   | 같이 볼 페이지                                       |
| ---------------------- | ---------------------------------------------------- |
| 경기 남부 아이와 갈 곳 | [아이와 가볼 곳 - 경기 남부](/places/gyeonggi-south) |
| 경기 북부 아이와 갈 곳 | [아이와 가볼 곳 - 경기 북부](/places/gyeonggi-north) |
| 혜택 모아보기          | [육아 혜택·지원금](/benefits)                        |

## 공식 출처

| 출처                                                                                                  | 확인한 내용           |
| ----------------------------------------------------------------------------------------------------- | --------------------- |
| [경기도 가족돌봄수당](https://gnews.gg.go.kr/briefing/brief_gongbo_view.do?BS_CODE=S017&number=68925) | 지원 대상과 신청 기준 |
```

- [ ] **Step 4: Create Incheon post**

Create `content/posts/benefits/incheon-cheonsa-support-guide.md` with this structure:

```md
---
title: '인천 천사지원금, 1~7세 아이 가정이 확인할 신청 조건'
date: '2026-05-26'
author: 'Zento 편집실'
excerpt: '인천 천사지원금의 대상, 신청 방식, 아이드림 계열 혜택을 공식 출처 기준으로 정리했습니다.'
tags:
  - '인천 천사지원금'
  - '인천 아이드림'
  - '인천 육아 혜택'
  - '1세 7세 지원금'
category: '혜택·지원금'
categorySlug: 'benefits'
---

## 한눈에 요약

인천에 거주하는 1~7세 아이 가정은 천사지원금 대상 여부와 신청 경로를 먼저 확인합니다.

## 누가 먼저 보면 좋나

## 신청 전에 확인할 조건

## 첫만남이용권·부모급여와 같이 볼 점

## 인천 아이와 갈 곳 콘텐츠와 같이 보는 방법

| 목적              | 같이 볼 페이지                           |
| ----------------- | ---------------------------------------- |
| 인천 아이와 갈 곳 | [아이와 가볼 곳 - 인천](/places/incheon) |
| 혜택 모아보기     | [육아 혜택·지원금](/benefits)            |

## 공식 출처

| 출처                                                                                             | 확인한 내용           |
| ------------------------------------------------------------------------------------------------ | --------------------- |
| [인천 천사지원금](https://www.incheon.go.kr/IC010205/view?curPage=1&repSeq=DOM_0000000014462863) | 지원 대상과 신청 안내 |
```

- [ ] **Step 5: Run type and format checks**

Run:

```bash
pnpm format:check
pnpm type-check
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add content/posts/benefits/seoul-public-kids-cafe-guide.md content/posts/benefits/gyeonggi-family-care-allowance-guide.md content/posts/benefits/incheon-cheonsa-support-guide.md
git commit -m "[현재브랜치명][add]: 육아 지역 혜택 글 3건 추가

- 서울형 키즈카페 혜택 글 추가
- 경기도 가족돌봄수당 글 추가
- 인천 천사지원금 글 추가"
```

### Task 6: Expand Official Source List

**Files:**

- Modify: `lib/benefits/config.ts`

- [ ] **Step 1: Add regional official sources**

Append these entries to `OFFICIAL_BENEFIT_SOURCES`:

```ts
{ name: '서울시 몽땅정보 만능키', url: 'https://umppa.seoul.go.kr/' },
{ name: '경기도', url: 'https://www.gg.go.kr/' },
{ name: '인천광역시', url: 'https://www.incheon.go.kr/' },
```

- [ ] **Step 2: Run checks**

Run:

```bash
pnpm type-check
pnpm lint:check
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add lib/benefits/config.ts
git commit -m "[현재브랜치명][add]: 혜택 공식 출처 목록 확장

- 서울시, 경기도, 인천시 공식 출처 추가"
```

### Task 7: Final Verification

**Files:**

- No new files

- [ ] **Step 1: Run focused tests**

```bash
node --test content/benefits/index.test.mjs
node --test lib/benefits/benefit-queries.test.mjs
```

Expected: PASS.

- [ ] **Step 2: Run project checks**

```bash
pnpm format:check
pnpm type-check
pnpm lint:check
```

Expected: PASS.

- [ ] **Step 3: Run build**

```bash
pnpm build
```

Expected: PASS. The `/benefits` page should build without missing import or hydration errors.

- [ ] **Step 4: Manual browser check**

Run:

```bash
pnpm dev
```

Open:

```text
http://127.0.0.1:3000/benefits
```

Check:

- 대표 혜택 카드가 6개 보인다.
- 내부 링크 3개가 블로그 글로 이동한다.
- 외부 공식 출처 링크가 새 탭으로 열린다.
- 모바일 폭에서 카드 제목과 출처 텍스트가 겹치지 않는다.

- [ ] **Step 5: Commit final fixes**

If verification required small fixes, commit them:

```bash
git add components/benefits/BenefitCard.tsx components/benefits/BenefitsHub.tsx content/benefits/index.ts lib/benefits/benefit-queries.ts content/posts/benefits
git commit -m "[현재브랜치명][fix]: 혜택 허브 검증 후 표시 보정

- 대표 혜택 카드 표시 보정
- 링크와 공식 출처 표기 확인"
```

## Suggested Content Release Order

1. `서울형 키즈카페` 글과 카드
2. `인천 천사지원금` 글과 카드
3. `경기도 가족돌봄수당` 글과 카드
4. `서울형키즈카페머니`, `경기도 교통비`, `다자녀 카드` 외부 링크 카드
5. 전국 공통 바우처 카드

이 순서가 좋은 이유는 장소 허브와 내부 링크를 가장 빨리 만들 수 있고, `/places`에서 `/benefits`로 이어지는 리브랜딩 퍼널을 바로 검증할 수 있기 때문이다.

## Self-Review

- Spec coverage: 혜택 전략의 3분류, 공식 출처, 기준일, 장소/도구 연결 규칙을 모두 포함한다.
- Placeholder scan: 실행자가 채워야 하는 미정 필드는 두지 않았다. 단, 정책 금액과 세부 대상은 공식 출처 확인 후 글 본문에 확정하도록 별도 검증 단계를 둔다.
- Type consistency: `BenefitSource`, `BenefitCategoryId`, `BenefitRegionSlug`가 seed, query, UI에서 같은 이름으로 사용된다.
- Scope check: Phase A는 대표 혜택 카드와 글 3건으로 제한한다. 지역별 전체 혜택 검색, 사용자 맞춤 진단, 자동 크롤링은 별도 계획으로 분리한다.

# Places Hub Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/places`와 수도권 지역 허브를 추가해 `아이와 가볼 곳` 메뉴를 사이트의 핵심 허브로 만든다.

**Architecture:** 새 허브 라우트는 `app/places/*` 아래에 추가하고, 실제 콘텐츠는 기존 블로그 포스트를 재활용한다. 지역 슬러그, 지역명, 대표 글 묶음은 `lib/places/*` 또는 `lib/blog/*` 보조 설정으로 관리한다.

**Tech Stack:** Next.js App Router, React 19, TypeScript, 기존 blog pipeline

---

## Chunk 1: 라우트와 설정

### Task 1: 장소 허브 라우트 뼈대 추가

**Files:**

- Create: `app/places/page.tsx`
- Create: `app/places/[region]/page.tsx`
- Create: `lib/places/region-config.ts`
- Create: `lib/places/index.ts`

- [ ] **Step 1: 수도권 지역 슬러그, 한글 이름, 설명을 가진 설정 파일을 추가한다**
- [ ] **Step 2: `/places` 메인 허브 페이지를 만들고 지역 카드 구조를 렌더링한다**
- [ ] **Step 3: `/places/[region]` 페이지를 만들고 지역별 대표 글 묶음을 보여준다**
- [ ] **Step 4: 지역 슬러그가 확장 가능하도록 구조를 유지한다**

## Chunk 2: 블로그 재사용 연결

### Task 2: 기존 포스트를 장소 허브에 연결

**Files:**

- Modify: `lib/blog/posts.ts`
- Modify: `lib/blog/types.ts`
- Create: `lib/places/place-content.ts`

- [ ] **Step 1: 현행 포스트 메타에서 지역/연령/상황 축을 어떻게 담을지 정의한다**
- [ ] **Step 2: 포스트를 지역 허브에 노출하기 위한 필터 함수나 변환 함수를 추가한다**
- [ ] **Step 3: 기존 카테고리 구조를 깨지 않고 육아형 허브에 재사용 가능한지 확인한다**
- [ ] **Step 4: 필요한 최소 메타 필드 추가 계획을 문서 또는 타입에 반영한다**

## Chunk 3: UI 컴포넌트

### Task 3: 지역 허브 카드 UI 구현

**Files:**

- Create: `components/places/PlacesHub.tsx`
- Create: `components/places/RegionHub.tsx`
- Create: `components/places/RegionCard.tsx`
- Create: `components/places/FilterChipRow.tsx`
- Create: `components/places/FeaturedPostList.tsx`

- [ ] **Step 1: 지역 허브와 지역 상세 허브 컴포넌트를 분리한다**
- [ ] **Step 2: 지역 카드, 조건 칩, 대표 글 리스트를 구현한다**
- [ ] **Step 3: 도구와 혜택으로 이동하는 보조 링크 섹션을 넣는다**

## Chunk 4: 검증

### Task 4: 장소 허브 검증

**Files:**

- Verify only

- [ ] **Step 1: `pnpm type-check`**
- [ ] **Step 2: `/places`, `/places/seoul`, `/places/gyeonggi-south` 정도를 수동 확인한다**
- [ ] **Step 3: 기존 `/blog`와 충돌하지 않는지 확인한다**

# Parenting Guide Phase A Master Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 수도권 중심 육아형 리브랜딩 Phase A를 기존 자산 삭제 없이 순차적으로 구현한다.

**Architecture:** 기존 `app/page.tsx`, `app/blog/*`, `app/tools/*` 자산은 유지하고, 새 허브 페이지 `/places`, `/benefits`와 홈/블로그/소개 페이지 재구성을 덧붙이는 방식으로 진행한다. 장소 탐색은 기존 블로그 콘텐츠를 재활용하고, 도구 허브는 기존 금융 도구와 신규 육아 도구가 공존하도록 단계적으로 정리한다.

**Tech Stack:** Next.js App Router, React 19, TypeScript, 기존 blog/tool SEO 파이프라인, 기존 `lib/home`, `lib/blog`, `lib/tools`

---

## 구현 원칙

1. 기존 작업물은 삭제하지 않는다.
2. 기존 금융/생활비 도구는 숨기더라도 즉시 제거하지 않는다.
3. 리브랜딩 Phase A는 수도권 범위만 구현한다.
4. 각 허브는 독립 라우트로 구현하되, 상세 글 구조는 최대한 재사용한다.

## Chunk 1: 공통 기반

### Task 1: 공통 네비게이션과 브랜드 표기 준비

**Files:**

- Modify: `components/layout/nav-config.ts`
- Modify: `components/layout/logo.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: 현재 네비게이션/브랜드 노출 지점을 다시 확인한다**
- [ ] **Step 2: 새 메뉴 순서와 브랜드 표기 정책을 문서 기준으로 반영한다**
- [ ] **Step 3: 기존 메뉴가 깨지지 않도록 링크 호환성을 확인한다**
- [ ] **Step 4: `pnpm type-check`를 실행해 공통 레이아웃 회귀가 없는지 확인한다**

## Chunk 2: 사용자 진입 허브

### Task 2: 홈 리브랜딩 구현

**Files:**

- Follow: `01-home-implementation-plan.md`

- [ ] **Step 1: 홈 구현 계획 문서를 따라 새 홈 IA를 구현한다**
- [ ] **Step 2: 홈에서 `/places`, `/tools`, `/benefits`, `/blog` 이동이 연결되는지 확인한다**

### Task 3: `아이와 가볼 곳` 허브 구현

**Files:**

- Follow: `02-places-implementation-plan.md`

- [ ] **Step 1: 장소 허브 계획 문서를 따라 `/places`와 지역 허브를 구현한다**
- [ ] **Step 2: 기존 블로그 자산을 재사용하는 연결 흐름을 확인한다**

## Chunk 3: 보조 허브

### Task 4: 도구 허브 재구성

**Files:**

- Follow: `03-tools-implementation-plan.md`

- [ ] **Step 1: 도구 허브 구현 계획 문서를 따라 카테고리와 연결 구조를 정리한다**
- [ ] **Step 2: 신규 육아 도구 우선순위와 기존 도구 공존 정책을 반영한다**

### Task 5: 혜택 허브 구현

**Files:**

- Follow: `04-benefits-implementation-plan.md`

- [ ] **Step 1: `/benefits` 허브와 기본 카드 구조를 구현한다**
- [ ] **Step 2: 관련 도구/장소 링크 규칙을 확인한다**

## Chunk 4: 아카이브와 신뢰 페이지

### Task 6: 블로그 허브 재구성

**Files:**

- Follow: `05-blog-implementation-plan.md`

- [ ] **Step 1: 블로그 허브 구현 계획 문서를 따라 카테고리와 메타 축을 정리한다**
- [ ] **Step 2: 기존 포스트 노출이 깨지지 않는지 확인한다**

### Task 7: 소개 페이지 리브랜딩

**Files:**

- Follow: `06-about-implementation-plan.md`

- [ ] **Step 1: 소개 페이지 구현 계획 문서를 따라 실용형 소개 페이지로 재작성한다**
- [ ] **Step 2: 브랜드 표기 일관성을 확인한다**

## Chunk 5: 검증

### Task 8: 전체 검증

**Files:**

- Verify only

- [ ] **Step 1: `pnpm type-check`**
- [ ] **Step 2: `pnpm lint:check`**
- [ ] **Step 3: 핵심 경로 수동 점검, `/`, `/places`, `/tools`, `/benefits`, `/blog`, `/about`**
- [ ] **Step 4: 필요 시 `pnpm test:e2e` 또는 핵심 라우트 smoke test를 추가한다**
- [ ] **Step 5: 배포 영향이 크면 `pnpm build`**

# Home Rebrand Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 홈을 육아형 홈 IA로 재구성하고, 사용자가 장소·도구·혜택 허브로 빠르게 진입하게 만든다.

**Architecture:** 기존 `app/page.tsx`와 `components/home/*`를 재활용하되, 현재의 범용 대시보드 중심 구조를 육아형 섹션 구조로 바꾼다. 데이터 조립은 `lib/home/*`에서 분리하고, UI는 홈 전용 섹션 컴포넌트로 쪼갠다.

**Tech Stack:** Next.js App Router, React 19, TypeScript, 기존 `components/home`, `lib/home`

---

## Chunk 1: 데이터 조립

### Task 1: 홈 데이터 모델 정리

**Files:**

- Modify: `lib/home/dashboard-content.ts`
- Modify: `lib/home/dashboard-content.test.ts`
- Create: `lib/home/parenting-home-content.ts`

- [ ] **Step 1: 기존 `dashboard-content.ts`가 현재 무엇을 조립하는지 읽고 재사용 가능한 부분을 분리한다**
- [ ] **Step 2: 육아형 홈에 필요한 데이터 모델, 지역 카드/상황 카드/도구 카드/혜택 카드 구조를 정의한다**
- [ ] **Step 3: 수도권 우선 콘텐츠를 조립하는 최소 함수들을 추가한다**
- [ ] **Step 4: 새 데이터 조립 함수에 대한 테스트를 작성하거나 기존 테스트를 확장한다**

## Chunk 2: 홈 UI 재구성

### Task 2: 홈 섹션 컴포넌트 분리

**Files:**

- Modify: `app/page.tsx`
- Create: `components/home/parenting-hero-section.tsx`
- Create: `components/home/parenting-section-grid.tsx`
- Create: `components/home/parenting-quick-filter.tsx`
- Create: `components/home/parenting-link-card.tsx`
- Modify: `components/home/hero-split-section.tsx`
- Modify: `components/home/dashboard-section.tsx`

- [ ] **Step 1: 현재 홈 UI에서 재사용 가능한 부분과 교체할 부분을 분리한다**
- [ ] **Step 2: 새 히어로와 섹션 카드 컴포넌트를 추가한다**
- [ ] **Step 3: `app/page.tsx`를 새 섹션 순서, 히어로, 허브 카드 구조로 연결한다**
- [ ] **Step 4: 기존 배경/레이아웃 스타일이 너무 튀면 실용형 톤에 맞게 조정한다**

## Chunk 3: 링크와 SEO

### Task 3: 허브 연결과 메타 문구 반영

**Files:**

- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `lib/seo/*` as needed

- [ ] **Step 1: 홈 카드가 `/places`, `/tools`, `/benefits`, `/blog`로 연결되도록 정리한다**
- [ ] **Step 2: 홈의 제목, 설명, 브랜드 표기를 리브랜딩 방향에 맞게 정리한다**
- [ ] **Step 3: 기존 사이트 목적과 충돌하는 문구가 남아 있지 않은지 확인한다**

## Chunk 4: 검증

### Task 4: 홈 검증

**Files:**

- Verify only

- [ ] **Step 1: `pnpm type-check`**
- [ ] **Step 2: `pnpm lint:check`**
- [ ] **Step 3: `/`에서 첫 화면, 모바일, 허브 링크를 수동 확인한다**

# Benefits Hub Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/benefits` 허브를 추가해 정부지원, 지역 혜택, 절약 가이드를 실용형 구조로 정리한다.

**Architecture:** 혜택 허브는 새 라우트 `app/benefits/page.tsx`로 구현하고, 초기 콘텐츠는 기존 블로그 시스템을 재활용한다. 허브 UI는 혜택 카드와 기준 날짜, 관련 도구 링크 중심으로 단순하게 시작한다.

**Tech Stack:** Next.js App Router, React 19, TypeScript, 기존 blog SEO pipeline

---

## Chunk 1: 혜택 허브 뼈대

### Task 1: `/benefits` 페이지 추가

**Files:**

- Create: `app/benefits/page.tsx`
- Create: `components/benefits/BenefitsHub.tsx`
- Create: `components/benefits/BenefitCategorySection.tsx`
- Create: `lib/benefits/config.ts`

- [ ] **Step 1: 정부지원/지역 혜택/절약 가이드 분류 설정을 추가한다**
- [ ] **Step 2: `/benefits` 허브 페이지와 섹션 컴포넌트를 만든다**
- [ ] **Step 3: 기준 날짜와 관련 링크를 노출하는 구조를 넣는다**

## Chunk 2: 기존 블로그 연결

### Task 2: 혜택 콘텐츠와 블로그를 연결

**Files:**

- Modify: `lib/blog/posts.ts`
- Modify: `components/blog/PostCard.tsx` as needed
- Create: `lib/benefits/content.ts`

- [ ] **Step 1: 혜택 글을 구분하기 위한 최소 메타 기준을 정한다**
- [ ] **Step 2: 혜택 허브에 노출할 글 리스트 조합 함수를 만든다**
- [ ] **Step 3: 관련 도구 링크와 장소 링크를 허브 또는 카드에 반영한다**

## Chunk 3: 검증

### Task 3: 혜택 허브 검증

**Files:**

- Verify only

- [ ] **Step 1: `pnpm type-check`**
- [ ] **Step 2: `/benefits` 노출과 링크 흐름을 수동 확인한다**
- [ ] **Step 3: 기준 날짜/출처 표기 정책이 누락되지 않았는지 확인한다**

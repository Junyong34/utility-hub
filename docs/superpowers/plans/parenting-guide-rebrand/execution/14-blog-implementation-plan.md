# Blog Rebrand Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/blog` 허브를 육아형 아카이브 구조로 재정리하고, 지역/테마/문제 해결형 탐색이 가능하게 만든다.

**Architecture:** 기존 `app/blog/page.tsx`와 `components/blog/*`를 유지하면서, 카테고리명과 필터 구조, 히어로 카피를 육아형으로 전환한다. 상세 글 라우트는 기존 구조를 유지한다.

**Tech Stack:** Next.js App Router, React 19, TypeScript, 기존 blog components

---

## Chunk 1: 블로그 메타 구조

### Task 1: 카테고리와 메타 필드 재정의

**Files:**

- Modify: `lib/blog/posts.ts`
- Modify: `lib/blog/types.ts`
- Create: `lib/blog/parenting-categories.ts`

- [ ] **Step 1: 현재 카테고리 매핑을 확인하고 육아형 카테고리 후보를 추가한다**
- [ ] **Step 2: 지역/연령/상황 메타 필드 확장 방식을 타입에 반영한다**
- [ ] **Step 3: 기존 글과 신규 글이 함께 동작하도록 호환성을 유지한다**

## Chunk 2: 블로그 허브 UI

### Task 2: `/blog` 허브 재구성

**Files:**

- Modify: `app/blog/page.tsx`
- Modify: `components/blog/BlogContent.tsx`
- Modify: `components/blog/BlogHeroSection.tsx`
- Modify: `components/blog/CategoryFilter.tsx`

- [ ] **Step 1: 블로그 히어로와 설명 문구를 육아형 포지셔닝으로 바꾼다**
- [ ] **Step 2: 카테고리 필터를 지역/테마/문제 해결형 중심으로 재구성한다**
- [ ] **Step 3: 관련 도구와 혜택 링크 영역을 추가할지 결정하고 반영한다**

## Chunk 3: 검증

### Task 3: 블로그 허브 검증

**Files:**

- Verify only

- [ ] **Step 1: `pnpm type-check`**
- [ ] **Step 2: `/blog`와 기존 상세 글 진입이 유지되는지 확인한다**
- [ ] **Step 3: 카테고리 필터가 신규/기존 글을 모두 처리하는지 확인한다**

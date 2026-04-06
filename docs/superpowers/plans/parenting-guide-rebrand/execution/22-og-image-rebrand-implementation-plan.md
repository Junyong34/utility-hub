# OG Image Rebrand Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 현재의 다크한 OG 렌더러를 육아형 브랜드 톤에 맞는 밝고 따뜻한 템플릿 시스템으로 교체하고, `public/images/mascot/mascot_dinosaur.jpg`를 기준 캐릭터로 활용할 수 있게 만든다.

**Architecture:** 공용 렌더러 `lib/seo/og-renderer.tsx`를 그대로 확장하는 방향으로 간다. 테마 토큰과 레이아웃 변형은 별도 파일로 분리하고, 블로그/도구/커스텀 라우트는 새 파라미터를 전달하는 구조로 정리한다.

**Tech Stack:** Next.js App Router, `@takumi-rs/image-response`, TypeScript, 기존 OG API routes

---

## Chunk 1: 테마와 레이아웃 기반

### Task 1: OG 테마 토큰 분리

**Files:**

- Create: `lib/seo/og-theme.ts`
- Create: `lib/seo/og-layouts.tsx`
- Modify: `lib/seo/og-renderer.tsx`

- [x] **Step 1: 현재 하드코딩된 다크 기본값을 분리한다**
- [x] **Step 2: 육아형 팔레트 토큰과 프리셋 이름을 정의한다**
- [x] **Step 3: `play-card`, `tool-card`, `custom-studio` 레이아웃 변형을 분리한다**
- [x] **Step 4: `createOgImageResponse`가 레이아웃/테마 옵션을 받을 수 있게 확장한다**

## Chunk 2: 라우트 적용

### Task 2: 블로그/도구/커스텀 라우트에 새 테마 적용

**Files:**

- Modify: `app/api/og/blog/[category]/[slug]/route.ts`
- Modify: `app/api/og/tools/[toolId]/route.ts`
- Modify: `app/api/og/custom/route.ts`
- Modify: `lib/seo/og.ts`

- [x] **Step 1: 블로그 OG에 기본 `play-card`를 적용한다**
- [x] **Step 2: 도구 OG에 `tool-card`와 카테고리별 육아형 컬러 매핑을 적용한다**
- [x] **Step 3: 커스텀 OG query params에 `themePreset`, `layoutVariant`, `mascotEnabled`를 추가한다**
- [x] **Step 4: 기존 URL과의 호환성을 유지한다**

## Chunk 3: OG 스튜디오 개선

### Task 3: 스튜디오 폼과 페이지 개선

**Files:**

- Modify: `app/tools/og-image-studio/page.tsx`
- Modify: `components/tools/og-image-studio/CustomOgForm.tsx`

- [x] **Step 1: 기본 커스텀 값의 배경색/포인트색을 밝은 육아형 기본값으로 바꾼다**
- [x] **Step 2: 프리셋 셀렉터와 레이아웃 셀렉터를 추가한다**
- [x] **Step 3: 마스코트 on/off와 `mascot_dinosaur.jpg` 참조 사용 필드를 추가한다**
- [x] **Step 4: 사용자가 직접 hex 코드를 넣지 않아도 기본 프리셋으로 쓸 수 있게 만든다**

## Chunk 4: 브랜드 자산 연결

### Task 4: 마스코트/패턴 자산 연결

**Files:**

- Use: `public/images/mascot/mascot_dinosaur.jpg`
- Modify: `lib/seo/og-renderer.tsx`

- [x] **Step 1: `mascot_dinosaur.jpg`를 OG 레이아웃에 안전하게 배치하는 규칙을 만든다**
- [x] **Step 2: 마스코트가 없을 때도 레이아웃이 무너지지 않는 fallback을 만든다**
- [x] **Step 3: 밝은 배경과 공룡 마스코트가 동시에 과해지지 않게 기본 조합을 정한다**

## Chunk 5: 검증

### Task 5: OG 리브랜딩 검증

**Files:**

- Verify only

- [x] **Step 1: 블로그 OG 3개, 도구 OG 3개, custom OG 3개를 샘플 렌더링한다**
- [x] **Step 2: 라이트 배경에서 제목 대비가 충분한지 확인한다**
- [x] **Step 3: 마스코트 on/off, 이미지 on/off, 라벨 길이 차이를 확인한다**
- [x] **Step 4: `lib/seo/og.test.mjs`를 보완하거나 새 테스트를 추가한다**

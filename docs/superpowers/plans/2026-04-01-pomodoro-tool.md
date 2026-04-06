# Pomodoro Tool Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zento `tools`에 PRD 기준 뽀모도로 도구를 추가하고, Quick Start와 Task Mode를 같은 타이머 엔진으로 동작하게 만든다.

**Architecture:** `/tools/pomodoro` 독립 페이지를 추가하고, `lib/tools/pomodoro/*`에 순수 타이머 엔진과 storage 어댑터를 둔다. UI는 `components/tools/pomodoro/*`에서 DOM 중심으로 구성하고, canvas는 진행 시각화와 완료 연출에만 사용한다.

**Tech Stack:** Next.js App Router, React 19, TypeScript, shadcn/ui, localStorage, native Canvas, node:test

---

## Chunk 1: Core Engine + Storage

### Task 1: 엔진 테스트 작성

**Files:**

- Create: `lib/tools/pomodoro/engine.test.mjs`
- Create: `lib/tools/pomodoro/types.ts`
- Create: `lib/tools/pomodoro/engine.ts`

- [ ] **Step 1: Write the failing test**
- [ ] **Step 2: Run `node --test lib/tools/pomodoro/engine.test.mjs` and verify it fails**
- [ ] **Step 3: Implement the minimal engine**
- [ ] **Step 4: Run the same test and make it pass**

### Task 2: storage 테스트 작성

**Files:**

- Create: `lib/tools/pomodoro/storage.test.mjs`
- Create: `lib/tools/pomodoro/storage.ts`

- [ ] **Step 1: Write the failing test**
- [ ] **Step 2: Run `node --test lib/tools/pomodoro/storage.test.mjs` and verify it fails**
- [ ] **Step 3: Implement minimal storage fallback/migration helpers**
- [ ] **Step 4: Run the same test and make it pass**

## Chunk 2: Tool UI + Route Integration

### Task 3: route와 tool-config 연결

**Files:**

- Modify: `lib/tools/tool-config.ts`
- Create: `app/tools/pomodoro/page.tsx`

- [ ] **Step 1: Add failing metadata/route integration test if practical**
- [ ] **Step 2: Add tool config and route**
- [ ] **Step 3: Verify tool page renders through build/tests**

### Task 4: client UI 구현

**Files:**

- Create: `components/tools/pomodoro/index.ts`
- Create: `components/tools/pomodoro/PomodoroTool.tsx`
- Create: `components/tools/pomodoro/PomodoroCanvas.tsx`
- Create: `components/tools/pomodoro/PomodoroFAQ.tsx`

- [ ] **Step 1: Build minimal Quick Start + Task Mode UI on top of engine/storage**
- [ ] **Step 2: Add completion effects, fullscreen, recovery, record/task panels**
- [ ] **Step 3: Verify no runtime/type issues**

## Chunk 3: Verification

### Task 5: 전체 검증

**Files:**

- Verify only

- [ ] **Step 1: Run `node --test lib/tools/pomodoro/engine.test.mjs lib/tools/pomodoro/storage.test.mjs`**
- [ ] **Step 2: Run `pnpm type-check`**
- [ ] **Step 3: Run `pnpm lint:check` if scope/time permits, otherwise run targeted build signal**
- [ ] **Step 4: Run `pnpm build` or explain blocker**

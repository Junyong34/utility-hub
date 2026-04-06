# Tools Hub Rebrand Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/tools` 허브를 육아형 도구 중심으로 재구성하고, 기존 금융 도구를 삭제 없이 공존시키며 우선순위를 재정렬한다.

**Architecture:** 기존 `app/tools/page.tsx`와 `lib/tools/tool-config.ts`를 유지하면서, 도구 분류와 허브 UI를 리브랜딩한다. 신규 육아 도구는 별도 카테고리와 설명 문구를 추가하고, 기존 금융 도구는 보조 섹션으로 분리할 수 있게 설계한다.

**Tech Stack:** Next.js App Router, React 19, TypeScript, 기존 tool registry

---

## Chunk 1: 도구 분류 체계

### Task 1: 도구 메타 확장

**Files:**

- Modify: `lib/tools/tool-config.ts`
- Modify: `lib/tools/types.ts`
- Modify: `lib/tools/index.ts`

- [ ] **Step 1: 현재 도구 메타에서 육아형/기존 생활형을 구분할 확장 필드를 정의한다**
- [ ] **Step 2: 신규 육아 도구 후보가 들어갈 카테고리 구조를 추가한다**
- [ ] **Step 3: 기존 도구는 유지하되 기본 노출 우선순위를 다시 정렬한다**

## Chunk 2: 허브 UI

### Task 2: `/tools` 허브 재구성

**Files:**

- Modify: `app/tools/page.tsx`
- Modify: `components/tools/ToolsPageClient.tsx`
- Create: `components/tools/ToolCategorySection.tsx`
- Create: `components/tools/RelatedGuideStrip.tsx`

- [ ] **Step 1: 기존 도구 허브가 어떤 정렬과 분류를 쓰는지 확인한다**
- [ ] **Step 2: 육아형 카테고리 섹션과 기존 도구 섹션을 나눠 렌더링한다**
- [ ] **Step 3: 각 카테고리에 관련 장소 글과 혜택 링크를 붙인다**
- [ ] **Step 4: 카드 카피와 순서를 리브랜딩 방향에 맞게 조정한다**

## Chunk 3: 신규 도구 자리 만들기

### Task 3: 1차 육아 도구 공개 슬롯 정의

**Files:**

- Modify: `lib/tools/tool-config.ts`
- Create: `docs/superpowers/plans/parenting-guide-rebrand/execution/tool-prd-index.md`

- [ ] **Step 1: 1차 육아 도구 2~3개를 실제 구현 후보로 확정한다**
- [ ] **Step 2: 각 도구가 연결될 장소 글과 혜택 글을 적는다**
- [ ] **Step 3: 아직 구현되지 않은 도구는 허브에서 과도하게 노출하지 않도록 정책을 정한다**

## Chunk 4: 검증

### Task 4: 도구 허브 검증

**Files:**

- Verify only

- [ ] **Step 1: `pnpm type-check`**
- [ ] **Step 2: `/tools`에서 카테고리와 카드 순서가 의도대로 보이는지 확인한다**
- [ ] **Step 3: 기존 금융 도구 상세 페이지 접근이 깨지지 않는지 확인한다**

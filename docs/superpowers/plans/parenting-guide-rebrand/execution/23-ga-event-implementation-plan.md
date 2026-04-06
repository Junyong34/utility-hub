# GA Event Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** GA4에서 버튼 클릭, 검색, 도구 실행, 공유 행동을 분석할 수 있도록 최소 이벤트 추적 구조를 추가한다.

**Architecture:** 현재 `app/layout.tsx`의 gtag 초기화는 유지하고, 클라이언트 이벤트 전송은 `lib/analytics/gtag.ts` 헬퍼로 중앙화한다. 각 컴포넌트는 직접 `window.gtag`를 부르지 않고, 얇은 트래킹 함수만 호출한다.

**Tech Stack:** Next.js App Router, React 19 client components, GA4 gtag.js

---

## Chunk 1: 공통 이벤트 헬퍼

### Task 1: GA 클라이언트 헬퍼 추가

**Files:**

- Create: `lib/analytics/gtag.ts`
- Create: `lib/analytics/events.ts`
- Create: `types/analytics-event.ts`
- Modify: `app/layout.tsx` if needed

- [ ] **Step 1: `window.gtag` 존재 여부를 안전하게 확인하는 클라이언트 헬퍼를 만든다**
- [ ] **Step 2: 공통 이벤트 이름과 파라미터 타입을 상수/타입으로 분리한다**
- [ ] **Step 3: 개발 환경에서 이벤트 payload를 콘솔 확인할 수 있는 가벼운 디버그 경로를 둔다**

## Chunk 2: 허브/공용 버튼 계측

### Task 2: 네비게이션과 홈 CTA 추적

**Files:**

- Modify: `components/layout/desktop-nav.tsx`
- Modify: `components/layout/bottom-nav.tsx`
- Modify: `components/home/hero-split-section.tsx`
- Modify: `components/home/dashboard-section.tsx`
- Modify: `components/ui/floating-share-button.tsx`

- [ ] **Step 1: nav 링크에 `nav_click` 이벤트를 붙인다**
- [ ] **Step 2: 홈 히어로 CTA와 서비스 카드에 `select_content`를 붙인다**
- [ ] **Step 3: 최신/추천 카드에 `select_content`를 붙인다**
- [ ] **Step 4: 공용 공유 버튼에 `share_menu_open`과 `share`를 붙인다**

## Chunk 3: 블로그/도구 허브 추적

### Task 3: 검색, 필터, 카드 클릭 추적

**Files:**

- Modify: `components/blog/BlogHeroSection.tsx`
- Modify: `components/blog/CategoryFilter.tsx`
- Modify: `components/blog/PostCard.tsx`
- Modify: `components/blog/BlogContent.tsx`
- Modify: `components/tools/ToolsPageClient.tsx`
- Modify: `components/tools/ToolSwitcher.tsx`

- [ ] **Step 1: 블로그 검색 버튼에 `search`와 결과 렌더링 시 `view_search_results`를 붙인다**
- [ ] **Step 2: 블로그 카테고리 탭에 `filter_select`를 붙인다**
- [ ] **Step 3: 블로그 포스트 카드에 `select_content`를 붙인다**
- [ ] **Step 4: 도구 검색 버튼과 카테고리 pill에 `search`, `view_search_results`, `filter_select`를 붙인다**
- [ ] **Step 5: 도구 카드와 ToolSwitcher에 `select_content`, `tool_switch`를 붙인다**

## Chunk 4: 계산기 핵심 버튼 추적

### Task 4: 계산하기/초기화/공유 계측

**Files:**

- Modify: `components/tools/loan-calculator/components/LoanInputForm.tsx`
- Modify: `components/tools/loan-calculator/components/ShareButton.tsx`
- Modify: `components/tools/dsr-calculator/DsrCalculatorForm.tsx`
- Modify: `components/tools/home-buying-funds-calculator/components/ShareButton.tsx`
- Modify: similar calculator components as scope permits

- [ ] **Step 1: 계산 완료 시점에 `calculator_submit`을 붙인다**
- [ ] **Step 2: 초기화 버튼에 `calculator_reset`을 붙인다**
- [ ] **Step 3: 결과 공유 버튼에 `share`를 붙인다**
- [ ] **Step 4: `calculator_id`, `tool_category`, `source_page`를 공통 파라미터로 맞춘다**

## Chunk 5: GA4 Admin 준비

### Task 5: 커스텀 dimension 등록 체크리스트 정리

**Files:**

- Create: `docs/superpowers/plans/parenting-guide-rebrand/execution/ga4-custom-dimension-checklist.md`

- [ ] **Step 1: 우선 등록할 이벤트 스코프 custom dimension 10~12개를 문서화한다**
- [ ] **Step 2: GA4 Admin에서 실제로 등록해야 할 이름과 설명을 적는다**
- [ ] **Step 3: 이벤트 이름/파라미터와 문서가 1:1로 맞는지 확인한다**

## Chunk 6: 검증

### Task 6: 이벤트 검증

**Files:**

- Verify only

- [ ] **Step 1: 개발 환경에서 버튼 클릭 시 payload가 의도대로 만들어지는지 확인한다**
- [ ] **Step 2: GA4 DebugView에서 핵심 이벤트 5종이 보이는지 확인한다**
- [ ] **Step 3: raw search text나 PII가 전송되지 않는지 확인한다**
- [ ] **Step 4: 기존 페이지뷰 수집을 깨지 않았는지 확인한다**

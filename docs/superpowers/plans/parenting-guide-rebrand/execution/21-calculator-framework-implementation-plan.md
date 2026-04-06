# Calculator Framework Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 육아형 계산기를 공통 원칙 아래 추가할 수 있도록 정책 파일, UI 패턴, 차트 사용 기준을 고정한다.

**Architecture:** 각 계산기는 `app/tools/<tool-id>/page.tsx`, `components/tools/<tool-id>/*`, `lib/tools/<tool-id>/*` 구조를 따르되, 법/제도 기반 수치는 정책 파일로, 시각화는 `recharts`로 분리한다.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Recharts, `lib/tools/tool-config.ts`

---

## Chunk 1: 공통 계산기 원칙

### Task 1: 정책/수식/차트 분리 구조 정의

**Files:**

- Create: `docs/superpowers/plans/parenting-guide-rebrand/execution/calculator-pattern-reference.md`
- Create: `lib/tools/shared/policy-versioning.ts` if needed

- [ ] **Step 1: 계산식, 정책 수치, UI 표현을 분리하는 공통 패턴을 정의한다**
- [ ] **Step 2: 정책 버전 파일 구조를 문서로 정리한다**
- [ ] **Step 3: 차트가 필요한 계산기와 불필요한 계산기를 분리한다**

## Chunk 2: 1차 계산기 선정

### Task 2: 첫 4개 핵심 wedge 도구 요구사항 고정

**Files:**

- Create: `docs/superpowers/plans/parenting-guide-rebrand/execution/age-calculator-prd.md`
- Create: `docs/superpowers/plans/parenting-guide-rebrand/execution/outing-budget-calculator-prd.md`
- Create: `docs/superpowers/plans/parenting-guide-rebrand/execution/kids-activity-budget-calculator-prd.md`
- Create: `docs/superpowers/plans/parenting-guide-rebrand/execution/local-benefits-self-check-prd.md`

- [ ] **Step 1: 연령/개월수 계산기의 입력/출력/연결 콘텐츠를 고정한다**
- [ ] **Step 2: 나들이 예산 계산기의 비용 항목과 기본 시각화를 고정한다**
- [ ] **Step 3: 키즈카페·체험 월예산과 지역 혜택 자가진단의 입력/출력 구조를 고정한다**
- [ ] **Step 4: 네 도구의 CTA와 연결 글 세트를 적는다**

## Chunk 3: 정책형 계산기 준비

### Task 3: 증여세/육아휴직 계산기 정책 근거 정리

**Files:**

- Create: `docs/superpowers/plans/parenting-guide-rebrand/execution/gift-tax-calculator-policy-notes.md`
- Create: `docs/superpowers/plans/parenting-guide-rebrand/execution/parental-leave-calculator-policy-notes.md`

- [ ] **Step 1: 공식 근거 문서와 버전 관리 항목을 정리한다**
- [ ] **Step 2: 하드코딩 금지 항목을 명시한다**
- [ ] **Step 3: 차트가 실제로 필요한지와 어떤 차트가 맞는지 적는다**

## Chunk 4: 검증

### Task 4: 계산기 프레임워크 검증

**Files:**

- Verify only

- [ ] **Step 1: 새 계산기 1개를 추가할 때 필요한 파일 세트가 명확한지 확인한다**
- [ ] **Step 2: 정책형 계산기와 일반 계산기를 같은 패턴으로 설명할 수 있는지 확인한다**
- [ ] **Step 3: 차트 기준이 과도하지 않은지 검토한다**

# About Rebrand Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/about`를 실용형 육아 브랜드 소개 페이지로 바꾸고, 기존 서비스 소개를 리브랜딩 메시지에 맞게 정리한다.

**Architecture:** 기존 `app/about/page.tsx`의 카드형 구조를 재활용하되, 현재의 생활비/주차 중심 문구를 육아형 실용 가이드 소개로 교체한다. 브랜드 표기와 비목표를 명확히 드러낸다.

**Tech Stack:** Next.js App Router, React 19, TypeScript, 기존 about page components

---

## Chunk 1: 메시지 재작성

### Task 1: 소개 페이지 카피와 섹션 재정의

**Files:**

- Modify: `app/about/page.tsx`

- [ ] **Step 1: 현재 소개 페이지 문구에서 생활비/주차 중심 메시지를 식별한다**
- [ ] **Step 2: 육아형 실용 가이드 기준으로 섹션, 하이라이트, 흐름 설명을 다시 쓴다**
- [ ] **Step 3: `도메인은 zento.kr, 브랜드는 리브랜딩 중`이라는 정책을 자연스럽게 녹인다**

## Chunk 2: 링크와 신뢰 요소

### Task 2: 소개 페이지 링크 구조 정리

**Files:**

- Modify: `app/about/page.tsx`
- Modify: `components/layout/logo.tsx` as needed

- [ ] **Step 1: `/places`, `/tools`, `/benefits`로 연결되는 기본 CTA를 넣는다**
- [ ] **Step 2: 무엇을 하지 않는지, 어떤 기준으로 운영하는지 명시한다**
- [ ] **Step 3: 소개 페이지가 감성 브랜딩이 아니라 신뢰 페이지 역할을 하게 유지한다**

## Chunk 3: 검증

### Task 3: 소개 페이지 검증

**Files:**

- Verify only

- [ ] **Step 1: `pnpm type-check`**
- [ ] **Step 2: `/about` 카피, CTA, 브랜드 표기가 일관적인지 확인한다**

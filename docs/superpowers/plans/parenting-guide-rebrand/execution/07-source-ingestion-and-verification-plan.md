# Source Ingestion And Verification Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 장소/시설/혜택 정보를 발행 가능한 데이터로 만드는 최소 수집-검증 파이프라인을 설계한다.

**Architecture:** 초기에는 크롤러가 아니라 수동 시드 + 정규화 스키마로 시작한다. 데이터 구조는 향후 `lib/places/*`, `content/posts/*` frontmatter, 또는 별도 JSON 시드 파일로 확장 가능하게 정의한다.

**Tech Stack:** Markdown frontmatter, TypeScript types, 필요 시 JSON seed files

---

## Chunk 1: 데이터 모델

### Task 1: 시설 데이터 스키마 고정

**Files:**

- Create: `types/place-source.ts`
- Create: `lib/places/source-policy.ts`
- Create: `docs/superpowers/specs/parenting-guide-rebrand/place-card-schema-reference.md`

- [ ] **Step 1: 상업형 시설과 공공 시설이 공통으로 쓰는 최소 필드를 정의한다**
- [ ] **Step 2: 검증 상태(`official_verified`, `semi_verified` 등) enum을 정의한다**
- [ ] **Step 3: 카드 렌더링에 꼭 필요한 필드와 운영용 메타 필드를 분리한다**

## Chunk 2: 시드 데이터

### Task 2: 서울 + 경기 남부 시드 20~30건 만들기

**Files:**

- Create: `content/places/seoul/*.md` or JSON seed structure
- Create: `content/places/gyeonggi-south/*.md` or JSON seed structure
- Create: `docs/superpowers/plans/parenting-guide-rebrand/execution/place-seed-checklist.md`

- [ ] **Step 1: 서울 10건, 경기 남부 10건 정도의 초기 시드 목표를 정한다**
- [ ] **Step 2: 키즈카페, 공공 놀이시설, 체험시설을 섞어 넣는다**
- [ ] **Step 3: 각 항목에 공식 확인 링크와 마지막 검증일을 넣는다**
- [ ] **Step 4: 발행 가능 상태와 재검수 필요 상태를 나눠 표시한다**

## Chunk 3: 수집 워크플로우

### Task 3: 운영 체크리스트 만들기

**Files:**

- Create: `docs/superpowers/plans/parenting-guide-rebrand/execution/source-review-checklist.md`

- [ ] **Step 1: 후보 수집 체크리스트를 작성한다**
- [ ] **Step 2: 공식 확인 체크리스트를 작성한다**
- [ ] **Step 3: 가격/운영시간/예약 방식 재검수 주기를 적는다**
- [ ] **Step 4: 후기 기반 정보 금지 규칙을 포함한다**

## Chunk 4: 검증

### Task 4: 데이터 파이프라인 검증

**Files:**

- Verify only

- [ ] **Step 1: 샘플 3건을 뽑아 필드 누락이 없는지 확인한다**
- [ ] **Step 2: 상업형/공공형 시설이 같은 스키마로 무리 없이 담기는지 확인한다**
- [ ] **Step 3: 장소 허브 UI에서 바로 렌더링 가능한 수준인지 검토한다**

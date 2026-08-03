# 주택 구입 비용 계산기 SEO 개선 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/tools/home-buying-funds-calculator`의 검색 노출을 올리기 위해 (1) FAQ·가이드 콘텐츠를 초기 HTML에 서버 렌더링하고, (2) 세법 기준일·업데이트 날짜를 명시하고, (3) SEO title을 보강하고, (4) 계산기를 받쳐주는 블로그 글 3개와 내부 링크를 추가한다.

**Architecture:** 현재 페이지는 nuqs(`useQueryStates`) 때문에 Suspense fallback("로딩 중...")이 프리렌더에 잡혀 FAQ 등 모든 가시 콘텐츠가 초기 HTML에 없다. FAQ를 manifest 데이터 기반 서버 컴포넌트(`<details>/<summary>`, JS 불필요)로 전환해 Suspense 밖에서 렌더링하고, JSON-LD(FAQPage/HowTo)와 가시 콘텐츠를 일치시킨다. 블로그 글은 기존 `content/posts/investment/` 가이드 글 패턴을 따른다.

**Tech Stack:** Next.js 16 App Router, React 19 Server Components, Playwright(request 기반 SSR 검증), 마크다운 블로그.

## Global Constraints

- 모듈 경계: `ui`는 `client` orchestration을 import하지 않는다. `domain`은 순수 규칙만 담는다 (`docs/architecture/module-boundaries.md`).
- 커밋 전 체크: `pnpm format:check`, `pnpm type-check`, `pnpm lint:check`, `pnpm test:architecture`, `pnpm test:contracts`, `pnpm test:integration` (블로그 글만 수정한 태스크는 format + integration만으로 충분).
- 세율·요율·한도 등 수치는 **작성 전 반드시 공식 출처(정부·법령 사이트)로 검증**한다. 검증 못 한 수치는 싣지 않는다. 저장소 domain 코드(`modules/tools/home-buying-funds-calculator/domain/taxes.ts`, `ui/national-housing-bond-guide.ts`)에 이미 검증된 수치가 있으면 그것을 1차 기준으로 삼는다.
- 기존 클라이언트 FAQ의 중개보수 요율(6억~9억 0.5%, 9억 이상 0.9%)은 2021-10 개정 전 요율로 의심됨 — 그대로 옮기지 말 것.
- 커밋 메시지는 conventional commit + `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>` trailer.
- 블로그 글의 이미지는 이번 범위에서 넣지 않는다(깨진 이미지 링크 금지). 필요 시 후속 작업.

---

### Task 1: FAQ·사용법 콘텐츠 서버 렌더링 전환

**Files:**
- Test: `tests/e2e/tools/home-buying-funds-calculator-seo.spec.ts` (신규)
- Modify: `modules/tools/home-buying-funds-calculator/domain/manifest.ts` (faq 항목 2개 추가)
- Create: `modules/tools/home-buying-funds-calculator/ui/components/HomeBuyingFundsGuideSection.tsx`
- Modify: `modules/tools/home-buying-funds-calculator/ui.ts` (export 추가)
- Modify: `app/tools/home-buying-funds-calculator/page.tsx` (Suspense 밖에서 가이드 섹션 렌더)
- Modify: `modules/tools/home-buying-funds-calculator/client/HomeBuyingFundsCalculatorForm.tsx` (FAQ 제거)
- Delete: `modules/tools/home-buying-funds-calculator/client/HomeBuyingFundsCalculatorFAQ.tsx`

**Interfaces:**
- Consumes: `HOME_BUYING_FUNDS_CALCULATOR_MANIFEST` (`domain/manifest.ts`의 `faq: {question, answer}[]`, `howTo: {name, text}[]`)
- Produces: `HomeBuyingFundsGuideSection` — props 없는 서버 컴포넌트, `ui.ts`에서 export. Task 7이 이 컴포넌트에 관련 글 링크를 추가한다.

- [ ] **Step 1: 실패하는 SSR 검증 테스트 작성**

```ts
// tests/e2e/tools/home-buying-funds-calculator-seo.spec.ts
import { test, expect } from '@playwright/test';

const PAGE_PATH = '/tools/home-buying-funds-calculator';

test.describe('주택 구입 비용 계산기 SSR SEO', () => {
  test('renders_faq_and_howto_content_in_initial_html_when_fetched_without_js', async ({
    request,
  }) => {
    const response = await request.get(PAGE_PATH);
    expect(response.ok()).toBeTruthy();

    const html = await response.text();
    // JS 미실행 상태의 원본 HTML에 가시 콘텐츠가 있어야 한다
    expect(html).toContain('자주 묻는 질문');
    expect(html).toContain('아파트 매매 부대비용에는 무엇이 포함되나요?');
    expect(html).toContain('사용 방법');
    expect(html).toContain('시가표준액은 무엇인가요?');
  });
});
```

- [ ] **Step 2: 테스트 실행해 실패 확인**

Run: `pnpm test:e2e -- tests/e2e/tools/home-buying-funds-calculator-seo.spec.ts`
Expected: FAIL — 현재 HTML에는 "로딩 중..."만 있어 `자주 묻는 질문` 미포함.

- [ ] **Step 3: manifest faq에 시가표준액·예비비 항목 추가**

`domain/manifest.ts`의 `faq` 배열에서 `국민주택채권 실부담액은 무엇인가요?` 항목 뒤에 아래 2개를 추가 (기존 클라이언트 FAQ에만 있던 콘텐츠를 manifest로 흡수해 JSON-LD와 가시 콘텐츠를 일치시킴):

```ts
    {
      question: '시가표준액은 무엇인가요?',
      answer:
        '시가표준액은 지방자치단체가 정한 부동산 기준 가격으로, 취득세 외 등록면허세와 국민주택채권 매입액 계산에 사용됩니다. 보통 실제 매매가의 70~90% 수준이며, 위택스나 부동산공시가격 알리미에서 확인할 수 있습니다. 정확한 금액을 모르면 매매가의 80% 정도로 입력해 대략적인 금액을 확인할 수 있습니다.',
    },
    {
      question: '예비비는 왜 필요한가요?',
      answer:
        '주택 매수 과정에서는 계산 오차에 따른 추가 세금, 긴급 수리, 관리비 정산 같은 예상치 못한 비용이 생길 수 있습니다. 일반적으로 총비용의 3~10% 정도를 예비비로 준비하는 것이 안전하며, 이 계산기에서는 예비비 비율을 직접 조정할 수 있습니다.',
    },
```

- [ ] **Step 4: 서버 컴포넌트 가이드 섹션 작성**

`modules/tools/home-buying-funds-calculator/ui/components/HomeBuyingFundsGuideSection.tsx` 신규 생성. `'use client'` 지시어 없음(서버 컴포넌트). Radix Accordion은 닫힌 항목 본문을 DOM에 넣지 않으므로 네이티브 `<details>`를 사용한다:

```tsx
import { Card } from '@/shared/ui/card';
import { HOME_BUYING_FUNDS_CALCULATOR_MANIFEST } from '../../domain/manifest';

const { faq, howTo } = HOME_BUYING_FUNDS_CALCULATOR_MANIFEST;

export function HomeBuyingFundsGuideSection() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="home-buying-howto-title" className="space-y-4">
        <h2 id="home-buying-howto-title" className="text-2xl font-bold">
          사용 방법
        </h2>
        <Card className="p-4 md:p-6">
          <ol className="list-decimal list-inside space-y-3">
            {howTo.map(step => (
              <li key={step.name} className="text-sm md:text-base">
                <span className="font-semibold">{step.name}</span>
                <p className="mt-1 ml-5 text-sm text-muted-foreground leading-6">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </Card>
      </section>

      <section aria-labelledby="home-buying-faq-title" className="space-y-4">
        <h2 id="home-buying-faq-title" className="text-2xl font-bold">
          자주 묻는 질문
        </h2>
        <Card className="p-4 md:p-6">
          <div className="space-y-2">
            {faq.map((item, index) => (
              <details
                key={item.question}
                open={index === 0}
                className="group rounded-lg border px-4 py-3"
              >
                <summary className="cursor-pointer text-sm md:text-base font-semibold list-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                </summary>
                <p className="pt-3 text-sm text-muted-foreground leading-6">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
```

`ui.ts`에 export 추가:

```ts
export { HomeBuyingFundsGuideSection } from './ui/components/HomeBuyingFundsGuideSection';
```

(기존 `ui.ts` export 스타일을 확인해 동일한 형식으로 맞춘다.)

- [ ] **Step 5: page.tsx에서 Suspense 밖에 렌더링**

`app/tools/home-buying-funds-calculator/page.tsx`의 `<main>` 내부, `<Suspense>` 블록 **뒤에** 추가:

```tsx
import { HomeBuyingFundsGuideSection } from '@/modules/tools/home-buying-funds-calculator/ui';
```

```tsx
            <Suspense
              fallback={<div className="text-muted-foreground">로딩 중...</div>}
            >
              <HomeBuyingFundsCalculatorForm />
            </Suspense>

            <HomeBuyingFundsGuideSection />
```

- [ ] **Step 6: 클라이언트 FAQ 제거**

- `client/HomeBuyingFundsCalculatorForm.tsx`에서 `HomeBuyingFundsCalculatorFAQ` import와 `{/* FAQ */}` 블록(40~41행) 삭제.
- `client/HomeBuyingFundsCalculatorFAQ.tsx` 파일 삭제.
- `grep -rn "HomeBuyingFundsCalculatorFAQ" modules/ app/`로 잔여 참조 0건 확인.

- [ ] **Step 7: 테스트 통과 확인**

Run: `pnpm test:e2e -- tests/e2e/tools/home-buying-funds-calculator-seo.spec.ts`
Expected: PASS

Run: `pnpm test:e2e -- tests/e2e/tools/home-buying-funds-calculator.spec.ts`
Expected: PASS (기존 E2E 회귀 없음. FAQ 관련 셀렉터가 Accordion에 의존했다면 `details/summary` 기준으로 수정)

- [ ] **Step 8: 품질 체크 후 커밋**

Run: `pnpm format:check && pnpm type-check && pnpm lint:check && pnpm test:architecture && pnpm test:contracts`

```bash
git add -A
git commit -m "feat(tools): server-render home buying calculator FAQ and how-to for SEO

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: 세법 기준일·업데이트 날짜 명시 + WebPage dateModified

**Files:**
- Modify: `tests/e2e/tools/home-buying-funds-calculator-seo.spec.ts` (검증 추가)
- Modify: `shared/contracts/tool-manifest.ts` (`updatedAt?: string` 추가)
- Modify: `modules/tools/home-buying-funds-calculator/domain/manifest.ts` (`updatedAt` 추가)
- Modify: `modules/tools/catalog/domain/structured-data.ts` (WebPage에 datePublished/dateModified)
- Modify: `modules/tools/home-buying-funds-calculator/ui/components/HomeBuyingFundsGuideSection.tsx` (기준일 안내문)

**Interfaces:**
- Consumes: Task 1의 `HomeBuyingFundsGuideSection`, `ToolManifest.publishedAt: string`
- Produces: `ToolManifest.updatedAt?: string` (ISO `YYYY-MM-DD`), WebPage JSON-LD의 `datePublished`/`dateModified`

- [ ] **Step 1: 실패하는 테스트 추가**

`tests/e2e/tools/home-buying-funds-calculator-seo.spec.ts`에 테스트 추가:

```ts
  test('shows_tax_basis_date_and_date_modified_in_initial_html', async ({
    request,
  }) => {
    const html = await (await request.get(PAGE_PATH)).text();
    expect(html).toContain('세법·요율 기준');
    expect(html).toContain('"dateModified"');
  });
```

- [ ] **Step 2: 테스트 실행해 실패 확인**

Run: `pnpm test:e2e -- tests/e2e/tools/home-buying-funds-calculator-seo.spec.ts`
Expected: FAIL — 기준일 문구와 dateModified 없음.

- [ ] **Step 3: contract·manifest에 updatedAt 추가**

`shared/contracts/tool-manifest.ts`의 `ToolManifest` 인터페이스에서 `publishedAt: string;` 아래에 추가:

```ts
  /** 세법·요율 등 기준 데이터의 최종 확인일 (ISO YYYY-MM-DD) */
  updatedAt?: string;
```

`domain/manifest.ts`의 `publishedAt: '2026-03-25',` 아래에 추가:

```ts
  updatedAt: '2026-08-03',
```

- [ ] **Step 4: WebPage 스키마에 날짜 추가**

`modules/tools/catalog/domain/structured-data.ts`:

`WebPageSchema` 인터페이스에 optional 필드 추가:

```ts
  datePublished?: string;
  dateModified?: string;
```

`buildWebPageSchema`의 `page` 파라미터 타입에 `datePublished?: string; dateModified?: string;`를 추가하고 반환 객체에 전달:

```ts
    datePublished: page.datePublished,
    dateModified: page.dateModified,
```

`buildToolStructuredData`(211행 부근)의 `buildWebPageSchema(site, { ... })` 호출에 추가:

```ts
      datePublished: tool.publishedAt,
      dateModified: tool.updatedAt ?? tool.publishedAt,
```

(`JSON.stringify`가 `undefined` 값을 제거하므로 `updatedAt` 없는 도구는 기존 출력과 동일 — `pnpm test:contracts`로 확인.)

- [ ] **Step 5: 가시적인 기준일 안내문 렌더링**

`HomeBuyingFundsGuideSection.tsx`의 최상위 `<div className="space-y-10">` 안 맨 아래에 추가:

```tsx
      <p className="text-xs text-muted-foreground">
        세법·요율 기준: 취득세·중개보수·국민주택채권 계산은{' '}
        {HOME_BUYING_FUNDS_CALCULATOR_MANIFEST.updatedAt} 확인 기준의 법정
        세율·상한 요율을 따릅니다. 정책 변경 시 실제 금액과 다를 수 있으며, 최종
        계약 전 세무사·법무사 확인이 필요합니다.
      </p>
```

- [ ] **Step 6: 테스트 통과 확인**

Run: `pnpm test:e2e -- tests/e2e/tools/home-buying-funds-calculator-seo.spec.ts`
Expected: PASS

- [ ] **Step 7: 품질 체크 후 커밋**

Run: `pnpm format:check && pnpm type-check && pnpm lint:check && pnpm test:architecture && pnpm test:contracts && pnpm test:integration`

```bash
git add -A
git commit -m "feat(tools): surface tax basis date and dateModified for home buying calculator

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: SEO title 키워드 보강 (seoTitle)

**Files:**
- Modify: `tests/e2e/tools/home-buying-funds-calculator-seo.spec.ts` (title 검증 추가)
- Modify: `shared/contracts/tool-manifest.ts` (`seoTitle?: string` 추가)
- Modify: `modules/tools/catalog/domain/metadata.ts` (`buildToolMetadata`)
- Modify: `modules/tools/home-buying-funds-calculator/domain/manifest.ts`

**Interfaces:**
- Consumes: `buildToolMetadata(site, tool)` — 현재 `title: tool.name`
- Produces: `ToolManifest.seoTitle?: string` — 있으면 `<title>`·OG title에만 사용, `name`(h1·카드·breadcrumb)은 불변

- [ ] **Step 1: 실패하는 테스트 추가**

```ts
  test('title_includes_apartment_and_acquisition_tax_keywords', async ({
    request,
  }) => {
    const html = await (await request.get(PAGE_PATH)).text();
    expect(html).toMatch(
      /<title>주택 구입 비용 계산기 – 아파트 매매 취득세·부대비용 계산 \| Zento<\/title>/
    );
  });
```

- [ ] **Step 2: 테스트 실행해 실패 확인**

Run: `pnpm test:e2e -- tests/e2e/tools/home-buying-funds-calculator-seo.spec.ts`
Expected: FAIL — 현재 title은 `주택 구입 비용 계산기 | Zento`.

- [ ] **Step 3: contract·metadata·manifest 수정**

`shared/contracts/tool-manifest.ts`의 `ToolManifest`에서 `name: string;` 아래 추가:

```ts
  /** 검색 결과 <title> 전용 문구. 미지정 시 name 사용. h1/카드에는 영향 없음 */
  seoTitle?: string;
```

`modules/tools/catalog/domain/metadata.ts`의 `buildToolMetadata`에서:

```ts
    title: tool.seoTitle ?? tool.name,
```

`domain/manifest.ts`의 `name: '주택 구입 비용 계산기',` 아래 추가:

```ts
  seoTitle: '주택 구입 비용 계산기 – 아파트 매매 취득세·부대비용 계산',
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `pnpm test:e2e -- tests/e2e/tools/home-buying-funds-calculator-seo.spec.ts`
Expected: PASS (h1은 `name` 그대로이므로 기존 E2E `getByRole('heading', { name: '주택 구입 비용 계산기' })`도 계속 PASS)

- [ ] **Step 5: 품질 체크 후 커밋**

Run: `pnpm format:check && pnpm type-check && pnpm lint:check && pnpm test:architecture && pnpm test:contracts`
(contracts 테스트가 metadata title을 고정 검증하고 있으면 기대값을 새 seoTitle로 갱신)

```bash
git add -A
git commit -m "feat(tools): add seoTitle for keyword-rich tool page titles

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: 블로그 글 1 — 생애최초 취득세 감면 가이드

**Files:**
- Create: `content/posts/investment/first-time-buyer-acquisition-tax-guide.md`

**Interfaces:**
- Consumes: 기존 블로그 frontmatter 패턴 (`content/posts/investment/loan-calculator-total-interest-guide.md` 참고)
- Produces: slug `first-time-buyer-acquisition-tax-guide` — Task 7의 내부 링크 대상

- [ ] **Step 1: 사실 검증 (필수, 글 작성 전)**

wigolo `search`로 아래 항목을 공식 출처에서 검증하고 확인일과 출처 URL을 메모:

- 생애최초 취득세 감면 요건·한도 (2026-08 현재 유효 기준). 쿼리 예: `["생애최초 취득세 감면 요건", "지방세특례제한법 생애최초", "생애최초 주택 취득세 감면 한도"]`, `include_domains: ["law.go.kr", "easylaw.go.kr", "wetax.go.kr", "mois.go.kr"]`
- 저장소 domain 코드와 교차 확인: `modules/tools/home-buying-funds-calculator/domain/taxes.ts`의 생애최초 감면 로직·한도가 검증 결과와 일치하는지. **불일치하면 글을 쓰기 전에 사용자에게 보고**(계산기 로직 수정은 이 계획 범위 밖).

- [ ] **Step 2: 글 작성**

frontmatter (정확히 이 형식):

```markdown
---
title: '생애최초 취득세 감면, 조건·한도·신청까지 한 번에 정리'
date: '2026-08-03'
author: 'Zento 편집실'
excerpt: '생애최초 주택 구입 취득세 감면의 대상 요건, 감면 한도, 사후 의무와 추징 조건을 정리하고 실제 감면액을 계산기로 확인하는 방법을 설명합니다.'
tags:
  - '생애최초 취득세 감면'
  - '취득세 계산'
  - '주택 구입 비용'
  - '내집마련'
  - '부동산 세금'
category: '투자'
categorySlug: 'investment'
---
```

본문 구성 (각 섹션은 Step 1에서 검증된 수치만 사용):

1. `## TL;DR` — 감면 요건·한도 3줄 요약
2. `## 생애최초 감면이란` — 근거 법령(지방세특례제한법)과 적용 기한 명시
3. `## 감면 요건 체크리스트` — 무주택 여부, 주택 가액 상한, 유상 취득 요건 등 표로 정리
4. `## 감면액은 얼마나 되나` — 검증된 한도 기준 예시 2개 (예: 3억 아파트 / 6억 아파트), 계산 과정 표기
5. `## 사후 의무와 추징 주의사항` — 실거주 의무, 매각·임대 제한 기간
6. `## 내 감면액 바로 계산해 보기` — `[주택 구입 비용 계산기](/tools/home-buying-funds-calculator)`에서 생애최초 옵션 선택 흐름 안내 (내부 링크 필수)
7. `## 결론` + 기준일 문구: "본 글은 2026-08-03 확인 기준이며, 이후 법 개정으로 달라질 수 있습니다."

- [ ] **Step 3: 검증 후 커밋**

Run: `pnpm format:check && pnpm test:integration` — 포스트 로더가 새 글을 정상 파싱하는지 확인.
Run: `pnpm dev` 후 `/blog/investment/first-time-buyer-acquisition-tax-guide` 렌더 확인 (제목·내부 링크 클릭 동작).

```bash
git add content/posts/investment/first-time-buyer-acquisition-tax-guide.md
git commit -m "docs(blog): add first-time buyer acquisition tax relief guide

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: 블로그 글 2 — 아파트 매매 부대비용 총정리

**Files:**
- Create: `content/posts/investment/apartment-purchase-extra-costs-checklist.md`

**Interfaces:**
- Consumes: Task 4와 동일한 frontmatter 패턴
- Produces: slug `apartment-purchase-extra-costs-checklist` — Task 7의 내부 링크 대상

- [ ] **Step 1: 사실 검증**

- 중개보수 법정 상한 요율표(주택 매매, 2021-10 개정 이후 현행): 쿼리 예 `["부동산 중개보수 요율표", "공인중개사법 시행규칙 중개보수", "주택 중개보수 상한 요율"]`, `include_domains: ["law.go.kr", "molit.go.kr", "easylaw.go.kr"]`
- 취득세율 구간(1주택 1~3%, 다주택 중과), 인지세 구간: 동일하게 공식 출처 검증
- 저장소 기준 교차 확인: `domain/taxes.ts`, `domain/practical-costs.ts`의 요율과 일치 여부. 불일치 시 사용자 보고.

- [ ] **Step 2: 글 작성**

frontmatter:

```markdown
---
title: '아파트 매매 부대비용 총정리: 취득세부터 복비·법무사 비용까지'
date: '2026-08-03'
author: 'Zento 편집실'
excerpt: '아파트 살 때 매매가 외에 붙는 취득세, 중개보수, 등기비용, 국민주택채권, 법무사 비용을 항목별로 정리하고 총액을 한 번에 계산하는 방법을 안내합니다.'
tags:
  - '아파트 매매 부대비용'
  - '집 살 때 필요한 돈'
  - '취득세'
  - '중개보수 복비'
  - '등기비용'
category: '투자'
categorySlug: 'investment'
---
```

본문 구성:

1. `## TL;DR` — "매매가의 약 1.5~5%가 부대비용으로 추가된다" 류의 검증 가능한 범위 요약
2. `## 부대비용 전체 목록` — 취득세·지방교육세·농특세 / 중개보수 / 등록면허세·인지세 / 국민주택채권 / 법무사 / 이사·청소 항목 표
3. `## 세금: 취득세와 부가 세목` — 검증된 구간별 세율 표
4. `## 중개보수(복비) 상한 요율` — 검증된 현행 요율표 (2021-10 개정 기준임을 명시)
5. `## 등기 관련 비용` — 국민주택채권은 `[국민주택채권 글](/blog/investment/national-housing-bond-cost-guide)`로 링크 (Task 6 slug)
6. `## 예시: 5억 아파트 매수 시 총 부대비용` — 계산기 로직과 동일한 기준으로 산출한 예시 표
7. `## 총액 한 번에 계산하기` — `[주택 구입 비용 계산기](/tools/home-buying-funds-calculator)` 내부 링크 + `[생애최초 감면 글](/blog/investment/first-time-buyer-acquisition-tax-guide)` 링크
8. `## 결론` + 기준일 문구

- [ ] **Step 3: 검증 후 커밋**

Run: `pnpm format:check && pnpm test:integration`

```bash
git add content/posts/investment/apartment-purchase-extra-costs-checklist.md
git commit -m "docs(blog): add apartment purchase extra costs checklist guide

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: 블로그 글 3 — 국민주택채권 실부담액 가이드

**Files:**
- Create: `content/posts/investment/national-housing-bond-cost-guide.md`

**Interfaces:**
- Consumes: `modules/tools/home-buying-funds-calculator/ui/national-housing-bond-guide.ts`와 `domain/management-deposit.ts`·`domain/taxes.ts`의 기존 검증 수치
- Produces: slug `national-housing-bond-cost-guide` — Task 5·7의 내부 링크 대상

- [ ] **Step 1: 사실 검증**

- 국민주택채권 매입 대상·시가표준액 구간별 매입율: 저장소 `ui/national-housing-bond-guide.ts`(테스트 존재)를 1차 기준으로 삼고, `["국민주택채권 매입율", "주택도시기금법 국민주택채권", "제1종 국민주택채권 매입기준"]` + `include_domains: ["nhuf.molit.go.kr", "law.go.kr", "molit.go.kr"]`로 최신성 확인.
- 즉시매도 할인율은 **일 단위로 변동**하므로 구체 수치를 확정 표기하지 말고 "은행 고시 할인율에 따라 달라진다"로 서술 + 확인 방법(주택도시기금 사이트) 안내.

- [ ] **Step 2: 글 작성**

frontmatter:

```markdown
---
title: '국민주택채권 실부담액, 왜 매입액보다 훨씬 적을까?'
date: '2026-08-03'
author: 'Zento 편집실'
excerpt: '주택 등기 시 의무 매입하는 국민주택채권의 매입액 계산 방식과 즉시매도 시 실제 부담액이 결정되는 구조를 예시와 함께 설명합니다.'
tags:
  - '국민주택채권'
  - '국민주택채권 실부담액'
  - '등기비용'
  - '주택 구입 비용'
  - '아파트 등기'
category: '투자'
categorySlug: 'investment'
---
```

본문 구성:

1. `## TL;DR` — 의무 매입이지만 즉시매도하면 할인 차액만 부담한다는 핵심 구조 3줄
2. `## 국민주택채권이란` — 근거(주택도시기금법), 등기 시 의무 매입 배경
3. `## 매입액 계산: 시가표준액 × 매입율` — 검증된 구간별 매입율 표
4. `## 실부담액 계산: 즉시매도와 할인율` — 계산 흐름 예시 (할인율은 변동값임을 명시)
5. `## 시가표준액 확인 방법` — 부동산공시가격 알리미·위택스 안내
6. `## 실부담액 바로 계산해 보기` — `[주택 구입 비용 계산기](/tools/home-buying-funds-calculator)` 내부 링크 + `[부대비용 총정리 글](/blog/investment/apartment-purchase-extra-costs-checklist)` 링크
7. `## 결론` + 기준일 문구

- [ ] **Step 3: 검증 후 커밋**

Run: `pnpm format:check && pnpm test:integration`

```bash
git add content/posts/investment/national-housing-bond-cost-guide.md
git commit -m "docs(blog): add national housing bond real cost guide

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: 내부 링크 정비 (계산기 ↔ 블로그 양방향)

**Files:**
- Modify: `modules/tools/home-buying-funds-calculator/ui/components/HomeBuyingFundsGuideSection.tsx` (관련 가이드 링크)
- Modify: `content/posts/investment/loan-calculator-total-interest-guide.md` (계산기 링크 추가)
- Modify: `tests/e2e/tools/home-buying-funds-calculator-seo.spec.ts` (링크 검증)

**Interfaces:**
- Consumes: Task 1의 `HomeBuyingFundsGuideSection`, Task 4~6의 slug 3개
- Produces: 없음 (최종 태스크)

- [ ] **Step 1: 실패하는 테스트 추가**

```ts
  test('links_supporting_blog_guides_in_initial_html', async ({ request }) => {
    const html = await (await request.get(PAGE_PATH)).text();
    expect(html).toContain(
      '/blog/investment/first-time-buyer-acquisition-tax-guide'
    );
    expect(html).toContain(
      '/blog/investment/apartment-purchase-extra-costs-checklist'
    );
    expect(html).toContain('/blog/investment/national-housing-bond-cost-guide');
  });
```

Run: `pnpm test:e2e -- tests/e2e/tools/home-buying-funds-calculator-seo.spec.ts`
Expected: FAIL

- [ ] **Step 2: 가이드 섹션에 관련 글 링크 추가**

`HomeBuyingFundsGuideSection.tsx`에서 FAQ 섹션과 기준일 안내문 사이에 추가 (`next/link`의 `Link` import):

```tsx
      <section aria-labelledby="home-buying-guides-title" className="space-y-4">
        <h2 id="home-buying-guides-title" className="text-2xl font-bold">
          함께 보면 좋은 가이드
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
          <li>
            <Link
              href="/blog/investment/first-time-buyer-acquisition-tax-guide"
              className="underline underline-offset-4 hover:text-foreground"
            >
              생애최초 취득세 감면, 조건·한도·신청까지 한 번에 정리
            </Link>
          </li>
          <li>
            <Link
              href="/blog/investment/apartment-purchase-extra-costs-checklist"
              className="underline underline-offset-4 hover:text-foreground"
            >
              아파트 매매 부대비용 총정리: 취득세부터 복비·법무사 비용까지
            </Link>
          </li>
          <li>
            <Link
              href="/blog/investment/national-housing-bond-cost-guide"
              className="underline underline-offset-4 hover:text-foreground"
            >
              국민주택채권 실부담액, 왜 매입액보다 훨씬 적을까?
            </Link>
          </li>
        </ul>
      </section>
```

- [ ] **Step 3: 기존 대출 가이드 글에 계산기 링크 추가**

`content/posts/investment/loan-calculator-total-interest-guide.md`의 결론 섹션 부근에 자연스러운 한 단락 추가:

```markdown
주택 구입을 앞두고 있다면 대출 총이자와 함께 취득세·중개보수 같은 부대비용도 같이 계산해야 실제 필요 현금이 보입니다. [주택 구입 비용 계산기](/tools/home-buying-funds-calculator)에서 대출 제외 자기자본까지 한 번에 확인할 수 있습니다.
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `pnpm test:e2e -- tests/e2e/tools/home-buying-funds-calculator-seo.spec.ts`
Expected: PASS

- [ ] **Step 5: 전체 품질 체크 후 커밋**

Run: `pnpm format:check && pnpm type-check && pnpm lint:check && pnpm test:architecture && pnpm test:contracts && pnpm test:integration && pnpm build`

```bash
git add -A
git commit -m "feat(seo): cross-link home buying calculator with supporting guides

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

## 배포 후 확인 (코드 외 후속 작업)

- Google Search Console·네이버 서치어드바이저에서 `/tools/home-buying-funds-calculator` 색인 재요청.
- 2~4주 후 타깃 키워드("집 살 때 필요한 돈 계산기", "아파트 매매 부대비용 계산기", "주택 구입 계산기") 노출·클릭 추이 확인.
- 순위 요인 판단은 공개된 SEO 원칙 기반 추정이므로, 효과는 반드시 지표로 검증한다.

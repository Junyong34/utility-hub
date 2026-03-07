# SEO 감사 보고서 — Zento (www.zento.kr)
**감사 일시**: 2026-03-07  
**감사 도구**: Lighthouse SEO Audit + 코드 정적 분석  
**Lighthouse SEO 점수**: 87.5/100 (crawlableAnchors 실패로 감점)

---

## 요약

robots.txt, sitemap, JSON-LD 구조화 데이터는 잘 갖춰져 있음.  
그러나 **크롤러가 실제로 따라갈 수 없는 링크**, **플레이스홀더로 남은 소셜/Twitter 정보**, **시맨틱 HTML 위반**, **누락된 스키마** 등 개선 필요 항목이 발견됨.

---

## 🔴 Critical — 즉시 수정 필요

### 1. Crawlable Anchors 실패 (Lighthouse 0점)

**영향**: Google이 `/blog`, `/tools`, `/about`, `/faq` 링크를 크롤링 불가로 판단할 수 있음.

**원인**: `BottomNav` 컴포넌트가 `md:hidden`으로 숨겨져 있어, Lighthouse(데스크탑 뷰 기준)에서 해당 링크들이 `zero dimensions`로 인식됨.

```
Link is hidden from view (zero dimensions):
- a[href="/blog"]
- a[href="/tools"]
- a[href="/about"]
- a[href="/faq"]
```

**파일**: `components/layout/bottom-nav.tsx`  
`<nav className="md:hidden fixed bottom-6 ...">` — CSS `display:none`으로 숨겨진 링크는 크롤러가 따라가지 않음.

**해결 방법**: `DesktopNav`의 링크가 항상 DOM에 존재하게 하거나, BottomNav 링크를 `visibility:hidden` 대신 `sr-only`(스크린 리더 전용)나 `aria-hidden`으로 처리하지 말고 `display:none` 없이 유지. 또는 두 네비게이션 모두 같은 링크를 갖되, BottomNav는 시각적 표현만 담당하도록 설계.

> **DesktopNav** (`hidden md:block`)도 모바일에서 숨겨지므로 모바일 Lighthouse 기준에서 동일 이슈 발생 가능.

**권장 조치**: `app/layout.tsx`의 `<head>` 또는 `<body>` 어딘가에 숨김 없이 항상 렌더링되는 링크 목록을 보조 형태로 추가.

---

### 2. Twitter Card creator 플레이스홀더

**파일**: `lib/seo/metadata.ts:97`

```ts
twitter: {
  creator: '@yourusername', // ← 플레이스홀더 그대로
}
```

실제 Twitter/X 계정이 없다면 이 필드를 **제거**해야 함. 잘못된 핸들이 있으면 Twitter Card 미리보기가 정상 작동하지 않음.

**해결**: 실제 계정으로 교체하거나 `creator` 필드 자체를 제거.

---

### 3. Organization 스키마 sameAs에 가짜 GitHub URL

**파일**: `lib/seo/metadata.ts:17`

```ts
social: {
  github: 'https://github.com/yourusername', // ← 실제 URL 아님
}
```

`createOrganizationSchema()`에서 `sameAs: Object.values(SITE_CONFIG.social).filter(Boolean)`로 그대로 사용됨.  
→ Google이 구조화 데이터를 검증할 때 잘못된 엔티티 연결로 신뢰도 하락 가능.

**해결**: 실제 GitHub URL로 교체하거나, 계정이 없으면 `social` 필드에서 제거.

---

## 🟠 High Priority — 빠른 시일 내 수정 권장

### 4. 중첩된 `<main>` 태그 (HTML 시맨틱 위반)

**파일**: `app/layout.tsx:152` + `app/page.tsx:19`

```tsx
// layout.tsx
<main className="md:pt-20 pb-24 md:pb-0">{children}</main>

// page.tsx — children 안에서 또 <main>
return (
  <main className="relative flex min-h-screen flex-col">
    ...
  </main>
)
```

HTML 스펙상 `<main>` 태그는 페이지당 **하나**만 있어야 함. 중첩된 `<main>`은 접근성 트리(ARIA) 오류를 유발하고 구조화 데이터 파싱에도 영향을 미침.

**해결**: `app/page.tsx`의 최상위 `<main>`을 `<div>` 또는 `<section>`으로 교체.

---

### 5. WebSite 스키마에 SearchAction 없음

**파일**: `lib/seo/structured-data.ts:36`

현재 WebSite 스키마에 `potentialAction`이 없어 Google Sitelinks 검색 기능을 활용 못함.

```ts
// 현재
export function createWebSiteSchema(): WebSiteSchema {
  return {
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    // potentialAction 없음
  };
}
```

**해결**: 블로그/툴 검색 기능이 있다면 아래 추가:

```ts
potentialAction: {
  '@type': 'SearchAction',
  target: {
    '@type': 'EntryPoint',
    urlTemplate: `${SITE_CONFIG.url}/blog?search={search_term_string}`,
  },
  'query-input': 'required name=search_term_string',
},
```

---

### 6. Footer 저작권 정보 오류 (2곳)

**파일**: `app/blog/page.tsx:102`, `app/blog/[category]/page.tsx:105`

```tsx
<p>© 2024 유용한 정보 허브. All rights reserved.</p>
```

두 가지 문제:
- 브랜드명 **"유용한 정보 허브"** — 현재 브랜드명 "Zento"와 불일치 (구 이름으로 추정)
- 연도 **2024 고정** — 매년 수동 수정 필요

**해결**: 공통 Footer 컴포넌트로 분리 후 아래 사용:

```tsx
<p>© {new Date().getFullYear()} Zento. All rights reserved.</p>
```

---

### 7. Google Search Console 인증 코드 미설정

**파일**: `lib/seo/metadata.ts:113`

```ts
verification: {
  // google: 'your-google-verification-code', // ← 주석 처리 상태
}
```

Google Search Console 인증이 없으면 인덱싱 현황, 크롤링 오류, Core Web Vitals 리포트를 공식적으로 확인할 수 없음. Naver는 HTML 태그로 설정되어 있으나 Google은 누락.

**해결**: Search Console에서 인증 코드를 받아 주석 해제 후 코드 입력.

---

## 🟡 Medium Priority — 품질 개선

### 8. 홈페이지 WebPage 스키마 누락

**파일**: `app/page.tsx`

홈페이지에는 `WebSite` + `Organization` 스키마만 있고, `WebPage` 스키마가 없음.  
About, Blog 등 다른 페이지는 `createPageStructuredData()`를 통해 `WebPage + BreadcrumbList`를 추가하지만 홈만 빠져 있음.

**해결**: `app/page.tsx` 또는 서버 컴포넌트에서 WebPage 스키마 추가:

```tsx
const webPage = createWebPageSchema({
  name: SITE_CONFIG.title,
  path: '/',
  description: SITE_CONFIG.description,
});
```

---

### 9. 카테고리 페이지 meta description 빈약

**파일**: `app/blog/[category]/page.tsx:44`

```ts
description: `${categoryInfo.name} 카테고리의 블로그 포스트 목록입니다. 총 ${categoryInfo.count}개의 글이 있습니다.`,
```

키워드가 포함되지 않은 단순한 설명. 검색 결과 스니펫으로 매력적이지 않음.

**해결**: 카테고리별 커스텀 description 또는 최근 포스트 제목을 포함한 풍부한 description 제공.

---

### 10. Lotto 회차별 페이지 Sitemap 미포함

**파일**: `lib/seo/sitemap.ts:100`

`app/tools/lotto/round/[round]/page.tsx` 동적 라우트가 존재하지만 sitemap에는 포함 안 됨. 로또 회차 페이지는 검색 유입이 될 수 있는 주요 페이지.

**해결**: 최근 N회차(예: 최신 50회차)를 sitemap에 포함하는 `collectLottoRoundEntries()` 함수 추가.

---

### 11. HeroSplitSection — h1이 Client Component 내부에 있음

**파일**: `components/home/hero-split-section.tsx:1`

```tsx
'use client' // 방문자 통계 API 호출 때문에 CSR 필요
```

페이지의 가장 중요한 `<h1>` 태그가 클라이언트 컴포넌트 안에 있음. Next.js는 클라이언트 컴포넌트도 SSR을 하므로 큰 문제는 아니지만, 방문자 통계 부분을 별도 컴포넌트로 분리하면 더 명확한 구조가 됨.

**해결**: 방문자 통계 부분만 별도 `VisitorStats` Client Component로 분리하고, HeroSplitSection 자체는 Server Component로 변경.

---

## 🔵 Low Priority — 세부 개선

### 12. hreflang 미설정

한국어 전용 사이트이므로 `<head>`에 명시적 언어 선언 추가 권장:

```html
<link rel="alternate" hreflang="ko" href="https://www.zento.kr" />
<link rel="alternate" hreflang="ko-KR" href="https://www.zento.kr" />
```

`app/layout.tsx`의 `<html lang="ko">`는 설정되어 있으나, alternates hreflang은 누락.

---

### 13. WebSite / Organization 스키마에 inLanguage 없음

**파일**: `lib/seo/structured-data.ts:36, 20`

`WebPage` 스키마에는 `inLanguage: 'ko-KR'`이 있지만, `WebSite`와 `Organization` 스키마에는 없음. 일관성을 위해 추가 권장.

---

### 14. 이미지 사이트맵 미구현

**파일**: `lib/seo/sitemap.ts:170`

OG 이미지(`/og-images/`)가 있으나 이미지 사이트맵이 비어 있음. Google 이미지 검색 노출을 위해 OG 이미지라도 이미지 사이트맵에 포함하면 좋음.

---

### 15. Blog Author 고정값

**파일**: `lib/seo/structured-data.ts:119`

BlogPosting 스키마에서 author 타입은 `Person`이지만, 실제 URL(authorUrl)이 없어 `url: undefined`로 들어감. 저자 프로필 페이지 또는 SNS URL을 제공하면 E-E-A-T(전문성/권위/신뢰성) 점수 향상에 도움됨.

---

## 📋 개선 작업 우선순위 정리

| 우선순위 | 항목 | 파일 | 예상 효과 |
|--------|------|------|---------|
| 🔴 Critical | BottomNav 크롤링 불가 링크 수정 | `bottom-nav.tsx`, `layout.tsx` | Lighthouse 87.5 → 100점 |
| 🔴 Critical | Twitter creator 플레이스홀더 제거 | `lib/seo/metadata.ts:97` | SNS 공유 정상화 |
| 🔴 Critical | GitHub sameAs 가짜 URL 제거 | `lib/seo/metadata.ts:17` | 구조화 데이터 신뢰도 |
| 🟠 High | `<main>` 태그 중첩 해결 | `app/page.tsx` | HTML 시맨틱 준수 |
| 🟠 High | Footer 브랜드명/연도 수정 | `blog/page.tsx`, `[category]/page.tsx` | 브랜드 일관성 |
| 🟠 High | Google Search Console 인증 | `lib/seo/metadata.ts:113` | 인덱싱 모니터링 |
| 🟠 High | WebSite SearchAction 스키마 추가 | `lib/seo/structured-data.ts` | Google Sitelinks 검색 |
| 🟡 Medium | 홈 WebPage 스키마 추가 | `app/page.tsx` | 구조화 데이터 완성도 |
| 🟡 Medium | 카테고리 description 개선 | `app/blog/[category]/page.tsx` | 검색 스니펫 품질 |
| 🟡 Medium | Lotto 회차 sitemap 추가 | `lib/seo/sitemap.ts` | 롱테일 검색 유입 |
| 🔵 Low | hreflang 추가 | `app/layout.tsx` | 언어 명시성 |
| 🔵 Low | 이미지 사이트맵 구현 | `lib/seo/sitemap.ts:170` | Google 이미지 검색 |

---

---

## 📌 수정 작업 체크리스트

### 🔴 Critical
- [x] **BottomNav 크롤링 불가 링크** — `app/layout.tsx`에 `sr-only` 상시 렌더링 nav 추가 (`NAV_ITEMS` 기반, 1px 크기로 크롤러 인식 가능)
- [x] **Twitter creator `@yourusername` 제거** — `lib/seo/metadata.ts:97` creator 필드 주석 처리
- [x] **Organization sameAs 가짜 GitHub URL 제거** — `lib/seo/metadata.ts:17` github URL 주석 처리

### 🟠 High Priority
- [ ] `<main>` 태그 중첩 해결 (`app/page.tsx`)
- [ ] Footer 브랜드명/연도 수정 (`app/blog/page.tsx`, `app/blog/[category]/page.tsx`)
- [ ] Google Search Console 인증 코드 설정 (`lib/seo/metadata.ts`)
- [ ] WebSite SearchAction 스키마 추가 (`lib/seo/structured-data.ts`)

### 🟡 Medium Priority
- [ ] 홈페이지 WebPage 스키마 추가 (`app/page.tsx`)
- [ ] 카테고리 페이지 meta description 개선 (`app/blog/[category]/page.tsx`)
- [ ] Lotto 회차별 페이지 sitemap 추가 (`lib/seo/sitemap.ts`)

### 🔵 Low Priority
- [ ] hreflang 추가 (`app/layout.tsx`)
- [ ] 이미지 사이트맵 구현 (`lib/seo/sitemap.ts`)

---

## ✅ 이미 잘 되어 있는 항목

- `robots.txt` — 크롤러별 세분화, AI 봇 허용, 유효
- `sitemap.xml` — 정적/블로그/카테고리/툴 페이지 자동 포함
- `canonical` — 모든 페이지에 정상 설정
- `meta description` — 모든 주요 페이지에 설정
- `OG 태그` — og:image, og:type, og:locale 완비
- `구조화 데이터(JSON-LD)` — BlogPosting, BreadcrumbList, FAQPage, HowTo, SoftwareApplication 스키마 적용
- `Naver 사이트 검증` — 정상 설정
- `이미지 alt 텍스트` — 주요 이미지에 alt 속성 있음
- `robots meta` — index, follow, googlebot 최적화 설정
- `favicon/apple-touch-icon` — 다양한 크기 제공

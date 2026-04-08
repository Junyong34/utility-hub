# SEO Audit Findings and Remediation Plan

> **For agentic workers:** REQUIRED: Use `verification-before-completion` before claiming the fixes are done. If implementation is split into multiple chunks, use checkbox (`- [ ]`) tracking and verify rendered HTML, not just source code.

**Goal:** 현재 `utility-hub` 저장소의 SEO 관점 문제를 근거 기반으로 정리하고, 인덱싱/랭킹 신호를 안정화하기 위한 우선순위별 해결 계획을 고정한다.

**Scope:** 홈, 장소 허브, 혜택 허브, 블로그, RSS, 구조화 데이터, sitemap, metadata, canonical, Twitter/Open Graph

**Audit Date:** 2026-04-07

**Method:** 코드 정적 검토 + 기존 로컬 개발 서버(`http://127.0.0.1:3000`) 렌더 결과 확인

---

## 감사 범위와 신뢰도

### 확인한 범위

- 전역 메타데이터: `app/layout.tsx`, `lib/seo/metadata.ts`
- 인덱싱 제어: `app/robots.ts`, `lib/seo/robots.ts`
- 사이트맵/RSS: `app/(meta)/sitemap.ts`, `lib/seo/sitemap.ts`, `app/rss.xml/route.ts`
- 블로그 라우트: `app/blog/page.tsx`, `app/blog/[category]/page.tsx`, `app/blog/[category]/[slug]/page.tsx`
- 장소/혜택 허브: `app/page.tsx`, `app/places/page.tsx`, `app/places/[region]/page.tsx`, `app/benefits/page.tsx`
- 구조화 데이터: `lib/seo/structured-data.ts`, `lib/tools/tool-structured-data.ts`

### 신뢰도

- **높음:** 코드와 실제 로컬 렌더 HTML에서 직접 확인한 이슈
- **보통:** 검색 의도/브랜드 포지셔닝 분산에 따른 랭킹 영향 추정
- **한계:** Search Console, 실서비스 로그, Core Web Vitals 실측, 백링크 데이터는 확인하지 못함

### 주의사항

- 로컬 개발 서버에서는 `NEXT_PUBLIC_SITE_URL` 미설정으로 `localhost`가 출력된다.
- 하지만 이번 감사의 핵심 문제는 `localhost` 자체가 아니라, 여러 페이지가 **자기 canonical이 아니라 루트 canonical을 상속**하고 있다는 점이다.

---

## Executive Summary

현재 가장 큰 SEO 리스크는 아래 두 가지다.

1. `/places`, `/benefits`, `/places/[region]`가 홈 canonical을 상속하면서 독립 URL 신호를 잃고 있다.
2. 블로그의 실제 URL 계약이 `/blog/[category]/[slug]`인데, RSS/noscript/ItemList 일부가 `/blog/[slug]`를 내보내고 있다.

즉, 허브 페이지는 **canonical 충돌**, 블로그는 **URL 일관성 붕괴**가 핵심 문제다.

이 두 이슈를 먼저 해결하면 인덱싱 안정성과 내부 SEO 신호 일관성이 가장 크게 개선된다.

---

## 우선순위 요약

| 우선순위 | 이슈 | 영향 |
| --- | --- | --- |
| P0 | 허브 canonical 충돌 (`/places`, `/benefits`, `/places/[region]`) | 인덱싱/정규화 신호 손상 |
| P0 | 블로그 URL 계약 불일치 (RSS, noscript, ItemList) | 잘못된 URL 배포, 구조화 데이터 오류 |
| P1 | 허브 페이지 JSON-LD/Twitter 메타 누락 또는 상속 오류 | 허브 엔터티 신호 약화 |
| P1 | 리브랜딩 방향과 인덱서블 카피 불일치 | 사이트 주제 분산 |
| P2 | sitemap `lastModified` 품질 저하 | 크롤링 힌트 신뢰도 저하 |
| P3 | 카테고리 매핑 불완전 (`investment`, `lotto`) | 잠재적 표시 불일치 |

---

## 상세 이슈

### 1. 허브 페이지 canonical 충돌

**Severity:** High

**문제**

`/places`, `/benefits`, `/places/[region]`가 페이지별 canonical을 명시하지 않아 부모 레이아웃의 canonical을 그대로 상속하고 있다.

**근거**

- 소스:
  - `app/places/page.tsx`
  - `app/benefits/page.tsx`
  - `app/places/[region]/page.tsx`
- 로컬 렌더:
  - `/places` canonical: `http://localhost:3000`
  - `/benefits` canonical: `http://localhost:3000`
  - `/places/seoul` canonical: `http://localhost:3000`

**영향**

- 허브 페이지가 홈과 같은 canonical로 묶일 수 있다.
- 검색엔진이 허브 URL을 독립 랜딩 페이지로 평가하지 못할 수 있다.
- 내부링크, sitemap, 메타 title이 있어도 정규 URL 신호가 충돌한다.

**권장 해결**

- 이 페이지들을 모두 `createMetadata()` 기반으로 통일한다.
- 각 페이지에 `canonical`, `description`, `keywords`, `openGraph`, `twitter`를 명시한다.
- 제목에는 브랜드를 직접 붙이지 않고 템플릿에 맡겨 중복을 피한다.

---

### 2. 블로그 URL 계약 불일치

**Severity:** High

**문제**

블로그의 실제 라우트는 `/blog/[category]/[slug]`인데, 일부 SEO 표면이 `/blog/[slug]`를 사용하고 있다.

**근거**

- `app/rss.xml/route.ts`
  - `const postUrl = \`${SITE_CONFIG.url}/blog/${post.slug}\`;`
- `app/blog/page.tsx`
  - noscript 링크가 `href={\`/blog/${post.slug}\`}`
- `lib/seo/structured-data.ts`
  - `createItemListSchema()`가 `url: \`${SITE_CONFIG.url}/blog/${post.slug}\``
- 반면 실제 상세 canonical은 `/blog/consumer/kca-budget-coffee-brand-satisfaction`로 렌더됨

**영향**

- RSS 구독기, 외부 수집기, 구조화데이터 소비자가 잘못된 URL을 받는다.
- 검색엔진이 동일 콘텐츠의 여러 URL 패턴을 인식할 수 있다.
- 블로그 목록에서 JS 미실행 상황의 크롤러가 잘못된 링크를 따라갈 수 있다.

**권장 해결**

- 블로그 관련 모든 URL 생성은 `categorySlug + slug`를 기준으로 통일한다.
- `createItemListSchema()` 입력 타입에 `categorySlug`를 포함시킨다.
- RSS, noscript, 내부 유틸에서 동일 헬퍼를 쓰도록 공통화한다.

---

### 3. 허브 페이지 JSON-LD와 Twitter 메타가 불완전함

**Severity:** Medium

**문제**

새 허브 페이지들이 레이아웃의 `WebSite`/`Organization`만 렌더하고, 페이지 단위 `WebPage`/`BreadcrumbList`를 제공하지 않는다. Twitter 메타도 홈 설명을 그대로 상속하는 케이스가 있다.

**근거**

- `/places` 렌더 결과에서 JSON-LD `<script type="application/ld+json">` 수는 2개뿐
- 둘 다 레이아웃 공통 스키마
- `/places`의 `twitter:title`은 홈 카피 상속

**영향**

- 허브 페이지가 어떤 페이지인지 검색엔진에 명확히 전달되지 않는다.
- 소셜 공유 카드가 허브 목적과 맞지 않게 노출될 수 있다.

**권장 해결**

- `/places`, `/benefits`, `/places/[region]`에 `createPageStructuredData()` + `JsonLdMultiple` 추가
- Twitter 메타는 `createMetadata()`를 통해 허브별로 재생성

---

### 4. 리브랜딩 방향과 인덱서블 카피가 아직 강하게 어긋남

**Severity:** Medium

**문제**

프로젝트 기준 문서는 “수도권 1~7세 자녀 부모”, “아이와 갈 곳 찾기”를 핵심 과업으로 두고 있지만, 블로그/소개/FAQ/도구 허브는 여전히 생활/금융/소비자 비교 중심 포지셔닝이 강하다.

**근거**

- `AGENTS.md`
  - 리브랜딩 핵심 독자와 우선순위 명시
- `app/blog/page.tsx`
  - 주차, 소비자 비교, 생활비/비용 계산 중심 메타
- `app/about/page.tsx`
  - “실전 생활 가이드 사이트” 중심 설명
- `app/faq/page.tsx`
  - 서비스 소개가 주차/소비자 비교/생활비 금융 계산 중심
- `lib/tools/tool-metadata.ts`
  - 도구 허브 설명이 금융 판단 중심

**영향**

- 사이트 주제 신호가 홈과 하위 허브에서 일관되지 않다.
- 육아형 허브로의 재포지셔닝이 검색엔진에 충분히 전달되지 않을 수 있다.

**권장 해결**

- 홈 메인 과업에 맞게 `/blog`, `/about`, `/faq`, `/tools` 메타카피를 재정렬한다.
- 단, 기존 금융/생활 자산은 삭제하지 않고 “도구/보조 자산”으로 재배치한다.
- 허브 메타 설명은 “아이와 가볼 곳 → 도구 → 혜택·지원금” 순서를 유지한다.

**비고**

- 이 항목의 실제 랭킹 영향은 Search Console 데이터 없이는 정량 확정이 어렵다.
- 따라서 영향 추정은 **This may not be accurate.**

---

### 5. sitemap `lastModified`가 실제 변경일을 반영하지 않음

**Severity:** Low

**문제**

정적 페이지, 카테고리, 도구 페이지 대부분이 `new Date()`로 `lastModified`를 생성하고 있다.

**근거**

- `lib/seo/sitemap.ts`
  - 정적 페이지, 카테고리, 도구, 장소 허브 엔트리 대부분이 현재 시각 사용

**영향**

- 모든 배포 시 다수 URL이 “방금 수정됨”처럼 보일 수 있다.
- sitemap 힌트의 신뢰도가 떨어진다.

**권장 해결**

- 포스트는 `updatedAt` 또는 `date`
- 도구는 도구별 `publishedAt` 또는 명시적 `updatedAt`
- 장소/혜택 허브는 실제 데이터 소스 갱신일 사용

---

### 6. 카테고리 매핑이 일부 누락돼 있음

**Severity:** Low

**문제**

`lib/blog/posts.ts`의 `CATEGORY_NAMES`에는 `investment`, `lotto` 매핑이 없다.

**근거**

- 실제 디렉토리: `investment`, `lotto`
- 현재 포스트는 frontmatter에 `category`, `categorySlug`를 직접 넣고 있어 즉시 문제는 없지만, frontmatter 누락 시 slug가 그대로 노출될 수 있다.

**영향**

- 신규 글 또는 메타 누락 글에서 카테고리 라벨 일관성이 깨질 수 있다.

**권장 해결**

- `CATEGORY_NAMES`에 `investment`, `lotto` 추가
- 가능하면 새 포스트 생성 체크리스트에 카테고리 매핑 검증 포함

---

## 해결 계획

## Phase 1. P0 수정: canonical과 URL 계약 복구

### 목표

검색엔진이 허브 URL과 블로그 상세 URL을 정확히 이해하도록 만드는 것

### 작업 항목

- [ ] `/places`를 `createMetadata()` 기반으로 전환
- [ ] `/benefits`를 `createMetadata()` 기반으로 전환
- [ ] `/places/[region]`를 `createMetadata()` 기반으로 전환
- [ ] 블로그 목록 noscript 링크를 `/blog/[category]/[slug]`로 수정
- [ ] RSS 링크/guid를 `/blog/[category]/[slug]`로 수정
- [ ] `createItemListSchema()`를 `categorySlug` 지원 형태로 수정

### 완료 기준

- `/places`, `/benefits`, `/places/seoul`의 canonical이 각 자기 URL을 가리킨다.
- RSS 항목 링크가 모두 카테고리 경로를 포함한다.
- 블로그 목록 구조화데이터 ItemList URL이 실제 상세 경로와 일치한다.

### 검증

```bash
curl -s http://127.0.0.1:3000/places | rg 'canonical|twitter:title|og:title'
curl -s http://127.0.0.1:3000/benefits | rg 'canonical|twitter:title|og:title'
curl -s http://127.0.0.1:3000/places/seoul | rg 'canonical|twitter:title|og:title'
curl -s http://127.0.0.1:3000/rss.xml | rg '<link>|<guid>'
curl -s http://127.0.0.1:3000/blog | rg '/blog/'
```

---

## Phase 2. P1 수정: 허브 구조화 데이터와 페이지 메타 강화

### 목표

허브 페이지를 검색엔진에 독립된 목적 페이지로 설명할 수 있게 만드는 것

### 작업 항목

- [ ] `/places`에 `WebPage` + `BreadcrumbList` JSON-LD 추가
- [ ] `/benefits`에 `WebPage` + `BreadcrumbList` JSON-LD 추가
- [ ] `/places/[region]`에 `WebPage` + `BreadcrumbList` JSON-LD 추가
- [ ] 각 허브의 Open Graph/Twitter 제목과 설명을 페이지 목적에 맞게 정렬

### 완료 기준

- 허브 페이지 렌더 HTML에서 레이아웃 공통 스키마 외에 페이지 전용 스키마가 확인된다.
- Twitter 카드 제목/설명이 홈 카피를 상속하지 않는다.

### 검증

```bash
curl -s http://127.0.0.1:3000/places | rg 'application/ld\\+json|twitter:title|twitter:description'
curl -s http://127.0.0.1:3000/benefits | rg 'application/ld\\+json|twitter:title|twitter:description'
curl -s http://127.0.0.1:3000/places/seoul | rg 'application/ld\\+json|twitter:title|twitter:description'
```

---

## Phase 3. P1 수정: 리브랜딩 관점 메타카피 정렬

### 목표

사이트 전체가 “아이와 갈 곳 찾기” 중심 허브라는 신호를 더 명확하게 만드는 것

### 작업 항목

- [ ] `/blog` 메타 설명을 육아형 허브 하위의 가이드 자산 관점으로 재작성
- [ ] `/about` 소개 카피를 리브랜딩 방향에 맞게 수정
- [ ] `/faq` 소개 카피를 “아이와 갈 곳/도구/혜택” 축으로 재정렬
- [ ] `/tools` 허브 메타를 금융 중심 단독 표현에서 보조 축 표현으로 조정

### 가드레일

- 기존 금융/생활 자산은 삭제하지 않는다.
- 메타카피 수정은 “교체”가 아니라 “재배치” 관점으로 진행한다.
- 기존 블로그 상세 라우트는 유지한다.

### 완료 기준

- 주요 허브 페이지 메타 설명이 서로 다른 사이트 정체성을 말하지 않는다.
- 홈과 하위 허브의 핵심 과업 서술 순서가 일치한다.

---

## Phase 4. P2 수정: sitemap 품질 개선

### 목표

sitemap을 실제 수정 힌트에 더 가깝게 만들기

### 작업 항목

- [ ] 블로그 포스트에 `updatedAt` 지원 여부 검토
- [ ] 도구별 `updatedAt` 또는 `publishedAt` 기준 정리
- [ ] 장소/혜택 허브의 데이터 소스 갱신 시점 정의
- [ ] `new Date()` 남용 구간 축소

### 완료 기준

- sitemap 엔트리의 `lastModified`가 무의미한 현재 시각 남발 형태가 아니다.

---

## Phase 5. P3 수정: 블로그 카테고리 방어선 보강

### 목표

새 글 작성 시 카테고리 표시 불일치를 예방하기

### 작업 항목

- [ ] `CATEGORY_NAMES`에 `investment`, `lotto` 추가
- [ ] 새 카테고리 추가 체크리스트에 매핑 검증 명시

### 완료 기준

- frontmatter 누락 시에도 사람이 읽는 카테고리명이 유지된다.

---

## 구현 순서 제안

1. Phase 1
2. Phase 2
3. Phase 3
4. Phase 4
5. Phase 5

이 순서를 추천하는 이유는, 먼저 인덱싱 신호 충돌을 멈추고, 그다음 검색엔진이 페이지를 더 잘 이해하게 만들고, 마지막으로 장기적인 품질 개선으로 넘어가는 편이 효과가 크기 때문이다.

---

## 검증 체크리스트

구현 후 아래를 반드시 확인한다.

- [ ] `/places`, `/benefits`, `/places/[region]` canonical 정상
- [ ] 허브 페이지 title에 브랜드 중복이 없음
- [ ] 허브 페이지 twitter 메타가 홈 카피를 상속하지 않음
- [ ] 블로그 목록 noscript 링크가 모두 실제 상세 경로와 일치
- [ ] RSS `<link>`, `<guid>`가 실제 상세 경로와 일치
- [ ] 블로그 ItemList schema URL이 실제 상세 경로와 일치
- [ ] 허브 페이지 JSON-LD에 `WebPage`, `BreadcrumbList` 존재
- [ ] sitemap `lastModified`가 과도하게 현재 시각으로만 채워지지 않음

---

## 예상 효과

- 허브 페이지의 독립 인덱싱 가능성 개선
- 블로그 URL 정규화 신호 일치
- 구조화 데이터와 실제 라우트의 불일치 감소
- 리브랜딩 방향과 검색 노출 메시지의 정합성 개선

---

## Brief Conclusion

현재 SEO에서 가장 먼저 해결해야 할 것은 **허브 canonical 충돌**과 **블로그 URL 계약 불일치**다. 이 두 가지를 먼저 고치면 인덱싱 안정성과 내부 링크/피드/구조화데이터 일관성이 즉시 좋아지고, 그 다음 단계로 허브 JSON-LD와 리브랜딩 메타카피 정렬을 진행하는 것이 가장 효율적이다.

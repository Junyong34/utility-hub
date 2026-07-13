# 프로젝트 지도

이 문서는 URL이나 제품 영역에서 실제 수정 위치까지 두 단계 안에 도달하기 위한 탐색 지도다. 현재 경로는 이관 전 저장소를 설명하고, 목표 소유자는 점진 이관이 끝난 뒤의 기준을 설명한다. 공개 동작의 상세 기준선은 [공개 계약 매트릭스](./public-contract-matrix.md), import 규칙은 [모듈 경계](./module-boundaries.md), 이관 상태는 [마이그레이션 ledger](./migration-ledger.md)에서 확인한다.

## 탐색 순서

1. 사용자에게 보이는 URL이 있으면 `app`에서 해당 `page.tsx`, `route.ts` 또는 metadata route를 찾는다.
2. 진입점이 호출하는 `modules/<domain>/{public,ui,client,server}.ts` 중 변경 성격에 맞는 인터페이스로 이동한다.

URL이 없는 변경은 다음 순서를 사용한다.

- 계산·정책·값 타입: `modules/<domain>/domain`
- 파일·외부 API·비밀 값·서버 캐시: `modules/<domain>/server`
- URL state·React 상태·브라우저 기능: `modules/<domain>/client`
- 서버 안전 렌더링: `modules/<domain>/ui`
- 두 개 이상의 모듈에서 같은 의미로 쓰는 기능: `shared/<responsibility>`
- 환경과 서비스 설정: `config/<responsibility>`
- 원천 콘텐츠·데이터: `content/**`, `data/private/**`

아직 이관되지 않은 영역은 아래 표의 현재 소유자를 따라간다. 새 모듈에서 legacy `components`, `lib`, `hooks`, `types`로 역참조하지 않는다.

## Route → owner 지도

| 공개 표면                                                                       | Next.js 진입점                                    | 현재 소유자                                                                           | 목표 소유자                                                        | `app`에 남길 프레임워크 책임                                          |
| ------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `/`                                                                             | `app/page.tsx`                                    | `components/home/**`, `lib/home/**`                                                   | `modules/home`                                                     | `metadata`, 기본 page export                                          |
| `/places`                                                                       | `app/places/page.tsx`                             | `components/places/**`, `lib/places/**`, `types/place-source.ts`                      | `modules/places`                                                   | `generateMetadata`, `searchParams` 해석, page export                  |
| `/places/[region]`                                                              | `app/places/[region]/page.tsx`                    | places + `lib/seo/site-section-seo.ts`                                                | `modules/places`                                                   | `generateStaticParams`, `generateMetadata`, `notFound()`, page export |
| `/places/[region]/[placeId]`                                                    | `app/places/[region]/[placeId]/page.tsx`          | places + SEO structured data                                                          | `modules/places`                                                   | `generateStaticParams`, `generateMetadata`, `notFound()`, page export |
| `/benefits`                                                                     | `app/benefits/page.tsx`                           | `components/benefits/**`, `lib/benefits/**`, `content/benefits/**`                    | `modules/benefits`                                                 | `metadata`, page export                                               |
| `/blog`                                                                         | `app/blog/page.tsx`                               | `components/blog/**`, `lib/blog/**`, `content/posts/**`                               | `modules/blog`                                                     | `generateMetadata`, `searchParams` 해석, page export                  |
| `/blog/[category]`                                                              | `app/blog/[category]/page.tsx`                    | blog + SEO structured data                                                            | `modules/blog`                                                     | `generateStaticParams`, `generateMetadata`, `notFound()`, page export |
| `/blog/[category]/[slug]`                                                       | `app/blog/[category]/[slug]/page.tsx`             | blog + SEO/OG                                                                         | `modules/blog`                                                     | `generateStaticParams`, `generateMetadata`, `notFound()`, page export |
| `/tools`                                                                        | `app/tools/page.tsx`                              | `lib/tools/tool-config.ts`, `components/tools/ToolsPageClient.tsx`                    | `modules/tools/catalog`                                            | `metadata`, 직렬화 가능한 tool DTO 조합, page export                  |
| `/tools/loan-calculator`                                                        | `app/tools/loan-calculator/page.tsx`              | `components/tools/loan-calculator/**`, `lib/tools/loan-calculator.ts`                 | `modules/tools/loan-calculator`                                    | `metadata`, page export                                               |
| `/tools/dsr-calculator`                                                         | `app/tools/dsr-calculator/page.tsx`               | `components/tools/dsr-calculator/**`, `lib/tools/dsr/**`                              | `modules/tools/dsr-calculator`                                     | `metadata`, page export                                               |
| `/tools/savings-calculator`                                                     | `app/tools/savings-calculator/page.tsx`           | `components/tools/savings-calculator/**`, `lib/tools/savings-calculator.ts`           | `modules/tools/savings-calculator`                                 | `metadata`, page export                                               |
| `/tools/home-buying-funds-calculator`                                           | `app/tools/home-buying-funds-calculator/page.tsx` | 같은 이름의 `components/tools/**`, `lib/tools/**`                                     | `modules/tools/home-buying-funds-calculator`                       | `metadata`, page export                                               |
| `/tools/last-digit-game`                                                        | `app/tools/last-digit-game/page.tsx`              | `components/tools/last-digit-game/**`, `lib/tools/last-digit-game.ts`                 | `modules/tools/last-digit-game`                                    | `metadata`, page export                                               |
| `/tools/pomodoro`                                                               | `app/tools/pomodoro/page.tsx`                     | `components/tools/pomodoro/**`, `lib/tools/pomodoro/**`                               | `modules/tools/pomodoro`                                           | `metadata`, page export                                               |
| `/tools/lotto`                                                                  | `app/tools/lotto/page.tsx`                        | `components/lotto/**`, `lib/lotto/**`                                                 | `modules/tools/lotto`                                              | `dynamic = 'force-dynamic'`, `metadata`, page export                  |
| `/tools/lotto/stats`                                                            | `app/tools/lotto/stats/page.tsx`                  | lotto + tool SEO                                                                      | `modules/tools/lotto`                                              | `metadata`, page export                                               |
| `/tools/lotto/round/[round]`                                                    | `app/tools/lotto/round/[round]/page.tsx`          | lotto data + tool SEO                                                                 | `modules/tools/lotto`                                              | `generateStaticParams`, `generateMetadata`, `notFound()`, page export |
| `/tools/home-check`                                                             | `app/tools/home-check/page.tsx`                   | `components/tools/moving-budget-checklist/**`, `lib/tools/moving-budget-checklist/**` | `modules/tools/moving-budget-checklist`                            | private/noindex `metadata`, page export                               |
| `/tools/og-image-studio`                                                        | `app/tools/og-image-studio/page.tsx`              | tool config + blog loader + OG UI                                                     | `modules/tools/og-image-studio`                                    | `metadata`, `searchParams` 해석, page export                          |
| `/finance` 및 `/finance/{assets,debts,expenses,investments,projection,reports}` | `app/finance/**/page.tsx`                         | `components/finance/**`, `lib/finance/**`, `data/private/**`                          | `modules/finance`                                                  | noindex `metadata`, query 해석, page export                           |
| `/finance/input`                                                                | `app/finance/input/page.tsx`                      | finance input/local draft                                                             | `modules/finance`                                                  | noindex `metadata`, `dynamic = 'force-dynamic'`, page export          |
| `/about`, `/faq`                                                                | `app/about/page.tsx`, `app/faq/page.tsx`          | route-local 표시/콘텐츠 + shared SEO                                                  | `modules/site-shell`                                               | `metadata`, page export                                               |
| `/api/places`                                                                   | `app/api/places/route.ts`                         | `lib/places/place-list-*`                                                             | `modules/places/server.ts`                                         | `GET`, Request/Response 변환                                          |
| `/api/posts`                                                                    | `app/api/posts/route.ts`                          | `lib/blog/posts.ts`, `lib/blog/pagination.ts`                                         | `modules/blog/server.ts`                                           | `GET`, Request/Response 변환                                          |
| `/api/analytics/visitors`                                                       | `app/api/analytics/visitors/route.ts`             | `lib/analytics/**`                                                                    | `modules/analytics/server.ts`                                      | `runtime = 'nodejs'`, `dynamic = 'force-dynamic'`, `GET`              |
| `/api/og/custom`                                                                | `app/api/og/custom/route.ts`                      | `lib/seo/og-renderer.tsx`                                                             | `modules/seo/server.ts`                                            | `runtime = 'nodejs'`, `GET`, query 변환                               |
| `/api/og/tools/[toolId]`                                                        | `app/api/og/tools/[toolId]/route.ts`              | tool catalog + OG renderer                                                            | `modules/seo/server.ts`가 `modules/tools/catalog/server.ts`를 조합 | `runtime = 'nodejs'`, `GET`, 404 응답                                 |
| `/api/og/blog/[category]/[slug]`                                                | `app/api/og/blog/[category]/[slug]/route.ts`      | blog loader + OG renderer                                                             | `modules/seo/server.ts`가 `modules/blog/server.ts`를 조합          | `runtime = 'nodejs'`, `GET`, 404 응답                                 |
| `/rss.xml`                                                                      | `app/rss.xml/route.ts`                            | blog loader + SEO site config                                                         | `modules/blog/server.ts`                                           | `GET`, XML Response와 cache header                                    |
| `/sitemap.xml`                                                                  | `app/(meta)/sitemap.ts`                           | `lib/seo/sitemap.ts`                                                                  | `modules/seo/server.ts`                                            | metadata route default export                                         |
| `/robots.txt`                                                                   | `app/robots.ts`                                   | `lib/seo/metadata.ts`                                                                 | `modules/seo/public.ts`                                            | metadata route default export                                         |
| `/favicon.ico`                                                                  | `app/favicon.ico`                                 | file-based metadata asset                                                             | 위치 유지                                                          | Next.js metadata file convention                                      |
| 모든 route shell                                                                | `app/layout.tsx`, `app/providers.tsx`             | `components/layout/**`, `components/seo/**`, 공통 Provider                            | `modules/site-shell`                                               | `metadata`, `viewport`, font/Script/Provider 연결, layout export      |
| 404 UI                                                                          | `app/(error)/not-found.tsx`                       | route-local UI + `shared/ui`                                                          | `modules/site-shell/ui.ts`                                         | `not-found.tsx` default export                                        |

## Source of truth와 I/O 지도

| 변경 대상            | 현재 source of truth                            | 보존할 계약                                                                                                                                | 목표 loader/adapter                                         |
| -------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| 공개 도구 등록       | `lib/tools/tool-config.ts`                      | 도구 ID, 순서, 메타데이터, FAQ, HowTo, OG 입력                                                                                             | `modules/tools/catalog/public.ts` 및 `server.ts`            |
| 블로그 카테고리 이름 | `lib/blog/posts.ts`의 `CATEGORY_NAMES`          | slug→표시 이름. 현재 콘텐츠 디렉터리는 `ai-image-creator`, `benefits`, `consumer`, `investment`, `lotto`, `parenting`, `parking`, `places` | `modules/blog/public.ts`                                    |
| 블로그 원문          | `content/posts/<category>/*.md`                 | category/slug URL, front matter, RSS/sitemap 포함                                                                                          | `modules/blog/server.ts`                                    |
| 장소 원천            | `content/places/**`                             | ID, 지역 slug, 발행 상태, 정렬, 링크, 썸네일 경로                                                                                          | `modules/places/server.ts`                                  |
| 혜택 원천            | `content/benefits/**`                           | ID, 지역/카테고리, 공식 출처와 검증 상태                                                                                                   | `modules/benefits/server.ts`                                |
| 재무 원천            | `data/private/finance-snapshots.json`과 example | dataset version, 월별 snapshot, atomic write, Netlify `/tmp` fallback                                                                      | `modules/finance/server.ts`                                 |
| 로또 회차 데이터     | `lib/lotto/lotto_draws.json`                    | JSON shape와 update script 대상 경로                                                                                                       | `modules/tools/lotto/server.ts` 또는 module-owned data 위치 |
| 공통 네비게이션      | `components/layout/nav-config.ts`               | 링크 순서·라벨·아이콘 계약                                                                                                                 | `shared/contracts/navigation.ts` + `modules/site-shell`     |
| 사이트/SEO 설정      | `lib/seo/metadata.ts`                           | 사이트 URL fallback, canonical, 기본 robots, OG 기본값                                                                                     | `config/site.ts`, `modules/seo`                             |
| 정적 공개 자산       | `public/**`                                     | URL 문자열과 빌드 산출 경로                                                                                                                | 위치 유지. 소비 module만 변경                               |

## 목표 코드 트리

필요한 책임이 생길 때만 디렉터리를 만든다. 다음은 허용 가능한 전체 모양이지, 모든 모듈이 모든 레이어를 가져야 한다는 뜻이 아니다.

```text
app/                         # Next.js adapter
modules/
  <domain>/
    public.ts                # 환경 중립 인터페이스
    ui.ts                    # 서버 안전 UI 인터페이스
    client.ts                # client 인터페이스
    server.ts                # server 인터페이스
    domain/                  # 순수 규칙과 값 타입
    ui/                      # 렌더링 구현
    client/                  # 상태와 browser adapter 구현
    server/                  # I/O 구현
  tools/
    catalog/
    <tool-id>/
shared/
  contracts/
  domain/
  ui/
  client/
  server/                    # 실제 두 번째 소비자가 생길 때만
config/
  env/
  runtime/
content/                     # 원천 콘텐츠 위치 유지
data/private/                # 비공개 원천 데이터 위치 유지
tests/
  architecture/
  contracts/
  integration/
  e2e/
  live/
```

## 수정 성격별 빠른 경로

| 질문                                              | 첫 위치                       | 다음 위치                                                |
| ------------------------------------------------- | ----------------------------- | -------------------------------------------------------- |
| URL이 열리지 않거나 404 정책이 잘못됐는가?        | `app/<route>`                 | owner module의 공개 인터페이스                           |
| 계산 결과나 필터 규칙이 잘못됐는가?               | owner module의 `public.ts`    | `domain/**`와 source-adjacent test                       |
| URL query/default가 잘못됐는가?                   | `public-contract-matrix.md`   | owner module의 `client/**` 또는 app param adapter        |
| 파일/외부 API/캐시가 잘못됐는가?                  | owner module의 `server.ts`    | `server/**`, `config/env/**`                             |
| 화면 표시만 바꿔야 하는가?                        | owner module의 `ui.ts`        | `ui/**`                                                  |
| LocalStorage/clipboard/audio/fullscreen 문제인가? | owner module의 `client.ts`    | `client/**`                                              |
| canonical/robots/OG/JSON-LD/RSS/sitemap 문제인가? | 해당 `app` 진입점             | `modules/seo` 또는 `modules/blog`의 명시적 인터페이스    |
| 같은 기능이 여러 도메인에서 중복되는가?           | 각 owner module에서 의미 비교 | 같은 의미의 두 번째 소비자가 확인될 때만 `shared`로 승격 |

## 현재 확인이 필요한 항목

- `/finance/**`는 `noindex, nofollow`를 선언하지만 현재 route 코드에서는 인증·인가를 확인할 수 없다. 검색 비노출과 접근 제어를 같은 의미로 취급하지 않는다.
- `/api/places`와 `/api/posts`는 명시적인 `Cache-Control`을 설정하지 않는다. Next.js 버전과 배포 adapter가 만드는 실제 header는 런타임 계약 테스트에서 확인해야 한다.
- `@takumi-rs/image-response`가 성공 응답에 설정하는 실제 `Content-Type`과 renderer 예외 시 응답 본문은 현재 코드만으로 확정하지 않고 런타임 계약 테스트에서 확인한다.

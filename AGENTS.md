# AGENTS.md

## Project Overview

`utility-hub`는 **Zento**([zento.kr](https://www.zento.kr)) 서비스의 저장소입니다.  
한국어 블로그와 생활/금융 중심 웹 도구를 함께 운영하는 Next.js App Router 프로젝트입니다.

### Current Stack
- Next.js `16.1.6`
- React `19.2.3`
- TypeScript `5`
- Tailwind CSS `4`
- shadcn/ui + Radix UI + Base UI
- React Query (`@tanstack/react-query`)
- nuqs (`URL state`)
- Google Analytics 4 Data API
- `@takumi-rs/image-response` 기반 OG 이미지 렌더링

## Current Product Surface

### Blog
- 마크다운 포스트는 `content/posts/<category>/*.md`에 저장
- 블로그 라우트:
  - `/blog`
  - `/blog/[category]`
  - `/blog/[category]/[slug]`
- 포스트 API: `/api/posts`
- RSS 피드: `/rss.xml`
- 핵심 구현:
  - 포스트 로더: `lib/blog/posts.ts`
  - 마크다운 처리: `lib/blog/markdown.ts`, `lib/blog/markdown-processor.tsx`
  - UI: `components/blog/*`
- 현재 저장소에 존재하는 카테고리 디렉토리:
  - `ai-image-creator`
  - `consumer`
  - `development`
  - `investment`
  - `lotto`
  - `parking`
- 새 카테고리를 추가하면 `lib/blog/posts.ts`의 카테고리 이름 매핑도 같이 갱신해야 합니다.

### Tools
- 모든 공개 도구의 소스 오브 트루스는 `lib/tools/tool-config.ts`
- 현재 등록된 주요 도구 ID:
  - `loan-calculator`
  - `dsr-calculator`
  - `savings-calculator`
  - `lotto`
  - `last-digit-game`
  - `pomodoro`
  - `home-buying-funds-calculator`
- 도구 페이지는 `app/tools/<tool-id>/page.tsx`
- 도구 UI는 주로 `components/tools/**`에 있고, 로또는 `components/lotto/**`를 사용합니다.
- 도구 계산/정책 로직은 주로 `lib/tools/**`에 있고, 로또는 `lib/lotto/**`를 사용합니다.
- 내부용 OG 제작 화면도 존재:
  - 페이지: `/tools/og-image-studio`
  - API: `/api/og/custom`

### SEO / Analytics / Metadata
- 공통 SEO 유틸: `lib/seo/*`
- 도구 전용 구조화 데이터/메타데이터: `lib/tools/tool-structured-data.ts`, `lib/tools/tool-metadata.ts`
- 동적 사이트맵: `app/(meta)/sitemap.ts`
- 동적 robots.txt: `app/robots.ts`
- RSS 생성: `app/rss.xml/route.ts`
- GA4 방문자 통계:
  - 서버 로직: `lib/analytics/ga4.ts`
  - API: `app/api/analytics/visitors/route.ts`
- 전역 메타데이터, GA, AdSense, 네비게이션, Provider 연결은 `app/layout.tsx`에서 관리합니다.

## Active Rebrand Context

현재 저장소는 생활/금융 중심 구조를 운영 중이지만, **육아형 리브랜딩 Phase A**를 병행 설계하고 있습니다.

### Rebrand Direction
- 핵심 독자: 수도권 1~7세 자녀 부모
- 핵심 과업: 아이와 갈 곳 찾기
- 홈 구조: 검색 + 큐레이션 혼합형
- 우선순위: `아이와 가볼 곳 → 도구 → 혜택·지원금`
- 콘텐츠 단위: SEO 글 + 표준 카드 혼합형
- 론칭 범위: 서울 / 경기 북부 / 경기 남부 / 인천

### Rebrand Guardrails
- 기존 작업물, 기존 도구, 기존 포스트는 **즉시 삭제하지 않습니다**.
- 리브랜딩은 `교체`보다 `추가/재구성` 우선으로 진행합니다.
- 기존 상세 블로그 라우트(`/blog/[category]/[slug]`)는 최대한 유지합니다.
- 새 허브 라우트가 필요하면 `/places`, `/benefits`처럼 독립 추가를 우선 검토합니다.

### Rebrand Source Docs
- 기준 스펙: `docs/superpowers/specs/2026-04-06-parenting-guide-rebrand-design.md`
- 공통 설계 문서: `docs/superpowers/specs/parenting-guide-rebrand/*`
- 메뉴 계획 문서: `docs/superpowers/plans/parenting-guide-rebrand/*`
- 실행 계획 문서: `docs/superpowers/plans/parenting-guide-rebrand/execution/*`

## General Instructions

- Make sure to think step-by-step when answering
- Do not fabricate information. If beyond knowledge, reply: "This information exceeds my knowledge."
- Provide evidence and assess reliability. If uncertain, say: "This may not be accurate."
- End with a brief conclusion
- 한국어로 답변해줘 (Answer in Korean)

## Build, Test, and Maintenance Commands

### Development
```bash
pnpm dev
pnpm build
pnpm start
```

### Quality
```bash
pnpm lint:check
pnpm lint:fix
pnpm type-check
pnpm format
pnpm format:check
```

### Testing
```bash
pnpm test:e2e
node --test lib/tools/pomodoro/engine.test.mjs
node --test lib/seo/og.test.mjs
```

### Maintenance
```bash
pnpm update-lotto
```

### Notes
- `pnpm lint`는 raw ESLint 엔트리포인트입니다. 보통은 `pnpm lint:check` 또는 `pnpm lint:fix`를 우선 사용합니다.
- Playwright는 `playwright.config.ts` 기준으로 `127.0.0.1:3000`에 개발 서버를 띄워 테스트합니다.
- 로또 데이터 갱신 스크립트는 `lib/lotto/lotto_draws.json`을 업데이트합니다.

## Requirements

- Node.js `>= 22.0.0` (`.nvmrc` 기준)
- pnpm

## Project Structure

```text
utility-hub/
├── app/                         # Next.js App Router
│   ├── (meta)/                  # sitemap 등 메타 라우트
│   ├── api/                     # posts, og, analytics API
│   ├── blog/                    # 블로그 목록/카테고리/상세
│   ├── tools/                   # 각 도구 페이지
│   ├── about/                   # 소개 페이지
│   ├── faq/                     # FAQ 페이지
│   ├── rss.xml/                 # RSS route
│   ├── layout.tsx               # 전역 메타데이터/스크립트/Provider
│   └── providers.tsx            # React Query Provider
├── components/
│   ├── blog/                    # 블로그 UI
│   ├── layout/                  # 상단/하단 네비게이션
│   ├── lotto/                   # 로또 전용 UI
│   ├── seo/                     # JSON-LD, breadcrumb 등
│   ├── tools/                   # 도구 UI
│   └── ui/                      # 공통 UI 컴포넌트
├── content/posts/               # 블로그 마크다운 원본
├── docs/                        # 설계/운영/초안 문서
├── lib/
│   ├── analytics/               # GA4 서버 로직
│   ├── blog/                    # 포스트 로드/마크다운 처리
│   ├── home/                    # 홈 대시보드 콘텐츠
│   ├── lotto/                   # 로또 알고리즘/데이터
│   ├── seo/                     # 공통 SEO/OG/robots/sitemap
│   └── tools/                   # 도구별 계산 및 SEO 로직
├── public/
│   ├── asset/                   # favicon, manifest 등
│   ├── fonts/
│   ├── images/
│   └── og-images/
├── scripts/                     # 유지보수 스크립트
├── tests/                       # Playwright E2E
├── types/                       # 공통 타입
├── .agents/                     # 프로젝트 전용 에이전트 스킬
├── .ai/                         # AI/MCP 설정
└── rules/changelog.md           # 변경 이력
```

## Source of Truth Files

- `lib/tools/tool-config.ts`
  - 공개 도구 목록, 메타데이터, FAQ, 구조화 데이터 입력값의 기준 파일
- `lib/blog/posts.ts`
  - 블로그 포스트 로딩, 카테고리 추출, 태그/카테고리 집계의 기준 파일
- `app/layout.tsx`
  - 전역 메타데이터, 광고/분석 스크립트, 네비게이션, `NuqsAdapter` 연결 지점
- `app/providers.tsx`
  - React Query 기본 캐시 정책
- `components/layout/nav-config.ts`
  - 상단/하단 공통 네비게이션 항목
- `playwright.config.ts`
  - E2E 실행 방식과 개발 서버 부트 규칙
- `next.config.ts`
  - 이미지 최적화, 보안 헤더, 번들 분석, dev origin 정책

## Development Guidelines

### Rebrand Work
- 리브랜딩 작업 전에는 반드시 위 `Rebrand Source Docs`를 먼저 확인합니다.
- 메뉴/허브 작업은 공통 스펙이 아니라 **메뉴별 계획 문서 + execution 문서**를 기준으로 진행합니다.
- 기존 금융/생활비 자산은 숨기거나 재분류할 수는 있어도, 사용자 요청 없이 삭제하지 않습니다.
- 리브랜딩 중 새 카테고리나 허브를 추가할 때는 기존 정보 구조와 충돌 여부를 먼저 확인합니다.
- 홈, 블로그, 도구, 소개 페이지를 바꿀 때는 카피와 메타데이터에서 기존 포지셔닝이 남아 있지 않은지 같이 확인합니다.

### Tool Work
- 새 도구를 추가할 때는 최소한 아래를 함께 맞춥니다:
  - `lib/tools/tool-config.ts`
  - `app/tools/<tool-id>/page.tsx`
  - 관련 UI 디렉토리 (`components/tools/*` 또는 도메인 전용 디렉토리)
  - 관련 계산/도메인 로직 디렉토리 (`lib/tools/*` 또는 도메인 전용 디렉토리)
- 도구 메타데이터와 구조화 데이터는 블로그 SEO 로직이 아니라 `lib/tools/*` 체계 안에서 유지합니다.
- URL 공유가 필요한 계산기는 nuqs를 우선 고려합니다.

### Blog Work
- 새 포스트는 `content/posts/<category>/` 아래에 추가합니다.
- 포스트 이미지는 보통 `public/images/blog/<slug-or-topic>/` 아래에 둡니다.
- 새 카테고리 도입 시 아래를 확인합니다:
  - `lib/blog/posts.ts` 카테고리 이름 매핑
  - 카테고리 필터/목록 화면 표시
  - 사이트맵/내부 링크 노출

### SEO / OG Work
- 공통 SEO는 `lib/seo/*`, 도구 SEO는 `lib/tools/*`에서 관리합니다.
- OG 관련 변경은 아래 세 군데를 함께 확인합니다:
  - `lib/seo/og.ts`
  - `lib/seo/og-renderer.tsx`
  - `app/api/og/custom/route.ts`
- `robots.ts`, `sitemap.ts`, RSS는 서로 분리된 진입점이므로 한 곳만 수정하고 끝내지 않습니다.

### Testing Guidance
- 순수 계산 로직은 가능한 한 파일 근처의 `*.test.mjs`로 검증합니다.
- UI 흐름 검증은 `tests/*.spec.ts` Playwright 테스트를 사용합니다.
- 포모도로, 로또 추천, URL state, 도구 입력 폼처럼 상호작용이 많은 기능은 E2E 검증 우선순위가 높습니다.

### Analytics Guidance
- GA4 통계 로직을 건드릴 때는 다음 환경 변수를 함께 확인합니다:
  - `GA4_PROPERTY_ID`
  - `GA4_CLIENT_EMAIL`
  - `GA4_PRIVATE_KEY`
  - `GA4_BASELINE_DATE` (optional)
  - `GA4_TIMEZONE` (optional)
- `lib/analytics/ga4.ts`는 fresh cache와 stale fallback을 함께 사용하므로, 단순 fetch 함수처럼 취급하면 안 됩니다.

## Useful Docs In This Repo

- `docs/superpowers/specs/2026-04-06-parenting-guide-rebrand-design.md`
- `docs/superpowers/specs/parenting-guide-rebrand/README.md`
- `docs/superpowers/plans/parenting-guide-rebrand/README.md`
- `docs/superpowers/plans/parenting-guide-rebrand/execution/README.md`
- `docs/app-page/create-tools-page.md`
- `docs/app-page/blog-page-structure.md`
- `docs/breadcrumb-and-content-maintenance-guide.md`
- `docs/tools/lotto/algorithms/data-analysis-spec.md`
- `docs/tools/lotto/algorithms/ai-statistical-algorithm.md`
- `docs/plans/2026-03-25-home-buying-funds-calculator-implementation-plan.md`
- `rules/changelog.md`

## Before Committing

1. `pnpm format:check`
2. `pnpm type-check`
3. `pnpm lint:check`
4. 필요한 경우 관련 `node --test ...` 실행
5. UI/상호작용 변경 시 `pnpm test:e2e`
6. 배포 영향이 있는 변경이면 `pnpm build`

## Brief Conclusion

이 저장소는 단순 블로그가 아니라, **블로그 + 다중 계산기/도구 + SEO/OG/분석 인프라**가 함께 있는 App Router 프로젝트입니다.  
현재는 여기에 **육아형 리브랜딩 문서 체계**가 추가된 상태이므로, 작업할 때는 `lib/tools/tool-config.ts`, `lib/blog/posts.ts`, `app/layout.tsx`와 함께 `docs/superpowers/specs/parenting-guide-rebrand/*`를 같이 기준점으로 보는 것이 가장 안전합니다.

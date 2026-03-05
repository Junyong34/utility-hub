# Blog & Tools 신규 포스트/툴 등록 가이드 (Breadcrumb·SEO·구조 연동)

작성일: 2026-03-05

이 문서는 블로그 포스트와 도구(Tools) 신규 항목 추가 시 `Breadcrumb`, 구조화 데이터, SEO 반영을 안정적으로 유지하기 위한 운영 가이드입니다.
근거 소스:
- blog 포스트 처리: `lib/blog/posts.ts`, `lib/blog/breadcrumb.ts`, `app/blog/page.tsx`, `app/blog/[category]/page.tsx`, `app/blog/[category]/[slug]/page.tsx`, `components/blog/BlogPostHeader.tsx`
- tools 처리: `lib/tools/tool-config.ts`, `lib/tools/tool-breadcrumb.ts`, `lib/tools/tool-structured-data.ts`, `app/tools/page.tsx`, `app/tools/lotto/page.tsx`, `app/tools/lotto/stats/page.tsx`, `app/tools/loan-calculator/page.tsx`, `lib/seo/sitemap.ts`

## 1. 공통 원칙

- 렌더링 컴포넌트는 공통: `components/seo/Breadcrumb.tsx`
- 홈 아이콘은 `Breadcrumb` 컴포넌트 내부에서 항상 표시됨 (`/`)
- 브레드크럼 배열은 각 도메인 유틸에서 생성:
  - blog: `lib/blog/breadcrumb.ts`
  - tools: `lib/tools/tool-breadcrumb.ts`
- 신규 항목 추가 시 UI만 바꾸지 말고, `breadcrumb`/메타데이터/사이트맵 관점도 함께 점검해야 함

## 2. Blog 신규 포스트 생성 가이드 (SSG 기반)

### 2.1 파일 위치 규칙
- 기본 위치: `content/posts/<categorySlug>/<slug>.md`
- 현재 카테고리 폴더 예시: `development`, `ai-image-creator`, `parking`
- 예: `content/posts/development/my-new-post.md`

### 2.2 Frontmatter 규칙
다음 항목을 권장(필수로 관리):
- `title` (문자열)
- `date` (`YYYY-MM-DD` 권장)
- `author`
- `excerpt`
- `tags` (배열)
- `category`
- `categorySlug`
- `ogImage` (옵션)

> `lib/blog/posts.ts`에서 `category`/`categorySlug`는 frontmatter 우선, 없으면 경로 기반 추출로 보완됨.
> **운영 안정성 측면에서 누락보다 명시를 권장**.

### 2.3 Breadcrumb 연동 규칙
- 블로그 메인: `getBlogMainBreadcrumbItems()` → `[{ name: '블로그' }]`
- 카테고리 페이지: `getBlogCategoryBreadcrumbItems(categoryName)` → `홈/블로그/category`
- 상세 페이지: `BlogPostHeader`의 `BlogBreadcrumb(categoryName, categorySlug)` 사용 → `홈/블로그/category`
- 포스트 상세는 현재 구현상 마지막 노드가 카테고리이며 게시글 제목은 Breadcrumb에 표시되지 않음(설계 의도 확인 필요)

### 2.4 등록 체크리스트
- `slug` 파일명과 내부 `categorySlug` 정합성 확인
- `generateMetadata`에서 404 반환 조건이 없는지 확인 (카테고리 존재 여부)
- `app/blog/[category]/page.tsx` `generateStaticParams`는 `getAllCategories()` 기반이므로 카테고리 추가 시 경로 생성 영향 확인
- 내부 링크 `/blog/{category}/{slug}` 정합성 확인

## 3. Tools 신규 도구 생성 가이드

### 3.1 config 등록(필수)
`lib/tools/tool-config.ts`의 `TOOL_CONFIGS`에 다음 키 구조로 추가:
- 필수: `id`, `name`, `description`, `keywords`, `category`
- 강력 권장: `breadcrumbLabel`, `shortName`, `faq`, `howTo`, `ogImage`, `icon`
- `id`는 URL 경로와 1:1 (`/tools/<id>`)이므로 변경 금지(SEO/링크 레거시 주의)

### 3.2 페이지 등록(필수)
- 새 툴은 개별 페이지가 있어야 함: `app/tools/<id>/page.tsx`
- 권장 패턴:
  - `generateToolMetadata('<id>')` 사용
  - `getToolStructuredDataArray('<id>')` 사용
  - 헤더에 `getToolBreadcrumbItems('<id>')` 사용
  - 툴 전환이 필요한 경우 `ToolSwitcher currentToolId="<id>"` 사용
- `tools` 하위 서브페이지(예: `/tools/lotto/stats`)는 별도 라우트가 필요
  - 브레드크럼: `getToolBreadcrumbItems(id, [{ name: '...' }])`
  - 구조화 데이터: `getToolSubPageStructuredDataArray({ ... breadcrumbs: getToolStructuredDataBreadcrumbs(...) })`

### 3.3 자동 반영 범위
- `lib/tools` 중앙 설정이 바뀌면 다음 항목이 자동 반영됨:
  - `/tools` 메인 목록 노출
  - 툴 메타데이터/상태 일부 자동 생성
  - 사이트맵 자동 등록: `lib/seo/sitemap.ts`의 `getToolPages()`

### 3.4 Breadcrumb 영향
- 메인 툴 페이지: `홈 / 도구 / {툴명}`
- 서브페이지 예시: `홈 / 도구 / {툴명} / {서브명}`

## 4. 신규 항목 공통 점검표 (반드시 확인)
- Breadcrumb 노출: 마지막 항목이 링크/텍스트 규칙에 맞는지
- 구조화 데이터: `JsonLdMultiple`에 `Blog`/`Tools` 타입 배열이 빠지지 않는지
- canonical URL: 중복/오타 없는지
- sitemap 반영:
  - blog: 새 포스트 파일 즉시 반영(빌드 시)
  - tools: id 등록 시 자동 반영
- 레이아웃/스타일 깨짐 여부

## 5. 테스트 시나리오

### 5.1 Blog
- 시나리오: `content/posts/new-category/test-post.md` + frontmatter 완료 후 빌드
- 기대 결과:
  - `/blog/new-category/test-post` 접근 성공
  - 카테고리 페이지 breadcrumb: `홈/블로그/새 카테고리`
  - 상세 페이지 breadcrumb: `홈/블로그/새 카테고리`
  - `generateMetadata`가 올바른 OG/title을 반환

### 5.2 Tools
- 시나리오: `tool-config`에 새 id 추가 + `app/tools/<id>/page.tsx` 생성
- 기대 결과:
  - `/tools`에서 새 카드 표시
  - `/tools/<id>` 접근 성공
  - breadcrumb: `홈/도구/{툴명}` 정상 출력
  - sitemap에 `/tools/<id>` 노출

### 5.3 서브페이지(선택)
- 시나리오: tools 하위 서브라우트 추가
- 기대 결과:
  - `getToolBreadcrumbItems(id, [{ name: '서브명' }])` 사용 시 `홈/도구/{툴명}/{서브명}` 출력
  - `getToolStructuredDataBreadcrumbs(id, ..., ...)`로 JSON-LD와 UI breadcrumb 텍스트 일관성 확인

## 6. 공개 인터페이스/타입 변경(이번 계획 기준)
- 코드 변경 없음(문서화만 수행)
- 기존 타입/함수 변경 없음

## 7. 운영 가정(확정)
- tools는 현재 정적 라우트(`/tools/<id>`) 방식 유지
- blog는 `content/posts/<categorySlug>` 구조 유지
- icon은 `lucide-react` 문자열 기반 동적 로딩(`lib/tools/tool-icons.ts`) 유지

## 8. 리스크/주의점
- tools: `id` 변경 시 canonical/링크/사이트맵 대규모 영향
- blog: frontmatter `categorySlug` 오타 시 URL/카테고리 매핑 불일치 가능
- blog 상세 페이지는 현재 breadcrumb에 post title이 노출되지 않음(요구사항 변경 시 공통 반영 필요)

## 9. 문서 관리 규칙
- 신규 항목 등록 PR에는 아래 파일을 함께 검토:
  - `content/posts/**`, `lib/blog/posts.ts`(새 카테고리 시), `lib/tools/tool-config.ts`, 대상 `app/tools/**`, `app/blog/**`
- 리뷰 체크 항목: breadcrumb, canonical, OG, JSON-LD, sitemap

## 테스트/검증 시나리오(요약)
- 신규 블로그 포스트 1개 + 신규 tools 1개 생성 워크플로우 Dry-run
- `/blog`, `/blog/{category}`, `/blog/{category}/{slug}` 그리고 `/tools`, `/tools/{id}` 경로로 UI 검증
- JSON-LD 기본 항목(Article/WebPage/Breadcrumb, SoftwareApplication/WebPage/Breadcrumb) 누락 확인

## 결정 완료(의사결정 불필요 항목)
- 문서 위치: `docs/breadcrumb-and-content-maintenance-guide.md`
- 문서 대상: 신규 blog 포스트, 신규 tools 등록 및 tools 하위 서브페이지
- 실행 방식: 문서 추가(코드 변경 없음)

## 신뢰도/근거
- 근거는 코드 리딩 기반(파일명/함수 호출 구조 확인)으로 작성됨.
- 불확실성: 현재 tools 하위/태그 페이지 규칙은 향후 확장 계획 수준(현재 코드가 아닌 요구 기반)일 수 있어 기능 확장 시 문서 수정 필요.

# Blog 도메인 구조 명세서

작성일: 2026-03-10

이 문서는 `app/blog` 관련 구현을 AI가 안전하게 수정하기 위한 구조화된 작업 명세서다.  
목적은 화면 소개가 아니라 다음을 빠르게 판단하게 하는 것이다.

- 어디가 블로그 도메인의 소스 오브 트루스인지
- 어떤 파일이 실제 런타임 경로를 결정하는지
- 어떤 변경이 SEO, 크롤러, 홈 대시보드, API 응답까지 전파되는지
- 현재 구현에 남아 있는 위험 요소가 무엇인지

## 1. 목적과 범위

### 목적

- 블로그 도메인의 런타임 구조를 설명한다.
- 블로그 관련 변경 시 함께 점검해야 하는 연쇄 수정 포인트를 고정한다.
- “수정 가능한 영역”과 “현재 구현상 주의해야 하는 영역”을 분리한다.

### 포함 범위

- 라우트
  - `app/blog/page.tsx`
  - `app/blog/[category]/page.tsx`
  - `app/blog/[category]/[slug]/page.tsx`
  - `app/api/posts/route.ts`
- 도메인 로직
  - `lib/blog/posts.ts`
  - `lib/blog/types.ts`
  - `lib/blog/markdown-processor.tsx`
  - `lib/blog/breadcrumb.ts`
- UI 컴포넌트
  - `components/blog/*`
  - `components/seo/Breadcrumb.tsx`
  - `components/seo/JsonLd.tsx`
  - `components/ui/bottom-sheet.tsx`
  - `components/ui/shared-select-switcher.tsx`
- SEO 및 외부 소비처
  - `lib/seo/metadata.ts`
  - `lib/seo/structured-data.ts`
  - `lib/seo/sitemap.ts`
  - `app/(meta)/sitemap.ts`
  - `app/rss.xml/route.ts`
  - `lib/home/dashboard-content.ts`

### 비포함 범위

- 블로그 글쓰기 스타일 가이드
- 마케팅 카피 개선
- 상세 UI 픽셀 단위 디자인 설명
- Tools 도메인 구조

## 2. 라우트 맵과 책임

| 경로 | 구현 파일 | 렌더링 성격 | 핵심 책임 |
| --- | --- | --- | --- |
| `/blog` | `app/blog/page.tsx` | 서버 컴포넌트 + 클라이언트 하이드레이션 | 전체 포스트 목록, 카테고리 목록, Hero, 초기 JSON-LD, 무한스크롤 시작점 |
| `/blog/[category]` | `app/blog/[category]/page.tsx` | SSG + 클라이언트 하이드레이션 | 특정 카테고리 목록, 카테고리 메타데이터, breadcrumb |
| `/blog/[category]/[slug]` | `app/blog/[category]/[slug]/page.tsx` | SSG 중심 | 상세 포스트 렌더링, markdown 처리, TOC, Article JSON-LD |
| `/api/posts` | `app/api/posts/route.ts` | 서버 API | 목록 페이지용 페이지네이션, 카테고리 필터, 검색 필터 |
| `/sitemap.xml` | `app/(meta)/sitemap.ts` | 서버 메타 라우트 | 블로그 목록/카테고리/상세 URL을 sitemap으로 노출 |
| `/rss.xml` | `app/rss.xml/route.ts` | 서버 라우트 | 블로그 피드 XML 생성 |

### 라우트 간 호출 관계

1. `/blog`와 `/blog/[category]`는 서버에서 `getAllPosts()` 또는 `getPostsByCategory()`로 초기 데이터 스냅샷을 만든다.
2. 초기 목록 UI는 클라이언트 컴포넌트 `BlogContent`로 전달된다.
3. `BlogContent`는 클라이언트에서 `/api/posts`를 호출해 추가 페이지를 가져온다.
4. 상세 페이지는 `/api/posts`를 거치지 않고 서버에서 직접 `getPostBySlug()`를 호출한다.
5. sitemap, RSS, 홈 대시보드는 모두 `lib/blog/posts.ts`를 직접 소비한다.

### 핵심 판단

- 블로그 도메인의 실제 데이터 소스는 API가 아니라 파일 시스템 기반 markdown이다.
- `/api/posts`는 별도 저장소가 아니라 `getAllPosts()` 결과를 HTTP로 다시 노출하는 thin wrapper다.

## 3. 디렉토리 및 컴포넌트 구조

### 런타임 기준 구조

```text
app/
  blog/
    page.tsx
    [category]/
      page.tsx
      [slug]/
        page.tsx
  api/
    posts/
      route.ts

components/
  blog/
    BlogContent.tsx
    BlogHeroSection.tsx
    CategoryFilter.tsx
    PostList.tsx
    PostCard.tsx
    BlogPostHeader.tsx
    BlogSwitcher.tsx
    PostContent.tsx
    TableOfContents.tsx
    CopyButton.tsx
  seo/
    Breadcrumb.tsx
    JsonLd.tsx
  ui/
    bottom-sheet.tsx
    shared-select-switcher.tsx

lib/
  blog/
    posts.ts
    types.ts
    markdown-processor.tsx
    breadcrumb.ts
  seo/
    metadata.ts
    structured-data.ts
    sitemap.ts

content/
  posts/
    <categorySlug>/
      <slug>.md
```

### 책임 분리

| 영역 | 파일 | 책임 |
| --- | --- | --- |
| 파일 파싱/조회 | `lib/blog/posts.ts` | markdown 탐색, frontmatter 파싱, 카테고리 추론, 정렬, 상세 조회 |
| 타입 계약 | `lib/blog/types.ts` | 블로그 도메인 데이터 shape 정의 |
| 목록 인터랙션 | `components/blog/BlogContent.tsx` | 카테고리 선택, 검색어 입력, React Query 무한스크롤 |
| 목록 UI 단위 | `CategoryFilter`, `PostList`, `PostCard`, `BlogHeroSection` | 필터 탭, 그리드 렌더링, 카드 링크, Hero 검색 |
| 상세 헤더/내비게이션 | `BlogPostHeader.tsx`, `BlogSwitcher.tsx` | breadcrumb, 목록 복귀, 같은 카테고리 내 포스트 전환 |
| 상세 본문 | `PostContent.tsx` | 날짜/저자/태그/OG 이미지/markdown 결과 렌더링 |
| markdown 변환 | `lib/blog/markdown-processor.tsx` | unified 파이프라인, 코드 하이라이트, heading id, TOC 추출 |
| 상세 보조 인터랙션 | `TableOfContents.tsx`, `CopyButton.tsx` | TOC active state, 모바일 바텀시트, 코드 복사 |
| SEO 공통 | `lib/seo/*`, `components/seo/*` | metadata, JSON-LD, breadcrumb, sitemap |

### 수정 우선순위 원칙

- 레이아웃을 바꾸더라도 URL/데이터 계약은 먼저 `lib/blog/posts.ts`와 라우트 파일 기준으로 확인한다.
- 목록 UI만 수정할 때도 `BlogContent`와 `/api/posts` 계약이 깨지지 않는지 확인한다.
- 상세 markdown 렌더링을 수정할 때는 `lib/blog/markdown-processor.tsx`와 `app/globals.css`를 함께 봐야 한다.

## 4. 데이터 모델과 저장 방식

### 저장소

- 영속 저장소는 데이터베이스가 아니다.
- 블로그 원본은 `content/posts/<categorySlug>/<slug>.md`에 저장된다.
- 카테고리 구조는 디렉토리 기반이며 frontmatter가 이를 보완하거나 덮어쓴다.

### frontmatter 계약

현재 코드가 사실상 기대하는 필드:

| 필드 | 용도 | 비고 |
| --- | --- | --- |
| `title` | 목록/상세 제목 | 필수 취급 |
| `date` | 정렬, metadata, RSS | 날짜 내림차순 정렬 기준 |
| `author` | 상세/metadata/RSS | 필수 취급 |
| `excerpt` | 목록 요약, metadata, JSON-LD | 필수 취급 |
| `tags` | 목록 검색, 상세 태그, metadata | 없으면 `[]` |
| `category` | 카테고리 한글 이름 | 없으면 경로 기반 추론 |
| `categorySlug` | URL 경로용 slug | 없으면 경로 기반 추론 |
| `ogImage` | 카드/상세 이미지, metadata | 옵션 |
| `homeFeatured` | 홈 대시보드용 메타 | 옵션 |

### 타입 계약

`lib/blog/types.ts` 기준 공개 계약:

| 타입 | 의미 |
| --- | --- |
| `BlogPostMetadata` | frontmatter 기반 공통 메타 |
| `BlogPostSummary` | 목록용 데이터, `slug` 포함 |
| `BlogPost` | 상세용 데이터, `content` 포함 |
| `BlogCategory` | `{ name, slug, count }` |
| `BlogPostOption` | 상세 페이지 셀렉트 박스 옵션 |
| `BlogTocItem` | TOC 항목 `{ id, text, level }` |
| `PostsPageResponse` | `/api/posts` 응답 계약 |

### 데이터 생성 규칙

- `getAllMarkdownFiles()`가 `content/posts`를 재귀 탐색한다.
- `gray-matter`로 frontmatter와 본문을 분리한다.
- `extractCategoryFromPath()`가 디렉토리명을 카테고리 slug로 읽는다.
- `CATEGORY_NAMES` 맵이 있을 경우 slug를 한글 카테고리명으로 바꾼다.
- frontmatter의 `category`, `categorySlug`가 있으면 경로 추론값보다 우선한다.
- `getAllPosts()`는 날짜 내림차순으로 정렬한다.

### 저장/조회 관련 핵심 사실

- 블로그는 DB cache, ORM, 외부 CMS를 사용하지 않는다.
- 검색과 페이지네이션은 서버 메모리에서 `getAllPosts()` 결과를 필터링하는 방식이다.
- 새 포스트 추가는 markdown 파일 생성만으로 반영 대상이 된다.

## 5. 상태 관리, 데이터 흐름, 사용 라이브러리

### 상태 관리 개요

| 상태 종류 | 위치 | 설명 |
| --- | --- | --- |
| 서버 원본 데이터 | `lib/blog/posts.ts` | markdown 파일에서 생성된 정렬된 posts/categories |
| 클라이언트 목록 UI 상태 | `components/blog/BlogContent.tsx` | `selectedCategory`, `searchInput`, `searchQuery` |
| 클라이언트 서버 상태 캐시 | React Query | `/api/posts` 결과 캐시 및 무한스크롤 페이지 |
| 상세 페이지 UI 상태 | `TableOfContents`, `CopyButton`, `BlogSwitcher` | TOC 활성 항목, 바텀시트 open, 복사 상태, 셀렉트 이동 |

### 목록 페이지 데이터 흐름

1. `app/blog/page.tsx`가 `getAllPosts()`와 `getAllCategories()`를 호출한다.
2. 서버에서 생성한 초기 목록과 카테고리 배열을 `BlogContent`에 전달한다.
3. `BlogContent`는 초기 목록을 `initialData`로 사용해 첫 화면을 즉시 렌더링한다.
4. 사용자가 카테고리를 선택하면 `selectedCategory`가 바뀌고 검색 상태는 초기화된다.
5. 사용자가 검색을 실행하면 `searchInput`이 `searchQuery`로 승격되고 카테고리 선택은 해제된다.
6. React Query `queryKey`는 `['posts', effectiveCategory, searchQuery]`를 사용한다.
7. `IntersectionObserver`가 sentinel 영역을 관찰하다가 교차 시 `fetchNextPage()`를 호출한다.
8. `/api/posts`는 `page`, `limit`, `category`, `search`를 읽어 필터링 후 `PostsPageResponse`를 반환한다.

### 카테고리 페이지 차이점

- `app/blog/[category]/page.tsx`는 `generateStaticParams()`로 카테고리 경로를 정적으로 만든다.
- `BlogContent`에 `fixedCategorySlug`를 넘겨 카테고리 탭을 숨기고 카테고리를 고정한다.
- 이 경우 클라이언트가 별도 카테고리 전환은 하지 못하고 검색만 수행한다.

### 상세 페이지 데이터 흐름

1. `generateStaticParams()`가 `getAllPostSlugs()` 결과로 정적 상세 경로를 만든다.
2. `generateMetadata()`는 `getPostBySlug(slug, category)`로 포스트를 조회한다.
3. 본문 렌더링은 `PostContent`가 담당하며 내부에서 `processMarkdown()`를 호출한다.
4. TOC 데이터는 페이지 레벨에서 `extractTableOfContents(post.content)`로 만든다.
5. `BlogPostHeader`는 `BlogSwitcher`를 포함하고 같은 카테고리 포스트 목록으로 이동을 제공한다.
6. 이전/다음 포스트는 `getAdjacentPosts()` 결과를 사용한다.

### 현재 사용 라이브러리

| 라이브러리 | 사용 위치 | 역할 |
| --- | --- | --- |
| `next` / App Router | `app/blog/*`, `app/api/posts/route.ts` | 라우트, metadata, SSG |
| `react` | 전반 | 서버/클라이언트 컴포넌트 |
| `@tanstack/react-query` | `app/providers.tsx`, `components/blog/BlogContent.tsx` | 클라이언트 서버 상태 캐시, 무한스크롤 |
| `gray-matter` | `lib/blog/posts.ts` | markdown frontmatter 파싱 |
| `unified` | `lib/blog/markdown-processor.tsx` | markdown 처리 파이프라인 |
| `remark-parse`, `remark-gfm`, `remark-rehype` | `lib/blog/markdown-processor.tsx` | markdown AST 변환 |
| `rehype-raw`, `rehype-pretty-code`, `rehype-react` | `lib/blog/markdown-processor.tsx` | HTML 허용, 코드 하이라이트, React 요소 변환 |
| `lucide-react` | Hero, header, TOC, copy 버튼 등 | 아이콘 |
| `tailwindcss` | 전역 및 컴포넌트 className | 스타일링 |

### 전역 제공자 관련 사실

- `app/providers.tsx`에서 React Query `QueryClientProvider`를 전역 제공한다.
- 기본 쿼리 정책은 `staleTime: 1분`, `gcTime: 5분`, `refetchOnWindowFocus: false`, `retry: 1`이다.
- `app/layout.tsx`에 `NuqsAdapter`가 있지만, 현재 블로그 도메인 구현은 `nuqs`를 직접 사용하지 않는다.

## 6. SEO 구조와 외부 소비처

### metadata 생성

| 대상 | 함수 | 파일 |
| --- | --- | --- |
| 블로그 메인 | `generateMetadata()` | `app/blog/page.tsx`에서 `lib/seo/metadata.ts`의 `generateMetadata` 사용 |
| 카테고리 목록 | `generateMetadata()` | `app/blog/[category]/page.tsx` |
| 상세 포스트 | `generateBlogPostMetadata()` | `app/blog/[category]/[slug]/page.tsx` |

### JSON-LD 생성

| 경로 | 스키마 |
| --- | --- |
| `/blog` | `WebPage` + `Breadcrumb` + `ItemList` |
| `/blog/[category]` | `WebPage` + `Breadcrumb` |
| `/blog/[category]/[slug]` | `Article` + `Breadcrumb` |

`JsonLdMultiple`는 실제 스크립트 출력 컴포넌트다.

### breadcrumb 구조

- 소스 오브 트루스: `lib/blog/breadcrumb.ts`
- 서버 목록/카테고리 breadcrumb는 `getBlogMainBreadcrumbItems()`, `getBlogCategoryBreadcrumbItems()`, `getBlogStructuredDataBreadcrumbs()`를 사용한다.
- 상세 헤더는 클라이언트 컴포넌트 제약 때문에 `components/seo/Breadcrumb.tsx` 내부 `BlogBreadcrumb`를 직접 사용한다.

### 크롤러/외부 소비처

| 소비처 | 의존 데이터 | 영향 |
| --- | --- | --- |
| sitemap | `getAllPosts()`, `getAllCategories()` | 블로그 URL 색인 |
| RSS | `getAllPosts()` | 외부 피드 URL, 발행일, 태그 |
| 홈 대시보드 | `getAllPosts()` | 홈 최신 글 / HOT 섹션 링크 |
| `/blog` noscript 링크 | `posts` | JS 미실행 크롤러용 모든 포스트 링크 |

### SEO 수정 시 기본 원칙

- URL 구조를 바꾸면 metadata, JSON-LD, sitemap, RSS, 홈 대시보드, 카드 링크를 함께 수정해야 한다.
- breadcrumb 라벨을 바꾸면 UI breadcrumb와 JSON-LD breadcrumb 모두 함께 검토해야 한다.
- `ogImage` 처리 방식을 바꾸면 카드, metadata, 상세 JSON-LD 반영 경로를 따로 확인해야 한다.

## 7. 공개 계약과 안전한 수정 규칙

### 공개 계약

- 라우트 계약: `/blog`, `/blog/{category}`, `/blog/{category}/{slug}`
- 저장 계약: `content/posts/<categorySlug>/<slug>.md`
- API 계약: `/api/posts?page=<n>&limit=<n>&category=<slug>&search=<text>`
- 타입 계약: `BlogPostSummary`, `BlogPost`, `BlogCategory`, `PostsPageResponse`

### 안전한 수정 규칙

#### URL 구조를 바꿀 때

반드시 함께 확인할 파일:

- `components/blog/PostCard.tsx`
- `components/blog/BlogSwitcher.tsx`
- `app/blog/page.tsx`
- `lib/seo/metadata.ts`
- `lib/seo/structured-data.ts`
- `lib/seo/sitemap.ts`
- `app/rss.xml/route.ts`
- `lib/home/dashboard-content.ts`

#### frontmatter 필드를 추가/변경할 때

반드시 함께 확인할 파일:

- `lib/blog/types.ts`
- `lib/blog/posts.ts`
- `app/blog/[category]/[slug]/page.tsx`
- `components/blog/PostCard.tsx`
- `components/blog/PostContent.tsx`
- `lib/seo/metadata.ts`
- `lib/seo/structured-data.ts`

#### 목록 인터랙션을 바꿀 때

반드시 함께 확인할 파일:

- `components/blog/BlogContent.tsx`
- `components/blog/CategoryFilter.tsx`
- `components/blog/BlogHeroSection.tsx`
- `app/api/posts/route.ts`
- `app/providers.tsx`

#### markdown 렌더링을 바꿀 때

반드시 함께 확인할 파일:

- `lib/blog/markdown-processor.tsx`
- `components/blog/PostContent.tsx`
- `components/blog/TableOfContents.tsx`
- `app/globals.css`

#### 카테고리 규칙을 바꿀 때

반드시 함께 확인할 파일:

- `lib/blog/posts.ts`
- `lib/blog/breadcrumb.ts`
- `app/blog/[category]/page.tsx`
- `app/blog/[category]/[slug]/page.tsx`
- `lib/seo/sitemap.ts`

## 8. Known Issues / 현재 리스크

### 8.1 구형 `/blog/{slug}` 경로가 일부 구현에 남아 있음

현재 코드상 아래 위치는 여전히 카테고리 없는 구형 URL을 사용한다.

- `app/blog/page.tsx`
  - `noscript` 내부 숨김 링크가 `/blog/${post.slug}`를 사용
- `lib/seo/structured-data.ts`
  - `createItemListSchema()`가 `/blog/${post.slug}`를 사용
- `app/rss.xml/route.ts`
  - RSS item 링크가 `/blog/${post.slug}`를 사용

영향:

- 현재 정상 라우트 계약과 불일치한다.
- `slug`가 카테고리 전역에서 유일하다는 가정이 다시 생긴다.
- SEO, 크롤러 링크, RSS 소비자에서 잘못된 URL을 볼 수 있다.

### 8.2 상세 JSON-LD에 포스트별 `ogImage`가 전달되지 않음

- `createBlogPostStructuredData()`는 `image` 입력을 받을 수 있다.
- 하지만 `app/blog/[category]/[slug]/page.tsx`에서 호출할 때 `post.ogImage`를 넘기지 않는다.
- 결과적으로 상세 페이지 `Article` JSON-LD는 사이트 기본 OG 이미지를 사용할 가능성이 높다.

### 8.3 `getAdjacentPosts()`는 카테고리 내부 인접 글을 보장하지 않음

- 현재 함수는 현재 포스트의 인덱스를 찾을 때만 `categorySlug`를 고려한다.
- `prevPost`, `nextPost`는 전체 `allPosts` 배열 기준 인접 항목을 반환한다.
- 따라서 UI 문맥상 “같은 카테고리의 이전/다음 글”처럼 보이더라도 실제로는 다른 카테고리 글로 넘어갈 수 있다.

### 8.4 `lib/blog/markdown.ts`는 현재 블로그 런타임 핵심 경로에서 사용되지 않음

- 검색 기준으로 `lib/blog/markdown.ts`를 import하는 런타임 코드는 현재 없다.
- 보조 유틸 또는 과거 구현 잔재로 보이며, 수정 시 핵심 경로로 오인하면 안 된다.
- 이 판단은 코드 검색 기반이며, 향후 import 추가 시 달라질 수 있다.

### 8.5 `CATEGORY_NAMES` 맵에 없는 새 카테고리는 frontmatter 누락 시 slug 그대로 노출됨

- `lib/blog/posts.ts`는 경로 기반 추론 시 `CATEGORY_NAMES` 맵을 사용한다.
- 새 카테고리를 추가하면서 frontmatter의 `category`를 빼먹고 맵도 갱신하지 않으면 UI에 slug가 그대로 보일 수 있다.

## 9. 수정 전후 검증 체크리스트

### 문서/구조 변경 전 확인

- 변경 대상이 URL 계약 변경인지, UI 변경인지, 데이터 계약 변경인지 먼저 분류한다.
- `lib/blog/posts.ts`를 기준으로 소스 오브 트루스를 다시 확인한다.
- 변경이 SEO 영향인지 여부를 먼저 판별한다.

### 코드 변경 후 최소 검증

권장 명령:

```bash
pnpm type-check
pnpm lint:check
pnpm build
```

권장 수동 점검:

- `/blog`
- `/blog/<category>`
- `/blog/<category>/<slug>`
- `/rss.xml`
- `/sitemap.xml`

확인 항목:

- 카드 링크가 실제 라우트와 일치하는지
- breadcrumb 텍스트와 URL이 일치하는지
- JSON-LD에 필요한 타입이 모두 남아 있는지
- 무한스크롤과 검색이 함께 동작하는지
- TOC anchor가 실제 heading id와 일치하는지

## 10. 근거 파일과 신뢰도

### 주요 근거 파일

- `app/blog/page.tsx`
- `app/blog/[category]/page.tsx`
- `app/blog/[category]/[slug]/page.tsx`
- `app/api/posts/route.ts`
- `lib/blog/posts.ts`
- `lib/blog/types.ts`
- `lib/blog/markdown-processor.tsx`
- `lib/blog/breadcrumb.ts`
- `lib/seo/metadata.ts`
- `lib/seo/structured-data.ts`
- `lib/seo/sitemap.ts`
- `app/rss.xml/route.ts`
- `lib/home/dashboard-content.ts`

### 신뢰도 평가

- 높음
  - 라우트 구조, 타입 계약, 데이터 흐름, 라이브러리 사용 여부는 실제 코드 기준이다.
- 중간
  - “의도”에 대한 해석은 제외했고, 현재 구현상 동작만 기록했다.
  - `getAdjacentPosts()` 동작이 의도된 설계인지, `/blog/{slug}` 잔존이 임시 호환인지 여부는 코드만으로 확정할 수 없다.

## 결론

블로그 도메인의 진짜 중심은 `app/blog`가 아니라 `content/posts`와 `lib/blog/posts.ts`다.  
목록, 상세, SEO, RSS, sitemap, 홈 대시보드는 모두 이 계층에 연결되어 있으므로, 블로그 수정은 화면 단위가 아니라 데이터 계약과 URL 계약 단위로 접근해야 안전하다.

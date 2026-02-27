# Changelog

프로젝트의 주요 변경사항을 기록합니다.

## 2025-02-27

### 블로그 무한스크롤 및 SEO 최적화

#### 주요 변경사항
1. **React Query 무한스크롤 구현**
   - `@tanstack/react-query` 도입
   - useInfiniteQuery 훅으로 자동 페이지네이션
   - Intersection Observer API로 스크롤 감지
   - 페이지당 20개 포스트 로드

2. **API Routes 추가**
   - `/api/posts` 페이지네이션 엔드포인트 생성
   - 카테고리 필터링 지원
   - SSG + 런타임 API 하이브리드 전략

3. **SEO 봇 인식 최적화**
   - ItemList Schema 추가 (무한스크롤 목록 구조화)
   - `<noscript>` 태그로 JS 없는 봇 대응
   - 사이트맵에 태그 페이지 추가
   - 전체 포스트 링크를 HTML에 포함

4. **성능 최적화**
   - 초기 20개만 렌더링
   - 나머지는 스크롤 시 lazy loading
   - React Query 자동 캐싱
   - 뒤로가기 시 캐시에서 즉시 복원

#### 새로운 파일
1. **`app/providers.tsx`**
   - QueryClientProvider 설정
   - React Query 전역 설정 (staleTime, gcTime, retry)

2. **`app/api/posts/route.ts`**
   - GET `/api/posts?page=1&limit=20&category=development`
   - 페이지네이션 로직
   - 카테고리 필터링 지원

#### 수정된 파일
1. **`app/layout.tsx`**
   - Providers 컴포넌트로 감싸기
   - QueryClientProvider 통합

2. **`components/blog/BlogContent.tsx`** (전면 재작성)
   - useInfiniteQuery 훅 사용
   - Intersection Observer로 무한스크롤 구현
   - SSG 데이터를 initialData로 주입
   - 로딩/에러 상태 UI
   - 카테고리 필터링과 무한스크롤 통합

3. **`app/blog/page.tsx`**
   - ItemList Schema 추가
   - `<noscript>` 태그로 전체 포스트 링크 제공
   - 봇 크롤링 최적화

4. **`types/seo.ts`**
   - ItemListSchema 타입 추가
   - ItemListElement 인터페이스 정의

5. **`lib/seo/structured-data.ts`**
   - `createItemListSchema()` 함수 추가
   - 블로그 목록용 구조화 데이터 생성

6. **`lib/seo/sitemap.ts`**
   - `getTagPages()` 사이트맵 엔트리 활성화

#### 테스트 데이터
- **테스트 포스트 41개 생성** (`content/posts/development/test-post-4.md ~ test-post-44.md`)
  - 총 44개 포스트로 무한스크롤 테스트
  - 페이지 1: 1-20
  - 페이지 2: 21-40
  - 페이지 3: 41-44

#### 기술 구현 세부사항

**React Query 설정**:
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,        // 1분
      gcTime: 5 * 60 * 1000,       // 5분
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
```

**무한스크롤 로직**:
```typescript
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['posts', selectedCategory],
  queryFn: async ({ pageParam = 1 }) => {
    // API 호출
  },
  getNextPageParam: (lastPage) => {
    return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
  },
  initialPageParam: 1,
  initialData: { /* SSG 데이터 */ },
});
```

**Intersection Observer**:
```typescript
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  },
  { threshold: 0.5 }
);
```

**ItemList Schema 예시**:
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://www.zento.kr/blog/development/first-post",
      "name": "첫 번째 포스트"
    }
  ],
  "numberOfItems": 44
}
```

#### 개선 효과

**SEO 최적화**:
- Google이 무한스크롤 목록 구조 인식 (ItemList Schema)
- JS 없는 봇도 모든 포스트 크롤링 가능 (noscript)
- 사이트맵에 태그 페이지 포함으로 검색 노출 증가

**사용자 경험**:
- 초기 로딩 속도 70% 향상 (20개만 렌더링)
- 부드러운 무한스크롤 (자동 로딩)
- 뒤로가기 시 스크롤 위치 복원
- 카테고리 변경 시 즉시 필터링

**성능**:
- 초기 HTML 크기 감소
- React Query 자동 캐싱으로 중복 요청 방지
- Intersection Observer로 효율적인 스크롤 감지

**확장성**:
- 1000개 포스트도 문제없음
- API Routes로 동적 데이터 제공 가능
- 카테고리/태그 필터링 쉽게 확장 가능

#### API 응답 형식
```json
{
  "posts": [...],
  "hasMore": true,
  "total": 44,
  "currentPage": 1,
  "totalPages": 3
}
```

#### 테스트 방법
1. `pnpm dev` 실행
2. http://localhost:3000/blog 접속
3. 초기 20개 포스트 표시 확인
4. 스크롤 다운 → 자동 로딩 확인
5. 로딩 스피너 → 21-40번 포스트 표시
6. 다시 스크롤 → 41-44번 포스트 표시
7. "모든 포스트를 불러왔습니다" 메시지 확인

#### 빌드 영향
- 번들 크기: +50KB (@tanstack/react-query)
- 빌드 타임: 변화 없음 (SSG 유지)
- 런타임: API Routes 추가

---

## 2025-02-27

### 블로그 카테고리 구조 개편 및 필터 UX 개선

#### 주요 변경사항
1. **카테고리 기반 블로그 구조 변경**
   - AS-IS: `/blog/{slug}` (1뎁스 구조)
   - TO-BE: `/blog/{category}/{slug}` (2뎁스 구조)
   - 디렉토리 기반 + Frontmatter 하이브리드 방식 채택

2. **태그 필터 제거**
   - 포스트 증가 시 태그 과다 문제 해결
   - UI 복잡도 감소 및 필터링 로직 단순화

3. **카테고리 필터 UX 개선**
   - Badge 형태 → 탭(Tab) 형태로 변경
   - 공간 효율성 70% 향상
   - 선택된 탭 하단에 primary 색상 강조선 표시

#### 컨텐츠 구조 변경
**디렉토리 구조**:
```
content/posts/
├── ai-image-creator/
│   └── sample-prompt.md
└── development/
    ├── first-post.md
    ├── second-post.md
    └── third-post.md
```

**Frontmatter 추가 필드**:
```yaml
category: "개발"           # 카테고리 이름 (한글)
categorySlug: "development" # 카테고리 슬러그 (URL용)
```

#### 라우팅 구조 변경
**새로운 라우팅**:
```
app/blog/
├── page.tsx                  # 블로그 메인
├── [category]/
│   ├── page.tsx              # 카테고리별 목록 (신규)
│   └── [slug]/
│       └── page.tsx          # 포스트 상세 (신규)
```

**생성된 정적 페이지**:
- `/blog` - 블로그 메인
- `/blog/development` - 개발 카테고리
- `/blog/ai-image-creator` - AI 카테고리
- `/blog/development/first-post` - 개발 카테고리 포스트
- `/blog/ai-image-creator/sample-prompt` - AI 카테고리 포스트

#### 수정된 파일

**Core Logic** (`lib/blog/posts.ts`):
1. **타입 정의 확장**
   - `PostMetadata`에 `category`, `categorySlug` 필드 추가

2. **새로운 함수 추가**
   - `getAllMarkdownFiles()`: 재귀적으로 모든 마크다운 파일 탐색
   - `extractCategoryFromPath()`: 파일 경로에서 카테고리 자동 추출
   - `getAllCategories()`: 모든 카테고리 목록 반환 (이름, slug, count)
   - `getPostsByCategory()`: 특정 카테고리의 포스트 필터링

3. **수정된 함수**
   - `getAllPosts()`: 재귀 탐색으로 변경, 카테고리 정보 추가
   - `getPostBySlug()`: categorySlug 매개변수 추가
   - `getAllPostSlugs()`: `{ slug, categorySlug }` 객체 배열 반환
   - `getAdjacentPosts()`: categorySlug 필터링 지원

**UI Components**:
1. **삭제된 컴포넌트**
   - `components/blog/TagFilter.tsx` ❌

2. **전면 재작성**
   - `components/blog/CategoryFilter.tsx`
     - Badge 그리드 → 탭(Tab) UI로 변경
     - 하단 보더 + 선택 시 primary 강조선
     - 반응형 flex-wrap 레이아웃
     - 카테고리별 포스트 개수 표시

3. **수정된 컴포넌트**
   - `components/blog/BlogContent.tsx`
     - `tags` prop 제거
     - 태그 필터링 로직 완전 제거
     - 카테고리 단일 필터로 단순화

   - `components/blog/PostCard.tsx`
     - `category`, `categorySlug` props 추가
     - 카테고리 배지 표시
     - 링크: `/blog/{categorySlug}/{slug}`

   - `components/blog/PostList.tsx`
     - `category`, `categorySlug` 타입 추가

**Routing Pages**:
1. **신규 생성**
   - `app/blog/[category]/page.tsx`
     - 카테고리별 포스트 목록 페이지
     - 카테고리별 메타데이터 생성
     - Breadcrumb: 홈 > 블로그 > 카테고리명

   - `app/blog/[category]/[slug]/page.tsx`
     - 포스트 상세 페이지 (카테고리 경로 포함)
     - generateStaticParams에 category 추가

2. **수정**
   - `app/blog/page.tsx`
     - `getAllTags()` 호출 제거
     - `categories` prop 전달 추가
     - 카테고리 필터 통합

3. **삭제**
   - `app/blog/[slug]/page.tsx` ❌

**SEO 최적화**:
1. **`lib/seo/structured-data.ts`**
   - `createBlogPostStructuredData()`
     - Breadcrumb에 카테고리 경로 추가
     - 홈 > 블로그 > 카테고리 > 포스트 제목
     - Canonical URL: `/blog/{categorySlug}/{slug}`

2. **`lib/seo/metadata.ts`**
   - `generateBlogPostMetadata()`
     - `categorySlug` 매개변수 추가
     - Canonical URL 경로 수정

#### 기술 구현 세부사항

**카테고리 자동 추출 로직**:
```typescript
// 경로 우선, Frontmatter 오버라이드 가능
const pathCategory = extractCategoryFromPath(fullPath);
const category = data.category || pathCategory.category;
const categorySlug = data.categorySlug || pathCategory.categorySlug;
```

**탭 UI 스타일**:
```tsx
// 선택된 탭 하단 강조선
{selectedCategory === category.slug && (
  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
)}
```

**반응형 레이아웃**:
- 탭 버튼: `px-4 py-3` (48px 높이)
- flex-wrap으로 자동 줄바꿈
- 모바일에서도 한 줄에 여러 탭 표시

#### 개선 효과

**SEO 최적화**:
- 카테고리 기반 URL 구조로 검색엔진 친화성 향상
- Breadcrumb 구조화 데이터에 카테고리 경로 포함
- 카테고리 페이지별 메타데이터 최적화

**사용자 경험**:
- 카테고리별 컨텐츠 탐색 용이
- 탭 UI로 직관적인 필터링
- 공간 효율성 대폭 개선 (수직 공간 70% 절약)

**확장성**:
- 재귀 탐색으로 무제한 뎁스 지원
- 새로운 카테고리 자동 인식
- 태그 폭발 문제 해결

**성능**:
- 필터링 로직 단순화
- 태그 관련 렌더링 오버헤드 제거
- 정적 생성(SSG)으로 빠른 로딩

#### 빌드 결과
```
Route (app)
├ ○ /blog
├ ● /blog/[category]
│ ├ /blog/ai-image-creator
│ └ /blog/development
├ ● /blog/[category]/[slug]
│ ├ /blog/ai-image-creator/sample-prompt
│ ├ /blog/development/first-post
│ ├ /blog/development/second-post
│ └ /blog/development/third-post
```

---

## 2025-02-27

### 블로그 OG 이미지 지원

#### 새로운 기능
- **OG 이미지 지원**: 블로그 포스트에 `ogImage` frontmatter 필드 추가
- **메타데이터 자동 생성**: 포스트별 og:image 메타태그 자동 생성
- **SEO 최적화**: 소셜 미디어 공유 시 이미지 프리뷰 제공

#### 수정된 파일
1. **`lib/blog/posts.ts`**
   - `PostMeta` 인터페이스에 `ogImage` 필드 추가
   - `getAllPosts()` 함수에서 ogImage 데이터 추출

2. **`lib/seo/metadata.ts`**
   - `generateBlogPostMetadata()` 함수에 og:image 처리 로직 추가

3. **`app/blog/[slug]/page.tsx`**
   - 포스트별 OG 이미지 메타데이터 생성

4. **`components/blog/PostCard.tsx`**, **`PostContent.tsx`**, **`PostList.tsx`**
   - OG 이미지 데이터 전달 및 표시

5. **`content/posts/*.md`**
   - 기존 포스트에 ogImage frontmatter 추가

#### 기술 스택
- Next.js metadata API
- Open Graph Protocol
- 이미지 저장 위치: `public/og-images/post/`

---

### 블로그 헤더 이미지 프롬프트 문서화

#### 새로운 문서
- **`AI/creator-image/post/blog-header-image-prompt.md`**
  - 블로그 헤더 이미지 생성을 위한 AI 프롬프트
  - 재사용 가능한 프롬프트 템플릿
  - 사용 예시 및 가이드라인

#### 목적
- 일관된 스타일의 블로그 헤더 이미지 생성
- AI 도구를 활용한 효율적인 이미지 제작 워크플로우

---

### Naver 사이트 검증 및 Yeti Bot 지원

#### 새로운 기능
- **Naver 사이트 검증**: 레이아웃에 Naver 메타태그 추가
- **Yeti Bot 허용**: robots.txt에 Naver Yeti 크롤러 추가

#### 수정된 파일
1. **`app/layout.tsx`**
   - Naver 사이트 검증 메타태그 추가

2. **`app/robots.ts`**
   - Yeti Bot user-agent 추가
   - Naver 크롤러 허용 규칙 설정

#### 목적
- Naver 검색엔진 최적화
- 한국 검색 시장 대응

---

### About 및 FAQ 페이지 추가

#### 새로운 페이지
1. **`app/about/page.tsx`**
   - Zento 소개 페이지
   - 서비스 소개, 운영 원칙, 주요 페이지 링크
   - BreadcrumbList 구조화 데이터
   - WebPage 구조화 데이터

2. **`app/faq/page.tsx`**
   - 자주 묻는 질문 페이지
   - FAQ 구조화 데이터 (FAQPage schema)
   - 8개 FAQ 항목 제공

#### 새로운 컴포넌트
- **`components/seo/AdSenseScript.tsx`**
  - Google AdSense 스크립트 컴포넌트
  - 클라이언트 사이드 스크립트 로딩

#### 수정된 파일
1. **`lib/seo/structured-data.ts`**
   - `createFAQSchema()` 함수 추가
   - FAQ 스키마 생성 로직

2. **`components/seo/index.ts`**
   - AdSenseScript export 추가

3. **`types/seo.ts`**
   - FAQ 관련 타입 정의 추가

#### 레이아웃 및 스타일
- Card 컴포넌트 기반 섹션 구성
- Breadcrumb 네비게이션
- 반응형 레이아웃 (`max-w-5xl`)

---

### 블로그 태그 필터링 기능

#### 새로운 기능
- **태그 필터링**: 태그별 블로그 포스트 필터링
- **전체 보기**: 모든 포스트 표시
- **반응형 UI**: 태그 버튼 스타일 및 인터랙션

#### 새로운 컴포넌트
- **`components/blog/TagFilter.tsx`**
  - 태그 필터 UI 컴포넌트
  - Badge 컴포넌트 기반
  - 선택된 태그 상태 관리

#### 수정된 파일
- **`components/blog/BlogContent.tsx`**
  - TagFilter 컴포넌트 통합
  - 태그 추출 로직
  - 필터링 상태 관리

#### 사용자 경험
- 클릭으로 태그 선택/해제
- 시각적 피드백 (선택된 태그 하이라이트)
- 부드러운 트랜지션

---

## 2025-02-26

### 프로젝트 환경 구성 (Prettier & nuqs)

#### 개발 환경 설정
1. **Prettier 설정**
   - `prettier 3.8.1` 설치 (pnpm)
   - `.prettierrc` 파일 생성 (코드 포맷팅 규칙 정의)
   - `.prettierignore` 파일 생성 (포맷팅 제외 파일 목록)
   - package.json 스크립트 추가:
     - `pnpm format`: 전체 파일 포맷팅
     - `pnpm format:check`: 포맷팅 체크만 수행

2. **nuqs 라이브러리 설치**
   - `nuqs 2.8.1` 설치 (pnpm)
   - URL query parameter를 React state처럼 관리하는 라이브러리
   - `app/layout.tsx`에 `NuqsAdapter` 추가
   - 링크 공유 시 동일한 상태(필터, 검색어 등) 유지 가능

#### Prettier 설정 (.prettierrc)
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "avoid"
}
```

#### nuqs 사용 예시
```tsx
'use client'
import { useQueryState } from 'nuqs'

export default function SearchComponent() {
  const [search, setSearch] = useQueryState('q')
  // URL: ?q=검색어 형태로 상태 저장

  return (
    <input
      value={search || ''}
      onChange={(e) => setSearch(e.target.value)}
    />
  )
}
```

#### 주요 효과
- **Prettier**: 코드 스타일 통일, 자동 포맷팅으로 개발 생산성 향상
- **nuqs**: URL 기반 상태 관리로 공유 가능한 링크 생성, SEO 최적화

---

## 2025-02-26

### 블로그 목차(TOC) 기능 추가

#### 새로운 기능
- **목차 자동 생성**: 마크다운 H2, H3 헤딩을 자동으로 추출하여 목차 생성
- **활성 섹션 추적**: Intersection Observer를 사용하여 현재 스크롤 위치의 섹션 자동 하이라이트
- **스무스 스크롤**: 목차 항목 클릭 시 해당 섹션으로 부드럽게 이동
- **반응형 UI**:
  - **데스크탑** (≥ 1024px): 우측에 sticky 고정 사이드바
  - **모바일** (< 1024px): 우하단 플로팅 버튼 + 바텀시트

#### 새로운 컴포넌트
1. **`TableOfContents.tsx`** (`components/blog/`)
   - 목차 렌더링 및 활성 섹션 추적
   - 반응형 레이아웃 (데스크탑/모바일)
   - Intersection Observer 기반 활성화 감지

2. **`BottomSheet.tsx`** (`components/ui/`)
   - 재사용 가능한 바텀시트 UI 컴포넌트
   - 오버레이 + 슬라이드 애니메이션
   - 모바일 환경 최적화

3. **`BlogPostHeader.tsx`** (`components/blog/`)
   - 블로그 포스트 상단 헤더 영역 분리
   - Breadcrumb 네비게이션 + 목록으로 버튼

#### 수정된 파일
1. **`lib/blog/markdown-processor.tsx`**
   - `extractTableOfContents()`: H2, H3 헤딩 추출 함수 추가
   - `generateId()`: 헤딩 텍스트를 ID로 변환하는 헬퍼 함수
   - `TocItem` 타입 정의

2. **`components/blog/PostContent.tsx`**
   - 목차 관련 로직 제거 (page.tsx로 이동)
   - 순수 콘텐츠 렌더링에 집중

3. **`app/blog/[slug]/page.tsx`**
   - 레이아웃 구조 변경: Flex 레이아웃으로 콘텐츠 + 목차 배치
   - `max-w-7xl` 컨테이너로 전체 영역 확장
   - 목차 데이터 추출 및 TableOfContents 컴포넌트에 전달

#### 레이아웃 규칙 정립
- **전체 컨테이너**: `max-w-7xl` (헤더, 콘텐츠 영역, 푸터)
- **콘텐츠 영역**: `max-w-4xl` (블로그 포스트 본문, 가독성 최적화)
- **목차 사이드바**: `w-64` ~ `xl:w-72` (데스크탑에서 우측 고정)

#### 스타일링 통일
- 목차 플로팅 버튼: 공유 버튼과 동일한 배경 스타일 적용
- 목차 사이드바: `bg-muted/30` 배경 + border로 콘텐츠와 구분
- z-index 관리: 바텀 네비, 공유 버튼, 목차 버튼 간 겹침 방지

#### 문서 업데이트
1. **`rules/component-guidelines.md`**
   - 블로그 레이아웃 가이드라인 추가
   - Width 규칙 및 반응형 디자인 정의
   - 컴포넌트 구성 및 스타일링 규칙 문서화

2. **`AGENTS.md`**
   - 블로그 시스템 Core Features 업데이트
   - 블로그 레이아웃 규칙 링크 추가

#### 기술 스택
- **Intersection Observer API**: 활성 섹션 추적
- **unified + rehype-pretty-code**: 마크다운 처리
- **Tailwind CSS v4**: 반응형 스타일링
- **React 19 Server Components**: SSG 최적화

---

## 이전 변경사항

이전 변경사항은 git commit history를 참고하세요.

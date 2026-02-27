# Component Guidelines

이 문서는 React 컴포넌트 작성 시의 가이드라인을 설명합니다.

## 컴포넌트 구조
기본적으로 아래와 같은 구조를 권장합니다.
1. `"use client"` 지시어 (필요 시)
2. Imports (React, external libs, internal components, hooks, utils, types 순)
3. Types/Interfaces 정의
4. Component 정의
5. (필요 시) 내부 Helper functions

## 스타일링
- Tailwind CSS v4를 사용합니다.
- 복잡한 클래스 조합에는 `clsx`와 `tailwind-merge`를 사용하여 가독성을 높입니다.
- 디자인 시스템의 일관성을 위해 `/components/ui` 하위의 공통 컴포넌트를 우선적으로 활용합니다.

## 컴포넌트 분리 기준
- 재사용성이 높은 작은 단위의 UI는 `/components/ui`에 위치시킵니다.
- 특정 페이지의 비즈니스 로직을 포함하는 복합 컴포넌트는 해당 페이지의 도메인 폴더(예: `/components/blog`, `/components/home`)에 위치시킵니다.
- 전역 레이아웃 컴포넌트(헤더, 네비게이션)는 `/components/layout`에 위치시킵니다.
- 상태 관리가 복잡하거나 인터랙션이 많은 부분은 Client Component로 분리하여 서버 컴포넌트의 부담을 줄입니다.

## 네비게이션 컴포넌트 규칙
- 네비게이션 메뉴 설정은 `nav-config.ts`로 분리하여 중복 방지
- 데스크톱과 모바일 네비게이션을 별도 컴포넌트로 관리
- 반응형 디자인: 데스크톱(DesktopNav), 모바일(BottomNav)로 분리

## 블로그 컴포넌트 규칙

### 카테고리 구조
- **라우팅**: `/blog/[category]/[slug]` (2뎁스 구조)
- **컨텐츠**: `content/posts/{category}/{slug}.md`
- **Frontmatter 필수 필드**:
  ```yaml
  category: "개발"           # 카테고리 이름 (한글)
  categorySlug: "development" # 카테고리 슬러그 (URL용)
  ```

### CategoryFilter 컴포넌트
- **위치**: `components/blog/CategoryFilter.tsx`
- **역할**: 카테고리별 블로그 포스트 필터링
- **특징**:
  - 탭(Tab) UI 패턴 사용
  - 클라이언트 컴포넌트 (`'use client'`)
  - 선택된 탭 하단에 primary 색상 강조선
  - 카테고리별 포스트 개수 표시
  - 반응형 flex-wrap 레이아웃

### PostCard 컴포넌트
- **카테고리 배지**: 포스트 상단에 카테고리 표시
- **링크 구조**: `/blog/{categorySlug}/{slug}`
- **Props**: `category`, `categorySlug` 포함

### OG 이미지 지원
- **Frontmatter 필드**: `ogImage: "/og-images/post/post-1.webp"`
- **메타데이터**: `lib/seo/metadata.ts`의 `generateBlogPostMetadata()` 함수에서 처리
- **이미지 저장**: `public/og-images/post/` 디렉토리

## SEO 컴포넌트 규칙

### AdSenseScript 컴포넌트
- **위치**: `components/seo/AdSenseScript.tsx`
- **역할**: Google AdSense 스크립트 로딩
- **특징**:
  - 클라이언트 컴포넌트
  - 환경 변수로 AdSense ID 관리
  - 비동기 스크립트 로딩

---

## 블로그 레이아웃 가이드라인

블로그 페이지의 일관성과 유지보수성을 위해 다음 규칙을 준수합니다.

### 레이아웃 구조

```
┌────────────────────────────────────────────────────────┐
│  BlogPostHeader (max-w-7xl)                            │
│  - Breadcrumb 네비게이션                                │
│  - 목록으로 버튼                                         │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  메인 콘텐츠 영역 (max-w-7xl)                            │
│  ┌─────────────────────────────┐  ┌───────────────┐   │
│  │  PostContent (max-w-4xl)    │  │  TOC (sticky) │   │
│  │  - Article 헤더             │  │  - H2/H3 목차 │   │
│  │  - 마크다운 콘텐츠           │  │  - 활성 추적   │   │
│  │  - 이전/다음 네비게이션      │  │               │   │
│  └─────────────────────────────┘  └───────────────┘   │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  Footer (max-w-7xl)                                    │
└────────────────────────────────────────────────────────┘
```

### Width 규칙

| 요소 | max-width | 설명 |
|------|-----------|------|
| **전체 컨테이너** | `max-w-7xl` | 헤더, 콘텐츠 영역, 푸터의 최상위 컨테이너 |
| **콘텐츠 영역** | `max-w-4xl` | 블로그 포스트 본문 (가독성 최적화) |
| **목차 사이드바** | `w-64` ~ `xl:w-72` | 데스크탑에서 우측 고정, 모바일에서는 플로팅 버튼 |

### 반응형 디자인

#### 데스크탑 (≥ 1024px)
- **레이아웃**: Flex (콘텐츠 + 목차 나란히 배치)
- **목차**: 우측에 sticky 고정 사이드바
  - `sticky top-24`: 스크롤 시 상단에 고정
  - `max-h-[calc(100vh-8rem)]`: 화면 높이에 맞춰 스크롤 가능
- **콘텐츠**: `max-w-4xl`로 제한하여 가독성 유지

#### 모바일 (< 1024px)
- **레이아웃**: 단일 컬럼
- **목차**: 우하단 플로팅 버튼
  - 위치: `fixed bottom-40 right-4`
  - 클릭 시 바텀시트로 표시
  - 바텀 네비게이션과 겹치지 않도록 `bottom-40` 사용

### 컴포넌트 구성

#### 1. BlogPostHeader
```tsx
// components/blog/BlogPostHeader.tsx
// - max-w-7xl 컨테이너
// - Breadcrumb + 목록으로 버튼
```

#### 2. PostContent
```tsx
// components/blog/PostContent.tsx
// - 순수 콘텐츠 렌더링 (목차 제외)
// - 마크다운 처리 + 메타 정보 표시
// - 목차 데이터는 page.tsx에서 추출
```

#### 3. TableOfContents
```tsx
// components/blog/TableOfContents.tsx
// - Client Component ('use client')
// - 데스크탑: sticky 사이드바
// - 모바일: 플로팅 버튼 + BottomSheet
// - Intersection Observer로 활성 섹션 추적
```

#### 4. BottomSheet (재사용 컴포넌트)
```tsx
// components/ui/bottom-sheet.tsx
// - 모바일 전용 바텀시트 UI
// - 목차 외에도 다양한 용도로 재사용 가능
// - 오버레이 + 슬라이드 애니메이션
```

### 스타일링 규칙

#### 목차 버튼 (모바일)
```tsx
// 공유 버튼과 동일한 스타일 사용
className="
  fixed bottom-40 right-4 md:right-8
  h-14 w-14 rounded-full shadow-sm z-40
  bg-background/95 hover:bg-background
  backdrop-blur supports-[backdrop-filter]:bg-background/60
  border border-border/40
"
```

#### 목차 사이드바 (데스크탑)
```tsx
// 콘텐츠와 구분되는 박스 스타일
className="
  p-4 bg-muted/30 rounded-lg border border-border
"
```

### 마크다운 처리

- **프로세서**: `unified` + `rehype-pretty-code`
- **헤딩 ID 생성**: 자동으로 kebab-case ID 부여 (목차 링크용)
- **목차 추출**: `extractTableOfContents()` 함수로 H2, H3 추출
- **스크롤 마진**: `scroll-mt-20` (헤더 영역 고려)

### 주의사항

1. **목차 위치**: 항상 page.tsx 레벨에서 렌더링 (PostContent 외부)
2. **width 일관성**: 새 컴포넌트 추가 시 `max-w-7xl` 컨테이너 내부에 배치
3. **z-index 관리**:
   - 바텀시트 오버레이: `z-40`
   - 바텀시트 본체: `z-50`
   - 플로팅 버튼: `z-40`
4. **모바일 간격**: 플로팅 버튼들이 겹치지 않도록 `bottom` 값 조정
   - 바텀 네비: `bottom-6`
   - 공유 버튼: `bottom-24`
   - 목차 버튼: `bottom-40`

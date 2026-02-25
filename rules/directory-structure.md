# 디렉토리 구조 가이드

이 문서는 Zento 프로젝트의 디렉토리 구조와 각 디렉토리의 역할을 설명합니다.

## 전체 구조 개요

```
zento/ (utility-hub)
├── app/                    # Next.js App Router (페이지 및 라우팅)
├── components/             # React 컴포넌트
├── hooks/                  # 커스텀 React 훅
├── lib/                    # 유틸리티 함수 및 비즈니스 로직
├── types/                  # TypeScript 타입 정의
├── content/                # 정적 콘텐츠 (마크다운 등)
├── public/                 # 정적 파일 (이미지, 아이콘 등)
├── rules/                  # 프로젝트 규칙 및 가이드 문서
└── docs/                   # 프로젝트 문서
```

---

## 📁 `app/` - Next.js App Router

Next.js 13+ App Router 규칙을 따르는 페이지 및 라우팅 디렉토리입니다.

### 구조

```
app/
├── layout.tsx              # 루트 레이아웃 (전역 UI)
├── page.tsx                # 홈페이지 (/)
├── not-found.tsx           # 404 페이지
├── globals.css             # 전역 스타일
├── favicon.ico             # 파비콘
├── robots.ts               # robots.txt 생성
├── sitemap.ts              # sitemap.xml 생성
├── blog/
│   ├── page.tsx            # 블로그 목록 (/blog)
│   └── [slug]/
│       └── page.tsx        # 블로그 상세 (/blog/[slug])
├── tools/
│   └── lotto/
│       └── page.tsx        # 로또 생성기 (/tools/lotto)
├── rss.xml/
│   └── route.ts            # RSS 피드 생성
└── api/                    # API Routes (필요시 추가)
    └── [endpoint]/
        └── route.ts
```

### 규칙

- **파일명 규칙**:
  - `page.tsx`: 페이지 컴포넌트
  - `layout.tsx`: 레이아웃 컴포넌트
  - `loading.tsx`: 로딩 UI
  - `error.tsx`: 에러 UI
  - `not-found.tsx`: 404 UI

- **동적 라우팅**: `[param]` 폴더로 표현
- **라우트 그룹**: `(group-name)` 폴더로 표현 (URL에 포함되지 않음)

### 페이지 타입별 구성

#### SSG 페이지 (Static Site Generation)
- 블로그 포스트 등 정적 콘텐츠
- `generateStaticParams()` 사용
- 예: `app/blog/[slug]/page.tsx`

#### SSR 페이지 (Server-Side Rendering)
- 동적 데이터가 필요한 페이지
- `export const dynamic = 'force-dynamic'`
- 예: 대시보드, 사용자별 콘텐츠

#### SSR + CSR 하이브리드
- 서버 렌더링 + 클라이언트 인터랙션
- 서버 컴포넌트와 클라이언트 컴포넌트 조합
- 예: `app/tools/lotto/page.tsx`

---

## 📁 `components/` - React 컴포넌트

재사용 가능한 React 컴포넌트를 기능별로 분류합니다.

### 구조

```
components/
├── ui/                     # shadcn/ui 기본 컴포넌트
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── badge.tsx
│   ├── separator.tsx
│   ├── dropdown-menu.tsx
│   ├── select.tsx
│   └── ...
├── seo/                    # SEO 관련 컴포넌트
│   ├── JsonLd.tsx
│   ├── Breadcrumb.tsx
│   └── index.ts
├── blog/                   # 블로그 관련 컴포넌트
│   ├── PostCard.tsx
│   ├── PostList.tsx
│   └── PostContent.tsx
├── lotto/                  # 로또 관련 컴포넌트
│   ├── LottoGenerator.tsx
│   ├── LottoResults.tsx
│   └── LottoHistory.tsx
└── [feature]/              # 기능별 컴포넌트 디렉토리
    └── *.tsx
```

### 규칙

1. **파일명**: PascalCase (예: `PostCard.tsx`)
2. **컴포넌트명**: 파일명과 동일
3. **클라이언트 컴포넌트**: 최상단에 `'use client'` 추가
4. **기능별 분리**: 관련 컴포넌트는 같은 디렉토리에 그룹화

### 컴포넌트 분류

#### `ui/` - 기본 UI 컴포넌트
- shadcn/ui로 생성된 컴포넌트
- 프로젝트 전반에서 재사용
- Radix UI 기반으로 접근성 보장

#### 기능별 디렉토리 (`blog/`, `lotto/`, `home/`, `layout/` 등)
- 특정 기능에 종속된 컴포넌트
- 도메인 로직 포함 가능
- `home/`: 홈페이지 전용 섹션 컴포넌트
- `layout/`: 전역 레이아웃 컴포넌트 (헤더, 네비게이션 등)
- 해당 기능 페이지에서 주로 사용

---

## 📁 `hooks/` - 커스텀 React 훅

재사용 가능한 React 커스텀 훅을 관리합니다.

### 구조

```
hooks/
├── useLotto.ts            # 로또 관련 훅
├── useLocalStorage.ts     # 로컬 스토리지 훅
└── use[Feature].ts        # 기능별 훅
```

### 규칙

1. **파일명**: camelCase, `use` 접두사 (예: `useLotto.ts`)
2. **훅 함수명**: 파일명과 동일
3. **클라이언트 전용**: 모든 훅 파일은 `'use client'` 포함
4. **단일 책임**: 하나의 파일에 하나의 주요 훅

### 예시

```typescript
'use client';

export function useLotto() {
  // 로또 관련 상태 및 로직
  return { ... };
}
```

---

## 📁 `lib/` - 유틸리티 및 비즈니스 로직

순수 함수와 비즈니스 로직을 관리합니다.

### 구조

```
lib/
├── utils.ts               # 공통 유틸리티 함수
├── seo/                   # SEO 관련 유틸리티
│   ├── index.ts
│   ├── metadata.ts        # 메타데이터 생성
│   ├── structured-data.ts # 구조화된 데이터
│   ├── sitemap.ts         # 사이트맵 생성
│   ├── robots.ts          # robots.txt 생성
│   └── canonical.ts       # 캐노니컬 URL 관리
├── blog/
│   ├── posts.ts           # 블로그 데이터 로직
│   └── markdown.ts        # 마크다운 파싱
├── lotto/
│   └── generator.ts       # 로또 번호 생성 로직
└── [feature]/
    └── *.ts
```

### 규칙

1. **파일명**: camelCase (예: `generator.ts`)
2. **함수명**: camelCase, 명확한 동사 사용
3. **순수 함수**: 부작용 최소화
4. **타입 정의**: 각 모듈에서 필요한 타입 export

### 기능별 분류

#### `utils.ts` - 공통 유틸리티
- 여러 기능에서 공통으로 사용하는 함수
- 예: `cn()` (className 병합)

#### 기능별 디렉토리
- 특정 기능의 비즈니스 로직
- 서버/클라이언트 양쪽에서 사용 가능
- 예: 블로그 포스트 파싱, 로또 번호 생성

---

## 📁 `types/` - TypeScript 타입 정의

전역적으로 사용되는 TypeScript 타입과 인터페이스를 관리합니다.

### 구조

```
types/
├── seo.ts                 # SEO 관련 타입 정의
└── [feature].ts           # 기능별 타입 정의
```

### 규칙

1. **파일명**: camelCase (예: `seo.ts`)
2. **타입명**: PascalCase (예: `SeoMetadata`)
3. **인터페이스 우선**: `type` 보다 `interface` 선호
4. **export**: 모든 타입은 export 해야 함

### 예시

```typescript
export interface SeoMetadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: OpenGraphData;
}
```

---

## 📁 `content/` - 정적 콘텐츠

마크다운, JSON 등의 정적 콘텐츠를 관리합니다.

### 구조

```
content/
├── posts/                 # 블로그 포스트 (마크다운)
│   ├── first-post.md
│   ├── second-post.md
│   └── ...
└── [content-type]/        # 기타 콘텐츠 타입
    └── *.md
```

### 규칙

1. **파일명**: kebab-case (URL friendly)
2. **포맷**: 마크다운 (`.md`)
3. **Frontmatter**: YAML 형식의 메타데이터 포함

### 블로그 포스트 예시

```markdown
---
title: "포스트 제목"
date: "2024-01-15"
author: "작성자"
excerpt: "요약"
tags: ["tag1", "tag2"]
---

# 포스트 내용...
```

---

## 📁 `public/` - 정적 파일

이미지, 아이콘, 폰트 등 정적 파일을 관리합니다.

### 구조

```
public/
├── images/                # 이미지 파일
├── icons/                 # 아이콘 파일
└── *.svg                  # 루트 레벨 아이콘
```

### 규칙

1. **접근 방법**: `/` 루트 경로로 접근 (예: `/images/logo.png`)
2. **최적화**: Next.js Image 컴포넌트 사용 권장
3. **파일명**: kebab-case 권장

---

## 📁 `rules/` - 프로젝트 규칙 문서

프로젝트 개발 규칙과 가이드를 관리합니다.

### 구조

```
rules/
├── directory-structure.md      # 디렉토리 구조 가이드 (본 문서)
├── component-guidelines.md     # 컴포넌트 작성 가이드
├── changelog.md                # 변경사항 가이드
├── rendering-strategies.md     # 렌더링 전략 가이드 (향후 추가)
└── [rule-name].md              # 기타 규칙 문서
```

### 목적

- AGENTS.md 파일을 경량화
- 카테고리별 상세 가이드 제공
- 토큰 사용량 최적화
- 변경사항 이력 및 개발 규칙 문서화

---

## 📁 `docs/` - 프로젝트 문서

프로젝트 전반의 문서를 관리합니다.

### 구조

```
docs/
├── README.md              # 문서 인덱스
├── 01-env-setup-and-ui-library.md
├── 02-site-structure-and-color-system.md
└── ...
```

---

## 새로운 기능 추가 시 디렉토리 구성

새로운 기능(예: `calculator`)을 추가할 때 다음 구조를 따르세요:

```
zento/
├── app/
│   └── tools/
│       └── calculator/
│           └── page.tsx           # 페이지
├── components/
│   └── calculator/
│       ├── CalculatorDisplay.tsx  # 컴포넌트들
│       └── CalculatorButtons.tsx
├── hooks/
│   └── useCalculator.ts           # 커스텀 훅
└── lib/
    └── calculator/
        └── operations.ts          # 비즈니스 로직
```

### 단계별 가이드

1. **lib/[feature]/**: 순수 함수와 비즈니스 로직 작성
2. **hooks/**: 상태 관리 로직을 훅으로 분리
3. **components/[feature]/**: UI 컴포넌트 작성
4. **app/tools/[feature]/**: 페이지 구성

---

## 베스트 프랙티스

### 1. 파일 배치
- 컴포넌트는 가장 가까운 사용처에 배치
- 2곳 이상에서 사용되면 상위 디렉토리로 이동
- 3곳 이상에서 사용되면 `components/ui/`로 이동

### 2. import 순서
```typescript
// 1. 외부 라이브러리
import { useState } from 'react';
import Link from 'next/link';

// 2. 내부 컴포넌트
import { Button } from '@/components/ui/button';

// 3. 내부 유틸리티
import { cn } from '@/lib/utils';

// 4. 타입
import type { Post } from '@/lib/blog/posts';
```

### 3. 경로 별칭
- `@/`를 사용하여 절대 경로로 import
- 예: `import { Button } from '@/components/ui/button'`

### 4. 파일 크기
- 단일 파일은 300줄 이하 권장
- 더 길어지면 분리 고려

---

## 요약

| 디렉토리 | 용도 | 파일 타입 |
|---------|-----|----------|
| `app/` | 페이지 및 라우팅 | `.tsx`, `.ts` |
| `components/` | React 컴포넌트 | `.tsx` |
| `hooks/` | 커스텀 훅 | `.ts` |
| `lib/` | 비즈니스 로직 | `.ts` |
| `types/` | 타입 정의 | `.ts` |
| `content/` | 정적 콘텐츠 | `.md`, `.json` |
| `public/` | 정적 파일 | 이미지, 아이콘 등 |
| `rules/` | 규칙 문서 | `.md` |
| `docs/` | 프로젝트 문서 | `.md` |

이 구조를 따라 일관성 있고 확장 가능한 프로젝트를 유지할 수 있습니다.

---
title: "SSG, SSR, CSR: 올바른 렌더링 전략 선택하기"
date: "2024-02-01"
author: "개발팀"
excerpt: "Next.js의 다양한 렌더링 전략(SSG, SSR, CSR)을 이해하고 프로젝트에 적합한 방법을 선택하는 방법을 알아봅니다."
tags: ["Next.js", "SSG", "SSR", "CSR", "Performance"]
---

# SSG, SSR, CSR: 올바른 렌더링 전략 선택하기

Next.js는 다양한 렌더링 전략을 지원합니다. 각 전략의 특징을 이해하고 상황에 맞게 선택하는 것이 중요합니다.

## 렌더링 전략 개요

### 1. Static Site Generation (SSG)

빌드 타임에 페이지를 미리 생성하는 방식입니다.

**장점:**
- ⚡ 가장 빠른 로딩 속도
- 💰 CDN 캐싱으로 비용 절감
- 🔍 SEO 최적화

**적합한 경우:**
- 블로그 포스트
- 마케팅 페이지
- 문서 사이트
- 자주 변경되지 않는 콘텐츠

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <article>{post.content}</article>;
}
```

### 2. Server-Side Rendering (SSR)

매 요청마다 서버에서 페이지를 렌더링하는 방식입니다.

**장점:**
- 🔄 항상 최신 데이터 표시
- 🔍 SEO 최적화
- 🔐 서버 사이드 인증 가능

**적합한 경우:**
- 개인화된 대시보드
- 실시간 데이터가 필요한 페이지
- 사용자별 콘텐츠

```tsx
// app/dashboard/page.tsx
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const data = await fetchUserData();
  return <Dashboard data={data} />;
}
```

### 3. Client-Side Rendering (CSR)

브라우저에서 JavaScript로 페이지를 렌더링하는 방식입니다.

**장점:**
- 🎯 높은 인터랙티비티
- ⚡ 페이지 전환이 빠름
- 🔧 복잡한 상태 관리 가능

**적합한 경우:**
- 관리자 대시보드
- 인터랙티브한 도구
- 실시간 업데이트가 필요한 UI

```tsx
'use client';

import { useState, useEffect } from 'react';

export default function InteractivePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return <div>{/* 인터랙티브 UI */}</div>;
}
```

## 하이브리드 접근: SSR + CSR

실제 프로젝트에서는 여러 전략을 조합하여 사용합니다:

```tsx
// app/tools/lotto/page.tsx
export default async function LottoPage() {
  // 서버에서 초기 데이터 가져오기
  const initialStats = await getLottoStats();

  return (
    <div>
      <h1>로또 번호 생성기</h1>
      {/* 서버 렌더링된 통계 */}
      <Stats data={initialStats} />
      {/* 클라이언트 컴포넌트 */}
      <LottoGenerator />
    </div>
  );
}
```

## 전략 선택 가이드

| 렌더링 전략 | 초기 로딩 | SEO | 데이터 신선도 | 인터랙티비티 |
|------------|----------|-----|-------------|-------------|
| **SSG**    | ⚡⚡⚡    | ✅  | 낮음        | 제한적      |
| **SSR**    | ⚡⚡      | ✅  | 높음        | 제한적      |
| **CSR**    | ⚡       | ❌  | 높음        | 최고        |

## 성능 최적화 팁

### 1. SSG 최적화
```tsx
// Incremental Static Regeneration (ISR)
export const revalidate = 3600; // 1시간마다 재생성
```

### 2. SSR 최적화
```tsx
// Streaming SSR
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SlowComponent />
    </Suspense>
  );
}
```

### 3. CSR 최적화
```tsx
// Dynamic Import
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false,
});
```

## 실전 예제: 블로그 + 도구 사이트

우리 프로젝트의 렌더링 전략:

- **블로그** (`/blog`): SSG
  - 빌드 타임에 모든 포스트 생성
  - 빠른 로딩, 완벽한 SEO

- **로또 생성기** (`/tools/lotto`): SSR + CSR
  - 서버에서 초기 통계 렌더링
  - 클라이언트에서 번호 생성 인터랙션

## 결론

렌더링 전략은 프로젝트의 특성에 따라 선택해야 합니다:

- 📄 **콘텐츠 중심** → SSG
- 🔄 **실시간 데이터** → SSR
- 🎮 **인터랙티브 앱** → CSR
- 🎯 **대부분의 경우** → 하이브리드 (SSR + CSR)

Next.js는 이 모든 전략을 하나의 프레임워크에서 제공하므로, 페이지별로 적절한 방법을 선택할 수 있습니다.

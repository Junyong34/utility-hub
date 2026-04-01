---
title: "테스트 포스트 #44 - Next.js 무한스크롤"
date: "2024-09-17"
author: "개발팀"
excerpt: "무한스크롤 테스트를 위한 샘플 포스트입니다. React Query와 Intersection Observer를 활용한 구현 예제."
tags: ["테스트", "Next.js", "React Query", "무한스크롤"]
category: "AI"
categorySlug: "ai-image-creator"
---

# 테스트 포스트 #44

이것은 무한스크롤 기능을 테스트하기 위한 샘플 포스트입니다.

## 개요

포스트 번호: **44**

이 포스트는 다음을 테스트합니다:
- React Query의 useInfiniteQuery 훅
- Intersection Observer API
- 페이지당 20개 포스트 로딩
- SEO 최적화 (ItemList Schema, noscript 태그)

## 주요 기능

### 1. 무한스크롤
스크롤을 내리면 자동으로 다음 페이지의 포스트를 로드합니다.

### 2. 태그 필터링
태그를 선택하면 해당 태그의 포스트만 필터링됩니다.

### 3. 성능 최적화
- 초기 20개만 렌더링
- 나머지는 스크롤 시 lazy loading
- React Query 자동 캐싱

## 코드 예제

```typescript
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  initialPageParam: 1,
});
```

## 결론

총 44개의 포스트로 무한스크롤을 테스트합니다. (페이지 1: 1-20, 페이지 2: 21-40, 페이지 3: 41-44)

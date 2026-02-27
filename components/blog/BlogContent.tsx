'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PostList } from './PostList';
import { CategoryFilter } from './CategoryFilter';
import {
  BlogCategory,
  BlogListPost,
  PostsPageResponse,
} from '@/lib/blog/types';

interface BlogContentProps {
  posts: BlogListPost[];
  categories?: BlogCategory[];
  fixedCategorySlug?: string | null;
}

interface ObserverState {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (() => Promise<unknown>) | null;
}

const EMPTY_CATEGORIES: BlogCategory[] = [];
const POSTS_PER_PAGE = 20;

/**
 * 블로그 콘텐츠 컴포넌트
 * 카테고리 필터링과 무한스크롤을 지원합니다
 */
export function BlogContent({
  posts,
  categories = EMPTY_CATEGORIES,
  fixedCategorySlug,
}: BlogContentProps) {
  // 사용자 탭 선택 상태(메인 블로그 페이지에서만 사용)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 스크롤 하단 감지를 위한 sentinel element ref
  const observerTarget = useRef<HTMLDivElement>(null);

  // Observer 콜백에서 최신 로딩 상태를 읽기 위한 ref
  // (effect 재구독 없이 최신값 유지)
  const observerStateRef = useRef<ObserverState>({
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: null,
  });

  // 카테고리 페이지에서는 고정 slug를 우선 사용하고,
  // 일반 블로그 페이지에서는 사용자가 선택한 카테고리를 사용
  const isFixedCategoryMode = Boolean(fixedCategorySlug);
  const effectiveCategory = isFixedCategoryMode
    ? fixedCategorySlug
    : selectedCategory;

  // 카테고리명 조회를 O(1)로 처리하기 위한 인덱스
  const categoryNameBySlug = useMemo(
    () => new Map(categories.map((category) => [category.slug, category.name])),
    [categories]
  );
  const selectedCategoryName = selectedCategory
    ? categoryNameBySlug.get(selectedCategory)
    : null;

  // 카테고리 필터링된 포스트
  const filteredPosts = useMemo(
    () =>
      effectiveCategory
        ? posts.filter((post) => post.categorySlug === effectiveCategory)
        : posts,
    [effectiveCategory, posts]
  );

  // 무한스크롤을 위한 React Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery<PostsPageResponse>({
    // 카테고리 컨텍스트가 바뀌면 쿼리 캐시를 분리
    queryKey: ['posts', effectiveCategory],
    queryFn: async ({ pageParam = 1 }) => {
      const currentPage = typeof pageParam === 'number' ? pageParam : 1;
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: POSTS_PER_PAGE.toString(),
      });
      if (effectiveCategory) {
        params.set('category', effectiveCategory);
      }
      const response = await fetch(`/api/posts?${params}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return (await response.json()) as PostsPageResponse;
    },
    getNextPageParam: lastPage => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    // 첫 화면은 서버에서 받은 posts를 즉시 사용해
    // 로딩 깜빡임 없이 시작하고, 이후 페이지부터 API로 이어서 로드
    initialData: {
      pages: [
        {
          posts: filteredPosts.slice(0, POSTS_PER_PAGE),
          hasMore: filteredPosts.length > POSTS_PER_PAGE,
          total: filteredPosts.length,
          currentPage: 1,
          totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
        },
      ],
      pageParams: [1],
    },
  });

  useEffect(() => {
    // Observer 콜백이 최신 fetch 상태를 참조하도록 동기화
    observerStateRef.current = {
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Intersection Observer로 무한스크롤 구현
  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (!target || !target.isIntersecting) return;

        // 스크롤 감지 시점의 최신 상태를 ref에서 조회
        const {
          hasNextPage: canLoadMore,
          isFetchingNextPage: isFetching,
          fetchNextPage: fetchNext,
        } = observerStateRef.current;

        if (!canLoadMore || isFetching || !fetchNext) return;
        fetchNext();
      },
      { threshold: 0.5 }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // 모든 페이지의 포스트를 하나의 배열로 합침
  const allLoadedPosts = data?.pages.flatMap(page => page.posts) ?? [];
  const totalPosts = data?.pages[0]?.total ?? posts.length;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 카테고리 필터 */}
      {!isFixedCategoryMode && categories.length > 0 ? (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      ) : null}

      {/* 포스트 개수 */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {selectedCategory ? (
            <>
              <span className="font-semibold text-foreground">
                {selectedCategoryName}
              </span>{' '}
              카테고리:{' '}
              <span className="font-semibold text-foreground">
                {totalPosts}
              </span>
              개의 포스트
            </>
          ) : (
            <>
              총{' '}
              <span className="font-semibold text-foreground">
                {totalPosts}
              </span>
              개의 포스트
            </>
          )}
        </p>
      </div>

      {/* 포스트 목록 */}
      {/* 1) 초기/전환 로딩 2) 에러 3) 정상 목록 순서로 렌더링 */}
      {isPending ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-12">
          <p className="text-red-500">포스트를 불러오는데 실패했습니다.</p>
        </div>
      ) : (
        <>
          <PostList posts={allLoadedPosts} />

          {/* Intersection Observer 타겟 */}
          <div
            ref={observerTarget}
            className="h-20 flex items-center justify-center"
          >
            {isFetchingNextPage ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
            ) : null}
            {!hasNextPage && allLoadedPosts.length > 0 ? (
              <p className="text-muted-foreground text-sm">
                모든 포스트를 불러왔습니다.
              </p>
            ) : null}
          </div>
        </>
      )}
    </main>
  );
}

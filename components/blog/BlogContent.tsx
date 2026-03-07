'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PostList } from './PostList';
import { CategoryFilter } from './CategoryFilter';
import { BlogHeroSection } from './BlogHeroSection';
import type {
  BlogCategory,
  BlogPostSummary,
  PostsPageResponse,
} from '@/lib/blog/types';
import { Breadcrumb } from '@/components/seo';
import { getBlogMainBreadcrumbItems } from '@/lib/blog/breadcrumb';

interface BlogContentProps {
  posts: BlogPostSummary[];
  categories?: BlogCategory[];
  fixedCategorySlug?: string | null;
  /** Hero 섹션 표시 여부 (메인 블로그 페이지에서만 true) */
  showHero?: boolean;
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
 * 카테고리 필터링, 검색, 무한스크롤을 지원합니다
 */
export function BlogContent({
  posts,
  categories = EMPTY_CATEGORIES,
  fixedCategorySlug,
  showHero = false,
}: BlogContentProps) {
  // 사용자 탭 선택 상태(메인 블로그 페이지에서만 사용)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 검색 입력 상태 (입력 중) vs 실제 적용된 검색어 구분
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // 스크롤 하단 감지를 위한 sentinel element ref
  const observerTarget = useRef<HTMLDivElement>(null);

  // Observer 콜백에서 최신 로딩 상태를 읽기 위한 ref
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

  // 카테고리 + 검색어 필터링된 포스트 (initialData 계산용)
  const filteredPosts = useMemo(() => {
    let result = effectiveCategory
      ? posts.filter((post) => post.categorySlug === effectiveCategory)
      : posts;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt?.toLowerCase().includes(q) ||
          post.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return result;
  }, [effectiveCategory, posts, searchQuery]);

  // 검색어 적용 시 카테고리 쿼리 키 포함
  const queryKey = ['posts', effectiveCategory, searchQuery];

  // 무한스크롤을 위한 React Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery<PostsPageResponse>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const currentPage = typeof pageParam === 'number' ? pageParam : 1;
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: POSTS_PER_PAGE.toString(),
      });
      if (effectiveCategory) {
        params.set('category', effectiveCategory);
      }
      if (searchQuery.trim()) {
        params.set('search', searchQuery.trim());
      }
      const response = await fetch(`/api/posts?${params}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return (await response.json()) as PostsPageResponse;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
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

  const allLoadedPosts = data?.pages.flatMap((page) => page.posts) ?? [];
  const totalPosts = data?.pages[0]?.total ?? posts.length;

  const handleSearchSubmit = () => {
    setSearchQuery(searchInput);
    // 검색 시 카테고리 초기화
    setSelectedCategory(null);
  };

  const handleCategorySelect = (slug: string | null) => {
    setSelectedCategory(slug);
    // 카테고리 변경 시 검색어 초기화
    setSearchInput('');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero 섹션 (메인 블로그 페이지 전용) */}
      {showHero && (
        <>
          {/* Breadcrumb */}
          <nav className="pt-6 mb-0">
            <Breadcrumb items={getBlogMainBreadcrumbItems()} />
          </nav>

          <BlogHeroSection
            totalPosts={posts.length}
            categoryCount={categories.length}
            searchQuery={searchInput}
            onSearchChange={setSearchInput}
            onSearchSubmit={handleSearchSubmit}
          />
        </>
      )}

      <main className="pb-12">
        {/* 카테고리 필터 */}
        {!isFixedCategoryMode && categories.length > 0 ? (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        ) : null}

        {/* 포스트 개수 */}
        <div className="mb-6">
          <p className="text-muted-foreground text-sm">
            {searchQuery.trim() ? (
              <>
                &ldquo;
                <span className="font-semibold text-foreground">
                  {searchQuery}
                </span>
                &rdquo; 검색 결과:{' '}
                <span className="font-semibold text-foreground">
                  {totalPosts}
                </span>
                개의 포스트
              </>
            ) : selectedCategory ? (
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
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
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
    </div>
  );
}

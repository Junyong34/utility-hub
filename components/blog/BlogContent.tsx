'use client';

import { useState } from 'react';
import { PostList } from './PostList';
import { CategoryFilter } from './CategoryFilter';

interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  category: string;
  categorySlug: string;
  ogImage?: string;
}

interface Category {
  name: string;
  slug: string;
  count: number;
}

interface BlogContentProps {
  posts: Post[];
  categories?: Category[];
}

/**
 * 블로그 콘텐츠 컴포넌트
 * 카테고리 필터링과 포스트 목록을 관리합니다
 */
export function BlogContent({ posts, categories = [] }: BlogContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 선택된 카테고리에 따라 포스트 필터링
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.categorySlug === selectedCategory)
    : posts;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 카테고리 필터 */}
      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      )}

      {/* 포스트 개수 */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {selectedCategory ? (
            <>
              <span className="font-semibold text-foreground">
                {categories.find((c) => c.slug === selectedCategory)?.name}
              </span>{' '}
              카테고리:{' '}
              <span className="font-semibold text-foreground">{filteredPosts.length}</span>
              개의 포스트
            </>
          ) : (
            <>
              총 <span className="font-semibold text-foreground">{posts.length}</span>개의
              포스트
            </>
          )}
        </p>
      </div>

      {/* 포스트 목록 */}
      <PostList posts={filteredPosts} />
    </main>
  );
}

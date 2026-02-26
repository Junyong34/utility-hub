'use client';

import { useState } from 'react';
import { PostList } from './PostList';
import { TagFilter } from './TagFilter';

interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
}

interface BlogContentProps {
  posts: Post[];
  tags: string[];
}

/**
 * 블로그 콘텐츠 컴포넌트
 * 태그 필터링과 포스트 목록을 관리합니다
 */
export function BlogContent({ posts, tags }: BlogContentProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 선택된 태그에 따라 포스트 필터링
  const filteredPosts = selectedTag
    ? posts.filter((post) =>
        post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
      )
    : posts;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 태그 필터 */}
      <TagFilter tags={tags} selectedTag={selectedTag} onTagSelect={setSelectedTag} />

      {/* 포스트 개수 */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {selectedTag ? (
            <>
              <span className="font-semibold text-foreground">{selectedTag}</span> 태그로
              필터링: <span className="font-semibold text-foreground">{filteredPosts.length}</span>개의
              포스트
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

'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogBreadcrumb } from '@/components/seo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PostOption {
  slug: string;
  title: string;
}

interface BlogPostHeaderProps {
  categoryName: string;
  categorySlug: string;
  currentSlug: string;
  posts: PostOption[];
}

/**
 * 블로그 포스트 상단 헤더 컴포넌트
 * - Breadcrumb 네비게이션
 * - 뒤로가기 버튼
 * - 블로그 포스트 선택 SelectBox
 */
export function BlogPostHeader({ categoryName, categorySlug, currentSlug, posts }: BlogPostHeaderProps) {
  const router = useRouter();

  const handlePostChange = (newSlug: string) => {
    router.push(`/blog/${categorySlug}/${newSlug}`);
  };

  return (
    <header className="bg-card border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* 뒤로가기 버튼과 Breadcrumb */}
        <div className="flex items-center gap-3 mb-4">
          <Link href="/blog" aria-label="블로그 목록으로">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <BlogBreadcrumb categoryName={categoryName} categorySlug={categorySlug} />
        </div>

        {/* 블로그 포스트 선택 SelectBox */}
        <Select value={currentSlug} onValueChange={handlePostChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="포스트 선택" />
          </SelectTrigger>
          <SelectContent>
            {posts.map((post) => (
              <SelectItem key={post.slug} value={post.slug}>
                <span className="truncate">{post.title}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}

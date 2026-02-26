import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlogBreadcrumb } from '@/components/seo';

interface BlogPostHeaderProps {
  postTitle: string;
}

/**
 * 블로그 포스트 상단 헤더 컴포넌트
 * - Breadcrumb 네비게이션
 * - 목록으로 돌아가기 버튼
 */
export function BlogPostHeader({ postTitle }: BlogPostHeaderProps) {
  return (
    <header className="bg-card border-b">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumb 네비게이션 */}
        <BlogBreadcrumb postTitle={postTitle} />

        <Link href="/blog">
          <Button variant="ghost" className="mt-4">
            ← 목록으로
          </Button>
        </Link>
      </div>
    </header>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/blog/posts';
import { Button } from '@/components/ui/button';
import { generateMetadata as createMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/seo';
import { BlogContent } from '@/components/blog/BlogContent';

/**
 * 블로그 메인 페이지 메타데이터
 * - 키워드, OG, Twitter Card 최적화
 */
export const metadata: Metadata = createMetadata({
  title: '블로그',
  description:
    'Next.js, TypeScript, React, 웹 개발에 관한 유용한 팁과 정보를 공유합니다. 실무에 도움이 되는 개발 블로그 포스트 모음.',
  canonical: 'https://utility-hub.com/blog',
  keywords: [
    'Next.js 블로그',
    'React 튜토리얼',
    'TypeScript 가이드',
    '웹 개발',
    '프론트엔드',
    '개발 팁',
  ],
});

/**
 * 블로그 목록 페이지 (SSG)
 * 빌드 타임에 모든 포스트를 정적으로 생성합니다
 */
export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <Breadcrumb items={[{ name: '블로그' }]} className="mb-4" />

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Blog</h1>
              <p className="mt-1 text-muted-foreground">
                웹 개발에 관한 인사이트와 팁을 공유합니다
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">홈으로</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <BlogContent posts={posts} tags={tags} />

      {/* 푸터 */}
      <footer className="mt-16 border-t bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-muted-foreground text-sm">
            © 2024 유용한 정보 허브. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

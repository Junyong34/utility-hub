import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog/posts';
import { PostContent } from '@/components/blog/PostContent';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * 동적 메타데이터 생성
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

/**
 * Static Site Generation을 위한 경로 생성
 * 빌드 타임에 모든 블로그 포스트 페이지를 미리 생성합니다
 */
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * 블로그 포스트 상세 페이지 (SSG)
 */
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // 포스트를 찾지 못한 경우 404 페이지 표시
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog">
            <Button variant="ghost" className="mb-2">
              ← 목록으로
            </Button>
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <PostContent
            title={post.title}
            date={post.date}
            author={post.author}
            tags={post.tags}
            content={post.content}
          />
        </div>

        {/* 네비게이션 */}
        <div className="mt-8 flex justify-center">
          <Link href="/blog">
            <Button>모든 포스트 보기</Button>
          </Link>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="mt-16 border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm">
            © 2024 Utility Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

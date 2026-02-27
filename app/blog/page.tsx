import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/blog/posts';
import { Button } from '@/components/ui/button';
import { generateMetadata as createMetadata } from '@/lib/seo';
import { createPageStructuredData, createItemListSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/seo';
import { JsonLdMultiple } from '@/components/seo';
import { BlogContent } from '@/components/blog/BlogContent';

/**
 * 블로그 메인 페이지 메타데이터
 * - 키워드, OG, Twitter Card 최적화
 */
export const metadata: Metadata = createMetadata({
  title: '블로그',
  description:
    'Next.js, TypeScript, React, 웹 개발에 관한 유용한 팁과 정보를 공유합니다. 실무에 도움이 되는 개발 블로그 포스트 모음.',
  canonical: 'https://www.zento.kr/blog',
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
  const categories = getAllCategories();
  const { webPage, breadcrumb } = createPageStructuredData({
    name: '블로그',
    path: '/blog',
    description:
      'Next.js, TypeScript, React, 웹 개발에 관한 유용한 팁과 정보를 공유합니다.',
    breadcrumbs: [{ name: '홈', url: '/' }, { name: '블로그' }],
  });

  // ItemList Schema: 봇이 무한스크롤 목록을 인식할 수 있도록
  const itemList = createItemListSchema(posts);

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb, itemList]} />
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
                  유용한 정보와 인사이트와 팁을 공유합니다
                </p>
              </div>
              <Link href="/">
                <Button variant="outline">홈으로</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <BlogContent posts={posts} categories={categories} />

        {/* 봇을 위한 모든 포스트 링크 (숨김 처리) */}
        <noscript>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6">모든 블로그 포스트</h2>
            <ul className="space-y-2">
              {posts.map(post => (
                <li key={post.slug}>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.title}
                  </a>
                  <span className="text-muted-foreground ml-2">
                    - {new Date(post.date).toLocaleDateString('ko-KR')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </noscript>

        {/* 푸터 */}
        <footer className="mt-16 border-t bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-muted-foreground text-sm">
              © 2024 유용한 정보 허브. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

import { Metadata } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/blog/posts';
import { generateMetadata as createMetadata } from '@/lib/seo';
import { createPageStructuredData, createItemListSchema } from '@/lib/seo';
import { JsonLdMultiple } from '@/components/seo';
import { BlogContent } from '@/components/blog/BlogContent';
import { getBlogStructuredDataBreadcrumbs } from '@/lib/blog/breadcrumb';

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
    breadcrumbs: getBlogStructuredDataBreadcrumbs(),
  });

  // ItemList Schema: 봇이 무한스크롤 목록을 인식할 수 있도록
  const itemList = createItemListSchema(posts);

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb, itemList]} />
      <div className="relative min-h-screen bg-background">
        {/* 배경 그라데이션 (Tools 페이지와 동일 스타일) */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl" />
        </div>

        {/* 메인 콘텐츠 (Hero 포함) */}
        <BlogContent
          posts={posts}
          categories={categories}
          showHero
        />

        {/* 봇을 위한 모든 포스트 링크 (숨김 처리) */}
        <noscript>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6">모든 블로그 포스트</h2>
            <ul className="space-y-2">
              {posts.map((post) => (
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
        <footer className="mt-8 border-t bg-card">
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

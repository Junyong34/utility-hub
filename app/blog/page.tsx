import { Metadata } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/blog/posts';
import { buildBlogPostPath } from '@/lib/blog/url';
import { SITE_CONFIG, generateMetadata as createMetadata } from '@/lib/seo';
import { createPageStructuredData, createItemListSchema } from '@/lib/seo';
import { JsonLdMultiple } from '@/components/seo';
import { BlogContent } from '@/components/blog/BlogContent';
import { getBlogStructuredDataBreadcrumbs } from '@/lib/blog/breadcrumb';
import { createBlogIndexMetadataInput } from '@/lib/seo/site-section-seo';

/**
 * 블로그 메인 페이지 메타데이터
 * - 키워드, OG, Twitter Card 최적화
 */
export const metadata: Metadata = createMetadata(
  createBlogIndexMetadataInput(SITE_CONFIG.url)
);

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
    description: '비용과 선택을 빠르게 정리하는 실전 가이드 모음입니다.',
    breadcrumbs: getBlogStructuredDataBreadcrumbs(),
  });

  // ItemList Schema: 봇이 무한스크롤 목록을 인식할 수 있도록
  const itemList = createItemListSchema(posts);

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb, itemList]} />
      <div className="relative min-h-screen bg-background pt-10 md:pt-24 xl:pt-32">
        {/* 메인 콘텐츠 (Hero 포함) */}
        <BlogContent posts={posts} categories={categories} showHero />

        {/* 봇을 위한 모든 포스트 링크 (숨김 처리) */}
        <noscript>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6">모든 블로그 포스트</h2>
            <ul className="space-y-2">
              {posts.map(post => (
                <li key={post.slug}>
                  <a
                    href={buildBlogPostPath({
                      categorySlug: post.categorySlug,
                      slug: post.slug,
                    })}
                    className="text-primary hover:underline"
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
              © Zento. 비교와 계산으로 생활의 결정을 돕습니다.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

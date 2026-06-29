import { Metadata } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/blog/posts';
import { buildBlogPostPath } from '@/lib/blog/url';
import { SITE_CONFIG, generateMetadata as createMetadata } from '@/lib/seo';
import { createPageStructuredData, createItemListSchema } from '@/lib/seo';
import { JsonLdMultiple } from '@/components/seo';
import { BlogContent } from '@/components/blog/BlogContent';
import { getBlogStructuredDataBreadcrumbs } from '@/lib/blog/breadcrumb';
import { createBlogIndexMetadataInput } from '@/lib/seo/site-section-seo';
import { queryBlogPostsPage } from '@/lib/blog/pagination';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * 블로그 메인 페이지 메타데이터
 * - 키워드, OG, Twitter Card 최적화
 */
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const page = queryBlogPostsPage(getAllPosts(), {
    page: resolvedSearchParams.page,
  });

  return createMetadata(
    createBlogIndexMetadataInput(SITE_CONFIG.url, {
      page: page.currentPage,
      totalPages: page.totalPages,
    })
  );
}

/**
 * 블로그 목록 페이지
 * page 쿼리 기준으로 서버에서 현재 포스트 묶음을 렌더링합니다.
 */
export default async function BlogPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const posts = getAllPosts();
  const categories = getAllCategories();
  const initialPage = queryBlogPostsPage(posts, {
    page: resolvedSearchParams.page,
  });
  const { webPage, breadcrumb } = createPageStructuredData({
    name: '블로그',
    path: '/blog',
    description: '비용과 선택을 빠르게 정리하는 실전 가이드 모음입니다.',
    breadcrumbs: getBlogStructuredDataBreadcrumbs(),
  });

  // ItemList Schema: 현재 페이지에 실제 렌더링되는 목록 기준
  const itemList = createItemListSchema(initialPage.posts);

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb, itemList]} />
      <div className="relative min-h-screen bg-background pt-10 md:pt-24 xl:pt-32">
        {/* 메인 콘텐츠 (Hero 포함) */}
        <BlogContent
          posts={posts}
          categories={categories}
          initialPage={initialPage}
          showHero
        />

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

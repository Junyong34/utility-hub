import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories, getPostsByCategory } from '@/lib/blog/posts';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG, generateMetadata as createMetadata } from '@/lib/seo';
import { createPageStructuredData } from '@/lib/seo';
import { Breadcrumb } from '@/components/seo';
import { JsonLdMultiple } from '@/components/seo';
import { BlogContent } from '@/components/blog/BlogContent';
import { notFound } from 'next/navigation';
import {
  getBlogCategoryBreadcrumbItems,
  getBlogStructuredDataBreadcrumbs,
} from '@/lib/blog/breadcrumb';
import {
  buildBlogPaginationHref,
  queryBlogPostsPage,
} from '@/lib/blog/pagination';

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Static Site Generation을 위한 경로 생성
 */
export async function generateStaticParams() {
  const categories = getAllCategories();

  return categories.map(category => ({
    category: category.slug,
  }));
}

/**
 * 카테고리 페이지 메타데이터
 */
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const categories = getAllCategories();
  const categoryInfo = categories.find(cat => cat.slug === category);

  if (!categoryInfo) {
    return {
      title: 'Category Not Found',
    };
  }

  const page = queryBlogPostsPage(getPostsByCategory(category), {
    page: resolvedSearchParams.page,
  });
  const pageSuffix =
    page.currentPage > 1 ? ` - 페이지 ${page.currentPage}` : '';

  return createMetadata({
    title: `${categoryInfo.name} 카테고리${pageSuffix}`,
    description: `${categoryInfo.name} 관련 실전 가이드와 참고 글을 모았습니다. 총 ${categoryInfo.count}개의 글이 있습니다.`,
    canonical: `${SITE_CONFIG.url}${buildBlogPaginationHref({
      categorySlug: category,
      page: page.currentPage,
      totalPages: page.totalPages,
    })}`,
    keywords: [categoryInfo.name, '실전 가이드', '비교', '체크리스트'],
  });
}

/**
 * 카테고리별 블로그 목록 페이지
 * page 쿼리 기준으로 서버에서 현재 포스트 묶음을 렌더링합니다.
 */
export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const posts = getPostsByCategory(category);
  const categories = getAllCategories();
  const categoryInfo = categories.find(cat => cat.slug === category);

  // 카테고리를 찾지 못한 경우 404 페이지 표시
  if (!categoryInfo) {
    notFound();
  }

  const initialPage = queryBlogPostsPage(posts, {
    page: resolvedSearchParams.page,
  });
  const { webPage, breadcrumb } = createPageStructuredData({
    name: `${categoryInfo.name} 카테고리`,
    path: `/blog/${category}`,
    description: `${categoryInfo.name} 관련 비교와 판단에 도움이 되는 글 모음입니다.`,
    breadcrumbs: getBlogStructuredDataBreadcrumbs(categoryInfo.name),
  });

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb]} />
      <div className="min-h-screen bg-background pt-10 md:pt-24 xl:pt-32">
        {/* 헤더 */}
        <header className="bg-card border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <Breadcrumb
              items={getBlogCategoryBreadcrumbItems(categoryInfo.name)}
              className="mb-4"
            />

            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {categoryInfo.name}
                </h1>
                <p className="mt-1 text-muted-foreground">
                  {categoryInfo.count}개의 포스트
                </p>
              </div>
              <Link href="/blog">
                <Button variant="outline">전체 보기</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <BlogContent
          posts={posts}
          fixedCategorySlug={category}
          initialPage={initialPage}
        />

        {/* 푸터 */}
        <footer className="mt-16 border-t bg-card">
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

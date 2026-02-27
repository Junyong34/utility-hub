import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories, getPostsByCategory } from '@/lib/blog/posts';
import { Button } from '@/components/ui/button';
import { generateMetadata as createMetadata } from '@/lib/seo';
import { createPageStructuredData } from '@/lib/seo';
import { Breadcrumb } from '@/components/seo';
import { JsonLdMultiple } from '@/components/seo';
import { BlogContent } from '@/components/blog/BlogContent';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ category: string }>;
}

/**
 * Static Site Generation을 위한 경로 생성
 */
export async function generateStaticParams() {
  const categories = getAllCategories();

  return categories.map((category) => ({
    category: category.slug,
  }));
}

/**
 * 카테고리 페이지 메타데이터
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categories = getAllCategories();
  const categoryInfo = categories.find((cat) => cat.slug === category);

  if (!categoryInfo) {
    return {
      title: 'Category Not Found',
    };
  }

  return createMetadata({
    title: `${categoryInfo.name} 카테고리`,
    description: `${categoryInfo.name} 카테고리의 블로그 포스트 목록입니다. 총 ${categoryInfo.count}개의 글이 있습니다.`,
    canonical: `https://www.zento.kr/blog/${category}`,
    keywords: [categoryInfo.name, '블로그', '포스트'],
  });
}

/**
 * 카테고리별 블로그 목록 페이지 (SSG)
 */
export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const categories = getAllCategories();
  const categoryInfo = categories.find((cat) => cat.slug === category);

  // 카테고리를 찾지 못한 경우 404 페이지 표시
  if (!categoryInfo) {
    notFound();
  }

  const { webPage, breadcrumb } = createPageStructuredData({
    name: `${categoryInfo.name} 카테고리`,
    path: `/blog/${category}`,
    description: `${categoryInfo.name} 카테고리의 블로그 포스트 목록입니다.`,
    breadcrumbs: [
      { name: '홈', url: '/' },
      { name: '블로그', url: '/blog' },
      { name: categoryInfo.name },
    ],
  });

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb]} />
      <div className="min-h-screen bg-background">
        {/* 헤더 */}
        <header className="bg-card border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { name: '블로그', url: '/blog' },
                { name: categoryInfo.name },
              ]}
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
        <BlogContent posts={posts} />

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

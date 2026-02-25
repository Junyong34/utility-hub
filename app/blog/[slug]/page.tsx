import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug, getAdjacentPosts } from '@/lib/blog/posts';
import { PostContent } from '@/components/blog/PostContent';
import { Button } from '@/components/ui/button';
import { generateBlogPostMetadata } from '@/lib/seo';
import { createBlogPostStructuredData } from '@/lib/seo';
import { JsonLdMultiple, BlogBreadcrumb } from '@/components/seo';
import { ChevronLeft, ChevronRight, List } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * 동적 메타데이터 생성
 * - Open Graph, Twitter Card
 * - Article 타입
 * - Canonical URL
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return generateBlogPostMetadata({
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    author: post.author,
    tags: post.tags,
    slug: post.slug,
  });
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
 * - Article 구조화 데이터 (JSON-LD)
 * - Breadcrumb 네비게이션
 */
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // 포스트를 찾지 못한 경우 404 페이지 표시
  if (!post) {
    notFound();
  }

  // 이전/다음 포스트 가져오기
  const { prevPost, nextPost } = getAdjacentPosts(slug);

  // 구조화 데이터 생성 (Article + Breadcrumb)
  const { article, breadcrumb } = createBlogPostStructuredData({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    date: post.date,
    author: post.author,
    tags: post.tags,
  });

  return (
    <>
      {/* 구조화 데이터 (JSON-LD) */}
      <JsonLdMultiple data={[article, breadcrumb]} />

      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <header className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Breadcrumb 네비게이션 */}
            <BlogBreadcrumb postTitle={post.title} />

            <Link href="/blog">
              <Button variant="ghost" className="mt-4">
                ← 목록으로
              </Button>
            </Link>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <PostContent
              title={post.title}
              date={post.date}
              author={post.author}
              tags={post.tags}
              content={post.content}
            />
          </article>

          {/* 네비게이션 */}
          <nav className="mt-12 border-t pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 이전 포스트 */}
              <div className="md:col-span-1">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="block h-full">
                    <Button variant="outline" className="w-full h-full min-h-[80px] justify-start items-start group p-4">
                      <ChevronLeft className="mr-2 h-5 w-5 mt-1 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                      <div className="text-left overflow-hidden">
                        <div className="text-xs text-muted-foreground mb-1">이전 글</div>
                        <div className="font-medium line-clamp-2">{prevPost.title}</div>
                      </div>
                    </Button>
                  </Link>
                ) : (
                  <div className="w-full h-full min-h-[80px] flex items-center justify-center border border-dashed rounded-md p-4">
                    <span className="text-sm text-muted-foreground">이전 글이 없습니다</span>
                  </div>
                )}
              </div>

              {/* 목록으로 */}
              <div className="md:col-span-1 flex justify-center items-center">
                <Link href="/blog">
                  <Button variant="ghost" className="h-[80px] px-6">
                    <List className="mr-2 h-5 w-5" />
                    목록으로
                  </Button>
                </Link>
              </div>

              {/* 다음 포스트 */}
              <div className="md:col-span-1">
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="block h-full">
                    <Button variant="outline" className="w-full h-full min-h-[80px] justify-end items-start group p-4">
                      <div className="text-right overflow-hidden">
                        <div className="text-xs text-muted-foreground mb-1">다음 글</div>
                        <div className="font-medium line-clamp-2">{nextPost.title}</div>
                      </div>
                      <ChevronRight className="ml-2 h-5 w-5 mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  <div className="w-full h-full min-h-[80px] flex items-center justify-center border border-dashed rounded-md p-4">
                    <span className="text-sm text-muted-foreground">다음 글이 없습니다</span>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </main>

        {/* 푸터 */}
        <footer className="mt-16 border-t bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-gray-600 text-sm">
              © 2024 유용한 정보 허브. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

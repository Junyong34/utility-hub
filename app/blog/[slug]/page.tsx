import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug, getAdjacentPosts } from '@/lib/blog/posts';
import { PostContent } from '@/components/blog/PostContent';
import { BlogPostHeader } from '@/components/blog/BlogPostHeader';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { Button } from '@/components/ui/button';
import { generateBlogPostMetadata } from '@/lib/seo';
import { createBlogPostStructuredData } from '@/lib/seo';
import { JsonLdMultiple } from '@/components/seo';
import { extractTableOfContents } from '@/lib/blog/markdown-processor';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  // 목차 추출
  const tocItems = extractTableOfContents(post.content);

  return (
    <>
      {/* 구조화 데이터 (JSON-LD) */}
      <JsonLdMultiple data={[article, breadcrumb]} />

      <div className="min-h-screen bg-background">
        {/* 헤더 */}
        <BlogPostHeader postTitle={post.title} />

        {/* 메인 콘텐츠 영역 - 목차와 함께 배치 */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex gap-8">
            {/* 콘텐츠 영역 */}
            <main className="flex-1 max-w-4xl">
              <article className="bg-card rounded-lg shadow-sm p-8 md:p-12">
                <PostContent
                  title={post.title}
                  date={post.date}
                  author={post.author}
                  tags={post.tags}
                  content={post.content}
                />
              </article>

              {/* 네비게이션 - 이전/다음 포스트 */}
              <nav className="mt-12 border-t pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 이전 포스트 */}
                  {prevPost ? (
                    <Link href={`/blog/${prevPost.slug}`} className="block">
                      <Button variant="outline" className="w-full min-h-[100px] justify-start items-start group p-4 bg-card hover:bg-accent transition-colors">
                        <ChevronLeft className="mr-3 h-6 w-6 mt-1 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                        <div className="text-left flex-1 min-w-0">
                          <div className="text-xs text-muted-foreground mb-2 font-medium">이전 글</div>
                          <div className="font-semibold text-base overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', wordBreak: 'break-word' }}>
                            {prevPost.title}
                          </div>
                        </div>
                      </Button>
                    </Link>
                  ) : (
                    <div className="w-full min-h-[100px] flex items-center justify-center border border-dashed rounded-md p-4 bg-muted/30">
                      <span className="text-sm text-muted-foreground">이전 글이 없습니다</span>
                    </div>
                  )}

                  {/* 다음 포스트 */}
                  {nextPost ? (
                    <Link href={`/blog/${nextPost.slug}`} className="block">
                      <Button variant="outline" className="w-full min-h-[100px] justify-end items-start group p-4 bg-card hover:bg-accent transition-colors">
                        <div className="text-right flex-1 min-w-0">
                          <div className="text-xs text-muted-foreground mb-2 font-medium">다음 글</div>
                          <div className="font-semibold text-base overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', wordBreak: 'break-word' }}>
                            {nextPost.title}
                          </div>
                        </div>
                        <ChevronRight className="ml-3 h-6 w-6 mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  ) : (
                    <div className="w-full min-h-[100px] flex items-center justify-center border border-dashed rounded-md p-4 bg-muted/30">
                      <span className="text-sm text-muted-foreground">다음 글이 없습니다</span>
                    </div>
                  )}
                </div>
              </nav>
            </main>

            {/* 목차 (우측 사이드바 - 데스크탑 전용, 모바일은 플로팅) */}
            <TableOfContents items={tocItems} />
          </div>
        </div>

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

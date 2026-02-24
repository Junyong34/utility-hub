import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog/posts';
import { PostList } from '@/components/blog/PostList';
import { Button } from '@/components/ui/button';

/**
 * 블로그 메인 페이지 메타데이터
 */
export const metadata: Metadata = {
  title: 'Blog | Utility Hub',
  description: 'Next.js, TypeScript, React에 관한 블로그 포스트 모음',
};

/**
 * 블로그 목록 페이지 (SSG)
 * 빌드 타임에 모든 포스트를 정적으로 생성합니다
 */
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
              <p className="mt-1 text-gray-600">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 포스트 개수 */}
        <div className="mb-6">
          <p className="text-gray-600">
            총 <span className="font-semibold text-gray-900">{posts.length}</span>개의
            포스트
          </p>
        </div>

        {/* 포스트 목록 */}
        <PostList posts={posts} />
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

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

/**
 * 404 Not Found 페이지
 * - 사용자 친화적인 에러 페이지
 * - 홈으로 돌아가기 버튼
 * - SEO 친화적 (404 상태 코드 자동 반환)
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 숫자 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <div className="-mt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              페이지를 찾을 수 없습니다
            </h2>
            <p className="text-gray-600 mb-8">
              요청하신 페이지가 존재하지 않거나 이동되었습니다.
            </p>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              홈으로 돌아가기
            </Button>
          </Link>
        </div>

        {/* 추천 링크 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">다음 페이지를 둘러보세요</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/blog"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              블로그
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/tools/lotto"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              로또 생성기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

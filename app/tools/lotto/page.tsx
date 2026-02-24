import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LottoGenerator } from '@/components/lotto/LottoGenerator';

/**
 * 로또 페이지 메타데이터
 */
export const metadata: Metadata = {
  title: '로또 번호 생성기 | Utility Hub',
  description: '행운의 로또 번호를 자동으로 생성해보세요. 1~45 사이의 랜덤 번호 6개를 생성합니다.',
};

/**
 * 로또 번호 생성 페이지 (CSR)
 * 클라이언트에서 인터랙티브한 번호 생성 기능 제공
 */
export default function LottoPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 헤더 */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🎰 로또 번호 생성기</h1>
              <p className="mt-1 text-gray-600">
                행운의 번호를 찾아보세요
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">홈으로</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 좌측: 생성기 (클라이언트 컴포넌트) */}
          <div className="lg:col-span-2">
            <LottoGenerator />
          </div>

          {/* 우측: 안내 정보 */}
          <div className="space-y-6">
            {/* 사용 방법 */}
            <Card className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200">
              <h3 className="text-lg font-bold mb-3 text-purple-900">
                💡 사용 방법
              </h3>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>• 생성할 게임 수를 선택하세요</li>
                <li>• 번호 생성 버튼을 클릭하세요</li>
                <li>• 마음에 드는 번호를 저장하세요</li>
                <li>• 행운을 빌어요! 🍀</li>
              </ul>
            </Card>

            {/* 로또 정보 */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">📊 로또 안내</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold mb-1">번호 범위</p>
                  <p className="text-gray-600">1~45 사이의 숫자</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">선택 개수</p>
                  <p className="text-gray-600">중복되지 않는 6개의 번호</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">저장 기능</p>
                  <p className="text-gray-600">
                    생성한 번호를 로컬에 저장할 수 있습니다
                  </p>
                </div>
              </div>
            </Card>

            {/* 주의사항 */}
            <Card className="p-6 bg-yellow-50 border-yellow-200">
              <h3 className="text-sm font-bold mb-2 text-yellow-900">
                ⚠️ 주의사항
              </h3>
              <p className="text-xs text-yellow-800">
                본 서비스는 엔터테인먼트 목적으로 제공되며, 당첨을 보장하지
                않습니다. 책임감 있는 구매를 권장합니다.
              </p>
            </Card>
          </div>
        </div>
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

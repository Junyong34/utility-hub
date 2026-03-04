"use client";
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LottoGenerator } from '@/components/lotto/LottoGenerator';
import { LottoInfoPanel } from '@/components/lotto/LottoInfoPanel';
import { Breadcrumb, JsonLdMultiple } from '@/components/seo';
import {
  assertToolStructuredData,
  generateToolMetadata,
  getToolStructuredDataArray,
} from '@/lib/tools';
import { getLatestLottoRoundResult } from '@/lib/lotto/round-data';

assertToolStructuredData('lotto');

/**
 * 로또 페이지 메타데이터
 * lib/tools에서 자동 생성
 */
export const metadata: Metadata = generateToolMetadata('lotto');

/**
 * 로또 번호 생성 페이지 (CSR)
 * 클라이언트에서 인터랙티브한 번호 생성 기능 제공
 * SEO: SoftwareApplication, FAQ, HowTo 스키마 적용
 */
export default function LottoPage() {
  // 구조화 데이터 (WebPage, Breadcrumb, SoftwareApplication, FAQ, HowTo)
  const structuredData = getToolStructuredDataArray('lotto');
  const latestRound = getLatestLottoRoundResult();

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <div className="min-h-screen bg-background">
        {/* 헤더 */}
        <header className="bg-card border-b shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumb
              items={[
                { name: '도구', url: '/tools' },
                { name: '로또 번호 생성기' },
              ]}
              className="mb-4"
            />
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  로또 번호 생성기
                </h1>
                <p className="mt-1 text-muted-foreground">
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
            <LottoInfoPanel latestRound={latestRound?.round} />
          </div>
        </main>

        {/* 푸터 */}
        <footer className="mt-16 border-t bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-muted-foreground text-sm">
              © 2026 유용한 정보 허브. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

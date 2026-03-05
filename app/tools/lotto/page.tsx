export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { LottoGenerator } from '@/components/lotto/LottoGenerator';
import { LottoContentSection } from '@/components/lotto/LottoContentSection';
import { LottoDisclaimer } from '@/components/lotto/LottoDisclaimer';
import { LottoFAQ } from '@/components/lotto/LottoFAQ';
import { LottoInfoPanel } from '@/components/lotto/LottoInfoPanel';
import { Breadcrumb, JsonLdMultiple } from '@/components/seo';
import {
  assertToolStructuredData,
  generateToolMetadata,
  getToolStructuredDataArray,
} from '@/lib/tools';
import { getToolConfig } from '@/lib/tools/tool-config';
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
  // 구조화 데이터(WebPage, Breadcrumb, SoftwareApplication, FAQ, HowTo) 모음
  const structuredData = getToolStructuredDataArray('lotto');
  // 헤더/사이드바/FAQ에서 재사용되는 최신 회차 메타
  const latestRound = getLatestLottoRoundResult();
  // 툴 메타 기반으로 FAQ 데이터 로딩
  const lottoConfig = getToolConfig('lotto');
  const faqItems = lottoConfig?.faq ?? [];

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <div className="min-h-screen bg-background lotto-page-content">
        {/* 헤더 */}
        <header className="bg-card border-b shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumb
              items={[
                { name: '도구', url: '/tools' },
                { name: 'AI 추천 번호 생성' },
              ]}
              className="mb-4"
            />
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  AI 추천 번호 생성
                </h1>
                <p className="mt-1 text-muted-foreground">
                  AI가 분석한 최적의 번호를 받아보세요
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
              <Suspense
                fallback={<div className="min-h-[720px]" aria-hidden />}
              >
                <LottoGenerator />
              </Suspense>
            </div>

            {/* 우측: 안내 정보 */}
            <LottoInfoPanel latestRound={latestRound?.round} />
          </div>

          <div className="mt-12 space-y-10">
            <LottoContentSection
              latestRound={latestRound?.round}
              latestDrawDate={latestRound?.drawDate}
            />
            <LottoFAQ items={faqItems} />
            <LottoDisclaimer />
          </div>
        </main>

        {/* 푸터 */}
        <footer className="mt-16 border-t bg-card">
          <LottoDisclaimer variant="banner" />
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

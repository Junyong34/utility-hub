import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Breadcrumb, JsonLdMultiple } from '@/components/seo';
import { generateMetadata as createMetadata } from '@/lib/seo';
import {
  assertToolStructuredData,
  getToolSubPageStructuredDataArray,
  getToolBreadcrumbItems,
  getToolStructuredDataBreadcrumbs,
} from '@/lib/tools';
import {
  getLottoHotColdNumbers,
  getLottoRoundResults,
  getLatestLottoRoundResult,
} from '@/lib/lotto/round-data';

assertToolStructuredData('lotto');

export const metadata: Metadata = createMetadata({
  title: '로또 번호 통계 추천',
  description:
    '로또 번호 통계 기반 추천 정보를 확인하세요. 최근 회차 기준 hot/cold 번호와 출현 빈도를 한눈에 볼 수 있습니다.',
  canonical: 'https://www.zento.kr/tools/lotto/stats',
  keywords: [
    '로또 번호 통계',
    '로또 hot number',
    '로또 cold number',
    '로또 번호 통계 추천',
    '로또 번호 빈도',
    '로또 번호 분석',
  ],
  ogImage: '/og-images/tool-lotto.png',
});

export default function LottoStatsPage() {
  const rounds = getLottoRoundResults();
  const latestRound = getLatestLottoRoundResult();
  const { hotNumbers, coldNumbers, frequency } = getLottoHotColdNumbers(rounds);
  const topFrequencyRows = [...frequency.entries()]
    .sort((a, b) => {
      if (b[1] === a[1]) return a[0] - b[0];
      return b[1] - a[1];
    })
    .slice(0, 12);

  const structuredData = getToolSubPageStructuredDataArray({
    toolId: 'lotto',
    path: '/tools/lotto/stats',
    name: '로또 번호 통계 추천',
    description:
      '로또 번호 통계 기반 추천 정보를 제공합니다. hot/cold 번호, 출현 빈도, 회차별 통계를 확인하세요.',
    breadcrumbs: getToolStructuredDataBreadcrumbs('lotto', 'stats', '번호 통계'),
  });

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumb
              items={getToolBreadcrumbItems('lotto', [{ name: '번호 통계' }])}
              className="mb-4"
            />
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  로또 번호 통계 추천
                </h1>
                <p className="mt-1 text-muted-foreground">
                  회차 데이터 기반으로 hot/cold 번호와 빈도를 확인하세요.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/tools/lotto">생성기로 이동</Link>
                </Button>
                {latestRound && (
                  <Button asChild>
                    <Link href={`/tools/lotto/round/${latestRound.round}`}>
                      최신 회차 보기
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
          <Card className="p-6 bg-blue-500/10 border-blue-500/20">
            <h2 className="text-xl font-bold mb-2">데이터 기준 안내</h2>
            <p className="text-sm text-muted-foreground">
              현재 페이지는 2009년 ~ 2023년 회차 데이터({rounds.length}개)를
              기준으로 계산된 통계입니다.
            </p>
          </Card>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">Hot Number</h3>
              <p className="text-sm text-muted-foreground mb-4">
                출현 빈도가 높은 번호
              </p>
              <div className="flex flex-wrap gap-2">
                {hotNumbers.map(num => (
                  <span
                    key={num}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-500/15 text-red-700 dark:text-red-300 font-semibold"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">Cold Number</h3>
              <p className="text-sm text-muted-foreground mb-4">
                출현 빈도가 낮은 번호
              </p>
              <div className="flex flex-wrap gap-2">
                {coldNumbers.map(num => (
                  <span
                    key={num}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 font-semibold"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </Card>
          </section>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              번호 출현 빈도 TOP 12
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {topFrequencyRows.map(([number, count]) => (
                <div
                  key={number}
                  className="rounded-md border px-3 py-2 text-sm flex items-center justify-between"
                >
                  <span className="font-semibold">번호 {number}</span>
                  <span className="text-muted-foreground">{count}회</span>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </>
  );
}

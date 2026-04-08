import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LottoRoundYearFilter } from '@/components/lotto/LottoRoundYearFilter';
import { Breadcrumb, JsonLdMultiple } from '@/components/seo';
import { generateMetadata as createMetadata } from '@/lib/seo';
import { buildCustomOgImagePath } from '@/lib/seo/og';
import {
  analyzeLottoRoundPattern,
  getLottoRoundResult,
  getLottoRoundResults,
} from '@/lib/lotto/round-data';
import {
  assertToolStructuredData,
  getToolSubPageStructuredDataArray,
  getToolBreadcrumbItems,
  getToolStructuredDataBreadcrumbs,
} from '@/lib/tools';

assertToolStructuredData('lotto');

interface PageProps {
  params: Promise<{ round: string }>;
}

export async function generateStaticParams() {
  return getLottoRoundResults().map((item) => ({
    round: String(item.round),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { round } = await params;
  const roundNumber = Number.parseInt(round, 10);
  const roundData = getLottoRoundResult(roundNumber);

  if (!roundData) {
    return {
      title: '회차 정보 없음',
    };
  }

  return createMetadata({
    title: `로또 ${roundData.round}회 번호 분석`,
    description: `로또 ${roundData.round}회 번호, 보너스 번호, 패턴 분석 정보를 확인할 수 있습니다.`,
    canonical: `https://www.zento.kr/tools/lotto/round/${roundData.round}`,
    keywords: [
      `로또 ${roundData.round}회`,
      `로또 ${roundData.round}회 번호`,
      '로또 회차별 번호',
      '로또 번호 패턴 분석',
    ],
    ogImage: buildCustomOgImagePath({
      title: `로또 ${roundData.round}회 번호 분석`,
      description: `로또 ${roundData.round}회 번호, 보너스 번호, 패턴 분석 정보를 확인할 수 있습니다.`,
      image: '/og-images/post/tool-lotto.webp',
      label: `LOTTO ${roundData.round}`,
      bgColor: '#0f172a',
      accentColor: '#3b82f6',
    }),
  });
}

export default async function LottoRoundPage({ params }: PageProps) {
  const { round } = await params;
  const roundNumber = Number.parseInt(round, 10);

  if (!Number.isInteger(roundNumber)) {
    notFound();
  }

  const roundData = getLottoRoundResult(roundNumber);

  if (!roundData) {
    notFound();
  }

  const patterns = analyzeLottoRoundPattern(roundData.numbers);
  const roundList = getLottoRoundResults();
  const currentIndex = roundList.findIndex((item) => item.round === roundData.round);
  const newerRound = currentIndex > 0 ? roundList[currentIndex - 1] : null;
  const olderRound =
    currentIndex >= 0 && currentIndex + 1 < roundList.length
      ? roundList[currentIndex + 1]
      : null;

  const structuredData = getToolSubPageStructuredDataArray({
    toolId: 'lotto',
    path: `/tools/lotto/round/${roundData.round}`,
    name: `로또 ${roundData.round}회 번호 분석`,
    description: `로또 ${roundData.round}회 번호와 패턴 분석 정보를 제공합니다.`,
    breadcrumbs: getToolStructuredDataBreadcrumbs(
      'lotto',
      `round/${roundData.round}`,
      `로또 ${roundData.round}회`
    ),
  });

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <div className="min-h-screen bg-background pt-10 md:pt-24 xl:pt-32">
        <header className="bg-card border-b shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumb
              items={getToolBreadcrumbItems('lotto', [
                { name: `${roundData.round}회 번호` },
              ])}
              className="mb-4"
            />
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  로또 {roundData.round}회 번호 분석
                </h1>
                <p className="mt-1 text-muted-foreground">
                  추첨일: {roundData.drawDate} · 데이터: 샘플
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/tools/lotto/stats">통계 보기</Link>
                </Button>
                <Button asChild>
                  <Link href="/tools/lotto">번호 생성하기</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">당첨 번호</h2>
            <div className="flex flex-wrap gap-3 mb-4">
              {roundData.numbers.map((number) => (
                <LottoBall key={number} number={number} />
              ))}
              <span className="text-muted-foreground self-center">+</span>
              <LottoBall number={roundData.bonus} isBonus />
            </div>
            <p className="text-sm text-muted-foreground">
              보너스 번호: {roundData.bonus}
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">번호 패턴 분석</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <StatItem label="홀수" value={`${patterns.odd}개`} />
              <StatItem label="짝수" value={`${patterns.even}개`} />
              <StatItem label="저구간(1~22)" value={`${patterns.low}개`} />
              <StatItem label="고구간(23~45)" value={`${patterns.high}개`} />
              <StatItem label="합계" value={`${patterns.sum}`} />
              <StatItem label="평균" value={`${patterns.average}`} />
            </div>
            <div className="mt-4 rounded-md border p-3 text-sm text-muted-foreground">
              번호 간격: {patterns.gaps.join(', ')}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-3">회차 이동</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {newerRound ? (
                <Button variant="outline" asChild>
                  <Link href={`/tools/lotto/round/${newerRound.round}`}>
                    ← {newerRound.round}회
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  더 최신 회차 없음
                </Button>
              )}
              {olderRound ? (
                <Button variant="outline" asChild>
                  <Link href={`/tools/lotto/round/${olderRound.round}`}>
                    {olderRound.round}회 →
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  더 이전 회차 없음
                </Button>
              )}
            </div>

            <LottoRoundYearFilter
              rounds={roundList.map((item) => ({
                round: item.round,
                drawYear: item.drawYear,
              }))}
              currentRound={roundData.round}
            />
          </Card>
        </main>
      </div>
    </>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border p-3">
      <p className="text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function LottoBall({
  number,
  isBonus = false,
}: {
  number: number;
  isBonus?: boolean;
}) {
  const baseClass = isBonus
    ? 'bg-emerald-500 text-white'
    : number <= 10
      ? 'bg-yellow-400 text-yellow-950'
      : number <= 20
        ? 'bg-blue-500 text-white'
        : number <= 30
          ? 'bg-red-500 text-white'
          : number <= 40
            ? 'bg-gray-600 text-white'
            : 'bg-green-600 text-white';

  return (
    <div
      className={`h-12 w-12 rounded-full flex items-center justify-center font-bold shadow ${baseClass}`}
    >
      {number}
    </div>
  );
}

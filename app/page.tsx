import type { Metadata } from 'next';
import { ParentingFeaturedPlaceCard } from '@/components/home/parenting-featured-place-card';
import { ParentingHeroSection } from '@/components/home/parenting-hero-section';
import { ParentingLinkCard } from '@/components/home/parenting-link-card';
import { ParentingSectionGrid } from '@/components/home/parenting-section-grid';
import { PaperPageShell } from '@/components/ui/paper-page-shell';
import { getParentingHomeContent } from '@/lib/home/parenting-home-content';

export const metadata: Metadata = {
  title: '아이와 갈 곳, 조건별로 빠르게 찾으세요 | Zento',
  description:
    '서울·경기·인천에서 아이와 갈 곳을 지역, 연령, 날씨, 예산 기준으로 바로 찾는 실용형 육아 홈입니다. 장소 탐색, 도구, 혜택·지원금을 한 화면에서 정리합니다.',
  openGraph: {
    title: '아이와 갈 곳, 조건별로 빠르게 찾으세요 | Zento',
    description:
      '서울·경기·인천에서 아이와 갈 곳을 지역, 연령, 날씨, 예산 기준으로 바로 찾는 실용형 육아 홈입니다.',
  },
};

export default function Page() {
  const homeContent = getParentingHomeContent();

  return (
    <PaperPageShell
      glowClassName="h-80 bg-[radial-gradient(circle_at_top_left,rgba(201,176,137,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(128,151,134,0.14),transparent_24%)]"
      gridClassName="inset-x-8 top-64 h-[42rem] rounded-[40px] opacity-50"
      gridStyle={{ backgroundSize: '34px 34px' }}
    >
      <ParentingHeroSection
        regionLinks={homeContent.regionLinks}
        scenarioLinks={homeContent.scenarioLinks}
        quickFilters={homeContent.heroQuickFilters}
      />

      <div className="mx-auto max-w-screen-2xl space-y-12 px-4 pb-14 sm:space-y-20 sm:pb-24">
        <section className="space-y-4 sm:space-y-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
                이번 주 인기 장소
              </p>
              <h2
                className="text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem]"
                style={{
                  fontFamily:
                    '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                }}
              >
                이번 주 많이 찾은 장소
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-2">
            {homeContent.featuredPlaces.map((place, index) => (
              <div key={place.id} className={index === 0 ? 'col-span-2' : undefined}>
                <ParentingFeaturedPlaceCard item={place} />
              </div>
            ))}
          </div>
        </section>

        <ParentingSectionGrid
          eyebrow="지역별 바로가기"
          title="지역 단위로 다시 한 번 좁혀보기"
          description="어느 지역부터 볼지 고민 중이라면, 권역별로 모아둔 장소를 먼저 살펴보세요."
          href="/places"
          hrefLabel="전체 장소 허브 보기"
        >
          {homeContent.regionLinks.map(region => (
            <ParentingLinkCard key={region.id} item={region} />
          ))}
        </ParentingSectionGrid>

        <ParentingSectionGrid
          eyebrow="상황별 바로가기"
          title="비, 예산, 연령 같은 현실 조건으로 바로 줄이기"
          description="지역을 고르기 어렵다면, 오늘 상황에 맞는 조건으로 바로 시작해보세요."
          href="/places"
          hrefLabel="조건별 전체 보기"
        >
          {homeContent.scenarioLinks.map(scenario => (
            <ParentingLinkCard key={scenario.id} item={scenario} />
          ))}
        </ParentingSectionGrid>

        <ParentingSectionGrid
          eyebrow="도구"
          title="장소를 정한 뒤 바로 이어서 쓰는 생활 도구"
          description="나들이 계획을 세웠다면, 예산과 가계 흐름도 함께 점검해보세요."
          href="/tools"
          hrefLabel="모든 도구 보기"
          gridClassName="xl:grid-cols-3"
        >
          {homeContent.toolLinks.map(tool => (
            <ParentingLinkCard key={tool.id} item={tool} />
          ))}
        </ParentingSectionGrid>

        <ParentingSectionGrid
          eyebrow="혜택·지원금"
          title="지원과 절약 정보를 공식 출처 흐름으로 보기"
          description="놓치기 쉬운 정부 지원금과 지역 육아 혜택을 공식 출처 기준으로 모았습니다."
          href="/benefits"
          hrefLabel="혜택 허브 보기"
          gridClassName="xl:grid-cols-3"
        >
          {homeContent.benefitLinks.map(benefit => (
            <ParentingLinkCard key={benefit.id} item={benefit} />
          ))}
        </ParentingSectionGrid>

        <ParentingSectionGrid
          eyebrow="최신 가이드"
          title="블로그 자산은 아래에서 차분히 이어받기"
          description="장소 탐색에 도움이 되는 육아 생활 가이드를 함께 확인해보세요."
          href="/blog"
          hrefLabel="블로그 전체 보기"
          gridClassName="xl:grid-cols-3"
        >
          {homeContent.latestGuides.map(guide => (
            <ParentingLinkCard key={guide.id} item={guide} />
          ))}
        </ParentingSectionGrid>
      </div>
    </PaperPageShell>
  );
}

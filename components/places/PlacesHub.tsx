import Link from 'next/link';
import { WrenchIcon, GiftIcon, ArrowRightIcon } from 'lucide-react';
import { RegionCard } from './RegionCard';
import { PlacesFilteredGrid } from './PlacesFilteredGrid';
import type { RegionConfig } from '@/lib/places/region-config';
import type { PlaceSource } from '@/types/place-source';

interface PlacesHubProps {
  regions: RegionConfig[];
  placeCountByRegion: Record<string, number>;
  allPlaces: PlaceSource[];
}

export function PlacesHub({ regions, placeCountByRegion, allPlaces }: PlacesHubProps) {
  return (
    <div className="space-y-12">
      {/* 헤더 */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">수도권 중심</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          아이와 가볼 곳
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          지역, 연령, 날씨, 예산 기준으로 주말 나들이 장소를 빠르게 찾으세요.
          <br />
          공식 소스로 검증된 정보만 정리합니다.
        </p>
      </div>

      {/* 지역별 탐색 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">지역별 탐색</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regions.map(region => (
            <RegionCard
              key={region.slug}
              region={region}
              placeCount={placeCountByRegion[region.slug] ?? 0}
            />
          ))}
        </div>
      </div>

      {/* 조건별 탐색 (필터 + 전체 장소 그리드) */}
      <div>
        <h2 className="text-lg font-semibold mb-4">조건별 탐색</h2>
        <PlacesFilteredGrid places={allPlaces} />
      </div>

      {/* 연계 섹션 */}
      <div className="border border-border/50 rounded-xl p-6 bg-muted/20">
        <h2 className="text-base font-semibold mb-4">함께 사용하면 좋은 도구</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/tools">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 hover:border-primary/40 hover:bg-muted/50 transition-all group cursor-pointer">
              <WrenchIcon className="h-4 w-4 text-blue-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">나들이 예산 계산기</div>
                <div className="text-xs text-muted-foreground">입장료·교통·식사 비용 합산</div>
              </div>
              <ArrowRightIcon className="h-3 w-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>
          </Link>
          <Link href="/benefits">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 hover:border-primary/40 hover:bg-muted/50 transition-all group cursor-pointer">
              <GiftIcon className="h-4 w-4 text-orange-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">육아 혜택·지원금</div>
                <div className="text-xs text-muted-foreground">지역별 지원 정책 정리</div>
              </div>
              <ArrowRightIcon className="h-3 w-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

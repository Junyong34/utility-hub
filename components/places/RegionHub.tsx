import Link from 'next/link';
import { ArrowLeftIcon, WrenchIcon, GiftIcon, ArrowRightIcon } from 'lucide-react';
import { PlaceCard } from './PlaceCard';
import type { RegionConfig } from '@/lib/places/region-config';
import type { PlaceSource } from '@/types/place-source';

interface RegionHubProps {
  region: RegionConfig;
  places: PlaceSource[];
}

export function RegionHub({ region, places }: RegionHubProps) {
  return (
    <div className="space-y-10">
      {/* 헤더 */}
      <div className="space-y-3">
        <Link
          href="/places"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span>전체 지역 보기</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {region.name} 아이와 가볼 곳
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          {region.description}
        </p>
      </div>

      {/* 장소 카드 그리드 */}
      {places.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              {places.length}곳 정리됨
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {places.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border/50 bg-muted/20 px-6 py-12 text-center">
          <p className="text-muted-foreground text-sm">
            이 지역의 장소 정보를 준비 중입니다.
          </p>
        </div>
      )}

      {/* 연계 링크 */}
      <div className="border border-border/50 rounded-xl p-6 bg-muted/20">
        <h2 className="text-base font-semibold mb-4">함께 확인해보세요</h2>
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
                <div className="text-sm font-semibold">{region.name} 육아 혜택</div>
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

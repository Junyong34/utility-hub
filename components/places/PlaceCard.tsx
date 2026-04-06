import Link from 'next/link';
import { MapPinIcon, ClockIcon, CarIcon, ArrowRightIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { PlaceSource, PlaceCategory } from '@/types/place-source';
import { AGE_BAND_LABELS } from './PlacesFilterBar';

const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  'baby-kids-cafe': '베이비키즈카페',
  'kids-cafe': '키즈카페',
  'public-play': '공공 놀이시설',
  museum: '박물관',
  experience: '체험시설',
  park: '공원',
  library: '도서관',
  culture: '문화시설',
  sports: '체육시설',
};

const CATEGORY_STYLES: Record<PlaceCategory, string> = {
  'baby-kids-cafe': 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  'kids-cafe': 'bg-pink-500/10 text-pink-600 border-pink-500/20',
  'public-play': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  museum: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  experience: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  park: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  library: 'bg-teal-500/10 text-teal-600 border-teal-500/20',
  culture: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
  sports: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
};

/** 필터바와 동일한 색상 토큰 */
const BADGE = {
  age: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
  indoor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  outdoor: 'bg-teal-500/10 text-teal-600 border-teal-500/20',
  free: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  paid: 'bg-muted text-muted-foreground border-border',
  rain: 'bg-sky-500/10 text-sky-600 border-sky-500/20',
};

interface PlaceCardProps {
  place: PlaceSource;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const ageBands = place.ageBands.includes('all')
    ? [{ key: 'all', label: '전 연령' }]
    : place.ageBands.map(b => ({ key: b, label: AGE_BAND_LABELS[b] ?? b }));

  const indoorLabel =
    place.indoorOutdoor === 'indoor'
      ? '실내'
      : place.indoorOutdoor === 'outdoor'
        ? '야외'
        : null;
  const indoorBadge =
    place.indoorOutdoor === 'indoor'
      ? BADGE.indoor
      : place.indoorOutdoor === 'outdoor'
        ? BADGE.outdoor
        : null;

  return (
    <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-md group h-full">
      <CardContent className="p-4 flex flex-col gap-3 h-full">
        {/* 상단 배지 행 1: 카테고리 + 실내/야외 + 무료 + 우천 */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge variant="outline" className={CATEGORY_STYLES[place.category]}>
            {CATEGORY_LABELS[place.category]}
          </Badge>
          {indoorLabel && indoorBadge && (
            <Badge variant="outline" className={indoorBadge}>
              {indoorLabel}
            </Badge>
          )}
          {place.indoorOutdoor === 'both' && (
            <>
              <Badge variant="outline" className={BADGE.indoor}>실내</Badge>
              <Badge variant="outline" className={BADGE.outdoor}>야외</Badge>
            </>
          )}
          {place.priceType === 'free' && (
            <Badge variant="outline" className={BADGE.free}>무료</Badge>
          )}
          {place.rainFriendly && (
            <Badge variant="outline" className={BADGE.rain}>우천 가능</Badge>
          )}
        </div>

        {/* 연령 배지 행 */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {ageBands.map(({ key, label }) => (
            <Badge key={key} variant="outline" className={BADGE.age}>
              {label}
            </Badge>
          ))}
        </div>

        {/* 장소명 */}
        <h3 className="text-sm font-semibold leading-relaxed group-hover:text-primary transition-colors">
          {place.name}
        </h3>

        {/* 설명 */}
        {place.description && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {place.description}
          </p>
        )}

        {/* 메타 정보 */}
        <div className="flex flex-col gap-1.5 mt-auto">
          {place.subRegion && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPinIcon className="h-3 w-3 shrink-0" />
              <span>{place.subRegion}</span>
            </div>
          )}
          {place.stayMinutes && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ClockIcon className="h-3 w-3 shrink-0" />
              <span>약 {place.stayMinutes}분</span>
            </div>
          )}
          {place.parking && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CarIcon className="h-3 w-3 shrink-0" />
              <span>주차 가능</span>
            </div>
          )}
        </div>

        {/* 공식 링크 */}
        {place.sourceUrl && (
          <Link
            href={place.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary hover:underline mt-1"
          >
            <span>공식 사이트</span>
            <ArrowRightIcon className="h-3 w-3" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

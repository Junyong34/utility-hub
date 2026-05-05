import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRightIcon,
  CarIcon,
  ClockIcon,
  ExternalLinkIcon,
  MapPinIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getPlaceNaverMapUrl } from '@/lib/places/place-map-links';
import { cn } from '@/lib/utils';
import type { PlaceSource, PlaceCategory } from '@/types/place-source';
import { PlaceAddressCopyButton } from './PlaceAddressCopyButton';
import { AGE_BAND_LABELS } from './PlacesFilterBar';
import {
  CATEGORY_TONE_BY_CATEGORY,
  CONDITION_BADGE_STYLES,
  PLACES_SOFT_GRID_STYLE,
  TONE_STYLES,
} from './place-theme';

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

interface PlaceCardProps {
  place: PlaceSource;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const ageBands = place.ageBands.includes('all')
    ? [{ key: 'all', label: '전 연령' }]
    : place.ageBands.map(b => ({ key: b, label: AGE_BAND_LABELS[b] ?? b }));

  const visualStyles = TONE_STYLES[CATEGORY_TONE_BY_CATEGORY[place.category]];
  const naverMapUrl = getPlaceNaverMapUrl(place);
  const placeAddress = place.address ?? place.subRegion;

  const conditions: string[] = [];
  if (place.indoorOutdoor === 'indoor') conditions.push('실내');
  if (place.indoorOutdoor === 'outdoor') conditions.push('야외');
  if (place.indoorOutdoor === 'both') conditions.push('실내·야외');
  if (place.priceType === 'free') conditions.push('무료');
  if (place.rainFriendly) conditions.push('우천 가능');

  return (
    <Card
      data-testid="place-card"
      className="group h-full gap-3 overflow-hidden rounded-[26px] border-hairline-soft bg-[linear-gradient(180deg,var(--cream-soft),var(--canvas))] py-3 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-mockup sm:gap-4 sm:rounded-[30px] sm:py-4"
    >
      <div className="relative min-h-36 overflow-hidden border-b border-hairline-soft sm:min-h-44">
        {place.thumbnailImage ? (
          <Image
            src={place.thumbnailImage}
            alt={place.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className={cn(
              'relative flex h-full min-h-36 flex-col justify-between bg-gradient-to-br p-4 sm:min-h-44 sm:p-5',
              visualStyles.fallback
            )}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: PLACES_SOFT_GRID_STYLE,
                backgroundSize: '22px 22px',
              }}
            />
            <div className="relative flex items-center justify-between gap-3">
              <span
                className={cn(
                  'inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold sm:px-3 sm:text-[11px]',
                  visualStyles.badge
                )}
              >
                {CATEGORY_LABELS[place.category]}
              </span>
              <span className="text-[10px] font-semibold text-foreground/58 sm:text-[11px]">
                {place.subRegion}
              </span>
            </div>

            <div className="relative space-y-1.5 sm:space-y-2">
              <p
                className={cn(
                  'text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px] sm:tracking-[0.18em]',
                  visualStyles.eyebrow
                )}
              >
                {conditions[0] ?? '장소 정보'}
              </p>
              <p
                className="max-w-[13rem] text-[1.4rem] font-semibold leading-tight text-foreground sm:max-w-[14rem] sm:text-2xl"
                style={{
                  fontFamily: 'var(--font-editorial)',
                }}
              >
                {place.name}
              </p>
            </div>
          </div>
        )}
      </div>

      <CardContent className="flex h-full flex-col gap-3 p-4 sm:gap-4 sm:p-5">
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          <Badge variant="outline" className={visualStyles.badge}>
            {CATEGORY_LABELS[place.category]}
          </Badge>
          {place.indoorOutdoor === 'indoor' ? (
            <Badge variant="outline" className={CONDITION_BADGE_STYLES.indoor}>
              실내
            </Badge>
          ) : null}
          {place.indoorOutdoor === 'outdoor' ? (
            <Badge variant="outline" className={CONDITION_BADGE_STYLES.outdoor}>
              야외
            </Badge>
          ) : null}
          {place.indoorOutdoor === 'both' ? (
            <Badge variant="outline" className={CONDITION_BADGE_STYLES.indoor}>
              실내·야외
            </Badge>
          ) : null}
          {place.priceType === 'free' ? (
            <Badge variant="outline" className={CONDITION_BADGE_STYLES.free}>
              무료
            </Badge>
          ) : (
            <Badge variant="outline" className={CONDITION_BADGE_STYLES.paid}>
              유료
            </Badge>
          )}
          {place.rainFriendly ? (
            <Badge variant="outline" className={CONDITION_BADGE_STYLES.rain}>
              우천 가능
            </Badge>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {ageBands.map(({ key, label }) => (
            <Badge
              key={key}
              variant="outline"
              className={CONDITION_BADGE_STYLES.age}
            >
              {label}
            </Badge>
          ))}
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <h3
            className="text-[1.05rem] font-semibold leading-tight text-foreground sm:text-[1.15rem]"
            style={{
              fontFamily: 'var(--font-editorial)',
            }}
          >
            {place.name}
          </h3>
          {place.description ? (
            <p className="line-clamp-3 text-[13px] leading-5 text-muted-foreground sm:line-clamp-none sm:text-sm sm:leading-6">
              {place.description}
            </p>
          ) : null}
        </div>

        <div className="mt-auto space-y-2 rounded-[18px] bg-canvas/72 p-3 sm:space-y-2.5 sm:rounded-[22px] sm:p-4">
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-foreground/72 sm:text-sm">
            <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-slate sm:h-4 sm:w-4" />
            <span className="min-w-0 flex-1 break-keep leading-5 text-slate">
              {placeAddress}
            </span>
            {naverMapUrl ? (
              <Link
                href={naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${place.name} 네이버지도`}
                className="inline-flex size-6 items-center justify-center rounded-[8px] bg-canvas/80 shadow-subtle ring-1 ring-ink/6 transition-all duration-200 hover:-translate-y-px hover:bg-canvas hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
              >
                <span
                  aria-hidden="true"
                  className="size-[18px] rounded-[5px] bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('/asset/naver-map-favicon.ico')",
                  }}
                />
                <span className="sr-only">네이버지도</span>
              </Link>
            ) : null}
            {place.address ? (
              <PlaceAddressCopyButton
                address={place.address}
                placeName={place.name}
              />
            ) : null}
          </div>

          {place.stayMinutes ? (
            <div className="flex items-center gap-2 text-[13px] text-foreground/72 sm:text-sm">
              <ClockIcon className="h-3.5 w-3.5 shrink-0 text-slate sm:h-4 sm:w-4" />
              <span>권장 체류 약 {place.stayMinutes}분</span>
            </div>
          ) : null}

          {place.parking ? (
            <div className="flex items-center gap-2 text-[13px] text-foreground/72 sm:text-sm">
              <CarIcon className="h-3.5 w-3.5 shrink-0 text-slate sm:h-4 sm:w-4" />
              <span>주차 가능</span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 pt-0.5 sm:pt-1">
          {place.sourceUrl ? (
            <Link
              href={place.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-medium text-foreground/68 transition-colors hover:text-foreground sm:text-sm"
            >
              <span>공식 사이트</span>
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <div className="inline-flex items-center gap-1 text-[13px] font-medium text-foreground/55 sm:text-sm">
              <span>장소 정보 확인</span>
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

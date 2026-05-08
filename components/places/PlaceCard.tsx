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
import type { PlaceSource } from '@/types/place-source';
import { PlaceAddressCopyButton } from './PlaceAddressCopyButton';
import {
  AGE_BAND_LABELS,
  CATEGORY_LABELS,
  SEASON_LABELS,
} from './PlacesFilterBar';
import {
  CATEGORY_TONE_BY_CATEGORY,
  CONDITION_BADGE_STYLES,
  TONE_STYLES,
} from './place-theme';

interface PlaceCardProps {
  place: PlaceSource;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const ageBands = place.ageBands.includes('all')
    ? [{ key: 'all', label: '전 연령' }]
    : place.ageBands.map(b => ({ key: b, label: AGE_BAND_LABELS[b] ?? b }));

  const visualStyles = TONE_STYLES[CATEGORY_TONE_BY_CATEGORY[place.category]];
  const naverMapUrl = getPlaceNaverMapUrl(place);
  const detailHref = `/places/${place.region}/${place.id}`;
  const placeAddress = place.address ?? place.subRegion;
  const primaryCondition = getPrimaryConditionLabel(place);
  const seasonSummary = getSeasonSummary(place);

  return (
    <Card
      data-testid="place-card"
      className="group relative h-full gap-0 overflow-hidden rounded-[22px] border-hairline-soft bg-canvas py-0 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-mockup"
    >
      <Link
        href={detailHref}
        aria-label={`${place.name} 상세 페이지 보기`}
        className="absolute inset-0 z-10 rounded-[22px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
      >
        <span className="sr-only">{place.name} 상세 페이지 보기</span>
      </Link>

      {place.thumbnailImage ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-cream-soft">
          <Image
            src={place.thumbnailImage}
            alt={`${place.name} 대표 이미지`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 38vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(33,23,18,0.02),rgba(33,23,18,0.38))]" />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="rounded-[10px] bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground shadow-subtle">
              {primaryCondition}
            </span>
            <span
              className={cn(
                'rounded-[10px] border px-2.5 py-1 text-[11px] font-bold shadow-subtle backdrop-blur',
                visualStyles.badge
              )}
            >
              {CATEGORY_LABELS[place.category]}
            </span>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br p-5 text-center',
            visualStyles.fallback
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.72),transparent_28%),radial-gradient(circle_at_82%_78%,rgba(255,106,0,0.14),transparent_32%)]" />
          <div className="absolute inset-x-8 top-8 h-px bg-[linear-gradient(90deg,transparent,var(--hairline-strong),transparent)] opacity-70" />
          <div className="absolute inset-x-8 bottom-8 h-px bg-[linear-gradient(90deg,transparent,var(--hairline-strong),transparent)] opacity-70" />
          <p
            className="relative line-clamp-2 max-w-[15rem] text-[1.35rem] font-semibold leading-tight text-foreground sm:text-[1.55rem]"
            style={{
              fontFamily: 'var(--font-editorial)',
            }}
          >
            {place.name}
          </p>
        </div>
      )}

      <CardContent className="flex h-full flex-col gap-3 p-4 sm:p-5">
        <div className="space-y-1.5">
          <h3
            className="text-[1.08rem] font-semibold leading-tight text-foreground sm:text-[1.2rem]"
            style={{
              fontFamily: 'var(--font-editorial)',
            }}
          >
            {place.name}
          </h3>
          <p className="text-[13px] font-semibold text-slate">
            {place.subRegion}
          </p>
          {place.description ? (
            <p className="line-clamp-2 min-h-10 text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
              {place.description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {ageBands.slice(0, 2).map(({ key, label }) => (
            <Badge
              key={key}
              variant="outline"
              className={CONDITION_BADGE_STYLES.age}
            >
              {label}
            </Badge>
          ))}
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
          ) : null}
          {place.rainFriendly ? (
            <Badge variant="outline" className={CONDITION_BADGE_STYLES.rain}>
              우천 가능
            </Badge>
          ) : null}
          {seasonSummary ? (
            <Badge variant="outline" className={CONDITION_BADGE_STYLES.season}>
              {seasonSummary}
            </Badge>
          ) : null}
        </div>

        <div className="mt-auto space-y-2 rounded-[16px] border border-hairline-soft bg-cream-soft/48 p-3">
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
                className="relative z-20 inline-flex size-6 items-center justify-center rounded-[8px] bg-canvas/80 shadow-subtle ring-1 ring-ink/6 transition-all duration-200 hover:-translate-y-px hover:bg-canvas hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
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
              <span className="relative z-20 inline-flex">
                <PlaceAddressCopyButton
                  address={place.address}
                  placeName={place.name}
                />
              </span>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-foreground/72 sm:text-sm">
            {place.stayMinutes ? (
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="h-3.5 w-3.5 shrink-0 text-slate sm:h-4 sm:w-4" />
                약 {place.stayMinutes}분
              </span>
            ) : null}

            {place.parking ? (
              <span className="inline-flex items-center gap-1.5">
                <CarIcon className="h-3.5 w-3.5 shrink-0 text-slate sm:h-4 sm:w-4" />
                주차 가능
              </span>
            ) : null}
          </div>
        </div>

        {place.sourceUrl ? (
          <Link
            href={place.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
          >
            <span>공식 정보 보기</span>
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <div className="inline-flex h-10 items-center justify-center gap-2 rounded-[14px] border border-hairline bg-cream-soft px-4 text-sm font-semibold text-foreground/70">
            <span>장소 정보 확인</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getSeasonSummary(place: PlaceSource): string | null {
  if (place.seasons.includes('all-season')) {
    return SEASON_LABELS['all-season'];
  }

  const labels = place.seasons
    .map(season => SEASON_LABELS[season])
    .filter(Boolean);

  return labels.length > 0 ? labels.join('·') : null;
}

function getPrimaryConditionLabel(place: PlaceSource): string {
  if (place.indoorOutdoor === 'outdoor') {
    return '야외';
  }

  if (place.indoorOutdoor === 'both') {
    return '실내·야외';
  }

  return '실내';
}

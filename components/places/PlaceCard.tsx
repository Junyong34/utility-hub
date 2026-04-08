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

const CATEGORY_STYLES: Record<
  PlaceCategory,
  {
    badge: string;
    fallback: string;
    overlay: string;
  }
> = {
  'baby-kids-cafe': {
    badge: 'bg-[#f7e2dc] text-[#8a5446] border-[#efd1c5]',
    fallback: 'from-[#f3ddd5] via-[#fbf0ec] to-[#efc9bc]',
    overlay: 'text-[#8e5a4c]',
  },
  'kids-cafe': {
    badge: 'bg-[#f8e8df] text-[#9a5b49] border-[#efd8cc]',
    fallback: 'from-[#f3e1d5] via-[#fbf3ed] to-[#efcdbb]',
    overlay: 'text-[#9a5b49]',
  },
  'public-play': {
    badge: 'bg-[#e7eef7] text-[#49627d] border-[#d8e2ee]',
    fallback: 'from-[#d7e4f0] via-[#eff4f8] to-[#cadced]',
    overlay: 'text-[#506884]',
  },
  museum: {
    badge: 'bg-[#ece7f7] text-[#66538d] border-[#e0d8f0]',
    fallback: 'from-[#e7def4] via-[#f5f1fb] to-[#d8caee]',
    overlay: 'text-[#6c5c8a]',
  },
  experience: {
    badge: 'bg-[#f7ecda] text-[#805f36] border-[#eddcbf]',
    fallback: 'from-[#f0dfc4] via-[#f9f1e2] to-[#e8d0a6]',
    overlay: 'text-[#835f38]',
  },
  park: {
    badge: 'bg-[#eef3e7] text-[#526049] border-[#dfe8d5]',
    fallback: 'from-[#d9e6cf] via-[#eef4e7] to-[#d7e0c6]',
    overlay: 'text-[#4f6247]',
  },
  library: {
    badge: 'bg-[#e7f0ed] text-[#45685f] border-[#d7e7e1]',
    fallback: 'from-[#d7e8e2] via-[#edf5f2] to-[#c8ddd6]',
    overlay: 'text-[#47695f]',
  },
  culture: {
    badge: 'bg-[#efe7de] text-[#7a6148] border-[#e5d8ca]',
    fallback: 'from-[#eadccc] via-[#f5eee7] to-[#e0cdb8]',
    overlay: 'text-[#7a6148]',
  },
  sports: {
    badge: 'bg-[#e5edf6] text-[#4d6684] border-[#d5e0ec]',
    fallback: 'from-[#dbe7f1] via-[#eef4f8] to-[#cddaea]',
    overlay: 'text-[#4d6684]',
  },
};

const BADGE = {
  age: 'border-[#ddd5eb] bg-[#f1edf7] text-[#63577d]',
  indoor: 'border-[#d5e0ec] bg-[#e8eef6] text-[#49627d]',
  outdoor: 'border-[#d7e7e1] bg-[#e7f0ed] text-[#45685f]',
  free: 'border-[#dfe8d5] bg-[#eef3e7] text-[#526049]',
  rain: 'border-[#d7e3ef] bg-[#e9f1f8] text-[#4b6882]',
  paid: 'border-[#e4ddd3] bg-[#f7f2ea] text-[#7b6b59]',
} as const;

interface PlaceCardProps {
  place: PlaceSource;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const ageBands = place.ageBands.includes('all')
    ? [{ key: 'all', label: '전 연령' }]
    : place.ageBands.map(b => ({ key: b, label: AGE_BAND_LABELS[b] ?? b }));

  const visualStyles = CATEGORY_STYLES[place.category];
  const naverMapUrl = getPlaceNaverMapUrl(place);
  const placeAddress = place.address ?? place.subRegion;

  const conditions: string[] = [];
  if (place.indoorOutdoor === 'indoor') conditions.push('실내');
  if (place.indoorOutdoor === 'outdoor') conditions.push('야외');
  if (place.indoorOutdoor === 'both') conditions.push('실내·야외');
  if (place.priceType === 'free') conditions.push('무료');
  if (place.rainFriendly) conditions.push('우천 가능');

  return (
    <Card className="group h-full gap-3 overflow-hidden rounded-[26px] border-[#e8dbc8] bg-[linear-gradient(180deg,rgba(252,249,243,0.98),rgba(248,241,230,0.96))] py-3 shadow-[0_18px_50px_rgba(59,46,31,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ccb28a] hover:shadow-[0_26px_58px_rgba(59,46,31,0.12)] sm:gap-4 sm:rounded-[30px] sm:py-4">
      <div className="relative min-h-36 overflow-hidden border-b border-[#eadfce] sm:min-h-44">
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
                backgroundImage:
                  'linear-gradient(90deg, rgba(91, 74, 51, 0.08) 1px, transparent 1px), linear-gradient(rgba(91, 74, 51, 0.08) 1px, transparent 1px)',
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
                  visualStyles.overlay
                )}
              >
                {conditions[0] ?? '장소 정보'}
              </p>
              <p
                className="max-w-[13rem] text-[1.4rem] font-semibold leading-tight tracking-tight text-foreground sm:max-w-[14rem] sm:text-2xl"
                style={{
                  fontFamily:
                    '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
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
            <Badge variant="outline" className={BADGE.indoor}>
              실내
            </Badge>
          ) : null}
          {place.indoorOutdoor === 'outdoor' ? (
            <Badge variant="outline" className={BADGE.outdoor}>
              야외
            </Badge>
          ) : null}
          {place.indoorOutdoor === 'both' ? (
            <Badge variant="outline" className={BADGE.indoor}>
              실내·야외
            </Badge>
          ) : null}
          {place.priceType === 'free' ? (
            <Badge variant="outline" className={BADGE.free}>
              무료
            </Badge>
          ) : (
            <Badge variant="outline" className={BADGE.paid}>
              유료
            </Badge>
          )}
          {place.rainFriendly ? (
            <Badge variant="outline" className={BADGE.rain}>
              우천 가능
            </Badge>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {ageBands.map(({ key, label }) => (
            <Badge key={key} variant="outline" className={BADGE.age}>
              {label}
            </Badge>
          ))}
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <h3
            className="text-[1.05rem] font-semibold leading-tight tracking-tight text-foreground sm:text-[1.15rem]"
            style={{
              fontFamily:
                '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
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

        <div className="mt-auto space-y-2 rounded-[18px] bg-white/70 p-3 sm:space-y-2.5 sm:rounded-[22px] sm:p-4">
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-foreground/72 sm:text-sm">
            <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-[#7c6956] sm:h-4 sm:w-4" />
            <span className="min-w-0 flex-1 break-keep leading-5 text-[#5f5242]">
              {placeAddress}
            </span>
            {naverMapUrl ? (
              <Link
                href={naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${place.name} 네이버지도`}
                className="inline-flex size-6 items-center justify-center rounded-[8px] bg-white/80 shadow-[0_6px_18px_rgba(59,46,31,0.08)] ring-1 ring-black/6 transition-all duration-200 hover:-translate-y-px hover:shadow-[0_10px_22px_rgba(59,46,31,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03c75a]/35"
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
              <ClockIcon className="h-3.5 w-3.5 shrink-0 text-[#7c6956] sm:h-4 sm:w-4" />
              <span>권장 체류 약 {place.stayMinutes}분</span>
            </div>
          ) : null}

          {place.parking ? (
            <div className="flex items-center gap-2 text-[13px] text-foreground/72 sm:text-sm">
              <CarIcon className="h-3.5 w-3.5 shrink-0 text-[#7c6956] sm:h-4 sm:w-4" />
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

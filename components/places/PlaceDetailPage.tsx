import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  BabyIcon,
  Building2Icon,
  CalendarCheckIcon,
  CarIcon,
  ClockIcon,
  CloudRainIcon,
  ExternalLinkIcon,
  HouseIcon,
  InfoIcon,
  MapIcon,
  MapPinIcon,
  ShieldCheckIcon,
  TicketIcon,
  UsersIcon,
} from 'lucide-react';
import { PlaceAddressCopyButton } from './PlaceAddressCopyButton';
import { PlaceBlogReviewSection } from './PlaceBlogReviewSection';
import { getPlaceNaverMapUrl } from '@/lib/places/place-map-links';
import type { RegionConfig } from '@/lib/places/region-config';
import type {
  AgeBand,
  IndoorOutdoor,
  OperatorType,
  PlaceCategory,
  PlaceSeason,
  PlaceSource,
  PriceType,
} from '@/types/place-source';

interface PlaceDetailPageProps {
  place: PlaceSource;
  region: RegionConfig;
}

const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  'baby-kids-cafe': '베이비키즈카페',
  'kids-cafe': '키즈카페',
  'public-play': '공공 놀이시설',
  museum: '박물관/과학관',
  experience: '체험시설',
  park: '공원/야외시설',
  library: '도서관',
  culture: '문화시설',
  sports: '체육시설',
};

const AGE_BAND_LABELS: Record<AgeBand, string> = {
  '0-12m': '0~12개월',
  '1-3y': '1~3세',
  '3-6y': '3~6세',
  '6-10y': '6~10세',
  all: '전 연령',
};

const SEASON_LABELS: Record<PlaceSeason, string> = {
  spring: '봄',
  summer: '여름',
  fall: '가을',
  winter: '겨울',
  'all-season': '4계절',
};

const INDOOR_OUTDOOR_LABELS: Record<IndoorOutdoor, string> = {
  indoor: '실내',
  outdoor: '야외',
  both: '실내·야외',
};

const PRICE_TYPE_LABELS: Record<PriceType, string> = {
  free: '무료',
  paid: '유료',
  'partial-free': '부분 무료',
};

const OPERATOR_TYPE_LABELS: Record<OperatorType, string> = {
  public: '공공 운영',
  commercial: '민간 운영',
  'non-profit': '비영리 운영',
};

const HERO_FALLBACK_IMAGES: Partial<Record<PlaceCategory, string>> = {
  'baby-kids-cafe': '/images/places/showcase/indoor-playground.webp',
  'kids-cafe': '/images/places/showcase/indoor-playground.webp',
  'public-play': '/images/places/showcase/indoor-playground.webp',
  museum: '/images/places/showcase/dinosaur-museum.webp',
  experience: '/images/places/showcase/science-museum.webp',
  park: '/images/places/showcase/park-boardwalk.webp',
  library: '/images/places/showcase/family-planning.webp',
  culture: '/images/places/showcase/dinosaur-museum.webp',
  sports: '/images/places/showcase/forest-trail.webp',
};

export function PlaceDetailPage({ place, region }: PlaceDetailPageProps) {
  const naverMapUrl = getPlaceNaverMapUrl(place);
  const heroImage = getHeroImage(place);
  const ageSummary = getAgeSummary(place);
  const seasonSummary = getSeasonSummary(place);
  const verifiedDate = formatShortDate(place.verifiedAt);
  const placeAddress = place.address ?? place.subRegion;
  const hasReviews =
    Boolean(place.blogReviewHighlights?.length) ||
    Boolean(place.externalBlogLinks?.length);

  return (
    <main className="bg-[linear-gradient(180deg,var(--cream-soft)_0%,var(--canvas)_34%,var(--surface)_100%)] md:pt-24">
      <section className="mx-auto max-w-screen-2xl px-4 pt-1 sm:px-6 sm:pt-2 lg:px-10 xl:px-12">
        <div className="relative isolate min-h-[42rem] overflow-hidden rounded-[26px] bg-charcoal shadow-[0_28px_80px_-38px_rgba(47,35,25,0.78)] sm:min-h-[48rem] lg:min-h-[calc(100svh-5.75rem)] lg:rounded-[30px]">
          <Image
            src={heroImage}
            alt={`${place.name} 대표 이미지`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,27,14,0.78)_0%,rgba(24,27,14,0.58)_27%,rgba(24,27,14,0.14)_59%,rgba(24,27,14,0.05)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(24,27,14,0.50)_0%,rgba(24,27,14,0.12)_38%,rgba(24,27,14,0.04)_100%)]" />

          <nav
            aria-label="장소 경로"
            className="absolute top-6 left-5 z-10 flex max-w-[calc(100%-2.5rem)] flex-wrap items-center gap-3 text-sm font-semibold text-on-dark/88 sm:top-9 sm:left-10 sm:gap-5 sm:text-base"
          >
            <Link href="/" className="transition-colors hover:text-on-dark">
              홈
            </Link>
            <span aria-hidden="true" className="text-on-dark/58">
              /
            </span>
            <Link
              href="/places"
              className="transition-colors hover:text-on-dark"
            >
              아이와 가볼 곳
            </Link>
            <span aria-hidden="true" className="text-on-dark/58">
              /
            </span>
            <Link
              href={`/places/${region.slug}`}
              className="transition-colors hover:text-on-dark"
            >
              {region.name}
            </Link>
            <span aria-hidden="true" className="text-on-dark/58">
              /
            </span>
            <span className="line-clamp-1">{place.name}</span>
          </nav>

          <div className="absolute inset-x-5 bottom-7 z-10 sm:inset-x-10 sm:bottom-10 lg:inset-x-16 lg:bottom-16">
            <div className="max-w-4xl">
              <Link
                href={`/places/${region.slug}`}
                className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-on-dark/84 transition-colors hover:text-on-dark"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                {region.name} 장소 목록
              </Link>

              <h1
                className="max-w-5xl text-[clamp(3rem,7.5vw,6.8rem)] font-bold leading-[0.98] text-on-dark [text-wrap:balance]"
                style={{
                  fontFamily: 'var(--font-editorial)',
                }}
              >
                {place.name}
              </h1>

              <p className="mt-5 max-w-2xl break-keep text-[1.05rem] font-medium leading-8 text-on-dark/92 sm:text-[1.35rem] sm:leading-10">
                {place.description ??
                  `${place.subRegion}에서 아이와 함께 방문하기 좋은 ${CATEGORY_LABELS[place.category]}입니다.`}
              </p>

              <div className="mt-5 flex max-w-3xl flex-wrap gap-2.5">
                <HeroPill icon={MapPinIcon}>{place.subRegion}</HeroPill>
                <HeroPill icon={Building2Icon}>
                  {CATEGORY_LABELS[place.category]}
                </HeroPill>
                <HeroPill icon={HouseIcon}>
                  {INDOOR_OUTDOOR_LABELS[place.indoorOutdoor]}
                </HeroPill>
                <HeroPill icon={UsersIcon}>{ageSummary}</HeroPill>
              </div>

              <div className="mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
                {naverMapUrl ? (
                  <Link
                    href={naverMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-[14px] bg-[oklch(43%_0.12_133)] px-7 text-base font-bold text-white shadow-[0_18px_38px_-20px_rgba(21,80,38,0.82)] transition-all hover:-translate-y-0.5 hover:bg-[oklch(38%_0.12_133)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:min-w-[16rem]"
                  >
                    <MapIcon className="h-6 w-6" />
                    네이버지도 보기
                  </Link>
                ) : null}

                {place.sourceUrl ? (
                  <Link
                    href={place.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-[14px] border border-white/78 bg-white/6 px-7 text-base font-bold text-on-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:min-w-[16rem]"
                  >
                    <ShieldCheckIcon className="h-6 w-6" />
                    공식 정보 확인
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          <div className="absolute right-7 bottom-8 z-10 hidden items-center gap-2 text-base font-semibold text-on-dark/82 md:flex">
            <ShieldCheckIcon className="h-5 w-5" />
            <span>공식 확인 {verifiedDate}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-screen-xl gap-5 px-4 py-10 sm:py-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
        <div className="space-y-4 lg:sticky lg:top-28">
          <div className="rounded-[24px] border border-hairline-soft bg-canvas/86 p-5 shadow-card">
            <p className="text-[12px] font-bold tracking-[0.18em] text-primary-deep uppercase">
              방문 전 핵심 정보
            </p>
            <dl className="mt-5 grid gap-3">
              <DetailFact icon={MapPinIcon} label="주소" value={placeAddress} />
              <DetailFact
                icon={ClockIcon}
                label="운영 시간"
                value={place.operatingHours ?? '공식 정보 확인 필요'}
              />
              <DetailFact
                icon={TicketIcon}
                label="요금"
                value={place.priceInfo ?? PRICE_TYPE_LABELS[place.priceType]}
              />
              <DetailFact
                icon={CalendarCheckIcon}
                label="예약"
                value={
                  place.reservationRequired ? '예약 권장/필수' : '예약 없음'
                }
              />
              <DetailFact
                icon={CarIcon}
                label="주차"
                value={place.parking ? '주차 가능' : '주차 정보 확인 필요'}
              />
            </dl>
          </div>

          <div className="rounded-[24px] border border-hairline-soft bg-cream-soft/78 p-5 shadow-card">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-primary/10 text-primary-deep">
                <ShieldCheckIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  공식 확인 {verifiedDate}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  요금, 휴무, 예약 가능 여부는 방문 직전에 공식 페이지에서 한 번
                  더 확인하세요.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <section className="rounded-[28px] border border-hairline-soft bg-canvas/88 p-5 shadow-card sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[12px] font-bold tracking-[0.18em] text-primary-deep uppercase">
                  장소 요약
                </p>
                <h2
                  className="mt-2 text-2xl font-semibold leading-tight text-foreground sm:text-3xl"
                  style={{
                    fontFamily: 'var(--font-editorial)',
                  }}
                >
                  아이와 방문할 때 보는 기준
                </h2>
              </div>
              {place.address ? (
                <PlaceAddressCopyButton
                  address={place.address}
                  placeName={place.name}
                />
              ) : null}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <SummaryTile
                icon={BabyIcon}
                label="권장 연령"
                value={ageSummary}
              />
              <SummaryTile
                icon={HouseIcon}
                label="공간 유형"
                value={INDOOR_OUTDOOR_LABELS[place.indoorOutdoor]}
              />
              <SummaryTile
                icon={CloudRainIcon}
                label="날씨"
                value={place.rainFriendly ? '비 오는 날도 가능' : seasonSummary}
              />
              <SummaryTile
                icon={ClockIcon}
                label="예상 체류"
                value={
                  place.stayMinutes
                    ? `약 ${place.stayMinutes}분`
                    : '방문 전 확인'
                }
              />
              <SummaryTile
                icon={Building2Icon}
                label="운영 주체"
                value={
                  place.operatorType
                    ? OPERATOR_TYPE_LABELS[place.operatorType]
                    : '운영 정보 확인'
                }
              />
              <SummaryTile
                icon={InfoIcon}
                label="편의"
                value={getConvenienceSummary(place)}
              />
            </div>

            {place.editorNote ? (
              <div className="mt-5 rounded-[20px] border border-primary/18 bg-primary/6 p-4 text-sm leading-6 text-slate">
                <span className="font-bold text-foreground">메모 </span>
                {place.editorNote}
              </div>
            ) : null}
          </section>

          {hasReviews ? (
            <PlaceBlogReviewSection
              reviews={place.blogReviewHighlights}
              externalLinks={place.externalBlogLinks}
              className="rounded-[28px] p-5 sm:p-6"
            />
          ) : null}

          <section className="rounded-[28px] border border-hairline-soft bg-[linear-gradient(135deg,var(--cream-soft),var(--canvas))] p-5 shadow-card sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  방문 전 최종 확인
                </h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  공식 페이지와 지도를 함께 열어 운영 정보와 이동 동선을
                  확인하세요.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                {naverMapUrl ? (
                  <Link
                    href={naverMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] bg-[oklch(43%_0.12_133)] px-4 text-sm font-bold text-white transition-colors hover:bg-[oklch(38%_0.12_133)]"
                  >
                    <MapIcon className="h-4 w-4" />
                    지도 열기
                  </Link>
                ) : null}
                {place.sourceUrl ? (
                  <Link
                    href={place.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] border border-hairline-strong bg-canvas px-4 text-sm font-bold text-foreground transition-colors hover:border-primary/35"
                  >
                    <ExternalLinkIcon className="h-4 w-4" />
                    공식 정보
                  </Link>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function HeroPill({
  icon: Icon,
  children,
}: {
  icon: typeof MapPinIcon;
  children: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/82 px-4 py-2 text-sm font-bold text-foreground shadow-[0_10px_28px_-18px_rgba(0,0,0,0.72)] backdrop-blur-sm sm:text-base">
      <Icon className="h-4 w-4 text-foreground/78 sm:h-5 sm:w-5" />
      {children}
    </span>
  );
}

function DetailFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPinIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 rounded-[18px] border border-hairline-soft bg-canvas/72 p-3">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-[13px] bg-cream-soft text-slate">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <dt className="text-[12px] font-bold text-stone">{label}</dt>
        <dd className="mt-0.5 break-keep text-sm font-semibold leading-6 text-foreground">
          {value}
        </dd>
      </div>
    </div>
  );
}

function SummaryTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPinIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[20px] border border-hairline-soft bg-cream-soft/46 p-4">
      <div className="flex items-center gap-2 text-sm font-bold text-slate">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <p className="mt-2 break-keep text-base font-semibold leading-6 text-foreground">
        {value}
      </p>
    </div>
  );
}

function getHeroImage(place: PlaceSource): string {
  const thumbnailImage = place.thumbnailImage?.trim();

  if (thumbnailImage) {
    return thumbnailImage;
  }

  return (
    HERO_FALLBACK_IMAGES[place.category] ??
    '/images/places/showcase/family-planning.webp'
  );
}

function getAgeSummary(place: PlaceSource): string {
  if (place.ageBands.includes('all')) {
    return AGE_BAND_LABELS.all;
  }

  return place.ageBands.map(ageBand => AGE_BAND_LABELS[ageBand]).join(' · ');
}

function getSeasonSummary(place: PlaceSource): string {
  if (place.seasons.includes('all-season')) {
    return SEASON_LABELS['all-season'];
  }

  return place.seasons.map(season => SEASON_LABELS[season]).join(' · ');
}

function getConvenienceSummary(place: PlaceSource): string {
  const conveniences = [
    place.feedingRoom ? '수유실' : null,
    place.strollerFriendly ? '유모차 가능' : null,
    place.parking ? '주차' : null,
  ].filter(Boolean);

  return conveniences.length > 0 ? conveniences.join(' · ') : '공식 정보 확인';
}

function formatShortDate(date: string): string {
  return date.replaceAll('-', '.');
}

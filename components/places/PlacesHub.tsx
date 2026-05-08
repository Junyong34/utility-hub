import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  ArrowRightIcon,
  BabyIcon,
  CloudRainIcon,
  MapPinIcon,
  SearchIcon,
  WrenchIcon,
} from 'lucide-react';
import { RegionCard } from './RegionCard';
import { PlacesFilteredGrid } from './PlacesFilteredGrid';
import { PlacesShareButton } from './PlacesShareButton';
import { PLACES_MUTED_SURFACE_CLASS, TONE_STYLES } from './place-theme';
import type { PlaceListPageResponse } from '@/lib/places';
import type { RegionConfig } from '@/lib/places/region-config';
import { cn } from '@/lib/utils';

interface PlacesHubProps {
  regions: RegionConfig[];
  placeCountByRegion: Record<string, number>;
  initialPage: PlaceListPageResponse;
}

const HERO_COLLAGE_IMAGES = [
  {
    src: '/images/places/showcase/indoor-playground.webp',
    alt: '실내 키즈 놀이공간',
    className: 'right-0 top-0 w-[48%] rotate-[3deg] sm:right-[2%] sm:w-[42%]',
  },
  {
    src: '/images/places/showcase/park-boardwalk.webp',
    alt: '가족이 걷기 좋은 공원 산책로',
    className:
      'right-[10%] top-[35%] w-[48%] -rotate-[2deg] sm:right-[16%] sm:w-[40%]',
  },
  {
    src: '/images/places/showcase/dinosaur-museum.webp',
    alt: '아이와 둘러보는 실내 박물관',
    className:
      'right-[2%] bottom-[1%] w-[48%] rotate-[2deg] sm:right-[5%] sm:w-[42%]',
  },
] as const;

const MAP_LABELS = [
  { label: '서울', className: 'left-[47%] top-[43%]' },
  { label: '인천', className: 'left-[24%] top-[53%]' },
  { label: '경기 북부', className: 'left-[43%] top-[22%]' },
  { label: '경기 남부', className: 'left-[50%] top-[68%]' },
] as const;

const FEATURED_FILTERS = [
  {
    href: '/places?indoor=true#places-search',
    label: '실내',
    icon: SearchIcon,
    tone: TONE_STYLES.sky.badge,
  },
  {
    href: '/places?age=3-6y#places-search',
    label: '3~6세',
    icon: BabyIcon,
    tone: TONE_STYLES.butter.badge,
  },
  {
    href: '/places?rain=true#places-search',
    label: '비 오는 날',
    icon: CloudRainIcon,
    tone: TONE_STYLES.sky.badge,
  },
  {
    href: '/places?free=true#places-search',
    label: '무료',
    icon: MapPinIcon,
    tone: TONE_STYLES.mint.badge,
  },
] as const;

export function PlacesHub({
  regions,
  placeCountByRegion,
  initialPage,
}: PlacesHubProps) {
  const totalPlaceCount = initialPage.scopeTotal;

  return (
    <div className="space-y-10 sm:space-y-14">
      <section className="relative overflow-hidden rounded-[34px] border border-hairline-soft bg-[linear-gradient(135deg,var(--canvas)_0%,var(--cream-soft)_56%,var(--surface-cream)_100%)] p-5 shadow-card sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-beige-deep/70 bg-canvas/82 px-3 py-1.5 text-[12px] font-semibold text-slate shadow-subtle backdrop-blur">
              <MapPinIcon className="size-4 text-primary" />
              <span>서울·경기·인천 {totalPlaceCount}곳</span>
            </div>

            <div className="space-y-4">
              <h1
                className="font-editorial text-[clamp(2.45rem,6vw,4.9rem)] font-bold leading-[1.05] text-foreground"
                style={{
                  fontFamily: 'var(--font-editorial)',
                }}
              >
                서울·경기·인천
                <span className="block">아이와 가볼 곳</span>
              </h1>
              <p className="max-w-[34rem] text-[15px] leading-7 text-slate sm:text-[17px] sm:leading-8">
                지역, 연령, 실내 여부, 무료·우천 조건으로 오늘 갈 만한 장소를
                빠르게 좁혀보세요.
              </p>
            </div>

            <div className="grid max-w-xl grid-cols-3 divide-x divide-hairline-soft rounded-[22px] border border-hairline-soft bg-canvas/74 px-3 py-4 text-sm text-slate shadow-subtle backdrop-blur">
              <div className="px-3">
                <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {totalPlaceCount}
                </p>
                <p className="mt-1 text-xs leading-5">공개 장소</p>
              </div>
              <div className="px-3">
                <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  4
                </p>
                <p className="mt-1 text-xs leading-5">수도권 권역</p>
              </div>
              <div className="px-3">
                <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  URL
                </p>
                <p className="mt-1 text-xs leading-5">필터 공유</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {FEATURED_FILTERS.map(item => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    rel="nofollow"
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-transform hover:-translate-y-px',
                      item.tone
                    )}
                  >
                    <Icon className="size-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[25rem] sm:min-h-[34rem]">
            <div className="absolute inset-y-[4%] left-0 w-[68%] overflow-hidden rounded-[30px]">
              <Image
                src="/images/places/showcase/capital-area-map.webp"
                alt="수도권 아이와 가볼 곳 지도 일러스트"
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 44vw"
                className="object-cover"
              />
              {MAP_LABELS.map(item => (
                <span
                  key={item.label}
                  className={cn(
                    'absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold text-primary-foreground shadow-card',
                    item.className
                  )}
                >
                  {item.label}
                </span>
              ))}
            </div>

            {HERO_COLLAGE_IMAGES.map(image => (
              <div
                key={image.src}
                className={cn(
                  'absolute overflow-hidden rounded-[18px] border-[5px] border-canvas bg-canvas shadow-[0_20px_48px_-24px_rgba(61,48,39,0.62)]',
                  image.className
                )}
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 48vw, 26vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">
              지역 바로가기
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              먼저 이동 가능한 권역을 고르세요
            </h2>
          </div>
          <PlacesShareButton />
        </div>

        <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 lg:grid-cols-4">
          {regions.map(region => (
            <RegionCard
              key={region.slug}
              region={region}
              placeCount={placeCountByRegion[region.slug] ?? 0}
            />
          ))}
        </div>
      </section>

      <section id="places-search" className="scroll-mt-28 space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">
              조건 검색
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              오늘 필요한 조건만 남겨보세요
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              장소명으로 찾고, 아이 연령과 실내·야외 여부를 함께 보면서 갈 만한
              장소를 좁혀보세요.
            </p>
          </div>
        </div>

        <Suspense
          fallback={
            <div
              className={cn(
                'rounded-[28px] px-6 py-12 text-center',
                PLACES_MUTED_SURFACE_CLASS
              )}
            >
              <p className="text-sm text-muted-foreground">
                장소 목록을 불러오는 중입니다...
              </p>
            </div>
          }
        >
          <PlacesFilteredGrid initialPage={initialPage} />
        </Suspense>
      </section>

      <section className="relative overflow-hidden rounded-[28px] border border-primary/40 bg-[linear-gradient(90deg,var(--surface-cream)_0%,var(--canvas)_64%,var(--cream-soft)_100%)] p-5 shadow-card sm:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr_0.92fr] lg:items-center">
          <div className="relative min-h-[10rem] overflow-hidden rounded-[22px] lg:order-2">
            <Image
              src="/images/places/showcase/family-planning.webp"
              alt="아이와 갈 곳을 함께 고르는 가족 일러스트"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-2 lg:order-1">
            <p
              className="font-editorial text-2xl font-normal leading-tight text-foreground sm:text-3xl"
              style={{
                fontFamily: 'var(--font-editorial)',
              }}
            >
              오늘 조건에 맞는 장소를 다시 찾아보세요
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              선택한 필터는 URL에 남으니 가족에게 공유해서 같은 후보를 함께 볼
              수 있습니다.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row lg:order-3 lg:flex-col">
            <Link
              href="/places"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[16px] bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              <SearchIcon className="h-4 w-4" />
              <span>필터 다시 찾기</span>
            </Link>
            <Link
              href="/blog"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[16px] border border-primary/45 bg-canvas/74 px-5 text-sm font-semibold text-primary transition-colors hover:bg-cream-soft"
            >
              <span>블로그 가이드 보기</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[16px] border border-hairline bg-canvas/74 px-5 text-sm font-semibold text-slate transition-colors hover:text-foreground"
            >
              <WrenchIcon className="h-4 w-4" />
              <span>도구 모음</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  ArrowRightIcon,
  CloudSunIcon,
  GiftIcon,
  MapPinIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  WrenchIcon,
} from 'lucide-react';
import { RegionCard } from './RegionCard';
import { PlacesFilteredGrid } from './PlacesFilteredGrid';
import { PlacesShareButton } from './PlacesShareButton';
import {
  PLACES_MUTED_SURFACE_CLASS,
  PLACES_SOFT_GRID_STYLE,
  TONE_STYLES,
} from './place-theme';
import type { PlaceListPageResponse } from '@/lib/places';
import type { RegionConfig } from '@/lib/places/region-config';
import { cn } from '@/lib/utils';

interface PlacesHubProps {
  regions: RegionConfig[];
  placeCountByRegion: Record<string, number>;
  initialPage: PlaceListPageResponse;
}

const HERO_IMAGES = [
  {
    src: '/images/places/seoul-national-museum-of-korea.webp',
    alt: '국립중앙박물관 전경',
    title: '박물관·전시',
    meta: '비 오는 날에도 안정적인 코스',
  },
  {
    src: '/images/places/seoul-botanic-park.webp',
    alt: '서울식물원 실내 정원',
    title: '실내 정원',
    meta: '유모차 동선 확인',
  },
  {
    src: '/images/places/wonder-village-goyang.webp',
    alt: '고양 원더빌리지 체험 공간',
    title: '체험 공간',
    meta: '연령대별 후보 압축',
  },
] as const;

export function PlacesHub({
  regions,
  placeCountByRegion,
  initialPage,
}: PlacesHubProps) {
  const totalPlaceCount = initialPage.scopeTotal;

  return (
    <div className="space-y-20 sm:space-y-28">
      <section className="relative overflow-hidden py-4 sm:py-8">
        <div
          className="pointer-events-none absolute inset-x-0 top-8 -z-10 h-[34rem] rounded-[42px] opacity-50"
          style={{
            backgroundImage: PLACES_SOFT_GRID_STYLE,
            backgroundSize: '34px 34px',
          }}
        />

        <div className="grid gap-12 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-center xl:gap-16">
          <div className="max-w-3xl space-y-8 xl:pb-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-beige-deep/70 bg-canvas/82 px-3 py-1.5 text-[11px] font-semibold tracking-[0.05em] text-slate shadow-subtle backdrop-blur sm:px-4 sm:py-2 sm:text-xs">
              <ShieldCheckIcon className="size-4 text-[oklch(36%_0.07_155)]" />
              <span>수도권 중심 · 공식 출처 흐름 우선</span>
            </div>

            <div className="space-y-5">
              <h1 className="text-[clamp(2.25rem,5vw,4.2rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
                <span className="block">아이와 가볼 곳을</span>
                <span className="block">조건으로 좁혀보세요</span>
              </h1>
              <p className="max-w-[42rem] text-[15px] leading-7 text-slate sm:text-[17px] sm:leading-8">
                서울·경기·인천 장소를 지역, 연령, 실내 여부, 무료 조건으로
                천천히 줄여갑니다. 사진을 먼저 보고, 필요한 정보는 필터에서 다시
                정리하세요.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/places?indoor=true"
                className={cn(
                  'rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-px active:translate-y-0',
                  TONE_STYLES.sky.badge
                )}
              >
                실내
              </Link>
              <Link
                href="/places?free=true"
                className={cn(
                  'rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-px active:translate-y-0',
                  TONE_STYLES.mint.badge
                )}
              >
                무료
              </Link>
              <Link
                href="/places?rain=true"
                className={cn(
                  'rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-px active:translate-y-0',
                  TONE_STYLES.sky.badge
                )}
              >
                비 오는 날
              </Link>
              <Link
                href="/places?age=1-3y"
                className={cn(
                  'rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-px active:translate-y-0',
                  TONE_STYLES.butter.badge
                )}
              >
                1~3세
              </Link>
            </div>

            <div className="grid max-w-2xl grid-cols-3 divide-x divide-hairline-soft border-y border-hairline-soft py-4 text-sm text-slate sm:py-5">
              <div className="pr-4">
                <p className="text-[1.55rem] font-semibold tracking-tight text-foreground sm:text-3xl">
                  {totalPlaceCount}곳
                </p>
                <p className="mt-1 text-xs leading-5 sm:text-sm">공개 장소</p>
              </div>
              <div className="px-4">
                <p className="text-[1.55rem] font-semibold tracking-tight text-foreground sm:text-3xl">
                  4권역
                </p>
                <p className="mt-1 text-xs leading-5 sm:text-sm">
                  서울·경기·인천
                </p>
              </div>
              <div className="pl-4">
                <p className="text-[1.55rem] font-semibold tracking-tight text-foreground sm:text-3xl">
                  필터
                </p>
                <p className="mt-1 text-xs leading-5 sm:text-sm">
                  URL 공유 가능
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[31rem] sm:min-h-[38rem] xl:min-h-[42rem]">
            <div className="parenting-breathe absolute top-0 right-0 left-[9%] overflow-hidden rounded-[40px] border border-white/40 bg-surface-code shadow-[0_34px_90px_-50px_rgba(61,48,39,0.7)]">
              <div className="relative h-[23rem] sm:h-[31rem] xl:h-[34rem]">
                <Image
                  src={HERO_IMAGES[0].src}
                  alt={HERO_IMAGES[0].alt}
                  fill
                  priority
                  sizes="(max-width: 1280px) 91vw, 54vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(33,23,18,0.02),rgba(33,23,18,0.5))]" />
                <div className="absolute right-4 bottom-4 left-4 rounded-[24px] border border-white/18 bg-[rgba(255,250,240,0.82)] p-4 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-md sm:right-6 sm:left-auto sm:w-[19rem] sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sunshine-900">
                    추천 분류
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-tight">
                    {HERO_IMAGES[0].title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate">
                    {HERO_IMAGES[0].meta}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute top-10 left-0 w-[37%] overflow-hidden rounded-[30px] border border-white/50 bg-canvas shadow-[0_24px_64px_-42px_rgba(61,48,39,0.58)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={HERO_IMAGES[1].src}
                  alt={HERO_IMAGES[1].alt}
                  fill
                  sizes="(max-width: 1280px) 37vw, 22vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3.5 sm:p-4">
                <p className="text-[11px] font-semibold text-sunshine-900">
                  {HERO_IMAGES[1].title}
                </p>
                <p className="mt-1 text-sm leading-5 text-slate">
                  {HERO_IMAGES[1].meta}
                </p>
              </div>
            </div>

            <div className="absolute right-[5%] bottom-0 left-[9%] rounded-[30px] border border-hairline-soft bg-canvas/92 p-4 shadow-[0_26px_80px_-48px_rgba(61,48,39,0.6)] backdrop-blur sm:right-[14%] sm:left-[20%] sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate">
                    오늘의 후보
                  </p>
                  <p className="mt-1 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                    사진을 보고, 조건으로 정리하기
                  </p>
                </div>
                <CloudSunIcon className="size-5 text-sunshine-900" />
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {HERO_IMAGES.map(image => (
                  <div
                    key={image.title}
                    className="rounded-[18px] border border-hairline-soft bg-cream-soft/70 px-3 py-2.5"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sunshine-900">
                      {image.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-[13px] font-medium leading-5 text-slate">
                      {image.meta}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute top-5 right-5 hidden rounded-full border border-white/40 bg-canvas/78 px-3 py-2 text-xs font-semibold text-slate shadow-subtle backdrop-blur sm:inline-flex sm:items-center sm:gap-2">
              <MapPinIcon className="size-3.5 text-sunshine-900" />
              <span>가까운 권역부터 시작</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:gap-12">
        <div className="max-w-2xl space-y-3 xl:sticky xl:top-24 xl:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
            지역별 탐색
          </p>
          <h2 className="text-[1.7rem] font-semibold leading-tight tracking-tight text-foreground sm:text-[2.25rem]">
            먼저 가까운 권역을 고르세요
          </h2>
          <p className="text-[14px] leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
            각 권역의 장소 수와 특징을 함께 보여줍니다. 처음부터 모든 장소를
            훑기보다, 오늘 이동 가능한 범위를 먼저 정하는 흐름입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {regions.map(region => (
            <RegionCard
              key={region.slug}
              region={region}
              placeCount={placeCountByRegion[region.slug] ?? 0}
            />
          ))}
        </div>
      </section>

      <section className="space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
              조건별 탐색
            </p>
            <h2 className="text-[1.7rem] font-semibold leading-tight tracking-tight text-foreground sm:text-[2.25rem]">
              필요한 조건만 남겨서 다시 좁히세요
            </h2>
            <p className="max-w-2xl text-[14px] leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
              지역을 고른 다음, 연령·실내 여부·무료 조건으로 더 좁혀보세요. 필터
              상태는 URL에 남아 가족에게 그대로 공유할 수 있습니다.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex h-9 items-center gap-2 rounded-full border border-beige-deep/60 bg-canvas/80 px-4 text-[12px] font-medium text-slate shadow-subtle sm:text-sm">
              <SlidersHorizontalIcon className="size-4" />
              <span>필터는 URL과 동기화</span>
            </div>
            <PlacesShareButton />
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

      <section
        className={cn(
          'rounded-[34px] p-5 sm:p-8 lg:grid lg:grid-cols-[0.76fr_1.24fr] lg:gap-8',
          PLACES_MUTED_SURFACE_CLASS
        )}
      >
        <div className="mb-5 space-y-3 lg:mb-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sunshine-900">
            함께 보기
          </p>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-[2rem]">
            장소를 고른 뒤 이어지는 도구와 혜택
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">
            나들이 결정 다음에 필요한 예산 점검과 육아 지원 정보를 같은 흐름으로
            이어볼 수 있습니다.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/tools"
            className={cn(
              'group cursor-pointer rounded-[24px] border p-5 transition-all hover:-translate-y-0.5',
              TONE_STYLES.sky.frame
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  'inline-flex h-11 w-11 items-center justify-center rounded-2xl',
                  TONE_STYLES.sky.iconWrap,
                  TONE_STYLES.sky.icon
                )}
              >
                <WrenchIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p
                  className={cn(
                    'text-[11px] font-semibold uppercase tracking-[0.2em]',
                    TONE_STYLES.sky.eyebrow
                  )}
                >
                  도구
                </p>
                <p className="text-lg font-semibold text-foreground">
                  나들이 예산 계산기
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  입장료, 교통, 식사 비용을 한 번에 정리해 실제 부담을
                  가늠합니다.
                </p>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground/72 transition-colors group-hover:text-foreground">
              <span>도구 열기</span>
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          <Link
            href="/benefits"
            className={cn(
              'group cursor-pointer rounded-[24px] border p-5 transition-all hover:-translate-y-0.5',
              TONE_STYLES.peach.frame
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  'inline-flex h-11 w-11 items-center justify-center rounded-2xl',
                  TONE_STYLES.peach.iconWrap,
                  TONE_STYLES.peach.icon
                )}
              >
                <GiftIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p
                  className={cn(
                    'text-[11px] font-semibold uppercase tracking-[0.2em]',
                    TONE_STYLES.peach.eyebrow
                  )}
                >
                  혜택·지원금
                </p>
                <p className="text-lg font-semibold text-foreground">
                  지역별 육아 혜택 확인
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  부모급여, 아동수당, 지역 지원 정책을 장소 탐색 흐름 아래에서
                  바로 이어봅니다.
                </p>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground/72 transition-colors group-hover:text-foreground">
              <span>혜택 보기</span>
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

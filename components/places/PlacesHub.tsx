import Link from 'next/link';
import { Suspense } from 'react';
import {
  ArrowRightIcon,
  GiftIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  WrenchIcon,
} from 'lucide-react';
import { RegionCard } from './RegionCard';
import { PlacesFilteredGrid } from './PlacesFilteredGrid';
import { PlacesShareButton } from './PlacesShareButton';
import {
  PLACES_MUTED_SURFACE_CLASS,
  PLACES_PANEL_CLASS,
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

export function PlacesHub({
  regions,
  placeCountByRegion,
  initialPage,
}: PlacesHubProps) {
  const totalPlaceCount = initialPage.scopeTotal;

  return (
    <div className="space-y-10 sm:space-y-16">
      <section
        className={cn(
          'relative overflow-hidden rounded-[30px] p-5 sm:rounded-[34px] sm:p-8',
          PLACES_PANEL_CLASS
        )}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: PLACES_SOFT_GRID_STYLE,
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative grid gap-5 sm:gap-6 xl:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
          <div className="space-y-4 sm:space-y-5">
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-beige-deep bg-canvas/86 px-3 py-1.5 text-[11px] font-semibold tracking-[0.03em] text-slate shadow-subtle sm:gap-2 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.04em]">
              <ShieldCheckIcon
                className={cn('h-3.5 w-3.5', TONE_STYLES.mint.icon)}
              />
              <span>수도권 중심 · 지역·조건별 탐색</span>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <h1
                className="font-editorial text-[clamp(1.75rem,8.6vw,2.65rem)] font-normal leading-[1.05] text-foreground sm:text-[clamp(1.95rem,4.2vw,3.6rem)] sm:leading-[1.08]"
                style={{
                  fontFamily: 'var(--font-editorial)',
                }}
              >
                아이와 가볼 곳을
                <br />
                지역과 조건으로 찾아보세요
              </h1>
              <p className="max-w-2xl text-[13px] leading-6 text-slate sm:text-[15px] sm:leading-7">
                서울·경기·인천에서 아이와 가볼 곳을 한곳에 모았습니다. 먼저
                지역을 고르고, 연령과 실내 여부 같은 조건으로 원하는 장소만
                빠르게 좁혀보세요.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-beige-deep/70 bg-canvas/80 px-3 py-1 text-[11px] font-medium text-slate sm:px-3.5 sm:py-1.5 sm:text-xs">
                서울
              </span>
              <span className="rounded-full border border-beige-deep/70 bg-canvas/80 px-3 py-1 text-[11px] font-medium text-slate sm:px-3.5 sm:py-1.5 sm:text-xs">
                경기 남부
              </span>
              <span className="rounded-full border border-beige-deep/70 bg-canvas/80 px-3 py-1 text-[11px] font-medium text-slate sm:px-3.5 sm:py-1.5 sm:text-xs">
                경기 북부
              </span>
              <span className="rounded-full border border-beige-deep/70 bg-canvas/80 px-3 py-1 text-[11px] font-medium text-slate sm:px-3.5 sm:py-1.5 sm:text-xs">
                인천
              </span>
              <span
                className={cn(
                  'rounded-full border px-3 py-1 text-[11px] font-medium sm:px-3.5 sm:py-1.5 sm:text-xs',
                  TONE_STYLES.sky.badge
                )}
              >
                실내
              </span>
              <span
                className={cn(
                  'rounded-full border px-3 py-1 text-[11px] font-medium sm:px-3.5 sm:py-1.5 sm:text-xs',
                  TONE_STYLES.mint.badge
                )}
              >
                무료
              </span>
              <span
                className={cn(
                  'rounded-full border px-3 py-1 text-[11px] font-medium sm:px-3.5 sm:py-1.5 sm:text-xs',
                  TONE_STYLES.sky.badge
                )}
              >
                비 오는 날
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 xl:grid-cols-1">
            <div className="col-span-2 rounded-[22px] bg-cream px-4 py-3 sm:col-span-1 sm:rounded-[24px] sm:px-5 sm:py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sunshine-900">
                정리된 장소
              </p>
              <p
                className="mt-1.5 text-[1.9rem] font-semibold text-foreground sm:mt-2 sm:text-3xl"
                style={{
                  fontFamily: 'var(--font-editorial)',
                }}
              >
                {totalPlaceCount}곳
              </p>
              <p className="mt-1 text-[13px] leading-5 text-slate sm:text-sm sm:leading-6">
                현재 공개된 장소를 기준으로 집계한 수입니다.
              </p>
            </div>
            <div
              className={cn(
                'rounded-[22px] px-4 py-3 sm:rounded-[24px] sm:px-5 sm:py-4',
                TONE_STYLES.mint.softPanel
              )}
            >
              <p
                className={cn(
                  'text-[11px] font-semibold uppercase tracking-[0.18em]',
                  TONE_STYLES.mint.eyebrow
                )}
              >
                탐색 방식
              </p>
              <p className="mt-1.5 text-base font-semibold text-foreground sm:mt-2 sm:text-lg">
                지역 먼저, 조건은 그 다음
              </p>
              <p className="mt-1 text-[13px] leading-5 text-slate sm:text-sm sm:leading-6">
                먼저 권역을 고른 뒤, 연령과 조건으로 다시 좁혀봅니다.
              </p>
            </div>
            <div
              className={cn(
                'rounded-[22px] px-4 py-3 sm:rounded-[24px] sm:px-5 sm:py-4',
                TONE_STYLES.peach.softPanel
              )}
            >
              <p
                className={cn(
                  'text-[11px] font-semibold uppercase tracking-[0.18em]',
                  TONE_STYLES.peach.eyebrow
                )}
              >
                신뢰 기준
              </p>
              <p className="mt-1.5 text-base font-semibold text-foreground sm:mt-2 sm:text-lg">
                공식·준공식 검증 중심
              </p>
              <p className="mt-1 text-[13px] leading-5 text-slate sm:text-sm sm:leading-6">
                운영시간과 이용 요금은 자주 바뀔 수 있어, 출처와 확인 시점을
                함께 안내합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4 sm:space-y-5">
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-1.5 sm:space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
              지역별 탐색
            </p>
            <div className="space-y-1.5 sm:space-y-2">
              <h2
                className="font-editorial text-[1.75rem] font-normal text-foreground sm:text-[2rem]"
                style={{
                  fontFamily: 'var(--font-editorial)',
                }}
              >
                먼저 권역부터 좁혀보세요
              </h2>
              <p className="text-[13px] leading-5 text-muted-foreground sm:text-[15px] sm:leading-6">
                각 권역의 특징과 정리된 장소 수를 함께 보여줍니다. 어디부터
                살펴볼지 빠르게 고를 수 있게 구성했습니다.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {regions.map(region => (
            <RegionCard
              key={region.slug}
              region={region}
              placeCount={placeCountByRegion[region.slug] ?? 0}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4 sm:space-y-5">
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-1.5 sm:space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
              조건별 탐색
            </p>
            <div className="space-y-1.5 sm:space-y-2">
              <h2
                className="font-editorial text-[1.75rem] font-normal text-foreground sm:text-[2rem]"
                style={{
                  fontFamily: 'var(--font-editorial)',
                }}
              >
                여기서 더 세밀하게 줄이면 됩니다
              </h2>
              <p className="text-[13px] leading-5 text-muted-foreground sm:text-[15px] sm:leading-6">
                지역을 고른 다음, 연령·실내 여부·무료 조건으로 더 좁혀보세요.
                오늘 바로 갈 수 있는 곳만 남습니다.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex h-8 items-center gap-1.5 rounded-full border border-beige-deep/60 bg-canvas/80 px-3 text-[11px] font-medium text-slate shadow-subtle sm:h-9 sm:gap-2 sm:px-4 sm:text-sm">
              <SlidersHorizontalIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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

      <section className={cn('rounded-[32px] p-6', PLACES_MUTED_SURFACE_CLASS)}>
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sunshine-900">
            함께 보기
          </p>
          <h2
            className="font-editorial mt-2 text-2xl font-normal text-foreground"
            style={{
              fontFamily: 'var(--font-editorial)',
            }}
          >
            장소를 고른 뒤 바로 이어지는 도구와 혜택
          </h2>
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

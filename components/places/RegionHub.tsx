import Link from 'next/link';
import { Suspense } from 'react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  GiftIcon,
  MapPinIcon,
  WrenchIcon,
} from 'lucide-react';
import { PlacesFilteredGrid } from './PlacesFilteredGrid';
import {
  PLACES_MUTED_SURFACE_CLASS,
  PLACES_PANEL_CLASS,
  REGION_TONE_BY_SLUG,
  TONE_STYLES,
} from './place-theme';
import type { PlaceListPageResponse } from '@/lib/places';
import type { RegionConfig } from '@/lib/places/region-config';
import { cn } from '@/shared/ui/class-names';

interface RegionHubProps {
  region: RegionConfig;
  regions: RegionConfig[];
  placeCountByRegion: Record<string, number>;
  initialPage: PlaceListPageResponse;
}

export function RegionHub({
  region,
  regions,
  placeCountByRegion,
  initialPage,
}: RegionHubProps) {
  const tone = TONE_STYLES[REGION_TONE_BY_SLUG[region.slug]];
  const placeCount = initialPage.scopeTotal;
  const otherRegions = regions.filter(item => item.slug !== region.slug);

  return (
    <div className="space-y-10 sm:space-y-12">
      <section className={cn('rounded-[34px] p-6 sm:p-8', PLACES_PANEL_CLASS)}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <div className="space-y-4">
            <Link
              href="/places"
              className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-slate transition-colors hover:text-foreground"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              <span>전체 지역 보기</span>
            </Link>

            <div className="space-y-3">
              <div
                className={cn(
                  'inline-flex rounded-full border px-3.5 py-1.5 text-xs font-semibold',
                  tone.badge
                )}
              >
                {region.name} 나들이 장소 모음
              </div>
              <h1
                className="font-editorial text-[clamp(2rem,5vw,3.8rem)] font-normal leading-[1.08] text-foreground"
                style={{
                  fontFamily: 'var(--font-editorial)',
                }}
              >
                {region.name} 아이와 가볼 곳
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate sm:text-[15px]">
                {region.description} 연령·실내 여부·무료 조건으로 좁혀서 오늘 갈
                곳을 빠르게 골라보세요.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[24px] border border-beige-deep/60 bg-canvas/82 px-5 py-4 text-foreground shadow-card backdrop-blur">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-sunshine-900">
                정리된 장소
              </p>
              <p
                className="mt-2 text-3xl font-bold text-foreground"
                style={{
                  fontFamily: 'var(--font-editorial)',
                }}
              >
                {placeCount}곳
              </p>
              <p className="mt-1 text-xs leading-5 text-slate">
                현재 권역에서 바로 볼 수 있는 장소입니다.
              </p>
            </div>
            <div className="rounded-[24px] border border-sunshine-500/35 bg-[linear-gradient(180deg,var(--cream-soft),var(--cream))] px-5 py-4 text-foreground shadow-card">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-sunshine-900">
                찾는 순서
              </p>
              <p className="mt-2 text-lg font-bold text-foreground">
                {region.name} 안에서 조건 좁히기
              </p>
              <p className="mt-1 text-xs leading-5 text-slate">
                연령, 실내·야외, 무료 조건을 아래에서 조정하세요.
              </p>
            </div>
            <div
              className={cn(
                'rounded-[24px] border px-5 py-4 shadow-card',
                tone.frame
              )}
            >
              <p
                className={cn(
                  'text-[11px] font-semibold tracking-[0.16em]',
                  tone.eyebrow
                )}
              >
                방문 전 확인
              </p>
              <p className="mt-2 text-lg font-bold text-foreground">
                공식 링크로 운영정보 재확인
              </p>
              <p className="mt-1 text-xs leading-5 text-slate">
                요금, 휴무, 예약 여부는 방문 전 한 번 더 확인하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {otherRegions.length > 0 ? (
        <section className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">
                다른 권역 보기
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                주변 지역 장소도 바로 이동하세요
              </h2>
            </div>
            <Link
              href="/places"
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-hairline-strong bg-canvas/78 px-4 py-2 text-sm font-semibold text-slate transition-colors hover:text-foreground"
            >
              <span>전체 지역 보기</span>
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {otherRegions.map(otherRegion => {
              const otherTone =
                TONE_STYLES[REGION_TONE_BY_SLUG[otherRegion.slug]];
              const otherCount = placeCountByRegion[otherRegion.slug] ?? 0;

              return (
                <Link
                  key={otherRegion.slug}
                  href={`/places/${otherRegion.slug}`}
                  className={cn(
                    'group rounded-[22px] border p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-mockup',
                    otherTone.frame
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className={cn(
                          'text-[11px] font-semibold tracking-[0.16em]',
                          otherTone.eyebrow
                        )}
                      >
                        {otherCount > 0 ? `${otherCount}곳` : '준비 중'}
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-foreground">
                        {otherRegion.name}
                      </h3>
                    </div>
                    <div
                      className={cn(
                        'inline-flex h-9 w-9 items-center justify-center rounded-[14px]',
                        otherTone.iconWrap,
                        otherTone.icon
                      )}
                    >
                      <MapPinIcon className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {otherRegion.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground/70 transition-colors group-hover:text-foreground">
                    <span>{otherRegion.name} 장소 보기</span>
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      {placeCount > 0 ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-beige-deep/60 bg-canvas/80 px-4 py-2 text-sm font-medium text-slate">
              <MapPinIcon className="h-4 w-4" />
              <span>{region.name} 장소만 보기</span>
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
            <PlacesFilteredGrid
              initialPage={initialPage}
              regionSlug={region.slug}
            />
          </Suspense>
        </section>
      ) : (
        <div
          className={cn(
            'rounded-[28px] px-6 py-12 text-center',
            PLACES_MUTED_SURFACE_CLASS
          )}
        >
          <p
            className="font-editorial text-lg font-semibold text-foreground"
            style={{
              fontFamily: 'var(--font-editorial)',
            }}
          >
            이 지역의 장소 정보는 아직 준비 중입니다
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            다른 지역을 먼저 보거나, 곧 추가될 데이터를 기다려 주세요.
          </p>
        </div>
      )}

      <section className={cn('rounded-[32px] p-6', PLACES_MUTED_SURFACE_CLASS)}>
        <div className="mb-4">
          <h2
            className="font-editorial text-2xl font-normal text-foreground"
            style={{
              fontFamily: 'var(--font-editorial)',
            }}
          >
            장소를 정했다면 다음 단계로
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
                  입장료, 교통, 식사 비용을 더해 실제 외출 비용을 가늠합니다.
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
                  {region.name} 육아 혜택 확인
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  {region.name} 육아 가족을 위한 지역 지원 정책과 혜택을
                  확인해보세요.
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

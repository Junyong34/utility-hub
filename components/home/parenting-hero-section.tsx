import Link from 'next/link';
import { ArrowRightIcon, MapPinIcon, SearchIcon } from 'lucide-react';
import type { HomeFilterChip, HomeLinkCardItem } from '@/types/home';
import { cn } from '@/lib/utils';
import {
  CONDITION_BADGE_STYLES,
  FILTER_CHIP_STYLES,
  HOME_TONE_BY_ACCENT,
  PARENTING_PANEL_CLASS,
  PARENTING_SOFT_GRID_STYLE,
  PARENTING_TONE_STYLES,
} from '@/components/parenting-theme';

interface ParentingHeroSectionProps {
  regionLinks: HomeLinkCardItem[];
  scenarioLinks: HomeLinkCardItem[];
  quickFilters: HomeFilterChip[];
}

function getQuickFilterClass(filter: HomeFilterChip): string {
  if (filter.href.includes('free=')) {
    return CONDITION_BADGE_STYLES.free;
  }

  if (filter.href.includes('indoor=') || filter.href.includes('rain=')) {
    return CONDITION_BADGE_STYLES.rain;
  }

  if (filter.href.includes('age=')) {
    return CONDITION_BADGE_STYLES.age;
  }

  return FILTER_CHIP_STYLES.inactive;
}

export function ParentingHeroSection({
  regionLinks,
  scenarioLinks,
  quickFilters,
}: ParentingHeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-24 xl:pt-32">
      <div className="absolute inset-x-4 top-6 -z-10 h-[31rem] rounded-[36px] border border-hairline-soft bg-[linear-gradient(180deg,var(--cream-soft),var(--canvas))] shadow-card md:inset-x-6" />
      <div
        className="absolute inset-x-10 top-10 -z-10 h-[30rem] rounded-[30px] opacity-45"
        style={{
          backgroundImage: PARENTING_SOFT_GRID_STYLE,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="mx-auto max-w-screen-2xl px-4 pb-12 sm:pb-14">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-7">
          <div
            className={cn(
              'flex flex-col gap-4 rounded-[30px] p-5 sm:gap-5 sm:p-7',
              PARENTING_PANEL_CLASS
            )}
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-beige-deep bg-[linear-gradient(135deg,var(--cream),var(--cream-soft))] px-3 py-1.5 text-[11px] font-semibold tracking-[0.04em] text-slate shadow-subtle sm:gap-2.5 sm:py-2 sm:text-xs">
              <span
                className={cn(
                  'inline-flex h-6 w-6 items-center justify-center rounded-full shadow-subtle sm:h-7 sm:w-7',
                  PARENTING_TONE_STYLES.peach.iconWrap,
                  PARENTING_TONE_STYLES.peach.icon
                )}
              >
                <MapPinIcon className="h-3.5 w-3.5" />
              </span>
              <span>오늘 아이와 어디 갈지 고민될 때</span>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <h1
                className="font-editorial max-w-3xl text-[clamp(2.05rem,5vw,4.8rem)] font-normal leading-[1.06] text-foreground"
                style={{
                  fontFamily: 'var(--font-editorial)',
                }}
              >
                아이와 갈 곳,
                <br />
                조건별로 빠르게 찾으세요
              </h1>
              <p className="w-full max-w-[36rem] text-[13px] leading-6 text-slate sm:text-[15px] sm:leading-7">
                서울·경기·인천에서 아이와 함께 갈 수 있는 장소를
                지역·연령·날씨·예산에 맞게 추려드립니다. 오늘 갈 곳, 조건만
                고르면 바로 찾아요.
              </p>
            </div>

            <form
              action="/places"
              className="grid gap-2.5 rounded-lg border border-beige-deep bg-canvas/92 p-2.5 shadow-subtle sm:grid-cols-[1fr_auto] sm:gap-3 sm:p-3"
            >
              <div className="flex min-h-12 items-center gap-3 rounded-md bg-cream-soft px-3.5 sm:min-h-14 sm:px-4">
                <SearchIcon className="h-4 w-4 text-slate" />
                <input
                  readOnly
                  value="서울 실내 / 1~3세 / 무료 / 비 오는 날"
                  aria-label="장소 탐색 시작 예시"
                  className="h-full w-full border-none bg-transparent p-0 text-[13px] text-foreground outline-none sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 text-[13px] font-semibold text-primary-foreground transition-colors active:bg-primary-deep sm:min-h-14 sm:px-5 sm:text-sm"
              >
                <span>아이와 갈 곳 찾기</span>
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>

            <div className="flex flex-wrap gap-2">
              {quickFilters.map(filter => (
                <Link
                  key={filter.id}
                  href={filter.href}
                  className={cn(
                    'cursor-pointer rounded-md border px-3 py-1.5 text-[11px] font-medium transition-colors hover:border-primary/40 hover:text-foreground sm:px-3.5 sm:text-xs',
                    getQuickFilterClass(filter)
                  )}
                >
                  {filter.label}
                </Link>
              ))}
            </div>

            <div className="grid gap-2.5 border-t border-hairline-soft pt-3.5 text-[13px] text-slate sm:grid-cols-3 sm:gap-3 sm:pt-4 sm:text-sm">
              <div className="rounded-lg bg-cream px-3.5 py-3 sm:px-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sunshine-900">
                  지역부터
                </p>
                <p className="mt-1 leading-5 sm:leading-6">
                  가까운 지역부터 고르고, 필요한 조건만 더 좁혀보세요
                </p>
              </div>
              <div
                className={cn(
                  'rounded-lg px-3.5 py-3 sm:px-4',
                  PARENTING_TONE_STYLES.mint.softPanel
                )}
              >
                <p
                  className={cn(
                    'text-[11px] font-semibold uppercase tracking-[0.18em]',
                    PARENTING_TONE_STYLES.mint.eyebrow
                  )}
                >
                  상황별
                </p>
                <p className="mt-1 leading-5 sm:leading-6">
                  비 오는 날, 실내, 무료처럼 오늘 필요한 조건을 바로 고를 수
                  있어요
                </p>
              </div>
              <div
                className={cn(
                  'rounded-lg px-3.5 py-3 sm:px-4',
                  PARENTING_TONE_STYLES.peach.softPanel
                )}
              >
                <p
                  className={cn(
                    'text-[11px] font-semibold uppercase tracking-[0.18em]',
                    PARENTING_TONE_STYLES.peach.eyebrow
                  )}
                >
                  빠른 결정
                </p>
                <p className="mt-1 leading-5 sm:leading-6">
                  설명보다 바로 비교할 장소를 먼저 보여줘서 고르기 편합니다
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div
              className={cn('rounded-[30px] p-4 sm:p-5', PARENTING_PANEL_CLASS)}
            >
              <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sunshine-900">
                    지역별 바로가기
                  </p>
                  <h2
                    className="font-editorial mt-1.5 text-[1.35rem] font-normal text-foreground sm:mt-2 sm:text-2xl"
                    style={{
                      fontFamily: 'var(--font-editorial)',
                    }}
                  >
                    가까운 지역부터 고르기
                  </h2>
                </div>
                <div
                  className={cn(
                    'inline-flex h-10 w-10 items-center justify-center rounded-lg sm:h-11 sm:w-11',
                    PARENTING_TONE_STYLES.sand.iconWrap,
                    PARENTING_TONE_STYLES.sand.icon
                  )}
                >
                  <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {regionLinks.map(region => {
                  const tone =
                    PARENTING_TONE_STYLES[HOME_TONE_BY_ACCENT[region.tone]];
                  return (
                    <Link
                      key={region.id}
                      href={region.href}
                      className={cn(
                        'group cursor-pointer rounded-lg border p-3.5 transition-all hover:-translate-y-0.5 sm:p-4',
                        tone.frame
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5 sm:space-y-1">
                          <p
                            className={cn(
                              'text-[11px] font-semibold uppercase tracking-[0.2em]',
                              tone.eyebrow
                            )}
                          >
                            {region.eyebrow}
                          </p>
                          <p className="text-base font-semibold text-foreground sm:text-lg">
                            {region.title}
                          </p>
                        </div>
                        <span
                          className={cn(
                            'rounded-full border px-2.5 py-1 text-[11px] font-semibold sm:px-3',
                            tone.badge
                          )}
                        >
                          {region.countLabel}
                        </span>
                      </div>
                      <p className="mt-2.5 text-[13px] leading-5 text-muted-foreground sm:mt-3 sm:text-sm sm:leading-6">
                        {region.description}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-foreground/72 transition-colors group-hover:text-foreground sm:mt-4 sm:text-sm">
                        <span>{region.ctaLabel}</span>
                        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div
              className={cn('rounded-[30px] p-4 sm:p-5', PARENTING_PANEL_CLASS)}
            >
              <div className="mb-3 sm:mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate">
                  상황별 바로가기
                </p>
                <h2
                  className="font-editorial mt-1.5 text-[1.35rem] font-normal text-foreground sm:mt-2 sm:text-2xl"
                  style={{
                    fontFamily: 'var(--font-editorial)',
                  }}
                >
                  오늘 조건에 맞게 줄이기
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {scenarioLinks.map(scenario => {
                  const tone =
                    PARENTING_TONE_STYLES[HOME_TONE_BY_ACCENT[scenario.tone]];
                  return (
                    <Link
                      key={scenario.id}
                      href={scenario.href}
                      className={cn(
                        'group cursor-pointer flex min-h-24 flex-col justify-between rounded-lg border p-3.5 transition-all hover:-translate-y-0.5 sm:min-h-28 sm:p-4',
                        tone.frame
                      )}
                    >
                      <div className="space-y-1.5 sm:space-y-2">
                        <p
                          className={cn(
                            'text-[11px] font-semibold uppercase tracking-[0.2em]',
                            tone.eyebrow
                          )}
                        >
                          {scenario.eyebrow}
                        </p>
                        <p className="text-[15px] font-semibold text-foreground sm:text-base">
                          {scenario.title}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1 text-[13px] font-semibold text-foreground/70 transition-colors group-hover:text-foreground sm:text-sm">
                        <span>{scenario.ctaLabel}</span>
                        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRightIcon,
  CloudSunIcon,
  CompassIcon,
  MapPinIcon,
  SearchIcon,
} from 'lucide-react';
import type { HomeFilterChip, HomeLinkCardItem } from '@/types/home';
import { cn } from '@/lib/utils';
import {
  CONDITION_BADGE_STYLES,
  FILTER_CHIP_STYLES,
  HOME_TONE_BY_ACCENT,
  PARENTING_SOFT_GRID_STYLE,
  PARENTING_TONE_STYLES,
} from '@/components/parenting-theme';

interface ParentingHeroSectionProps {
  regionLinks: HomeLinkCardItem[];
  scenarioLinks: HomeLinkCardItem[];
  quickFilters: HomeFilterChip[];
}

const HERO_IMAGES = [
  {
    src: '/images/places/seoul-botanic-park.webp',
    alt: '서울식물원 실내 정원',
    title: '서울식물원',
    meta: '실내 정원 · 유모차 동선',
  },
  {
    src: '/images/places/national-children-museum.webp',
    alt: '국립어린이박물관 전시 공간',
    title: '국립어린이박물관',
    meta: '실내 · 전 연령',
  },
  {
    src: '/images/places/gyeonggi-children-museum.webp',
    alt: '경기도어린이박물관 체험 공간',
    title: '경기도어린이박물관',
    meta: '체험 · 우천 가능',
  },
] as const;

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
  const primaryRegions = regionLinks.slice(0, 4);
  const primaryScenarios = scenarioLinks.slice(0, 3);

  return (
    <section className="relative overflow-hidden px-4 pt-10 pb-[4.5rem] sm:pt-16 sm:pb-24 xl:pt-[6.5rem]">
      <div
        className="pointer-events-none absolute inset-x-4 top-8 -z-10 h-[38rem] rounded-[42px] opacity-55 sm:inset-x-8"
        style={{
          backgroundImage: PARENTING_SOFT_GRID_STYLE,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="mx-auto grid max-w-screen-2xl gap-12 xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] xl:items-center xl:gap-16">
        <div className="max-w-3xl space-y-8 xl:pb-10">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-beige-deep/70 bg-canvas/82 px-3 py-1.5 text-[11px] font-semibold tracking-[0.05em] text-slate shadow-subtle backdrop-blur sm:px-4 sm:py-2 sm:text-xs">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-cream text-sunshine-900">
              <MapPinIcon className="size-3.5" />
            </span>
            <span>서울·경기·인천 부모를 위한 나들이 지도</span>
          </div>

          <div className="space-y-5">
            <h1 className="text-[clamp(2.35rem,5.1vw,4.35rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
              <span className="block">아이와 갈 곳을</span>
              <span className="block">고르는 시간을 줄여요</span>
            </h1>
            <p className="max-w-[40rem] text-[15px] leading-7 text-slate sm:text-[17px] sm:leading-8">
              지역, 연령, 날씨, 예산처럼 부모가 실제로 고민하는 조건부터
              정리했습니다. 오늘의 기분과 아이 컨디션에 맞춰 갈 만한 곳만
              남겨보세요.
            </p>
          </div>

          <form
            action="/places"
            className="grid max-w-[44rem] gap-3 rounded-[22px] border border-beige-deep/70 bg-canvas/88 p-2.5 shadow-[0_24px_70px_-42px_rgba(61,48,39,0.5)] backdrop-blur sm:grid-cols-[1fr_auto] sm:p-3"
          >
            <label className="sr-only" htmlFor="home-place-search">
              장소 탐색 예시
            </label>
            <div className="flex min-h-[3.25rem] items-center gap-3 rounded-[16px] bg-cream-soft px-4 ring-1 ring-hairline-soft sm:min-h-[3.75rem]">
              <SearchIcon className="size-4 text-slate" />
              <input
                id="home-place-search"
                readOnly
                value="비 오는 날 · 1~3세 · 무료 · 실내"
                className="h-full w-full border-none bg-transparent p-0 text-[13px] font-medium text-foreground outline-none sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-[3.25rem] cursor-pointer items-center justify-center gap-2 rounded-[16px] bg-primary px-5 text-[13px] font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-deep active:translate-y-px sm:min-h-[3.75rem] sm:px-6 sm:text-sm"
            >
              <span>장소 찾기</span>
              <ArrowRightIcon className="size-4" />
            </button>
          </form>

          <div className="flex flex-wrap gap-2.5">
            {quickFilters.map(filter => (
              <Link
                key={filter.id}
                href={filter.href}
                rel={filter.href.includes('?') ? 'nofollow' : undefined}
                className={cn(
                  'cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-px hover:border-primary/40 hover:text-foreground active:translate-y-0',
                  getQuickFilterClass(filter)
                )}
              >
                {filter.label}
              </Link>
            ))}
          </div>

          <div className="grid max-w-2xl grid-cols-3 divide-x divide-hairline-soft border-y border-hairline-soft py-4 text-sm text-slate sm:py-5">
            <div className="pr-4">
              <p className="text-[1.55rem] font-semibold tracking-tight text-foreground sm:text-3xl">
                4개
              </p>
              <p className="mt-1 text-xs leading-5 sm:text-sm">수도권 권역</p>
            </div>
            <div className="px-4">
              <p className="text-[1.55rem] font-semibold tracking-tight text-foreground sm:text-3xl">
                7+
              </p>
              <p className="mt-1 text-xs leading-5 sm:text-sm">탐색 조건</p>
            </div>
            <div className="pl-4">
              <p className="text-[1.55rem] font-semibold tracking-tight text-foreground sm:text-3xl">
                공식
              </p>
              <p className="mt-1 text-xs leading-5 sm:text-sm">출처 중심</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[31rem] sm:min-h-[38rem] xl:min-h-[42rem]">
          <div className="parenting-breathe absolute top-0 right-0 left-[16%] overflow-hidden rounded-[38px] border border-white/40 bg-surface-code shadow-[0_34px_90px_-48px_rgba(61,48,39,0.7)]">
            <div className="relative h-[23rem] sm:h-[31rem] xl:h-[34rem]">
              <Image
                src={HERO_IMAGES[0].src}
                alt={HERO_IMAGES[0].alt}
                fill
                priority
                sizes="(max-width: 1280px) 84vw, 56vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(33,23,18,0.02),rgba(33,23,18,0.46))]" />
              <div className="absolute right-4 bottom-4 left-4 rounded-[24px] border border-white/18 bg-[rgba(255,250,240,0.82)] p-4 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-md sm:right-6 sm:bottom-6 sm:left-auto sm:w-72 sm:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sunshine-900">
                  오늘의 추천
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

          <div className="absolute top-[32%] left-0 w-[42%] overflow-hidden rounded-[30px] border border-white/50 bg-canvas shadow-[0_24px_64px_-42px_rgba(61,48,39,0.58)] sm:w-[38%]">
            <div className="relative aspect-[4/5]">
              <Image
                src={HERO_IMAGES[1].src}
                alt={HERO_IMAGES[1].alt}
                fill
                sizes="(max-width: 1280px) 38vw, 24vw"
                className="object-cover"
              />
            </div>
            <div className="p-3.5 sm:p-4">
              <p className="text-[11px] font-semibold text-sunshine-900">
                {HERO_IMAGES[1].meta}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground sm:text-base">
                {HERO_IMAGES[1].title}
              </p>
            </div>
          </div>

          <div className="absolute right-[4%] bottom-0 left-[10%] rounded-[30px] border border-hairline-soft bg-canvas/92 p-4 shadow-[0_26px_80px_-48px_rgba(61,48,39,0.6)] backdrop-blur sm:right-[12%] sm:left-[18%] sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate">
                  추천 흐름
                </p>
                <p className="mt-1 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                  가까운 권역부터 조건까지
                </p>
              </div>
              <CloudSunIcon className="size-5 text-sunshine-900" />
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {primaryScenarios.map(scenario => {
                const tone =
                  PARENTING_TONE_STYLES[HOME_TONE_BY_ACCENT[scenario.tone]];
                return (
                  <Link
                    key={scenario.id}
                    href={scenario.href}
                    rel={scenario.href.includes('?') ? 'nofollow' : undefined}
                    className={cn(
                      'group rounded-[18px] border px-3 py-2.5 transition-all duration-200 hover:-translate-y-px',
                      tone.frame
                    )}
                  >
                    <p
                      className={cn(
                        'text-[10px] font-semibold uppercase tracking-[0.16em]',
                        tone.eyebrow
                      )}
                    >
                      {scenario.eyebrow}
                    </p>
                    <p className="mt-1 text-[13px] font-semibold text-foreground">
                      {scenario.title}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="absolute top-5 right-6 hidden rounded-full border border-white/40 bg-canvas/78 px-3 py-2 text-xs font-semibold text-slate shadow-subtle backdrop-blur sm:inline-flex sm:items-center sm:gap-2">
            <CompassIcon className="size-3.5 text-sunshine-900" />
            <span>조건에 맞는 후보만 보기</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-screen-2xl gap-3 border-t border-hairline-soft pt-5 sm:grid-cols-2 lg:grid-cols-4 xl:mt-2">
        {primaryRegions.map(region => {
          const tone = PARENTING_TONE_STYLES[HOME_TONE_BY_ACCENT[region.tone]];
          return (
            <Link
              key={region.id}
              href={region.href}
              className="group flex items-center justify-between gap-4 rounded-[22px] px-3 py-3 transition-colors hover:bg-canvas/70"
            >
              <div className="min-w-0">
                <p
                  className={cn(
                    'text-[11px] font-semibold uppercase tracking-[0.18em]',
                    tone.eyebrow
                  )}
                >
                  {region.eyebrow}
                </p>
                <p className="mt-1 truncate text-base font-semibold text-foreground">
                  {region.title}
                </p>
              </div>
              <span
                className={cn(
                  'shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold',
                  tone.badge
                )}
              >
                {region.countLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

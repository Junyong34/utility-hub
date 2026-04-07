import Link from 'next/link';
import {
  ArrowRightIcon,
  MapPinIcon,
  SearchIcon,
  SparklesIcon,
} from 'lucide-react';
import type {
  HomeFilterChip,
  HomeLinkCardItem,
  HomeAccentTone,
} from '@/types/home';
import { cn } from '@/lib/utils';

const TONE_STYLES: Record<
  HomeAccentTone,
  {
    border: string;
    bg: string;
    text: string;
    badge: string;
  }
> = {
  olive: {
    border: 'border-[#cfd8c6]',
    bg: 'bg-[#eef3e8]',
    text: 'text-[#4f6247]',
    badge: 'bg-[#eff4e9] text-[#4f6247]',
  },
  sand: {
    border: 'border-[#e4d6c1]',
    bg: 'bg-[#f5ebd8]',
    text: 'text-[#825f38]',
    badge: 'bg-[#f8efdf] text-[#825f38]',
  },
  brick: {
    border: 'border-[#e7d1c8]',
    bg: 'bg-[#f4e1db]',
    text: 'text-[#885548]',
    badge: 'bg-[#f7e7e2] text-[#885548]',
  },
  sky: {
    border: 'border-[#d1dce9]',
    bg: 'bg-[#e5edf6]',
    text: 'text-[#4d6684]',
    badge: 'bg-[#eaf0f7] text-[#4d6684]',
  },
};

interface ParentingHeroSectionProps {
  regionLinks: HomeLinkCardItem[];
  scenarioLinks: HomeLinkCardItem[];
  quickFilters: HomeFilterChip[];
}

export function ParentingHeroSection({
  regionLinks,
  scenarioLinks,
  quickFilters,
}: ParentingHeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-10 md:pt-24 xl:pt-32">
      <div className="absolute inset-x-4 top-6 -z-10 h-[31rem] rounded-[36px] border border-[#ede4d7] bg-[linear-gradient(180deg,rgba(251,247,239,0.98),rgba(245,239,229,0.96))] shadow-[0_35px_90px_rgba(72,57,38,0.08)] md:inset-x-6" />
      <div
        className="absolute inset-x-10 top-10 -z-10 h-[30rem] rounded-[30px] bg-[linear-gradient(90deg,rgba(120,97,61,0.06)_1px,transparent_1px),linear-gradient(rgba(120,97,61,0.06)_1px,transparent_1px)] opacity-45"
        style={{ backgroundSize: '28px 28px' }}
      />

      <div className="mx-auto max-w-screen-2xl px-4 pb-14">
        <div className="grid gap-7 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="flex flex-col gap-5 rounded-[32px] border border-[#eadfce] bg-[rgba(255,252,246,0.86)] p-6 shadow-[0_18px_55px_rgba(63,50,34,0.08)] sm:p-7">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ddd2c2] bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.04em] text-[#6b5b48]">
              <SparklesIcon className="h-3.5 w-3.5 text-[#55715d]" />
              <span>수도권 주말 계획, 장소부터 빠르게</span>
            </div>

            <div className="space-y-3">
              <h1
                className="max-w-3xl text-[clamp(2.3rem,5vw,4.8rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#27231d]"
                style={{
                  fontFamily:
                    '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                }}
              >
                아이와 갈 곳,
                <br />
                조건별로 빠르게 찾으세요
              </h1>
              <p className="max-w-xl text-sm leading-7 text-[#645849] sm:text-[15px]">
                서울, 경기, 인천에서 지역과 연령, 날씨, 예산 기준으로 바로
                들어갈 수 있게 정리했습니다. 브랜드 설명보다 첫 선택이 먼저
                보이도록 만든 홈입니다.
              </p>
            </div>

            <form
              action="/places"
              className="grid gap-3 rounded-[26px] border border-[#e6d8c3] bg-[rgba(255,255,255,0.92)] p-3 shadow-[0_12px_28px_rgba(91,70,43,0.06)] sm:grid-cols-[1fr_auto]"
            >
              <div className="flex min-h-14 items-center gap-3 rounded-[20px] bg-[#f8f2e8] px-4">
                <SearchIcon className="h-4 w-4 text-[#6c5e4b]" />
                <input
                  readOnly
                  value="서울 실내 무료 / 1~3세 / 비 오는 날"
                  aria-label="장소 탐색 시작 예시"
                  className="h-full w-full border-none bg-transparent p-0 text-sm text-[#3c352c] outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[20px] bg-[#4c6651] px-5 text-sm font-semibold text-[#f7f4ee] transition-colors hover:bg-[#405845]"
              >
                <span>장소 탐색 시작</span>
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>

            <div className="flex flex-wrap gap-2">
              {quickFilters.map(filter => (
                <Link
                  key={filter.id}
                  href={filter.href}
                  className="rounded-full border border-[#ddd2c2] bg-white/80 px-3.5 py-1.5 text-xs font-medium text-[#5f5547] transition-colors hover:border-[#bfa88b] hover:text-[#2f2922]"
                >
                  {filter.label}
                </Link>
              ))}
            </div>

            <div className="grid gap-3 border-t border-[#ebdfd2] pt-4 text-sm text-[#5b4f41] sm:grid-cols-3">
              <div className="rounded-[20px] bg-[#f7f0e4] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f7550]">
                  Region First
                </p>
                <p className="mt-1 leading-6">
                  지역을 먼저 고른 뒤 세부 조건을 줄이는 흐름
                </p>
              </div>
              <div className="rounded-[20px] bg-[#eef4e8] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5d6c54]">
                  Quick Filters
                </p>
                <p className="mt-1 leading-6">
                  비 오는 날, 무료, 실내 같은 현실 조건을 바로 반영
                </p>
              </div>
              <div className="rounded-[20px] bg-[#f4e7df] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a5b4a]">
                  No Fluff
                </p>
                <p className="mt-1 leading-6">
                  감성 소개보다 바로 눌러볼 수 있는 선택지를 먼저 배치
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[32px] border border-[#e5d8c2] bg-[rgba(255,250,243,0.9)] p-5 shadow-[0_18px_55px_rgba(63,50,34,0.07)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#745e3e]">
                    Region Board
                  </p>
                  <h2
                    className="mt-2 text-2xl font-semibold tracking-tight text-[#2a261f]"
                    style={{
                      fontFamily:
                        '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                    }}
                  >
                    지역부터 바로 고르기
                  </h2>
                </div>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f2e4cf] text-[#81623e]">
                  <MapPinIcon className="h-5 w-5" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {regionLinks.map(region => {
                  const tone = TONE_STYLES[region.tone];
                  return (
                    <Link
                      key={region.id}
                      href={region.href}
                      className={cn(
                        'group rounded-[24px] border p-4 transition-all hover:-translate-y-0.5',
                        tone.border,
                        'bg-white/75 hover:bg-white'
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p
                            className={cn(
                              'text-[11px] font-semibold uppercase tracking-[0.2em]',
                              tone.text
                            )}
                          >
                            {region.eyebrow}
                          </p>
                          <p className="text-lg font-semibold tracking-tight text-foreground">
                            {region.title}
                          </p>
                        </div>
                        <span
                          className={cn(
                            'rounded-full px-3 py-1 text-[11px] font-semibold',
                            tone.badge
                          )}
                        >
                          {region.countLabel}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {region.description}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground/72 transition-colors group-hover:text-foreground">
                        <span>{region.ctaLabel}</span>
                        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[32px] border border-[#e7dccf] bg-[rgba(255,252,246,0.88)] p-5 shadow-[0_18px_55px_rgba(63,50,34,0.07)]">
              <div className="mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6c5c46]">
                  Situation Shortcuts
                </p>
                <h2
                  className="mt-2 text-2xl font-semibold tracking-tight text-[#2a261f]"
                  style={{
                    fontFamily:
                      '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                  }}
                >
                  조건으로 바로 줄이기
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {scenarioLinks.map(scenario => {
                  const tone = TONE_STYLES[scenario.tone];
                  return (
                    <Link
                      key={scenario.id}
                      href={scenario.href}
                      className={cn(
                        'group flex min-h-28 flex-col justify-between rounded-[24px] border p-4 transition-all hover:-translate-y-0.5',
                        tone.border,
                        tone.bg
                      )}
                    >
                      <div className="space-y-2">
                        <p
                          className={cn(
                            'text-[11px] font-semibold uppercase tracking-[0.2em]',
                            tone.text
                          )}
                        >
                          {scenario.eyebrow}
                        </p>
                        <p className="text-base font-semibold tracking-tight text-foreground">
                          {scenario.title}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1 text-sm font-semibold text-foreground/70 transition-colors group-hover:text-foreground">
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

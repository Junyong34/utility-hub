import Link from 'next/link';
import {
  ArrowRightIcon,
  MapPinIcon,
  SearchIcon,
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
    <section className="relative overflow-hidden pt-8 md:pt-24 xl:pt-32">
      <div className="absolute inset-x-4 top-6 -z-10 h-[31rem] rounded-[36px] border border-[#ede4d7] bg-[linear-gradient(180deg,rgba(251,247,239,0.98),rgba(245,239,229,0.96))] shadow-[0_35px_90px_rgba(72,57,38,0.08)] md:inset-x-6" />
      <div
        className="absolute inset-x-10 top-10 -z-10 h-[30rem] rounded-[30px] bg-[linear-gradient(90deg,rgba(120,97,61,0.06)_1px,transparent_1px),linear-gradient(rgba(120,97,61,0.06)_1px,transparent_1px)] opacity-45"
        style={{ backgroundSize: '28px 28px' }}
      />

      <div className="mx-auto max-w-screen-2xl px-4 pb-12 sm:pb-14">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-7">
          <div className="flex flex-col gap-4 rounded-[32px] border border-[#eadfce] bg-[rgba(255,252,246,0.86)] p-5 shadow-[0_18px_55px_rgba(63,50,34,0.08)] sm:gap-5 sm:p-7">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d7c29f] bg-[linear-gradient(135deg,rgba(248,224,183,0.95),rgba(232,242,226,0.98))] px-3 py-1.5 text-[11px] font-semibold tracking-[0.04em] text-[#5f4b35] shadow-[0_12px_30px_rgba(98,76,46,0.14)] sm:gap-2.5 sm:py-2 sm:text-xs">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#4c6651] text-[#f8f3ea] shadow-[0_8px_18px_rgba(76,102,81,0.24)] sm:h-7 sm:w-7">
                <MapPinIcon className="h-3.5 w-3.5" />
              </span>
              <span>오늘 아이와 어디 갈지 고민될 때</span>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <h1
                className="max-w-3xl text-[clamp(2.05rem,5vw,4.8rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[#27231d]"
                style={{
                  fontFamily:
                    '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                }}
              >
                아이와 갈 곳,
                <br />
                조건별로 빠르게 찾으세요
              </h1>
              <p className="max-w-xl text-[13px] leading-6 text-[#645849] sm:text-[15px] sm:leading-7">
                서울, 경기, 인천에서 지역과 연령, 날씨, 예산에 맞는 장소만
                먼저 보여줍니다. 실내, 무료, 비 오는 날 같은 조건으로 바로
                좁혀서 오늘 갈 곳을 빠르게 정해보세요.
              </p>
            </div>

            <form
              action="/places"
              className="grid gap-2.5 rounded-[24px] border border-[#e6d8c3] bg-[rgba(255,255,255,0.92)] p-2.5 shadow-[0_12px_28px_rgba(91,70,43,0.06)] sm:grid-cols-[1fr_auto] sm:gap-3 sm:rounded-[26px] sm:p-3"
            >
              <div className="flex min-h-12 items-center gap-3 rounded-[18px] bg-[#f8f2e8] px-3.5 sm:min-h-14 sm:rounded-[20px] sm:px-4">
                <SearchIcon className="h-4 w-4 text-[#6c5e4b]" />
                <input
                  readOnly
                  value="서울 실내 / 1~3세 / 무료 / 비 오는 날"
                  aria-label="장소 탐색 시작 예시"
                  className="h-full w-full border-none bg-transparent p-0 text-[13px] text-[#3c352c] outline-none sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-[18px] bg-[#4c6651] px-4 text-[13px] font-semibold text-[#f7f4ee] transition-colors hover:bg-[#405845] sm:min-h-14 sm:rounded-[20px] sm:px-5 sm:text-sm"
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
                  className="cursor-pointer rounded-full border border-[#ddd2c2] bg-white/80 px-3 py-1.5 text-[11px] font-medium text-[#5f5547] transition-colors hover:border-[#bfa88b] hover:text-[#2f2922] sm:px-3.5 sm:text-xs"
                >
                  {filter.label}
                </Link>
              ))}
            </div>

            <div className="grid gap-2.5 border-t border-[#ebdfd2] pt-3.5 text-[13px] text-[#5b4f41] sm:grid-cols-3 sm:gap-3 sm:pt-4 sm:text-sm">
              <div className="rounded-[18px] bg-[#f7f0e4] px-3.5 py-3 sm:rounded-[20px] sm:px-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f7550]">
                  지역부터
                </p>
                <p className="mt-1 leading-5 sm:leading-6">
                  가까운 지역부터 고르고, 필요한 조건만 더 좁혀보세요
                </p>
              </div>
              <div className="rounded-[18px] bg-[#eef4e8] px-3.5 py-3 sm:rounded-[20px] sm:px-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5d6c54]">
                  상황별
                </p>
                <p className="mt-1 leading-5 sm:leading-6">
                  비 오는 날, 실내, 무료처럼 오늘 필요한 조건을 바로 고를 수 있어요
                </p>
              </div>
              <div className="rounded-[18px] bg-[#f4e7df] px-3.5 py-3 sm:rounded-[20px] sm:px-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a5b4a]">
                  빠른 결정
                </p>
                <p className="mt-1 leading-5 sm:leading-6">
                  설명보다 바로 비교할 장소를 먼저 보여줘서 고르기 편합니다
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[32px] border border-[#e5d8c2] bg-[rgba(255,250,243,0.9)] p-4 shadow-[0_18px_55px_rgba(63,50,34,0.07)] sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#745e3e]">
                    지역별 바로가기
                  </p>
                  <h2
                    className="mt-1.5 text-[1.35rem] font-semibold tracking-tight text-[#2a261f] sm:mt-2 sm:text-2xl"
                    style={{
                      fontFamily:
                        '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                    }}
                  >
                    가까운 지역부터 고르기
                  </h2>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f2e4cf] text-[#81623e] sm:h-11 sm:w-11">
                  <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {regionLinks.map(region => {
                  const tone = TONE_STYLES[region.tone];
                  return (
                    <Link
                      key={region.id}
                      href={region.href}
                      className={cn(
                        'group cursor-pointer rounded-[22px] border p-3.5 transition-all hover:-translate-y-0.5 sm:rounded-[24px] sm:p-4',
                        tone.border,
                        tone.bg
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5 sm:space-y-1">
                          <p
                            className={cn(
                              'text-[11px] font-semibold uppercase tracking-[0.2em]',
                              tone.text
                            )}
                          >
                            {region.eyebrow}
                          </p>
                          <p className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                            {region.title}
                          </p>
                        </div>
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-1 text-[11px] font-semibold sm:px-3',
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

            <div className="rounded-[32px] border border-[#e7dccf] bg-[rgba(255,252,246,0.88)] p-4 shadow-[0_18px_55px_rgba(63,50,34,0.07)] sm:p-5">
              <div className="mb-3 sm:mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6c5c46]">
                  상황별 바로가기
                </p>
                <h2
                  className="mt-1.5 text-[1.35rem] font-semibold tracking-tight text-[#2a261f] sm:mt-2 sm:text-2xl"
                  style={{
                    fontFamily:
                      '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                  }}
                >
                  오늘 조건에 맞게 줄이기
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {scenarioLinks.map(scenario => {
                  const tone = TONE_STYLES[scenario.tone];
                  return (
                    <Link
                      key={scenario.id}
                      href={scenario.href}
                      className={cn(
                        'group cursor-pointer flex min-h-24 flex-col justify-between rounded-[22px] border p-3.5 transition-all hover:-translate-y-0.5 sm:min-h-28 sm:rounded-[24px] sm:p-4',
                        tone.border,
                        tone.bg
                      )}
                    >
                      <div className="space-y-1.5 sm:space-y-2">
                        <p
                          className={cn(
                            'text-[11px] font-semibold uppercase tracking-[0.2em]',
                            tone.text
                          )}
                        >
                          {scenario.eyebrow}
                        </p>
                        <p className="text-[15px] font-semibold tracking-tight text-foreground sm:text-base">
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

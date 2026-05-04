import type { ElementType } from 'react';
import Link from 'next/link';
import {
  ArrowRightIcon,
  BuildingIcon,
  ExternalLinkIcon,
  GiftIcon,
  MapPinIcon,
  PiggyBankIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import {
  BENEFIT_CATEGORIES,
  OFFICIAL_BENEFIT_SOURCES,
} from '@/lib/benefits/config';
import { cn } from '@/lib/utils';

const CATEGORY_ICONS: Record<string, ElementType> = {
  building: BuildingIcon,
  'map-pin': MapPinIcon,
  'piggy-bank': PiggyBankIcon,
};

const CATEGORY_STYLES: Record<
  string,
  {
    frame: string;
    accent: string;
    iconWrap: string;
    icon: string;
    badge: string;
    eyebrow: string;
  }
> = {
  government: {
    frame:
      'border-[#d3dbe6] bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,249,0.96))] hover:border-[#9fb7d6]',
    accent: 'from-[#e3ebf5] to-[#ccdbeb]',
    iconWrap: 'bg-[#e7eef7]',
    icon: 'text-[#49627d]',
    badge: 'bg-[#e7eef7] text-[#49627d]',
    eyebrow: 'text-[#506884]',
  },
  regional: {
    frame:
      'border-[#d8dece] bg-[linear-gradient(180deg,rgba(250,251,246,0.96),rgba(244,246,238,0.96))] hover:border-[#9faf8d]',
    accent: 'from-[#edf2e5] to-[#d9e4cf]',
    iconWrap: 'bg-[#eff4e9]',
    icon: 'text-[#4f6247]',
    badge: 'bg-[#eef3e7] text-[#526049]',
    eyebrow: 'text-[#5d6c54]',
  },
  savings: {
    frame:
      'border-[#e7d2ca] bg-[linear-gradient(180deg,rgba(252,247,244,0.98),rgba(247,238,233,0.96))] hover:border-[#d09d8b]',
    accent: 'from-[#f4ddd4] to-[#efc9bc]',
    iconWrap: 'bg-[#f7e2dc]',
    icon: 'text-[#8a5446]',
    badge: 'bg-[#f7e2dc] text-[#8a5446]',
    eyebrow: 'text-[#8e5a4c]',
  },
};

export function BenefitsHub() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <section className="relative overflow-hidden rounded-[34px] border border-[#e8dcc8] bg-[linear-gradient(180deg,rgba(252,249,243,0.98),rgba(248,241,230,0.96))] p-6 shadow-[0_20px_60px_rgba(60,47,31,0.08)] sm:p-8">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(121, 101, 76, 0.05) 1px, transparent 1px), linear-gradient(rgba(121, 101, 76, 0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative grid gap-6 xl:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
          <div className="space-y-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ddd2c2] bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.04em] text-[#6b5b48]">
              <ShieldCheckIcon className="h-3.5 w-3.5 text-[#55715d]" />
              <span>공식 출처 중심 · 지원 정책 정리</span>
            </div>

            <div className="space-y-3">
              <h1
                className="text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#27231d]"
                style={{
                  fontFamily:
                    '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                }}
              >
                육아 혜택,
                <br />
                출처와 기준일을 함께 보세요
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-[#645849] sm:text-[15px]">
                장소를 고른 뒤 실제 비용과 지원을 같이 판단할 수 있도록 정부
                지원, 지역 혜택, 절약 가이드를 한 화면에 모았습니다. 자극적인
                카피 대신 출처와 업데이트 기준이 먼저 보이게 설계합니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <span className="rounded-full border border-[#e1d4c0] bg-white/75 px-3.5 py-1.5 text-xs font-medium text-[#665848]">
                정부 지원
              </span>
              <span className="rounded-full border border-[#e1d4c0] bg-white/75 px-3.5 py-1.5 text-xs font-medium text-[#665848]">
                지역 혜택
              </span>
              <span className="rounded-full border border-[#e1d4c0] bg-white/75 px-3.5 py-1.5 text-xs font-medium text-[#665848]">
                절약 가이드
              </span>
              <span className="rounded-full border border-[#e1d4c0] bg-white/75 px-3.5 py-1.5 text-xs font-medium text-[#665848]">
                정부24
              </span>
              <span className="rounded-full border border-[#e1d4c0] bg-white/75 px-3.5 py-1.5 text-xs font-medium text-[#665848]">
                복지로
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-[24px] bg-[#e7eef7] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#506884]">
                판단 방식
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-[#2d271f]">
                지원 내용보다 출처가 먼저
              </p>
              <p className="mt-1 text-sm leading-6 text-[#6a5c49]">
                제도는 자주 바뀌니 내용만 보고 끝내지 않고 기준일과 공식 링크를
                같이 봅니다.
              </p>
            </div>
            <div className="rounded-[24px] bg-[#eef4e8] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5d6c54]">
                지역성
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-[#2d271f]">
                서울·경기 생활권 기준
              </p>
              <p className="mt-1 text-sm leading-6 text-[#6a5c49]">
                홈과 places 흐름을 이어받아 수도권 부모가 실제로 자주 찾는
                혜택부터 정리합니다.
              </p>
            </div>
            <div className="rounded-[24px] bg-[#f4e7df] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a5b4a]">
                연결 축
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-[#2d271f]">
                장소와 도구 다음 단계
              </p>
              <p className="mt-1 text-sm leading-6 text-[#6a5c49]">
                장소 탐색을 방해하지 않으면서, 필요할 때 바로 이어서 판단할 수
                있게 배치합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
            주제별 탐색
          </p>
          <h2
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem]"
            style={{
              fontFamily:
                '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
            }}
          >
            어떤 혜택을 찾는지부터 먼저 고르기
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {BENEFIT_CATEGORIES.map(category => {
            const Icon = CATEGORY_ICONS[category.icon] ?? BuildingIcon;
            const tone = CATEGORY_STYLES[category.id];

            return (
              <Link
                key={category.id}
                href={`/blog?tag=${category.id}`}
                className={cn(
                  'group relative overflow-hidden rounded-[28px] border p-5 shadow-[0_18px_45px_rgba(56,46,33,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(56,46,33,0.1)]',
                  tone.frame
                )}
              >
                <div
                  className={cn(
                    'rounded-[22px] bg-gradient-to-b p-4',
                    tone.accent
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={cn(
                        'inline-flex h-11 w-11 items-center justify-center rounded-2xl',
                        tone.iconWrap
                      )}
                    >
                      <Icon className={cn('h-5 w-5', tone.icon)} />
                    </div>
                    <span
                      className={cn(
                        'inline-flex rounded-full px-3 py-1 text-[11px] font-semibold',
                        tone.badge
                      )}
                    >
                      바로가기
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <p
                      className={cn(
                        'text-[11px] font-semibold uppercase tracking-[0.2em]',
                        tone.eyebrow
                      )}
                    >
                      혜택·지원금
                    </p>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {category.name}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 flex h-full flex-col gap-4">
                  <p className="text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>
                  <div className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-foreground/72 transition-colors group-hover:text-foreground">
                    <span>관련 글 보기</span>
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="rounded-[32px] border border-[#e8ddcf] bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(248,242,232,0.96))] p-6 shadow-[0_18px_45px_rgba(59,46,31,0.05)]">
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#745e3e]">
            정보 출처 안내
          </p>
          <h2
            className="mt-2 text-2xl font-semibold tracking-tight text-[#2d271f]"
            style={{
              fontFamily:
                '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
            }}
          >
            혜택 정보는 공식 링크와 함께 봅니다
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6a5d4d]">
            정부 지원과 지역 정책은 조건과 시행 시점이 자주 바뀝니다. 이
            페이지는 아래 공식 출처를 기준으로 작성하고, 변경 가능성을 항상
            전제로 둡니다.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {OFFICIAL_BENEFIT_SOURCES.map(source => (
            <Link
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#ddd3c5] bg-white/80 px-3.5 py-1.5 text-sm font-medium text-[#6a5d4d] transition-colors hover:border-[#bda78a] hover:text-[#2f2922]"
            >
              <span>{source.name}</span>
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-[#e8ddcf] bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(248,242,232,0.96))] p-6 text-center shadow-[0_18px_45px_rgba(59,46,31,0.05)]">
        <div className="mx-auto max-w-2xl space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7e2dc] text-[#8a5446]">
            <GiftIcon className="h-6 w-6" />
          </div>
          <h2
            className="text-2xl font-semibold tracking-tight text-[#2d271f]"
            style={{
              fontFamily:
                '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
            }}
          >
            아직 정리 중인 혜택도 많습니다
          </h2>
          <p className="text-sm leading-6 text-[#6a5d4d]">
            카테고리별 는 먼저 열어두고, 세부 글과 검증 기준은 순차적으로
            보강하는 단계입니다. 준비 중인 내용은 블로그에서 먼저 확인할 수
            있습니다.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#4c6651] px-5 py-2.5 text-sm font-semibold text-[#f7f4ee] transition-colors hover:bg-[#405845]"
          >
            <span>블로그에서 먼저 확인하기</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

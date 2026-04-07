import Link from 'next/link';
import {
  ArrowRightIcon,
  GiftIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  WrenchIcon,
} from 'lucide-react';
import { RegionCard } from './RegionCard';
import { PlacesFilteredGrid } from './PlacesFilteredGrid';
import type { RegionConfig } from '@/lib/places/region-config';
import type { PlaceSource } from '@/types/place-source';

interface PlacesHubProps {
  regions: RegionConfig[];
  placeCountByRegion: Record<string, number>;
  allPlaces: PlaceSource[];
}

export function PlacesHub({
  regions,
  placeCountByRegion,
  allPlaces,
}: PlacesHubProps) {
  const totalPlaceCount = allPlaces.length;

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
              <span>수도권 중심 · 공식 소스 검증</span>
            </div>

            <div className="space-y-3">
              <h1
                className="text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#27231d]"
                style={{
                  fontFamily:
                    '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                }}
              >
                아이와 가볼 곳,
                <br />
                지역과 조건으로 바로 줄이세요
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-[#645849] sm:text-[15px]">
                홈에서 고른 흐름을 그대로 이어받아, 여기서는 지역과 필터를
                더 세밀하게 줄입니다. 감성 큐레이션보다 지금 바로 갈 수 있는
                장소 선택이 먼저 보이도록 만들었습니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <span className="rounded-full border border-[#e1d4c0] bg-white/75 px-3.5 py-1.5 text-xs font-medium text-[#665848]">
                서울
              </span>
              <span className="rounded-full border border-[#e1d4c0] bg-white/75 px-3.5 py-1.5 text-xs font-medium text-[#665848]">
                경기 남부
              </span>
              <span className="rounded-full border border-[#e1d4c0] bg-white/75 px-3.5 py-1.5 text-xs font-medium text-[#665848]">
                경기 북부
              </span>
              <span className="rounded-full border border-[#e1d4c0] bg-white/75 px-3.5 py-1.5 text-xs font-medium text-[#665848]">
                인천
              </span>
              <span className="rounded-full border border-[#e1d4c0] bg-white/75 px-3.5 py-1.5 text-xs font-medium text-[#665848]">
                실내
              </span>
              <span className="rounded-full border border-[#e1d4c0] bg-white/75 px-3.5 py-1.5 text-xs font-medium text-[#665848]">
                무료
              </span>
              <span className="rounded-full border border-[#e1d4c0] bg-white/75 px-3.5 py-1.5 text-xs font-medium text-[#665848]">
                비 오는 날
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-[24px] bg-[#f7f0e4] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f7550]">
                정리된 장소
              </p>
              <p
                className="mt-2 text-3xl font-semibold tracking-tight text-[#2d271f]"
                style={{
                  fontFamily:
                    '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                }}
              >
                {totalPlaceCount}곳
              </p>
              <p className="mt-1 text-sm leading-6 text-[#6a5c49]">
                지금 바로 필터로 줄일 수 있는 발행 가능 장소 기준입니다.
              </p>
            </div>
            <div className="rounded-[24px] bg-[#eef4e8] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5d6c54]">
                탐색 방식
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-[#2d271f]">
                지역 먼저, 조건은 그 다음
              </p>
              <p className="mt-1 text-sm leading-6 text-[#6a5c49]">
                홈과 같은 흐름입니다. 먼저 권역을 고르고 세부 조건을 덧씌웁니다.
              </p>
            </div>
            <div className="rounded-[24px] bg-[#f4e7df] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a5b4a]">
                신뢰 기준
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-[#2d271f]">
                공식·준공식 검증 중심
              </p>
              <p className="mt-1 text-sm leading-6 text-[#6a5c49]">
                운영시간과 가격은 변동 가능성이 커서 출처와 검증일을 함께 봅니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
              지역별 탐색
            </p>
            <div className="space-y-2">
              <h2
                className="text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem]"
                style={{
                  fontFamily:
                    '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                }}
              >
                먼저 권역부터 좁혀보세요
              </h2>
              <p className="text-sm leading-6 text-muted-foreground sm:text-[15px]">
                지역 카드의 색과 톤을 홈과 맞췄습니다. 각 지역의 성격과 현재
                정리 수를 함께 보여줘서 다음 클릭을 빠르게 돕습니다.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {regions.map(region => (
            <RegionCard
              key={region.slug}
              region={region}
              placeCount={placeCountByRegion[region.slug] ?? 0}
            />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
              조건별 탐색
            </p>
            <div className="space-y-2">
              <h2
                className="text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem]"
                style={{
                  fontFamily:
                    '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                }}
              >
                여기서 더 세밀하게 줄이면 됩니다
              </h2>
              <p className="text-sm leading-6 text-muted-foreground sm:text-[15px]">
                필터 보드는 홈의 빠른 버튼과 같은 색 체계를 이어받습니다. 지역을
                고른 뒤에는 연령, 실내·야외, 무료 여부로 더 좁히는 흐름입니다.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5d9c8] bg-white/70 px-4 py-2 text-sm font-medium text-[#6e604d]">
            <SlidersHorizontalIcon className="h-4 w-4" />
            <span>필터는 URL과 동기화</span>
          </div>
        </div>

        <PlacesFilteredGrid places={allPlaces} />
      </section>

      <section className="rounded-[32px] border border-[#e8ddcf] bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(248,242,232,0.96))] p-6 shadow-[0_18px_45px_rgba(59,46,31,0.05)]">
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#745e3e]">
            함께 보기
          </p>
          <h2
            className="mt-2 text-2xl font-semibold tracking-tight text-[#2d271f]"
            style={{
              fontFamily:
                '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
            }}
          >
            장소를 고른 뒤 바로 이어지는 도구와 혜택
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/tools"
            className="group cursor-pointer rounded-[24px] border border-[#d3dbe6] bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,249,0.96))] p-5 transition-all hover:-translate-y-0.5 hover:border-[#9fb7d6]"
          >
            <div className="flex items-start gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e7eef7] text-[#49627d]">
                <WrenchIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#506884]">
                  도구
                </p>
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  나들이 예산 계산기
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  입장료, 교통, 식사 비용을 한 번에 정리해 실제 부담을 가늠합니다.
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
            className="group cursor-pointer rounded-[24px] border border-[#e7d2ca] bg-[linear-gradient(180deg,rgba(252,247,245,0.98),rgba(247,238,233,0.96))] p-5 transition-all hover:-translate-y-0.5 hover:border-[#d09d8b]"
          >
            <div className="flex items-start gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f7e2dc] text-[#8a5446]">
                <GiftIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8e5a4c]">
                  혜택·지원금
                </p>
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  지역별 육아 혜택 확인
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  부모급여, 아동수당, 지역 지원 정책을 장소 탐색 흐름 아래에서 바로 이어봅니다.
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

import Link from 'next/link';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  GiftIcon,
  MapPinIcon,
  WrenchIcon,
} from 'lucide-react';
import { PlacesFilteredGrid } from './PlacesFilteredGrid';
import type { RegionConfig } from '@/lib/places/region-config';
import type { PlaceSource } from '@/types/place-source';

interface RegionHubProps {
  region: RegionConfig;
  places: PlaceSource[];
}

const REGION_SURFACE: Record<
  RegionConfig['slug'],
  {
    panel: string;
    chip: string;
    accent: string;
  }
> = {
  seoul: {
    panel:
      'border-[#d8dece] bg-[linear-gradient(180deg,rgba(250,251,246,0.96),rgba(244,246,238,0.96))]',
    chip: 'bg-[#eef3e7] text-[#526049]',
    accent: 'text-[#5d6c54]',
  },
  'gyeonggi-south': {
    panel:
      'border-[#e5d8c2] bg-[linear-gradient(180deg,rgba(252,249,243,0.98),rgba(248,241,230,0.96))]',
    chip: 'bg-[#f7ecda] text-[#805f36]',
    accent: 'text-[#8b6841]',
  },
  'gyeonggi-north': {
    panel:
      'border-[#d3dbe6] bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,249,0.96))]',
    chip: 'bg-[#e7eef7] text-[#49627d]',
    accent: 'text-[#506884]',
  },
  incheon: {
    panel:
      'border-[#e7d2ca] bg-[linear-gradient(180deg,rgba(252,247,245,0.98),rgba(247,238,233,0.96))]',
    chip: 'bg-[#f7e2dc] text-[#8a5446]',
    accent: 'text-[#8e5a4c]',
  },
};

export function RegionHub({ region, places }: RegionHubProps) {
  const tone = REGION_SURFACE[region.slug];

  return (
    <div className="space-y-10 sm:space-y-12">
      <section
        className={`rounded-[34px] border p-6 shadow-[0_20px_55px_rgba(60,47,31,0.07)] sm:p-8 ${tone.panel}`}
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <div className="space-y-4">
            <Link
              href="/places"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6d604f] transition-colors hover:text-foreground"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              <span>전체 지역 보기</span>
            </Link>

            <div className="space-y-3">
              <div className={`inline-flex rounded-full px-3.5 py-1.5 text-xs font-semibold ${tone.chip}`}>
                {region.name} 지역 보드
              </div>
              <h1
                className="text-[clamp(2rem,5vw,3.8rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#27231d]"
                style={{
                  fontFamily:
                    '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                }}
              >
                {region.name} 아이와 가볼 곳
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-[#645849] sm:text-[15px]">
                {region.description} 이 페이지에서는 해당 권역의 장소만 모아 봅니다.
                홈과 같은 종이톤 보드를 유지하면서, 실제 장소 카드는 더 밀도 있게
                비교할 수 있게 구성했습니다.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[24px] bg-white/72 px-5 py-4">
              <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${tone.accent}`}>
                현재 정리 수
              </p>
              <p
                className="mt-2 text-3xl font-semibold tracking-tight text-[#2d271f]"
                style={{
                  fontFamily:
                    '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                }}
              >
                {places.length}곳
              </p>
            </div>
            <div className="rounded-[24px] bg-white/72 px-5 py-4">
              <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${tone.accent}`}>
                추천 방식
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-[#2d271f]">
                지역 먼저, 조건은 아래에서
              </p>
            </div>
            <div className="rounded-[24px] bg-white/72 px-5 py-4">
              <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${tone.accent}`}>
                확인 포인트
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-[#2d271f]">
                가격과 운영시간은 출처 링크로 재확인
              </p>
            </div>
          </div>
        </div>
      </section>

      {places.length > 0 ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
                Places Directory
              </p>
              <h2
                className="text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem]"
                style={{
                  fontFamily:
                    '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                }}
              >
                이 지역 안에서 조건으로 다시 줄일 수 있는 장소들
              </h2>
              <p className="text-sm leading-6 text-muted-foreground sm:text-[15px]">
                이제 {region.name} 안에서만 연령, 실내·야외, 무료 여부,
                우천 가능 여부를 다시 줄일 수 있습니다. 홈과 places 허브에서
                쓰던 필터 흐름을 권역 상세까지 그대로 이어붙였습니다.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5d9c8] bg-white/70 px-4 py-2 text-sm font-medium text-[#6e604d]">
              <MapPinIcon className="h-4 w-4" />
              <span>{region.name} 기준</span>
            </div>
          </div>

          <PlacesFilteredGrid places={places} />
        </section>
      ) : (
        <div className="rounded-[28px] border border-[#e7dccf] bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(248,242,232,0.96))] px-6 py-12 text-center shadow-[0_18px_45px_rgba(59,46,31,0.05)]">
          <p
            className="text-lg font-semibold tracking-tight text-[#2f2922]"
            style={{
              fontFamily:
                '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
            }}
          >
            이 지역의 장소 정보는 아직 준비 중입니다
          </p>
          <p className="mt-2 text-sm text-[#6a5d4d]">
            다른 지역을 먼저 보거나, 곧 추가될 데이터를 기다려 주세요.
          </p>
        </div>
      )}

      <section className="rounded-[32px] border border-[#e8ddcf] bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(248,242,232,0.96))] p-6 shadow-[0_18px_45px_rgba(59,46,31,0.05)]">
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#745e3e]">
            다음 행동
          </p>
          <h2
            className="mt-2 text-2xl font-semibold tracking-tight text-[#2d271f]"
            style={{
              fontFamily:
                '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
            }}
          >
            장소를 본 다음 바로 이어지는 도구와 혜택
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/tools"
            className="group rounded-[24px] border border-[#d3dbe6] bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,249,0.96))] p-5 transition-all hover:-translate-y-0.5 hover:border-[#9fb7d6]"
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
            className="group rounded-[24px] border border-[#e7d2ca] bg-[linear-gradient(180deg,rgba(252,247,245,0.98),rgba(247,238,233,0.96))] p-5 transition-all hover:-translate-y-0.5 hover:border-[#d09d8b]"
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
                  {region.name} 육아 혜택 확인
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  지역 지원 정책과 절약 정보까지 같은 흐름으로 이어서 봅니다.
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

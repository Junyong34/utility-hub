import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react';
import type {
  HomeAccentTone,
  HomeFeaturedPlaceCardItem,
} from '@/types/home';
import { cn } from '@/lib/utils';

const TONE_STYLES: Record<
  HomeAccentTone,
  {
    frame: string;
    panel: string;
    badge: string;
    fallback: string;
  }
> = {
  olive: {
    frame:
      'border-[#d6dece] bg-[linear-gradient(180deg,rgba(251,252,248,0.98),rgba(245,247,240,0.96))] hover:border-[#95a67f]',
    panel: 'bg-[#ebf1e1]',
    badge: 'bg-[#edf2e5] text-[#4c6145]',
    fallback: 'from-[#d9e6cf] via-[#eef4e7] to-[#d7e0c6]',
  },
  sand: {
    frame:
      'border-[#e9dcc7] bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(248,241,230,0.96))] hover:border-[#d3bb92]',
    panel: 'bg-[#f1e3cf]',
    badge: 'bg-[#f6ead9] text-[#835d37]',
    fallback: 'from-[#f0dfc4] via-[#f8f0e1] to-[#e8d0a6]',
  },
  brick: {
    frame:
      'border-[#ead6cf] bg-[linear-gradient(180deg,rgba(252,247,245,0.98),rgba(248,239,236,0.96))] hover:border-[#d4a08d]',
    panel: 'bg-[#f3ddd5]',
    badge: 'bg-[#f7e4de] text-[#8f5446]',
    fallback: 'from-[#f0d6cb] via-[#f8eeea] to-[#e9c2b5]',
  },
  sky: {
    frame:
      'border-[#d5deea] bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,249,0.96))] hover:border-[#a2b8d1]',
    panel: 'bg-[#e4edf5]',
    badge: 'bg-[#e8eef6] text-[#506982]',
    fallback: 'from-[#d7e4f0] via-[#edf3f8] to-[#cadced]',
  },
};

interface ParentingFeaturedPlaceCardProps {
  item: HomeFeaturedPlaceCardItem;
}

export function ParentingFeaturedPlaceCard({
  item,
}: ParentingFeaturedPlaceCardProps) {
  const tone = TONE_STYLES[item.tone];

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-[28px] border p-3.5 shadow-[0_18px_50px_rgba(59,46,31,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_26px_58px_rgba(59,46,31,0.12)] sm:rounded-[30px] sm:p-4',
        tone.frame
      )}
    >
      <div className="grid gap-3 sm:gap-4 md:grid-cols-[1.1fr_1fr]">
        <div className="relative min-h-44 overflow-hidden rounded-[22px] sm:min-h-56 sm:rounded-[24px]">
          {item.thumbnailImage ? (
            <Image
              src={item.thumbnailImage}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          ) : (
            <div
              className={cn(
                'relative flex h-full min-h-44 flex-col justify-between overflow-hidden rounded-[22px] bg-gradient-to-br p-4 sm:min-h-56 sm:rounded-[24px] sm:p-5',
                tone.fallback
              )}
            >
              <div
                className="absolute inset-0 opacity-45"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, rgba(91, 74, 51, 0.08) 1px, transparent 1px), linear-gradient(rgba(91, 74, 51, 0.08) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                }}
              />
              <div className="relative flex items-center justify-between gap-3">
                <span
                  className={cn(
                    'inline-flex rounded-full px-3 py-1 text-[11px] font-semibold',
                    tone.badge
                  )}
                >
                  이미지 준비 중
                </span>
                <span className="text-[11px] font-semibold text-foreground/55">
                  {item.regionLabel}
                </span>
              </div>

              <div className="relative space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/45">
                  {item.categoryLabel}
                </p>
                <p
                  className="max-w-[16rem] text-[1.35rem] font-semibold leading-tight tracking-tight text-foreground sm:text-2xl"
                  style={{
                    fontFamily:
                      '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
                  }}
                >
                  {item.title}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-3 rounded-[22px] bg-white/70 p-4 sm:gap-4 sm:rounded-[24px] sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'inline-flex rounded-full px-3 py-1 text-[11px] font-semibold',
                tone.badge
              )}
            >
              {item.regionLabel}
            </span>
            <span className="inline-flex rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold text-foreground/60">
              {item.subRegion}
            </span>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
              이번 주 인기 장소
            </p>
            <h3
              className="text-[1.2rem] font-semibold leading-tight tracking-tight text-foreground sm:text-[1.4rem]"
              style={{
                fontFamily:
                  '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
              }}
            >
              {item.title}
            </h3>
            <p className="text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
              {item.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className={cn('rounded-full px-3 py-1 text-xs font-medium', tone.badge)}>
              {item.categoryLabel}
            </span>
            <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-foreground/65">
              {item.ageLabel}
            </span>
            {item.conditions.map(condition => (
              <span
                key={condition}
                className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-foreground/65"
              >
                {condition}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-2 sm:gap-3 sm:pt-3">
            <Link
              href={item.href}
              className={cn(
                'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold text-foreground transition-all sm:px-4 sm:text-sm',
                tone.panel
              )}
            >
              <span>지역에서 더 보기</span>
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>

            {item.sourceUrl ? (
              <Link
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-medium text-foreground/60 transition-colors hover:text-foreground sm:text-sm"
              >
                <span>공식 사이트</span>
                <ExternalLinkIcon className="h-3.5 w-3.5" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

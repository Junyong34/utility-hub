import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react';
import type { HomeAccentTone, HomeFeaturedPlaceCardItem } from '@/types/home';
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
      'border-beige-deep/70 bg-[linear-gradient(180deg,var(--cream-soft),var(--canvas))] hover:border-primary/40',
    panel: 'bg-cream-soft',
    badge: 'bg-cream text-slate',
    fallback: 'from-cream-soft via-cream to-cream-deeper',
  },
  sand: {
    frame:
      'border-beige-deep bg-[linear-gradient(180deg,var(--canvas),var(--cream-soft))] hover:border-primary/40',
    panel: 'bg-cream',
    badge: 'bg-cream-deeper text-foreground',
    fallback: 'from-cream via-cream-soft to-cream-deeper',
  },
  brick: {
    frame: 'border-primary/25 bg-primary/5 hover:border-primary/50',
    panel: 'bg-primary/10',
    badge: 'bg-primary/10 text-primary-deep',
    fallback: 'from-primary/10 via-sunshine-300/35 to-cream',
  },
  sky: {
    frame:
      'border-sunshine-500/50 bg-[linear-gradient(180deg,var(--canvas),var(--cream))] hover:border-sunshine-700',
    panel: 'bg-sunshine-300/35',
    badge: 'bg-yellow-saturated/20 text-sunshine-900',
    fallback: 'from-sunshine-300/35 via-cream to-yellow-saturated/20',
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
        'group relative overflow-hidden rounded-lg border p-3.5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card sm:p-4',
        tone.frame
      )}
    >
      <div className="grid gap-3 sm:gap-4 md:grid-cols-[1.1fr_1fr]">
        <div className="relative min-h-44 overflow-hidden rounded-lg sm:min-h-56">
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
                'relative flex h-full min-h-44 flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br p-4 sm:min-h-56 sm:p-5',
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
                    fontFamily: 'var(--font-editorial)',
                  }}
                >
                  {item.title}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-3 rounded-lg bg-canvas/70 p-4 sm:gap-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'inline-flex rounded-full px-3 py-1 text-[11px] font-semibold',
                tone.badge
              )}
            >
              {item.regionLabel}
            </span>
            <span className="inline-flex rounded-full bg-ink/5 px-3 py-1 text-[11px] font-semibold text-foreground/60">
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
                fontFamily: 'var(--font-editorial)',
              }}
            >
              {item.title}
            </h3>
            <p className="text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
              {item.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium',
                tone.badge
              )}
            >
              {item.categoryLabel}
            </span>
            <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-foreground/65">
              {item.ageLabel}
            </span>
            {item.conditions.map(condition => (
              <span
                key={condition}
                className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-foreground/65"
              >
                {condition}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-2 sm:gap-3 sm:pt-3">
            <Link
              href={item.href}
              className={cn(
                'inline-flex cursor-pointer items-center gap-1.5 rounded-md px-3.5 py-2 text-[13px] font-semibold text-foreground transition-all sm:px-4 sm:text-sm',
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

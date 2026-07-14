import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react';
import type { HomeFeaturedPlaceCardItem } from '@/types/home';
import { cn } from '@/shared/ui/class-names';
import {
  CONDITION_BADGE_STYLES,
  HOME_TONE_BY_ACCENT,
  PARENTING_SOFT_GRID_STYLE,
  PARENTING_TONE_STYLES,
} from '@/components/parenting-theme';

interface ParentingFeaturedPlaceCardProps {
  item: HomeFeaturedPlaceCardItem;
}

function getConditionClass(condition: string): string {
  if (condition.includes('무료')) {
    return CONDITION_BADGE_STYLES.free;
  }

  if (condition.includes('실내') || condition.includes('우천')) {
    return CONDITION_BADGE_STYLES.rain;
  }

  if (condition.includes('야외') || condition.includes('유모차')) {
    return CONDITION_BADGE_STYLES.outdoor;
  }

  return CONDITION_BADGE_STYLES.paid;
}

export function ParentingFeaturedPlaceCard({
  item,
}: ParentingFeaturedPlaceCardProps) {
  const tone = PARENTING_TONE_STYLES[HOME_TONE_BY_ACCENT[item.tone]];

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-[30px] border p-3 shadow-[0_22px_70px_-54px_rgba(61,48,39,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_30px_78px_-48px_rgba(61,48,39,0.62)] sm:p-4',
        tone.frame
      )}
    >
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.06fr_0.94fr]">
        <div className="relative min-h-64 overflow-hidden rounded-[24px] sm:min-h-80">
          {item.thumbnailImage ? (
            <Image
              src={item.thumbnailImage}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            />
          ) : (
            <div
              className={cn(
                'relative flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-[24px] bg-gradient-to-br p-4 sm:min-h-80 sm:p-5',
                tone.fallback
              )}
            >
              <div
                className="absolute inset-0 opacity-45"
                style={{
                  backgroundImage: PARENTING_SOFT_GRID_STYLE,
                  backgroundSize: '22px 22px',
                }}
              />
              <div className="relative flex items-center justify-between gap-3">
                <span
                  className={cn(
                    'inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold',
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
                <p className="max-w-[16rem] text-[1.35rem] font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">
                  {item.title}
                </p>
              </div>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(33,23,18,0.42))]" />
          <div className="absolute right-3 bottom-3 left-3 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold backdrop-blur',
                tone.badge
              )}
            >
              {item.regionLabel}
            </span>
            <span className="inline-flex rounded-full border border-white/30 bg-[rgba(255,250,240,0.78)] px-3 py-1 text-[11px] font-semibold text-foreground/70 backdrop-blur">
              {item.subRegion}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4 rounded-[24px] bg-canvas/72 p-4 ring-1 ring-hairline-soft sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold',
                tone.badge
              )}
            >
              {item.regionLabel}
            </span>
            <span className="inline-flex rounded-full border border-hairline bg-canvas/72 px-3 py-1 text-[11px] font-semibold text-foreground/60">
              {item.subRegion}
            </span>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
              이번 주 인기 장소
            </p>
            <h3 className="text-[1.25rem] font-semibold leading-tight tracking-tight text-foreground sm:text-[1.55rem]">
              {item.title}
            </h3>
            <p className="text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
              {item.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium',
                tone.badge
              )}
            >
              {item.categoryLabel}
            </span>
            <span
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium',
                CONDITION_BADGE_STYLES.age
              )}
            >
              {item.ageLabel}
            </span>
            {item.conditions.map(condition => (
              <span
                key={condition}
                className={cn(
                  'rounded-full border px-3 py-1 text-xs font-medium',
                  getConditionClass(condition)
                )}
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
                tone.softPanel
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

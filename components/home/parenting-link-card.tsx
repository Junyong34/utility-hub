import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import type { HomeLinkCardItem, HomeAccentTone } from '@/types/home';
import { cn } from '@/lib/utils';

const TONE_STYLES: Record<
  HomeAccentTone,
  {
    frame: string;
    eyebrow: string;
    accent: string;
    badge: string;
  }
> = {
  olive: {
    frame:
      'border-beige-deep/70 bg-[linear-gradient(180deg,var(--cream-soft),var(--canvas))] hover:border-primary/40',
    eyebrow: 'text-slate',
    accent: 'from-cream-soft to-cream',
    badge: 'bg-cream text-slate',
  },
  sand: {
    frame:
      'border-beige-deep bg-[linear-gradient(180deg,var(--canvas),var(--cream-soft))] hover:border-primary/40',
    eyebrow: 'text-sunshine-900',
    accent: 'from-cream to-cream-deeper',
    badge: 'bg-cream-deeper text-foreground',
  },
  brick: {
    frame: 'border-primary/25 bg-primary/5 hover:border-primary/50',
    eyebrow: 'text-primary-deep',
    accent: 'from-primary/10 to-sunshine-300/35',
    badge: 'bg-primary/10 text-primary-deep',
  },
  sky: {
    frame:
      'border-sunshine-500/50 bg-[linear-gradient(180deg,var(--canvas),var(--cream))] hover:border-sunshine-700',
    eyebrow: 'text-sunshine-900',
    accent: 'from-sunshine-300/35 to-yellow-saturated/20',
    badge: 'bg-yellow-saturated/20 text-sunshine-900',
  },
};

interface ParentingLinkCardProps {
  item: HomeLinkCardItem;
}

export function ParentingLinkCard({ item }: ParentingLinkCardProps) {
  const tone = TONE_STYLES[item.tone];

  return (
    <Link
      href={item.href}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-lg border p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card sm:p-5',
        tone.frame
      )}
    >
      <div className="relative flex h-full flex-col gap-3 sm:gap-4">
        <div
          className={cn(
            'rounded-lg bg-gradient-to-b p-3.5 sm:p-4',
            tone.accent
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5 sm:space-y-2">
              <p
                className={cn(
                  'text-[11px] font-semibold uppercase tracking-[0.2em]',
                  tone.eyebrow
                )}
              >
                {item.eyebrow}
              </p>
              <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {item.title}
              </h3>
            </div>

            {item.countLabel ? (
              <span
                className={cn(
                  'inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold sm:px-3',
                  tone.badge
                )}
              >
                {item.countLabel}
              </span>
            ) : null}
          </div>
        </div>

        <p className="text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
          {item.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="text-[11px] font-medium leading-4 text-foreground/55 sm:min-h-10 sm:text-xs sm:leading-5">
            {item.meta}
          </div>
          <div className="inline-flex items-center gap-1 text-[13px] font-semibold text-foreground/72 transition-colors group-hover:text-foreground sm:text-sm">
            <span>{item.ctaLabel}</span>
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

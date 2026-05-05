import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import type { HomeLinkCardItem } from '@/types/home';
import { cn } from '@/lib/utils';
import {
  HOME_TONE_BY_ACCENT,
  PARENTING_TONE_STYLES,
} from '@/components/parenting-theme';

interface ParentingLinkCardProps {
  item: HomeLinkCardItem;
}

export function ParentingLinkCard({ item }: ParentingLinkCardProps) {
  const tone = PARENTING_TONE_STYLES[HOME_TONE_BY_ACCENT[item.tone]];

  return (
    <Link
      href={item.href}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-[24px] border p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-mockup sm:rounded-[28px] sm:p-5',
        tone.frame
      )}
    >
      <div className="relative flex h-full flex-col gap-3 sm:gap-4">
        <div
          className={cn(
            'rounded-[18px] bg-gradient-to-b p-3.5 sm:rounded-[22px] sm:p-4',
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
              <h3 className="text-base font-semibold text-foreground sm:text-lg">
                {item.title}
              </h3>
            </div>

            {item.countLabel ? (
              <span
                className={cn(
                  'inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold sm:px-3',
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

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
      'border-[#d8dece] bg-[linear-gradient(180deg,rgba(250,251,246,0.96),rgba(244,246,238,0.96))] hover:border-[#9faf8d]',
    eyebrow: 'text-[#5d6c54]',
    accent: 'from-[#edf2e5] to-[#d9e4cf]',
    badge: 'bg-[#eef3e7] text-[#526049]',
  },
  sand: {
    frame:
      'border-[#e5d8c2] bg-[linear-gradient(180deg,rgba(252,249,243,0.98),rgba(248,241,230,0.96))] hover:border-[#d1b88b]',
    eyebrow: 'text-[#8b6841]',
    accent: 'from-[#f3e8d5] to-[#ead7b8]',
    badge: 'bg-[#f7ecda] text-[#805f36]',
  },
  brick: {
    frame:
      'border-[#e7d2ca] bg-[linear-gradient(180deg,rgba(252,247,244,0.98),rgba(247,238,233,0.96))] hover:border-[#d09d8b]',
    eyebrow: 'text-[#8e5a4c]',
    accent: 'from-[#f4ddd4] to-[#efc9bc]',
    badge: 'bg-[#f7e2dc] text-[#8a5446]',
  },
  sky: {
    frame:
      'border-[#d3dbe6] bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,249,0.96))] hover:border-[#9fb7d6]',
    eyebrow: 'text-[#506884]',
    accent: 'from-[#e3ebf5] to-[#ccdbeb]',
    badge: 'bg-[#e7eef7] text-[#49627d]',
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
        'group relative cursor-pointer overflow-hidden rounded-[26px] border p-4 shadow-[0_18px_45px_rgba(56,46,33,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(56,46,33,0.1)] sm:rounded-[28px] sm:p-5',
        tone.frame
      )}
    >
      <div className="relative flex h-full flex-col gap-3 sm:gap-4">
        <div
          className={cn(
            'rounded-[20px] bg-gradient-to-b p-3.5 sm:rounded-[22px] sm:p-4',
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

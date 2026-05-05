import Link from 'next/link';
import { ArrowRightIcon, MapPinIcon } from 'lucide-react';
import type { RegionConfig } from '@/lib/places/region-config';
import { cn } from '@/lib/utils';
import { REGION_TONE_BY_SLUG, TONE_STYLES } from './place-theme';

interface RegionCardProps {
  region: RegionConfig;
  placeCount: number;
}

export function RegionCard({ region, placeCount }: RegionCardProps) {
  const styles = TONE_STYLES[REGION_TONE_BY_SLUG[region.slug]];

  return (
    <Link
      href={`/places/${region.slug}`}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-[24px] border p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-mockup sm:rounded-[28px] sm:p-5',
        styles.frame
      )}
    >
      <div className="relative flex h-full flex-col gap-3 sm:gap-4">
        <div
          className={cn(
            'rounded-[18px] bg-gradient-to-b p-3 sm:rounded-[22px] sm:p-4',
            styles.accent
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-[18px] sm:h-11 sm:w-11 sm:rounded-2xl',
                styles.iconWrap
              )}
            >
              <MapPinIcon
                className={cn('h-4 w-4 sm:h-5 sm:w-5', styles.icon)}
              />
            </div>
            <span
              className={cn(
                'inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold sm:px-3 sm:text-[11px]',
                styles.badge
              )}
            >
              {placeCount > 0 ? `${placeCount}곳` : '준비 중'}
            </span>
          </div>

          <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
            <p
              className={cn(
                'text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px] sm:tracking-[0.2em]',
                styles.eyebrow
              )}
            >
              지역별
            </p>
            <h3 className="text-base font-semibold text-foreground sm:text-lg">
              {region.name}
            </h3>
          </div>
        </div>

        <p className="line-clamp-2 text-[13px] leading-5 text-muted-foreground sm:line-clamp-none sm:text-sm sm:leading-6">
          {region.description}
        </p>

        <div className="mt-auto inline-flex items-center gap-1 text-[13px] font-medium text-foreground/60 transition-colors group-hover:text-foreground sm:text-sm sm:font-semibold sm:text-foreground/72">
          <span>장소 보기</span>
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

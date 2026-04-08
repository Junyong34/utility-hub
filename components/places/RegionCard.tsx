import Link from 'next/link';
import { ArrowRightIcon, MapPinIcon } from 'lucide-react';
import type { RegionConfig } from '@/lib/places/region-config';
import { cn } from '@/lib/utils';

interface RegionCardProps {
  region: RegionConfig;
  placeCount: number;
}

const REGION_STYLES: Record<
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
  seoul: {
    frame:
      'border-[#d8dece] bg-[linear-gradient(180deg,rgba(250,251,246,0.96),rgba(244,246,238,0.96))] hover:border-[#9faf8d]',
    accent: 'from-[#edf2e5] to-[#d9e4cf]',
    iconWrap: 'bg-[#eff4e9]',
    icon: 'text-[#4f6247]',
    badge: 'bg-[#eef3e7] text-[#526049]',
    eyebrow: 'text-[#5d6c54]',
  },
  'gyeonggi-south': {
    frame:
      'border-[#e5d8c2] bg-[linear-gradient(180deg,rgba(252,249,243,0.98),rgba(248,241,230,0.96))] hover:border-[#d1b88b]',
    accent: 'from-[#f3e8d5] to-[#ead7b8]',
    iconWrap: 'bg-[#f7ecda]',
    icon: 'text-[#825f38]',
    badge: 'bg-[#f7ecda] text-[#805f36]',
    eyebrow: 'text-[#8b6841]',
  },
  'gyeonggi-north': {
    frame:
      'border-[#d3dbe6] bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,249,0.96))] hover:border-[#9fb7d6]',
    accent: 'from-[#e3ebf5] to-[#ccdbeb]',
    iconWrap: 'bg-[#e7eef7]',
    icon: 'text-[#506884]',
    badge: 'bg-[#e7eef7] text-[#49627d]',
    eyebrow: 'text-[#506884]',
  },
  incheon: {
    frame:
      'border-[#e7d2ca] bg-[linear-gradient(180deg,rgba(252,247,244,0.98),rgba(247,238,233,0.96))] hover:border-[#d09d8b]',
    accent: 'from-[#f4ddd4] to-[#efc9bc]',
    iconWrap: 'bg-[#f7e2dc]',
    icon: 'text-[#8e5a4c]',
    badge: 'bg-[#f7e2dc] text-[#8a5446]',
    eyebrow: 'text-[#8e5a4c]',
  },
};

export function RegionCard({ region, placeCount }: RegionCardProps) {
  const styles = REGION_STYLES[region.slug] ?? REGION_STYLES.seoul;

  return (
    <Link
      href={`/places/${region.slug}`}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-[28px] border p-5 shadow-[0_18px_45px_rgba(56,46,33,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(56,46,33,0.1)]',
        styles.frame
      )}
    >
      <div className="relative flex h-full flex-col gap-4">
        <div
          className={cn(
            'rounded-[22px] bg-gradient-to-b p-4',
            styles.accent
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-2xl',
                styles.iconWrap
              )}
            >
              <MapPinIcon className={cn('h-5 w-5', styles.icon)} />
            </div>
            <span
              className={cn(
                'inline-flex rounded-full px-3 py-1 text-[11px] font-semibold',
                styles.badge
              )}
            >
              {placeCount > 0 ? `${placeCount}곳` : '준비 중'}
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <p
              className={cn(
                'text-[11px] font-semibold uppercase tracking-[0.2em]',
                styles.eyebrow
              )}
            >
              지역별
            </p>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {region.name}
            </h3>
          </div>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">
          {region.description}
        </p>

        <div className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-foreground/72 transition-colors group-hover:text-foreground">
          <span>장소 보기</span>
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

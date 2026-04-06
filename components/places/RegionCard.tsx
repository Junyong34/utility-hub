import Link from 'next/link';
import { MapPinIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { RegionConfig } from '@/lib/places/region-config';

interface RegionCardProps {
  region: RegionConfig;
  placeCount: number;
}

const REGION_STYLES: Record<string, { color: string; bgColor: string; hoverColor: string }> = {
  seoul: {
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    hoverColor: 'hover:border-blue-500/50',
  },
  'gyeonggi-south': {
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    hoverColor: 'hover:border-emerald-500/50',
  },
  'gyeonggi-north': {
    color: 'text-teal-500',
    bgColor: 'bg-teal-500/10',
    hoverColor: 'hover:border-teal-500/50',
  },
  incheon: {
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    hoverColor: 'hover:border-cyan-500/50',
  },
};

export function RegionCard({ region, placeCount }: RegionCardProps) {
  const styles = REGION_STYLES[region.slug] ?? REGION_STYLES.seoul;

  return (
    <Link href={`/places/${region.slug}`}>
      <Card className={`border-border/50 ${styles.hoverColor} transition-all hover:shadow-lg group h-full`}>
        <CardContent className="p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className={`${styles.bgColor} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
              <MapPinIcon className={`h-5 w-5 ${styles.color}`} />
            </div>
            <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
              {placeCount}곳
            </span>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-sm">{region.name}</div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              {region.description}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-primary mt-auto">
            <span>장소 보기</span>
            <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

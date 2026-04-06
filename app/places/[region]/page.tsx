import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RegionHub } from '@/components/places/RegionHub';
import {
  getRegionBySlug,
  PHASE_A_REGION_SLUGS,
} from '@/lib/places/region-config';
import { getPublishablePlacesByRegion } from '@/lib/places/place-content';
import type { RegionSlug } from '@/types/place-source';

interface PageProps {
  params: Promise<{ region: string }>;
}

export async function generateStaticParams() {
  return PHASE_A_REGION_SLUGS.map(slug => ({ region: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region: regionSlug } = await params;
  const region = getRegionBySlug(regionSlug);
  if (!region) return {};

  return {
    title: `${region.name} 아이와 가볼 곳 | Zento`,
    description: region.description,
    openGraph: {
      title: `${region.name} 아이와 가볼 곳 | Zento`,
      description: region.description,
    },
  };
}

export default async function RegionPage({ params }: PageProps) {
  const { region: regionSlug } = await params;
  const region = getRegionBySlug(regionSlug);

  if (!region || !region.isPhaseA) {
    notFound();
  }

  const places = getPublishablePlacesByRegion(regionSlug as RegionSlug);

  return (
    <main className="max-w-screen-xl mx-auto px-4 pt-24 pb-16 sm:pt-32">
      <RegionHub region={region} places={places} />
    </main>
  );
}

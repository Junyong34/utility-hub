import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLdMultiple } from '@/components/seo';
import { RegionHub } from '@/components/places/RegionHub';
import { PaperPageShell } from '@/components/ui/paper-page-shell';
import {
  getRegionBySlug,
  PHASE_A_REGION_SLUGS,
} from '@/lib/places/region-config';
import { getPublishablePlacesByRegion } from '@/lib/places/place-content';
import type { RegionSlug } from '@/types/place-source';
import {
  SITE_CONFIG,
  createPageStructuredData,
  generateMetadata as createMetadata,
} from '@/lib/seo';
import { createPlaceRegionMetadataInput } from '@/lib/seo/site-section-seo';

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

  return createMetadata(createPlaceRegionMetadataInput(SITE_CONFIG.url, region));
}

export default async function RegionPage({ params }: PageProps) {
  const { region: regionSlug } = await params;
  const region = getRegionBySlug(regionSlug);

  if (!region || !region.isPhaseA) {
    notFound();
  }

  const places = getPublishablePlacesByRegion(regionSlug as RegionSlug);
  const { webPage, breadcrumb } = createPageStructuredData({
    name: `${region.name} 아이와 가볼 곳`,
    path: `/places/${region.slug}`,
    description: region.description,
    breadcrumbs: [
      { name: '홈', url: '/' },
      { name: '아이와 가볼 곳', url: '/places' },
      { name: region.name },
    ],
  });

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb]} />
      <PaperPageShell
        glowClassName="bg-[radial-gradient(circle_at_top_left,rgba(201,176,137,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(128,151,134,0.1),transparent_24%)]"
        gridClassName="h-[34rem] opacity-35"
      >
        <div className="mx-auto max-w-screen-xl px-4 pt-10 pb-16 md:pt-24 xl:pt-32 sm:pb-24">
          <RegionHub region={region} places={places} />
        </div>
      </PaperPageShell>
    </>
  );
}

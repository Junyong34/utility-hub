import type { Metadata } from 'next';
import { MainHomeScreen } from '@/components/home/main-home-screen';
import { getParentingHomeContent } from '@/lib/home/parenting-home-content';
import { generateMetadata as createMetadata, SITE_CONFIG } from '@/lib/seo';
import { createHomeMetadataInput } from '@/lib/seo/site-section-seo';

export const metadata: Metadata = createMetadata(
  createHomeMetadataInput(SITE_CONFIG.url)
);

export default function Page() {
  const homeContent = getParentingHomeContent();

  return <MainHomeScreen featuredPlaces={homeContent.featuredPlaces} />;
}

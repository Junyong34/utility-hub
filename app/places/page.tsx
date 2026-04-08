import type { Metadata } from 'next';
import { JsonLdMultiple } from '@/components/seo';
import { PlacesHub } from '@/components/places/PlacesHub';
import { PaperPageShell } from '@/components/ui/paper-page-shell';
import { getPhaseARegions } from '@/lib/places/region-config';
import {
  getPlaceCountByRegion,
  getPublishablePlaces,
} from '@/lib/places/place-content';
import {
  SITE_CONFIG,
  createPageStructuredData,
  generateMetadata as createMetadata,
} from '@/lib/seo';
import { createPlacesMetadataInput } from '@/lib/seo/site-section-seo';

export const metadata: Metadata = createMetadata(
  createPlacesMetadataInput(SITE_CONFIG.url)
);

export default function PlacesPage() {
  const regions = getPhaseARegions();
  const placeCountByRegion = getPlaceCountByRegion();
  const allPlaces = getPublishablePlaces();
  const { webPage, breadcrumb } = createPageStructuredData({
    name: '아이와 가볼 곳',
    path: '/places',
    description:
      '서울·경기·인천에서 아이와 가볼 곳을 지역과 조건별로 빠르게 찾을 수 있는 장소 허브입니다.',
    breadcrumbs: [{ name: '홈', url: '/' }, { name: '아이와 가볼 곳' }],
  });

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb]} />
      <PaperPageShell>
        <div className="mx-auto max-w-screen-xl px-4 pt-10 pb-16 md:pt-24 xl:pt-32 sm:pb-24">
          <PlacesHub
            regions={regions}
            placeCountByRegion={placeCountByRegion}
            allPlaces={allPlaces}
          />
        </div>
      </PaperPageShell>
    </>
  );
}

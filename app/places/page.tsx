import type { Metadata } from 'next';
import { JsonLdMultiple } from '@/components/seo';
import { PlacesHub } from '@/components/places/PlacesHub';
import { PaperPageShell } from '@/components/ui/paper-page-shell';
import { getPlaceCountByRegion, queryPlaceList } from '@/lib/places';
import { getPhaseARegions } from '@/lib/places/region-config';
import {
  SITE_CONFIG,
  createPageStructuredData,
  generateMetadata as createMetadata,
} from '@/lib/seo';
import { createPlacesMetadataInput } from '@/lib/seo/site-section-seo';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = createMetadata(
  createPlacesMetadataInput(SITE_CONFIG.url)
);

export default async function PlacesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const regions = getPhaseARegions();
  const placeCountByRegion = getPlaceCountByRegion();
  const initialPage = queryPlaceList(resolvedSearchParams);
  const { webPage, breadcrumb } = createPageStructuredData({
    name: '아이와 가볼 곳',
    path: '/places',
    description:
      '서울·경기·인천에서 아이와 가볼 곳을 지역과 조건별로 빠르게 찾을 수 있는 장소 입니다.',
    breadcrumbs: [{ name: '홈', url: '/' }, { name: '아이와 가볼 곳' }],
  });

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb]} />
      <PaperPageShell
        glowClassName="h-[22rem] bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--sunshine-500)_24%,transparent),transparent_30%),radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--primary)_12%,transparent),transparent_26%)]"
        gridClassName="inset-x-8 top-72 h-[42rem] rounded-[42px] opacity-45"
        gridStyle={{ backgroundSize: '34px 34px' }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 pt-10 pb-20 md:pt-20 sm:pb-28">
          <PlacesHub
            regions={regions}
            placeCountByRegion={placeCountByRegion}
            initialPage={initialPage}
          />
        </div>
      </PaperPageShell>
    </>
  );
}

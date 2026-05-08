import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLdMultiple } from '@/components/seo';
import { PlaceDetailPage } from '@/components/places/PlaceDetailPage';
import { getPlaceById, getPublishablePlaces } from '@/lib/places/place-content';
import {
  getRegionBySlug,
  PHASE_A_REGION_SLUGS,
} from '@/lib/places/region-config';
import {
  SITE_CONFIG,
  createPageStructuredData,
  generateMetadata as createMetadata,
} from '@/lib/seo';
import { PUBLISHABLE_STATUSES, type RegionSlug } from '@/types/place-source';

interface PageProps {
  params: Promise<{ region: string; placeId: string }>;
}

export async function generateStaticParams() {
  return getPublishablePlaces().map(place => ({
    region: place.region,
    placeId: place.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region: regionSlug, placeId } = await params;
  const place = getValidPlace(regionSlug, placeId);
  const region = getRegionBySlug(regionSlug);

  if (!place || !region) {
    return {};
  }

  const description =
    place.description ??
    `${region.name} ${place.subRegion}의 아이와 가볼 곳 상세 정보입니다.`;

  return createMetadata({
    title: `${place.name} | 아이와 가볼 곳`,
    description,
    canonical: `${SITE_CONFIG.url}/places/${place.region}/${place.id}`,
    keywords: [
      place.name,
      `${region.name} 아이와 가볼 곳`,
      `${place.subRegion} 아이와 갈 곳`,
      '아이와 가볼 곳',
    ],
    ogImage: place.thumbnailImage || '/og-images/places-og-image.webp',
  });
}

export default async function PlacePage({ params }: PageProps) {
  const { region: regionSlug, placeId } = await params;
  const region = getRegionBySlug(regionSlug);
  const place = getValidPlace(regionSlug, placeId);

  if (!region || !place) {
    notFound();
  }

  const path = `/places/${place.region}/${place.id}`;
  const description =
    place.description ??
    `${region.name} ${place.subRegion}의 아이와 가볼 곳 상세 정보입니다.`;
  const { webPage, breadcrumb } = createPageStructuredData({
    name: place.name,
    path,
    description,
    breadcrumbs: [
      { name: '홈', url: '/' },
      { name: '아이와 가볼 곳', url: '/places' },
      { name: region.name, url: `/places/${region.slug}` },
      { name: place.name },
    ],
  });

  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: place.name,
    description,
    url: `${SITE_CONFIG.url}${path}`,
    address: place.address,
    image: place.thumbnailImage
      ? `${SITE_CONFIG.url}${place.thumbnailImage}`
      : undefined,
  };

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb, placeSchema]} />
      <PlaceDetailPage place={place} region={region} />
    </>
  );
}

function getValidPlace(regionSlug: string, placeId: string) {
  if (!PHASE_A_REGION_SLUGS.includes(regionSlug as RegionSlug)) {
    return undefined;
  }

  const place = getPlaceById(placeId);

  if (
    !place ||
    place.region !== regionSlug ||
    !PUBLISHABLE_STATUSES.includes(place.verificationStatus)
  ) {
    return undefined;
  }

  return place;
}

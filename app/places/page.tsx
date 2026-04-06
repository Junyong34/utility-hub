import type { Metadata } from 'next';
import { PlacesHub } from '@/components/places/PlacesHub';
import { getPhaseARegions } from '@/lib/places/region-config';
import { getPlaceCountByRegion, getPublishablePlaces } from '@/lib/places/place-content';

export const metadata: Metadata = {
  title: '아이와 가볼 곳 | Zento',
  description:
    '서울·경기 중심으로 아이와 가볼 곳을 지역, 연령, 날씨, 예산 기준으로 빠르게 정리했습니다. 공식 소스로 검증된 장소 정보.',
  openGraph: {
    title: '아이와 가볼 곳 | Zento',
    description:
      '서울·경기 중심으로 아이와 가볼 곳을 지역, 연령, 날씨, 예산 기준으로 빠르게 정리했습니다.',
  },
};

export default function PlacesPage() {
  const regions = getPhaseARegions();
  const placeCountByRegion = getPlaceCountByRegion();
  const allPlaces = getPublishablePlaces();

  return (
    <main className="max-w-screen-xl mx-auto px-4 pt-24 pb-16 sm:pt-32">
      <PlacesHub
        regions={regions}
        placeCountByRegion={placeCountByRegion}
        allPlaces={allPlaces}
      />
    </main>
  );
}

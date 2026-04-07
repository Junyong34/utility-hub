import type { Metadata } from 'next';
import { PlacesHub } from '@/components/places/PlacesHub';
import { PaperPageShell } from '@/components/ui/paper-page-shell';
import { getPhaseARegions } from '@/lib/places/region-config';
import { getPlaceCountByRegion, getPublishablePlaces } from '@/lib/places/place-content';

export const metadata: Metadata = {
  title: '아이와 가볼 곳 | Zento',
  description:
    '서울·경기·인천 중심으로 아이와 가볼 곳을 지역, 연령, 날씨, 예산 기준으로 빠르게 정리했습니다. 공식 소스로 검증된 장소 정보.',
  openGraph: {
    title: '아이와 가볼 곳 | Zento',
    description:
      '서울·경기·인천 중심으로 아이와 가볼 곳을 지역, 연령, 날씨, 예산 기준으로 빠르게 정리했습니다.',
  },
};

export default function PlacesPage() {
  const regions = getPhaseARegions();
  const placeCountByRegion = getPlaceCountByRegion();
  const allPlaces = getPublishablePlaces();

  return (
    <PaperPageShell>
      <div className="mx-auto max-w-screen-xl px-4 pt-10 pb-16 md:pt-24 xl:pt-32 sm:pb-24">
        <PlacesHub
          regions={regions}
          placeCountByRegion={placeCountByRegion}
          allPlaces={allPlaces}
        />
      </div>
    </PaperPageShell>
  );
}

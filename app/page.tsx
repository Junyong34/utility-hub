import type { Metadata } from 'next';
import { MainHomeScreen } from '@/components/home/main-home-screen';
import { getParentingHomeContent } from '@/lib/home/parenting-home-content';

export const metadata: Metadata = {
  title: '아이와 갈 곳, 조건별로 빠르게 찾으세요 | Zento',
  description:
    '서울·경기·인천에서 아이와 갈 곳을 지역, 연령, 날씨, 예산 기준으로 바로 찾는 실용형 육아 홈입니다. 장소 탐색, 도구, 혜택·지원금을 한 화면에서 정리합니다.',
  openGraph: {
    title: '아이와 갈 곳, 조건별로 빠르게 찾으세요 | Zento',
    description:
      '서울·경기·인천에서 아이와 갈 곳을 지역, 연령, 날씨, 예산 기준으로 바로 찾는 실용형 육아 홈입니다.',
  },
};

export default function Page() {
  const homeContent = getParentingHomeContent();

  return <MainHomeScreen featuredPlaces={homeContent.featuredPlaces} />;
}

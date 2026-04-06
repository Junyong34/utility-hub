import type { Metadata } from 'next';
import { BenefitsHub } from '@/components/benefits/BenefitsHub';

export const metadata: Metadata = {
  title: '육아 혜택·지원금 | Zento',
  description:
    '정부 지원, 지역 혜택, 절약 가이드를 공식 출처 기준으로 정리합니다. 부모급여, 아동수당, 서울·경기 지자체 육아 지원 정보.',
  openGraph: {
    title: '육아 혜택·지원금 | Zento',
    description:
      '정부 지원, 지역 혜택, 절약 가이드를 공식 출처 기준으로 정리합니다.',
  },
};

export default function BenefitsPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 pt-24 pb-16 sm:pt-32">
      <BenefitsHub />
    </main>
  );
}

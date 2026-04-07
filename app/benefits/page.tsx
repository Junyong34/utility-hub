import type { Metadata } from 'next';
import { BenefitsHub } from '@/components/benefits/BenefitsHub';
import { PaperPageShell } from '@/components/ui/paper-page-shell';

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
    <PaperPageShell>
      <div className="mx-auto max-w-screen-xl px-4 pt-10 pb-16 md:pt-24 xl:pt-32 sm:pb-24">
        <BenefitsHub />
      </div>
    </PaperPageShell>
  );
}

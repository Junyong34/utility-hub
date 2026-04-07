import type { Metadata } from 'next';
import { JsonLdMultiple } from '@/components/seo';
import { BenefitsHub } from '@/components/benefits/BenefitsHub';
import { PaperPageShell } from '@/components/ui/paper-page-shell';
import {
  SITE_CONFIG,
  createPageStructuredData,
  generateMetadata as createMetadata,
} from '@/lib/seo';
import { createBenefitsMetadataInput } from '@/lib/seo/site-section-seo';

export const metadata: Metadata = createMetadata(
  createBenefitsMetadataInput(SITE_CONFIG.url)
);

export default function BenefitsPage() {
  const { webPage, breadcrumb } = createPageStructuredData({
    name: '육아 혜택·지원금',
    path: '/benefits',
    description:
      '정부 지원, 지역 혜택, 절약 가이드를 공식 출처 기준으로 정리한 육아 혜택 허브입니다.',
    breadcrumbs: [
      { name: '홈', url: '/' },
      { name: '육아 혜택·지원금' },
    ],
  });

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb]} />
      <PaperPageShell>
        <div className="mx-auto max-w-screen-xl px-4 pt-10 pb-16 md:pt-24 xl:pt-32 sm:pb-24">
          <BenefitsHub />
        </div>
      </PaperPageShell>
    </>
  );
}

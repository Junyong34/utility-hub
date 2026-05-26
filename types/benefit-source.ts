import type { RegionSlug, VerificationStatus } from './place-source.ts';

export type BenefitRegionSlug = 'national' | RegionSlug;

export type BenefitCategoryId = 'government' | 'regional' | 'savings';

export type BenefitAgeBand =
  | 'pregnancy-birth'
  | '0-23m'
  | '24-36m'
  | '3-5y'
  | '6-7y'
  | 'all';

export type BenefitForm =
  | 'cash'
  | 'voucher'
  | 'discount'
  | 'transport'
  | 'care'
  | 'facility';

export type BenefitApplicationMethod =
  | 'online'
  | 'resident-center'
  | 'card'
  | 'reservation'
  | 'provider'
  | 'mixed';

export interface BenefitSource {
  id: string;
  title: string;
  summary: string;
  categoryId: BenefitCategoryId;
  regions: BenefitRegionSlug[];
  ageBands: BenefitAgeBand[];
  benefitForms: BenefitForm[];
  applicationMethod: BenefitApplicationMethod;
  primaryActionLabel: string;
  primaryActionHref: string;
  officialSourceName: string;
  officialSourceUrl: string;
  verifiedAt: string;
  lastObservedAt: string;
  verificationStatus: VerificationStatus;
  priority: number;
  relatedPlaceIds?: string[];
  relatedToolIds?: string[];
  relatedPostSlug?: string;
  editorNote?: string;
}

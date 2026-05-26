import type {
  BenefitCategoryId,
  BenefitRegionSlug,
  BenefitSource,
} from '../../types/benefit-source.ts';
import { PUBLISHABLE_STATUSES } from '../../types/place-source.ts';

function isPublishableBenefit(benefit: BenefitSource): boolean {
  return PUBLISHABLE_STATUSES.includes(benefit.verificationStatus);
}

export function getPublishableBenefitsFrom(
  benefits: BenefitSource[]
): BenefitSource[] {
  return benefits.filter(isPublishableBenefit);
}

export function getBenefitsByCategoryFrom(
  benefits: BenefitSource[],
  categoryId: BenefitCategoryId
): BenefitSource[] {
  return getPublishableBenefitsFrom(benefits).filter(
    benefit => benefit.categoryId === categoryId
  );
}

export function getBenefitsByRegionFrom(
  benefits: BenefitSource[],
  region: BenefitRegionSlug
): BenefitSource[] {
  return getPublishableBenefitsFrom(benefits).filter(
    benefit =>
      benefit.regions.includes(region) || benefit.regions.includes('national')
  );
}

export function getFeaturedBenefitsFrom(
  benefits: BenefitSource[],
  limit = 6
): BenefitSource[] {
  return getPublishableBenefitsFrom(benefits)
    .toSorted((a, b) => b.priority - a.priority)
    .slice(0, limit);
}

export function getBenefitByIdFrom(
  benefits: BenefitSource[],
  id: string
): BenefitSource | undefined {
  return benefits.find(benefit => benefit.id === id);
}

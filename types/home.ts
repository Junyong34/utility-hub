export interface HomeFeaturedMeta {
  hotRank: number;
  badge?: string;
}

export type HomeAccentTone = 'olive' | 'sand' | 'brick' | 'sky';

export interface DashboardContentItem {
  id: string;
  type: 'blog' | 'tool';
  title: string;
  href: string;
  publishedAt: string;
  sourceLabel: 'BLOG' | 'TOOL';
  homeFeatured?: HomeFeaturedMeta;
}

export interface HomeFilterChip {
  id: string;
  label: string;
  href: string;
}

export interface HomeLinkCardItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  tone: HomeAccentTone;
  meta?: string;
  countLabel?: string;
}

export interface HomeGuideCardItem extends HomeLinkCardItem {
  publishedAt: string;
}

export interface HomeFeaturedPlaceCardItem {
  id: string;
  title: string;
  description: string;
  href: string;
  tone: HomeAccentTone;
  regionLabel: string;
  subRegion: string;
  categoryLabel: string;
  ageLabel: string;
  conditions: string[];
  thumbnailImage?: string;
  sourceUrl?: string;
}

export interface ParentingHomeContent {
  heroQuickFilters: HomeFilterChip[];
  regionLinks: HomeLinkCardItem[];
  scenarioLinks: HomeLinkCardItem[];
  toolLinks: HomeLinkCardItem[];
  benefitLinks: HomeLinkCardItem[];
  latestGuides: HomeGuideCardItem[];
  featuredPlaces: HomeFeaturedPlaceCardItem[];
}

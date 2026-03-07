export interface HomeFeaturedMeta {
  hotRank: number;
  badge?: string;
}

export interface DashboardContentItem {
  id: string;
  type: 'blog' | 'tool';
  title: string;
  href: string;
  publishedAt: string;
  sourceLabel: 'BLOG' | 'TOOL';
  homeFeatured?: HomeFeaturedMeta;
}

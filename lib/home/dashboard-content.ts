import type { PostMetadata } from '../blog/posts';
import { getAllPosts } from '../blog/posts';
import { getAllToolConfigs } from '../tools/tool-config';
import type { ToolConfig } from '../../types/tools';
import type { DashboardContentItem, HomeFeaturedMeta } from '../../types/home';


interface DashboardBlogSource extends Pick<
  PostMetadata,
  'title' | 'categorySlug' | 'date'
> {
  slug: string;
  homeFeatured?: HomeFeaturedMeta;
}

interface DashboardToolSource extends Pick<
  ToolConfig,
  'id' | 'name' | 'publishedAt'
> {
  homeFeatured?: HomeFeaturedMeta;
}

interface NormalizedDashboardContentItem extends DashboardContentItem {
  originalIndex: number;
}

function normalizeBlogItems(
  posts: DashboardBlogSource[]
): NormalizedDashboardContentItem[] {
  return posts.map((post, index) => ({
    id: `blog:${post.categorySlug}/${post.slug}`,
    type: 'blog',
    title: post.title,
    href: `/blog/${post.categorySlug}/${post.slug}`,
    publishedAt: post.date,
    sourceLabel: 'BLOG',
    homeFeatured: post.homeFeatured,
    originalIndex: index,
  }));
}

function normalizeToolItems(
  tools: DashboardToolSource[],
  startIndex: number
): NormalizedDashboardContentItem[] {
  return tools.map((tool, index) => ({
    id: `tool:${tool.id}`,
    type: 'tool',
    title: tool.name,
    href: `/tools/${tool.id}`,
    publishedAt: tool.publishedAt,
    sourceLabel: 'TOOL',
    homeFeatured: tool.homeFeatured,
    originalIndex: startIndex + index,
  }));
}

function stripOriginalIndex(
  item: NormalizedDashboardContentItem
): DashboardContentItem {
  return {
    id: item.id,
    type: item.type,
    title: item.title,
    href: item.href,
    publishedAt: item.publishedAt,
    sourceLabel: item.sourceLabel,
    homeFeatured: item.homeFeatured,
  };
}

function sortByLatest(
  a: NormalizedDashboardContentItem,
  b: NormalizedDashboardContentItem
): number {
  const dateDifference =
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

  if (dateDifference !== 0) {
    return dateDifference;
  }

  return a.originalIndex - b.originalIndex;
}

function sortByHotRank(
  a: NormalizedDashboardContentItem,
  b: NormalizedDashboardContentItem
): number {
  return (
    (a.homeFeatured?.hotRank ?? Number.POSITIVE_INFINITY) -
    (b.homeFeatured?.hotRank ?? Number.POSITIVE_INFINITY)
  );
}

export function buildDashboardContent(
  posts: DashboardBlogSource[],
  tools: DashboardToolSource[],
  limit = 3
): {
  latestItems: DashboardContentItem[];
  hotItems: DashboardContentItem[];
} {
  const blogItems = normalizeBlogItems(posts);
  const toolItems = normalizeToolItems(tools, blogItems.length);
  const allItems = [...blogItems, ...toolItems];

  return {
    latestItems: [...allItems]
      .sort(sortByLatest)
      .slice(0, limit)
      .map(stripOriginalIndex),
    hotItems: allItems
      .filter(item => item.homeFeatured)
      .sort(sortByHotRank)
      .slice(0, limit)
      .map(stripOriginalIndex),
  };
}

export function getHomeDashboardContent(limit = 3): {
  latestItems: DashboardContentItem[];
  hotItems: DashboardContentItem[];
} {
  return buildDashboardContent(getAllPosts(), getAllToolConfigs(), limit);
}

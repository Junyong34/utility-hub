export interface BlogListPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  category: string;
  categorySlug: string;
  ogImage?: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

export interface PostsPageResponse {
  posts: BlogListPost[];
  hasMore: boolean;
  total: number;
  currentPage: number;
  totalPages: number;
}

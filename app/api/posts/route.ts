import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog/posts';
import { PostsPageResponse } from '@/lib/blog/types';

/**
 * 블로그 포스트 페이지네이션 API
 * GET /api/posts?page=1&limit=20&category=development
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;

    // 모든 포스트 가져오기
    const allPosts = getAllPosts();

    // 카테고리 + 검색어 필터링
    const filteredPosts = allPosts.filter((post) => {
      const matchesCategory = category ? post.categorySlug === category : true;
      const matchesSearch = search
        ? post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          )
        : true;
      return matchesCategory && matchesSearch;
    });

    // 페이지네이션
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    const hasMore = endIndex < filteredPosts.length;

    const payload: PostsPageResponse = {
      posts: paginatedPosts,
      hasMore,
      total: filteredPosts.length,
      currentPage: page,
      totalPages: Math.ceil(filteredPosts.length / limit),
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

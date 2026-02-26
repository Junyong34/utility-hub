import { PostCard } from './PostCard';

interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  ogImage?: string;
}

interface PostListProps {
  posts: Post[];
}

/**
 * 블로그 포스트 목록 컴포넌트
 * 여러 포스트를 그리드 레이아웃으로 표시합니다
 */
export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">아직 작성된 포스트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </div>
  );
}

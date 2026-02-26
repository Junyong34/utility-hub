import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
}

/**
 * 블로그 포스트 카드 컴포넌트
 * 포스트 목록에서 개별 포스트를 표시합니다
 */
export function PostCard({ slug, title, date, author, excerpt, tags }: PostCardProps) {
  // 날짜 포맷팅
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <Card className="p-6 h-full transition-all hover:shadow-lg hover:border-primary">
        {/* 제목 */}
        <h2 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h2>

        {/* 메타 정보 */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <time dateTime={date}>{formattedDate}</time>
          <span>•</span>
          <span>{author}</span>
        </div>

        {/* 요약 */}
        <p className="text-foreground mb-4 line-clamp-3">{excerpt}</p>

        {/* 태그 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Card>
    </Link>
  );
}

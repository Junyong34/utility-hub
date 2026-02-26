import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  ogImage?: string;
}

/**
 * 블로그 포스트 카드 컴포넌트
 * 포스트 목록에서 개별 포스트를 표시합니다
 */
export function PostCard({
  slug,
  title,
  date,
  author,
  excerpt,
  tags,
  ogImage,
}: PostCardProps) {
  // 날짜 포맷팅
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <Card
        className={`overflow-hidden h-full transition-all hover:shadow-lg hover:border-primary ${!ogImage ? 'flex flex-col justify-center' : ''}`}
      >
        {/* OG 이미지 */}
        {ogImage && (
          <div className="relative aspect-[16/10] overflow-hidden bg-muted m-4 rounded-lg">
            <Image
              src={ogImage}
              alt={title}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="px-6 py-2">
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
              {tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

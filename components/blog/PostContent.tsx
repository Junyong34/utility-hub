import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { processMarkdown } from '@/lib/blog/markdown-processor';

interface PostContentProps {
  title: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
}

/**
 * 블로그 포스트 상세 콘텐츠 컴포넌트
 * 개별 포스트의 전체 내용을 표시합니다
 * unified + rehype-pretty-code를 사용하여 마크다운을 렌더링합니다
 */
export async function PostContent({ title, date, author, tags, content }: PostContentProps) {
  // 날짜 포맷팅
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 마크다운 처리
  const processedContent = await processMarkdown(content);

  return (
    <article className="w-full">
      {/* 헤더 */}
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{title}</h1>

        {/* 메타 정보 */}
        <div className="flex items-center gap-3 text-muted-foreground mb-6">
          <time dateTime={date} className="text-sm">
            {formattedDate}
          </time>
          <span>•</span>
          <span className="text-sm">{author}</span>
        </div>

        {/* 태그 */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Separator className="mt-6" />
      </header>

      {/* 마크다운 콘텐츠 */}
      <div className="prose prose-lg max-w-none">{processedContent}</div>
    </article>
  );
}

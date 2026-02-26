'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

/**
 * 블로그 태그 필터 컴포넌트
 * 태그를 선택하여 포스트를 필터링할 수 있습니다
 */
export function TagFilter({ tags, selectedTag, onTagSelect }: TagFilterProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-foreground mb-3">태그로 필터링</h3>
      <div className="flex flex-wrap gap-2">
        {/* 전체 보기 버튼 */}
        <Badge
          variant={selectedTag === null ? 'default' : 'outline'}
          className={cn(
            'cursor-pointer transition-all',
            selectedTag === null
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'hover:bg-accent'
          )}
          onClick={() => onTagSelect(null)}
        >
          전체
        </Badge>

        {/* 태그 버튼들 */}
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? 'default' : 'outline'}
            className={cn(
              'cursor-pointer transition-all',
              selectedTag === tag
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'hover:bg-accent'
            )}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

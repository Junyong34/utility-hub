'use client';

import { cn } from '@/lib/utils';
import { BlogCategory } from '@/lib/blog/types';

interface CategoryFilterProps {
  categories: BlogCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categorySlug: string | null) => void;
}

/**
 * 블로그 카테고리 필터 컴포넌트
 * 탭 형태로 카테고리를 표시합니다
 */
export function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) {
  if (categories.length === 0) {
    return null;
  }

  // 총 포스트 개수 계산
  const totalCount = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="mb-8">
      <div className="border-b border-border">
        <div className="flex flex-wrap gap-1">
          {/* 전체 탭 */}
          <button
            onClick={() => onCategorySelect(null)}
            className={cn(
              'relative px-4 py-3 text-sm font-medium transition-colors',
              'hover:text-foreground',
              selectedCategory === null
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            <span>전체 ({totalCount})</span>
            {selectedCategory === null && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>

          {/* 각 카테고리 탭 */}
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => onCategorySelect(category.slug)}
              className={cn(
                'relative px-4 py-3 text-sm font-medium transition-colors',
                'hover:text-foreground',
                selectedCategory === category.slug
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <span>
                {category.name} ({category.count})
              </span>
              {selectedCategory === category.slug && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

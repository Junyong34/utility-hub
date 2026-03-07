'use client';

import { PenLineIcon, SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BlogHeroSectionProps {
  totalPosts: number;
  categoryCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

/**
 * 블로그 메인 Hero 섹션
 * Tools 페이지의 Hero Box 스타일을 적용합니다
 */
export function BlogHeroSection({
  totalPosts,
  categoryCount,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: BlogHeroSectionProps) {
  return (
    <section className="pt-6 pb-5">
      {/* Hero Box */}
      <div className="rounded-xl border border-border/60 bg-muted/30 px-6 py-8 text-center backdrop-blur-sm">
        {/* Eyebrow */}
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs text-muted-foreground">
          <PenLineIcon className="h-3 w-3 text-primary" />
          Zen + Tools · 실용 도구 허브
        </span>

        {/* Title */}
        <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
          유용한 <span className="text-primary">인사이트</span>를 찾아보세요
        </h1>
        <p className="mb-6 max-w-md mx-auto text-sm leading-relaxed text-muted-foreground">
          일상, AI, 꿀팁 등 다양한 주제의
          <br />
          유용한 정보와 인사이트를 공유합니다.
        </p>

        {/* Search Bar */}
        <div className="flex gap-2 max-w-lg mx-auto mb-4">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onSearchSubmit()}
              placeholder="포스트 검색..."
              className="h-9 bg-background pl-8"
            />
          </div>
          <Button className="h-9 shrink-0 px-4" onClick={onSearchSubmit}>
            검색
          </Button>
        </div>

        {/* Stat row */}
        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <span>
            전체 <strong className="text-foreground">{totalPosts}개</strong>{' '}
            포스트
          </span>
          <span>·</span>
          <span>
            카테고리{' '}
            <strong className="text-foreground">{categoryCount}개</strong>
          </span>
          <span>·</span>
          <span>꾸준히 업데이트 중 ✍</span>
        </div>
      </div>
    </section>
  );
}

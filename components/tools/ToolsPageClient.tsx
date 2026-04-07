'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SearchIcon, ArrowRightIcon, WrenchIcon } from 'lucide-react';
import { Breadcrumb } from '@/components/seo';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ToolCategory, ToolListItem } from '@/lib/tools/types';
import { getToolIcon } from '@/lib/tools';
import { cn } from '@/lib/utils';

type CategoryKey = ToolCategory | 'all';

// badge 타입별 색상 스타일
function getBadgeClassName(badge: string): string {
  const lowerBadge = badge.toLowerCase();

  if (lowerBadge === 'new' || lowerBadge === '신규') {
    return 'border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
  }
  if (lowerBadge === 'popular' || lowerBadge === '인기') {
    return 'border-rose-500/50 bg-rose-500/10 text-rose-700 dark:text-rose-400';
  }
  if (lowerBadge === 'beta' || lowerBadge === '베타') {
    return 'border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-400';
  }
  if (lowerBadge === 'updated' || lowerBadge === '업데이트') {
    return 'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-400';
  }

  // 기본 스타일
  return 'border-border bg-muted text-foreground';
}

const CATEGORY_CONFIG: { value: CategoryKey; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'calculator', label: '계산기' },
  { value: 'generator', label: '생성기' },
  { value: 'converter', label: '변환기' },
  { value: 'utility', label: '유틸리티' },
  { value: 'other', label: '기타' },
];

interface ToolsPageClientProps {
  tools: ToolListItem[];
}

export function ToolsPageClient({ tools }: ToolsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  // ── 카테고리별 도구 수 계산 ──
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tools.length };
    tools.forEach((tool) => {
      const cat = tool.category ?? 'other';
      counts[cat] = (counts[cat] ?? 0) + 1;
    });
    return counts;
  }, [tools]);

  // 도구가 1개 이상인 카테고리만 표시 (전체 포함)
  const visibleCategories = CATEGORY_CONFIG.filter(
    (cat) => cat.value === 'all' || (categoryCounts[cat.value] ?? 0) > 0,
  );

  // 배지가 있는 주요 도구
  const featuredTools = useMemo(() => tools.filter((t) => t.badge), [tools]);

  // 검색 + 카테고리 필터 적용
  const filteredTools = useMemo(() => {
    let result = [...tools];
    if (activeCategory !== 'all') {
      result = result.filter((t) => (t.category ?? 'other') === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q),
      );
    }
    return result;
  }, [tools, activeCategory, searchQuery]);

  const isFiltered = activeCategory !== 'all' || searchQuery.trim() !== '';
  const showFeatured = !isFiltered && featuredTools.length > 0;
  const distinctCategoryCount = CATEGORY_CONFIG.filter(
    (c) => c.value !== 'all' && (categoryCounts[c.value] ?? 0) > 0,
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Hero Search ── */}
      <section className="pt-0 pb-5">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ name: '도구' }]} className="mb-4" />

        {/* Hero Box */}
        <div className="rounded-xl border border-border/60 bg-muted/30 px-6 py-8 text-center backdrop-blur-sm">
          {/* Eyebrow */}
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs text-muted-foreground">
            <WrenchIcon className="h-3 w-3 text-primary" />
            Zento Tools · 계산과 비교를 돕는 실전 도구
          </span>

          {/* Title */}
          <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
            필요한 계산과 비교를{' '}
            <span className="text-primary">찾아보세요</span>
          </h1>
          <p className="mb-6 max-w-lg mx-auto text-sm leading-relaxed text-muted-foreground">
            대출, 저축, 주택 비용처럼 돈이 걸린 판단을 빠르게 정리하고
            <br />
            일부 추천·실험형 도구까지 한곳에서 바로 확인할 수 있습니다.
          </p>

          {/* Search Bar */}
          <div className="flex gap-2 max-w-lg mx-auto mb-4">
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="도구 검색... (예: 대출, DSR, 주택, 로또)"
                className="h-9 bg-background pl-8"
              />
            </div>
            <Button className="h-9 shrink-0 px-4">검색</Button>
          </div>

          {/* Stat row */}
          <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <span>
              전체{' '}
              <strong className="text-foreground">{tools.length}개</strong> 도구
            </span>
            <span>·</span>
            <span>
              카테고리{' '}
              <strong className="text-foreground">{distinctCategoryCount}개</strong>
            </span>
            <span>·</span>
            <span>실전 계산 도구를 계속 보강 중</span>
          </div>
        </div>
      </section>

      {/* ── Category Pills ── */}
      <section className="pb-6">
        <div className="flex flex-wrap gap-2">
          {visibleCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all',
                activeCategory === cat.value
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {cat.label}
              <span
                className={cn(
                  'rounded-full px-1.5 text-xs',
                  activeCategory === cat.value
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {categoryCounts[cat.value] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── 주요 도구 (필터 없을 때만 표시) ── */}
      {showFeatured && (
        <section className="pb-6">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-lg font-bold">주요 도구</h2>
            <Badge variant="outline" className="text-xs font-normal">
              인기 · 신규
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featuredTools.map((tool) => {
              const Icon = getToolIcon(tool.iconName);
              return (
                <Link key={tool.id} href={tool.href}>
                  <Card className="group cursor-pointer py-0 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tool.color} text-white`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="text-base font-bold transition-colors group-hover:text-primary">
                            {tool.name}
                          </h3>
                          {tool.badge && (
                            <Badge
                              variant="outline"
                              className={cn(
                                "shrink-0 text-xs font-medium",
                                getBadgeClassName(tool.badge)
                              )}
                            >
                              {tool.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {tool.description}
                        </p>
                        <div className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                          사용하기
                          <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 전체 도구 그리드 ── */}
      <section className="pb-8">
        {showFeatured && (
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-lg font-bold">모든 도구</h2>
          </div>
        )}

        {filteredTools.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
            <SearchIcon className="mb-4 h-10 w-10 opacity-25" />
            <p className="mb-1 text-base font-medium">검색 결과가 없습니다</p>
            <p className="text-sm">다른 검색어나 카테고리를 시도해 보세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => {
              const Icon = getToolIcon(tool.iconName);
              return (
                <Link key={tool.id} href={tool.href}>
                  <Card className="group relative h-full cursor-pointer overflow-hidden py-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                    {/* hover 그라데이션 오버레이 */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.04]`}
                    />
                    <CardContent className="flex h-full flex-col p-5">
                      {/* 아이콘 + 배지 */}
                      <div className="mb-3 flex items-start justify-between">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tool.color} text-white`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        {tool.badge && (
                          <Badge
                            variant="outline"
                            className={cn(
                              "shrink-0 text-xs font-medium",
                              getBadgeClassName(tool.badge)
                            )}
                          >
                            {tool.badge}
                          </Badge>
                        )}
                      </div>

                      <h3 className="mb-1.5 text-base font-bold transition-colors group-hover:text-primary">
                        {tool.name}
                      </h3>
                      <p className="flex-1 text-xs leading-relaxed text-muted-foreground mb-4">
                        {tool.description}
                      </p>

                      <div className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                        사용하기
                        <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ── CTA Card ── */}
      <section className="pb-10">
        <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5 py-0">
          <CardContent className="p-8 text-center md:p-10">
            <h2 className="mb-2 text-xl font-bold md:text-2xl">
              원하는 도구가 없나요?
            </h2>
            <p className="mb-6 max-w-md mx-auto text-sm leading-relaxed text-muted-foreground">
              필요하신 도구가 있다면 제안해 주세요.
              <br />
              지속적으로 새로운 도구를 추가하고 있습니다.
            </p>
            <Button size="lg" asChild>
              <Link href="/faq">
                자주 묻는 질문 보기
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

    </div>
  );
}

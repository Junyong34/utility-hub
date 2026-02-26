'use client';

import { useEffect, useState } from 'react';
import { TocItem } from '@/lib/blog/markdown-processor';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BottomSheet } from '@/components/ui/bottom-sheet';

interface TableOfContentsProps {
  items: TocItem[];
}

/**
 * 블로그 포스트 목차 컴포넌트
 * - 데스크탑: 우측 고정 사이드바
 * - 모바일: 플로팅 버튼 + 바텀시트
 * - 스크롤 시 현재 섹션 자동 하이라이트
 */
export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  // Intersection Observer로 현재 보이는 섹션 추적
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0.1,
      }
    );

    // 모든 헤딩 요소 관찰
    const headings = items.map((item) => document.getElementById(item.id)).filter(Boolean);
    headings.forEach((heading) => {
      if (heading) observer.observe(heading);
    });

    return () => {
      headings.forEach((heading) => {
        if (heading) observer.unobserve(heading);
      });
    };
  }, [items]);

  // 목차 항목 클릭 핸들러
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setIsOpen(false); // 모바일에서 클릭 시 자동 닫기
    }
  };

  // 목차가 없으면 렌더링하지 않음
  if (items.length === 0) return null;

  // 목차 항목 렌더링 (데스크탑/모바일 공통)
  const renderTocItems = (isMobile = false) => (
    <nav className="space-y-1">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={cn(
            'block w-full text-left text-sm transition-colors',
            isMobile ? 'py-3 px-4 rounded-lg' : 'py-1.5 px-3 rounded',
            'hover:bg-accent hover:text-accent-foreground',
            item.level === 3 && (isMobile ? 'pl-8' : 'pl-6'),
            activeId === item.id
              ? 'bg-accent text-accent-foreground font-medium'
              : 'text-muted-foreground'
          )}
        >
          {item.text}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      {/* 데스크탑: 우측 고정 사이드바 */}
      <aside className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <p className="font-semibold text-sm mb-3 text-foreground">목차</p>
            {renderTocItems()}
          </div>
        </div>
      </aside>

      {/* 모바일: 플로팅 버튼 + 바텀시트 */}
      <div className="lg:hidden">
        {/* 플로팅 버튼 */}
        <Button
          size="icon"
          variant="ghost"
          className="fixed bottom-40 right-4 md:right-8 h-14 w-14 rounded-full shadow-sm z-40 bg-background/95 hover:bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/40"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? '목차 닫기' : '목차 열기'}
        >
          <List className="h-5 w-5 text-foreground" />
        </Button>

        {/* 바텀시트 */}
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="목차"
          maxHeight="70vh"
        >
          {renderTocItems(true)}
        </BottomSheet>
      </div>
    </>
  );
}

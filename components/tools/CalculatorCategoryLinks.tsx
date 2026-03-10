'use client';

import { ExternalLink } from 'lucide-react';
import { getAllToolConfigs } from '@/lib/tools/tool-config';
import type { ToolConfig } from '@/lib/tools/types';

interface CalculatorCategoryLinksProps {
  currentToolId: string;
  title?: string;
  compact?: boolean;
  className?: string;
}

export function CalculatorCategoryLinks({
  currentToolId,
  title = '다른 계산기',
  compact = false,
  className,
}: CalculatorCategoryLinksProps) {
  const allTools = getAllToolConfigs();

  // 'calculator' 카테고리에 속하고 현재 페이지가 아닌 도구들만 필터링
  const calculatorTools: ToolConfig[] = allTools.filter(
    (tool) => tool.category === 'calculator' && tool.id !== currentToolId
  );

  // 표시할 도구가 없으면 렌더링하지 않음
  if (calculatorTools.length === 0) {
    return null;
  }

  const headingClass = compact ? 'text-xs font-semibold' : 'text-sm font-bold';
  const linkClass = compact
    ? 'text-xs px-2 py-1.5'
    : 'text-sm px-2.5 py-2';

  return (
    <section className={className} aria-label="관련 계산기 링크">
      <h4 className={`${headingClass} text-foreground mb-2`}>{title}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {calculatorTools.map((tool) => (
          <a
            key={tool.id}
            href={`/tools/${tool.id}`}
            className={`inline-flex items-start justify-between gap-2 rounded-lg border border-border/70 bg-card text-foreground hover:bg-muted transition-colors ${linkClass}`}
            aria-label={`${tool.name} 페이지로 이동`}
          >
            <span>{tool.shortName || tool.name}</span>
            <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
          </a>
        ))}
      </div>
    </section>
  );
}

'use client';

import { ExternalLink } from 'lucide-react';

import type { ToolNavigationItem } from '../../../../shared/contracts/tool-manifest.ts';
import { useToolNavigationItems } from './catalog-context.tsx';

interface CalculatorCategoryLinksProps {
  currentToolId: string;
  title?: string;
  compact?: boolean;
  className?: string;
  items?: readonly ToolNavigationItem[];
}

export function CalculatorCategoryLinks({
  currentToolId,
  title = '다른 계산기',
  compact = false,
  className,
  items: injectedItems,
}: CalculatorCategoryLinksProps) {
  const contextItems = useToolNavigationItems();
  const items = injectedItems ?? contextItems;
  const calculatorTools = items.filter(
    tool => tool.category === 'calculator' && tool.id !== currentToolId
  );

  if (calculatorTools.length === 0) {
    return null;
  }

  const headingClass = compact ? 'text-xs font-semibold' : 'text-sm font-bold';
  const linkClass = compact ? 'text-xs px-2 py-1.5' : 'text-sm px-2.5 py-2';

  return (
    <section className={className} aria-label="관련 계산기 링크">
      <h4 className={`${headingClass} text-foreground mb-2`}>{title}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {calculatorTools.map(tool => (
          <a
            key={tool.id}
            href={tool.href}
            className={`inline-flex items-start justify-between gap-2 rounded-lg border border-border/70 bg-card text-foreground hover:bg-muted transition-colors ${linkClass}`}
            aria-label={`${tool.name} 페이지로 이동`}
          >
            <span>{tool.shortName}</span>
            <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
          </a>
        ))}
      </div>
    </section>
  );
}

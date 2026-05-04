import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PaperPageShellProps {
  children: ReactNode;
  className?: string;
  glowClassName?: string;
  gridClassName?: string;
  gridStyle?: CSSProperties;
}

const DEFAULT_MAIN_CLASS =
  'relative overflow-hidden bg-[linear-gradient(180deg,var(--cream-soft)_0%,var(--surface-cream-soft)_24%,var(--canvas)_62%,var(--surface)_100%)]';

const DEFAULT_GLOW_CLASS =
  'pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--sunshine-500)_28%,transparent),transparent_28%),radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_24%)]';

const DEFAULT_GRID_CLASS =
  'pointer-events-none absolute inset-x-6 top-52 -z-10 h-[36rem] rounded-[36px] bg-[linear-gradient(90deg,color-mix(in_srgb,var(--primary)_5%,transparent)_1px,transparent_1px),linear-gradient(color-mix(in_srgb,var(--primary)_5%,transparent)_1px,transparent_1px)] opacity-40';

export function PaperPageShell({
  children,
  className,
  glowClassName,
  gridClassName,
  gridStyle = { backgroundSize: '32px 32px' },
}: PaperPageShellProps) {
  return (
    <main className={cn(DEFAULT_MAIN_CLASS, className)}>
      <div className={cn(DEFAULT_GLOW_CLASS, glowClassName)} />
      <div
        className={cn(DEFAULT_GRID_CLASS, gridClassName)}
        style={gridStyle}
      />
      {children}
    </main>
  );
}

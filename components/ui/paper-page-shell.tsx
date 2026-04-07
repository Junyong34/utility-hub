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
  'relative overflow-hidden bg-[linear-gradient(180deg,#f6f0e6_0%,#f5f1e8_24%,#f7f5ef_62%,#faf8f5_100%)]';

const DEFAULT_GLOW_CLASS =
  'pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top_left,rgba(201,176,137,0.2),transparent_28%),radial-gradient(circle_at_top_right,rgba(128,151,134,0.12),transparent_24%)]';

const DEFAULT_GRID_CLASS =
  'pointer-events-none absolute inset-x-6 top-52 -z-10 h-[36rem] rounded-[36px] bg-[linear-gradient(90deg,rgba(121,101,76,0.04)_1px,transparent_1px),linear-gradient(rgba(121,101,76,0.04)_1px,transparent_1px)] opacity-40';

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
      <div className={cn(DEFAULT_GRID_CLASS, gridClassName)} style={gridStyle} />
      {children}
    </main>
  );
}

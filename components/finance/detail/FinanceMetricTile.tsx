import { cn } from '@/lib/utils';

const TONE_STYLES: Record<
  'neutral' | 'emerald' | 'rose' | 'sky' | 'amber',
  { border: string; label: string; value: string }
> = {
  neutral: {
    border: 'border-border/80',
    label: 'text-muted-foreground',
    value: 'text-foreground',
  },
  emerald: {
    border: 'border-emerald-200/70 dark:border-emerald-900/40',
    label: 'text-emerald-700/80 dark:text-emerald-300/80',
    value: 'text-emerald-700 dark:text-emerald-300',
  },
  rose: {
    border: 'border-rose-200/70 dark:border-rose-900/40',
    label: 'text-rose-700/80 dark:text-rose-300/80',
    value: 'text-rose-700 dark:text-rose-300',
  },
  sky: {
    border: 'border-sky-200/70 dark:border-sky-900/40',
    label: 'text-sky-700/80 dark:text-sky-300/80',
    value: 'text-sky-700 dark:text-sky-300',
  },
  amber: {
    border: 'border-amber-200/70 dark:border-amber-900/40',
    label: 'text-amber-700/80 dark:text-amber-300/80',
    value: 'text-amber-700 dark:text-amber-300',
  },
};

interface FinanceMetricTileProps {
  label: string;
  value: string;
  description?: string;
  tone?: keyof typeof TONE_STYLES;
  className?: string;
}

export function FinanceMetricTile({
  label,
  value,
  description,
  tone = 'neutral',
  className,
}: FinanceMetricTileProps) {
  const style = TONE_STYLES[tone];

  return (
    <div
      className={cn(
        'rounded-2xl border bg-background/80 p-4',
        style.border,
        className
      )}
    >
      <p className={cn('text-xs font-medium uppercase tracking-wide', style.label)}>
        {label}
      </p>
      <p className={cn('mt-1 text-2xl font-semibold tracking-tight', style.value)}>
        {value}
      </p>
      {description ? (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

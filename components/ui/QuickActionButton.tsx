'use client';

import { Button } from '@/components/ui/button';

interface QuickActionButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'compact';
}

export function QuickActionButton({
  label,
  onClick,
  variant = 'default',
}: QuickActionButtonProps) {
  if (variant === 'compact') {
    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onClick}
        className="h-8 rounded-md border border-input bg-background px-2.5 text-xs font-medium transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
      >
        {label}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onClick}
      className="h-9 rounded-md bg-background px-3 text-xs font-semibold transition-all hover:border-primary/50 hover:bg-primary/10 active:bg-primary/20"
    >
      {label}
    </Button>
  );
}

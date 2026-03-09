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
        className="h-8 px-2.5 text-xs font-medium rounded-full border border-input bg-background hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all"
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
      className="h-9 px-3 text-xs font-semibold rounded-full bg-background hover:bg-primary/10 hover:border-primary/50 active:bg-primary/20 transition-all"
    >
      {label}
    </Button>
  );
}

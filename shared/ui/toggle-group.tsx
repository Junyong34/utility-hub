'use client';

import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

import { cn } from '@/shared/ui/class-names';
import { toggleVariants } from '@/shared/ui/toggle';

const ToggleGroup = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ToggleGroupPrimitive.Root>) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn('flex items-center justify-center gap-1', className)}
    {...props}
  />
);
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = ({
  className,
  variant = 'default',
  size = 'default',
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ToggleGroupPrimitive.Item> & {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      toggleVariants({
        variant,
        size,
      }),
      className
    )}
    {...props}
  />
);
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };

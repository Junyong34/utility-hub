import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent bg-clip-padding text-button-md font-medium focus-visible:ring-3 aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground active:bg-primary-deep [a]:active:bg-primary-deep',
        outline:
          'border-hairline-strong bg-transparent text-foreground active:bg-cream-soft dark:bg-transparent aria-expanded:bg-cream-soft aria-expanded:text-foreground',
        secondary:
          'border-beige-deep bg-cream text-foreground active:bg-cream-deeper aria-expanded:bg-cream aria-expanded:text-foreground',
        cream:
          'border-beige-deep bg-cream text-foreground active:bg-cream-deeper',
        dark: 'bg-ink text-on-dark active:bg-charcoal dark:bg-foreground dark:text-background',
        onCream:
          'border-beige-deep bg-canvas text-foreground active:bg-cream-soft',
        ghost:
          'text-foreground hover:bg-transparent active:bg-cream-soft dark:hover:bg-transparent aria-expanded:bg-cream-soft aria-expanded:text-foreground',
        destructive:
          'bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-10 gap-1.5 px-5 has-data-[icon=inline-end]:pe-4 has-data-[icon=inline-start]:ps-4',
        xs: "h-8 gap-1 px-2.5 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1 px-3 text-[0.8rem] in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pe-2.5 has-data-[icon=inline-start]:ps-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-11 gap-1.5 px-6 has-data-[icon=inline-end]:pe-5 has-data-[icon=inline-start]:ps-5',
        icon: 'size-10',
        'icon-xs':
          "size-8 in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-9 in-data-[slot=button-group]:rounded-md',
        'icon-lg': 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

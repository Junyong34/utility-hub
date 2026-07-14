import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from '@/shared/ui/class-names';

interface ParentingSectionGridProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  href?: string;
  hrefLabel?: string;
  gridClassName?: string;
}

export function ParentingSectionGrid({
  eyebrow,
  title,
  description,
  children,
  href,
  hrefLabel = '전체 보기',
  gridClassName,
}: ParentingSectionGridProps) {
  return (
    <section className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
            {eyebrow}
          </p>
          <div className="space-y-3">
            <h2 className="text-[1.7rem] font-semibold leading-tight tracking-tight text-foreground sm:text-[2.25rem]">
              {title}
            </h2>
            <p className="max-w-2xl text-[14px] leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
              {description}
            </p>
          </div>
        </div>

        {href ? (
          <Link
            href={href}
            className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            <span>{hrefLabel}</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </div>

      <div
        className={cn(
          'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-[1.12fr_0.88fr_0.88fr_1.12fr]',
          gridClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

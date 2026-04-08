import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <section className="space-y-4 sm:space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
            {eyebrow}
          </p>
          <div className="space-y-2">
            <h2
              className="text-[1.35rem] font-semibold tracking-tight text-foreground sm:text-[2rem]"
              style={{
                fontFamily:
                  '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
              }}
            >
              {title}
            </h2>
            <p className="text-[13px] leading-5 text-muted-foreground sm:text-[15px] sm:leading-6">
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
          'grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4',
          gridClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

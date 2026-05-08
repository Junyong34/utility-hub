import Image from 'next/image';
import Link from 'next/link';
import { ExternalLinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  PlaceBlogReviewHighlight,
  PlaceExternalBlogLink,
} from '@/types/place-source';

interface PlaceBlogReviewSectionProps {
  reviews?: PlaceBlogReviewHighlight[];
  externalLinks?: PlaceExternalBlogLink[];
  className?: string;
}

export function PlaceBlogReviewSection({
  reviews = [],
  externalLinks = [],
  className,
}: PlaceBlogReviewSectionProps) {
  const visibleReviews = reviews.filter(isValidReview).slice(0, 3);
  const visibleExternalLinks = externalLinks.filter(isValidLink).slice(0, 3);

  if (visibleReviews.length === 0 && visibleExternalLinks.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="블로그 후기"
      className={cn(
        'relative overflow-hidden rounded-[18px] border border-primary/20 bg-[linear-gradient(145deg,color-mix(in_srgb,var(--primary)_5%,var(--canvas)),color-mix(in_srgb,var(--sunshine-300)_14%,var(--canvas)))] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_10px_26px_rgba(78,49,24,0.07)] transition-all duration-300 ease-out group-hover:border-primary/30 sm:p-4',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--primary)_55%,transparent),transparent)]" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold tracking-[0.08em] text-primary-deep/80 uppercase">
            블로그 후기
          </p>
          <h4
            className="mt-1 text-[1rem] font-semibold leading-tight text-foreground"
            style={{
              fontFamily: 'var(--font-editorial)',
            }}
          >
            방문 전 읽어볼 후기
          </h4>
        </div>

        {visibleReviews.length > 0 ? (
          <div className="hidden shrink-0 -space-x-2 sm:flex">
            {visibleReviews.map(review => (
              <div
                key={`${review.title}-avatar`}
                className="relative size-8 overflow-hidden rounded-[10px] border border-canvas bg-cream-soft shadow-subtle"
              >
                <Image
                  src={review.thumbnailImage}
                  alt=""
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {visibleReviews.length > 0 ? (
        <ul className="mt-3 space-y-2.5">
          {visibleReviews.map((review, index) => (
            <li key={`${review.title}-${index}`}>
              <ReviewPreviewCard review={review} index={index} />
            </li>
          ))}
        </ul>
      ) : null}

      {visibleExternalLinks.length > 0 ? (
        <div className="mt-3 border-t border-primary/15 pt-3">
          <p className="text-[12px] font-semibold text-primary-deep/85">
            외부 블로그 링크
          </p>
          <div className="mt-2 grid gap-2">
            {visibleExternalLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex w-full min-w-0 items-start justify-between gap-3 overflow-hidden rounded-[13px] border border-primary/15 bg-canvas/88 px-3 py-2.5 text-left text-[13px] font-semibold text-foreground/84 shadow-subtle transition-all duration-200 hover:-translate-y-px hover:border-primary/30 hover:bg-canvas active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
              >
                <span className="min-w-0 flex-1 overflow-hidden">
                  <span className="line-clamp-2 block max-w-full break-words leading-5 [overflow-wrap:anywhere]">
                    {link.title}
                  </span>
                  {link.description?.trim() ? (
                    <span className="mt-0.5 block line-clamp-1 text-[11px] font-medium leading-4 text-muted-foreground">
                      {link.description}
                    </span>
                  ) : null}
                  <span className="mt-0.5 block truncate text-[11px] font-medium text-muted-foreground">
                    {getExternalSourceLabel(link)}
                  </span>
                </span>
                <ExternalLinkIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-primary-deep/70 transition-transform duration-200 group-hover/link:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ReviewPreviewCard({
  review,
  index,
}: {
  review: PlaceBlogReviewHighlight;
  index: number;
}) {
  const content = (
    <>
      <div className="relative size-[3.75rem] overflow-hidden rounded-[13px] bg-cream-soft sm:size-16">
        <Image
          src={review.thumbnailImage}
          alt={`${review.title} 썸네일`}
          fill
          sizes="64px"
          className="object-cover transition-transform duration-300 group-hover/review:scale-[1.04]"
        />
      </div>
      <div className="min-w-0 self-center">
        <p className="line-clamp-1 text-[13px] font-semibold leading-5 text-foreground">
          {review.title}
        </p>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-5 text-muted-foreground">
          {review.description}
        </p>
        {review.sourceLabel ? (
          <p className="mt-1 text-[11px] font-semibold text-slate/80">
            {review.sourceLabel}
          </p>
        ) : null}
      </div>
    </>
  );

  const className =
    'group/review grid grid-cols-[3.75rem_minmax(0,1fr)] gap-3 rounded-[15px] border border-ink/5 bg-canvas/86 p-2 shadow-subtle transition-all duration-300 ease-out hover:-translate-y-px hover:border-primary/24 hover:bg-canvas active:translate-y-0 sm:grid-cols-[4rem_minmax(0,1fr)]';

  if (!review.href) {
    return (
      <article
        className={className}
        style={{
          transitionDelay: `${index * 35}ms`,
        }}
      >
        {content}
      </article>
    );
  }

  return (
    <Link
      href={review.href}
      target={isExternalHref(review.href) ? '_blank' : undefined}
      rel={isExternalHref(review.href) ? 'noopener noreferrer' : undefined}
      className={cn(
        className,
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35'
      )}
      style={{
        transitionDelay: `${index * 35}ms`,
      }}
    >
      {content}
    </Link>
  );
}

function isValidReview(review: PlaceBlogReviewHighlight): boolean {
  return Boolean(
    review.title.trim() &&
    review.description.trim() &&
    review.thumbnailImage.trim()
  );
}

function isValidLink(link: PlaceExternalBlogLink): boolean {
  return Boolean(link.title.trim() && link.href.trim());
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

function getExternalSourceLabel(link: PlaceExternalBlogLink): string {
  if (link.sourceLabel?.trim()) {
    return link.sourceLabel;
  }

  try {
    return new URL(link.href).hostname.replace(/^www\./, '');
  } catch {
    return '외부 블로그';
  }
}

import Link from 'next/link';
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react';
import type { BenefitSource } from '@/types/benefit-source';

function isInternalHref(href: string): boolean {
  return href.startsWith('/');
}

export function BenefitCard({ benefit }: { benefit: BenefitSource }) {
  const external = !isInternalHref(benefit.primaryActionHref);

  return (
    <article className="flex h-full flex-col rounded-[24px] border border-[#e3d8ca] bg-white/78 p-5 shadow-[0_14px_36px_rgba(56,46,33,0.06)]">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {benefit.regions.map(region => (
            <span
              key={region}
              className="rounded-full bg-[#eef3e7] px-2.5 py-1 text-[11px] font-semibold text-[#526049]"
            >
              {region === 'national' ? '전국' : region}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-[#2d271f]">
          {benefit.title}
        </h3>
        <p className="text-sm leading-6 text-[#6a5d4d]">{benefit.summary}</p>
      </div>

      <div className="mt-5 border-t border-[#ece2d6] pt-4 text-xs leading-5 text-[#7a6a58]">
        <p>출처: {benefit.officialSourceName}</p>
        <p>기준일: {benefit.verifiedAt}</p>
      </div>

      <Link
        href={benefit.primaryActionHref}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[#4c6651] transition-colors hover:text-[#2f4634]"
      >
        <span>{benefit.primaryActionLabel}</span>
        {external ? (
          <ExternalLinkIcon className="h-3.5 w-3.5" />
        ) : (
          <ArrowRightIcon className="h-3.5 w-3.5" />
        )}
      </Link>
    </article>
  );
}

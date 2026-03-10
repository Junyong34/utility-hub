'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { getLottoNumberPalette } from '@/lib/lotto/lotto-number-style';

const DynamicIconCloud = dynamic(
  () =>
    import('@/components/magicui/icon-cloud').then(module => module.IconCloud),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="h-[180px] w-[180px] rounded-full border border-white/40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),rgba(255,255,255,0.18)_38%,rgba(59,130,246,0.12)_75%,transparent_100%)] shadow-[0_18px_48px_rgba(14,165,233,0.16)] md:h-[230px] md:w-[230px]"
      />
    ),
  }
);

function buildLottoNumberIcon(number: number) {
  const palette = getLottoNumberPalette(number);

  return (
    <svg
      key={number}
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      aria-label={`로또 번호 ${number}`}
      role="img"
      style={{
        filter: `drop-shadow(0 10px 18px ${palette.shadowColor})`,
      }}
    >
      <circle
        cx="26"
        cy="26"
        r="15"
        fill={palette.backgroundColor}
        stroke={palette.borderColor}
        strokeWidth="2"
      />
      <circle cx="19" cy="18" r="5" fill="rgba(255,255,255,0.22)" />
      <text
        x="26"
        y="31"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={palette.textColor}
        fontFamily="system-ui, sans-serif"
      >
        {number}
      </text>
    </svg>
  );
}

const LOTTO_NUMBER_ICONS = Array.from({ length: 45 }, (_, index) =>
  buildLottoNumberIcon(index + 1)
);

export function LottoNumberCloud() {
  const [radius, setRadius] = useState(72);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const syncRadius = () => setRadius(mediaQuery.matches ? 92 : 72);

    syncRadius();
    mediaQuery.addEventListener('change', syncRadius);

    return () => mediaQuery.removeEventListener('change', syncRadius);
  }, []);

  return (
    <div className="relative mx-auto flex w-full max-w-[240px] items-center justify-center md:max-w-[300px]">
      <div className="absolute inset-4 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-300/10" />
      <DynamicIconCloud icons={LOTTO_NUMBER_ICONS} radius={radius} aria-hidden="true" />
    </div>
  );
}

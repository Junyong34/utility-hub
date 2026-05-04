import Link from 'next/link';
import { FOOTER_ITEMS, NAV_ITEMS } from './nav-config';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="sunset-stripe-band mt-16" aria-hidden="true" />
      <footer className="footer-region border-t border-beige-deep/70">
        <div className="max-w-screen-xl mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
            {/* 브랜드 */}
            <div className="min-w-0 space-y-2">
              <p className="text-sm font-semibold text-foreground">Zento</p>
              <p className="w-full max-w-[20rem] text-xs leading-relaxed text-slate">
                수도권 육아 가족을 위한 나들이 가이드.
                <br />
                지역·연령·날씨·예산 기준으로 장소와 정보를 정리합니다.
              </p>
            </div>

            {/* 링크 그룹 */}
            <div className="flex gap-12">
              {/* 주요 페이지 */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
                  메뉴
                </p>
                <ul className="space-y-2">
                  {NAV_ITEMS.map(item => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="footer-link text-xs transition-colors hover:text-primary-deep"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 소개/FAQ */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
                  안내
                </p>
                <ul className="space-y-2">
                  {FOOTER_ITEMS.map(item => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="footer-link text-xs transition-colors hover:text-primary-deep"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 하단 카피라이트 */}
          <div className="mt-8 pt-6 border-t border-beige-deep/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-slate">
              © {year} Zento. All rights reserved.
            </p>
            <p className="text-xs text-slate">
              정보 오류나 제안은{' '}
              <Link
                href="/faq"
                className="hover:text-foreground transition-colors underline underline-offset-2"
              >
                FAQ
              </Link>
              에서 확인하세요.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

import Link from 'next/link';

const FOOTER_LINKS = [
  { name: '아이와 갈 곳', href: '/places' },
  { name: '도구', href: '/tools' },
  { name: '블로그', href: '/blog' },
  { name: '혜택', href: '/benefits' },
  { name: '서비스 소개', href: '/about' },
  { name: '자주 묻는 질문', href: '/faq' },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-beige-deep/55 bg-canvas">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-7 px-4 py-7 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-7">
          <p className="text-xl font-extrabold text-primary">Zento</p>
          <p className="max-w-[25rem] text-xs leading-5 text-slate">
            아이와의 시간을 더 즐겁고, 더 가볍게. 서울·경기·인천 부모님을 위한
            생활 밀착형 가이드.
          </p>
        </div>

        <nav
          aria-label="푸터 링크"
          className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-medium text-slate"
        >
          {FOOTER_LINKS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-slate">
          © {year} Zento. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

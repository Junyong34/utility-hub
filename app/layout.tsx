import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { generateMetadata as createMetadata, SITE_CONFIG } from '@/lib/seo';
import { createWebSiteSchema, createOrganizationSchema } from '@/lib/seo';
import { AdSenseScript, JsonLdMultiple } from '@/components/seo';
import { DesktopNav } from '@/components/layout/desktop-nav';
import { BottomNav } from '@/components/layout/bottom-nav';
import { FloatingShareButton } from '@/components/ui/floating-share-button';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Providers } from './providers';
import { NAV_ITEMS } from '@/components/layout/nav-config';

/**
 * Method A: Single font with display swap
 * - Only Roboto (reduces network requests from 3 to 1)
 * - display: 'swap' for faster perceived load (shows fallback immediately)
 * - weights: [400, 500, 700] to cover all use cases
 */
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

/**
 * 글로벌 메타데이터 설정
 */
export const metadata: Metadata = createMetadata({
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  canonical: SITE_CONFIG.url,
  keywords: [
    '생활 가이드',
    '비용 비교',
    '주차 비교',
    '소비자 비교',
    '생활비 절약',
    '대출 계산기',
    'DSR 계산기',
    '저축 계산기',
    '주택 구입 비용 계산기',
    '실전 의사결정',
  ],
});

/**
 * Viewport 설정 (Core Web Vitals 최적화)
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

/**
 * Root Layout - Method A Optimized
 * - Single font (Roboto only)
 * - display: swap for faster initial render
 * - Removed redundant preconnect (next/font handles it)
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 구조화 데이터 생성
  const structuredData = [createWebSiteSchema(), createOrganizationSchema()];

  return (
    <html lang="ko" className={roboto.variable}>
      <head>
        {/* Preconnect only for non-font external resources */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />

        {/*{process.env.NODE_ENV === "development" && (*/}
        {/*  <Script*/}
        {/*    src="//unpkg.com/react-grab/dist/index.global.js"*/}
        {/*    crossOrigin="anonymous"*/}
        {/*    strategy="beforeInteractive"*/}
        {/*  />*/}
        {/*)}*/}
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="//unpkg.com/@react-grab/mcp/dist/client.global.js"
            strategy="lazyOnload"
          />
        )}
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/asset/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/asset/favicon-16x16.png"
        />

        {/* Apple Touch Icon */}
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/asset/apple-icon-152x152.png"
        />
        <link rel="apple-touch-icon" href="/asset/apple-icon.png" />

        {/* Android Icon */}
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/asset/android-icon-48x48.png"
        />

        {/* Web App Manifest */}
        <link rel="manifest" href="/asset/manifest.json" />

        {/* MS Tile */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/asset/ms-icon-70x70.png"
        />
        <meta name="msapplication-config" content="/asset/browserconfig.xml" />

        {/* Naver Site Verification */}
        <meta
          name="naver-site-verification"
          content="02fee2c3f11fc3e1adf2520de92918a360a75556"
        />

        {/* 구조화 데이터 (JSON-LD) */}
        <JsonLdMultiple data={structuredData} />

        {/* Google Analytics - Optimized with next/script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KG82C2B3TH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KG82C2B3TH');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <Providers>
          <NuqsAdapter>
            <AdSenseScript />
            <DesktopNav />
            <main className="md:pt-20 pb-24 md:pb-0">{children}</main>
            <BottomNav />
            {/* PC width에서만 공유하기 버튼 표시 (모바일은 BottomNav에 포함) */}
            <div className="hidden md:block">
              <FloatingShareButton />
            </div>
            {/*
              크롤러용 상시 노출 네비게이션 앵커
              BottomNav(md:hidden), DesktopNav(hidden md:block)가 뷰포트에 따라 숨겨지면
              크롤러가 해당 링크를 zero-dimensions로 인식하는 문제를 방지.
              sr-only는 display:none 대신 1px 크기로 렌더링되어 크롤러가 정상 인식함.
            */}
            <nav aria-label="사이트 내비게이션 링크" className="sr-only">
              {NAV_ITEMS.map(item => (
                <Link key={item.href} href={item.href}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </NuqsAdapter>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { generateMetadata as createMetadata, SITE_CONFIG } from "@/lib/seo";
import { createWebSiteSchema, createOrganizationSchema } from "@/lib/seo";
import { JsonLdMultiple } from "@/components/seo";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans", display: 'swap' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

/**
 * 글로벌 메타데이터 설정
 */
export const metadata: Metadata = createMetadata({
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  canonical: SITE_CONFIG.url,
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    '웹 개발',
    '유틸리티',
    '팁',
    '도구',
    '블로그',
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
 * Root Layout
 * - 글로벌 SEO 구조화 데이터 (Organization, WebSite)
 * - 폰트 최적화 (display: swap)
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 구조화 데이터 생성
  const structuredData = [
    createWebSiteSchema(),
    createOrganizationSchema(),
  ];

  return (
    <html lang="ko" className={roboto.variable}>
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/asset/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/asset/favicon-16x16.png" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="152x152" href="/asset/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" href="/asset/apple-icon.png" />

        {/* Android Icon */}
        <link rel="icon" type="image/png" sizes="192x192" href="/asset/android-icon-48x48.png" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/asset/manifest.json" />

        {/* MS Tile */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/asset/ms-icon-70x70.png" />
        <meta name="msapplication-config" content="/asset/browserconfig.xml" />

        {/* 구조화 데이터 (JSON-LD) */}
        <JsonLdMultiple data={structuredData} />

        {/* Google Analytics (필요시 추가) */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="md:pt-20 pb-24 md:pb-0">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}

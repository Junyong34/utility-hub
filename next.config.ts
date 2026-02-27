import type { NextConfig } from "next";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const nextConfig: NextConfig = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },

  // Allow cross-origin requests from development devices
  allowedDevOrigins: ['http://10.200.193.62', 'http://10.200.193.62:3000'],

  // 이미지 최적화 설정
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // 압축 활성화
  compress: true,

  // 리다이렉트 규칙 (필요시 추가)
  async redirects() {
    return [
      // 예시: /old-path -> /new-path
      // {
      //   source: '/old-blog/:slug',
      //   destination: '/blog/:slug',
      //   permanent: true, // 301 리다이렉트
      // },
    ];
  },

  // 헤더 설정 (보안 및 성능)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // 정적 자산 캐싱
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Trailing slash 정책 (일관성 유지)
  trailingSlash: false,

  // 파워풀한 빌드 분석 (프로덕션 빌드 시 번들 크기 분석)
  // ANALYZE=true pnpm build 로 실행 시 활성화
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer
            ? '../analyze/server.html'
            : './analyze/client.html',
        })
      );
    }

    return config;
  },
};

export default nextConfig;

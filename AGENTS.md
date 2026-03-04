# AGENTS.md

## Project Overview

**Zento** (www.zento.kr) is a Next.js application providing a collection of reusable utilities, interactive tools, and a blog platform. The name comes from "Zen + Info" representing a space that simplifies complex information. Built with React 19, TypeScript, Tailwind CSS, and shadcn/ui.

### Core Features
- **Blog System**: SSG-powered markdown blog with frontmatter support
  - 목차(TOC) 기능: H2/H3 헤딩 자동 추출 및 활성 섹션 추적
  - 반응형 레이아웃: 데스크탑(sticky 사이드바), 모바일(바텀시트)
  - 마크다운 처리: unified + rehype-pretty-code
  - 카테고리 필터링: 탭 형태 카테고리 필터 (전체/development/ai-image-creator)
  - 태그 필터링: 태그별 포스트 필터링 기능
  - 무한스크롤: React Query + Intersection Observer 기반 페이지네이션
  - OG 이미지: 블로그 포스트별 og:image 지원
  - SEO 최적화: ItemList Schema, noscript 태그, 사이트맵
- **Tools System**: Online utility tools with centralized SEO management
  - 중앙 관리형 Tool 설정: `lib/tools/tool-config.ts`에서 모든 Tool 정보 관리
  - 자동 SEO 적용: 메타데이터, 구조화 데이터, Sitemap 자동 생성
  - Schema.org 통합: SoftwareApplication, HowTo, FAQPage 스키마
  - **Blog SEO와 완전 분리**: 별도의 메타데이터/구조화 데이터 시스템
  - 현재 제공 Tool: 로또 번호 생성기 (추가 확장 가능)
- **Analytics**: Google Analytics 4 통합
  - 실시간 방문자 통계: 오늘 방문자 / 누적 방문자
  - 서버 사이드 API: GA4 Data API 기반
  - 캐싱 전략: 10분 TTL, stale-while-revalidate
- **Lotto Number Generator**: Interactive number generator with CSR/SSR hybrid approach
- **UI Component Library**: Built on shadcn/ui and Radix UI for accessibility
  - 재사용 가능한 BottomSheet 컴포넌트
  - 일관된 플로팅 버튼 스타일
- **URL State Management**: nuqs library for shareable URL-based state
  - Type-safe query parameter management
  - Seamless link sharing with preserved state
- **Static Pages**: About, FAQ 페이지
- **SEO Optimization**: Naver 사이트 검증, 구조화 데이터, AdSense 지원
  - Blog SEO: Article, BlogPosting 스키마 (lib/blog, lib/seo)
  - Tools SEO: SoftwareApplication, HowTo, FAQPage 스키마 (lib/tools)
  - 자동 sitemap 생성: `/sitemap.xml` (Blog + Tools 통합)

## General Instructions

- Make sure to think step-by-step when answering
- Do not fabricate information. If beyond knowledge, reply: "This information exceeds my knowledge."
- Provide evidence and assess reliability. If uncertain, say: "This may not be accurate."
- End with a brief conclusion
- 한국어로 답변해줘 (Answer in Korean)

## Build & Test Commands

### Development
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
```

### Code Quality
```bash
pnpm lint              # Run ESLint (basic check)
pnpm lint:check        # Full lint check (warnings as errors)
pnpm lint:fix          # Auto-fix lint issues
pnpm lint:staged       # Lint only staged files
pnpm type-check        # TypeScript type checking
pnpm format            # Format code with Prettier
pnpm format:check      # Check code formatting
```

### Requirements
- Node.js >= 22.0.0 (see `.nvmrc`)
- pnpm package manager

## Project Structure

```
utility-hub/
├── app/                    # Next.js App Router (pages & routing)
│   ├── blog/              # Blog pages (SSG)
│   ├── tools/             # Tools pages (SSR/CSR hybrid)
│   └── sitemap.ts         # Next.js sitemap generation
├── components/             # React components (ui/, blog/, lotto/, home/, layout/, seo/)
├── hooks/                  # Custom React hooks
├── lib/                    # Business logic & utilities
│   ├── blog/              # Blog 전용 로직
│   ├── tools/             # Tools 전용 로직 (SEO 포함)
│   └── seo/               # 공통 SEO 유틸리티
├── types/                  # TypeScript type definitions
│   ├── seo.ts             # SEO 타입
│   └── tools.ts           # Tools 타입
├── content/                # Static content (markdown posts)
├── public/                 # Static assets (images, og-images)
├── rules/                  # Project guidelines (detailed)
│   └── tools-seo-guidelines.md  # Tools SEO 가이드
├── docs/                   # Project documentation
├── AI/                     # AI-related assets (prompts, images)
├── .agents/                # Agent skills (blog-seo-writer, humanizer, etc.)
└── .ai/                    # AI configuration
```

**📖 상세 구조 정보**: [`rules/directory-structure.md`](./rules/directory-structure.md)
**📝 변경사항 이력**: [`rules/changelog.md`](./rules/changelog.md)
**🔧 Tools SEO 가이드**: [`rules/tools-seo-guidelines.md`](./rules/tools-seo-guidelines.md)

## Code Style & Conventions

### TypeScript
- Use strict TypeScript with proper typing
- Prefer interfaces over types for object shapes
- Use utility types from `lib/` when appropriate

### React/Next.js
- Use React 19 features (Server Components by default)
- Follow Next.js App Router conventions
- Use Tailwind CSS v4 with `@tailwindcss/postcss`
- **📖 컴포넌트 작성 가이드**: [`rules/component-guidelines.md`](./rules/component-guidelines.md)
- **📐 블로그 레이아웃 규칙**: [`rules/component-guidelines.md#블로그-레이아웃-가이드라인`](./rules/component-guidelines.md#블로그-레이아웃-가이드라인)

### Naming Conventions
- Components: PascalCase (e.g., `Button.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case for directories, PascalCase/camelCase for source files


## Development Guidelines

### Security
- Never commit sensitive data (API keys, tokens, credentials)
- Use environment variables for configuration
- Validate all user inputs

### Performance
- Optimize bundle size (dynamic imports when needed)
- Follow React/Next.js best practices
- Use proper caching strategies

### Before Committing
1. **포맷 검사**: `pnpm format:check` (Prettier 포맷팅 검사)
2. **타입 검사**: `pnpm type-check` (TypeScript 타입 에러 확인)
3. **린트 검사**: `pnpm lint:check` (코드 스타일 및 규칙 검사)
4. **자동 수정**: `pnpm lint:fix` (자동 수정 가능한 문제 해결)
5. **빌드 테스트**: `pnpm build` (프로덕션 빌드 확인)
6. **변경사항 확인**: 모든 변경사항이 예상대로 동작하는지 검증

**Tip**: `lint-staged`를 설치하면 staged 파일만 자동 검사 가능
```bash
pnpm add -D lint-staged
pnpm lint:staged  # git add한 파일만 검사
```

## Development Environment

### Code Formatting (Prettier)
- **Version**: 3.8.1
- **Config**: `.prettierrc` (no semicolons, single quotes, 2-space tabs)
- **Ignore**: `.prettierignore` (node_modules, .next, build artifacts)
- **📖 상세 설정**: [`rules/development-setup.md`](./rules/development-setup.md)

### URL State Management (nuqs)
- **Version**: 2.8.8
- **Setup**: `NuqsAdapter` wrapped in `app/layout.tsx`
- **Purpose**: Share application state via URLs (filters, search, pagination)
- **📖 사용 가이드**: [`rules/development-setup.md#nuqs-사용-가이드`](./rules/development-setup.md#nuqs-사용-가이드)


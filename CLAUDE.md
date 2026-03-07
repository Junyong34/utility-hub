# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server

# Code quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with auto-fix
pnpm type-check   # Run TypeScript type checking (tsc --noEmit)
pnpm format       # Format with Prettier
pnpm format:check # Check formatting

# Bundle analysis
ANALYZE=true pnpm build  # Generate bundle size report in analyze/
```

No test framework is configured in this project.

## Architecture

**Zento** is a Next.js 16 (App Router) site with two main content areas: a file-system-based blog and interactive tools.

### Content System

Blog posts are Markdown files stored in `content/posts/<categorySlug>/<slug>.md`. The directory structure determines the category — the first subdirectory under `content/posts/` becomes the `categorySlug`. Frontmatter fields `category` and `categorySlug` can override the path-derived values.

`lib/blog/posts.ts` provides all blog data access functions (`getAllPosts`, `getPostBySlug`, `getAllCategories`, etc.) by reading the filesystem at runtime/build time. All blog pages use SSG (`generateStaticParams`).

### App Router Structure

```
app/
  layout.tsx               # Root layout: nav, fonts, JSON-LD, GA4, AdSense
  providers.tsx            # React Query client provider
  page.tsx                 # Home page
  blog/
    page.tsx               # Blog list (SSG, loads via /api/posts)
    [category]/page.tsx    # Category filtered list
    [category]/[slug]/page.tsx  # Post detail (SSG)
  tools/
    page.tsx               # Tools index
    lotto/page.tsx         # Lotto number generator
  api/
    posts/route.ts         # GET /api/posts?page=&limit=&category=
    analytics/visitors/route.ts  # GA4 visitor stats
  (meta)/sitemap.ts        # Dynamic sitemap
  (error)/not-found.tsx    # 404 page
```

### SEO Layer

`lib/seo/` is the central SEO module. `SITE_CONFIG` in `lib/seo/metadata.ts` holds the site name ("Zento"), URL, and OG image defaults. All pages use `generateMetadata()` or `generateBlogPostMetadata()` for metadata. JSON-LD structured data is injected via `<JsonLdMultiple>` in the root layout and individual post pages.

### Analytics

`lib/analytics/ga4.ts` fetches visitor stats from the GA4 Data API using a service account (server-side only). It includes an in-process cache with 10-minute TTL and 1-hour stale-while-error fallback. Requires env vars: `GA4_PROPERTY_ID`, `GA4_CLIENT_EMAIL`, `GA4_PRIVATE_KEY`.

### UI Components

- `components/ui/` — Base UI primitives (Button, Card, Input, etc.) built with `@base-ui/react`, `radix-ui`, `class-variance-authority`, and Tailwind CSS 4
- `components/blog/` — Blog-specific components (PostContent, TableOfContents, PostCard, etc.)
- `components/layout/` — DesktopNav, BottomNav (mobile), Logo. Nav items are defined once in `nav-config.ts`
- `components/seo/` — JsonLd, Breadcrumb, AdSenseScript

### Path Aliases

`@/*` maps to the project root (e.g., `@/lib/blog/posts`, `@/components/ui/button`).

### Environment Variables

Copy `.env.example` to `.env.local` and populate:
- `NEXT_PUBLIC_SITE_URL` — canonical site URL
- `GA4_PROPERTY_ID`, `GA4_CLIENT_EMAIL`, `GA4_PRIVATE_KEY`, `GA4_BASELINE_DATE`, `GA4_TIMEZONE` — optional GA4 analytics; site works without them

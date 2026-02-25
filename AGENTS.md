# AGENTS.md

## Project Overview

**utility-hub** is a Next.js application providing a collection of reusable utilities, interactive tools, and a blog platform. Built with React 19, TypeScript, Tailwind CSS, and shadcn/ui.

### Core Features
- **Blog System**: SSG-powered markdown blog with frontmatter support
- **Lotto Number Generator**: Interactive number generator with CSR/SSR hybrid approach
- **UI Component Library**: Built on shadcn/ui and Radix UI for accessibility

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
```

### Requirements
- Node.js >= 22.0.0 (see `.nvmrc`)
- pnpm package manager

## Project Structure

```
utility-hub/
├── app/                    # Next.js App Router (pages & routing)
├── components/             # React components (ui/, blog/, lotto/, home/, layout/)
├── hooks/                  # Custom React hooks
├── lib/                    # Business logic & utilities
├── content/                # Static content (markdown posts)
├── public/                 # Static assets
├── rules/                  # Project guidelines (detailed)
└── docs/                   # Project documentation
```

**📖 상세 구조 정보**: [`rules/directory-structure.md`](./rules/directory-structure.md)
**📝 변경사항 이력**: [`rules/changelog.md`](./rules/changelog.md)

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
1. **타입 검사**: `pnpm type-check` (TypeScript 타입 에러 확인)
2. **린트 검사**: `pnpm lint:check` (코드 스타일 및 규칙 검사)
3. **자동 수정**: `pnpm lint:fix` (자동 수정 가능한 문제 해결)
4. **빌드 테스트**: `pnpm build` (프로덕션 빌드 확인)
5. **변경사항 확인**: 모든 변경사항이 예상대로 동작하는지 검증

**Tip**: `lint-staged`를 설치하면 staged 파일만 자동 검사 가능
```bash
pnpm add -D lint-staged
pnpm lint:staged  # git add한 파일만 검사
```


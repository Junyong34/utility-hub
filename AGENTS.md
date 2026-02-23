# AGENTS.md

## Project Overview

**utility-hub** is a Next.js application providing a collection of reusable utilities, TypeScript types, and configuration templates. Built with React 19, TypeScript, and Tailwind CSS.

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
pnpm lint         # Run ESLint
```

### Requirements
- Node.js >= 22.0.0 (see `.nvmrc`)
- pnpm package manager

## Project Structure

```
utility-hub/
├── app/              # Next.js app directory (App Router)
├── components/       # React components (shadcn/ui)
├── lib/             # Utility functions and helpers
├── public/          # Static assets
└── docs/            # Project documentation
```

## Code Style & Conventions

### TypeScript
- Use strict TypeScript with proper typing
- Prefer interfaces over types for object shapes
- Use utility types from `lib/` when appropriate

### React/Next.js
- Use React 19 features (Server Components by default)
- Follow Next.js App Router conventions
- Use shadcn/ui components for UI consistency

### Styling
- Use Tailwind CSS v4 with `@tailwindcss/postcss`
- Use `clsx` and `tailwind-merge` for conditional classes
- Follow component-based styling patterns

### Naming Conventions
- Components: PascalCase (e.g., `Button.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case for directories, PascalCase/camelCase for source files

## Git Workflow

### Branching
- Main branch: `main`
- Feature branches: `feature/description`
- Bug fixes: `fix/description`

### Commits
- Use conventional commits format
- Examples:
  - `feat: add user authentication`
  - `fix: resolve button click issue`
  - `docs: update README`
  - `chore: update dependencies`

### Pull Requests
- Create PRs against `main` branch
- Ensure all tests pass before merging
- Squash commits when merging

## Development Boundaries

### Security
- Never commit sensitive data (API keys, tokens, credentials)
- Use environment variables for configuration
- Validate all user inputs

### Performance
- Optimize bundle size (use dynamic imports when needed)
- Follow React/Next.js performance best practices
- Use proper caching strategies

### Testing
- Write tests for critical functionality
- Verify builds pass before committing
- Run `pnpm build` to check for type errors

## Available Skills

### Core Development Skills
- **brainstorming**: Use before any creative work - creating features, building components, adding functionality
- **test-driven-development**: Use when implementing features or bugfixes
- **systematic-debugging**: Use when encountering bugs or unexpected behavior
- **verification-before-completion**: Use before claiming work is complete

### Code Quality Skills
- **vercel-react-best-practices**: React/Next.js performance optimization guidelines
- **vercel-composition-patterns**: React composition patterns that scale
- **web-design-guidelines**: UI code review for accessibility and best practices
- **requesting-code-review**: Use before merging to verify work meets requirements
- **receiving-code-review**: Use when receiving code review feedback

### Workflow Skills
- **writing-plans**: Use for multi-step tasks before touching code
- **executing-plans**: Use to execute implementation plans with review checkpoints
- **subagent-driven-development**: Use for executing implementation plans with independent tasks
- **dispatching-parallel-agents**: Use for 2+ independent tasks without dependencies
- **using-git-worktrees**: Use for isolated feature work

### Skill Management
- **find-skills**: Discover and install agent skills
- **writing-skills**: Create or edit skills
- **skill-creator**: Guide for creating effective skills
- **skill-installer**: Install Codex skills from repositories

For complete skill documentation and usage instructions, see skill file paths in the original configuration.

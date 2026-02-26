# Development Setup Guide

프로젝트 개발 환경 설정 및 사용 가이드입니다.

## 목차
- [Prettier 설정](#prettier-설정)
- [nuqs 사용 가이드](#nuqs-사용-가이드)

---

## Prettier 설정

### 개요
Prettier는 일관된 코드 스타일을 유지하기 위한 자동 포맷팅 도구입니다.

### 설치
```bash
pnpm add -D prettier
```

### 설정 파일

#### `.prettierrc`
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "avoid"
}
```

**설정 설명:**
- `semi: false` - 세미콜론 사용하지 않음
- `singleQuote: true` - 싱글쿼트 사용
- `tabWidth: 2` - 들여쓰기 2칸
- `trailingComma: "es5"` - ES5 호환 trailing comma
- `printWidth: 80` - 한 줄 최대 80자
- `arrowParens: "avoid"` - 화살표 함수 파라미터 괄호 생략 (가능한 경우)

#### `.prettierignore`
```
node_modules
.next
out
dist
build
coverage
*.min.js
pnpm-lock.yaml
package-lock.json
yarn.lock
```

### 사용 방법

#### 명령어
```bash
# 전체 프로젝트 포맷팅
pnpm format

# 포맷팅 체크만 (변경하지 않음)
pnpm format:check

# 특정 파일/폴더 포맷팅
pnpm prettier --write "app/**/*.tsx"
```

#### VS Code 설정 (권장)
1. Prettier 확장 프로그램 설치
2. `.vscode/settings.json` 추가:
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 커밋 전 체크리스트
```bash
pnpm format:check  # 포맷팅 확인
pnpm lint:check    # ESLint 검사
pnpm type-check    # TypeScript 타입 검사
```

---

## nuqs 사용 가이드

### 개요
nuqs는 URL query parameter를 React state처럼 관리하는 라이브러리입니다. 링크를 공유해도 동일한 상태(필터, 검색어, 페이지네이션 등)를 유지할 수 있습니다.

### 특징
- ✅ Type-safe: TypeScript 완벽 지원
- ✅ Framework-agnostic: Next.js App Router, Pages Router, Remix 등 지원
- ✅ Lightweight: ~6KB gzipped
- ✅ SEO-friendly: URL에 상태가 저장되어 검색엔진 최적화
- ✅ Shareable: 링크 공유 시 동일한 상태 유지

### 설치
```bash
pnpm add nuqs
```

### 설정

#### `app/layout.tsx`
```tsx
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
      </body>
    </html>
  )
}
```

### 기본 사용법

#### 1. 기본 문자열 상태
```tsx
'use client'
import { useQueryState } from 'nuqs'

export default function SearchComponent() {
  const [search, setSearch] = useQueryState('q')

  return (
    <input
      type="text"
      value={search || ''}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="검색어 입력"
    />
  )
}
// URL: /?q=검색어
```

#### 2. 타입이 있는 상태 (숫자)
```tsx
'use client'
import { useQueryState, parseAsInteger } from 'nuqs'

export default function PaginationComponent() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  return (
    <div>
      <p>현재 페이지: {page}</p>
      <button onClick={() => setPage(page - 1)}>이전</button>
      <button onClick={() => setPage(page + 1)}>다음</button>
    </div>
  )
}
// URL: /?page=2
```

#### 3. 불리언 상태
```tsx
'use client'
import { useQueryState, parseAsBoolean } from 'nuqs'

export default function FilterComponent() {
  const [onlyFavorites, setOnlyFavorites] = useQueryState(
    'favorites',
    parseAsBoolean.withDefault(false)
  )

  return (
    <label>
      <input
        type="checkbox"
        checked={onlyFavorites}
        onChange={(e) => setOnlyFavorites(e.target.checked)}
      />
      즐겨찾기만 보기
    </label>
  )
}
// URL: /?favorites=true
```

#### 4. 배열 상태
```tsx
'use client'
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs'

export default function TagFilterComponent() {
  const [tags, setTags] = useQueryState(
    'tags',
    parseAsArrayOf(parseAsString).withDefault([])
  )

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag))
    } else {
      setTags([...tags, tag])
    }
  }

  return (
    <div>
      <button onClick={() => toggleTag('react')}>React</button>
      <button onClick={() => toggleTag('nextjs')}>Next.js</button>
      <button onClick={() => toggleTag('typescript')}>TypeScript</button>
      <p>선택된 태그: {tags.join(', ')}</p>
    </div>
  )
}
// URL: /?tags=react&tags=nextjs
```

### 고급 사용법

#### 1. 여러 상태 동시 관리
```tsx
'use client'
import { useQueryStates, parseAsInteger, parseAsString } from 'nuqs'

export default function BlogListComponent() {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    category: parseAsString.withDefault('all')
  })

  return (
    <div>
      <input
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <select
        value={filters.category}
        onChange={(e) => setFilters({ category: e.target.value })}
      >
        <option value="all">전체</option>
        <option value="tech">기술</option>
        <option value="life">일상</option>
      </select>
      <p>페이지: {filters.page}</p>
    </div>
  )
}
// URL: /?search=nextjs&page=2&category=tech
```

#### 2. 상태 초기화
```tsx
'use client'
import { useQueryState } from 'nuqs'

export default function ResetComponent() {
  const [search, setSearch] = useQueryState('q')

  const resetSearch = () => {
    setSearch(null) // null로 설정하면 URL에서 제거됨
  }

  return (
    <div>
      <input value={search || ''} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={resetSearch}>초기화</button>
    </div>
  )
}
```

#### 3. 디바운싱 (debounce)
```tsx
'use client'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

export default function DebouncedSearchComponent() {
  const [search, setSearch] = useQueryState('q')
  const [localSearch, setLocalSearch] = useState(search || '')

  // 500ms 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch || null)
    }, 500)

    return () => clearTimeout(timer)
  }, [localSearch, setSearch])

  return (
    <input
      value={localSearch}
      onChange={(e) => setLocalSearch(e.target.value)}
      placeholder="검색어 입력 (500ms 후 URL 업데이트)"
    />
  )
}
```

### Parser 종류

nuqs는 다양한 내장 parser를 제공합니다:

| Parser | 타입 | 예시 |
|--------|------|------|
| `parseAsString` | `string \| null` | `?q=hello` |
| `parseAsInteger` | `number \| null` | `?page=2` |
| `parseAsFloat` | `number \| null` | `?price=19.99` |
| `parseAsBoolean` | `boolean \| null` | `?active=true` |
| `parseAsArrayOf(parser)` | `T[] \| null` | `?tags=a&tags=b` |
| `parseAsStringLiteral(['a', 'b'])` | `'a' \| 'b' \| null` | `?sort=a` |
| `parseAsIsoDateTime` | `Date \| null` | `?date=2025-02-26T12:00:00Z` |

### 실제 사용 예시

#### 블로그 필터링 시스템
```tsx
'use client'
import { useQueryStates, parseAsString, parseAsArrayOf } from 'nuqs'

export default function BlogFilter() {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(''),
    tags: parseAsArrayOf(parseAsString).withDefault([]),
    category: parseAsString.withDefault('all')
  })

  return (
    <div>
      <input
        type="text"
        placeholder="검색..."
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />

      {/* 태그 필터 */}
      <div>
        {['react', 'nextjs', 'typescript'].map(tag => (
          <button
            key={tag}
            onClick={() => {
              const newTags = filters.tags.includes(tag)
                ? filters.tags.filter(t => t !== tag)
                : [...filters.tags, tag]
              setFilters({ tags: newTags })
            }}
            className={filters.tags.includes(tag) ? 'active' : ''}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 카테고리 선택 */}
      <select
        value={filters.category}
        onChange={(e) => setFilters({ category: e.target.value })}
      >
        <option value="all">전체</option>
        <option value="tech">기술</option>
        <option value="tutorial">튜토리얼</option>
      </select>

      {/* 필터 초기화 */}
      <button
        onClick={() => setFilters({
          search: '',
          tags: [],
          category: 'all'
        })}
      >
        필터 초기화
      </button>
    </div>
  )
}
// URL: /?search=next&tags=react&tags=typescript&category=tech
```

### Best Practices

#### 1. 기본값 설정
항상 `.withDefault()`를 사용하여 기본값을 설정하세요:
```tsx
const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
```

#### 2. 'use client' 지시어
nuqs는 클라이언트 컴포넌트에서만 사용 가능합니다:
```tsx
'use client'
import { useQueryState } from 'nuqs'
```

#### 3. 상태 초기화
상태를 제거하려면 `null`을 설정하세요:
```tsx
setSearch(null) // URL에서 ?search= 파라미터 제거
```

#### 4. 여러 상태 업데이트
여러 상태를 동시에 업데이트할 때는 `useQueryStates` 사용:
```tsx
const [filters, setFilters] = useQueryStates({...})
setFilters({ search: 'new', page: 1 }) // 한 번에 업데이트
```

### 주의사항

1. **Server Components에서 사용 불가**
   - nuqs는 클라이언트 컴포넌트(`'use client'`)에서만 사용 가능
   - Server Components에서는 `searchParams` prop 사용

2. **URL 길이 제한**
   - 브라우저 URL 길이 제한 고려 (일반적으로 ~2000자)
   - 큰 데이터는 URL에 저장하지 말 것

3. **SEO 고려사항**
   - 중요한 필터링은 URL에 포함하면 SEO에 유리
   - 임시 UI 상태는 일반 React state 사용 권장

### 참고 자료
- [nuqs 공식 문서](https://nuqs.dev)
- [GitHub Repository](https://github.com/47ng/nuqs)
- [Next.js App Router 가이드](https://nuqs.dev/docs/adapters)

---

## 추가 개발 도구

### ESLint
- **Config**: `eslint.config.mjs`
- **명령어**: `pnpm lint`, `pnpm lint:fix`

### TypeScript
- **Config**: `tsconfig.json`
- **명령어**: `pnpm type-check`

### 통합 체크
```bash
# 모든 검사 한번에 실행
pnpm format:check && pnpm lint:check && pnpm type-check && pnpm build
```

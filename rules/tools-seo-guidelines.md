# Tools SEO Guidelines

> **중요**: Blog SEO와 완전히 분리된 Tools 전용 SEO 시스템입니다.

## 📋 개요

Tools 페이지는 사용자에게 유용한 온라인 도구를 제공하는 서비스입니다. 이 문서는 Tools SEO 최적화를 위한 가이드라인을 제공합니다.

## 🏗️ 아키텍처

### 디렉토리 구조

```
lib/
  tools/                         # Tools 전용 라이브러리 (Blog와 완전 분리)
    ├── tool-config.ts          # Tool 정보 중앙 관리
    ├── tool-metadata.ts        # Tool 메타데이터 생성
    ├── tool-structured-data.ts # Tool 구조화 데이터 생성
    └── index.ts                # Export 통합

types/
  └── tools.ts                  # Tools 전용 타입 정의

app/
  ├── sitemap.ts                # Next.js 표준 sitemap 생성
  └── tools/
      ├── page.tsx              # Tools 메인 페이지
      └── [toolId]/
          └── page.tsx          # 개별 Tool 페이지
```

### Blog SEO와의 분리

| 항목 | Blog | Tools | 비고 |
|------|------|-------|------|
| 메타데이터 생성 | `generateBlogPostMetadata()` | `generateToolMetadata()` | 별도 함수 |
| 구조화 데이터 | `createBlogPostStructuredData()` | `createToolStructuredData()` | 별도 함수 |
| Schema 타입 | Article, BlogPosting | SoftwareApplication, WebApplication | 다른 스키마 |
| Sitemap 함수 | `getBlogPostPages()` | `getToolPages()` | 별도 함수 |
| 설정 관리 | `lib/blog/posts.ts` | `lib/tools/tool-config.ts` | 완전 분리 |

## 📝 새 Tool 추가하기

### 1단계: Tool 설정 추가

`lib/tools/tool-config.ts`에 새 Tool 설정을 추가합니다:

```typescript
export const TOOL_CONFIGS: Record<string, ToolConfig> = {
  // 기존 Tool들...

  'new-tool': {
    id: 'new-tool',
    name: '새 도구 이름',
    description: '도구에 대한 자세한 설명...',
    keywords: ['키워드1', '키워드2', '키워드3'],
    category: 'converter', // generator | converter | calculator | utility | other
    ogImage: '/og-images/tool-new-tool.png',
    badge: '신규', // 선택사항
    color: 'from-green-500 to-blue-500',
    icon: 'IconName', // lucide-react 아이콘 이름

    // SEO 최적화를 위한 추가 정보
    features: [
      '주요 기능 1',
      '주요 기능 2',
      '주요 기능 3',
    ],
    useCases: [
      '사용 사례 1',
      '사용 사례 2',
    ],

    // FAQ (선택사항)
    faq: [
      {
        question: '질문 1',
        answer: '답변 1',
      },
    ],

    // 사용 방법 (선택사항)
    howTo: [
      {
        name: '단계 1',
        text: '단계 1 설명',
      },
    ],

    applicationCategory: 'UtilityApplication',
    estimatedTime: 'PT5M', // ISO 8601 duration (5분)
  },
};
```

### 2단계: 아이콘 매핑 추가

`app/tools/page.tsx`의 `ICON_MAP`에 아이콘을 추가합니다:

```typescript
import { DicesIcon, IconName } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  DicesIcon: DicesIcon,
  IconName: IconName, // 새로운 아이콘 추가
};
```

### 3단계: Tool 페이지 생성

`app/tools/[toolId]/page.tsx` 생성:

```typescript
import { Metadata } from 'next';
import { JsonLdMultiple } from '@/components/seo';
import {
  generateToolMetadata,
  getToolStructuredDataArray,
} from '@/lib/tools';

export const metadata: Metadata = generateToolMetadata('new-tool');

export default function NewToolPage() {
  const structuredData = getToolStructuredDataArray('new-tool');

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      {/* Tool UI 구현 */}
    </>
  );
}
```

### 4단계: 자동 적용 확인

다음 항목들이 자동으로 적용됩니다:

- ✅ Tools 메인 페이지에 카드 자동 표시
- ✅ SEO 메타데이터 자동 생성 (title, description, keywords, OG)
- ✅ 구조화 데이터 자동 생성 (SoftwareApplication, FAQ, HowTo)
- ✅ Sitemap에 자동 포함 (`/sitemap.xml`)
- ✅ Breadcrumb 자동 생성

## 🎯 SEO 최적화 전략

### 메타데이터 최적화

#### Title
- 형식: `[Tool 이름] | Zento`
- 예시: `로또 번호 생성기 | Zento`
- 길이: 50-60자 이내

#### Description
- 구체적인 기능 설명 포함
- 150-160자 이내
- 행동 유도 문구 포함
- 예시: "행운의 로또 번호를 자동으로 생성해보세요. 1~45 사이의 중복되지 않는 랜덤 번호 6개를 생성하고 저장할 수 있습니다."

#### Keywords
- Primary Keywords: [Tool명] + "도구", "온라인", "무료"
- Long-tail Keywords: [Tool명] + "사용법", "방법", "추천"
- 5-10개 키워드 권장

### 구조화 데이터 (Schema.org)

Tools는 다음 구조화 데이터를 사용합니다:

1. **SoftwareApplication / WebApplication**
   - Tool을 웹 애플리케이션으로 정의
   - 무료 제공 명시 (price: 0)
   - 주요 기능 목록 포함

2. **HowTo Schema**
   - 사용 방법 단계별 안내
   - 검색 결과에 Rich Snippet으로 표시

3. **FAQPage Schema**
   - 자주 묻는 질문
   - Featured Snippet 타겟

4. **WebPage + BreadcrumbList**
   - 페이지 구조 정의
   - 네비게이션 경로 명시

### Sitemap 최적화

- **changeFrequency**: monthly (Tool 페이지는 변경 빈도 낮음)
- **priority**: 0.7 (메인 페이지보다 낮음)
- **lastModified**: 자동 설정

## 🔍 검색 노출 전략

### 타겟 검색어

- **[Tool명]**: "로또 번호 생성기"
- **[Tool명] + 용도**: "로또 번호 생성기 무료"
- **[Tool명] + 방법**: "로또 번호 추천 방법"
- **[Tool명] + 온라인**: "온라인 로또 번호 생성"

### Rich Snippets 타겟

1. **HowTo Snippet**: 사용 방법 단계 노출
2. **FAQ Snippet**: 자주 묻는 질문 노출
3. **Rating Snippet**: 향후 사용자 평점 추가 시

### Internal Linking

- Tools 메인 페이지에서 개별 Tool 링크
- 관련 Tool 간 상호 링크 (relatedTools 활용)
- Blog 포스트에서 Tool 링크

## ⚠️ 주의사항

### Blog SEO와 충돌 방지

```typescript
// ❌ 잘못된 예시 - Blog 함수 사용
import { generateBlogPostMetadata } from '@/lib/seo';
export const metadata = generateBlogPostMetadata(...);

// ✅ 올바른 예시 - Tools 함수 사용
import { generateToolMetadata } from '@/lib/tools';
export const metadata = generateToolMetadata('tool-id');
```

### 공통 함수 사용

다음 함수들은 Blog와 Tools가 공유합니다:

- ✅ `generateMetadata()` (기본 메타데이터 생성)
- ✅ `createWebPageSchema()` (WebPage 스키마)
- ✅ `createBreadcrumbSchema()` (Breadcrumb 스키마)
- ✅ `createFAQSchema()` (FAQ 스키마)
- ✅ `createHowToSchema()` (HowTo 스키마)

### 구조화 데이터 검증

새 Tool 추가 후 반드시 검증:

1. [Google Rich Results Test](https://search.google.com/test/rich-results)
2. [Schema.org Validator](https://validator.schema.org/)

## 📊 성과 측정

### Google Search Console

- 검색 노출수 (Impressions)
- 클릭수 (Clicks)
- CTR (Click-Through Rate)
- 평균 순위 (Average Position)

### 핵심 지표

- Tool별 유입 키워드
- Rich Snippet 노출 비율
- 페이지 체류 시간
- Bounce Rate

## 🚀 향후 개선 사항

### Phase 1 (완료)
- ✅ Tools SEO 인프라 구축
- ✅ SoftwareApplication 스키마 적용
- ✅ FAQ, HowTo 스키마 적용
- ✅ Sitemap 자동 생성

### Phase 2 (예정)
- ⏳ Tool별 OG 이미지 자동 생성
- ⏳ 사용자 평점 시스템 (AggregateRating)
- ⏳ Tool 카테고리 페이지 생성
- ⏳ 관련 Tool 추천 시스템

### Phase 3 (예정)
- ⏳ A/B 테스팅 (제목, 설명 최적화)
- ⏳ 다국어 지원 (hreflang)
- ⏳ AMP 페이지 지원

## 📚 참고 자료

- [Schema.org - SoftwareApplication](https://schema.org/SoftwareApplication)
- [Schema.org - HowTo](https://schema.org/HowTo)
- [Schema.org - FAQPage](https://schema.org/FAQPage)
- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

## 🤝 기여 가이드

새 Tool 추가 체크리스트:

- [ ] `lib/tools/tool-config.ts`에 설정 추가
- [ ] 키워드, 설명 최적화
- [ ] FAQ, HowTo 작성 (선택)
- [ ] OG 이미지 준비
- [ ] Tool 페이지 구현
- [ ] 로컬 테스트 (`/tools`, `/tools/[id]`)
- [ ] Sitemap 확인 (`/sitemap.xml`)
- [ ] Rich Results Test 검증
- [ ] 프로덕션 배포 후 Google Search Console 확인

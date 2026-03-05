/**
 * Tools 관련 타입 정의
 * Blog SEO와 완전히 분리된 Tools 전용 타입
 */

/**
 * Tool 카테고리
 */
export type ToolCategory = 'generator' | 'converter' | 'calculator' | 'utility' | 'other';

/**
 * FAQ 아이템
 */
export interface ToolFAQItem {
  question: string;
  answer: string;
}

/**
 * HowTo 스텝
 */
export interface ToolHowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

/**
 * Tool 설정 인터페이스
 * 각 Tool의 메타데이터와 SEO 정보를 중앙 관리
 */
export interface ToolConfig {
  /** 고유 ID (URL path로 사용) */
  id: string;

  /** Tool 이름 */
  name: string;

  /** 짧은 이름 (선택) */
  shortName?: string;

  /** Breadcrumb에 표시될 라벨 (기본값: name) */
  breadcrumbLabel?: string;

  /** 상세 설명 */
  description: string;

  /** SEO 키워드 */
  keywords: string[];

  /** Tool 카테고리 */
  category: ToolCategory;

  /** OG 이미지 경로 */
  ogImage?: string;

  /** 배지 텍스트 (예: "인기", "신규") */
  badge?: string;

  /** 그라데이션 컬러 (Tailwind classes) */
  color?: string;

  /** 아이콘 이름 (lucide-react) */
  icon?: string;

  /** 주요 기능 목록 */
  features?: string[];

  /** 사용 사례 */
  useCases?: string[];

  /** FAQ 목록 */
  faq?: ToolFAQItem[];

  /** 사용 방법 (HowTo) */
  howTo?: ToolHowToStep[];

  /** 앱 카테고리 (Schema.org applicationCategory) */
  applicationCategory?: string;

  /** 예상 사용 시간 (ISO 8601 duration, 예: "PT5M") */
  estimatedTime?: string;

  /** 필요한 도구/재료 */
  tools?: string[];

  /** 관련 Tool ID 목록 */
  relatedTools?: string[];
}

/**
 * Tool 목록 UI 렌더링용 인터페이스
 */
export interface ToolDisplayItem {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  color: string;
  category?: ToolCategory;
}

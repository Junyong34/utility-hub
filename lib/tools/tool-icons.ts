/**
 * Tool 아이콘 동적 로딩 시스템
 * lucide-react에서 아이콘을 자동으로 가져와 수동 매핑 제거
 */

import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

/**
 * 아이콘 캐시
 * 동일한 아이콘을 여러 번 조회할 때 성능 향상
 */
const iconCache = new Map<string, LucideIcon>();

/**
 * 기본 아이콘 (아이콘을 찾을 수 없을 때 사용)
 */
const DEFAULT_ICON: LucideIcon = LucideIcons.Box;

/**
 * Tool 아이콘을 동적으로 가져오기
 * @param iconName - lucide-react 아이콘 이름 (예: 'DicesIcon', 'Calculator', 'Wrench')
 * @returns 아이콘 컴포넌트
 *
 * @example
 * ```tsx
 * const Icon = getToolIcon('DicesIcon');
 * <Icon className="h-6 w-6" />
 * ```
 *
 * @remarks
 * - 아이콘 이름은 대소문자를 구분합니다
 * - 존재하지 않는 아이콘은 기본 아이콘(Box)으로 대체됩니다
 * - 캐싱을 사용하여 성능 최적화
 */
export function getToolIcon(iconName?: string): LucideIcon {
  if (!iconName) {
    return DEFAULT_ICON;
  }

  // 캐시 확인
  if (iconCache.has(iconName)) {
    return iconCache.get(iconName)!;
  }

  // lucide-react에서 아이콘 찾기
  const icon = (LucideIcons as Record<string, any>)[iconName];

  if (icon && typeof icon === 'function') {
    // 캐시에 저장
    iconCache.set(iconName, icon as LucideIcon);
    return icon as LucideIcon;
  }

  // 아이콘을 찾을 수 없으면 경고 후 기본 아이콘 반환
  console.warn(`Icon "${iconName}" not found in lucide-react. Using default icon.`);
  iconCache.set(iconName, DEFAULT_ICON);
  return DEFAULT_ICON;
}

/**
 * 여러 Tool의 아이콘을 한 번에 가져오기
 * @param iconNames - 아이콘 이름 배열
 * @returns 아이콘 컴포넌트 배열
 *
 * @example
 * ```tsx
 * const icons = getToolIcons(['DicesIcon', 'Calculator', 'Wrench']);
 * icons.forEach((Icon, index) => <Icon key={index} className="h-6 w-6" />);
 * ```
 */
export function getToolIcons(iconNames: string[]): LucideIcon[] {
  return iconNames.map(getToolIcon);
}

/**
 * 아이콘이 존재하는지 확인
 * @param iconName - 아이콘 이름
 * @returns 존재 여부
 *
 * @example
 * ```tsx
 * if (isValidIcon('DicesIcon')) {
 *   console.log('Valid icon');
 * }
 * ```
 */
export function isValidIcon(iconName: string): boolean {
  return iconName in LucideIcons && typeof (LucideIcons as any)[iconName] === 'function';
}

/**
 * 캐시 초기화 (테스트용)
 */
export function clearIconCache(): void {
  iconCache.clear();
}

/**
 * 사용 가능한 모든 아이콘 이름 가져오기 (디버깅용)
 * @returns 아이콘 이름 배열
 */
export function getAvailableIcons(): string[] {
  return Object.keys(LucideIcons).filter(
    (key) => typeof (LucideIcons as any)[key] === 'function'
  );
}

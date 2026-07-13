import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const lucideIconMap = LucideIcons as Record<string, unknown>;
const iconCache = new Map<string, LucideIcon>();
const DEFAULT_ICON: LucideIcon = LucideIcons.Box;

export function getToolIcon(iconName?: string): LucideIcon {
  if (!iconName) {
    return DEFAULT_ICON;
  }

  const cachedIcon = iconCache.get(iconName);
  if (cachedIcon) {
    return cachedIcon;
  }

  const icon = lucideIconMap[iconName];

  if (icon && (typeof icon === 'function' || typeof icon === 'object')) {
    const resolvedIcon = icon as LucideIcon;
    iconCache.set(iconName, resolvedIcon);
    return resolvedIcon;
  }

  console.warn(
    `Icon "${iconName}" not found in lucide-react. Using default icon.`
  );
  iconCache.set(iconName, DEFAULT_ICON);
  return DEFAULT_ICON;
}

export function getToolIcons(iconNames: string[]): LucideIcon[] {
  return iconNames.map(getToolIcon);
}

export function isValidIcon(iconName: string): boolean {
  return (
    iconName in LucideIcons &&
    ['function', 'object'].includes(typeof lucideIconMap[iconName])
  );
}

export function clearIconCache(): void {
  iconCache.clear();
}

export function getAvailableIcons(): string[] {
  return Object.keys(LucideIcons).filter(key =>
    ['function', 'object'].includes(typeof lucideIconMap[key])
  );
}

import {
  AlarmClock,
  Box,
  Calculator,
  DicesIcon,
  Home,
  PiggyBank,
  Timer,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const toolIconMap = {
  AlarmClock,
  Box,
  Calculator,
  DicesIcon,
  Home,
  PiggyBank,
  Timer,
} satisfies Record<string, LucideIcon>;

const iconCache = new Map<string, LucideIcon>();
const DEFAULT_ICON = Box;

function isRegisteredToolIcon(
  iconName: string
): iconName is keyof typeof toolIconMap {
  return Object.prototype.hasOwnProperty.call(toolIconMap, iconName);
}

export function getToolIcon(iconName?: string): LucideIcon {
  if (!iconName) {
    return DEFAULT_ICON;
  }

  const cachedIcon = iconCache.get(iconName);
  if (cachedIcon) {
    return cachedIcon;
  }

  if (isRegisteredToolIcon(iconName)) {
    const icon = toolIconMap[iconName];
    iconCache.set(iconName, icon);
    return icon;
  }

  console.warn(
    `Icon "${iconName}" is not registered for tools. Using default icon.`
  );
  iconCache.set(iconName, DEFAULT_ICON);
  return DEFAULT_ICON;
}

export function getToolIcons(iconNames: string[]): LucideIcon[] {
  return iconNames.map(getToolIcon);
}

export function isValidIcon(iconName: string): boolean {
  return isRegisteredToolIcon(iconName);
}

export function clearIconCache(): void {
  iconCache.clear();
}

export function getAvailableIcons(): string[] {
  return Object.keys(toolIconMap);
}

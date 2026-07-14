import { DSR_CALCULATOR_MANIFEST } from '../../dsr-calculator/public.ts';
import { HOME_BUYING_FUNDS_CALCULATOR_MANIFEST } from '../../home-buying-funds-calculator/public.ts';
import { LAST_DIGIT_GAME_MANIFEST } from '../../last-digit-game/public.ts';
import { LOAN_CALCULATOR_MANIFEST } from '../../loan-calculator/public.ts';
import { LOTTO_MANIFEST } from '../../lotto/public.ts';
import { POMODORO_MANIFEST } from '../../pomodoro/public.ts';
import { SAVINGS_CALCULATOR_MANIFEST } from '../../savings-calculator/public.ts';
import type {
  ToolCategory,
  ToolListItem,
  ToolManifest,
  ToolNavigationItem,
} from '../../../../shared/contracts/tool-manifest.ts';

/**
 * Registration order is part of the public product contract.
 * Add new tools deliberately rather than discovering the filesystem.
 */
export const TOOL_MANIFESTS = [
  LOAN_CALCULATOR_MANIFEST,
  DSR_CALCULATOR_MANIFEST,
  SAVINGS_CALCULATOR_MANIFEST,
  LOTTO_MANIFEST,
  LAST_DIGIT_GAME_MANIFEST,
  POMODORO_MANIFEST,
  HOME_BUYING_FUNDS_CALCULATOR_MANIFEST,
] as const satisfies readonly ToolManifest[];

export type ToolId = (typeof TOOL_MANIFESTS)[number]['id'];

export const TOOL_CONFIGS: Record<string, ToolManifest> = {
  [LOAN_CALCULATOR_MANIFEST.id]: LOAN_CALCULATOR_MANIFEST,
  [DSR_CALCULATOR_MANIFEST.id]: DSR_CALCULATOR_MANIFEST,
  [SAVINGS_CALCULATOR_MANIFEST.id]: SAVINGS_CALCULATOR_MANIFEST,
  [LOTTO_MANIFEST.id]: LOTTO_MANIFEST,
  [LAST_DIGIT_GAME_MANIFEST.id]: LAST_DIGIT_GAME_MANIFEST,
  [POMODORO_MANIFEST.id]: POMODORO_MANIFEST,
  [HOME_BUYING_FUNDS_CALCULATOR_MANIFEST.id]:
    HOME_BUYING_FUNDS_CALCULATOR_MANIFEST,
};

export function isValidToolId(toolId: string): toolId is ToolId {
  return Object.hasOwn(TOOL_CONFIGS, toolId);
}

export function getToolConfig(toolId: string): ToolManifest | null {
  return isValidToolId(toolId) ? (TOOL_CONFIGS[toolId] ?? null) : null;
}

export function getAllToolConfigs(): ToolManifest[] {
  return [...TOOL_MANIFESTS];
}

export function getToolsByCategory(category: string): ToolManifest[] {
  return TOOL_MANIFESTS.filter(manifest => manifest.category === category);
}

export function getToolCount(): number {
  return TOOL_MANIFESTS.length;
}

export function getToolTitle(toolId: string): string {
  const tool = getToolConfig(toolId);
  return tool ? (tool.shortName ?? tool.name) : 'Tool';
}

export function getToolShareText(toolId: string): string {
  const tool = getToolConfig(toolId);
  return tool ? `${tool.name} - ${tool.description}` : '';
}

export function listToolNavigationItems(): ToolNavigationItem[] {
  return TOOL_MANIFESTS.map(manifest => ({
    id: manifest.id,
    name: manifest.name,
    shortName: manifest.shortName ?? manifest.name,
    category: manifest.category,
    href: `/tools/${manifest.id}`,
  }));
}

export function listToolItems(): ToolListItem[] {
  return TOOL_MANIFESTS.map((manifest: ToolManifest) => ({
    id: manifest.id,
    name: manifest.name,
    description: manifest.description,
    iconName: manifest.icon ?? 'Wrench',
    href: `/tools/${manifest.id}`,
    badge: manifest.badge,
    color: manifest.color ?? 'from-primary to-sunshine-900',
    category: manifest.category as ToolCategory,
  }));
}

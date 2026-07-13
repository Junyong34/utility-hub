'use client';

import { useRouter } from 'next/navigation';

import { SharedSelectSwitcher } from '../../../../shared/ui/shared-select-switcher.tsx';
import type { ToolNavigationItem } from '../../../../shared/contracts/tool-manifest.ts';
import { useToolNavigationItems } from './catalog-context.tsx';

interface ToolSwitcherProps {
  currentToolId: string;
  items?: readonly ToolNavigationItem[];
}

export function ToolSwitcher({
  currentToolId,
  items: injectedItems,
}: ToolSwitcherProps) {
  const router = useRouter();
  const contextItems = useToolNavigationItems();
  const items = injectedItems ?? contextItems;

  const handleToolChange = (toolId: string) => {
    if (toolId !== currentToolId) {
      router.push(`/tools/${toolId}`);
    }
  };

  if (items.length <= 1) {
    return (
      <p className="text-sm text-muted-foreground">
        현재 사용 가능한 유일한 도구입니다.
      </p>
    );
  }

  return (
    <SharedSelectSwitcher
      value={currentToolId}
      onValueChange={handleToolChange}
      placeholder="도구를 선택하세요"
      triggerAriaLabel="도구 선택"
      options={items.map(tool => ({
        value: tool.id,
        label: tool.name,
      }))}
    />
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { getAllToolConfigs } from '@/lib/tools/tool-config';
import { SharedSelectSwitcher } from '@/components/ui/shared-select-switcher';

interface ToolSwitcherProps {
  currentToolId: string;
}

const tools = getAllToolConfigs();

export function ToolSwitcher({ currentToolId }: ToolSwitcherProps) {
  const router = useRouter();

  const handleToolChange = (toolId: string) => {
    if (toolId === currentToolId) {
      return;
    }
    router.push(`/tools/${toolId}`);
  };

  if (tools.length <= 1) {
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
      options={tools.map((tool) => ({
        value: tool.id,
        label: tool.name,
      }))}
    />
  );
}

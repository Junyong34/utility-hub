import type { BreadcrumbLink } from '../../../../shared/contracts/navigation.ts';
import { getToolConfig } from './catalog.ts';

export const TOOLS_MAIN_LABEL = '도구';
export const TOOLS_MAIN_URL = '/tools';

export function getToolsMainBreadcrumbItems(): BreadcrumbLink[] {
  return [{ name: TOOLS_MAIN_LABEL }];
}

export function getToolBreadcrumbItems(
  toolId: string,
  subItems?: BreadcrumbLink[]
): BreadcrumbLink[] {
  const tool = getToolConfig(toolId);

  if (!tool) {
    return [{ name: TOOLS_MAIN_LABEL, url: TOOLS_MAIN_URL }];
  }

  const toolLabel = tool.breadcrumbLabel ?? tool.shortName ?? tool.name;
  const items: BreadcrumbLink[] = [
    { name: TOOLS_MAIN_LABEL, url: TOOLS_MAIN_URL },
    {
      name: toolLabel,
      url:
        subItems && subItems.length > 0
          ? `${TOOLS_MAIN_URL}/${toolId}`
          : undefined,
    },
  ];

  if (subItems && subItems.length > 0) {
    items.push(...subItems);
  }

  return items;
}

export function getToolStructuredDataBreadcrumbs(
  toolId: string,
  subPath?: string,
  subName?: string
): BreadcrumbLink[] {
  const tool = getToolConfig(toolId);

  if (!tool) {
    return [{ name: '홈', url: '/' }, { name: TOOLS_MAIN_LABEL }];
  }

  const toolLabel = tool.breadcrumbLabel ?? tool.shortName ?? tool.name;
  const items: BreadcrumbLink[] = [
    { name: '홈', url: '/' },
    { name: TOOLS_MAIN_LABEL, url: subPath ? TOOLS_MAIN_URL : undefined },
  ];

  if (subPath && subName) {
    items.push(
      { name: toolLabel, url: `${TOOLS_MAIN_URL}/${toolId}` },
      { name: subName }
    );
  } else {
    items.push({ name: toolLabel });
  }

  return items;
}

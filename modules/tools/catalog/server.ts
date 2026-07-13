import type { Metadata } from 'next';

import { SITE_CONFIG } from '../../../config/site.ts';
import type { BreadcrumbLink } from '../../../shared/contracts/navigation.ts';
import type { ToolConfig } from '../../../shared/contracts/tool-manifest.ts';
import { getToolConfig } from './domain/catalog.ts';
import {
  buildToolMetadata,
  buildToolsMainMetadata,
} from './domain/metadata.ts';
import {
  buildToolApplicationSchema,
  buildToolStructuredData,
  buildToolSubPageStructuredData,
  buildToolsMainStructuredData,
  type ToolApplicationSchema,
  type ToolStructuredData,
  type ToolStructuredDataItem,
  type ToolStructuredDataValidationResult,
} from './domain/structured-data.ts';

function requireToolConfig(toolId: string): ToolConfig {
  const tool = getToolConfig(toolId);

  if (!tool) {
    throw new Error(`Tool configuration not found: ${toolId}`);
  }

  return tool;
}

export function generateToolMetadata(toolId: string): Metadata {
  return buildToolMetadata(SITE_CONFIG, requireToolConfig(toolId));
}

export function generateToolsMainMetadata(): Metadata {
  return buildToolsMainMetadata(SITE_CONFIG);
}

export function getToolUrl(toolId: string): string {
  return `${SITE_CONFIG.url}/tools/${toolId}`;
}

export function createToolApplicationSchema(
  tool: ToolConfig
): ToolApplicationSchema {
  return buildToolApplicationSchema(SITE_CONFIG, tool);
}

export function createToolStructuredData(toolId: string): ToolStructuredData {
  return buildToolStructuredData(SITE_CONFIG, requireToolConfig(toolId));
}

export function createToolSubPageStructuredData(options: {
  toolId: string;
  path: string;
  name: string;
  description: string;
  breadcrumbs: BreadcrumbLink[];
}): ToolStructuredData {
  const { toolId, ...page } = options;
  return buildToolSubPageStructuredData(
    SITE_CONFIG,
    requireToolConfig(toolId),
    page
  );
}

export function createToolsMainStructuredData(): ReturnType<
  typeof buildToolsMainStructuredData
> {
  return buildToolsMainStructuredData(SITE_CONFIG);
}

export function getToolStructuredDataArray(
  toolId: string
): ToolStructuredDataItem[] {
  const { webPage, breadcrumb, application, faq, howTo } =
    createToolStructuredData(toolId);

  return [webPage, breadcrumb, application, faq, howTo].filter(
    (item): item is ToolStructuredDataItem => item !== null
  );
}

export function getToolSubPageStructuredDataArray(options: {
  toolId: string;
  path: string;
  name: string;
  description: string;
  breadcrumbs: BreadcrumbLink[];
}): ToolStructuredDataItem[] {
  const { webPage, breadcrumb, application, faq, howTo } =
    createToolSubPageStructuredData(options);

  return [webPage, breadcrumb, application, faq, howTo].filter(
    (item): item is ToolStructuredDataItem => item !== null
  );
}

export function getToolsMainStructuredDataArray(): ToolStructuredDataItem[] {
  const { webPage, breadcrumb } = createToolsMainStructuredData();
  return [webPage, breadcrumb];
}

function getStructuredDataTypes(toolId: string): string[] {
  return getToolStructuredDataArray(toolId).map(item => item['@type']);
}

export function validateToolStructuredData(
  toolId: string,
  requiredTypes: string[] = ['WebApplication', 'FAQPage', 'HowTo']
): ToolStructuredDataValidationResult {
  const presentTypes = getStructuredDataTypes(toolId);
  const missingTypes = requiredTypes.filter(
    requiredType => !presentTypes.includes(requiredType)
  );

  return {
    toolId,
    requiredTypes,
    presentTypes,
    missingTypes,
    isValid: missingTypes.length === 0,
  };
}

export function assertToolStructuredData(
  toolId: string,
  requiredTypes: string[] = ['WebApplication', 'FAQPage', 'HowTo']
): ToolStructuredDataValidationResult {
  const result = validateToolStructuredData(toolId, requiredTypes);

  if (!result.isValid) {
    throw new Error(
      `[${toolId}] Missing structured data types: ${result.missingTypes.join(', ')}`
    );
  }

  return result;
}

export type { ToolStructuredDataValidationResult };

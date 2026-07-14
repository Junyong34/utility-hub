/**
 * Tools 라이브러리 통합 Export
 * Tool 관련 모든 유틸리티를 한곳에서 import 가능
 */

// Tool 설정
export {
  TOOL_CONFIGS,
  getToolConfig,
  getAllToolConfigs,
  getToolsByCategory,
  isValidToolId,
  getToolCount,
} from './tool-config.ts';

// Tool 메타데이터
export {
  generateToolMetadata,
  generateToolsMainMetadata,
  getToolTitle,
  getToolUrl,
  getToolShareText,
} from './tool-metadata.ts';

// Tool 구조화 데이터
export {
  createToolApplicationSchema,
  createToolStructuredData,
  createToolSubPageStructuredData,
  createToolsMainStructuredData,
  validateToolStructuredData,
  assertToolStructuredData,
  getToolStructuredDataArray,
  getToolSubPageStructuredDataArray,
  getToolsMainStructuredDataArray,
} from './tool-structured-data.ts';

// Tool Breadcrumb
export {
  getToolsMainBreadcrumbItems,
  getToolBreadcrumbItems,
  getToolStructuredDataBreadcrumbs,
  TOOLS_MAIN_LABEL,
  TOOLS_MAIN_URL,
} from './tool-breadcrumb.ts';

// Tool 아이콘
export {
  getToolIcon,
  getToolIcons,
  isValidIcon,
  clearIconCache,
  getAvailableIcons,
} from './tool-icons.ts';

// 타입 re-export
export type {
  ToolConfig,
  ToolCategory,
  ToolFAQItem,
  ToolHowToStep,
  ToolListItem,
} from './types.ts';

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
} from './tool-config';

// Tool 메타데이터
export {
  generateToolMetadata,
  generateToolsMainMetadata,
  getToolTitle,
  getToolUrl,
  getToolShareText,
} from './tool-metadata';

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
} from './tool-structured-data';

// Tool Breadcrumb
export {
  getToolsMainBreadcrumbItems,
  getToolBreadcrumbItems,
  getToolStructuredDataBreadcrumbs,
  TOOLS_MAIN_LABEL,
  TOOLS_MAIN_URL,
} from './tool-breadcrumb';

// Tool 아이콘
export {
  getToolIcon,
  getToolIcons,
  isValidIcon,
  clearIconCache,
  getAvailableIcons,
} from './tool-icons';

// 타입 re-export
export type {
  ToolConfig,
  ToolCategory,
  ToolFAQItem,
  ToolHowToStep,
  ToolDisplayItem,
} from '@/types/tools';

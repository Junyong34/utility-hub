'use client';

import { createParser } from 'nuqs';
import type {
  MovingBudgetAssets,
  MovingBudgetCustomItem,
  MovingBudgetState,
} from '@/lib/tools/moving-budget-checklist';
import {
  createDefaultMovingBudgetState,
  parseAssetsFromQuery,
  parseChecklistProgressFromQuery,
  parseCustomItemsFromQuery,
  parseTemplateItemsFromQuery,
  serializeAssetsForQuery,
  serializeChecklistProgressForQuery,
  serializeCustomItemsForQuery,
  serializeTemplateItemsForQuery,
} from '@/lib/tools/moving-budget-checklist';

const DEFAULT_STATE = createDefaultMovingBudgetState();

function areAssetsEqual(left: MovingBudgetAssets, right: MovingBudgetAssets): boolean {
  return serializeAssetsForQuery(left) === serializeAssetsForQuery(right);
}

function areTemplateItemsEqual(
  left: MovingBudgetState['templateItems'],
  right: MovingBudgetState['templateItems']
): boolean {
  return (
    serializeTemplateItemsForQuery(left) === serializeTemplateItemsForQuery(right)
  );
}

function areChecklistProgressEqual(left: string[], right: string[]): boolean {
  return (
    serializeChecklistProgressForQuery(left) ===
    serializeChecklistProgressForQuery(right)
  );
}

function areCustomItemsEqual(
  left: MovingBudgetCustomItem[],
  right: MovingBudgetCustomItem[]
): boolean {
  return serializeCustomItemsForQuery(left) === serializeCustomItemsForQuery(right);
}

export const assetsParser = createParser({
  parse: parseAssetsFromQuery,
  serialize: serializeAssetsForQuery,
  eq: areAssetsEqual,
}).withDefault(DEFAULT_STATE.assets);

export const templateItemsParser = createParser({
  parse: parseTemplateItemsFromQuery,
  serialize: serializeTemplateItemsForQuery,
  eq: areTemplateItemsEqual,
}).withDefault(DEFAULT_STATE.templateItems);

export const checklistProgressParser = createParser({
  parse: parseChecklistProgressFromQuery,
  serialize: serializeChecklistProgressForQuery,
  eq: areChecklistProgressEqual,
}).withDefault([]);

export const customItemsParser = createParser({
  parse: parseCustomItemsFromQuery,
  serialize: serializeCustomItemsForQuery,
  eq: areCustomItemsEqual,
}).withDefault([]);

export const MOVING_BUDGET_QUERY_PARSERS = {
  mba: assetsParser,
  mbt: templateItemsParser,
  mbc: checklistProgressParser,
  mbx: customItemsParser,
} as const;

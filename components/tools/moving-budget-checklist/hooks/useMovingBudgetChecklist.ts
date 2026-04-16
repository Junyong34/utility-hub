'use client';

import { useCallback, useMemo } from 'react';
import { useQueryStates } from 'nuqs';
import {
  calculateMovingBudgetSummary,
  createDefaultMovingBudgetState,
  type MovingBudgetAssetId,
  type MovingBudgetCustomItem,
  type MovingBudgetGroupId,
  type MovingBudgetTemplateItemState,
} from '@/lib/tools/moving-budget-checklist';
import { MOVING_BUDGET_QUERY_PARSERS } from './parsers';

const DEFAULT_STATE = createDefaultMovingBudgetState();

export function useMovingBudgetChecklist() {
  const [queryState, setQueryState] = useQueryStates(MOVING_BUDGET_QUERY_PARSERS, {
    history: 'replace',
    shallow: false,
  });

  const state = useMemo(
    () => ({
      assets: queryState.mba,
      templateItems: queryState.mbt,
      checklistProgress: queryState.mbc,
      customItems: queryState.mbx,
    }),
    [queryState]
  );

  const summary = useMemo(() => calculateMovingBudgetSummary(state), [state]);

  const setAsset = useCallback(
    (assetId: MovingBudgetAssetId, value: number) => {
      setQueryState({
        mba: {
          ...state.assets,
          [assetId]: value,
        },
      });
    },
    [setQueryState, state.assets]
  );

  const setTemplateItem = useCallback(
    (itemId: string, updates: Partial<MovingBudgetTemplateItemState>) => {
      setQueryState({
        mbt: {
          ...state.templateItems,
          [itemId]: {
            ...state.templateItems[itemId],
            ...updates,
          },
        },
      });
    },
    [setQueryState, state.templateItems]
  );

  const toggleChecklist = useCallback(
    (entryId: string) => {
      const isCompleted = state.checklistProgress.includes(entryId);

      setQueryState({
        mbc: isCompleted
          ? state.checklistProgress.filter((id) => id !== entryId)
          : [...state.checklistProgress, entryId],
      });
    },
    [setQueryState, state.checklistProgress]
  );

  const addCustomItem = useCallback(
    (groupId: MovingBudgetGroupId) => {
      const newItem: MovingBudgetCustomItem = {
        id: `custom-${Date.now()}`,
        groupId,
        label: '',
        amount: 0,
      };

      setQueryState({
        mbx: [...state.customItems, newItem],
      });
    },
    [setQueryState, state.customItems]
  );

  const updateCustomItem = useCallback(
    (itemId: string, updates: Partial<MovingBudgetCustomItem>) => {
      setQueryState({
        mbx: state.customItems.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        ),
      });
    },
    [setQueryState, state.customItems]
  );

  const removeCustomItem = useCallback(
    (itemId: string) => {
      setQueryState({
        mbx: state.customItems.filter((item) => item.id !== itemId),
      });
    },
    [setQueryState, state.customItems]
  );

  const reset = useCallback(() => {
    setQueryState({
      mba: DEFAULT_STATE.assets,
      mbt: DEFAULT_STATE.templateItems,
      mbc: [],
      mbx: [],
    });
  }, [setQueryState]);

  return {
    state,
    summary,
    setAsset,
    setTemplateItem,
    toggleChecklist,
    addCustomItem,
    updateCustomItem,
    removeCustomItem,
    reset,
  };
}

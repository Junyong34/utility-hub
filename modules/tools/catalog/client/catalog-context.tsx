'use client';

import { createContext, useContext, type ReactNode } from 'react';

import type { ToolNavigationItem } from '../../../../shared/contracts/tool-manifest.ts';

const ToolCatalogContext = createContext<readonly ToolNavigationItem[]>([]);

interface ToolCatalogProviderProps {
  items: readonly ToolNavigationItem[];
  children: ReactNode;
}

export function ToolCatalogProvider({
  items,
  children,
}: ToolCatalogProviderProps) {
  return (
    <ToolCatalogContext.Provider value={items}>
      {children}
    </ToolCatalogContext.Provider>
  );
}

export function useToolNavigationItems(): readonly ToolNavigationItem[] {
  return useContext(ToolCatalogContext);
}

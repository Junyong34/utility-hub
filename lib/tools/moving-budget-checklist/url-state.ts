import { createDefaultMovingBudgetState } from './templates.ts';
import type {
  MovingBudgetAssets,
  MovingBudgetCustomItem,
  MovingBudgetGroupId,
  MovingBudgetState,
  MovingBudgetTemplateItemState,
} from './types.ts';

type CompactAssetState = {
  c?: number;
  st?: number;
  dp?: number;
  sv?: number;
  ln?: number;
};

type CompactTemplateItemTuple = [string, number?];
type CompactCustomItemTuple = [string, string, string, number?];

const ASSET_DEFAULTS: MovingBudgetAssets = {
  cash: 0,
  stocks: 0,
  deposit: 0,
  savings: 0,
  loan: 0,
};

const ITEM_TO_QUERY_KEY = {
  apartmentPrice: 'ap',
  legalFee: 'lf',
  taxCost: 'tx',
  movingCompany: 'mc',
  cleaning: 'cl',
  grout: 'gr',
  fridgeCabinet: 'fc',
  builtInCloset: 'bc',
  dressingTable: 'dt',
  dressingRoom: 'dr',
  furniture: 'fu',
  bedFrame: 'bf',
  tvBracket: 'tv',
  ceilingFan: 'cf',
} as const;

const QUERY_KEY_TO_ITEM = Object.fromEntries(
  Object.entries(ITEM_TO_QUERY_KEY).map(([itemId, queryKey]) => [queryKey, itemId])
) as Record<string, keyof typeof ITEM_TO_QUERY_KEY>;

const GROUP_TO_QUERY_KEY: Record<MovingBudgetGroupId, string> = {
  'purchase-costs': 'pc',
  'pre-move-costs': 'pm',
  'move-in-costs': 'mi',
};

const QUERY_KEY_TO_GROUP = Object.fromEntries(
  Object.entries(GROUP_TO_QUERY_KEY).map(([groupId, queryKey]) => [queryKey, groupId])
) as Record<string, MovingBudgetGroupId>;

function safeJsonParse<T>(rawValue: string): T | null {
  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return null;
  }
}

function normalizeAmount(value: number | undefined): number {
  if (!Number.isFinite(value) || (value ?? 0) < 0) {
    return 0;
  }

  return Math.floor(value ?? 0);
}

function normalizeTemplateItemState(
  item: MovingBudgetTemplateItemState | undefined
): MovingBudgetTemplateItemState {
  return {
    amount: normalizeAmount(item?.amount),
  };
}

export function serializeAssetsForQuery(assets: MovingBudgetAssets): string {
  const payload: CompactAssetState = {
    c: normalizeAmount(assets.cash),
    st: normalizeAmount(assets.stocks),
    dp: normalizeAmount(assets.deposit),
    sv: normalizeAmount(assets.savings),
    ln: normalizeAmount(assets.loan),
  };

  return JSON.stringify(payload);
}

export function parseAssetsFromQuery(rawValue: string): MovingBudgetAssets {
  const parsed = safeJsonParse<CompactAssetState>(rawValue);

  if (!parsed || Array.isArray(parsed)) {
    return { ...ASSET_DEFAULTS };
  }

  return {
    cash: normalizeAmount(parsed.c),
    stocks: normalizeAmount(parsed.st),
    deposit: normalizeAmount(parsed.dp),
    savings: normalizeAmount(parsed.sv),
    loan: normalizeAmount(parsed.ln),
  };
}

export function serializeTemplateItemsForQuery(
  templateItems: MovingBudgetState['templateItems']
): string {
  const payload: CompactTemplateItemTuple[] = Object.entries(ITEM_TO_QUERY_KEY)
    .map(([itemId, queryKey]) => {
      const itemState = normalizeTemplateItemState(templateItems[itemId]);

      if (itemState.amount === 0) {
        return null;
      }

      return [queryKey, itemState.amount] as CompactTemplateItemTuple;
    })
    .filter((entry): entry is CompactTemplateItemTuple => entry !== null);

  return JSON.stringify(payload);
}

export function parseTemplateItemsFromQuery(
  rawValue: string
): MovingBudgetState['templateItems'] {
  const defaults = createDefaultMovingBudgetState().templateItems;
  const parsed = safeJsonParse<CompactTemplateItemTuple[]>(rawValue);

  if (!Array.isArray(parsed)) {
    return defaults;
  }

  for (const entry of parsed) {
    if (!Array.isArray(entry)) {
      continue;
    }

    const [queryKey, amount] = entry;
    const itemId = QUERY_KEY_TO_ITEM[queryKey];

    if (!itemId) {
      continue;
    }

    defaults[itemId] = {
      amount: normalizeAmount(amount),
    };
  }

  return defaults;
}

export function serializeChecklistProgressForQuery(progress: string[]): string {
  const payload = progress.flatMap((entry) => {
      const itemQueryKey = ITEM_TO_QUERY_KEY[entry as keyof typeof ITEM_TO_QUERY_KEY];

      if (!itemQueryKey) {
        return [];
      }

      return [itemQueryKey];
    });

  return JSON.stringify(payload);
}

export function parseChecklistProgressFromQuery(rawValue: string): string[] {
  const parsed = safeJsonParse<string[]>(rawValue);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.flatMap((entry) => {
    if (typeof entry !== 'string') {
      return [];
    }

    const itemId = QUERY_KEY_TO_ITEM[entry];

    if (!itemId) {
      return [];
    }

    return [itemId];
  });
}

export function serializeCustomItemsForQuery(
  customItems: MovingBudgetCustomItem[]
): string {
  const payload: CompactCustomItemTuple[] = customItems.map((item) => [
    item.id,
    GROUP_TO_QUERY_KEY[item.groupId],
    item.label,
    normalizeAmount(item.amount),
  ]);

  return JSON.stringify(payload);
}

export function parseCustomItemsFromQuery(rawValue: string): MovingBudgetCustomItem[] {
  const parsed = safeJsonParse<CompactCustomItemTuple[]>(rawValue);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.flatMap((entry) => {
    if (!Array.isArray(entry)) {
      return [];
    }

    const [id, groupQueryKey, label, amount] = entry;
    const groupId = QUERY_KEY_TO_GROUP[groupQueryKey];

    if (
      typeof id !== 'string' ||
      typeof label !== 'string' ||
      !groupId
    ) {
      return [];
    }

    return [
      {
        id,
        groupId,
        label,
        amount: normalizeAmount(amount),
      },
    ];
  });
}

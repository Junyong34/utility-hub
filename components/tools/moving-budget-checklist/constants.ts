import {
  MOVING_BUDGET_TEMPLATE_GROUPS,
  type MovingBudgetAssetId,
  type MovingBudgetGroupId,
} from '@/lib/tools/moving-budget-checklist';
import {
  formatAmountInputValue,
  parseAmountInput,
} from '@/lib/tools/moving-budget-checklist/formatting';

export const MOVING_BUDGET_ASSET_FIELDS: Array<{
  id: MovingBudgetAssetId;
  label: string;
  description: string;
}> = [
  { id: 'cash', label: '현금', description: '즉시 사용할 수 있는 현금' },
  { id: 'stocks', label: '주식계좌', description: '주식 계좌 평가 금액' },
  { id: 'deposit', label: '전세보증금', description: '반환 예정 보증금' },
  { id: 'savings', label: '적금', description: '만기 예정 적금' },
  { id: 'loan', label: '대출 예정금', description: '이사에 투입할 대출 예정 금액' },
];

export const MOVING_BUDGET_GROUPS = MOVING_BUDGET_TEMPLATE_GROUPS;

export const MOVING_BUDGET_GROUP_META: Record<
  MovingBudgetGroupId,
  {
    accentClass: string;
    bgClass: string;
    textClass: string;
    barClass: string;
  }
> = {
  'purchase-costs': {
    accentClass: 'bg-teal-600',
    bgClass: 'bg-teal-500/12',
    textClass: 'text-teal-700 dark:text-teal-300',
    barClass: 'bg-teal-500',
  },
  'pre-move-costs': {
    accentClass: 'bg-sky-600',
    bgClass: 'bg-sky-500/12',
    textClass: 'text-sky-700 dark:text-sky-300',
    barClass: 'bg-sky-500',
  },
  'move-in-costs': {
    accentClass: 'bg-orange-500',
    bgClass: 'bg-orange-500/12',
    textClass: 'text-orange-700 dark:text-orange-300',
    barClass: 'bg-orange-400',
  },
};

export function formatAmountDisplay(amount: number): string {
  return `${amount.toLocaleString('ko-KR')}원`;
}

export { formatAmountInputValue, parseAmountInput };

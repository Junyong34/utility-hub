import type {
  MovingBudgetState,
  MovingBudgetTemplateGroupDefinition,
  MovingBudgetTemplateItemState,
} from './types.ts';

export const MOVING_BUDGET_TEMPLATE_GROUPS: MovingBudgetTemplateGroupDefinition[] =
  [
    {
      id: 'purchase-costs',
      label: '아파트 매매 비용',
      items: [
        {
          id: 'apartmentPrice',
          groupId: 'purchase-costs',
          label: '아파트 가격',
        },
        {
          id: 'legalFee',
          groupId: 'purchase-costs',
          label: '법무사 비용',
        },
        {
          id: 'taxCost',
          groupId: 'purchase-costs',
          label: '취득세 등등 세금 처리 비용',
        },
      ],
    },
    {
      id: 'pre-move-costs',
      label: '아파트 입주 전 시공 및 부대비용',
      items: [
        {
          id: 'movingCompany',
          groupId: 'pre-move-costs',
          label: '이사 업체 비용',
        },
        {
          id: 'cleaning',
          groupId: 'pre-move-costs',
          label: '입주청소',
        },
        {
          id: 'grout',
          groupId: 'pre-move-costs',
          label: '줄눈',
        },
        {
          id: 'fridgeCabinet',
          groupId: 'pre-move-costs',
          label: '냉장고장',
        },
        {
          id: 'builtInCloset',
          groupId: 'pre-move-costs',
          label: '붙박이장',
        },
        {
          id: 'dressingTable',
          groupId: 'pre-move-costs',
          label: '화장대',
        },
        {
          id: 'dressingRoom',
          groupId: 'pre-move-costs',
          label: '드레스룸',
        },
      ],
    },
    {
      id: 'move-in-costs',
      label: '아파트 입주 시 가전 가구',
      items: [
        {
          id: 'furniture',
          groupId: 'move-in-costs',
          label: '가구 (쇼파, LG 스타일러, 식탁 등등)',
        },
        {
          id: 'bedFrame',
          groupId: 'move-in-costs',
          label: '침대 프레임',
        },
        {
          id: 'tvBracket',
          groupId: 'move-in-costs',
          label: '스탠바이 TV 브라킷',
        },
        {
          id: 'ceilingFan',
          groupId: 'move-in-costs',
          label: '실링펜',
        },
      ],
    },
  ];

export const MOVING_BUDGET_TEMPLATE_ITEMS = MOVING_BUDGET_TEMPLATE_GROUPS.flatMap(
  (group) => group.items
);

function createEmptyTemplateItemState(): MovingBudgetTemplateItemState {
  return {
    amount: 0,
  };
}

export function createDefaultMovingBudgetState(): MovingBudgetState {
  const templateItems = Object.fromEntries(
    MOVING_BUDGET_TEMPLATE_ITEMS.map((item) => [
      item.id,
      createEmptyTemplateItemState(),
    ])
  );

  return {
    assets: {
      cash: 0,
      stocks: 0,
      deposit: 0,
      savings: 0,
      loan: 0,
    },
    templateItems,
    checklistProgress: [],
    customItems: [],
  };
}

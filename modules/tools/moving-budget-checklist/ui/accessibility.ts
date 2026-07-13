export const MOVING_BUDGET_ARIA_LABELS = {
  pageHeading: '이사 예산 체크리스트',
  shareButton: '현재 이사 예산 체크리스트 링크 복사',
  customItemName(index: number) {
    return `추가 항목 이름 ${index}`;
  },
  customItemAmount(index: number) {
    return `추가 항목 금액 ${index}`;
  },
  addCustomItem(groupLabel: string) {
    return `${groupLabel} 항목 추가`;
  },
  checklist(itemLabel: string, checklistLabel: string) {
    return `${itemLabel} ${checklistLabel}`;
  },
};

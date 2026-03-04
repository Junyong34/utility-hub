import { LottoCountSelector } from './LottoCountSelector';
import { LottoModeSwitcher } from './LottoModeSwitcher';
import { LottoRecommendActions } from './LottoRecommendActions';
import { LottoRecommendControls } from './LottoRecommendControls';
import { LottoRecommendEmptyState } from './LottoRecommendEmptyState';
import { LottoRecommendHeader } from './LottoRecommendHeader';
import { LottoRecommendHistory } from './LottoRecommendHistory';
import { LottoRecommendProvider } from './LottoRecommendProvider';
import { LottoRecommendResults } from './LottoRecommendResults';
import { LottoRecommendRoot } from './LottoRecommendRoot';
import { LottoRecommendVariantPanel } from './LottoRecommendVariantPanel';
import { LottoWeeklyRecommendation } from './LottoWeeklyRecommendation';

export const LottoRecommend = {
  Provider: LottoRecommendProvider,
  Root: LottoRecommendRoot,
  Header: LottoRecommendHeader,
  Controls: LottoRecommendControls,
  ModeSwitcher: LottoModeSwitcher,
  CountSelector: LottoCountSelector,
  VariantPanel: LottoRecommendVariantPanel,
  Actions: LottoRecommendActions,
  Results: LottoRecommendResults,
  WeeklyRecommendation: LottoWeeklyRecommendation,
  History: LottoRecommendHistory,
  EmptyState: LottoRecommendEmptyState,
};

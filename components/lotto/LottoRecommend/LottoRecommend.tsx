import { LottoCountSelector } from './LottoCountSelector';
import { LottoModeSwitcher } from './LottoModeSwitcher';
import { LottoRecommendActions } from './LottoRecommendActions';
import { LottoRecommendControls } from './LottoRecommendControls';
import { LottoRecommendHeader } from './LottoRecommendHeader';
import { LottoRecommendProvider } from './LottoRecommendProvider';
import { LottoRecommendResults } from './LottoRecommendResults';
import { LottoRecommendResultSheet } from './LottoRecommendResultSheet';
import { LottoRecommendRoot } from './LottoRecommendRoot';
import { LottoRecommendVariantPanel } from './LottoRecommendVariantPanel';
import { LottoWeeklyRecommendation } from './LottoWeeklyRecommendation';

/** LottoRecommend 컴포넌트 묶음을 노출하기 위한 바인딩 객체 */
export const LottoRecommend = {
  Provider: LottoRecommendProvider,
  Root: LottoRecommendRoot,
  Header: LottoRecommendHeader,
  Controls: LottoRecommendControls,
  ModeSwitcher: LottoModeSwitcher,
  CountSelector: LottoCountSelector,
  VariantPanel: LottoRecommendVariantPanel,
  ResultSheet: LottoRecommendResultSheet,
  Actions: LottoRecommendActions,
  Results: LottoRecommendResults,
  WeeklyRecommendation: LottoWeeklyRecommendation,
};

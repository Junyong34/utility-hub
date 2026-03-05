'use client';

import { useCallback, useState } from 'react';

/**
 * 로또 추천 훅의 노출 상태
 *
 * @property currentGames - 현재 추천된 게임 목록(게임당 6개 번호)
 * @property isGenerating - 번호 생성 진행 중인지 여부
 */
interface UseLottoState {
  /** 현재 화면에 표시할 추천 게임 목록 */
  currentGames: number[][];
  /** 번호 생성 애니메이션/로딩 진행 여부 */
  isGenerating: boolean;
}

/**
 * 로또 추천 훅의 동작 액션
 *
 * @property generateFromGames - 지정한 게임 목록을 지연 후 반영
 * @property clearCurrent - 현재 추천 게임 목록 초기화
 */
interface UseLottoActions {
  /**
   * `delayMs` 이후 `games`를 반영합니다.
   * - 지연은 카드 애니메이션(분석 진행 느낌)과 동기화하기 위해 사용
   */
  generateFromGames: (games: number[][], delayMs?: number) => void;
  /** 현재 결과를 즉시 제거 */
  clearCurrent: () => void;
}

/** 로또 추천 훅 반환값 */
export interface UseLottoResult extends UseLottoState {
  generateFromGames: UseLottoActions['generateFromGames'];
  clearCurrent: UseLottoActions['clearCurrent'];
}

export function useLotto() {
  const [currentGames, setCurrentGames] = useState<number[][]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // 생성 요청이 들어오면 일단 로딩 상태를 올리고,
  // delayMs 동안 실제 setCurrentGames 반영을 지연시켜 UI 전환 여유를 줍니다.
  const generateFromGames = useCallback(
    (games: number[][], delayMs: number = 300) => {
      setIsGenerating(true);
      setTimeout(() => {
        setCurrentGames(games);
        setIsGenerating(false);
      }, delayMs);
    },
    []
  );

  // 결과 리스트를 즉시 비웁니다(애니메이션/공유 상태 초기화 목적)
  const clearCurrent = useCallback(() => {
    setCurrentGames([]);
  }, []);

  return {
    currentGames,
    isGenerating,
    generateFromGames,
    clearCurrent,
  };
}

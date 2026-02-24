'use client';

import { useState, useCallback } from 'react';
import {
  generateLottoNumbers,
  generateMultipleLottoNumbers,
  type LottoGameSet,
} from '@/lib/lotto/generator';

export interface LottoHistory extends LottoGameSet {
  savedAt: string;
}

/**
 * 로또 번호 생성 및 히스토리 관리를 위한 커스텀 훅
 * @returns 로또 관련 상태와 함수들
 */
export function useLotto() {
  const [currentGames, setCurrentGames] = useState<number[][]>([]);
  const [history, setHistory] = useState<LottoHistory[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  /**
   * 단일 로또 번호를 생성합니다.
   */
  const generateSingle = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      const numbers = generateLottoNumbers();
      setCurrentGames((prev) => [...prev, numbers]);
      setIsGenerating(false);
    }, 300); // 애니메이션 효과를 위한 약간의 딜레이
  }, []);

  /**
   * 여러 게임의 로또 번호를 생성합니다.
   * @param count - 생성할 게임 수
   */
  const generateMultiple = useCallback((count: number = 5) => {
    setIsGenerating(true);
    setTimeout(() => {
      const gameSet = generateMultipleLottoNumbers(count);
      setCurrentGames(gameSet.games);
      setIsGenerating(false);
    }, 300);
  }, []);

  /**
   * 현재 생성된 게임들을 히스토리에 저장합니다.
   */
  const saveToHistory = useCallback(() => {
    if (currentGames.length === 0) return;

    const newHistory: LottoHistory = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      games: currentGames,
      timestamp: Date.now(),
      savedAt: new Date().toISOString(),
    };

    setHistory((prev) => [newHistory, ...prev]);

    // localStorage에 저장 (선택사항)
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('lotto-history');
        const existingHistory = stored ? JSON.parse(stored) : [];
        const updatedHistory = [newHistory, ...existingHistory].slice(0, 20); // 최대 20개 저장
        localStorage.setItem('lotto-history', JSON.stringify(updatedHistory));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    }
  }, [currentGames]);

  /**
   * localStorage에서 히스토리를 불러옵니다.
   */
  const loadHistory = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('lotto-history');
        if (stored) {
          const parsedHistory = JSON.parse(stored);
          setHistory(parsedHistory);
        }
      } catch (error) {
        console.error('Failed to load from localStorage:', error);
      }
    }
  }, []);

  /**
   * 히스토리에서 특정 항목을 삭제합니다.
   * @param id - 삭제할 히스토리 항목의 ID
   */
  const deleteFromHistory = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);

      // localStorage 업데이트
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('lotto-history', JSON.stringify(updated));
        } catch (error) {
          console.error('Failed to update localStorage:', error);
        }
      }

      return updated;
    });
  }, []);

  /**
   * 현재 생성된 게임들을 초기화합니다.
   */
  const clearCurrent = useCallback(() => {
    setCurrentGames([]);
  }, []);

  /**
   * 전체 히스토리를 초기화합니다.
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('lotto-history');
      } catch (error) {
        console.error('Failed to clear localStorage:', error);
      }
    }
  }, []);

  return {
    // 상태
    currentGames,
    history,
    isGenerating,

    // 액션
    generateSingle,
    generateMultiple,
    saveToHistory,
    loadHistory,
    deleteFromHistory,
    clearCurrent,
    clearHistory,
  };
}

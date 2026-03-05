/**
 * MBTI 기반 로또 프로필 정의
 *
 * @description
 * 16가지 MBTI 유형별로 로또 번호 선택 성향을 정의합니다.
 * MBTI 추천 모드에서 사용자에게 성향 정보를 제공하기 위한 데이터입니다.
 *
 * @remarks
 * - 각 MBTI 유형의 의사결정 스타일과 로또 전략을 매핑
 * - 교육적/재미 목적으로 설계됨
 * - 실제 당첨 확률과는 무관함
 *
 * @module mbti-profile
 */
import type { LottoMbtiType } from './recommendation-spec';

/**
 * MBTI 로또 프로필 인터페이스
 *
 * @interface
 */
export interface MbtiLottoProfile {
  /** 프로필 타이틀 (예: "전략형 분석가") */
  title: string;
  /** 프로필 요약 설명 */
  summary: string;
  /** 특징 키워드 3개 */
  keywords: string[];
}

/**
 * MBTI 16가지 유형별 로또 프로필
 *
 * @constant
 * @description 각 MBTI 유형의 번호 선택 성향과 추천 방식을 정의합니다.
 */
export const MBTI_LOTTO_PROFILES: Record<LottoMbtiType, MbtiLottoProfile> = {
  INTJ: {
    title: '전략형 분석가',
    summary: '패턴과 규칙을 먼저 찾는 스타일입니다. 구조적인 번호 조합을 선호하는 경향이 있습니다.',
    keywords: ['전략적', '체계적', '분석형'],
  },
  INTP: {
    title: '논리 실험가',
    summary: '가설을 세우고 검증하는 과정을 즐깁니다. 여러 전략을 비교하는 방식과 잘 맞습니다.',
    keywords: ['탐구형', '논리적', '실험적'],
  },
  ENTJ: {
    title: '결정형 리더',
    summary: '명확한 기준으로 빠르게 선택하는 타입입니다. 핵심 전략을 정해 반복 실행하는 편입니다.',
    keywords: ['결단력', '목표지향', '실행력'],
  },
  ENTP: {
    title: '아이디어 플레이어',
    summary: '새로운 시도와 변형을 즐깁니다. 고정 패턴보다 매회 다른 조합을 선호합니다.',
    keywords: ['창의적', '유연함', '도전적'],
  },
  INFJ: {
    title: '직관형 기획자',
    summary: '전체 흐름을 읽고 의미를 부여하는 성향입니다. 날짜/MBTI 조합처럼 스토리 있는 선택을 좋아합니다.',
    keywords: ['직관적', '통찰력', '의미중심'],
  },
  INFP: {
    title: '감성 탐색가',
    summary: '자기만의 기준과 감각을 중시합니다. 마음에 드는 숫자와 전략을 함께 조합하는 편입니다.',
    keywords: ['감성형', '자율성', '개성'],
  },
  ENFJ: {
    title: '동기부여형 코디네이터',
    summary: '긍정적인 흐름을 만드는 데 강합니다. 재미 요소가 있는 추천 방식을 선호합니다.',
    keywords: ['긍정적', '조화지향', '커뮤니케이션'],
  },
  ENFP: {
    title: '에너지형 아이디어러',
    summary: '즉흥성과 재미를 중요하게 생각합니다. 다양한 모드를 번갈아 쓰는 방식과 잘 맞습니다.',
    keywords: ['활동적', '즉흥적', '낙관적'],
  },
  ISTJ: {
    title: '원칙형 관리자',
    summary: '검증된 기준을 신뢰합니다. 규칙 기반 전략(고빈도/균형)을 선호하는 편입니다.',
    keywords: ['신중함', '원칙중심', '일관성'],
  },
  ISFJ: {
    title: '안정형 서포터',
    summary: '무리 없는 선택을 선호합니다. 큰 변동보다 안정적인 조합을 반복 확인하는 편입니다.',
    keywords: ['안정감', '배려형', '성실함'],
  },
  ESTJ: {
    title: '실행형 관리자',
    summary: '명확한 절차를 좋아합니다. 선택-생성-저장 흐름을 빠르게 반복하는 방식에 강합니다.',
    keywords: ['실용적', '구조화', '리더십'],
  },
  ESFJ: {
    title: '관계형 조율가',
    summary: '공유와 피드백을 즐깁니다. 생성 결과를 저장/공유하며 조합을 비교하는 데 익숙합니다.',
    keywords: ['친화력', '협력적', '소통중심'],
  },
  ISTP: {
    title: '현장형 분석가',
    summary: '즉시 실행하고 결과를 확인하는 스타일입니다. 짧은 주기로 모드를 바꿔 테스트하기 좋습니다.',
    keywords: ['문제해결', '현실적', '독립적'],
  },
  ISFP: {
    title: '감각형 크리에이터',
    summary: '직관과 감각을 동시에 활용합니다. 마음에 드는 숫자 흐름을 자연스럽게 조합합니다.',
    keywords: ['유연함', '감각적', '자연스러움'],
  },
  ESTP: {
    title: '액션형 플레이메이커',
    summary: '빠른 선택과 즉각적 반응이 강점입니다. 슬롯/랜덤 같은 역동적인 모드와 궁합이 좋습니다.',
    keywords: ['스피드', '실전형', '도전적'],
  },
  ESFP: {
    title: '분위기 메이커',
    summary: '재미와 경험을 중시합니다. 다양한 추천 결과를 즐기며 선택 자체를 놀이처럼 받아들입니다.',
    keywords: ['사교적', '경험중심', '재미추구'],
  },
};

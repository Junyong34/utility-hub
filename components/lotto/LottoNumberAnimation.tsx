/**
 * 로또 번호 애니메이션 컴포넌트
 *
 * @description
 * 개별 로또 번호를 애니메이션 효과와 함께 표시하는 컴포넌트입니다.
 * 번호 범위에 따라 다른 색상을 자동으로 적용합니다.
 *
 * @remarks
 * - 1-10: 노란색
 * - 11-20: 파란색
 * - 21-30: 빨간색
 * - 31-40: 회색
 * - 41-45: 초록색
 */
interface LottoNumberAnimationProps {
  /** 표시할 로또 번호 (1-45) */
  number: number;
  /** 애니메이션 시작 지연 시간 (밀리초) */
  delayMs?: number;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 로또 번호 애니메이션
 *
 * @param props - 컴포넌트 props
 * @returns 애니메이션이 적용된 로또 번호 볼
 *
 * @example
 * ```tsx
 * // 번호 7을 200ms 후에 표시
 * <LottoNumberAnimation number={7} delayMs={200} />
 * ```
 */
export function LottoNumberAnimation({
  number,
  delayMs = 0,
  className = '',
}: LottoNumberAnimationProps) {
  return (
    <div
      className={`lotto-pop-in w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-lg ${getLottoBallColor(number)} ${className}`}
      style={{ animationDelay: `${delayMs}ms` }}
      aria-label={`번호 ${number}`}
    >
      {number}
    </div>
  );
}

/**
 * 로또 번호에 따른 볼 색상 반환
 *
 * @param num - 로또 번호 (1-45)
 * @returns Tailwind CSS 클래스 문자열
 *
 * @example
 * ```tsx
 * const color = getLottoBallColor(15); // 'bg-blue-500 text-white ...'
 * ```
 */
export function getLottoBallColor(num: number): string {
  if (num <= 10) {
    return 'bg-yellow-400 text-yellow-950 dark:bg-yellow-500 dark:text-yellow-950';
  }
  if (num <= 20) {
    return 'bg-blue-500 text-white dark:bg-blue-600 dark:text-white';
  }
  if (num <= 30) {
    return 'bg-red-500 text-white dark:bg-red-600 dark:text-white';
  }
  if (num <= 40) {
    return 'bg-gray-600 text-white dark:bg-gray-500 dark:text-white';
  }
  return 'bg-green-600 text-white dark:bg-green-600 dark:text-white';
}

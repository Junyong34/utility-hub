/**
 * 슬롯 머신 컴포넌트
 *
 * @description
 * 로또 번호를 슬롯 머신 릴 형태로 표시하는 애니메이션 컴포넌트입니다.
 * 각 릴은 중앙 번호와 위아래 번호를 함께 표시하며, 스피닝 애니메이션을 지원합니다.
 *
 * @remarks
 * - 1-45 범위의 번호를 순환하여 표시 (1 이전은 45, 45 이후는 1)
 * - CSS 애니메이션 클래스 'lotto-slot-reel-track' 필요
 */
interface SlotMachineProps {
  /** 슬롯 머신에 표시할 번호 배열 (6개) */
  numbers: number[];
  /** 스피닝 애니메이션 활성화 여부 */
  isSpinning: boolean;
}

/**
 * 로또 번호를 1-45 범위 내로 순환
 *
 * @param value - 순환할 번호
 * @returns 1-45 범위로 조정된 번호
 *
 * @example
 * ```tsx
 * wrapLottoNumber(0);  // 45
 * wrapLottoNumber(46); // 1
 * wrapLottoNumber(23); // 23
 * ```
 */
function wrapLottoNumber(value: number): number {
  if (value < 1) return 45 + value;
  if (value > 45) return value - 45;
  return value;
}

/**
 * 릴의 3칸 윈도우 생성 (상단, 중앙, 하단)
 *
 * @param center - 중앙에 표시할 번호
 * @returns [상단 번호, 중앙 번호, 하단 번호] 튜플
 *
 * @example
 * ```tsx
 * getReelWindow(1);  // [45, 1, 2]
 * getReelWindow(45); // [44, 45, 1]
 * ```
 */
function getReelWindow(center: number): [number, number, number] {
  return [
    wrapLottoNumber(center - 1),
    wrapLottoNumber(center),
    wrapLottoNumber(center + 1),
  ];
}

/**
 * 슬롯 머신 UI
 *
 * @param props - 컴포넌트 props
 * @returns 슬롯 머신 릴 애니메이션 UI
 *
 * @example
 * ```tsx
 * <SlotMachine numbers={[7, 14, 21, 28, 35, 42]} isSpinning={true} />
 * ```
 */
export function SlotMachine({ numbers, isSpinning }: SlotMachineProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="슬롯 머신 숫자 릴">
      {numbers.map((num, index) => {
        const [top, middle, bottom] = getReelWindow(num);

        return (
          <div
            key={`slot-reel-${index}-${num}`}
            className="h-11 w-11 rounded-md border bg-background overflow-hidden"
          >
            <div
              className={`h-[132px] ${isSpinning ? 'lotto-slot-reel-track' : 'translate-y-[-44px]'} transition-transform duration-300`}
            >
              <div className="h-11 flex items-center justify-center text-sm text-muted-foreground/70">
                {top}
              </div>
              <div className="h-11 flex items-center justify-center text-base font-bold text-foreground">
                {middle}
              </div>
              <div className="h-11 flex items-center justify-center text-sm text-muted-foreground/70">
                {bottom}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

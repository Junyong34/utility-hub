/**
 * 로또 결과 이미지 캡처 유틸리티
 *
 * @description
 * HTML 요소를 PNG 이미지로 변환하여 다운로드하는 기능을 제공합니다.
 * html2canvas 라이브러리를 사용하여 고품질 이미지 생성을 지원합니다.
 *
 * @remarks
 * - 폰트 로딩 완료 후 캡처하여 텍스트 렌더링 품질 보장
 * - 2배 스케일로 레티나 디스플레이 대응
 * - 타임스탬프 기반 파일명 자동 생성
 *
 * @module capture-lotto-results
 */
import html2canvas from 'html2canvas';

/**
 * 로또 결과 캡처 옵션
 *
 * @interface
 */
interface CaptureLottoResultsOptions {
  /** 파일명 접두사 (기본값: 'zento-lotto-results') */
  filenamePrefix?: string;
  /** 로또 회차 번호 (로깅용) */
  round?: number;
  /** 추천 전략 라벨 (로깅용) */
  strategyLabel?: string;
}

/**
 * 날짜를 파일명용 타임스탬프 문자열로 변환
 *
 * @param date - 변환할 날짜
 * @returns "YYYYMMDD-HHMM" 형식 문자열
 *
 * @example
 * ```ts
 * formatTimestamp(new Date('2024-03-05 14:30')); // "20240305-1430"
 * ```
 */
function formatTimestamp(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}${month}${day}-${hour}${minute}`;
}

/**
 * 타임스탬프가 포함된 파일명 생성
 *
 * @param prefix - 파일명 접두사
 * @param now - 현재 시간
 * @returns "prefix-YYYYMMDD-HHMM.png" 형식 파일명
 */
function buildFileName(prefix: string, now: Date): string {
  return `${prefix}-${formatTimestamp(now)}.png`;
}

/**
 * 다음 애니메이션 프레임까지 대기
 *
 * @returns 다음 프레임에서 resolve되는 Promise
 */
function waitForNextFrame(): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });
}

/**
 * 웹폰트 로딩 완료까지 대기
 *
 * @returns 폰트 로딩 완료 시 resolve되는 Promise
 *
 * @remarks
 * - document.fonts.ready API 사용
 * - 에러 발생 시 무시하고 진행
 */
async function waitForFonts(): Promise<void> {
  if (typeof document === 'undefined' || !('fonts' in document)) return;

  try {
    await document.fonts.ready;
  } catch {
    // ignore font readiness errors
  }
}

/**
 * oklch/lab 색상을 RGB로 변환하여 html2canvas 호환성 확보
 *
 * @param clonedDoc - html2canvas가 생성한 복제 document
 * @param originalElement - 원본 요소 (computed style 읽기용)
 *
 * @remarks
 * - html2canvas v1.4.1은 oklch/lab 색상 함수를 지원하지 않음
 * - 원본 요소의 computed style을 읽어 복제본에 인라인 스타일 적용
 * - background-color, color, border-color만 변환 (성능 최적화)
 */
function convertModernColorsToRGB(
  clonedDoc: Document,
  originalElement: HTMLElement
): void {
  try {
    const originalElements = originalElement.querySelectorAll('*');
    const clonedElements = clonedDoc.body.querySelectorAll('*');

    // 원본 요소의 루트 처리
    const originalRoot = originalElement;
    const clonedRoot = clonedDoc.body.firstElementChild;
    if (originalRoot && clonedRoot instanceof HTMLElement) {
      applyComputedColors(originalRoot, clonedRoot);
    }

    // 모든 자식 요소 처리
    originalElements.forEach((originalEl, index) => {
      const clonedEl = clonedElements[index];
      if (
        originalEl instanceof HTMLElement &&
        clonedEl instanceof HTMLElement
      ) {
        applyComputedColors(originalEl, clonedEl);
      }
    });
  } catch (error) {
    console.warn('Failed to convert modern colors to RGB', error);
  }
}

/**
 * 원본 요소의 computed color를 복제 요소에 적용
 */
function applyComputedColors(
  originalEl: HTMLElement,
  clonedEl: HTMLElement
): void {
  const computed = window.getComputedStyle(originalEl);

  // background-color 변환
  const bgColor = computed.backgroundColor;
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
    clonedEl.style.backgroundColor = bgColor;
  }

  // color 변환
  const color = computed.color;
  if (color) {
    clonedEl.style.color = color;
  }

  // border-color 변환
  const borderColor = computed.borderColor;
  if (borderColor && borderColor !== 'rgba(0, 0, 0, 0)') {
    clonedEl.style.borderColor = borderColor;
  }

  // border-top-color, border-right-color 등도 처리
  const borderTopColor = computed.borderTopColor;
  if (borderTopColor && borderTopColor !== 'rgba(0, 0, 0, 0)') {
    clonedEl.style.borderTopColor = borderTopColor;
  }

  const borderRightColor = computed.borderRightColor;
  if (borderRightColor && borderRightColor !== 'rgba(0, 0, 0, 0)') {
    clonedEl.style.borderRightColor = borderRightColor;
  }

  const borderBottomColor = computed.borderBottomColor;
  if (borderBottomColor && borderBottomColor !== 'rgba(0, 0, 0, 0)') {
    clonedEl.style.borderBottomColor = borderBottomColor;
  }

  const borderLeftColor = computed.borderLeftColor;
  if (borderLeftColor && borderLeftColor !== 'rgba(0, 0, 0, 0)') {
    clonedEl.style.borderLeftColor = borderLeftColor;
  }
}

/**
 * HTML 요소를 PNG 이미지로 캡처하여 다운로드
 *
 * @param element - 캡처할 HTML 요소
 * @param options - 캡처 옵션
 * @returns 다운로드된 파일명 (실패 시 null)
 *
 * @example
 * ```tsx
 * const element = document.getElementById('lotto-results');
 * const filename = await captureLottoResultsElement(element, {
 *   filenamePrefix: 'my-lotto',
 *   round: 1150,
 *   strategyLabel: 'AI 통계 분석'
 * });
 * if (filename) {
 *   console.log('Downloaded:', filename);
 * }
 * ```
 */
export async function captureLottoResultsElement(
  element: HTMLElement,
  options: CaptureLottoResultsOptions = {}
): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  try {
    await waitForFonts();
    await waitForNextFrame();

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
      removeContainer: true,
      imageTimeout: 15000,
      scrollX: 0,
      scrollY: -window.scrollY,
      onclone: (clonedDoc) => {
        convertModernColorsToRGB(clonedDoc, element);
      },
    });
    const blob = await new Promise<Blob | null>((resolve) => {
      const timeoutId = setTimeout(() => {
        resolve(null);
      }, 5000);

      canvas.toBlob(
        (result) => {
          clearTimeout(timeoutId);
          resolve(result);
        },
        'image/png',
        1.0
      );
    });
    if (!blob) {
      throw new Error('canvas.toBlob returned null or timed out');
    }

    const now = new Date();
    const filename = buildFileName(
      options.filenamePrefix ?? 'zento-lotto-results',
      now
    );
    const objectUrl = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = filename;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);

    return filename;
  } catch (error) {
    console.error('Failed to capture lotto results image', {
      error,
      strategyLabel: options.strategyLabel,
      round: options.round,
    });
    return null;
  }
}

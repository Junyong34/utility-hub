/**
 * 마크다운 관련 유틸리티 함수
 */

export interface FaqItem {
  question: string
  answer: string
}

/**
 * 마크다운 텍스트에서 첫 번째 이미지 URL을 추출합니다.
 * @param markdown - 마크다운 텍스트
 * @returns 이미지 URL 또는 null
 */
export function extractFirstImage(markdown: string): string | null {
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = markdown.match(imageRegex);
  return match ? match[1] : null;
}

/**
 * 마크다운 텍스트에서 모든 헤딩을 추출합니다.
 * @param markdown - 마크다운 텍스트
 * @returns 헤딩 배열
 */
export function extractHeadings(markdown: string): { level: number; text: string }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: { level: number; text: string }[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2],
    });
  }

  return headings;
}

/**
 * 마크다운 텍스트에서 FAQ 섹션의 질문/답변 항목을 추출합니다.
 */
export function extractFaqItems(markdown: string): FaqItem[] {
  const lines = markdown.split('\n');
  const faqItems: FaqItem[] = [];

  let inFaqSection = false;
  let currentQuestion: string | null = null;
  let currentAnswerLines: string[] = [];

  const flushCurrentItem = () => {
    if (!currentQuestion) {
      currentAnswerLines = [];
      return;
    }

    const answer = currentAnswerLines.join('\n').trim();

    faqItems.push({
      question: currentQuestion,
      answer,
    });

    currentQuestion = null;
    currentAnswerLines = [];
  };

  for (const line of lines) {
    const headingMatch = /^(#{1,6})\s+(.+?)\s*$/.exec(line);

    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2].trim();
      const normalizedHeading = headingText.replace(/\s+/g, ' ');

      if (level === 2) {
        if (inFaqSection) {
          flushCurrentItem();
          break;
        }

        if (/^FAQ(?:\s+.*)?$/i.test(normalizedHeading)) {
          inFaqSection = true;
        }

        continue;
      }

      if (inFaqSection && level === 3) {
        flushCurrentItem();
        currentQuestion = headingText;
        continue;
      }

      if (inFaqSection && currentQuestion) {
        currentAnswerLines.push(line);
      }

      continue;
    }

    if (inFaqSection && currentQuestion !== null) {
      currentAnswerLines.push(line);
    }
  }

  if (inFaqSection) {
    flushCurrentItem();
  }

  return faqItems.filter((item) => item.question && item.answer);
}

/**
 * 마크다운 텍스트의 읽기 시간을 추정합니다 (분 단위).
 * 평균 읽기 속도: 200 단어/분 (한국어 기준 500자/분)
 * @param markdown - 마크다운 텍스트
 * @returns 읽기 시간 (분)
 */
export function estimateReadingTime(markdown: string): number {
  // 마크다운 구문 제거
  const plainText = markdown
    .replace(/!\[.*?\]\(.*?\)/g, '') // 이미지
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // 링크
    .replace(/[#*`_~]/g, '') // 마크다운 기호
    .replace(/\n+/g, ' '); // 줄바꿈

  // 한글과 영문 구분하여 읽기 시간 계산
  const koreanChars = plainText.match(/[\u3131-\uD79D]/g)?.length || 0;
  const englishWords = plainText.match(/[a-zA-Z]+/g)?.length || 0;

  const koreanReadingTime = koreanChars / 500; // 500자/분
  const englishReadingTime = englishWords / 200; // 200단어/분

  return Math.ceil(koreanReadingTime + englishReadingTime) || 1;
}

/**
 * 텍스트를 지정된 길이로 자르고 말줄임표를 추가합니다.
 * @param text - 원본 텍스트
 * @param maxLength - 최대 길이
 * @returns 잘린 텍스트
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

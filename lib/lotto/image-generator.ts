interface LottoImageGenerateOptions {
  filenamePrefix?: string;
  round?: number;
  strategyLabel?: string;
  generatedAt?: Date;
}

/** 이미지 캔버스 크기/패딩 상수 */
const CANVAS_WIDTH = 1080;
const TOP_PADDING = 84;
const GAME_BLOCK_HEIGHT = 132;
const BOTTOM_PADDING = 96;

/** 번호 값별 공 색/문자색 매핑 (1~45 구간별 스키마) */
function getBallColors(num: number): { fill: string; text: string } {
  if (num <= 10) return { fill: '#facc15', text: '#111827' };
  if (num <= 20) return { fill: '#3b82f6', text: '#ffffff' };
  if (num <= 30) return { fill: '#ef4444', text: '#ffffff' };
  if (num <= 40) return { fill: '#4b5563', text: '#ffffff' };
  return { fill: '#16a34a', text: '#ffffff' };
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/** 공 하나를 원형 칩 형태로 그립니다. */
function drawBall(
  ctx: CanvasRenderingContext2D,
  number: number,
  x: number,
  y: number,
  radius: number
) {
  const colors = getBallColors(number);

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = colors.fill;
  ctx.fill();

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.stroke();

  ctx.fillStyle = colors.text;
  ctx.font = 'bold 26px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(number).padStart(2, '0'), x, y + 1);
}

/** 날짜 포맷 (YYYY-MM-DD HH:mm) */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

/**
 * 생성된 번호 목록을 캔버스에 그려 PNG로 즉시 다운로드합니다.
 * 반환값 true면 다운로드 호출 성공, false면 실패로 처리됩니다.
 */
export function downloadLottoImage(
  games: number[][],
  options: LottoImageGenerateOptions = {}
): boolean {
  if (typeof window === 'undefined' || games.length === 0) {
    return false;
  }

  const generatedAt = options.generatedAt ?? new Date();
  const safeGames = games.slice(0, 5);
  const canvasHeight =
    TOP_PADDING + safeGames.length * GAME_BLOCK_HEIGHT + BOTTOM_PADDING;

  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = canvasHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return false;
  }

  const gradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, canvasHeight);
  gradient.addColorStop(0, '#e0f2fe');
  gradient.addColorStop(1, '#dbeafe');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_WIDTH, canvasHeight);

  drawRoundedRect(ctx, 48, 32, CANVAS_WIDTH - 96, canvasHeight - 64, 28);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = 'bold 44px sans-serif';
  ctx.fillText('AI 로또 번호 추천', 88, 70);

  ctx.font = '500 26px sans-serif';
  const strategyLine = options.strategyLabel
    ? `추천 방식: ${options.strategyLabel}`
    : '추천 방식: 일반 생성';
  ctx.fillText(strategyLine, 88, 126);

  if (options.round) {
    ctx.fillText(`기준 회차: ${options.round}회`, 88, 166);
  }

  safeGames.forEach((numbers, gameIndex) => {
    const top = TOP_PADDING + gameIndex * GAME_BLOCK_HEIGHT + 110;

    ctx.fillStyle = '#334155';
    ctx.font = '600 24px sans-serif';
    ctx.fillText(`게임 ${gameIndex + 1}`, 88, top);

    numbers.forEach((num, index) => {
      const x = 260 + index * 120;
      const y = top + 18;
      drawBall(ctx, num, x, y, 38);
    });
  });

  ctx.fillStyle = '#475569';
  ctx.font = '500 22px sans-serif';
  ctx.fillText(`생성 시각: ${formatDate(generatedAt)}`, 88, canvasHeight - 100);
  ctx.fillText(
    '본 이미지는 오락 목적의 추천 번호이며 당첨을 보장하지 않습니다.',
    88,
    canvasHeight - 64
  );

  const dataUrl = canvas.toDataURL('image/png');
  const filenamePrefix = options.filenamePrefix ?? 'lotto-recommendation';
  const timestamp = `${generatedAt.getFullYear()}${String(generatedAt.getMonth() + 1).padStart(2, '0')}${String(generatedAt.getDate()).padStart(2, '0')}-${String(generatedAt.getHours()).padStart(2, '0')}${String(generatedAt.getMinutes()).padStart(2, '0')}`;

  const anchor = document.createElement('a');
  anchor.href = dataUrl;
  anchor.download = `${filenamePrefix}-${timestamp}.png`;
  anchor.click();

  return true;
}

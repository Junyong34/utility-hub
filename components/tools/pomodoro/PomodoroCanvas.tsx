'use client';

import { useEffect, useMemo, useRef } from 'react';
import { getGardenVisualState } from '@/lib/tools/pomodoro/garden-visual';
import { getPomodoroThemeConfig } from '@/lib/tools/pomodoro/theme';
import type { PomodoroTheme } from '@/lib/tools/pomodoro/types';

interface PomodoroCanvasProps {
  remainingMs: number;
  totalMs: number;
  status: 'idle' | 'running' | 'paused' | 'completed';
  theme: PomodoroTheme;
}

function drawLeaf(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  rotation: number,
  fillStyle: string
) {
  context.save();
  context.translate(centerX, centerY);
  context.rotate(rotation);
  context.beginPath();
  context.moveTo(0, -height / 2);
  context.quadraticCurveTo(width / 2, 0, 0, height / 2);
  context.quadraticCurveTo(-width / 2, 0, 0, -height / 2);
  context.closePath();
  context.fillStyle = fillStyle;
  context.fill();
  context.restore();
}

function traceTomatoShape(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  size: number
) {
  const topY = centerY - size * 0.92;
  const bottomY = centerY + size * 0.96;
  const sideX = size * 0.92;

  context.beginPath();
  context.moveTo(centerX, topY);
  context.bezierCurveTo(
    centerX + size * 0.54,
    topY - size * 0.18,
    centerX + sideX + size * 0.08,
    centerY - size * 0.34,
    centerX + sideX - size * 0.02,
    centerY + size * 0.04
  );
  context.bezierCurveTo(
    centerX + sideX + size * 0.02,
    centerY + size * 0.54,
    centerX + size * 0.46,
    bottomY + size * 0.04,
    centerX + size * 0.1,
    bottomY
  );
  context.bezierCurveTo(
    centerX,
    bottomY + size * 0.06,
    centerX - size * 0.1,
    bottomY,
    centerX - size * 0.46,
    bottomY + size * 0.04
  );
  context.bezierCurveTo(
    centerX - sideX - size * 0.02,
    centerY + size * 0.54,
    centerX - sideX - size * 0.08,
    centerY - size * 0.34,
    centerX - size * 0.54,
    topY - size * 0.18
  );
  context.closePath();
}

function drawTomatoCalyx(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  size: number
) {
  context.fillStyle = '#14532d';
  context.fillRect(centerX - 5, centerY - size * 1.08, 10, 28);

  const leafAngles = [-1.45, -0.7, -0.08, 0.58, 1.26];
  const leafOffsets = [
    [-30, -10],
    [-14, -18],
    [0, -22],
    [15, -17],
    [30, -10],
  ] as const;

  leafAngles.forEach((angle, index) => {
    const [offsetX, offsetY] = leafOffsets[index];
    drawLeaf(
      context,
      centerX + offsetX,
      centerY - size * 0.95 + offsetY,
      28,
      64,
      angle,
      index % 2 === 0 ? '#166534' : '#15803d'
    );
  });
}

function drawCompletionBurst(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  inner: number,
  outer: number,
  color: string
) {
  for (let index = 0; index < 12; index += 1) {
    const angle = (Math.PI * 2 * index) / 12;

    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 4;
    context.moveTo(
      centerX + Math.cos(angle) * inner,
      centerY + Math.sin(angle) * inner
    );
    context.lineTo(
      centerX + Math.cos(angle) * outer,
      centerY + Math.sin(angle) * outer
    );
    context.stroke();
  }
}

function drawGardenBloom(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number
) {
  for (let index = 0; index < 6; index += 1) {
    const angle = (Math.PI * 2 * index) / 6;
    drawLeaf(
      context,
      centerX + Math.cos(angle) * 8,
      centerY + Math.sin(angle) * 8,
      22,
      34,
      angle,
      index % 2 === 0 ? '#fbbf24' : '#fde68a'
    );
  }

  context.beginPath();
  context.fillStyle = '#f59e0b';
  context.arc(centerX, centerY, 10, 0, Math.PI * 2);
  context.fill();
}

function drawPieFill(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  progress: number,
  color: string
) {
  context.beginPath();
  context.moveTo(centerX, centerY);
  context.fillStyle = color;
  context.arc(
    centerX,
    centerY,
    radius,
    -Math.PI / 2,
    -Math.PI / 2 + Math.PI * 2 * progress
  );
  context.closePath();
  context.fill();
}

function drawDialTicks(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
) {
  for (let index = 0; index < 36; index += 1) {
    const angle = (Math.PI * 2 * index) / 36 - Math.PI / 2;
    const isMajor = index % 6 === 0;
    const inner = radius - (isMajor ? 22 : 14);
    const outer = radius - 4;

    context.beginPath();
    context.strokeStyle = isMajor ? '#ef4444' : 'rgba(17,24,39,0.78)';
    context.lineWidth = isMajor ? 5 : 2.6;
    context.lineCap = 'round';
    context.moveTo(
      centerX + Math.cos(angle) * inner,
      centerY + Math.sin(angle) * inner
    );
    context.lineTo(
      centerX + Math.cos(angle) * outer,
      centerY + Math.sin(angle) * outer
    );
    context.stroke();
  }
}

export function PomodoroCanvas({
  remainingMs,
  totalMs,
  status,
  theme,
}: PomodoroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dimensions = useMemo(
    () => {
      if (theme === 'minimal') {
        return { width: 440, height: 240 };
      }

      if (theme === 'visual') {
        return { width: 372, height: 372 };
      }

      if (theme === 'tomato') {
        return { width: 356, height: 356 };
      }

      return { width: 360, height: 360 };
    },
    [theme]
  );

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const ratio = window.devicePixelRatio || 1;
    const { width, height } = dimensions;
    const progress =
      totalMs > 0 ? Math.min(1, Math.max(0, 1 - remainingMs / totalMs)) : 0;
    const themeConfig = getPomodoroThemeConfig(theme);
    const gardenVisual =
      theme === 'garden'
        ? getGardenVisualState({
            progress,
            status,
            timeMs: Date.now(),
          })
        : null;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);

    if (theme === 'minimal') {
      const panelX = 20;
      const panelY = 22;
      const panelWidth = width - 40;
      const panelHeight = height - 44;
      const barX = panelX + 26;
      const barWidth = panelWidth - 52;
      const barHeight = 48;
      const barY = panelY + panelHeight - 80;

      context.beginPath();
      context.fillStyle = 'rgba(248, 250, 252, 0.98)';
      context.roundRect(panelX, panelY, panelWidth, panelHeight, 28);
      context.fill();

      context.beginPath();
      context.strokeStyle = 'rgba(125, 211, 252, 0.30)';
      context.lineWidth = 1.5;
      context.roundRect(panelX, panelY, panelWidth, panelHeight, 28);
      context.stroke();

      context.beginPath();
      context.fillStyle = 'rgba(14, 165, 233, 0.14)';
      context.roundRect(panelX + 26, panelY + 24, 100, 10, 999);
      context.fill();

      context.beginPath();
      context.fillStyle = 'rgba(226, 232, 240, 0.95)';
      context.roundRect(panelX + 26, panelY + 50, panelWidth - 52, 98, 18);
      context.fill();

      context.beginPath();
      context.fillStyle = 'rgba(203, 213, 225, 0.9)';
      context.roundRect(barX, barY, barWidth, barHeight, 999);
      context.fill();

      const barGradient = context.createLinearGradient(
        barX,
        barY,
        barX + barWidth,
        barY
      );
      barGradient.addColorStop(0, themeConfig.ringProgressStart);
      barGradient.addColorStop(1, themeConfig.ringProgressEnd);

      context.beginPath();
      context.fillStyle = barGradient;
      context.roundRect(
        barX,
        barY,
        Math.max(28, barWidth * progress),
        barHeight,
        999
      );
      context.fill();

      if (status === 'completed') {
        context.beginPath();
        context.strokeStyle = themeConfig.ringProgressStart;
        context.lineWidth = 4;
        context.roundRect(
          panelX + 12,
          panelY + 12,
          panelWidth - 24,
          panelHeight - 24,
          24
        );
        context.stroke();
      }

      return;
    }

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 110;

    if (theme === 'tomato') {
      const tomatoCenterY = centerY + 18;
      const tomatoSize = 110;
      const glowGradient = context.createRadialGradient(
        centerX,
        tomatoCenterY - 8,
        34,
        centerX,
        tomatoCenterY - 8,
        152
      );
      glowGradient.addColorStop(0, 'rgba(251, 113, 133, 0.24)');
      glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      context.beginPath();
      context.fillStyle = glowGradient;
      context.arc(centerX, tomatoCenterY - 8, 152, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.fillStyle = 'rgba(127, 29, 29, 0.18)';
      context.ellipse(centerX, tomatoCenterY + 122, 90, 18, 0, 0, Math.PI * 2);
      context.fill();

      const bodyGradient = context.createRadialGradient(
        centerX - 26,
        tomatoCenterY - 44,
        18,
        centerX,
        tomatoCenterY,
        150
      );
      bodyGradient.addColorStop(0, '#fb7185');
      bodyGradient.addColorStop(0.42, '#ef4444');
      bodyGradient.addColorStop(0.78, '#dc2626');
      bodyGradient.addColorStop(1, '#991b1b');

      context.save();
      traceTomatoShape(context, centerX, tomatoCenterY, tomatoSize);
      context.fillStyle = bodyGradient;
      context.fill();
      context.clip();

      const ripenessGradient = context.createLinearGradient(
        centerX,
        tomatoCenterY + tomatoSize,
        centerX,
        tomatoCenterY - tomatoSize
      );
      ripenessGradient.addColorStop(0, 'rgba(255, 237, 213, 0.42)');
      ripenessGradient.addColorStop(0.5, 'rgba(254, 205, 211, 0.18)');
      ripenessGradient.addColorStop(1, 'rgba(255,255,255,0)');

      context.fillStyle = ripenessGradient;
      context.fillRect(
        centerX - 150,
        tomatoCenterY + tomatoSize - tomatoSize * 2 * progress,
        300,
        tomatoSize * 2 * progress
      );

      for (const offset of [-0.46, -0.16, 0.15, 0.45]) {
        context.beginPath();
        context.strokeStyle = 'rgba(122, 18, 18, 0.14)';
        context.lineWidth = 4;
        context.moveTo(centerX + tomatoSize * offset, tomatoCenterY - 86);
        context.bezierCurveTo(
          centerX + tomatoSize * (offset * 0.75),
          tomatoCenterY - 18,
          centerX + tomatoSize * (offset * 0.9),
          tomatoCenterY + 48,
          centerX + tomatoSize * (offset * 0.55),
          tomatoCenterY + 102
        );
        context.stroke();
      }

      context.beginPath();
      context.fillStyle = 'rgba(255,255,255,0.22)';
      context.ellipse(
        centerX - 34,
        tomatoCenterY - 18,
        24,
        48,
        0.42,
        0,
        Math.PI * 2
      );
      context.fill();
      context.restore();

      drawTomatoCalyx(context, centerX, tomatoCenterY, tomatoSize);
    }

    if (theme === 'visual') {
      const squareSize = 286;
      const squareX = centerX - squareSize / 2;
      const squareY = centerY - squareSize / 2;
      const dialRadius = 116;

      context.beginPath();
      context.fillStyle = 'rgba(79, 70, 229, 0.10)';
      context.arc(centerX, centerY, 146, 0, Math.PI * 2);
      context.fill();

      const squareGradient = context.createLinearGradient(
        squareX,
        squareY,
        squareX + squareSize,
        squareY + squareSize
      );
      squareGradient.addColorStop(0, '#60a5fa');
      squareGradient.addColorStop(0.55, '#3b82f6');
      squareGradient.addColorStop(1, '#4f46e5');

      context.beginPath();
      context.fillStyle = squareGradient;
      context.roundRect(squareX, squareY, squareSize, squareSize, 48);
      context.fill();

      context.beginPath();
      context.strokeStyle = 'rgba(255,255,255,0.34)';
      context.lineWidth = 3;
      context.roundRect(squareX + 16, squareY + 16, squareSize - 32, squareSize - 32, 34);
      context.stroke();

      context.beginPath();
      context.fillStyle = 'rgba(255,255,255,0.985)';
      context.arc(centerX, centerY, dialRadius, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.strokeStyle = 'rgba(148, 163, 184, 0.30)';
      context.lineWidth = 10;
      context.arc(centerX, centerY, dialRadius - 12, 0, Math.PI * 2);
      context.stroke();

      context.beginPath();
      context.fillStyle = 'rgba(37, 99, 235, 0.12)';
      context.moveTo(centerX, centerY);
      context.arc(
        centerX,
        centerY,
        dialRadius - 16,
        -Math.PI / 2,
        -Math.PI / 2 + Math.PI * 2 * progress
      );
      context.closePath();
      context.fill();

      drawPieFill(
        context,
        centerX,
        centerY,
        dialRadius - 16,
        progress,
        'rgba(249, 115, 22, 0.92)'
      );

      context.beginPath();
      context.fillStyle = '#1e293b';
      context.arc(centerX, centerY, 11, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.strokeStyle = '#f97316';
      context.lineWidth = 4;
      context.lineCap = 'round';
      context.moveTo(centerX, centerY);
      context.lineTo(centerX, centerY - (dialRadius - 18));
      context.stroke();

      context.beginPath();
      context.strokeStyle = '#1f2937';
      context.lineWidth = 4;
      context.lineCap = 'round';
      context.moveTo(centerX, centerY);
      context.lineTo(
        centerX +
          Math.cos(-Math.PI / 2 + Math.PI * 2 * progress) * (dialRadius - 22),
        centerY +
          Math.sin(-Math.PI / 2 + Math.PI * 2 * progress) * (dialRadius - 22)
      );
      context.stroke();

      drawDialTicks(context, centerX, centerY, dialRadius);
    }

    if (theme === 'garden') {
      const glowPulse = gardenVisual?.glowPulse ?? 1;
      const sway = gardenVisual?.sway ?? 0;
      const stemProgress = gardenVisual?.stemProgress ?? progress;
      const sunGradient = context.createRadialGradient(
        centerX + 44,
        centerY - 100,
        18,
        centerX + 44,
        centerY - 100,
        88 * glowPulse
      );
      sunGradient.addColorStop(0, 'rgba(253, 224, 71, 0.42)');
      sunGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      context.beginPath();
      context.fillStyle = sunGradient;
      context.arc(centerX + 44, centerY - 100, 88, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.fillStyle = 'rgba(255,255,255,0.86)';
      context.arc(centerX, centerY - 18, 98, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.fillStyle = 'rgba(16, 185, 129, 0.08)';
      context.arc(centerX, centerY - 18, 114, 0, Math.PI * 2);
      context.fill();

      const potTopY = centerY + 102;
      const potWidth = 124;
      const potHeight = 74;
      const potGradient = context.createLinearGradient(
        centerX,
        potTopY - 18,
        centerX,
        potTopY + potHeight
      );
      potGradient.addColorStop(0, '#f59e0b');
      potGradient.addColorStop(1, '#b45309');

      context.beginPath();
      context.fillStyle = 'rgba(16, 185, 129, 0.12)';
      context.ellipse(centerX, potTopY + potHeight - 4, 88, 16, 0, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.fillStyle = potGradient;
      context.moveTo(centerX - potWidth / 2, potTopY);
      context.lineTo(centerX + potWidth / 2, potTopY);
      context.lineTo(centerX + potWidth / 2 - 16, potTopY + potHeight);
      context.lineTo(centerX - potWidth / 2 + 16, potTopY + potHeight);
      context.closePath();
      context.fill();

      context.beginPath();
      context.fillStyle = '#fbbf24';
      context.ellipse(centerX, potTopY, 72, 18, 0, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.fillStyle = '#6b3f1d';
      context.ellipse(centerX, potTopY - 2, 58, 12, 0, 0, Math.PI * 2);
      context.fill();

      const stemStartY = potTopY - 8;
      const growthHeight = 28 + stemProgress * 138;
      const tipY = stemStartY - growthHeight;
      const tipX = centerX + sway * 0.9;

      context.beginPath();
      context.strokeStyle = '#047857';
      context.lineWidth = 8;
      context.lineCap = 'round';
      context.moveTo(centerX, stemStartY);
      context.bezierCurveTo(
        centerX - 18 + sway * 0.25,
        stemStartY - 34,
        centerX + 20 + sway * 0.45,
        tipY + 44,
        tipX,
        tipY
      );
      context.stroke();

      const leafSpecs = [
        { threshold: 0.14, position: 0.18, side: -1, rotation: -0.9, color: '#34d399' },
        { threshold: 0.28, position: 0.3, side: 1, rotation: 0.8, color: '#10b981' },
        { threshold: 0.46, position: 0.46, side: -1, rotation: -0.78, color: '#6ee7b7' },
        { threshold: 0.64, position: 0.62, side: 1, rotation: 0.72, color: '#34d399' },
        { threshold: 0.82, position: 0.78, side: -1, rotation: -0.58, color: '#10b981' },
      ];

      leafSpecs.forEach(spec => {
        if (stemProgress < spec.threshold) {
          return;
        }

        const anchorY = stemStartY - growthHeight * spec.position;
        const anchorX =
          centerX + spec.side * (10 + spec.position * 6) + sway * spec.position;
        const tipX = anchorX + spec.side * 24;

        context.beginPath();
        context.strokeStyle = '#047857';
        context.lineWidth = 3;
        context.moveTo(anchorX, anchorY);
        context.quadraticCurveTo(
          anchorX + spec.side * 10,
          anchorY - 4,
          tipX,
          anchorY - 6
        );
        context.stroke();

        drawLeaf(
          context,
          tipX + spec.side * 12,
          anchorY - 8,
          30,
          50,
          spec.rotation,
          spec.color
        );
      });

      drawLeaf(
        context,
        centerX - 58,
        potTopY + 12,
        26,
        42,
        -0.82,
        '#6ee7b7'
      );
      drawLeaf(
        context,
        centerX + 58,
        potTopY + 12,
        26,
        42,
        0.82,
        '#34d399'
      );

      if (stemProgress > 0.72) {
        drawLeaf(context, tipX, tipY - 6, 18, 34, -0.05, '#86efac');
      }

      if (gardenVisual?.bloom === 'flower') {
        drawGardenBloom(context, tipX, tipY - 12);
      } else {
        context.beginPath();
        context.fillStyle = '#f59e0b';
        context.arc(tipX, tipY - 4, 7, 0, Math.PI * 2);
        context.fill();
      }
    }

    if (status === 'completed' && theme !== 'garden') {
      drawCompletionBurst(
        context,
        centerX,
        centerY,
        radius + 12,
        radius + 30,
        themeConfig.ringProgressStart
      );
    }
  }, [dimensions, remainingMs, status, theme, totalMs]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="h-auto w-full"
      aria-hidden="true"
    />
  );
}

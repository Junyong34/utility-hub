'use client';

import Image from 'next/image';
import type { ComponentProps, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface IconCloudProps extends ComponentProps<'div'> {
  icons?: ReactNode[];
  images?: string[];
  radius?: number;
  speed?: number;
}

interface SpherePoint {
  x: number;
  y: number;
  z: number;
}

function createSpherePoints(count: number): SpherePoint[] {
  if (count <= 0) return [];

  return Array.from({ length: count }, (_, index) => {
    const offset = 2 / count;
    const y = index * offset - 1 + offset / 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = index * Math.PI * (3 - Math.sqrt(5));

    return {
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    };
  });
}

function rotatePoint(
  point: SpherePoint,
  rotateX: number,
  rotateY: number
): SpherePoint {
  const cosX = Math.cos(rotateX);
  const sinX = Math.sin(rotateX);
  const cosY = Math.cos(rotateY);
  const sinY = Math.sin(rotateY);

  const y1 = point.y * cosX - point.z * sinX;
  const z1 = point.y * sinX + point.z * cosX;
  const x2 = point.x * cosY + z1 * sinY;
  const z2 = -point.x * sinY + z1 * cosY;

  return {
    x: x2,
    y: y1,
    z: z2,
  };
}

function projectPoint(point: SpherePoint, radius: number) {
  const depth = radius * 2.4;
  const scale = depth / (depth - point.z * radius);

  return {
    x: point.x * radius * scale,
    y: point.y * radius * scale,
    scale,
    opacity: Math.max(0.35, Math.min(1, 0.48 + (point.z + 1) * 0.32)),
    zIndex: Math.round((point.z + 1) * 100),
  };
}

export function IconCloud({
  className,
  icons,
  images,
  radius = 96,
  speed = 0.22,
  style,
  ...props
}: IconCloudProps) {
  const [rotation, setRotation] = useState({ x: -0.35, y: 0 });

  const items =
    icons ??
    images?.map(src => (
      <span
        key={src}
        className="relative block h-full w-full overflow-hidden rounded-full"
      >
        <Image src={src} alt="" fill sizes="64px" className="object-cover" />
      </span>
    )) ??
    [];

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return undefined;

    let frameId = 0;
    let startTime = 0;

    const animate = (time: number) => {
      if (startTime === 0) startTime = time;
      const elapsed = time - startTime;

      setRotation({
        x: -0.32 + Math.sin(elapsed / 2200) * 0.16,
        y: elapsed * 0.001 * speed,
      });

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [speed]);

  const points = createSpherePoints(items.length);
  const size = radius * 2.5;

  return (
    <div
      className={cn(
        'relative isolate rounded-full',
        'bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),rgba(255,255,255,0.18)_38%,rgba(59,130,246,0.12)_75%,transparent_100%)]',
        'dark:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.16),rgba(255,255,255,0.06)_34%,rgba(56,189,248,0.16)_72%,transparent_100%)]',
        className
      )}
      style={{
        width: size,
        height: size,
        ...style,
      }}
      {...props}
    >
      <div className="absolute inset-0 rounded-full border border-white/40 bg-white/20 blur-2xl dark:border-white/10 dark:bg-white/5" />
      <div className="absolute inset-3 rounded-full border border-blue-400/15 bg-blue-400/5 dark:border-cyan-300/10 dark:bg-cyan-300/5" />

      {items.map((item, index) => {
        const point = points[index];

        if (!point) return null;

        const rotatedPoint = rotatePoint(point, rotation.x, rotation.y);
        const projectedPoint = projectPoint(rotatedPoint, radius);

        return (
          <div
            key={index}
            className="pointer-events-none absolute left-1/2 top-1/2 will-change-transform"
            style={{
              transform: `translate3d(${projectedPoint.x}px, ${projectedPoint.y}px, 0) translate(-50%, -50%) scale(${projectedPoint.scale})`,
              opacity: projectedPoint.opacity,
              zIndex: projectedPoint.zIndex,
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

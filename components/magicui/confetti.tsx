'use client';

import confetti from 'canvas-confetti';

/**
 * Trigger a confetti animation
 * @param options - Confetti options
 */
export function triggerConfetti(options?: confetti.Options): void {
  const defaultOptions: confetti.Options = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    ...options,
  };

  confetti(defaultOptions);
}

/**
 * Trigger a fireworks-style confetti effect
 */
export function fireworks(): void {
  const duration = 2000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}

/**
 * Trigger a celebration confetti effect
 */
export function celebrate(): void {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio: number, opts: confetti.Options): void {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.6,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

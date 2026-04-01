import test from 'node:test';
import assert from 'node:assert/strict';

import { getGardenVisualState } from './garden-visual.ts';

test('completed garden state keeps the stem fully grown and only swaps bloom', () => {
  const visual = getGardenVisualState({
    progress: 0.18,
    status: 'completed',
    timeMs: 0,
  });

  assert.equal(visual.stemProgress, 1);
  assert.equal(visual.bloom, 'flower');
});

test('running garden state grows in visible stages instead of matching raw progress linearly', () => {
  const visual = getGardenVisualState({
    progress: 0.2,
    status: 'running',
    timeMs: 0,
  });

  assert.ok(visual.stemProgress > 0.2);
  assert.equal(visual.bloom, 'bud');
});

test('running garden state keeps subtle motion alive over time', () => {
  const first = getGardenVisualState({
    progress: 0.45,
    status: 'running',
    timeMs: 0,
  });
  const second = getGardenVisualState({
    progress: 0.45,
    status: 'running',
    timeMs: 900,
  });
  const paused = getGardenVisualState({
    progress: 0.45,
    status: 'paused',
    timeMs: 900,
  });

  assert.notEqual(first.sway, second.sway);
  assert.notEqual(first.glowPulse, second.glowPulse);
  assert.equal(paused.sway, 0);
});

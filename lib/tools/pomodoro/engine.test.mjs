import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_FOCUS_DURATION_SECONDS,
  MAX_FOCUS_DURATION_SECONDS,
  MIN_FOCUS_DURATION_SECONDS,
  completeSession,
  createSession,
  getSessionPreview,
  getRemainingMs,
  normalizeDurationSeconds,
  normalizeTitle,
  pauseSession,
  resumeSession,
  shouldCompleteSession,
} from './engine.ts';

test('normalizeDurationSeconds clamps invalid values into supported range', () => {
  assert.equal(
    normalizeDurationSeconds(Number.NaN),
    DEFAULT_FOCUS_DURATION_SECONDS
  );
  assert.equal(normalizeDurationSeconds(10), MIN_FOCUS_DURATION_SECONDS);
  assert.equal(
    normalizeDurationSeconds(MAX_FOCUS_DURATION_SECONDS + 5),
    MAX_FOCUS_DURATION_SECONDS
  );
  assert.equal(normalizeDurationSeconds(90), 90);
});

test('normalizeTitle trims and limits text length', () => {
  assert.equal(normalizeTitle('   집중 세션   ', 10), '집중 세션');
  assert.equal(normalizeTitle('', 10), '');
  assert.equal(normalizeTitle('a'.repeat(100), 10), 'a'.repeat(10));
});

test('running session remaining time uses target timestamp instead of tick accumulation', () => {
  const session = createSession({
    mode: 'simple',
    durationSeconds: 1500,
    title: '집중',
    now: 1_000,
  });

  assert.equal(getRemainingMs(session, 1_000), 1_500_000);
  assert.equal(getRemainingMs(session, 61_000), 1_440_000);
});

test('pause and resume preserve remaining time correctly', () => {
  const running = createSession({
    mode: 'simple',
    durationSeconds: 120,
    title: '집중',
    now: 1_000,
  });

  const paused = pauseSession(running, 31_000);
  assert.equal(paused.status, 'paused');
  assert.equal(paused.remainingMs, 90_000);

  const resumed = resumeSession(paused, 45_000);
  assert.equal(resumed.status, 'running');
  assert.equal(getRemainingMs(resumed, 45_000), 90_000);
  assert.equal(getRemainingMs(resumed, 75_000), 60_000);
});

test('shouldCompleteSession turns true only when target time is reached', () => {
  const session = createSession({
    mode: 'simple',
    durationSeconds: 60,
    title: '집중',
    now: 1_000,
  });

  assert.equal(shouldCompleteSession(session, 60_999), false);
  assert.equal(shouldCompleteSession(session, 61_000), true);
});

test('completeSession is idempotent and emits a single record payload', () => {
  const session = createSession({
    mode: 'task',
    durationSeconds: 60,
    title: '문서 정리',
    taskId: 'task-1',
    now: 1_000,
  });

  const first = completeSession(session, 61_000);
  assert.equal(first.session.status, 'completed');
  assert.equal(first.record.taskId, 'task-1');
  assert.equal(first.record.duration, 60);

  const second = completeSession(first.session, 62_000);
  assert.equal(second.session.status, 'completed');
  assert.equal(second.record.id, first.record.id);
  assert.equal(second.record.completedAt, first.record.completedAt);
});

test('completeSession can surface save warning state without changing record semantics', () => {
  const session = createSession({
    mode: 'simple',
    durationSeconds: 60,
    title: '공부',
    now: 1_000,
  });

  const completed = completeSession(session, 61_000, { saveWarning: true });

  assert.equal(completed.session.status, 'completed_with_warning');
  assert.equal(completed.record.duration, 60);
});

test('getSessionPreview reflects selected task while idle in task mode', () => {
  const preview = getSessionPreview({
    activeSession: null,
    mode: 'task',
    simpleTitle: '',
    simpleDurationMinutes: 25,
    selectedTask: {
      id: 'task-1',
      title: '문서 정리',
      duration: 900,
      completed: false,
      order: 1,
      updatedAt: '2026-04-01T00:00:00.000Z',
    },
  });

  assert.equal(preview.title, '문서 정리');
  assert.equal(preview.totalMs, 900_000);
  assert.equal(preview.remainingMs, 900_000);
  assert.equal(preview.durationLabel, '15분');
});

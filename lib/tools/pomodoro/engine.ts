import type {
  PomodoroActiveSession,
  PomodoroMode,
  PomodoroRecord,
  PomodoroTask,
} from './types';
import { createPomodoroId } from './id.js';

export const DEFAULT_FOCUS_DURATION_SECONDS = 25 * 60;
export const MIN_FOCUS_DURATION_SECONDS = 60;
export const MAX_FOCUS_DURATION_SECONDS = 180 * 60;

interface CreateSessionInput {
  mode: PomodoroMode;
  durationSeconds: number;
  title?: string;
  taskId?: string | null;
  now?: number;
}

interface CompleteSessionOptions {
  saveWarning?: boolean;
}

interface CompletionResult {
  session: PomodoroActiveSession;
  record: PomodoroRecord;
}

interface SessionPreviewInput {
  activeSession: PomodoroActiveSession | null;
  mode: PomodoroMode;
  simpleTitle: string;
  simpleDurationMinutes: number;
  selectedTask: PomodoroTask | null;
  now?: number;
}

interface SessionPreview {
  title: string;
  remainingMs: number;
  totalMs: number;
  durationLabel: string;
}

export function normalizeDurationSeconds(value: number): number {
  if (!Number.isFinite(value)) {
    return DEFAULT_FOCUS_DURATION_SECONDS;
  }

  const rounded = Math.round(value);

  if (rounded < MIN_FOCUS_DURATION_SECONDS) {
    return MIN_FOCUS_DURATION_SECONDS;
  }

  if (rounded > MAX_FOCUS_DURATION_SECONDS) {
    return MAX_FOCUS_DURATION_SECONDS;
  }

  return rounded;
}

export function normalizeTitle(
  value: string | null | undefined,
  maxLength = 60
): string {
  const trimmed = (value ?? '').trim();

  if (!trimmed) {
    return '';
  }

  return trimmed.slice(0, maxLength);
}

function formatDurationLabel(durationSeconds: number): string {
  return `${Math.round(durationSeconds / 60)}분`;
}

function toIso(timestamp: number): string {
  return new Date(timestamp).toISOString();
}

function getNow(now?: number): number {
  return typeof now === 'number' ? now : Date.now();
}

export function createSession({
  mode,
  durationSeconds,
  title,
  taskId = null,
  now,
}: CreateSessionInput): PomodoroActiveSession {
  const current = getNow(now);
  const normalizedDuration = normalizeDurationSeconds(durationSeconds);

  return {
    id: createPomodoroId(),
    mode,
    title: normalizeTitle(title),
    taskId,
    duration: normalizedDuration,
    startedAt: toIso(current),
    targetAt: toIso(current + normalizedDuration * 1000),
    pausedAt: null,
    remainingMs: null,
    status: 'running',
  };
}

export function getRemainingMs(
  session: PomodoroActiveSession,
  now = Date.now()
): number {
  if (session.status === 'paused') {
    return Math.max(0, session.remainingMs ?? 0);
  }

  if (
    session.status === 'completed' ||
    session.status === 'completed_with_warning'
  ) {
    return 0;
  }

  return Math.max(0, new Date(session.targetAt).getTime() - now);
}

export function getSessionPreview({
  activeSession,
  mode,
  simpleTitle,
  simpleDurationMinutes,
  selectedTask,
  now = Date.now(),
}: SessionPreviewInput): SessionPreview {
  if (activeSession) {
    return {
      title: activeSession.title || '집중 타이머',
      remainingMs: getRemainingMs(activeSession, now),
      totalMs: activeSession.duration * 1000,
      durationLabel: formatDurationLabel(activeSession.duration),
    };
  }

  if (mode === 'task' && selectedTask) {
    return {
      title: selectedTask.title,
      remainingMs: selectedTask.duration * 1000,
      totalMs: selectedTask.duration * 1000,
      durationLabel: formatDurationLabel(selectedTask.duration),
    };
  }

  const simpleDurationSeconds = normalizeDurationSeconds(
    simpleDurationMinutes * 60
  );

  return {
    title: normalizeTitle(simpleTitle, 60) || '집중 타이머',
    remainingMs: simpleDurationSeconds * 1000,
    totalMs: simpleDurationSeconds * 1000,
    durationLabel: formatDurationLabel(simpleDurationSeconds),
  };
}

export function pauseSession(
  session: PomodoroActiveSession,
  now = Date.now()
): PomodoroActiveSession {
  if (session.status !== 'running') {
    return session;
  }

  return {
    ...session,
    status: 'paused',
    pausedAt: toIso(now),
    remainingMs: getRemainingMs(session, now),
  };
}

export function resumeSession(
  session: PomodoroActiveSession,
  now = Date.now()
): PomodoroActiveSession {
  if (session.status !== 'paused') {
    return session;
  }

  const remainingMs = Math.max(
    0,
    session.remainingMs ?? session.duration * 1000
  );

  return {
    ...session,
    status: 'running',
    startedAt: toIso(now),
    targetAt: toIso(now + remainingMs),
    pausedAt: null,
    remainingMs: null,
  };
}

export function shouldCompleteSession(
  session: PomodoroActiveSession,
  now = Date.now()
): boolean {
  if (session.status !== 'running') {
    return false;
  }

  return getRemainingMs(session, now) === 0;
}

export function completeSession(
  session: PomodoroActiveSession,
  now = Date.now(),
  options: CompleteSessionOptions = {}
): CompletionResult {
  if (session.completedRecord) {
    return {
      session,
      record: session.completedRecord,
    };
  }

  const completedAt = toIso(now);
  const record: PomodoroRecord = {
    id: createPomodoroId(),
    mode: session.mode,
    title: session.title,
    taskId: session.taskId,
    duration: session.duration,
    completedAt,
  };

  const nextSession: PomodoroActiveSession = {
    ...session,
    status: options.saveWarning ? 'completed_with_warning' : 'completed',
    pausedAt: null,
    remainingMs: 0,
    targetAt: completedAt,
    completedRecord: record,
  };

  return {
    session: nextSession,
    record,
  };
}

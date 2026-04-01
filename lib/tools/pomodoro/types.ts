export type PomodoroMode = 'simple' | 'task';
export type PomodoroTheme = 'tomato' | 'visual' | 'minimal' | 'garden';

export type PomodoroSessionStatus =
  | 'running'
  | 'paused'
  | 'completed'
  | 'completed_with_warning';

export interface PomodoroRecord {
  id: string;
  mode: PomodoroMode;
  title: string;
  taskId: string | null;
  duration: number;
  completedAt: string;
}

export interface PomodoroActiveSession {
  id: string;
  mode: PomodoroMode;
  title: string;
  taskId: string | null;
  duration: number;
  startedAt: string;
  targetAt: string;
  pausedAt: string | null;
  remainingMs: number | null;
  status: PomodoroSessionStatus;
  completedRecord?: PomodoroRecord;
}

export interface PomodoroTask {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
  order: number;
  updatedAt: string;
}

export interface PomodoroSettings {
  defaultFocusTime: number;
  soundEnabled: boolean;
  preferredMode: PomodoroMode;
  theme: PomodoroTheme;
}

export interface PomodoroStore {
  version: number;
  settings: PomodoroSettings;
  activeSession: PomodoroActiveSession | null;
  records: PomodoroRecord[];
  tasks: PomodoroTask[];
}

export interface StorageLoadResult {
  store: PomodoroStore;
  warning: string | null;
}

export interface StorageSaveResult {
  ok: boolean;
  warning: string | null;
}

export interface PomodoroStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

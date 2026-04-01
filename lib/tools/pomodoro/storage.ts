import type {
  PomodoroActiveSession,
  PomodoroStorageLike,
  PomodoroStore,
  StorageLoadResult,
  StorageSaveResult,
} from './types';

export const POMODORO_STORAGE_KEY = 'zento:pomodoro';
export const POMODORO_STORAGE_VERSION = 1;

export function createDefaultPomodoroStore(): PomodoroStore {
  return {
    version: POMODORO_STORAGE_VERSION,
    settings: {
      defaultFocusTime: 25 * 60,
      soundEnabled: true,
      preferredMode: 'simple',
      theme: 'tomato',
    },
    activeSession: null,
    records: [],
    tasks: [],
  };
}

function isObjectLike(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toActiveSession(value: unknown): PomodoroActiveSession | null {
  return isObjectLike(value)
    ? (value as unknown as PomodoroActiveSession)
    : null;
}

function migrateLegacyStore(input: unknown): PomodoroStore | null {
  if (!isObjectLike(input)) {
    return null;
  }

  if (typeof input.version === 'number') {
    const merged = {
      ...createDefaultPomodoroStore(),
      ...input,
    } as PomodoroStore;

    return {
      ...merged,
      version: POMODORO_STORAGE_VERSION,
      settings: {
        ...createDefaultPomodoroStore().settings,
        ...(isObjectLike(input.settings) ? input.settings : {}),
      },
      records: Array.isArray(input.records) ? input.records : [],
      tasks: Array.isArray(input.tasks) ? input.tasks : [],
      activeSession: toActiveSession(input.activeSession),
    };
  }

  const legacyFocusTime =
    isObjectLike(input.settings) && typeof input.settings.focusTime === 'number'
      ? input.settings.focusTime
      : createDefaultPomodoroStore().settings.defaultFocusTime;

  return {
    ...createDefaultPomodoroStore(),
    settings: {
      ...createDefaultPomodoroStore().settings,
      defaultFocusTime: legacyFocusTime,
    },
    records: Array.isArray(input.records) ? input.records : [],
    tasks: Array.isArray(input.tasks) ? input.tasks : [],
  };
}

export function loadPomodoroStore(
  storage?: PomodoroStorageLike | null
): StorageLoadResult {
  if (!storage) {
    return {
      store: createDefaultPomodoroStore(),
      warning: null,
    };
  }

  try {
    const raw = storage.getItem(POMODORO_STORAGE_KEY);

    if (!raw) {
      return {
        store: createDefaultPomodoroStore(),
        warning: null,
      };
    }

    const parsed = JSON.parse(raw);
    const migrated = migrateLegacyStore(parsed);

    if (!migrated) {
      return {
        store: createDefaultPomodoroStore(),
        warning: '저장 데이터가 손상되어 초기화되었습니다.',
      };
    }

    return {
      store: migrated,
      warning: null,
    };
  } catch {
    return {
      store: createDefaultPomodoroStore(),
      warning: '저장 데이터가 손상되어 초기화되었습니다.',
    };
  }
}

export function savePomodoroStore(
  storage: PomodoroStorageLike | null | undefined,
  store: PomodoroStore
): StorageSaveResult {
  if (!storage) {
    return {
      ok: false,
      warning: '저장소를 사용할 수 없어 변경사항이 저장되지 않았습니다.',
    };
  }

  try {
    const payload = {
      ...store,
      version: POMODORO_STORAGE_VERSION,
    };

    storage.setItem(POMODORO_STORAGE_KEY, JSON.stringify(payload));

    return {
      ok: true,
      warning: null,
    };
  } catch {
    return {
      ok: false,
      warning: '변경사항이 저장되지 않을 수 있습니다.',
    };
  }
}

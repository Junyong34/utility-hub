import test from 'node:test';
import assert from 'node:assert/strict';

import {
  POMODORO_STORAGE_VERSION,
  createDefaultPomodoroStore,
  loadPomodoroStore,
  savePomodoroStore,
} from './storage.ts';

function createMemoryStorage(initial = {}) {
  const map = new Map(Object.entries(initial));

  return {
    getItem(key) {
      return map.has(key) ? map.get(key) : null;
    },
    setItem(key, value) {
      map.set(key, value);
    },
    dump() {
      return Object.fromEntries(map.entries());
    },
  };
}

test('loadPomodoroStore falls back safely on malformed json', () => {
  const storage = createMemoryStorage({
    'zento:pomodoro': '{broken',
  });

  const loaded = loadPomodoroStore(storage);

  assert.deepEqual(loaded.store, createDefaultPomodoroStore());
  assert.match(loaded.warning ?? '', /손상|초기화/);
});

test('loadPomodoroStore migrates legacy payload without version field', () => {
  const storage = createMemoryStorage({
    'zento:pomodoro': JSON.stringify({
      settings: { focusTime: 1800 },
      records: [],
      tasks: [],
    }),
  });

  const loaded = loadPomodoroStore(storage);

  assert.equal(loaded.store.version, POMODORO_STORAGE_VERSION);
  assert.equal(loaded.store.settings.defaultFocusTime, 1800);
  assert.equal(loaded.store.settings.theme, 'tomato');
  assert.equal(loaded.warning, null);
});

test('savePomodoroStore reports write failure instead of throwing', () => {
  const storage = {
    getItem() {
      return null;
    },
    setItem() {
      throw new Error('QuotaExceededError');
    },
  };

  const result = savePomodoroStore(storage, createDefaultPomodoroStore());

  assert.equal(result.ok, false);
  assert.match(result.warning ?? '', /저장/);
});

test('savePomodoroStore persists current schema version', () => {
  const storage = createMemoryStorage();
  const result = savePomodoroStore(storage, createDefaultPomodoroStore());

  assert.equal(result.ok, true);
  const saved = JSON.parse(storage.dump()['zento:pomodoro']);
  assert.equal(saved.version, POMODORO_STORAGE_VERSION);
  assert.equal(saved.settings.theme, 'tomato');
});

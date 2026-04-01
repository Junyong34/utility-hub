import test from 'node:test';
import assert from 'node:assert/strict';

import { createPomodoroId } from './id.js';

test('createPomodoroId uses randomUUID when available', () => {
  const id = createPomodoroId({
    randomUUID: () => 'uuid-from-runtime',
  });

  assert.equal(id, 'uuid-from-runtime');
});

test('createPomodoroId falls back when randomUUID is unavailable', () => {
  const id = createPomodoroId({}, () => 0.123456789);

  assert.match(id, /^pom-/);
  assert.ok(id.length > 10);
});

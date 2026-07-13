import assert from 'node:assert/strict';
import test from 'node:test';

import { copyTextToClipboard } from './clipboard.ts';

async function withBrowserGlobals(values, run) {
  const originalDescriptors = new Map();

  for (const [name, value] of Object.entries(values)) {
    originalDescriptors.set(
      name,
      Object.getOwnPropertyDescriptor(globalThis, name)
    );

    if (value === undefined) {
      delete globalThis[name];
    } else {
      Object.defineProperty(globalThis, name, {
        configurable: true,
        value,
        writable: true,
      });
    }
  }

  try {
    return await run();
  } finally {
    for (const [name, descriptor] of originalDescriptors) {
      if (descriptor === undefined) {
        delete globalThis[name];
      } else {
        Object.defineProperty(globalThis, name, descriptor);
      }
    }
  }
}

function createDocumentBoundary({ copyResult = true, copyError } = {}) {
  const state = {
    appended: 0,
    command: null,
    created: 0,
    focused: false,
    left: '',
    position: '',
    range: null,
    readonly: null,
    removed: 0,
    selected: false,
    value: '',
  };
  const textarea = {
    set value(value) {
      state.value = value;
    },
    get value() {
      return state.value;
    },
    style: {
      set position(value) {
        state.position = value;
      },
      set left(value) {
        state.left = value;
      },
    },
    focus() {
      state.focused = true;
    },
    select() {
      state.selected = true;
    },
    setAttribute(name, value) {
      if (name === 'readonly') state.readonly = value;
    },
    setSelectionRange(start, end) {
      state.range = [start, end];
    },
  };
  const document = {
    body: {
      appendChild(node) {
        assert.equal(node, textarea);
        state.appended += 1;
      },
      removeChild(node) {
        assert.equal(node, textarea);
        state.removed += 1;
      },
    },
    createElement(tagName) {
      assert.equal(tagName, 'textarea');
      state.created += 1;
      return textarea;
    },
    execCommand(command) {
      state.command = command;
      if (copyError) throw copyError;
      return copyResult;
    },
  };

  return { document, state };
}

test('returns success when the native clipboard accepts the value', async () => {
  const copiedValues = [];
  const { document, state } = createDocumentBoundary();

  const copied = await withBrowserGlobals(
    {
      document,
      navigator: {
        clipboard: {
          async writeText(value) {
            copiedValues.push(value);
          },
        },
      },
    },
    () => copyTextToClipboard('native clipboard')
  );

  assert.equal(copied, true);
  assert.deepEqual(copiedValues, ['native clipboard']);
  assert.equal(state.created, 0);
});

test('copies with a temporary textarea when the native clipboard rejects', async () => {
  const { document, state } = createDocumentBoundary();

  const copied = await withBrowserGlobals(
    {
      document,
      navigator: {
        clipboard: {
          async writeText() {
            throw new Error('permission denied');
          },
        },
      },
    },
    () => copyTextToClipboard('fallback')
  );

  assert.equal(copied, true);
  assert.deepEqual(state, {
    appended: 1,
    command: 'copy',
    created: 1,
    focused: true,
    left: '-9999px',
    position: 'fixed',
    range: [0, 8],
    readonly: '',
    removed: 1,
    selected: true,
    value: 'fallback',
  });
});

test('returns failure when no browser clipboard boundary is available', async () => {
  const copied = await withBrowserGlobals(
    { document: undefined, navigator: undefined },
    () => copyTextToClipboard('server')
  );

  assert.equal(copied, false);
});

test('cleans up the temporary textarea when the fallback copy throws', async () => {
  const { document, state } = createDocumentBoundary({
    copyError: new Error('copy blocked'),
  });

  const copied = await withBrowserGlobals(
    { document, navigator: undefined },
    () => copyTextToClipboard('cleanup')
  );

  assert.equal(copied, false);
  assert.equal(state.appended, 1);
  assert.equal(state.removed, 1);
  assert.equal(state.command, 'copy');
});

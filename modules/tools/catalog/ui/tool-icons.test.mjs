import assert from 'node:assert/strict';
import test from 'node:test';

import { getAvailableIcons, getToolIcon, isValidIcon } from './tool-icons.ts';

const REGISTERED_TOOL_ICONS = [
  'AlarmClock',
  'Box',
  'Calculator',
  'DicesIcon',
  'Home',
  'PiggyBank',
  'Timer',
];

test('available_icons_contains_only_icons_registered_for_tool_manifests', () => {
  assert.deepEqual(getAvailableIcons(), REGISTERED_TOOL_ICONS);
});

test('unknown_icon_uses_the_registered_default_icon', () => {
  assert.equal(isValidIcon('AirVent'), false);
  assert.equal(getToolIcon('AirVent'), getToolIcon('Box'));
});

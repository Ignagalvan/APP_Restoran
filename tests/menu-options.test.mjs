import assert from 'node:assert/strict';
import test from 'node:test';
import { currentMenuChoices } from '../src/lib/menu-option-choices.ts';
import { menuPreviewOrigins } from '../src/lib/menu-preview-origins.ts';

test('live QR choices exclude removed/unavailable alternatives and respect new limits', () => {
  const group = { id: 'g', multiple: true, maxChoices: 2, options: [{ id: 'a' }, { id: 'b' }, { id: 'out', available: false }] };
  const choices = { g: ['missing', 'out', 'a', 'a', 'b'], old: ['old'] };
  assert.deepEqual(currentMenuChoices([group], choices), { g: ['a', 'b'] });
  assert.deepEqual(currentMenuChoices([{ ...group, maxChoices: 1 }], choices), { g: ['a'] });
  assert.deepEqual(currentMenuChoices([{ ...group, multiple: false }], choices), { g: ['a'] });
  assert.deepEqual(currentMenuChoices([group], {}), { g: [] });
});
test('embedded QR accepts only exact configured secure origins, with local defaults in development', () => {
  assert.deepEqual(menuPreviewOrigins(undefined, false), []);
  assert.deepEqual(menuPreviewOrigins('https://panel.example,https://panel.example/path,http://unsafe.example,javascript:alert(1),https://user:secret@panel.example', false), ['https://panel.example']);
  assert.deepEqual(menuPreviewOrigins(undefined, true), ['http://localhost:3001', 'http://127.0.0.1:3001']);
});

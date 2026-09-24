import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
const legal = await readFile(new URL('../src/pages/LegalPage.jsx', import.meta.url), 'utf8');
const landing = await readFile(new URL('../src/pages/Landing.jsx', import.meta.url), 'utf8');

test('published legal routes and footer links expose one consistent 15+ release', () => {
  for (const route of ['/uyelik-kosullari', '/gizlilik', '/topluluk-kurallari', '/puanlama-ve-oyun-kurallari']) {
    assert.ok(app.includes(`path="${route}"`), route);
    assert.ok(legal.includes(`to="${route}"`), route);
    assert.ok(landing.includes(`to="${route}"`), route);
  }
  assert.match(legal, /2026-09-25-v1 · Yürürlükte/);
  assert.match(legal, /yalnız 15 yaşını doldurmuş/);
  assert.doesNotMatch(legal, /13 yaş|13\+|Yayın öncesi çalışma metni|İnceleme sürümü/);
});

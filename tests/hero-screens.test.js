import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [landing, css] = await Promise.all([
  readFile(new URL('../src/pages/Landing.jsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/pages/Landing.css', import.meta.url), 'utf8'),
]);

test('landing hero uses replaceable current app screenshots inside CSS phone frames', () => {
  for (const [file, label] of [
    ['phone-1.png', 'SüperTribün Sıralama'],
    ['phone-2.png', 'SüperTribün Kariyer'],
    ['phone-3.png', 'SüperTribün Arena'],
  ]) {
    assert.match(landing, new RegExp(`src="/${file}" alt="${label}" className="phone-screen-img"`));
  }
  assert.match(css, /\.phone-mockup\s*\{[^}]*aspect-ratio:\s*1320\s*\/\s*2868/s);
  assert.match(css, /\.phone-mockup\s*\{[^}]*overflow:\s*hidden/s);
  assert.match(css, /\.phone-screen-img\s*\{[^}]*object-fit:\s*cover/s);
});

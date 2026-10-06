import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const page = fs.readFileSync(new URL('../src/pages/SuperTribunAI.jsx', import.meta.url), 'utf8');
const styles = fs.readFileSync(new URL('../src/pages/Landing.css', import.meta.url), 'utf8');
const vercel = fs.readFileSync(new URL('../vercel.json', import.meta.url), 'utf8');

test('AI route is available on direct production navigation', () => {
  assert.match(vercel, /"source": "\/ai", "destination": "\/index\.html"/);
});

test('AI model cards use a dedicated readable three-column layout', () => {
  assert.match(page, /bento-grid ai-model-grid/);
  assert.equal((page.match(/bento-card ai-model-card/g) ?? []).length, 3);
  assert.match(styles, /\.ai-model-grid\s*{[^}]*grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/s);
  assert.match(styles, /\.ai-model-card\s*{[^}]*min-height:\s*640px/s);
  assert.match(styles, /@media \(max-width: 768px\)[\s\S]*\.ai-model-card\s*{\s*min-height:\s*500px;/);
});

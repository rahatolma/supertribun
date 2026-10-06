import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const page = fs.readFileSync(new URL('../src/pages/SuperTribunAI.jsx', import.meta.url), 'utf8');
const styles = fs.readFileSync(new URL('../src/pages/Landing.css', import.meta.url), 'utf8');
const vercel = fs.readFileSync(new URL('../vercel.json', import.meta.url), 'utf8');

test('AI route is available on direct production navigation', () => {
  assert.match(vercel, /"source": "\/ai", "destination": "\/index\.html"/);
});

test('AI model cards reuse the landing page card dimensions', () => {
  assert.match(page, /bento-grid ai-model-grid/);
  assert.equal((page.match(/bento-card feature-card-primary ai-model-card/g) ?? []).length, 3);
  assert.match(styles, /\.bento-card\.feature-card-primary\s*{\s*grid-column:\s*span 2;/);
  assert.match(styles, /@media \(min-width: 1181px\)[\s\S]*\.bento-card\.feature-card-primary\s*{[^}]*height:\s*540px;[^}]*min-height:\s*540px;/);
  assert.doesNotMatch(styles, /\.ai-model-card\s*{/);
});

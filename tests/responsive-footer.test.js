import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/pages/Landing.css', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/pages/Landing.jsx', import.meta.url), 'utf8');

test('mobile footer override follows the desktop grid and prevents overflow', () => {
  const desktopFooter = css.indexOf('.footer-content {\n  display: grid;');
  const mobileFooter = css.lastIndexOf('@media (max-width: 600px)');
  assert.ok(desktopFooter >= 0);
  assert.ok(mobileFooter > desktopFooter, 'mobile footer rules must win over the desktop grid');
  const mobile = css.slice(mobileFooter);
  for (const rule of [
    '.footer-section { padding: 32px 20px 40px; }',
    'flex-direction: column;',
    'justify-content: center;',
    'overflow-wrap: anywhere;',
    '.cta-section { padding: 72px 20px 50px; }',
  ]) assert.match(mobile, new RegExp(rule.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('footer keeps the support address as a direct mail link', () => {
  assert.match(page, /href="mailto:destek@supertribun\.com"/);
  assert.match(page, />destek@supertribun\.com</);
});

test('scroll-to-top action is the final footer control', () => {
  const legalEnd = page.indexOf('</nav>', page.indexOf('className="footer-legal"'));
  const scrollTop = page.indexOf('className="btn-scroll-top"');
  assert.ok(legalEnd >= 0);
  assert.ok(scrollTop > legalEnd);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const vercel = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));

test('all web routes receive the baseline browser security headers', () => {
  const globalRule = vercel.headers.find(rule => rule.source === '/(.*)');
  assert.ok(globalRule, 'global header rule');

  const headers = Object.fromEntries(globalRule.headers.map(header => [header.key, header.value]));
  assert.match(headers['Content-Security-Policy'], /default-src 'self'/);
  assert.match(headers['Content-Security-Policy'], /object-src 'none'/);
  assert.match(headers['Content-Security-Policy'], /https:\/\/challenges\.cloudflare\.com/);
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['X-Frame-Options'], 'SAMEORIGIN');
  assert.equal(headers['Referrer-Policy'], 'strict-origin-when-cross-origin');
  assert.match(headers['Permissions-Policy'], /camera=\(\)/);
  assert.match(headers['Permissions-Policy'], /microphone=\(\)/);
  assert.match(headers['Permissions-Policy'], /geolocation=\(\)/);
});

test('Turnstile challenge stays no-store and permits only the challenge origin', () => {
  const challengeRule = vercel.headers.find(rule => rule.source === '/auth/challenge');
  assert.ok(challengeRule, 'challenge header rule');

  const headers = Object.fromEntries(challengeRule.headers.map(header => [header.key, header.value]));
  assert.equal(headers['Cache-Control'], 'no-store');
  assert.equal(headers['Referrer-Policy'], 'no-referrer');
  assert.match(headers['Content-Security-Policy'], /frame-src https:\/\/challenges\.cloudflare\.com/);
  assert.match(headers['Content-Security-Policy'], /form-action 'none'/);
});

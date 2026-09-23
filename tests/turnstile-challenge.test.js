import test from 'node:test';
import assert from 'node:assert/strict';
import { readChallengeRequest, turnstileMessage } from '../src/turnstileChallenge.js';

const nonce = '075272d1-c0d8-4d10-bcae-c21de9b05e7f';
test('challenge accepts only known auth actions and bounded nonces', () => {
  assert.deepEqual(readChallengeRequest(`?action=signup&nonce=${nonce}`), { action: 'signup', nonce });
  for (const query of ['', `?action=admin&nonce=${nonce}`, '?action=login&nonce=short', '?action=login&nonce=%0Ainvalid']) assert.equal(readChallengeRequest(query), null);
});
test('native message is nonce-bound and never accepts whitespace or malformed tokens', () => {
  const token = `token.${'a'.repeat(30)}`;
  assert.deepEqual(JSON.parse(turnstileMessage(token, nonce)), { type: 'supertribun-turnstile', token, nonce });
  assert.equal(turnstileMessage('short', nonce), null);
  assert.equal(turnstileMessage(`token ${'a'.repeat(30)}`, nonce), null);
  assert.equal(turnstileMessage(token, 'bad'), null);
});

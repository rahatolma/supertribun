export const TURNSTILE_ACTIONS = new Set(['login', 'signup', 'recovery', 'social']);

export function readChallengeRequest(search = '') {
  const params = new URLSearchParams(search);
  const action = params.get('action') ?? '';
  const nonce = params.get('nonce') ?? '';
  if (!TURNSTILE_ACTIONS.has(action) || !/^[a-f0-9-]{20,80}$/.test(nonce)) return null;
  return { action, nonce };
}

export function turnstileMessage(token, nonce) {
  const clean = typeof token === 'string' ? token.trim() : '';
  const unsafe = [...clean].some(character => character.trim() === '' || character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127);
  if (clean.length < 20 || clean.length > 4096 || unsafe) return null;
  if (!/^[a-f0-9-]{20,80}$/.test(nonce)) return null;
  return JSON.stringify({ type: 'supertribun-turnstile', token: clean, nonce });
}

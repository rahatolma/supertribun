import test from 'node:test';
import assert from 'node:assert/strict';
import { CONSENT_KEY, CONSENT_VERSION, CONSENT_LIFETIME, parseConsent, createConsentStore } from '../src/privacy/consent.js';
import { filterMeasurement, permittedEvent } from '../src/privacy/measurement-policy.js';

const memory = () => {
  const data = new Map();
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: (key) => data.delete(key) };
};
const setup = () => {
  let time = 1_790_000_000_000;
  const local = memory(), session = memory();
  return { local, session, now: () => time, advance: (ms) => { time += ms; }, store: createConsentStore({ storage: () => local, session: () => session, now: () => time }) };
};

test('fresh, malformed and legacy records never imply consent', () => {
  for (const value of [null, '', '{', '{}', '{"analytics":true,"performance":true}']) assert.equal(parseConsent(value), null);
  const { store } = setup();
  assert.equal(store.getSnapshot(), null);
  assert.equal(store.allows('analytics'), false);
  assert.equal(store.allows('performance'), false);
});
test('reject persists, survives reload and keeps both categories off', () => {
  const { local, session, now, store } = setup();
  assert.equal(store.save({ analytics: false, performance: false }), true);
  const reloaded = createConsentStore({ storage: () => local, session: () => session, now });
  assert.equal(reloaded.getSnapshot().necessary, true);
  assert.equal(reloaded.allows('analytics'), false);
  assert.equal(reloaded.allows('performance'), false);
});
test('independent categories, accepted events and synchronous withdrawal', () => {
  const { store } = setup();
  store.save({ analytics: true, performance: false });
  assert.equal(store.allows('analytics'), true);
  assert.equal(store.allows('performance'), false);
  assert.equal(store.allows('necessary'), false);
  store.save({ analytics: false, performance: true });
  assert.equal(store.allows('analytics'), false);
  assert.equal(store.allows('performance'), true);
});
test('expiry denies sends before UI refresh, then clears snapshot', () => {
  const { store, advance } = setup();
  store.save({ analytics: true, performance: true });
  advance(CONSENT_LIFETIME);
  assert.equal(store.allows('analytics'), false);
  store.refresh();
  assert.equal(store.getSnapshot(), null);
});
test('record version, exact TTL, booleans and future timestamps are validated', () => {
  const { store, local, now } = setup();
  store.save({ analytics: true, performance: true });
  const valid = JSON.parse(local.getItem(CONSENT_KEY));
  assert.equal(valid.version, CONSENT_VERSION);
  for (const change of [{ version: 'old' }, { analytics: 'true' }, { necessary: false }, { savedAt: now() + 1 }, { expiresAt: valid.expiresAt + 1 }]) {
    assert.equal(parseConsent(JSON.stringify({ ...valid, ...change }), now()), null);
  }
});
test('stable snapshots and cross-tab removal notify only on change', () => {
  const { store, local } = setup();
  let calls = 0;
  const stop = store.subscribe(() => calls++);
  store.save({ analytics: true, performance: false });
  const before = store.getSnapshot();
  store.refresh();
  assert.equal(store.getSnapshot(), before);
  assert.equal(calls, 1);
  local.removeItem(CONSENT_KEY);
  assert.equal(store.allows('analytics'), false);
  store.refresh();
  assert.equal(calls, 2);
  stop();
  store.save({ analytics: false, performance: false });
  assert.equal(calls, 2);
});
test('storage denied at startup fails closed without crashing', () => {
  const store = createConsentStore({ storage: () => { throw new Error('blocked'); }, session: () => null });
  assert.equal(store.getSnapshot(), null);
  assert.equal(store.save({ analytics: true, performance: true }), false);
  assert.equal(store.hasStorageError(), true);
  assert.equal(store.allows('analytics'), false);
});
test('failed withdrawal denies in memory and suppresses stale allow on reload', () => {
  const { local, session, now, store } = setup();
  store.save({ analytics: true, performance: true });
  local.setItem = () => { throw new Error('quota'); };
  local.removeItem = () => { throw new Error('blocked'); };
  assert.equal(store.save({ analytics: false, performance: false }), false);
  assert.equal(store.allows('analytics'), false);
  const reloaded = createConsentStore({ storage: () => local, session: () => session, now });
  assert.equal(reloaded.allows('analytics'), false);
});
test('save does not coerce arbitrary truthy input into consent', () => {
  const { store } = setup();
  store.save({ analytics: 'true', performance: 1 });
  assert.equal(store.allows('analytics'), false);
  assert.equal(store.allows('performance'), false);
});
test('all three button events require opt-in and use fixed non-personal properties', () => {
  for (const name of ['discover_click', 'app_store_click', 'play_store_click']) {
    assert.equal(permittedEvent(name, false), null);
    assert.equal(permittedEvent(name, true).name, name);
  }
  assert.equal(permittedEvent('app_store_click', true).properties.status, 'coming_soon');
  assert.equal(permittedEvent('email=user@example.com', true), null);
  assert.equal(permittedEvent('__proto__', true), null);
});
test('measurement filters fail closed and remove query/hash data', () => {
  const event = { type: 'pageview', url: 'https://supertribun.com/gizlilik?email=test@example.com#private' };
  assert.equal(filterMeasurement(event, false), null);
  assert.equal(filterMeasurement(event, true).url, 'https://supertribun.com/gizlilik');
  assert.equal(filterMeasurement({ ...event, url: 'https://supertribun.com/user/secret' }, true), null);
  assert.equal(filterMeasurement({ ...event, url: 'invalid' }, true), null);
});

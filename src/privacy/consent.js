export const CONSENT_KEY = 'cookieConsent';
export const CONSENT_VERSION = '2026-09-20';
export const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
const BLOCK_KEY = 'supertribun.measurementBlocked';

export function parseConsent(raw, now = Date.now()) {
  try {
    const value = JSON.parse(raw);
    if (value?.version !== CONSENT_VERSION || value.necessary !== true ||
        typeof value.analytics !== 'boolean' || typeof value.performance !== 'boolean' ||
        !Number.isFinite(value.savedAt) || !Number.isFinite(value.expiresAt) ||
        value.savedAt > now || value.expiresAt <= now ||
        value.expiresAt !== value.savedAt + CONSENT_LIFETIME) return null;
    return value;
  } catch { return null; }
}

export function createConsentStore({ storage, session, now = Date.now }) {
  let failed = false;
  const read = () => {
    try {
      if (failed || session()?.getItem(BLOCK_KEY) === 'true') return null;
      return parseConsent(storage()?.getItem(CONSENT_KEY), now());
    } catch { return null; }
  };
  let snapshot = read();
  const listeners = new Set();
  const publish = (next) => {
    if (JSON.stringify(snapshot) === JSON.stringify(next)) return;
    snapshot = next;
    listeners.forEach((listener) => listener());
  };
  return {
    getSnapshot: () => snapshot,
    hasStorageError: () => failed,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    refresh() { publish(read()); },
    allows(category) {
      return (category === 'analytics' || category === 'performance') && read()?.[category] === true;
    },
    save(preferences) {
      const savedAt = now();
      const next = {
        version: CONSENT_VERSION, necessary: true,
        analytics: preferences.analytics === true, performance: preferences.performance === true,
        savedAt, expiresAt: savedAt + CONSENT_LIFETIME,
      };
      try {
        const local = storage();
        if (!local) throw new Error('Storage unavailable');
        local.setItem(CONSENT_KEY, JSON.stringify(next));
        session()?.removeItem(BLOCK_KEY);
        failed = false;
        publish(next);
        return true;
      } catch {
        // A failed save (including withdrawal) must never leave measurement enabled.
        failed = true;
        try { storage()?.removeItem(CONSENT_KEY); } catch { /* storage may be blocked */ }
        try { session()?.setItem(BLOCK_KEY, 'true'); } catch { /* in-memory deny remains */ }
        publish(null);
        return false;
      }
    },
  };
}

export const consentStore = createConsentStore({
  storage: () => typeof window === 'undefined' ? null : window.localStorage,
  session: () => typeof window === 'undefined' ? null : window.sessionStorage,
});

export function watchConsent() {
  const refresh = () => consentStore.refresh();
  window.addEventListener('storage', refresh);
  window.addEventListener('focus', refresh);
  document.addEventListener('visibilitychange', refresh);
  // Each send guard also checks expiry synchronously, without waiting for this timer.
  const timer = window.setInterval(refresh, 30_000);
  return () => {
    window.removeEventListener('storage', refresh);
    window.removeEventListener('focus', refresh);
    document.removeEventListener('visibilitychange', refresh);
    window.clearInterval(timer);
  };
}

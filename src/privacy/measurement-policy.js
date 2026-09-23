const ALLOWED_PATHS = new Set(['/', '/gizlilik', '/cerez-politikasi', '/hesap-silme', '/t/shared']);
const EVENTS = {
  discover_click: { location: 'hero' },
  app_store_click: { location: 'download', platform: 'ios', status: 'coming_soon' },
  play_store_click: { location: 'download', platform: 'android', status: 'coming_soon' },
  share_open_app_click: { location: 'prediction_share' },
};

export function filterMeasurement(event, allowed) {
  if (!allowed) return null;
  try {
    const url = new URL(event.url);
    if (!ALLOWED_PATHS.has(url.pathname)) return null;
    url.search = '';
    url.hash = '';
    return { ...event, url: url.toString() };
  } catch { return null; }
}

export function permittedEvent(name, allowed) {
  return allowed && Object.hasOwn(EVENTS, name) ? { name, properties: { ...EVENTS[name] } } : null;
}

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import CookieConsent from './components/CookieConsent';
import LegalPage from './pages/LegalPage';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { consentStore, watchConsent } from './privacy/consent';
import { beforeAnalytics, beforePerformance, measurementEnabled } from './privacy/measurement';

function Site() {
  const consent = useSyncExternalStore(consentStore.subscribe, consentStore.getSnapshot);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const loaded = useRef({ analytics: false, performance: false });
  const { pathname } = useLocation();
  useEffect(watchConsent, []);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    if (!measurementEnabled) return;
    const next = { analytics: consent?.analytics === true, performance: consent?.performance === true };
    if ((loaded.current.analytics && !next.analytics) || (loaded.current.performance && !next.performance)) {
      // SDK unmount alone does not unload global observers. Guards stop new sends immediately;
      // reload after a persisted withdrawal/expiry also unloads the observers.
      if (!consentStore.hasStorageError()) window.location.reload();
      return;
    }
    loaded.current = next;
  }, [consent]);
  const openPreferences = () => setPreferencesOpen(true);
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing onOpenPreferences={openPreferences} />} />
        <Route path="/gizlilik" element={<LegalPage kind="privacy" onOpenPreferences={openPreferences} />} />
        <Route path="/cerez-politikasi" element={<LegalPage kind="cookies" onOpenPreferences={openPreferences} />} />
        <Route path="/hesap-silme" element={<LegalPage kind="accountDeletion" onOpenPreferences={openPreferences} />} />
        <Route path="*" element={<LegalPage kind="missing" onOpenPreferences={openPreferences} />} />
      </Routes>
      <CookieConsent consent={consent} open={preferencesOpen} onOpen={openPreferences} onClose={() => setPreferencesOpen(false)} />
      {measurementEnabled && consent?.analytics && <Analytics beforeSend={beforeAnalytics} />}
      {measurementEnabled && consent?.performance && <SpeedInsights beforeSend={beforePerformance} />}
    </>
  );
}

export default function App() {
  return <BrowserRouter><Site /></BrowserRouter>;
}

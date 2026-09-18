import Landing from './pages/Landing';
import CookieConsent from './components/CookieConsent';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <>
      <Landing />
      <CookieConsent />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;

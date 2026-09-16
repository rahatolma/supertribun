import Landing from './pages/Landing';
import CookieConsent from './components/CookieConsent';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <Landing />
      <CookieConsent />
      <Analytics />
    </>
  );
}

export default App;

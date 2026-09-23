import { useEffect, useMemo, useRef, useState } from 'react';
import { readChallengeRequest, turnstileMessage } from '../turnstileChallenge';
import './TurnstileChallenge.css';

// A Turnstile site key is public by design. The matching secret is stored only
// in Supabase Auth and must never be added to this bundle or repository.
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAFBget_GpJa6QgrF';
const SCRIPT_ID = 'cloudflare-turnstile-script';

export default function TurnstileChallenge() {
  const host = useRef(null);
  const widget = useRef(null);
  const request = useMemo(() => readChallengeRequest(window.location.search), []);
  const [status, setStatus] = useState(() => request ? 'loading' : 'invalid');

  useEffect(() => {
    document.title = 'Güvenlik kontrolü · SüperTribün';
    if (!request || !SITE_KEY) return undefined;
    let active = true;
    const render = () => {
      if (!active || !host.current || !window.turnstile || widget.current !== null) return;
      try {
        widget.current = window.turnstile.render(host.current, {
          sitekey: SITE_KEY,
          action: request.action,
          cData: request.nonce.replaceAll('-', '').slice(0, 255),
          theme: 'light',
          size: 'flexible',
          appearance: 'always',
          retry: 'auto',
          'refresh-expired': 'auto',
          callback(token) {
            if (!active) return;
            const message = turnstileMessage(token, request.nonce);
            if (!message || !window.ReactNativeWebView?.postMessage) { setStatus('app-only'); return; }
            setStatus('done');
            window.ReactNativeWebView.postMessage(message);
          },
          'error-callback': () => { if (active) setStatus('error'); return true; },
          'timeout-callback': () => { if (active) setStatus('error'); },
        });
      } catch {
        setStatus('error');
      }
    };
    const existing = document.getElementById(SCRIPT_ID);
    if (window.turnstile) render();
    else if (existing) existing.addEventListener('load', render, { once: true });
    else {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.addEventListener('load', render, { once: true });
      script.addEventListener('error', () => { if (active) setStatus('error'); }, { once: true });
      document.head.appendChild(script);
    }
    return () => {
      active = false;
      existing?.removeEventListener('load', render);
      if (widget.current !== null && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, [request]);

  return <main className="turnstile-page">
    <section className="turnstile-card" aria-live="polite">
      <div className="turnstile-brand"><span aria-hidden="true">S</span><strong>SüperTribün</strong></div>
      <h1>Güvenlik kontrolü</h1>
      <p>Hesabını botlardan korumak için bu kısa kontrolü tamamla.</p>
      {request && <div ref={host} className="turnstile-widget"/>}
      {status === 'invalid' && <p className="turnstile-error" role="alert">Bu doğrulama bağlantısı geçerli değil.</p>}
      {status === 'error' && <p className="turnstile-error" role="alert">Kontrol yüklenemedi. İnternetini kontrol edip yeniden dene.</p>}
      {status === 'app-only' && <p className="turnstile-error" role="alert">Bu kontrolü SüperTribün uygulamasından aç.</p>}
      {status === 'done' && <p className="turnstile-success">Tamamlandı. Uygulamaya dönülüyor…</p>}
    </section>
  </main>;
}

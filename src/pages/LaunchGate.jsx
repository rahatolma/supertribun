import { useEffect } from 'react';
import './LaunchGate.css';

export default function LaunchGate() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'SüperTribün · Hazırlanıyor';
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="launch-gate">
      <div className="launch-gate__glow" aria-hidden="true" />
      <section className="launch-gate__content" aria-labelledby="launch-title">
        <p className="launch-gate__eyebrow">ÇOK YAKINDA</p>
        <h1 id="launch-title">Tribündeki yerini hazırlıyoruz.</h1>
        <p className="launch-gate__copy">
          Maç tahminleri, taraftar rekabeti ve futbol sohbeti tek yerde buluşuyor.
        </p>
        <div className="launch-gate__pulse" role="status">
          <span aria-hidden="true" />
          Hazırlanıyor
        </div>
      </section>
      <footer className="launch-gate__footer">
        <span>© 2026 SüperTribün</span>
        <nav aria-label="Yasal bağlantılar">
          <a href="/gizlilik">Gizlilik</a>
          <a href="/cerez-politikasi">Çerezler</a>
          <a href="mailto:destek@supertribun.com">İletişim</a>
        </nav>
      </footer>
    </main>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { consentStore } from '../privacy/consent';
import './CookieConsent.css';

export default function CookieConsent({ consent, open, onOpen, onClose }) {
  const dialog = useRef(null);
  const [draft, setDraft] = useState(null);
  const preferences = draft ?? { analytics: consent?.analytics === true, performance: consent?.performance === true };
  const [error, setError] = useState('');
  const close = () => { setDraft(null); onClose(); };
  useEffect(() => {
    if (open) {
      if (!dialog.current.open) dialog.current.showModal();
    } else if (dialog.current.open) dialog.current.close();
  }, [open, consent]);
  const save = (value) => {
    if (!consentStore.save(value)) {
      setError('Tercihin tarayıcıya kaydedilemedi. Ölçüm kapalı tutuluyor. Site depolamasına izin verip yeniden deneyebilirsin.');
      return;
    }
    setError('');
    close();
  };
  const reject = () => save({ analytics: false, performance: false });
  const accept = () => save({ analytics: true, performance: true });
  const links = <><Link to="/cerez-politikasi" onClick={close}>Çerez Politikası</Link><span aria-hidden="true"> · </span><Link to="/gizlilik" onClick={close}>Web Sitesi Gizlilik ve Aydınlatma Metni</Link></>;
  return <>
    {!consent && !open && <section className="consent-banner" aria-label="Çerez ve ölçüm tercihleri">
      <div className="consent-banner-content">
        <div className="consent-copy">
          <h2>Tercih senin.</h2>
          <p>Site ölçüm izni vermeden de çalışır. Onay verirsen Vercel ile ziyaretleri, buton tıklamalarını ve site performansını ölçeriz. Bu araçlar çerez kullanmaz; tercihini tarayıcında 180 gün saklarız.</p>
          <p className="consent-links">{links}</p>
          {error && <p className="consent-error" role="alert">{error}</p>}
        </div>
        <div className="consent-actions">
          <button className="consent-button" onClick={reject}>Reddet</button>
          <button className="consent-button" onClick={onOpen}>Tercihler</button>
          <button className="consent-button" onClick={accept}>Tümünü kabul et</button>
        </div>
      </div>
    </section>}
    <dialog className="consent-dialog" ref={dialog} aria-labelledby="consent-title" aria-describedby="consent-description" onCancel={close} onClose={close}>
      <div className="consent-dialog-header">
        <h2 id="consent-title">Çerez ve ölçüm tercihleri</h2>
        <button className="consent-close" aria-label="Tercihleri kapat" onClick={close} autoFocus><X aria-hidden="true" size={24} /></button>
      </div>
      <div className="consent-dialog-body">
        <p id="consent-description">İsteğe bağlı ölçüm başlangıçta kapalıdır. Seçimini istediğin zaman sayfanın altındaki “Çerez tercihleri” bağlantısından değiştirebilirsin.</p>
        <div className="consent-category">
          <div className="consent-category-heading"><h3>Gerekli tercih kaydı</h3><span className="consent-required">Her zaman etkin</span></div>
          <p>Seçimini hatırlamak için <code>cookieConsent</code> adlı yerel depolama kaydını kullanırız. Reklam veya ziyaretçi takibi için kullanılmaz.</p>
        </div>
        <div className="consent-category">
          <label className="consent-category-heading" htmlFor="consent-analytics">
            <span className="consent-category-title">Ziyaret ve tıklama ölçümü</span>
            <input id="consent-analytics" type="checkbox" checked={preferences.analytics} onChange={(event) => setDraft({ ...preferences, analytics: event.target.checked })} aria-describedby="analytics-description" />
          </label>
          <p id="analytics-description">Vercel Web Analytics: sayfa, yönlendiren site, cihaz/tarayıcı, yaklaşık konum ve Keşfet, App Store, Google Play butonlarının tıklanma istatistikleri. İndirme sayısı değildir. Çerez kullanmaz; veriler yurt dışında işlenebilir.</p>
        </div>
        <div className="consent-category">
          <label className="consent-category-heading" htmlFor="consent-performance">
            <span className="consent-category-title">Performans ölçümü</span>
            <input id="consent-performance" type="checkbox" checked={preferences.performance} onChange={(event) => setDraft({ ...preferences, performance: event.target.checked })} aria-describedby="performance-description" />
          </label>
          <p id="performance-description">Vercel Speed Insights: yüklenme, görsel kararlılık ve etkileşim hızı; sayfa, cihaz/tarayıcı ve bağlantı bilgileri. Çerez kullanmaz; veriler yurt dışında işlenebilir.</p>
        </div>
        <p className="consent-note">Tercihin 180 gün geçerlidir. Açık ölçümü kapattığında, ölçüm araçlarını tamamen durdurmak için sayfa yenilenebilir. Yerel geliştirme ortamında ölçüm gönderilmez.</p>
        <p className="consent-links">{links}</p>
        {error && <p className="consent-error" role="alert">{error}</p>}
      </div>
      <div className="consent-dialog-footer consent-actions">
        <button className="consent-button" onClick={reject}>Tümünü reddet</button>
        <button className="consent-button" onClick={() => save(preferences)}>Seçimimi kaydet</button>
        <button className="consent-button" onClick={accept}>Tümünü kabul et</button>
      </div>
    </dialog>
  </>;
}

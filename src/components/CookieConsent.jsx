import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Accordion state
  const [expandedSection, setExpandedSection] = useState(null);

  // Toggle states
  const [preferences, setPreferences] = useState({
    functional: false,
    analytics: false,
    performance: false,
  });

  useEffect(() => {
    // Check if user already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      functional: true,
      analytics: true,
      performance: true
    }));
    setShowBanner(false);
    setShowModal(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      functional: false,
      analytics: false,
      performance: false
    }));
    setShowBanner(false);
    setShowModal(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      ...preferences
    }));
    setShowBanner(false);
    setShowModal(false);
  };

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {showBanner && !showModal && (
        <div className="cookie-banner">
          <div className="cookie-banner-content">
            <div className="cookie-banner-text">
              <h3>Gizliliğinize önem veriyoruz</h3>
              <p>
                Size daha iyi bir deneyim sunmak, trafiği analiz etmek ve kişiselleştirilmiş içerikler göstermek için çerezleri kullanıyoruz. "Tümünü Kabul Et" butonuna tıklayarak çerez kullanımımıza onay vermiş olursunuz. <a href="#">Çerez Politikası</a>
              </p>
            </div>
            <div className="cookie-banner-actions">
              <button className="btn btn-outline" onClick={() => setShowModal(true)}>Özelleştir</button>
              <button className="btn btn-primary" onClick={handleRejectAll}>Tümünü Reddet</button>
              <button className="btn btn-primary" onClick={handleAcceptAll}>Tümünü Kabul Et</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="cookie-modal-overlay">
          <div className="cookie-modal">
            <div className="cookie-modal-header">
              <h2>Çerez Tercihlerini Özelleştir</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="cookie-modal-body">
              <p className="modal-intro">
                Web sitemizde gezinmenizi kolaylaştırmak ve temel işlevleri sağlamak için çerezler kullanıyoruz. Her izin kategorisi altındaki çerezler hakkında detaylı bilgiyi aşağıda bulabilirsiniz.
                <br /><br />
                "Zorunlu" olarak kategorize edilen çerezler, sitenin temel işlevlerini sağlamak için tarayıcınızda saklanır. ... <a href="#">Daha fazla göster</a>
              </p>

              <div className="cookie-sections">
                {/* Necessary Section */}
                <div className="cookie-section">
                  <div className="cookie-section-header" onClick={() => toggleSection('necessary')}>
                    <div className="cookie-section-title">
                      {expandedSection === 'necessary' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      <h4>Zorunlu</h4>
                    </div>
                    <span className="always-active">Her Zaman Aktif</span>
                  </div>
                  {expandedSection === 'necessary' && (
                    <div className="cookie-section-content">
                      <p>Zorunlu çerezler, güvenli oturum açma veya izin tercihlerinizi ayarlama gibi temel işlevleri etkinleştirmek için gereklidir. Bu çerezler kişisel olarak tanımlanabilir hiçbir veri saklamaz.</p>
                    </div>
                  )}
                </div>

                {/* Functional Section */}
                <div className="cookie-section">
                  <div className="cookie-section-header" onClick={() => toggleSection('functional')}>
                    <div className="cookie-section-title">
                      {expandedSection === 'functional' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      <h4>İşlevsel</h4>
                    </div>
                    <label className="toggle-switch" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() => togglePreference('functional')}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  {expandedSection === 'functional' && (
                    <div className="cookie-section-content">
                      <p>İşlevsel çerezler, sosyal medya platformlarında içerik paylaşımı, geri bildirim toplama ve diğer üçüncü taraf özelliklerinin çalışmasına yardımcı olur.</p>
                    </div>
                  )}
                </div>

                {/* Analytics Section */}
                <div className="cookie-section">
                  <div className="cookie-section-header" onClick={() => toggleSection('analytics')}>
                    <div className="cookie-section-title">
                      {expandedSection === 'analytics' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      <h4>Analitik</h4>
                    </div>
                    <label className="toggle-switch" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => togglePreference('analytics')}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  {expandedSection === 'analytics' && (
                    <div className="cookie-section-content">
                      <p>Analitik çerezler, ziyaretçilerin web sitesiyle nasıl etkileşime girdiğini anlamak için kullanılır. Bu çerezler ziyaretçi sayısı, hemen çıkma oranı, trafik kaynağı gibi metrikler hakkında bilgi sağlar.</p>
                    </div>
                  )}
                </div>

                {/* Performance Section */}
                <div className="cookie-section">
                  <div className="cookie-section-header" onClick={() => toggleSection('performance')}>
                    <div className="cookie-section-title">
                      {expandedSection === 'performance' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      <h4>Performans</h4>
                    </div>
                    <label className="toggle-switch" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={preferences.performance}
                        onChange={() => togglePreference('performance')}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  {expandedSection === 'performance' && (
                    <div className="cookie-section-content">
                      <p>Performans çerezleri, ziyaretçilere daha iyi bir kullanıcı deneyimi sunmaya yardımcı olan temel performans metriklerini anlamak ve analiz etmek için kullanılır.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="cookie-modal-footer">
              <button className="btn btn-primary" onClick={handleRejectAll}>Tümünü Reddet</button>
              <button className="btn btn-primary flex-1" onClick={handleSavePreferences}>Tercihlerimi Kaydet</button>
              <button className="btn btn-primary" onClick={handleAcceptAll}>Tümünü Kabul Et</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;

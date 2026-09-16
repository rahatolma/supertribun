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
              <h3>We value your privacy</h3>
              <p>
                We use cookies to enhance your browsing experience, serve personalised ads or content, and analyse our traffic. By clicking "Accept All", you consent to our use of cookies. <a href="#">Cookie Policy</a>
              </p>
            </div>
            <div className="cookie-banner-actions">
              <button className="btn btn-outline" onClick={() => setShowModal(true)}>Customise</button>
              <button className="btn btn-primary" onClick={handleRejectAll}>Reject All</button>
              <button className="btn btn-primary" onClick={handleAcceptAll}>Accept All</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="cookie-modal-overlay">
          <div className="cookie-modal">
            <div className="cookie-modal-header">
              <h2>Customise Consent Preferences</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="cookie-modal-body">
              <p className="modal-intro">
                We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all cookies under each consent category below.
                <br /><br />
                The cookies that are categorised as "Necessary" are stored on your browser as they are essential for enabling the basic functionalities of the site. ... <a href="#">Show more</a>
              </p>

              <div className="cookie-sections">
                {/* Necessary Section */}
                <div className="cookie-section">
                  <div className="cookie-section-header" onClick={() => toggleSection('necessary')}>
                    <div className="cookie-section-title">
                      {expandedSection === 'necessary' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      <h4>Necessary</h4>
                    </div>
                    <span className="always-active">Always Active</span>
                  </div>
                  {expandedSection === 'necessary' && (
                    <div className="cookie-section-content">
                      <p>Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.</p>
                    </div>
                  )}
                </div>

                {/* Functional Section */}
                <div className="cookie-section">
                  <div className="cookie-section-header" onClick={() => toggleSection('functional')}>
                    <div className="cookie-section-title">
                      {expandedSection === 'functional' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      <h4>Functional</h4>
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
                      <p>Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.</p>
                    </div>
                  )}
                </div>

                {/* Analytics Section */}
                <div className="cookie-section">
                  <div className="cookie-section-header" onClick={() => toggleSection('analytics')}>
                    <div className="cookie-section-title">
                      {expandedSection === 'analytics' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      <h4>Analytics</h4>
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
                      <p>Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.</p>
                    </div>
                  )}
                </div>

                {/* Performance Section */}
                <div className="cookie-section">
                  <div className="cookie-section-header" onClick={() => toggleSection('performance')}>
                    <div className="cookie-section-title">
                      {expandedSection === 'performance' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      <h4>Performance</h4>
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
                      <p>Performance cookies are used to understand and analyse the key performance indexes of the website which helps in delivering a better user experience for the visitors.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="cookie-modal-footer">
              <button className="btn btn-primary" onClick={handleRejectAll}>Reject All</button>
              <button className="btn btn-primary flex-1" onClick={handleSavePreferences}>Save My Preferences</button>
              <button className="btn btn-primary" onClick={handleAcceptAll}>Accept All</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;

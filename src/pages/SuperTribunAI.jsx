import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CinematicStadiumBackground from '../components/CinematicStadiumBackground';
import { Link } from 'react-router-dom';
import { trackSiteEvent } from '../privacy/measurement';
import './Landing.css'; // Ana sayfanın (onizleme) genel stil ve tasarım dilini kopyalıyoruz

export default function SuperTribunAI({ onOpenPreferences }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'SüperTribün AI | Olasılık motoru';
    return () => { document.title = previousTitle; };
  }, []);
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/favicon.png" alt="Icon" style={{ height: '32px', borderRadius: '6px' }} />
          <span style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-0.04em' }}>
            <span className="text-accent">Süper</span><span style={{ color: 'white' }}>Tribün</span>
          </span>
          <span style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-0.04em', color: 'var(--color-accent)', marginLeft: '4px'}}>
             AI
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <CinematicStadiumBackground />

        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.p variants={fadeUpVariant} className="hero-subtitle">— OLASILIK MOTORU</motion.p>
            <motion.h1 variants={fadeUpVariant} className="hero-title">
              Tek sonuç söylemiyoruz.<br />
              <span className="text-accent" style={{ display: 'inline-block', marginTop: '16px' }}>Olasılık üretiyoruz.</span>
            </motion.h1>
            <motion.div variants={fadeUpVariant}>
              <button
                className="btn-glow"
                onClick={() => {
                  trackSiteEvent('ai_motor_click');
                  document.getElementById('motor')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
                }}
              >
                Motoru İncele <ArrowRight size={20} />
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="ai-mockup-wrapper"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ai-production-card" role="img" aria-label="SüperTribün AI doğrulanmış üretim modeli özeti">
              <div className="ai-production-head">
                <span>ÜRETİM MODELİ</span>
                <strong>DOĞRULANDI</strong>
              </div>
              <p className="ai-production-version">st-ai-poisson-glm-v1</p>
              <h2>Geçmiş maçtan<br />1-X-2 olasılığına.</h2>
              <div className="ai-production-metrics">
                <div><strong>40.934</strong><span>tamamlanmış maç</span></div>
                <div><strong>8</strong><span>turnuva</span></div>
                <div><strong>3.192</strong><span>kilitli test maçı</span></div>
              </div>
              <div className="ai-production-flow" aria-hidden="true">
                <span>VERİ</span><b>→</b><span>xG</span><b>→</b><span>SKOR MATRİSİ</span><b>→</b><span>1-X-2</span>
              </div>
              <p className="ai-production-note">Canlıya yalnızca test eşiğini geçen model çıkar.</p>
            </div>
          </motion.div>
        </div>

        <div className="marquee-container">
          <div className="animate-marquee">
            <span className="marquee-text">40.934 TAMAMLANMIŞ MAÇ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> 8 TURNUVA <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> ZAMAN AĞIRLIKLI ÖĞRENME <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> TAKIM + RAKİP ETKİSİ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> İÇ SAHA ETKİSİ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> DİNLENME GÜNÜ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> POISSON GOL MODELİ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SKOR MATRİSİ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> 1-X-2 OLASILIKLARI <span className="text-accent" style={{ margin: '0 32px' }}>✦</span></span>
            <span className="marquee-text">40.934 TAMAMLANMIŞ MAÇ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> 8 TURNUVA <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> ZAMAN AĞIRLIKLI ÖĞRENME <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> TAKIM + RAKİP ETKİSİ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> İÇ SAHA ETKİSİ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> DİNLENME GÜNÜ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> POISSON GOL MODELİ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SKOR MATRİSİ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> 1-X-2 OLASILIKLARI <span className="text-accent" style={{ margin: '0 32px' }}>✦</span></span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="motor">
        <motion.div
          className="features-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <p className="section-subtitle">GEÇMİŞ VERİ → BEKLENEN GOL → SKOR MATRİSİ → OLASILIK</p>
          <h2 className="section-title">Maçın üç ihtimali<br />tek modelde buluşur.</h2>
        </motion.div>

        <div className="bento-grid ai-model-grid">
          {/* Card 1 */}
          <motion.div
            className="bento-card ai-model-card card-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="card-tag">01 / GERÇEK VERİ</div>
            <h3 className="card-title">40.934 maçtan<br/>öğrenir.</h3>
            <p className="card-desc">Sekiz turnuvadaki tamamlanmış maçlar zaman sırasıyla işlenir. Sentetik oranlar eğitime katılmaz; yeni maçlar daha yüksek ağırlık taşır.</p>
            <div className="card-visual-circles">
              <div className="circle-1"></div>
              <div className="circle-2">
                <div className="dot"></div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="bento-card ai-model-card card-dark"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="card-tag text-accent">02 / ÖĞRENEN MODEL</div>
            <h3 className="card-title text-white">İki takım için<br />beklenen gol üretir.</h3>
            <p className="card-desc text-muted">Poisson GLM; takımı, rakibi, ligi, iç saha etkisini ve maçlar arası dinlenme süresini birlikte değerlendirir.</p>
            <div className="card-visual-chat" style={{ justifyContent: 'center' }}>
              {/* Olasılık barı gibi bir tasarım (chat balonu stilini bozmadan) */}
              <div className="chat-bubble" style={{ width: '100%', background: 'linear-gradient(90deg, var(--color-accent) 45%, #222 45%)' }}></div>
              <div className="chat-bubble" style={{ width: '100%', background: 'linear-gradient(90deg, var(--color-accent) 65%, #222 65%)' }}></div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="bento-card ai-model-card card-yellow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-tag">03 / DOĞRULANMIŞ 1-X-2</div>
            <h3 className="card-title">Skor matrisinden<br />üç olasılık.</h3>
            <p className="card-desc" style={{ color: '#665326' }}>Beklenen goller skor dağılımına dönüşür. Yalnızca test eşiğini geçen sürümün ev sahibi, beraberlik ve deplasman yüzdeleri uygulamaya gelir.</p>
            <div className="card-visual-bars">
              <div className="bar bar-1"></div>
              <div className="bar bar-2"></div>
              <div className="bar bar-3"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{ padding: '120px 10%' }}>
        <motion.div
          className="cta-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
        >
          <h1 className="cta-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}>
            Üç sezon ileri yürüyen test.<br/>
            <span className="text-accent">3.192 maçlık</span> kilitli kontrol.
          </h1>
          <p className="cta-desc" style={{ fontSize: '24px', fontWeight: '500', marginTop: '24px' }}>
            Basit lig ortalamasına karşı daha düşük hata veren model uygulamaya alındı.
          </p>

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
            <Link to="/onizleme" onClick={() => trackSiteEvent('ai_back_click')}>
              <button className="btn-glow">
                SüperTribün'e Dön <ArrowRight size={20} />
              </button>
            </Link>
          </div>
          
          <p style={{ marginTop: '60px', fontSize: '0.85rem', color: '#666', maxWidth: '600px', margin: '60px auto 0', lineHeight: 1.5 }}>
            Model çıktıları istatistiksel olasılıktır; kesin maç sonucu veya bahis kazancı vaadi değildir.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-content">
          <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/favicon.png" alt="Icon" style={{ height: '32px', borderRadius: '6px' }} />
            <span style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-0.04em' }}>
              <span className="text-accent">Süper</span><span style={{ color: 'white' }}>Tribün</span>
            </span>
            <span style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-0.04em', color: 'var(--color-accent)', marginLeft: '4px'}}>
               AI
            </span>
          </div>

          <div className="footer-links">
            <a href="mailto:destek@supertribun.com" className="text-muted">destek@supertribun.com</a>
          </div>

        </div>
        <nav className="footer-legal" aria-label="Gizlilik ve site tercihleri">
          <Link to="/uyelik-kosullari">Üyelik Koşulları</Link>
          <Link to="/gizlilik">Gizlilik ve KVKK</Link>
          <Link to="/topluluk-kurallari">Topluluk Kuralları</Link>
          <Link to="/puanlama-ve-oyun-kurallari">Puan ve Oyun Kuralları</Link>
          <Link to="/cerez-politikasi">Çerez Politikası</Link>
          <Link to="/hesap-silme">Hesap Silme</Link>
          <button onClick={onOpenPreferences}>Çerez tercihleri</button>
        </nav>
        <button className="btn-scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Yukarı çık ↑
        </button>
      </footer>
    </div>
  );
}

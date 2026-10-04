import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Apple, Play, Share2, Swords, UserPlus } from 'lucide-react';
import CinematicStadiumBackground from '../components/CinematicStadiumBackground';
import { Link } from 'react-router-dom';
import { trackSiteEvent } from '../privacy/measurement';
import './Landing.css';

export default function Landing({ onOpenPreferences }) {
  const [storeNotice, setStoreNotice] = useState('');
  const showStoreNotice = (platform) => {
    trackSiteEvent(platform === 'ios' ? 'app_store_click' : 'play_store_click');
    setStoreNotice(`${platform === 'ios' ? 'App Store' : 'Google Play'} bağlantımız yakında burada. Şu anda indirme başlatılmadı.`);
  };
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
            <motion.p variants={fadeUpVariant} className="hero-subtitle">— MAÇTAN ÖNCE</motion.p>
            <motion.h1 variants={fadeUpVariant} className="hero-title">
              Sözünü söyle.<br />
              <span className="text-accent" style={{ display: 'inline-block', marginTop: '16px' }}>Tribünde yerini al.</span>
            </motion.h1>
            <motion.div variants={fadeUpVariant} className="hero-actions">
              <button
                className="btn-glow"
                onClick={() => {
                  trackSiteEvent('discover_click');
                  document.getElementById('magaza')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
                }}
              >
                SüperTribün'ü keşfet <ArrowRight size={20} />
              </button>
              <Link to="/ai" onClick={() => trackSiteEvent('ai_page_click')}>
                <button className="btn-glow btn-white">
                  SüperTribün AI <ArrowRight size={20} />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-mockup-group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/phone-2.png" alt="SüperTribün Kariyer" className="phone-mockup-img phone-left" />
            <img src="/phone-3.png" alt="SüperTribün Arena" className="phone-mockup-img phone-center" />
            <img src="/phone-1.png" alt="SüperTribün Sıralama" className="phone-mockup-img phone-right" />
          </motion.div>
        </div>

        <div className="marquee-container">
          <div className="animate-marquee">
            <span className="marquee-text">MAÇTAN ÖNCE <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> İÇGÜDÜNE GÜVEN <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SÖZÜNÜ SÖYLE <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> ODANDA YARIŞ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SKORU KİLİTLE <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> MAÇIN MUHABBETİNİ YAP <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> HEYECANA ORTAK OL <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> TOPLULUĞU GÖR <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> TRİBÜNÜN SESİ OL <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> </span>
            <span className="marquee-text">MAÇTAN ÖNCE <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> İÇGÜDÜNE GÜVEN <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SÖZÜNÜ SÖYLE <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> ODANDA YARIŞ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SKORU KİLİTLE <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> MAÇIN MUHABBETİNİ YAP <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> HEYECANA ORTAK OL <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> TOPLULUĞU GÖR <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> TRİBÜNÜN SESİ OL <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <motion.div
          className="features-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <p className="section-subtitle">SENİN TRİBÜNÜN</p>
          <h2 className="section-title">Her maçın<br />bir hikâyesi var.</h2>
        </motion.div>

        <div className="bento-grid">
          {/* Card 1: Arena */}
          <motion.div
            className="bento-card card-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="card-tag">01 / ARENA</div>
            <h3 className="card-title">Maçını keşfet.</h3>
            <p className="card-desc">Yaklaşan derbilerden seçtiğin liglere uzanan maç kartlarını kaydır. Skorunu oluştur, kilitle ve sözünün arkasında dur.</p>
            <div className="card-visual-circles">
              <div className="circle-1"></div>
              <div className="circle-2">
                <div className="dot"></div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Akış */}
          <motion.div
            className="bento-card card-dark"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="card-tag text-accent">02 / AKIŞ</div>
            <h3 className="card-title text-white">Maçın<br />muhabbetini<br />yap.</h3>
            <p className="card-desc text-muted">Fikrini paylaş, yorumlara katıl ve odalarda kendi tribününü kur. Maçın sesi skorla bitmez.</p>
            <div className="card-visual-chat">
              <div className="chat-bubble"></div>
              <div className="chat-bubble right"></div>
            </div>
          </motion.div>

          {/* Card 3: Sıralama */}
          <motion.div
            className="bento-card card-yellow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-tag">03 / SIRALAMA</div>
            <h3 className="card-title">Sözün kayda<br />geçsin.</h3>
            <p className="card-desc">Sonucu ve tam skoru bildiğin maçları gör. Kullanıcıları, odaları; topluluk, veri modeli, oranlar ve SüperTribün AI ile karşılaştır.</p>
            <div className="card-visual-bars">
              <div className="bar bar-1"></div>
              <div className="bar bar-2"></div>
              <div className="bar bar-3"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social competition showcase */}
      <section className="social-showcase">
        <motion.div className="social-showcase-head" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant}>
          <p className="section-subtitle">MAÇTAN ÖNCE BAŞLAR</p>
          <h2>Arkadaşına meydan oku.<br /><span>Sonra sözünü paylaş.</span></h2>
          <p>Düello ve Story, SüperTribün’de verdiğin kararın maç başlamadan önce kayda geçmesini ve tribünün dışına taşmasını sağlar.</p>
        </motion.div>

        <div className="social-showcase-grid">
          <motion.article className="showcase-panel duel-panel" initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7 }}>
            <div className="showcase-copy">
              <span className="showcase-kicker"><Swords size={17} /> DÜELLO</span>
              <h3>Bir maç da olur.<br />Beş maç da.</h3>
              <p>Maçlarını sepete ekle, rakibini seç ve meydan okumayı gönder. Arkadaşın henüz SüperTribün’de değilse süreli bağlantıyı WhatsApp veya SMS ile paylaş.</p>
              <div className="showcase-feature"><UserPlus size={18} /><span>Rehber ve e-posta toplamadan davet</span></div>
            </div>
            <button className="showcase-action" type="button" onClick={() => document.getElementById('magaza')?.scrollIntoView({ behavior: 'smooth' })}>
              Meydan okumayı gönder <ArrowRight size={18} />
            </button>
          </motion.article>

          <motion.article className="showcase-panel story-panel" initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7, delay: .08 }}>
            <div className="showcase-copy">
              <span className="showcase-kicker"><Share2 size={17} /> STORY</span>
              <h3>Tahminin maçtan<br />önce konuşsun.</h3>
              <p>Kilitli tahminini 9:16 Story kartına dönüştür. Sonradan değiştirilmemiş sözünü tek dokunuşla paylaş.</p>
              <div className="showcase-feature"><Share2 size={18} /><span>Instagram Story ölçüsünde paylaşım</span></div>
            </div>
            <button className="showcase-action" type="button" onClick={() => document.getElementById('magaza')?.scrollIntoView({ behavior: 'smooth' })}>
              <Share2 size={20} /> Story’de paylaş
            </button>
          </motion.article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="magaza">
        <motion.div
          className="cta-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
        >
          <h1 className="cta-title">
            İlk sözü <span className="text-accent">sen</span> söyle.
          </h1>
          <p className="cta-desc">
            SüperTribün'de maç başlamadan<br />
            tribünde yerini al.<br />
            Tahminini kilitle, topluluğun nabzını tut.
          </p>

          <div className="store-buttons">
            <button
              className="btn-store"
              onClick={() => showStoreNotice('ios')}
            >
              <Apple size={20} aria-hidden="true" /> App Store <span className="store-soon">Yakında</span>
            </button>
            <button
              className="btn-store"
              onClick={() => showStoreNotice('android')}
            >
              <Play size={20} aria-hidden="true" /> Google Play <span className="store-soon">Yakında</span>
            </button>
          </div>
          <p className="store-notice" role="status">{storeNotice}</p>
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

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CinematicStadiumBackground from '../components/CinematicStadiumBackground';
import { Link } from 'react-router-dom';
import { trackSiteEvent } from '../privacy/measurement';
import './Landing.css'; // Ana sayfanın (onizleme) genel stil ve tasarım dilini kopyalıyoruz

export default function SuperTribunAI({ onOpenPreferences }) {
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
            <motion.p variants={fadeUpVariant} className="hero-subtitle">— MODEL</motion.p>
            <motion.h1 variants={fadeUpVariant} className="hero-title">
              Tahmin etmiyoruz.<br />
              <span className="text-accent" style={{ display: 'inline-block', marginTop: '16px' }}>Fiyatlıyoruz.</span>
            </motion.h1>
            <motion.p variants={fadeUpVariant} style={{ fontSize: '15px', color: '#a0a0a0', lineHeight: 1.6, marginBottom: '48px', maxWidth: '800px' }}>
              Herkes sonucu bilir iddiasında. Biz çok farklı bir soruya cevap veriyoruz:<br/>
              <strong style={{ color: 'white', fontWeight: 600 }}>"Piyasanın fiyatladığı olasılık ile gerçek olasılık arasında ne kadar fark var?"</strong>
            </motion.p>
            <motion.div variants={fadeUpVariant}>
              <button
                className="btn-glow"
                onClick={() => {
                  trackSiteEvent('discover_click');
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
            <motion.img 
              src="/ai-panel.png" 
              alt="SuperTribun AI Panel" 
              className="ai-mockup-img"
              whileHover={{ 
                y: -150, 
                boxShadow: '0 50px 100px rgba(0, 0, 0, 1)' 
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </motion.div>
        </div>

        <div className="marquee-container">
          <div className="animate-marquee">
            <span className="marquee-text">3.000+ MAÇLIK HAFIZA <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> KALİBRE OLASILIK <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SIFIR TAVİZ DİSİPLİNİ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> DEĞERLİ ORAN SİNYALİ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SAF FİYAT FARKI <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> MATEMATİKTEN ÖĞRENİR <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SİHİRLİ SAYILARA İNANMAZ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> GERİYE DÖNÜK TEST <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> DİSİPLİNİN ÖDÜLÜ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span></span>
            <span className="marquee-text">3.000+ MAÇLIK HAFIZA <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> KALİBRE OLASILIK <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SIFIR TAVİZ DİSİPLİNİ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> DEĞERLİ ORAN SİNYALİ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SAF FİYAT FARKI <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> MATEMATİKTEN ÖĞRENİR <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SİHİRLİ SAYILARA İNANMAZ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> GERİYE DÖNÜK TEST <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> DİSİPLİNİN ÖDÜLÜ <span className="text-accent" style={{ margin: '0 32px' }}>✦</span></span>
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
          <p className="section-subtitle">ÖĞRENİYORUM → KANITLIYORUM → KURAL KOYUYORUM</p>
          <h2 className="section-title">Futbolun fiyatı<br />burada belirlenir.</h2>
        </motion.div>

        <div className="bento-grid">
          {/* Card 1 */}
          <motion.div
            className="bento-card card-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="card-tag">01 / HAFIZA</div>
            <h3 className="card-title">3.000+ Maçlık<br/>Hafıza</h3>
            <p className="card-desc">SuperTribun AI, geçmiş veriyle kendi kendini eğitir, takım güçlerini ve zamanın etkisini matematikten öğrenir. Elle yazılmış katsayılara, sihirli sayılara inanmaz.</p>
            <div className="card-visual-circles">
              <div className="circle-1"></div>
              <div className="circle-2">
                <div className="dot"></div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="bento-card card-dark"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="card-tag text-accent">02 / KALİBRASYON</div>
            <h3 className="card-title text-white">Kalibre<br />Olasılık</h3>
            <p className="card-desc text-muted">Gösterdiği her yüzde, geriye dönük testlerde kanıtlanmış kalibrasyondur. Veri neyi reddediyorsa, o da onu reddeder.</p>
            <div className="card-visual-chat" style={{ justifyContent: 'center' }}>
              {/* Olasılık barı gibi bir tasarım (chat balonu stilini bozmadan) */}
              <div className="chat-bubble" style={{ width: '100%', background: 'linear-gradient(90deg, var(--color-accent) 45%, #222 45%)' }}></div>
              <div className="chat-bubble" style={{ width: '100%', background: 'linear-gradient(90deg, var(--color-accent) 65%, #222 65%)' }}></div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="bento-card card-yellow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-tag">03 / DİSİPLİN</div>
            <h3 className="card-title">Sıfır Taviz<br />Disiplini</h3>
            <p className="card-desc" style={{ color: '#665326' }}>Yaktığı her <strong>"Değerli Oran"</strong> sinyali, piyasa ile model arasındaki saf fiyat farkıdır. Demediği her tahmin, "bunun değeri yok" diyebilme gücüdür.</p>
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
            "Rakipler sis bombası atar.<br/>
            Biz <span className="text-accent">kalibrasyon eğrisini</span> gösteririz."
          </h1>
          <p className="cta-desc" style={{ fontSize: '24px', fontWeight: '500', marginTop: '24px' }}>
            Tahmin herkesin işi. Değer, bizim işimiz.
          </p>

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
            <Link to="/onizleme">
              <button className="btn-glow">
                SüperTribün'e Dön <ArrowRight size={20} />
              </button>
            </Link>
          </div>
          
          <p style={{ marginTop: '60px', fontSize: '0.85rem', color: '#666', maxWidth: '600px', margin: '60px auto 0', lineHeight: 1.5 }}>
            "Modelimiz geçmiş veriyle kalibre edilir; hiçbir olasılık garanti değildir.<br/>Değer, disiplinin ödülüdür."
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

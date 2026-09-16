import { motion } from 'framer-motion';
import { ArrowRight, Apple, Play } from 'lucide-react';
import CinematicStadiumBackground from '../components/CinematicStadiumBackground';
import { track } from '@vercel/analytics';
import './Landing.css';

export default function Landing() {
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
              Sözünü söyle.<br/>
              <span className="text-accent" style={{ display: 'inline-block', marginTop: '16px' }}>Tribünde yerini al.</span>
            </motion.h1>
            <motion.div variants={fadeUpVariant}>
              <button 
                className="btn-glow"
                onClick={() => document.querySelector('.footer-section').scrollIntoView({ behavior: 'smooth' })}
              >
                SüperTribün'ü keşfet <ArrowRight size={20} />
              </button>
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
            <span className="marquee-text">MAÇIN MUHABBETİNİ YAP <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> KİM DAHA İYİ BİLİYOR BAK <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> MAÇTAN ÖNCE <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SÖZÜNÜ SÖYLE <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SKORU KİLİTLE <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> TOPLULUĞU GÖR <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> </span>
            <span className="marquee-text">MAÇIN MUHABBETİNİ YAP <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> KİM DAHA İYİ BİLİYOR BAK <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> MAÇTAN ÖNCE <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SÖZÜNÜ SÖYLE <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> SKORU KİLİTLE <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> TOPLULUĞU GÖR <span className="text-accent" style={{ margin: '0 32px' }}>✦</span> </span>
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
          <h2 className="section-title">Her maçın<br/>bir hikâyesi var.</h2>
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
            <h3 className="card-title">Skorunu söyle.</h3>
            <p className="card-desc">İki dokunuşla tahminini oluştur. Kilitle ve maç başlayınca sözünün arkasında dur.</p>
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
            <h3 className="card-title text-white">Maçın<br/>muhabbetini<br/>yap.</h3>
            <p className="card-desc text-muted">Takımını ara, fikrini paylaş, maçın içinde kal. Tribün sesi skorla bitmez.</p>
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
            <h3 className="card-title">Kim daha iyi<br/>biliyor bak.</h3>
            <p className="card-desc">Kullanıcıları, odaları ve kaynakları karşılaştır. Rekabet doğru yerde güzel.</p>
            <div className="card-visual-bars">
              <div className="bar bar-1"></div>
              <div className="bar bar-2"></div>
              <div className="bar bar-3"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
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
            SüperTribün'de maç başlamadan<br/>
            tribünde yerini al.<br/>
            Tahminini kilitle, topluluğun nabzını tut.
          </p>
          
          <div className="store-buttons">
              <button 
                className="btn-store flex-1"
                onClick={() => track('app_store_click', { platform: 'ios', location: 'hero' })}
              >
                <Apple size={20} /> App Store
              </button>
              <button 
                className="btn-store flex-1"
                onClick={() => track('play_store_click', { platform: 'android', location: 'hero' })}
              >
                <Play size={20} /> Google Play
              </button>
          </div>
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
          
          <button className="btn-scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Yukarı çık ↑
          </button>
        </div>
      </footer>
    </div>
  );
}

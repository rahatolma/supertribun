import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const Privacy = () => <>
  <section><h2>1. Kapsam ve iletişim</h2>
    <p>Bu metin SüperTribün tanıtım web sitesinin ziyaretçileri içindir. Veri sorumlusu Güngör Çepni’dir. Gizlilik, destek ve kişisel veri talepleri için <a href="mailto:destek@supertribun.com">destek@supertribun.com</a> adresinden iletişim kurabilirsin.</p>
    <p>Mobil uygulamadaki hesap, profil, tahmin ve topluluk işlemleri bu sitenin ölçümünden ayrıdır; uygulamanın kendi aydınlatma ve kullanım metinlerine tabidir. Bu tanıtım sayfasında üyelik formu veya ödeme işlemi bulunmaz.</p>
  </section>
  <section><h2>2. Hangi bilgiler, hangi amaçlarla işlenir?</h2>
    <ul>
      <li><strong>Site sunumu ve güvenlik:</strong> Sayfayı sunan altyapı, isteğin iletilmesi ve güvenliğin sağlanması için IP adresi, istek zamanı, adres ve tarayıcı bilgileri gibi teknik verileri işleyebilir. Bunlar isteğe bağlı ziyaret ölçümünden ayrıdır.</li>
      <li><strong>Tercih kaydı:</strong> Analitik ve performans seçimlerin, metin sürümü ve kayıt/sona erme zamanı tarayıcındaki yerel depolamada saklanır. Ayrı bir hesapla ilişkilendirilmez.</li>
      <li><strong>İzinli ziyaret ölçümü:</strong> Vercel Web Analytics ile sayfalar, yönlendiren site, cihaz/tarayıcı, yaklaşık konum ve üç tanıtım butonunun tıklanmaları değerlendirilir. Buton tıklaması uygulamanın indirildiği anlamına gelmez.</li>
      <li><strong>İzinli performans ölçümü:</strong> Vercel Speed Insights ile sayfanın yüklenme, etkileşim ve görsel kararlılık ölçümleri ile teknik cihaz/bağlantı bilgileri değerlendirilir.</li>
      <li><strong>Destek yazışmaları:</strong> E-posta gönderirsen adresin, mesajın, gönüllü paylaştığın ekler ve yazışma bilgileri talebini cevaplamak için işlenir. Lütfen gerekli olmayan kimlik, parola veya hassas bilgi gönderme.</li>
    </ul>
    <p>İsteğe bağlı ölçüm ancak ilgili tercihi açtığında başlatılır. Ret, site içeriğine erişimini engellemez. Tercihleri açman veya bu metni okuman tek başına onay değildir.</p>
  </section>
  <section><h2>3. Hizmet sağlayıcıları ve aktarımlar</h2>
    <p>Web sitesi Vercel altyapısında barındırılır; izinli ölçümler de Vercel servislerine gönderilir. Destek e-posta kutusu Alastyr üzerinden işletilir. Alan adında Cloudflare hizmetleri kullanılır; trafiğin Cloudflare üzerinden geçmesi ilgili alan adının DNS/proxy ayarına bağlıdır.</p>
    <p>Bu sağlayıcıların kullanılması nedeniyle veriler yurt dışında işlenebilir. Verilerin tamamının Türkiye’de tutulduğu taahhüt edilmez. Sağlayıcı sözleşmeleri, veri bölgeleri ve uygulanacak KVKK yurt dışı aktarım şartları yayın öncesinde ayrıca kesinleştirilecektir. Ölçüm izni tek başına bu aktarım değerlendirmesinin yerine geçmez.</p>
    <p>Yazı tipleri ve görseller site dosyalarından sunulur; yazı tipi yüklemek için Google Fonts’a istek gönderilmez. Mağaza bağlantıları ileride açıldığında mağazaların kendi gizlilik koşulları geçerli olacaktır.</p>
  </section>
  <section><h2>4. Saklama ve silme</h2>
    <p>Tarayıcıdaki tercih kaydı 180 gün geçerlidir; süresi bitince ölçüm kapatılır ve yeniden seçim istenir. Site verilerini tarayıcıdan silerek kaydı kaldırabilirsin. Depolama tarayıcı tarafından temizlenmezse süresi bitmiş kayıt yeniden ziyaret/seçime kadar fiziksel olarak kalabilir; bu kayıt geçerli izin kabul edilmez.</p>
    <p>Vercel’in ziyaret ayırımı için kullandığı kısa ömürlü tanımlayıcının süresi, raporların saklama süresiyle aynı değildir. Sunucu günlükleri, toplulaştırılmış raporlar, destek e-postaları ve yedekler için sağlayıcıya özgü süreler henüz doğrulanmadığından bu taslakta kesin süre taahhüt edilmez.</p>
  </section>
  <section><h2>5. Tercihler ve başvuru</h2>
    <p>İsteğe bağlı ölçüm seçimini “Çerez tercihleri” bölümünden değiştirebilir veya geri alabilirsin. Geri alma, sonrasındaki ölçümü durdurur; daha önce hukuka uygun yapılan işlemleri geriye dönük olarak kaldırmaz. Toplulaştırılmış bir rapordaki kaydın tek bir ziyaretçiye bağlanması her zaman mümkün olmayabilir.</p>
    <p>KVKK kapsamındaki hakların çerçevesinde verilerinin işlenip işlenmediğini, işleme amacını ve aktarılan tarafları öğrenme; düzeltme, şartları oluştuğunda silme/yok etme ve diğer ilgili kişi haklarına yönelik taleplerini iletebilirsin. Başvurunun niteliğine göre kimlik doğrulaması ve mevzuatta öngörülen başvuru yöntemi gerekebilir. Destek e-postası ilk iletişim kanalıdır; her e-posta otomatik olarak geçerli resmi başvuru sayılmaz.</p>
  </section>
  <section><h2>6. Yayın öncesi tamamlanacak bilgiler</h2>
    <p>Bildirim/başvuru adresi, her veri işleme faaliyetine özgü hukuki sebep, destek ve altyapı saklama süreleri ile yurt dışı aktarım düzeni kesinleştirilip bu metne eklenecektir. Bu sürüm nihai hukuki metin veya uygunluk garantisi değildir.</p>
  </section>
</>;

const Cookies = () => <>
  <section><h2>1. Sadece çerezlerden ibaret değil</h2>
    <p>Bu sayfa SüperTribün tanıtım sitesindeki yerel depolamayı ve isteğe bağlı ölçüm araçlarını açıklar. Vercel Web Analytics ve Speed Insights çerez kullanmadan çalışır; buna rağmen bu sitede ayrı tercihlere bağlanmıştır. “Çerezsiz” olmak, hiçbir verinin işlenmediği anlamına gelmez.</p>
  </section>
  <section><h2>2. Siteye eklediğimiz araçlar</h2>
    <div className="legal-inventory">
      <article><h3>Gerekli tercih kaydı</h3><dl><dt>Ad / teknoloji</dt><dd><code>cookieConsent</code> / localStorage</dd><dt>İçerik</dt><dd>Seçimler, metin sürümü, kayıt ve sona erme zamanı.</dd><dt>Amaç / süre</dt><dd>Seçimini hatırlamak; 180 gün geçerli. Reklam veya ziyaretçi kimliği değildir.</dd><dt>Kontrol</dt><dd>Tercihleri değiştirebilir veya tarayıcıdan site verilerini silebilirsin.</dd></dl></article>
      <article><h3>Hata halinde güvenli kapatma</h3><dl><dt>Ad / teknoloji</dt><dd><code>supertribun.measurementBlocked</code> / sessionStorage</dd><dt>Amaç / süre</dt><dd>Tercih kaydedilemezse eski iznin yeniden ölçüm başlatmasını engeller. Başarılı kayıtla kaldırılır; en fazla ilgili tarayıcı oturumu boyunca tutulur.</dd></dl></article>
      <article><h3>Ziyaret ve tıklama ölçümü</h3><dl><dt>Sağlayıcı</dt><dd>Vercel Web Analytics</dd><dt>Başlangıç</dt><dd>Kapalı. Yalnızca analitik izniyle açılır.</dd><dt>Amaç</dt><dd>Site kullanımı ve Keşfet, App Store, Google Play butonlarına ilgiyi ölçmek. “Yakında” butonuna basılması da tıklamadır; indirme değildir.</dd><dt>Teknoloji / süre</dt><dd>Çerezsiz ölçüm. Sağlayıcı raporlarının saklama süresi yayın kontrolünde ayrıca doğrulanacaktır; 180 günlük tercih süresi bu raporlara uygulanmaz.</dd></dl></article>
      <article><h3>Performans ölçümü</h3><dl><dt>Sağlayıcı</dt><dd>Vercel Speed Insights</dd><dt>Başlangıç</dt><dd>Kapalı. Yalnızca performans izniyle açılır.</dd><dt>Amaç</dt><dd>Sayfa hızını ve etkileşim kalitesini değerlendirmek.</dd><dt>Teknoloji / süre</dt><dd>Çerezsiz teknik ölçüm. Rapor saklama süresi sağlayıcı/plan üzerinden ayrıca doğrulanacaktır.</dd></dl></article>
    </div>
    <p>Bu envanter site koduna eklediğimiz araçları kapsar. Barındırma ve güvenlik sağlayıcılarının kendi teknik kayıtları ayrıca değerlendirilir; canlı alan adının ağ/çerez kontrolü tamamlanmadan “başka hiçbir kayıt yoktur” denilemez.</p>
  </section>
  <section><h2>3. Nasıl seçim yapabilirsin?</h2>
    <p>“Reddet” iki isteğe bağlı kategoriyi de kapatır. “Tümünü kabul et” ikisini açar. “Tercihler” içinden ayrı ayrı seçebilirsin. Seçim yapmadan siteyi kullanmak kabul sayılmaz; önceden yapılan tıklamalar sonradan izne eklenerek gönderilmez.</p>
    <p>Sayfanın altındaki “Çerez tercihleri” ile seçimini değiştirebilirsin. Açık ölçümü kapattığında sayfa, yüklenmiş ölçüm araçlarını da durdurmak için yenilenebilir. Tarayıcı kaydı engellerse ölçüm kapalı kalır ve bir uyarı gösterilir.</p>
    <p>İzin 180 gün sonunda veya bu tercih metninin sürümü değiştiğinde yeniden sorulur. Eski, bozuk veya sürümsüz kayıtlar izin kabul edilmez. Yerel geliştirmede ölçüm gönderilmez; bu bir canlı rapor testi değildir.</p>
  </section>
  <section><h2>4. Daha fazla bilgi</h2>
    <p>İletişim, sağlayıcılar, başvuru ve tamamlanacak hukuki bilgiler için <Link to="/gizlilik">Web Sitesi Gizlilik ve Aydınlatma Metni</Link>ni inceleyebilirsin.</p>
    <p>Sağlayıcı açıklamaları: <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noreferrer">Vercel Web Analytics</a> ve <a href="https://vercel.com/docs/speed-insights/privacy-policy" target="_blank" rel="noreferrer">Vercel Speed Insights</a>.</p>
  </section>
</>;

export default function LegalPage({ kind, onOpenPreferences }) {
  const title = kind === 'privacy' ? 'Web Sitesi Gizlilik ve Aydınlatma Metni' : kind === 'cookies' ? 'Çerez ve Ölçüm Politikası' : 'Sayfa bulunamadı';
  useEffect(() => {
    const original = document.title;
    document.title = `${title} | SüperTribün`;
    return () => { document.title = original; };
  }, [title]);
  return <main className="legal-page">
    <header><Link className="legal-home" to="/">← SüperTribün’e dön</Link><p className="legal-eyebrow">SÜPERTRİBÜN · WEB SİTESİ</p><h1>{title}</h1></header>
    {kind !== 'missing' && <>
      <p className="legal-version">20 Eylül 2026 · Sürüm 2026-09-20 · Yayın öncesi çalışma metni</p>
      <aside className="legal-draft"><strong>İnceleme sürümü.</strong> Teknik uygulama açıklanmıştır; resmi başvuru adresi, sağlayıcı saklama/aktarım şartları ve hukuki değerlendirme tamamlanmadan nihai yayın metni olarak kabul edilmemelidir.</aside>
      {kind === 'privacy' ? <Privacy /> : <Cookies />}
    </>}
    <footer className="legal-footer">
      <Link to="/gizlilik">Gizlilik ve Aydınlatma</Link>
      <Link to="/cerez-politikasi">Çerez Politikası</Link>
      <button onClick={onOpenPreferences}>Çerez tercihleri</button>
      <a href="mailto:destek@supertribun.com">destek@supertribun.com</a>
    </footer>
  </main>;
}

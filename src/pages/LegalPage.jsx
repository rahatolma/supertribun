import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const SUPPORT = <a href="mailto:destek@supertribun.com">destek@supertribun.com</a>;

const Privacy = () => <>
  <section><h2>1. Veri sorumlusu ve kapsam</h2>
    <p>SüperTribün, bireysel geliştirici Güngör Çepni tarafından sunulur. İletişim, bildirim ve KVKK başvuru kanalı {SUPPORT} adresidir.</p>
    <p>Bu metin mobil uygulamadaki üyelik, profil, maç tahmini, kariyer ve sıralama, Akış, takip, engelleme, şikâyet, özel oda ve destek işlemleri ile supertribun.com web sitesini kapsar. SüperTribün yalnız 15 yaşını doldurmuş kişilere açıktır; 15 yaş altındaki kişiler hesap oluşturamaz.</p>
    <p>Bu bir açık rıza metni değildir. Üyelik Koşulları’nı kabul etmek bütün veri işleme faaliyetlerine, pazarlamaya veya gelecekteki yeni amaçlara toplu açık rıza vermek anlamına gelmez.</p>
  </section>
  <section><h2>2. İşlenen veriler ve amaçlar</h2>
    <ul>
      <li><strong>Hesap ve güvenlik:</strong> E-posta, hesap kimliği, doğrulama ve oturum bilgileri; giriş, şifre yenileme ve hesap güvenliği için işlenir. İsteğe bağlı telefon numarası ve doğrulama durumu hesaba bağlanabilir.</li>
      <li><strong>Profil ve oyun:</strong> Görünen ad, isteğe bağlı takım ve ad-soyad, tahminler, kilitleme zamanı, puanlar ve başarı istatistikleri; profili, oyunu, kariyeri ve sıralamayı sunmak için işlenir.</li>
      <li><strong>Topluluk:</strong> Yorumlar, oda üyelikleri ve mesajları, takip/engel ilişkileri ile şikâyet kayıtları; paylaşım, iletişim, kişiselleştirme, güvenlik ve moderasyon için işlenir.</li>
      <li><strong>Teknik ve destek:</strong> IP, istek, hata ve güvenlik günlükleri altyapı sağlayıcılarında işlenebilir. Destek yazışmaları talebi cevaplamak ve hakları korumak için tutulur.</li>
      <li><strong>Web ölçümü:</strong> Vercel Web Analytics ile anonim ve toplu sayfa/tıklama istatistikleri, Speed Insights ile izin verdiğinde performans ölçümleri değerlendirilir. Paylaşım kimliği, hesap bilgisi veya tahmin sahibinin kimliği ölçüm olayına eklenmez.</li>
    </ul>
    <p>Uygulama konum, rehber, kimlik belgesi veya ödeme kartı istemez. Parola ve doğrulama kodları destek tarafından istenmez ve topluluk profilinde gösterilmez.</p>
  </section>
  <section><h2>3. Hukuki dayanaklar</h2>
    <p>Hesap, tahmin, kariyer, yorum, takip ve oda işlevleri üyelik hizmetinin kurulması ve ifası için gerekli olduğu ölçüde KVKK m.5/2-c; güvenlik, kötüye kullanımın önlenmesi ve topluluk güvenliği meşru menfaat dengesi kapsamında m.5/2-f; hakların korunması m.5/2-e; bağlayıcı yükümlülükler m.5/2-ç kapsamında işlenir. Açık rıza gereken bağımsız bir işlem varsa ayrıca, belirli ve geri alınabilir biçimde istenir.</p>
  </section>
  <section><h2>4. Kimler neyi görebilir?</h2>
    <p>Akış yorumun, görünen adın, takımın ve gönderim zamanı erişim ve engelleme kuralları çerçevesinde diğer üyelere gösterilir. Oda üyeleri odadaki mesajları ve üye profillerini görebilir; geçerli davetle sonradan katılanlar erişime açık eski mesajları da görebilir. Özel odalar uçtan uca şifreli değildir.</p>
    <p>Sıralamalarda görünen ad, takım ve puan/başarı istatistikleri gösterilebilir. Maç kartındaki topluluk dağılımı en az 10 tahminde isim göstermeden toplulaştırılır. E-posta, isteğe bağlı gerçek ad-soyad, parola ve doğrulama kodları topluluk profiline dahil edilmez.</p>
  </section>
  <section><h2>5. Sağlayıcılar ve yurt dışı aktarım</h2>
    <p>Supabase kimlik doğrulama ve uygulama veritabanı; Resend işletim e-postaları; Google ve Apple sosyal giriş; API-Football maç verisi; Vercel web barındırma/ölçüm; Cloudflare alan adı ve güvenlik; Alastyr destek e-postası için kullanılır.</p>
    <p>Supabase projesinin seçili bölgesi Frankfurt’tur; diğer sağlayıcıların altyapı, destek ve alt işleyen düzenleri kapsamında veriler yurt dışındaki alıcılara aktarılabilir. Aktarımlar KVKK m.9 kapsamındaki uygulanabilir şart ve uygun güvence mekanizmasına dayanılarak, hizmet için gerekli veriyle sınırlı yürütülür.</p>
    <p>API-Football’a kullanıcı e-postası, tahmini veya mesajı gönderilmez. İncelenen sürümde kullanıcı içeriğini yapay zekâ eğitimi için gönderen ya da reklam profili oluşturan bir entegrasyon yoktur.</p>
  </section>
  <section><h2>6. Saklama, silme ve güvenlik</h2>
    <p>Hesap ve profil verileri hesap açık olduğu sürece; oyun geçmişi hesabı sunmak için; güvenlik günlükleri, destek yazışmaları ve hak başvuruları ise güvenlik, talep ve olası uyuşmazlık için gerekli süre boyunca tutulur. Sebep kalkınca veri silinir, yok edilir veya kişisel bağ geri döndürülemeyecek biçimde kaldırılır. Sağlayıcı yedekleri olağan silme döngüsünde üzerine yazılır.</p>
    <p><strong>Kariyer → Ayarlar → Hesabımı sil</strong> yolundan kalıcı silme başlatılabilir. Uygulamaya erişemiyorsan kayıtlı e-posta adresinden destek kanalına başvurabilirsin. Kanunen saklanması gereken ayrıştırılmış kayıtlar yalnız gerekli süre boyunca tutulur.</p>
    <p>Kimlik doğrulama, sunucu erişim kuralları ve kullanıcı bazlı veri ayrımı uygulanır. Hiçbir sistem için mutlak güvenlik taahhüdü verilmez.</p>
  </section>
  <section><h2>7. Hakların ve başvuru</h2>
    <p>KVKK m.11 kapsamında verilerinin işlenip işlenmediğini, amaçları ve alıcıları öğrenme; düzeltme; şartları varsa silme/yok etme; otomatik analiz sonucuna itiraz ve zararın giderilmesini isteme hakların vardır. Kayıtlı e-postandan {SUPPORT} adresine açık bir taleple başvurabilirsin. İlk mesajda parola, kod veya kimlik belgesi kopyası gönderme. Başvurular kanuni süre içinde cevaplanır.</p>
  </section>
</>;

const Terms = () => <>
  <section><h2>1. Hizmet ve yaş koşulu</h2><p>SüperTribün, Güngör Çepni tarafından sunulan ücretsiz futbol tahmini ve taraftar topluluğu uygulamasıdır. Yalnız 15 yaşını doldurmuş kişiler hesap açabilir. Kayıtta bu koşulu doğrulaman gerekir; yanlış yaş beyanı veya çocuk güvenliği riski hesabın sınırlandırılmasına ya da kapatılmasına neden olabilir.</p></section>
  <section><h2>2. Hesabın</h2><p>Erişebildiğin bir e-posta veya doğrulanmış Google/Apple hesabıyla kayıt ol. Şifreni ve doğrulama kodlarını paylaşma; başkasını taklit etme, hesabını başkasına kullandırma veya sıralamayı etkilemek için çoklu hesap açma.</p></section>
  <section><h2>3. Tahmin ve puan</h2><p>Her maç için tek skor tahmini sunucu tarafından kabul edildiğinde kilitlenir ve değiştirilemez. Tam skor 3, doğru sonuç yönü 1, yanlış sonuç 0 puandır. Normal süre ve duraklama dakikaları esas alınır; uzatma ve penaltılar dahil değildir. Ayrıntılar <Link to="/puanlama-ve-oyun-kurallari">Puan ve Oyun Kuralları</Link>ndadır.</p></section>
  <section><h2>4. Para ve bahis yok</h2><p>Üyelik ve tahmin ücretsizdir. Para yatırma, bahis oynama, nakit kazanç veya maddi ödül yoktur. Puanların parasal değeri bulunmaz, satın alınamaz ve paraya çevrilemez.</p></section>
  <section><h2>5. Akış, takip ve odalar</h2><p>Akış yorumları diğer üyelere açıktır. Özel oda içerikleri oda üyelerine gösterilir; davet kodunu yalnız davet etmek istediğin kişilerle paylaş. Odalar uçtan uca şifreli değildir ve ekran görüntüsü alınması teknik olarak engellenemez. Paylaşımlarında <Link to="/topluluk-kurallari">Topluluk Kuralları</Link>na uy.</p></section>
  <section><h2>6. İçerik ve yaptırımlar</h2><p>İçeriğinin hakları sende kalır; hizmetin çalışması için içeriğin ilgili alanda saklanmasına ve gösterilmesine sınırlı kullanım izni verirsin. İhlalin ağırlığına göre içerik gizleme, uyarı, geçici kısıtlama veya hesap kapatma uygulanabilir. Karara {SUPPORT} üzerinden itiraz edebilirsin.</p></section>
  <section><h2>7. Hesap silme ve değişiklikler</h2><p>Çıkış yapmak hesabı silmez. Uygulamadan veya <Link to="/hesap-silme">hesap silme sayfasındaki</Link> yöntemle kalıcı silme isteyebilirsin. Önemli koşul değişiklikleri tarih ve kapsamıyla duyurulur; yeni kabul gerektiren değişiklikler ayrıca onayına sunulur.</p></section>
  <section><h2>8. Uygulanacak hukuk</h2><p>Türkiye hukuku uygulanır. Emredici mevzuat ve tüketici hukukundan doğan hakların saklıdır. SüperTribün kulüp, lig veya federasyonların resmî uygulaması değildir.</p></section>
</>;

const Community = () => <>
  <section><h2>1. Rekabet var, saldırı yok</h2><p>Takımını savun ve maçı eleştir; hakaret, tehdit, zorbalık, ısrarlı taciz, nefret söylemi, şiddet teşviki ve hedef gösterme paylaşma.</p></section>
  <section><h2>2. Mahremiyet ve çocuk güvenliği</h2><p>Telefon, adres, kimlik/banka bilgisi, özel yazışma veya izinsiz görüntü paylaşma. Çocukların güvenliğini tehlikeye atan, cinsel istismar veya sömürü içeren davranış kesinlikle yasaktır. Acil tehlikede yalnız uygulama bildirimine güvenme; yetkili mercilere başvur.</p></section>
  <section><h2>3. Hile ve dolandırıcılık yok</h2><p>Sahte hesap, taklit, bot, spam, çoklu hesapla manipülasyon, oltalama, para toplama, bahis/kumar yönlendirmesi ve garantili kazanç iddiası yasaktır.</p></section>
  <section><h2>4. Telif ve hukuka uygunluk</h2><p>Yalnız paylaşmaya yetkili olduğun içeriği yayımla. Korsan maç yayını, izinsiz eser kopyası veya kişisel veri içeren belge paylaşma. Kulüp/lig adlarıyla resmî temsil izlenimi yaratma.</p></section>
  <section><h2>5. Bildir, engelle, itiraz et</h2><p>Uygulamadaki şikâyet ve engelleme araçlarını kullanabilir veya {SUPPORT} adresine yazabilirsin. Bildirimler insan tarafından incelenir; geçici gizleme ihlalin kesinleştiği anlamına gelmez. Karara aynı kanaldan itiraz edebilirsin. 7/24 izleme veya sabit çözüm süresi taahhüt edilmez.</p></section>
</>;

const Scoring = () => <>
  <section><h2>1. Tek maç, tek tahmin</h2><p>Her hesap bir maç için tek skor tahmini kilitler. 0–0 geçerlidir. Tahmin sunucu tarafından kabul edilince kaydolur; maçın sunucudaki başlangıç zamanı ve durumuna göre süre kapanır.</p></section>
  <section><h2>2. Puanlama</h2><ul><li>Tam skor: <strong>3 puan</strong></li><li>Skor farklı, kazanan veya beraberlik doğru: <strong>1 puan</strong></li><li>Sonuç yönü yanlış: <strong>0 puan</strong></li></ul><p>Puanlar üst üste eklenmez; bir maçtan en fazla 3 puan alınır. Normal süre ve duraklama dakikaları esas alınır.</p></section>
  <section><h2>3. Sonuç değişiklikleri</h2><p>Sonuç sistemde doğrulandıktan sonra puan eklenir. Ertelenen veya doğrulanmayan maçlar bekler; iptal edilenler hesaba katılmaz. Sağlayıcı sonucu düzeltirse maç yeniden değerlendirilir ve gerekli puan düzeltmesi ilgili hesaplara tutarlı uygulanır.</p></section>
  <section><h2>4. Sıralamalar</h2><p>Genel sıralama toplam puana, eşitlikte tam skor sayısına göre oluşur. Oda sıralaması yalnız odaya katıldıktan sonraki tahminleri ve maç başına ortalamayı esas alabilir; ekrandaki dönem ve kapsam geçerlidir.</p></section>
  <section><h2>5. Ücretsiz oyun</h2><p>Tahminler ücretsizdir. Para yatırma, bahis, nakit kazanç veya para ödülü yoktur. Puanlar parasal hak oluşturmaz.</p></section>
  <section><h2>6. Hata bildirimi</h2><p>Puan veya sonuç hatasını maç adı ve tarihiyle {SUPPORT} adresine iletebilirsin. Parola, doğrulama kodu veya ilgisiz kişisel veri gönderme.</p></section>
</>;

const Cookies = () => <>
  <section><h2>1. Kullanılan teknolojiler</h2><p>Tercihlerin <code>cookieConsent</code> anahtarıyla tarayıcının yerel depolamasında 180 gün tutulur. Kayıt başarısızsa ölçümü kapalı tutan oturum kaydı kullanılabilir. Bunlar reklam kimliği değildir.</p></section>
  <section><h2>2. İsteğe bağlı ölçüm</h2><p>Vercel Web Analytics anonim ve toplu sayfa/tıklama istatistikleri; Speed Insights performans ölçümleri için kullanılır. Tanıtım önizlemesindeki ölçüm seçimine bağlıdır. Paylaşım sayfasında hesap veya tahmin sahibi kimliği olaylara eklenmez.</p></section>
  <section><h2>3. Tercihin</h2><p>“Reddet” isteğe bağlı ölçümü kapatır; “Tümünü kabul et” açar. Seçim yapmadan siteyi kullanmak kabul sayılmaz. Alt kısımdaki “Çerez tercihleri” düğmesiyle tercihini değiştirebilirsin.</p></section>
  <section><h2>4. Ayrıntılar</h2><p>Veri işleme, sağlayıcı ve başvuru bilgileri için <Link to="/gizlilik">Gizlilik ve KVKK Aydınlatma Metni</Link>ni inceleyebilirsin.</p></section>
</>;

const AccountDeletion = () => <>
  <section><h2>Hesabını ve verilerini silme</h2><p>SüperTribün hesabını uygulamanın içinden kalıcı olarak silebilirsin. Bu işlem yalnızca uygulamayı telefondan kaldırmak veya cihazdan çıkış yapmak değildir.</p><ol><li>SüperTribün’de hesabına giriş yap.</li><li><strong>Kariyer → Ayarlar → Hesabımı sil</strong> yolunu aç.</li><li>Silinecek verileri incele, ekrandaki doğrulamayı tamamla ve işlemi onayla.</li></ol></section>
  <section><h2>Neler silinir?</h2><p>Hesabın; profilin, tahminlerin, puan ve kariyer kayıtların, oda üyeliklerin ve oda içeriklerin, akış yorumların, takip/engel ilişkilerin ve hesabına bağlı destek taleplerin kalıcı silme kapsamındadır. Başka kullanıcıların yasal hakları, güvenlik ve hukuki yükümlülükler için tutulması zorunlu sınırlı kayıtlar varsa bunlar yalnızca gerekli süre boyunca ayrıştırılarak saklanabilir.</p><p>Toplulaştırılmış ve artık hesabınla ilişkilendirilemeyen istatistikler kişisel hesap verisi değildir ve geriye dönük olarak ayrıştırılamayabilir.</p></section>
  <section><h2>Uygulamaya erişemiyorsan</h2><p>Kayıtlı e-posta adresinden <a href="mailto:destek@supertribun.com?subject=S%C3%BCperTrib%C3%BCn%20hesap%20silme%20talebi">destek@supertribun.com</a> adresine “SüperTribün hesap silme talebi” başlığıyla yaz. Parolanı, SMS kodunu, kimlik belgeni veya ödeme bilgini e-postaya ekleme. Hesabın sana ait olduğunu doğrulamak için kayıtlı adrese güvenli bir doğrulama adımı gönderilebilir.</p><p>Güvenlik nedeniyle farklı bir e-posta adresinden gönderilen veya hesabı yeterince doğrulanamayan talepler doğrudan silme işlemine dönüştürülmez.</p></section>
</>;

const pages = {
  privacy: ['Gizlilik ve KVKK Aydınlatma Metni', <Privacy key="privacy" />],
  terms: ['Üyelik Koşulları', <Terms key="terms" />],
  community: ['Topluluk Kuralları', <Community key="community" />],
  scoring: ['Puan ve Oyun Kuralları', <Scoring key="scoring" />],
  cookies: ['Çerez ve Ölçüm Politikası', <Cookies key="cookies" />],
  accountDeletion: ['SüperTribün Hesap Silme', <AccountDeletion key="deletion" />],
};

export default function LegalPage({ kind, onOpenPreferences }) {
  const [title, content] = pages[kind] || ['Sayfa bulunamadı', null];
  useEffect(() => { const original = document.title; document.title = `${title} | SüperTribün`; return () => { document.title = original; }; }, [title]);
  return <main className="legal-page">
    <header><Link className="legal-home" to="/">← SüperTribün’e dön</Link><p className="legal-eyebrow">SÜPERTRİBÜN · RESMÎ METİN</p><h1>{title}</h1></header>
    {content && <><p className="legal-version">25 Eylül 2026 · Sürüm 2026-09-25-v1 · Yürürlükte</p><aside className="legal-draft"><strong>15+ üyelik.</strong> SüperTribün yalnız 15 yaşını doldurmuş kişilere açıktır.</aside>{content}</>}
    <footer className="legal-footer">
      <Link to="/uyelik-kosullari">Üyelik Koşulları</Link><Link to="/gizlilik">Gizlilik ve KVKK</Link><Link to="/topluluk-kurallari">Topluluk Kuralları</Link><Link to="/puanlama-ve-oyun-kurallari">Puan ve Oyun Kuralları</Link><Link to="/cerez-politikasi">Çerez Politikası</Link><Link to="/hesap-silme">Hesap silme</Link><button onClick={onOpenPreferences}>Çerez tercihleri</button><a href="mailto:destek@supertribun.com">destek@supertribun.com</a>
    </footer>
  </main>;
}

# SüperTribün web sitesi — yayın kontrolü

Son kontrol: 21 Eylül 2026. Bu dosya yalnızca mevcut Vite/React tanıtım sitesini kapsar; mobil uygulamanın ayrı uyum listesi ve mağaza incelemelerinin yerine geçmez.

## Sabit çalışma düzeni

- Klasör: `/Users/Gungor/Documents/GitHub/supertribun`
- GitHub: `rahatolma/supertribun`, dal: `main`.
- Vercel projesi: `rahatolma/supertribun`. Kontrolde üretim kaynağı `main` olarak görüldü.
- Mevcut geliştirme: `npm run dev` / `http://localhost:5173`.
- Bu çalışmada commit, push, deploy, DNS değişikliği veya mobil uygulama değişikliği yapılmadı.
- GitHub Desktop’taki Changes listesinden incelenir, ardından kullanıcı **Commit to main → Push origin** yapar. Push, bağlı Vercel projesinde üretim dağıtımını tetikler; yalnızca yerel kayıt değildir.
- `noindex,nofollow` korunmuştur. Bu ayar sayfayı şifrelemez veya özel hale getirmez.

## Tamamlanan teknik işler

- [x] Analitik ve performans araçları ayrı, varsayılan kapalı tercihlere bağlandı.
- [x] Kabul, ret ve seçmeli kaydetme aynı görünürlükte sunuldu.
- [x] Footer’dan tercihler yeniden açılabiliyor; mevcut seçimler gösteriliyor.
- [x] Eski sürümsüz/bozuk kayıtlar onay sayılmıyor; 180 günlük süre ve sürüm kontrolü var.
- [x] 180 gün bir ürün tercihidir; mevzuatın zorunlu süre şartı olarak sunulmadı.
- [x] Depolama hatasında ölçüm kapalı kalıyor ve uyarı gösteriliyor.
- [x] Gönderim öncesi izin tekrar kontrol ediliyor; URL sorgusu/fragmenti kaldırılıyor, bilinmeyen yollar raporlanmıyor.
- [x] İzin geri alındığında SDK gözlemcilerini kaldırmak için üretimde sayfa yenileniyor. Başarısız kayıtta hata gösteriliyor ve gönderim koruması kapalı kalıyor.
- [x] Açık sekmeler depolama değişikliğini, odağı ve süreyi kontrol ediyor.
- [x] Google Fonts dış isteği kaldırıldı; aynı Inter fontu SIL OFL lisansıyla yerelden sunuluyor.
- [x] Metinlerin seçilmesini/kopyalanmasını engelleyen genel kod kaldırıldı.
- [x] `/gizlilik` ve `/cerez-politikasi` sayfaları ve Vercel doğrudan yol kuralları eklendi. Ölçüm uçlarını etkileyecek genel rewrite kullanılmadı.
- [x] App Store ve Google Play “Yakında” gösteriliyor; tıklanınca açık bilgilendirme yapılıyor, indirme başlatılmıyor.

## Üç butonun raporu

| Buton | Vercel olayı | Sabit özellikler |
| --- | --- | --- |
| Keşfet | `discover_click` | `location: hero` |
| App Store — Yakında | `app_store_click` | `location: download`, `platform: ios`, `status: coming_soon` |
| Google Play — Yakında | `play_store_click` | `location: download`, `platform: android`, `status: coming_soon` |
| Paylaşılan tahmin → Uygulamada aç | `share_open_app_click` | `location: prediction_share` |

- Bu isimler önceki Vercel olay isimleriyle korunmuştur. Eski kod rızaya bağlı değildi; önceki ve yeni dönemleri karşılaştırırken ölçüm kapsamının değiştiği dikkate alınmalıdır.
- Sadece analitik izni verenlerin yeni tıklamaları gönderilir. İzin öncesi tıklamalar sonradan topluca gönderilmez. Ret, butonların işlevini engellemez.
- Vercel Events ekranında toplam olay ile ziyaretçi sayısı ayrıdır; ziyaretçi ölçümü kesin, kalıcı tekil insan kimliği değildir. Reklam/izleme engelleyicileri ve izin reddi sayıları düşürür.
- “Yakında” tıklaması ilgi göstergesidir. Gerçek indirmeler App Store Connect ve Google Play Console üzerinden ayrı izlenir. Bu iki toplamın bölümü doğrudan site dönüşüm oranı değildir.
- Paylaşım adresindeki rastgele kimlik Vercel sayfa yoluna veya olay özelliğine gönderilmez; sayfa görünümü `/t/[id]` / `/t/shared` olarak ölçülür. Bu olay da indirme veya kayıt değildir.
- Yerel `npm run dev` hiçbir Vercel ölçümü göndermez. Vite preview üretim koşullarını çalıştırır, fakat Vercel’in sunucu uçları yerelde bulunmaz; panel teslimatı yerelde doğrulanamaz.
- Mağazalar açıldığında gerçek hedef URL’ler ve gerekiyorsa kampanya parametreleri eklenecek; `status` değeri güncellenecek. İndirme atfı ile site tıklaması ayrı raporlanacak.

## Test kaydı

- [x] `npm test`: 11 test geçti (ilk açılış, ret/yenileme, iki kategori, sürüm/süre, sekme değişikliği, depolama hatası, üç olay, URL filtreleme).
- [x] `npm run build`: başarılı.
- [x] `npm run lint`: hata yok; mevcut `CinematicStadiumBackground.jsx` içindeki state/effect uyarısı devam ediyor. Bu arka plan kodu değiştirilmedi.
- [x] Yerel tarayıcıda ret → yenileme → tercihler: ret korundu.
- [x] Yalnız analitik seçimi → kaydet → yenileme: analitik açık, performans kapalı görüldü.
- [x] Escape ile modal kapanması ve iki mağaza butonunun Yakında açıklamaları doğrulandı.
- [x] İki metin sayfası ve çerez sayfasında doğrudan yenileme çalıştı.
- [x] 390 px mobil görünümde tercih diyaloğu ve gizlilik sayfası görsel olarak incelendi; 320 px genişlikte mağaza alanı kontrol edildi.
- [x] Yerel üretim derlemesinin DOM’unda ilk açılışta ve ret sonrası ölçüm scripti yok.
- [x] Sadece analitik izninde sadece Analytics scripti; tam kabulde iki script; geri almadan sonraki yenilemede ikisi de yok.
- [ ] Gerçek Vercel dağıtımında ağ ve panel teslimat testi: aşağıdaki yayın sonrası kontrol hâlâ gerekli.

## Nihai hukuki yayın öncesi açık maddeler

**Metin sayfaları açıkça inceleme sürümüdür. Teknik onay mekanizması tek başına hukuki uygunluk veya yurt dışı aktarım çözümü değildir.**

- [ ] Veri sorumlusunun yayımlanacak resmi bildirim/başvuru adresi onaylanıp eklenmeli. Özel ev adresi bu çalışmada siteye konulmadı.
- [ ] Her işleme faaliyeti için hukuki sebep, yöntem, alıcılar ve başvuru usulü nihai olarak tamamlanmalı; uzman hukuk incelemesi yapılmalı.
- [ ] Alastyr #330002 yanıtı: destek e-postası ve yedeklerin yeri, erişen taraflar, saklama/silme koşulları.
- [ ] Vercel barındırma günlükleri, Analytics/Speed Insights rapor saklama süreleri, sağlayıcı sözleşmeleri ve yurt dışı aktarım düzeni doğrulanmalı. Kısa ömürlü oturum tanımlayıcısı, tüm raporların aynı sürede silindiği anlamına gelmez.
- [ ] Cloudflare’ın nihai alan adı üzerindeki DNS/proxy rolü ve ek güvenlik kayıtları doğrulanmalı. Bu çalışmada ayarlar değiştirilmedi.
- [ ] Tercihin tarayıcıda saklanması dışında ayrıca rıza ispat kaydına ihtiyaç olup olmadığı değerlendirilip kapsamı kararlaştırılmalı; şu anda kullanıcıya bağlı sunucu rıza defteri yoktur.
- [ ] Nihai metinler tamamlanınca inceleme uyarısı, sürüm ve tarih birlikte güncellenmeli. Tercih metni/amaçları değiştiğinde `CONSENT_VERSION` de artırılmalı.

## Push sonrası yapılacak kontrol

1. Vercel Ready durumunu ve yayımlanan commit’i doğrula; `/gizlilik` ve `/cerez-politikasi` adreslerini doğrudan aç/yenile.
2. Yeni gizli pencerede, karar vermeden ve Reddet sonrasında üç butonu dene. Network’te `/_vercel/insights` ve `/_vercel/speed-insights` ölçüm istekleri oluşmamalı.
3. Sadece analitiği aç: üç butonu ayrı ayrı dene. Vercel Analytics → Events altında üç olayın geldiğini ve performansın kapalı kaldığını kontrol et. Bu test tıklamalarını rapor yorumunda dikkate al.
4. Sadece performansı aç: Analytics kapalı kalmalı. Speed Insights özelliğinin projede etkin ve plana uygun olduğu ayrıca doğrulanmalı; bu çalışmada etkinleştirme/plan değişikliği yapılmadı.
5. Tam kabul sonrası footer’dan reddet: sayfa yenilenmeli, yeni ölçüm durmalı; diğer açık sekmede de tercih geri alınmalı.
6. Yenileme, mobil 320/390 px ve Safari/Chrome kontrolü; ağda Google Fonts isteği olmamalı.
7. Gerçek alan adı bağlanınca alan adını yeniden test et. Localhost, vercel.app ve özel alan adı ayrı tarayıcı tercih kayıtlarına sahiptir.

## Kaynaklar

- [Vercel Analytics SDK / beforeSend](https://vercel.com/docs/analytics/package)
- [Vercel Analytics gizlilik açıklaması](https://vercel.com/docs/analytics/privacy-policy)
- [Vercel Speed Insights SDK](https://vercel.com/docs/speed-insights/package)
- [Vercel Speed Insights gizlilik açıklaması](https://vercel.com/docs/speed-insights/privacy-policy)
- [KVKK çerez uygulamaları rehberi](https://www.kvkk.gov.tr/Icerik/7353/Cerez-Uygulamalari-Hakkinda-Rehber)
- [KVKK 2022/1358 kararı](https://www.kvkk.gov.tr/Icerik/7595/2022-1358)
- [Apple indirme analitiği](https://developer.apple.com/app-store-connect/analytics/)
- [Google Play kullanıcı edinme istatistikleri](https://support.google.com/googleplay/android-developer/answer/9859173?hl=en)

Font kaynağı: Google Fonts üzerinden edinilen değişken Inter Latin ve Latin-ext dosyaları. Lisans: `public/fonts/OFL.txt`. Kullanıcının tarayıcısı fontları bu sitenin kendi adresinden indirir.

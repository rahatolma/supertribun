// Bearer invitation links must never resolve private room data for crawlers.
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export default function handler(request,response){
  response.setHeader('Cache-Control','private, no-store, max-age=0');
  response.setHeader('Referrer-Policy','no-referrer');
  response.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');
  response.setHeader('Content-Security-Policy',"default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'");
  if(request.method!=='GET'&&request.method!=='HEAD'){response.setHeader('Allow','GET, HEAD');return response.status(405).send('Method not allowed');}
  const id=request.query?.id;
  if(typeof id!=='string'||!UUID.test(id)||Object.keys(request.query).some(key=>key!=='id'))return response.status(404).send('Davet bağlantısı bulunamadı.');
  const token=id.toLowerCase();
  response.setHeader('Content-Type','text/html; charset=utf-8');
  if(request.method==='HEAD')return response.status(200).send('');
  // No OG URL, canonical URL, analytics, external image, automatic redirect or
  // database call: nothing about the invitation is disclosed before sign-in.
  return response.status(200).send(`<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><meta name="robots" content="noindex,nofollow,noarchive"><title>SüperTribün oda daveti</title><meta property="og:title" content="SüperTribün oda daveti"><meta property="og:description" content="Oda davetini SüperTribün uygulamasında aç."><style>*{box-sizing:border-box}body{margin:0;background:#f7f4ef;color:#181716;font:16px/1.6 system-ui,-apple-system,sans-serif}main{max-width:520px;margin:12vh auto;padding:24px}.brand{width:190px;height:auto}.card{background:#fff;border:1px solid #ded7cc;border-radius:24px;padding:28px;margin-top:22px}h1{font-size:26px;line-height:1.2}p{color:#6f675e}.button{display:block;padding:13px;text-align:center;border-radius:13px;background:#ffb000;color:#181716;text-decoration:none;font-weight:750}.secondary{margin-top:12px;background:#eee9e1}small{display:block;margin-top:18px;color:#6f675e}</style></head><body><main><img class="brand" src="/logo.png" alt="SüperTribün"><section class="card"><h1>Oda davetin hazır.</h1><p>Bağlantıyı uygulamada aç, hesabına giriş yap ve katılmayı onayla. Oda bilgileri bu sayfada gösterilmez.</p><a class="button" rel="noreferrer" href="com.supertribun.app://r/${token}">Uygulamada aç</a><a class="button secondary" rel="noreferrer" href="/onizleme#magaza">SüperTribün’ü edin</a><small>Uygulamayı yeni kurduysan bu bağlantıya geri dönüp “Uygulamada aç”a dokun. Davet yedi gün sonra veya oda sahibi bağlantıyı yenilediğinde geçersiz olur. Bu sayfa davetin hâlâ geçerli olduğunu doğrulamaz.</small></section></main></body></html>`);
}

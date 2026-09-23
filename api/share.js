import { fetchShareData, shareId } from './_share-data.js';

const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const scriptSafe=value=>JSON.stringify(value).replace(/</g,'\\u003c');

export default async function handler(request,response){
  const id=shareId(request.query.id);
  if(!id)return response.status(404).send('Paylaşım bulunamadı.');
  try{
    const data=await fetchShareData(id),origin='https://supertribun.com',canonical=`${origin}/t/${id}`,image=`${origin}/api/share-image?id=${id}&v=2`;
    const title=`${data.home_name} – ${data.away_name} | Tahminini yap`;
    const description=`Kilitli SüperTribün tahminini gör. Hadi, sen de skor tahminini yap.`;
    response.setHeader('Content-Type','text/html; charset=utf-8');
    response.setHeader('Cache-Control','public, max-age=60, s-maxage=300, stale-while-revalidate=3600');
    response.status(200).send(`<!doctype html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} · SüperTribün</title><meta name="description" content="${escape(description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="SüperTribün"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${image}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="1200"><meta property="og:image:alt" content="${escape(title)} kilitli tahmin kartı"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${image}"><link rel="icon" href="/favicon.png"><style>
*{box-sizing:border-box}body{margin:0;background:#f7f4ef;color:#181716;font-family:Inter,system-ui,-apple-system,sans-serif}.page{min-height:100vh;display:grid;place-items:center;padding:28px 18px 44px}.wrap{width:min(620px,100%)}.brand{width:230px;height:auto;margin:0 0 18px}.card{display:block;width:100%;aspect-ratio:1;border-radius:24px;border:1px solid #d8d1c8;box-shadow:0 20px 60px #35280f18}.actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px}.button{display:inline-flex;min-height:52px;align-items:center;justify-content:center;padding:13px 20px;border-radius:14px;background:#181716;color:#fff;text-decoration:none;font-weight:800}.button.secondary{background:#fff;color:#855800;border:1px solid #d8d1c8}.foot{text-align:center;margin-top:18px;font-size:12px}.foot a{color:#8a837b}@media(max-width:600px){.page{padding-top:20px}.brand{width:190px}}
</style></head><body><main class="page"><div class="wrap"><img class="brand" src="/logo.png" alt="SüperTribün"><img class="card" src="${image}" width="1200" height="1200" alt="${escape(title)} kilitli tahmin kartı"><div class="actions"><a id="open-app" class="button" href="com.supertribun.app://t/${id}">Uygulamada aç</a><a class="button secondary" href="/">SüperTribün'ü keşfet</a></div><p class="foot"><a href="/gizlilik">Gizlilik</a></p></div></main><script>
(()=>{window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};const s=document.createElement('script');s.defer=true;s.src='/_vercel/insights/script.js';s.dataset.disableAutoTrack='1';document.head.appendChild(s);window.va('pageview',{route:'/t/[id]',path:'/t/shared'});
document.getElementById('open-app').addEventListener('click',()=>window.va('event',{name:'share_open_app_click',data:{location:'prediction_share'}}));
window.__SUPERTRIBUN_SHARE__=${scriptSafe({id,matchId:data.match_id})};})();
</script></body></html>`);
  }catch(error){
    const unavailable=String(error?.message||'').includes('SHARE_CONFIG');
    response.status(unavailable?503:404).send('Bu paylaşım şu anda görüntülenemiyor.');
  }
}

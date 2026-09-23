import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fetchShareData,shareId,trDate} from '../api/_share-data.js';

const id='123e4567-e89b-42d3-a456-426614174000';
const payload={id,match_id:'223e4567-e89b-42d3-a456-426614174000',league:'Süper Lig',home_name:'Samsunspor',away_name:'Trabzonspor',home_code:'S',away_code:'T',kickoff_at:'2026-10-10T13:00:00Z',locked_at:'2026-09-23T14:30:00Z',prediction_home:0,prediction_away:2};

test('share ids and Turkish display dates are bounded',()=>{
 assert.equal(shareId(id),id);assert.equal(shareId('bad'),null);assert.match(trDate(payload.kickoff_at),/10 Eki 2026/);
});

test('server share reader uses the public RPC and validates its response',async t=>{
 const old={url:process.env.SUPABASE_URL,key:process.env.SUPABASE_PUBLISHABLE_KEY,fetch:global.fetch};
 t.after(()=>{
  if(old.url===undefined)delete process.env.SUPABASE_URL;else process.env.SUPABASE_URL=old.url;
  if(old.key===undefined)delete process.env.SUPABASE_PUBLISHABLE_KEY;else process.env.SUPABASE_PUBLISHABLE_KEY=old.key;
  global.fetch=old.fetch;
 });
 process.env.SUPABASE_URL='https://project.supabase.co';process.env.SUPABASE_PUBLISHABLE_KEY='public-key';
 let call;global.fetch=async(url,options)=>{call={url,options};return new Response(JSON.stringify(payload),{status:200,headers:{'Content-Type':'application/json'}})};
 assert.deepEqual(await fetchShareData(id),payload);assert.match(call.url,/rpc\/get_prediction_share$/);assert.equal(call.options.headers.apikey,'public-key');
 global.fetch=async()=>new Response(JSON.stringify({...payload,owner_id:'private',prediction_home:99}),{status:200});
 await assert.rejects(fetchShareData(id),/SHARE_RESPONSE/);
});

test('Vercel routes expose one dynamic share page, OG image and Apple association',async()=>{
 const root=new URL('../',import.meta.url);
 const [vercel,page,image,aasa]=await Promise.all(['vercel.json','api/share.js','api/share-image.jsx','public/.well-known/apple-app-site-association'].map(file=>readFile(new URL(file,root),'utf8')));
 assert.match(vercel,/"\/t\/:id"/);assert.match(page,/og:image/);assert.match(page,/share_open_app_click/);assert.match(page,/\/t\/\[id\]/);assert.match(image,/ImageResponse/);
 assert.match(aasa,/NX934R23UD\.com\.supertribun\.app/);assert.match(aasa,/"\/t\/\*"/);
});

test('prelaunch routes keep the public home gated without removing the private preview',async()=>{
 const root=new URL('../',import.meta.url);
 const [app,gate,robots,vercel]=await Promise.all(['src/App.jsx','src/pages/LaunchGate.jsx','public/robots.txt','vercel.json'].map(file=>readFile(new URL(file,root),'utf8')));
 assert.match(app,/path="\/" element={<LaunchGate/);
 assert.match(app,/path="\/onizleme" element={<Landing/);
 assert.match(gate,/ÇOK YAKINDA/);
 assert.doesNotMatch(gate,/Gizlilik|Çerezler|İletişim|SüperTribün/);
 assert.match(app,/!isLaunchGate && <CookieConsent/);
 assert.match(robots,/Disallow: \/$/m);
 assert.match(vercel,/"\/onizleme"/);
});

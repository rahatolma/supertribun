import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {duelInviteId,fetchDuelInvite} from '../api/_duel-data.js';

const id='123e4567-e89b-42d3-a456-426614174000';
const matchId='223e4567-e89b-42d3-a456-426614174000';
const payload={id,challenger_name:'Gungor',challenger_team:'Fenerbahçe',status:'pending',expires_at:'2026-10-04T20:00:00Z',matches:[{id:matchId,league:'Süper Lig',home:'Trabzonspor',away:'Beşiktaş',kickoff_at:'2026-10-05T17:00:00Z'}]};

test('duel invite reader accepts only an opaque UUID and validated public fields',async t=>{
  assert.equal(duelInviteId(id),id);assert.equal(duelInviteId('bad'),null);
  const old={url:process.env.SUPABASE_URL,key:process.env.SUPABASE_PUBLISHABLE_KEY,fetch:global.fetch};
  t.after(()=>{if(old.url===undefined)delete process.env.SUPABASE_URL;else process.env.SUPABASE_URL=old.url;if(old.key===undefined)delete process.env.SUPABASE_PUBLISHABLE_KEY;else process.env.SUPABASE_PUBLISHABLE_KEY=old.key;global.fetch=old.fetch;});
  process.env.SUPABASE_URL='https://project.supabase.co';process.env.SUPABASE_PUBLISHABLE_KEY='public-key';
  let call;global.fetch=async(url,options)=>{call={url,options};return new Response(JSON.stringify(payload),{status:200,headers:{'Content-Type':'application/json'}})};
  assert.deepEqual(await fetchDuelInvite(id),payload);assert.match(call.url,/rpc\/get_external_duel_invite$/);assert.equal(call.options.headers.apikey,'public-key');assert.equal(JSON.parse(call.options.body).p_invite,id);
  global.fetch=async()=>new Response(JSON.stringify({...payload,challenger_email:'private@example.com'}),{status:200});
  assert.deepEqual(await fetchDuelInvite(id),payload);
  global.fetch=async()=>new Response(JSON.stringify({...payload,status:'unknown'}),{status:200});
  await assert.rejects(fetchDuelInvite(id),/DUEL_RESPONSE/);
});

test('Vercel and mobile association files expose the duel route',async()=>{
  const root=new URL('../',import.meta.url);
  const [vercel,page,aasa,assetlinks]=await Promise.all(['vercel.json','api/duel.js','public/.well-known/apple-app-site-association','public/.well-known/assetlinks.json'].map(file=>readFile(new URL(file,root),'utf8')));
  assert.match(vercel,/"\/d\/:id"/);assert.match(page,/com\.supertribun\.app:\/\/d\//);assert.match(page,/yalnız bir kez kullanılabilir/);assert.match(page,/rehberini veya arkadaşının e-posta adresini toplamaz/);assert.match(aasa,/"\/d\/\*"/);assert.match(assetlinks,/com\.supertribun\.app/);
  assert.match(page,/https:\/\/www\.supertribun\.com\/d\//);
});

const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const STATUSES=new Set(['pending','claimed','cancelled','expired']);

export function duelInviteId(value){return typeof value==='string'&&UUID.test(value)?value:null;}

export async function fetchDuelInvite(id){
  const base=process.env.SUPABASE_URL||process.env.VITE_SUPABASE_URL;
  const key=process.env.SUPABASE_PUBLISHABLE_KEY||process.env.VITE_SUPABASE_PUBLISHABLE_KEY||process.env.VITE_SUPABASE_ANON_KEY;
  if(!base||!key)throw new Error('DUEL_CONFIG');
  const response=await fetch(`${base.replace(/\/$/,'')}/rest/v1/rpc/get_external_duel_invite`,{
    method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},
    body:JSON.stringify({p_invite:id}),signal:AbortSignal.timeout(8000),
  });
  if(!response.ok)throw new Error(`DUEL_UPSTREAM_${response.status}`);
  const data=await response.json();
  if(!data||data.id!==id||!STATUSES.has(data.status)||typeof data.challenger_name!=='string'||
    data.challenger_name.length<1||data.challenger_name.length>80||
    !(data.challenger_team===null||typeof data.challenger_team==='string')||
    !Number.isFinite(Date.parse(data.expires_at))||!Array.isArray(data.matches)||data.matches.length<1||data.matches.length>5||
    data.matches.some(match=>!match||!UUID.test(match.id)||![match.league,match.home,match.away].every(value=>typeof value==='string'&&value.length>0&&value.length<=120)||!Number.isFinite(Date.parse(match.kickoff_at)))){
    throw new Error('DUEL_RESPONSE');
  }
  return {
    id:data.id,challenger_name:data.challenger_name,challenger_team:data.challenger_team??null,
    status:data.status,expires_at:data.expires_at,
    matches:data.matches.map(match=>({id:match.id,league:match.league,home:match.home,away:match.away,kickoff_at:match.kickoff_at})),
  };
}

export const trDate=value=>new Intl.DateTimeFormat('tr-TR',{timeZone:'Europe/Istanbul',weekday:'short',day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(value));

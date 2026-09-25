const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function shareId(value){return typeof value==='string'&&UUID.test(value)?value:null;}

export async function fetchShareData(id,kind='prediction'){
  if(kind!=='prediction'&&kind!=='match')throw new Error('SHARE_RESPONSE');
  const base=process.env.SUPABASE_URL||process.env.VITE_SUPABASE_URL;
  const key=process.env.SUPABASE_PUBLISHABLE_KEY||process.env.VITE_SUPABASE_PUBLISHABLE_KEY||process.env.VITE_SUPABASE_ANON_KEY;
  if(!base||!key)throw new Error('SHARE_CONFIG');
  const response=await fetch(`${base.replace(/\/$/,'')}/rest/v1/rpc/${kind==='match'?'get_match_share':'get_prediction_share'}`,{
    method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},
    body:JSON.stringify(kind==='match'?{p_match_id:id}:{p_share_id:id}),signal:AbortSignal.timeout(8000),
  });
  if(!response.ok)throw new Error(`SHARE_UPSTREAM_${response.status}`);
  const data=await response.json();
  if(!data||data.id!==id||!UUID.test(data.match_id)||
    ![data.league,data.home_name,data.away_name,data.home_code,data.away_code].every(value=>typeof value==='string')||
    !Number.isFinite(Date.parse(data.kickoff_at))||kind==='prediction'&&(!Number.isFinite(Date.parse(data.locked_at))||
    ![data.prediction_home,data.prediction_away].every(value=>Number.isInteger(value)&&value>=0&&value<=9)))throw new Error('SHARE_RESPONSE');
  return data;
}

export const trDate=value=>new Intl.DateTimeFormat('tr-TR',{timeZone:'Europe/Istanbul',day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(value));

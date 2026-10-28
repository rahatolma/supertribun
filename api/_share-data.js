import {signedCapabilityProxyHeaders,trustedVercelNetwork} from './_public-capability-network.js';
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const shareNetwork=trustedVercelNetwork;
const webProxyHeaders=(id,network)=>{try{return signedCapabilityProxyHeaders({id,network,secret:process.env.PREDICTION_SHARE_WEB_PROXY_SECRET?.trim(),networkDomain:'prediction-share-web-network',proofDomain:'prediction-share-proxy-proof'});}catch(error){throw new Error(error?.message==='CAPABILITY_NETWORK'?'SHARE_NETWORK':'SHARE_CONFIG');}};

export function shareId(value){return typeof value==='string'&&UUID.test(value)?value:null;}

export async function fetchShareData(id,kind='prediction',network=null){
  if(kind!=='prediction'&&kind!=='match')throw new Error('SHARE_RESPONSE');
  const base=process.env.SUPABASE_URL||process.env.VITE_SUPABASE_URL;
  const key=process.env.SUPABASE_PUBLISHABLE_KEY||process.env.VITE_SUPABASE_PUBLISHABLE_KEY||process.env.VITE_SUPABASE_ANON_KEY;
  if(!base||!key)throw new Error('SHARE_CONFIG');
  const prediction=kind==='prediction';
  const response=await fetch(`${base.replace(/\/$/,'')}${prediction?'/functions/v1/verify-prediction-share':'/rest/v1/rpc/get_match_share'}`,{
    method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',...(prediction?webProxyHeaders(id,network):{})},
    body:JSON.stringify(prediction?{id}:{p_match_id:id}),redirect:'error',signal:AbortSignal.timeout(8000),
  });
  if(!response.ok)throw new Error(`SHARE_UPSTREAM_${response.status}`);
  const payload=await response.json(),data=prediction?payload?.data:payload;
  if(!data||data.id!==id||!UUID.test(data.match_id)||
    ![data.league,data.home_name,data.away_name,data.home_code,data.away_code].every(value=>typeof value==='string')||
    !Number.isFinite(Date.parse(data.kickoff_at))||kind==='prediction'&&(!Number.isFinite(Date.parse(data.locked_at))||
    ![data.owner_name,data.owner_team].every(value=>typeof value==='string')||!data.owner_name.trim()||
    ![data.prediction_home,data.prediction_away].every(value=>Number.isInteger(value)&&value>=0&&value<=9)||
    ![data.result_home,data.result_away].every(value=>value==null||Number.isInteger(value)&&value>=0)||
    !(data.points==null||Number.isInteger(data.points)&&data.points>=0)))throw new Error('SHARE_RESPONSE');
  return data;
}

export const trDate=value=>new Intl.DateTimeFormat('tr-TR',{timeZone:'Europe/Istanbul',day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(value));
export function trLead(locked,kickoff){
 const minutes=Math.max(0,Math.floor((Date.parse(kickoff)-Date.parse(locked))/60000)),days=Math.floor(minutes/1440),hours=Math.floor(minutes%1440/60),rest=minutes%60,parts=[];
 if(days)parts.push(`${days} gün`);if(hours)parts.push(`${hours} saat`);if(!days&&rest)parts.push(`${rest} dakika`);return parts.join(' ')||'hemen önce';
}
export const verificationCode=id=>`ST-${id.replaceAll('-','').slice(0,8).toLocaleUpperCase('tr-TR')}`;

import {createHmac} from 'node:crypto';
import {isIP} from 'node:net';

const PRIVATE_SECRET=/^[A-Za-z0-9_-]{43,128}$/;

export function trustedVercelNetwork(request){
  const headers=request?.headers;
  const value=typeof headers?.get==='function'?headers.get('x-vercel-forwarded-for'):headers?.['x-vercel-forwarded-for'];
  if(typeof value!=='string')return null;
  const raw=value.trim();
  return typeof raw==='string'&&isIP(raw)>0?raw.toLowerCase():null;
}

export function signedCapabilityProxyHeaders({id,network,secret,networkDomain,proofDomain}){
  if(!secret||!PRIVATE_SECRET.test(secret))throw new Error('CAPABILITY_CONFIG');
  if(!network||isIP(network)===0)throw new Error('CAPABILITY_NETWORK');
  const fingerprint=createHmac('sha256',secret).update(`${networkDomain}:${network.toLowerCase()}`).digest('hex');
  const proof=createHmac('sha256',secret).update(`${proofDomain}:${id}:${fingerprint}`).digest('hex');
  return {'x-supertribun-proxy-fingerprint':fingerprint,'x-supertribun-proxy-proof':proof};
}

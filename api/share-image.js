import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { fetchShareData, shareId, trDate } from './_share-data.js';

const fallback={background:'#F2EEE8',accent:'#9B948B'};
const logoPromise=readFile(new URL('../public/logo.png',import.meta.url)).then(file=>file.toString('base64'));
const xml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));
const color=(value,fallbackValue)=>typeof value==='string'&&/^#[0-9a-f]{6}$/i.test(value)?value:fallbackValue;

function badgeTextColor(background){
  const hex=background.slice(1);
  const [red,green,blue]=[0,2,4].map(index=>Number.parseInt(hex.slice(index,index+2),16));
  return (red*299+green*587+blue*114)/1000>170?'#181716':'#FFF';
}

function badge(x,code,brand){
  const background=color(brand?.background,fallback.background),accent=color(brand?.accent,fallback.accent);
  return `<g><rect x="${x}" y="198" width="74" height="74" rx="20" fill="${background}" stroke="#181716" stroke-opacity=".09" stroke-width="2"/><path d="M${x} 264h74v8h-74z" fill="${accent}"/><text x="${x+37}" y="248" text-anchor="middle" font-size="31" font-weight="900" fill="${badgeTextColor(background)}">${xml(code)}</text></g>`;
}

function percentages(value){
  if(!value?.percent)return 'Veri bekleniyor';
  return value.percent.map(number=>`%${number}`).join('  ·  ');
}

function fitName(value){
  const name=xml(value);
  return name.length>20?` textLength="260" lengthAdjust="spacingAndGlyphs"`:'';
}

function renderSvg(data,logo){
  const community=data.community?.count>=10
    ?[data.community.home,data.community.draw,data.community.away].map(value=>Math.round(value/data.community.count*100)).map(value=>`%${value}`).join('  ·  ')
    :`${data.community?.count||0}/10 tahmin`;
  const home=xml(data.home_name),away=xml(data.away_name);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#F7F4EF"/>
    <image href="data:image/png;base64,${logo}" x="38" y="27" width="220" height="64" preserveAspectRatio="xMinYMid meet"/>
    <rect x="38" y="110" width="1124" height="490" rx="28" fill="#FFF" stroke="#D8D1C8" stroke-width="2"/>
    <g font-family="Arial, Helvetica, sans-serif">
      <text x="68" y="157" font-size="20" font-weight="800" fill="#855800">${xml(data.league)}</text>
      <text x="1132" y="157" text-anchor="end" font-size="20" fill="#777067">${xml(trDate(data.kickoff_at))}</text>
      ${badge(208,data.home_code,data.home_brand)}
      ${badge(918,data.away_code,data.away_brand)}
      <text x="245" y="310" text-anchor="middle" font-size="23" font-weight="800" fill="#181716"${fitName(data.home_name)}>${home}</text>
      <text x="955" y="310" text-anchor="middle" font-size="23" font-weight="800" fill="#181716"${fitName(data.away_name)}>${away}</text>
      <text x="600" y="229" text-anchor="middle" font-size="17" fill="#938B81">Kilitli tahmin</text>
      <text x="600" y="294" text-anchor="middle" font-size="60" font-weight="900" fill="#181716">${data.prediction_home}–${data.prediction_away}</text>
      <rect x="68" y="344" width="1064" height="84" rx="16" fill="#FCFAF6" stroke="#E5DDD2"/>
      <path d="M422 344v84M777 344v84" stroke="#E5DDD2"/>
      <text x="85" y="374" font-size="18" font-weight="800" fill="#57452D">Topluluk</text>
      <text x="85" y="405" font-size="17" fill="#7E756B">${xml(community)}</text>
      <text x="439" y="374" font-size="18" font-weight="800" fill="#57452D">Veri modeli</text>
      <text x="439" y="405" font-size="17" fill="#7E756B">${xml(percentages(data.model))}</text>
      <text x="794" y="374" font-size="18" font-weight="800" fill="#57452D">Oranlar</text>
      <text x="794" y="405" font-size="17" fill="#7E756B">${xml(percentages(data.odds))}</text>
      <text x="68" y="560" font-size="17" fill="#655B50">Tahmin ${xml(trDate(data.locked_at))} tarihinde kilitlendi.</text>
      <text x="1132" y="560" text-anchor="end" font-size="22" font-weight="900" fill="#A86F00">Hadi, sen de tahminini yap ›</text>
    </g>
  </svg>`;
}

export default async function handler(request){
  try{
    const id=shareId(request.query?.id??new URL(request.url,'https://supertribun.com').searchParams.get('id'));
    if(!id)return new Response('Not found',{status:404});
    const [data,logo]=await Promise.all([fetchShareData(id),logoPromise]);
    const png=await sharp(Buffer.from(renderSvg(data,logo))).png().toBuffer();
    return new Response(png,{status:200,headers:{'Content-Type':'image/png','Cache-Control':'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800','Content-Length':String(png.length)}});
  }catch(error){
    console.error('share-image',error);
    return new Response('Preview unavailable',{status:502});
  }
}

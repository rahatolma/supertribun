import { readFile } from 'node:fs/promises';
import React from 'react';
import { ImageResponse } from '@vercel/og';
import { fetchShareData, shareId, trDate } from './_share-data.js';

const h=React.createElement;
const fallback={background:'#F2EEE8',accent:'#9B948B'};
const logoPromise=readFile(new URL('../public/logo.png',import.meta.url)).then(file=>`data:image/png;base64,${file.toString('base64')}`);
const color=(value,fallbackValue)=>typeof value==='string'&&/^#[0-9a-f]{6}$/i.test(value)?value:fallbackValue;
const row={display:'flex',alignItems:'center'};

function badge(code,brand){
  const background=color(brand?.background,fallback.background),accent=color(brand?.accent,fallback.accent);
  const hex=background.slice(1),channels=[0,2,4].map(index=>Number.parseInt(hex.slice(index,index+2),16));
  const ink=(channels[0]*299+channels[1]*587+channels[2]*114)/1000>170?'#181716':'#FFF';
  return h('div',{style:{...row,position:'relative',width:74,height:74,borderRadius:20,justifyContent:'center',background,border:'2px solid #18171617',overflow:'hidden',fontSize:31,fontWeight:900,color:ink}},
    code,h('div',{style:{position:'absolute',left:0,right:0,bottom:0,height:8,background:accent}}));
}

function percentages(value){
  return value?.percent?value.percent.map(number=>`%${number}`).join('  ·  '):'Veri bekleniyor';
}

function signal(title,value){
  return h('div',{style:{display:'flex',flexDirection:'column',width:'33.333%',height:'100%',justifyContent:'center',padding:'0 18px',borderRight:title==='Oranlar'?'none':'1px solid #E5DDD2'}},
    h('div',{style:{fontSize:18,fontWeight:800,color:'#57452D'}},title),
    h('div',{style:{fontSize:17,color:'#7E756B',marginTop:8}},value));
}

function card(data,logo,kind){
  const community=data.community?.count>=10
    ?[data.community.home,data.community.draw,data.community.away].map(value=>Math.round(value/data.community.count*100)).map(value=>`%${value}`).join('  ·  ')
    :`${data.community?.count||0}/10 tahmin`;
  return h('div',{style:{display:'flex',flexDirection:'column',width:'100%',height:'100%',padding:'27px 38px 30px',background:'#F7F4EF',color:'#181716'}},
    h('img',{src:logo,width:220,height:64,style:{objectFit:'contain',objectPosition:'left center'}}),
    h('div',{style:{display:'flex',flexDirection:'column',flex:1,marginTop:19,padding:'25px 30px 23px',borderRadius:28,background:'#FFF',border:'2px solid #D8D1C8'}},
      h('div',{style:{...row,justifyContent:'space-between'}},
        h('div',{style:{fontSize:20,fontWeight:800,color:'#855800'}},data.league),
        h('div',{style:{fontSize:20,color:'#777067'}},trDate(data.kickoff_at))),
      h('div',{style:{...row,justifyContent:'space-between',marginTop:32}},
        h('div',{style:{...row,width:310,gap:18}},badge(data.home_code,data.home_brand),h('div',{style:{fontSize:23,fontWeight:800,maxWidth:210}},data.home_name)),
        h('div',{style:{display:'flex',flexDirection:'column',alignItems:'center',width:250}},h('div',{style:{fontSize:17,color:'#938B81'}},kind==='match'?'Skor tahminin':'Kilitli tahmin'),h('div',{style:{fontSize:kind==='match'?36:60,fontWeight:900,marginTop:4}},kind==='match'?'Sıra sende':`${data.prediction_home}–${data.prediction_away}`)),
        h('div',{style:{...row,width:310,justifyContent:'flex-end',gap:18}},h('div',{style:{fontSize:23,fontWeight:800,maxWidth:210,textAlign:'right'}},data.away_name),badge(data.away_code,data.away_brand))),
      h('div',{style:{...row,height:84,marginTop:28,borderRadius:16,background:'#FCFAF6',border:'1px solid #E5DDD2',overflow:'hidden'}},
        signal('Topluluk',community),signal('Veri modeli',percentages(data.model)),signal('Oranlar',percentages(data.odds))),
      h('div',{style:{...row,justifyContent:'space-between',marginTop:'auto',fontSize:17,color:'#655B50'}},
        h('div',null,kind==='match'?`Maç ${trDate(data.kickoff_at)}`:`Tahmin ${trDate(data.locked_at)} tarihinde kilitlendi.`),
        h('div',{style:{fontSize:22,fontWeight:900,color:'#A86F00'}},'Hadi, sen de tahminini yap ›'))));
}

export default async function handler(request){
  try{
    const id=shareId(request.query?.id??new URL(request.url,'https://supertribun.com').searchParams.get('id'));
    if(!id)return new Response('Not found',{status:404});
    const kind=request.query?.kind==='match'?'match':'prediction';
    const [data,logo]=await Promise.all([fetchShareData(id,kind),logoPromise]);
    return new ImageResponse(card(data,logo,kind),{width:1200,height:630,headers:{'Cache-Control':'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800'}});
  }catch(error){
    console.error('share-image',error);
    return new Response('Preview unavailable',{status:502});
  }
}

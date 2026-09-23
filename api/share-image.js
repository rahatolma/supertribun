import React from 'react';
import { ImageResponse } from '@vercel/og';
import { readFile } from 'node:fs/promises';
import { fetchShareData, shareId, trDate } from './_share-data.js';

const h=React.createElement;
const fallback={background:'#F2EEE8',accent:'#9B948B'};
const logoPromise=readFile(new URL('../public/logo.png',import.meta.url)).then(file=>`data:image/png;base64,${file.toString('base64')}`).catch(()=>null);

function badgeTextColor(background){
  const hex=background?.match(/^#([0-9a-f]{6})$/i)?.[1];
  if(!hex)return '#FFF';
  const [red,green,blue]=[0,2,4].map(index=>Number.parseInt(hex.slice(index,index+2),16));
  return (red*299+green*587+blue*114)/1000>170?'#181716':'#FFF';
}

function Badge({code,brand}){
  const colors=brand||fallback;
  return h('div',{style:{display:'flex',position:'relative',width:74,height:74,borderRadius:20,background:colors.background,border:'2px solid #18171618',alignItems:'center',justifyContent:'center',overflow:'hidden'}},
    h('span',{style:{fontSize:31,fontWeight:900,color:badgeTextColor(colors.background)}},code),
    h('div',{style:{display:'flex',position:'absolute',left:0,right:0,bottom:0,height:8,background:colors.accent}}));
}

function percentages(value){
  if(!value?.percent)return 'Veri bekleniyor';
  return value.percent.map(number=>`%${number}`).join('  ·  ');
}

function Insight({title,value,last=false}){
  return h('div',{style:{display:'flex',flex:1,flexDirection:'column',padding:'14px 16px',borderRight:last?'none':'1px solid #E5DDD2'}},
    h('span',{style:{fontSize:18,fontWeight:800,color:'#57452D'}},title),
    h('span',{style:{fontSize:17,color:'#7E756B',marginTop:6}},value));
}

export default async function handler(request){
  try{
    const url=new URL(request.url),id=shareId(url.searchParams.get('id'));
    if(!id)return new Response('Not found',{status:404});
    const [data,logo]=await Promise.all([fetchShareData(id),logoPromise]);
    const community=data.community?.count>=10
      ?[data.community.home,data.community.draw,data.community.away].map(value=>Math.round(value/data.community.count*100)).map(value=>`%${value}`).join('  ·  ')
      :`${data.community?.count||0}/10 tahmin`;
    const card=h('div',{style:{width:'100%',height:'100%',display:'flex',flexDirection:'column',background:'#F7F4EF',padding:'30px 38px',fontFamily:'Arial',color:'#181716'}},
      logo?h('img',{src:logo,width:220,height:64,style:{objectFit:'contain',objectPosition:'left center',marginBottom:18}}):h('div',{style:{display:'flex',alignItems:'center',marginBottom:18}},h('div',{style:{display:'flex',width:58,height:58,borderRadius:16,background:'#211E1A',alignItems:'center',justifyContent:'center',color:'#FFB000',fontSize:34,fontWeight:900}},'S'),h('span',{style:{fontSize:38,fontWeight:900,marginLeft:14}},'SüperTribün')),
      h('div',{style:{display:'flex',flex:1,flexDirection:'column',justifyContent:'space-between',background:'#FFF',border:'2px solid #D8D1C8',borderRadius:28,padding:'24px 28px'}},
        h('div',{style:{display:'flex',justifyContent:'space-between',fontSize:20,fontWeight:800,color:'#855800'}},
          h('span',null,data.league),h('span',{style:{color:'#777067',fontWeight:500}},trDate(data.kickoff_at))),
        h('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'18px 22px 16px'}},
          h('div',{style:{display:'flex',width:310,flexDirection:'column',alignItems:'center',gap:8}},h(Badge,{code:data.home_code,brand:data.home_brand}),h('span',{style:{fontSize:23,fontWeight:800,textAlign:'center'}},data.home_name)),
          h('div',{style:{display:'flex',flexDirection:'column',alignItems:'center'}},h('span',{style:{fontSize:17,color:'#938B81'}},'Kilitli tahmin'),h('span',{style:{fontSize:60,fontWeight:900,lineHeight:1.05}},`${data.prediction_home}–${data.prediction_away}`)),
          h('div',{style:{display:'flex',width:310,flexDirection:'column',alignItems:'center',gap:8}},h(Badge,{code:data.away_code,brand:data.away_brand}),h('span',{style:{fontSize:23,fontWeight:800,textAlign:'center'}},data.away_name))),
        h('div',{style:{display:'flex',border:'1px solid #E5DDD2',borderRadius:16,overflow:'hidden',background:'#FCFAF6'}},
          h(Insight,{title:'Topluluk',value:community}),
          h(Insight,{title:'Veri modeli',value:percentages(data.model)}),
          h(Insight,{title:'Oranlar',value:percentages(data.odds),last:true})),
        h('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:15}},
          h('span',{style:{fontSize:17,color:'#655B50'}},`Tahmin ${trDate(data.locked_at)} tarihinde kilitlendi.`),
          h('span',{style:{fontSize:22,fontWeight:900,color:'#A86F00'}},'Hadi, sen de tahminini yap ›'))));
    return new ImageResponse(card,{width:1200,height:630});
  }catch(error){
    console.error('share-image',error);
    return new Response('Preview unavailable',{status:502});
  }
}

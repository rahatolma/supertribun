import React from 'react';
import { ImageResponse } from '@vercel/og';
import { fetchShareData, shareId, trDate } from './_share-data.js';

const h=React.createElement;
const fallback={background:'#F2EEE8',accent:'#9B948B'};
const panel={display:'flex',flexDirection:'column',padding:'18px 22px',borderBottom:'1px solid #E5DDD2'};

function badgeTextColor(background){
  const hex=background?.match(/^#([0-9a-f]{6})$/i)?.[1];
  if(!hex)return '#FFF';
  const [red,green,blue]=[0,2,4].map(index=>Number.parseInt(hex.slice(index,index+2),16));
  return (red*299+green*587+blue*114)/1000>170?'#181716':'#FFF';
}

function Badge({code,brand}){
  const colors=brand||fallback;
  return h('div',{style:{display:'flex',position:'relative',width:92,height:92,borderRadius:25,background:colors.background,border:'2px solid #18171618',alignItems:'center',justifyContent:'center',overflow:'hidden'}},
    h('span',{style:{fontSize:38,fontWeight:900,color:badgeTextColor(colors.background)}},code),
    h('div',{style:{display:'flex',position:'absolute',left:0,right:0,bottom:0,height:10,background:colors.accent}}));
}

function Percentages({value}){
  if(!value?.percent)return h('span',{style:{color:'#938B81',fontSize:23}},'Kaynak verisi bekleniyor.');
  return h('div',{style:{display:'flex',gap:12,marginTop:10}},...value.percent.map((number,index)=>h('div',{key:index,style:{display:'flex',flex:1,justifyContent:'center',padding:'10px 6px',borderRadius:14,fontSize:26,fontWeight:800,background:['#FFF0BE','#E9E6E1','#FBE3E9'][index],color:'#181716'}},`%${number}`)));
}

export default async function handler(request){
  try{
    const url=new URL(request.url),id=shareId(url.searchParams.get('id'));
    if(!id)return new Response('Not found',{status:404});
    const data=await fetchShareData(id);
    const community=data.community?.count>=10?[data.community.home,data.community.draw,data.community.away].map(value=>Math.round(value/data.community.count*100)):null;
    const card=h('div',{style:{width:'100%',height:'100%',display:'flex',flexDirection:'column',background:'#F7F4EF',padding:54,fontFamily:'Arial',color:'#181716'}},
      h('img',{src:`${url.origin}/logo.png`,width:374,height:100,style:{objectFit:'contain',objectPosition:'left center',marginBottom:22}}),
      h('div',{style:{display:'flex',flex:1,flexDirection:'column',background:'#FFF',border:'2px solid #D8D1C8',borderRadius:36,padding:34}},
        h('div',{style:{display:'flex',justifyContent:'space-between',fontSize:25,fontWeight:800,color:'#855800'}},
          h('span',null,data.league),h('span',{style:{color:'#777067',fontWeight:500}},trDate(data.kickoff_at))),
        h('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'34px 20px 30px'}},
          h('div',{style:{display:'flex',width:270,flexDirection:'column',alignItems:'center',gap:12}},h(Badge,{code:data.home_code,brand:data.home_brand}),h('span',{style:{fontSize:28,fontWeight:800,textAlign:'center'}},data.home_name)),
          h('div',{style:{display:'flex',flexDirection:'column',alignItems:'center'}},h('span',{style:{fontSize:22,color:'#938B81'}},'Kilitli tahmin'),h('span',{style:{fontSize:72,fontWeight:900}},`${data.prediction_home}–${data.prediction_away}`)),
          h('div',{style:{display:'flex',width:270,flexDirection:'column',alignItems:'center',gap:12}},h(Badge,{code:data.away_code,brand:data.away_brand}),h('span',{style:{fontSize:28,fontWeight:800,textAlign:'center'}},data.away_name))),
        h('div',{style:{display:'flex',flexDirection:'column',border:'2px solid #E5DDD2',borderRadius:24,overflow:'hidden',background:'#FCFAF6'}},
          h('div',{style:panel},h('span',{style:{fontSize:26,fontWeight:800,color:'#57452D'}},'Topluluk ne diyor?'),h('span',{style:{fontSize:22,color:'#938B81',marginTop:7}},community?`%${community[0]} · %${community[1]} · %${community[2]}`:`${data.community?.count||0}/10 tahmin · Dağılım 10 tahminde açılır.`)),
          h('div',{style:panel},h('span',{style:{fontSize:26,fontWeight:800,color:'#57452D'}},'Veri modeli ne diyor?'),h(Percentages,{value:data.model})),
          h('div',{style:{...panel,borderBottom:'none'}},h('span',{style:{fontSize:26,fontWeight:800,color:'#57452D'}},'Oranlar ne diyor?'),h(Percentages,{value:data.odds}))),
        h('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:24}},
          h('div',{style:{display:'flex',flexDirection:'column',background:'#F0ECE6',borderRadius:18,padding:'14px 28px',alignItems:'center'}},h('span',{style:{fontSize:24,fontWeight:800,color:'#655B50'}},'Tahmin kilitli'),h('span',{style:{fontSize:19,color:'#655B50',marginTop:5}},trDate(data.locked_at))),
          h('span',{style:{fontSize:26,fontWeight:900,color:'#855800'}},'Sen de katıl →'))));
    return new ImageResponse(card,{width:1200,height:1200});
  }catch{return new Response('Preview unavailable',{status:502});}
}

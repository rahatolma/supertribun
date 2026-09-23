/* oxlint-disable react/only-export-components */
import React from 'react';
import { ImageResponse } from '@vercel/og';
import { fetchShareData, shareId, trDate } from './_share-data.js';

export const config={runtime:'edge'};
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
  return <div style={{display:'flex',position:'relative',width:92,height:92,borderRadius:25,background:colors.background,border:'2px solid #18171618',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
    <span style={{fontSize:38,fontWeight:900,color:badgeTextColor(colors.background)}}>{code}</span>
    <div style={{display:'flex',position:'absolute',left:0,right:0,bottom:0,height:10,background:colors.accent}}/>
  </div>;
}
function Percentages({value}){
  if(!value?.percent)return <span style={{color:'#938B81',fontSize:23}}>Kaynak verisi bekleniyor.</span>;
  return <div style={{display:'flex',gap:12,marginTop:10}}>{value.percent.map((number,index)=><div key={index} style={{display:'flex',flex:1,justifyContent:'center',padding:'10px 6px',borderRadius:14,fontSize:26,fontWeight:800,background:['#FFF0BE','#E9E6E1','#FBE3E9'][index],color:'#181716'}}>%{number}</div>)}</div>;
}

export default async function handler(request){
  try{
    const url=new URL(request.url),id=shareId(url.searchParams.get('id'));
    if(!id)return new Response('Not found',{status:404});
    const data=await fetchShareData(id);
    const community=data.community?.count>=10?[data.community.home,data.community.draw,data.community.away].map(value=>Math.round(value/data.community.count*100)):null;
    return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',background:'#F7F4EF',padding:54,fontFamily:'Arial',color:'#181716'}}>
      <img src={`${url.origin}/logo.png`} width="374" height="100" style={{objectFit:'contain',objectPosition:'left center',marginBottom:22}}/>
      <div style={{display:'flex',flex:1,flexDirection:'column',background:'#FFF',border:'2px solid #D8D1C8',borderRadius:36,padding:34}}>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:25,fontWeight:800,color:'#855800'}}><span>{data.league}</span><span style={{color:'#777067',fontWeight:500}}>{trDate(data.kickoff_at)}</span></div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'34px 20px 30px'}}>
          <div style={{display:'flex',width:270,flexDirection:'column',alignItems:'center',gap:12}}><Badge code={data.home_code} brand={data.home_brand}/><span style={{fontSize:28,fontWeight:800,textAlign:'center'}}>{data.home_name}</span></div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}><span style={{fontSize:22,color:'#938B81'}}>Kilitli tahmin</span><span style={{fontSize:72,fontWeight:900}}>{data.prediction_home}–{data.prediction_away}</span></div>
          <div style={{display:'flex',width:270,flexDirection:'column',alignItems:'center',gap:12}}><Badge code={data.away_code} brand={data.away_brand}/><span style={{fontSize:28,fontWeight:800,textAlign:'center'}}>{data.away_name}</span></div>
        </div>
        <div style={{display:'flex',flexDirection:'column',border:'2px solid #E5DDD2',borderRadius:24,overflow:'hidden',background:'#FCFAF6'}}>
          <div style={panel}><span style={{fontSize:26,fontWeight:800,color:'#57452D'}}>Topluluk ne diyor?</span><span style={{fontSize:22,color:'#938B81',marginTop:7}}>{community?`%${community[0]} · %${community[1]} · %${community[2]}`:`${data.community?.count||0}/10 tahmin · Dağılım 10 tahminde açılır.`}</span></div>
          <div style={panel}><span style={{fontSize:26,fontWeight:800,color:'#57452D'}}>Veri modeli ne diyor?</span><Percentages value={data.model}/></div>
          <div style={{...panel,borderBottom:'none'}}><span style={{fontSize:26,fontWeight:800,color:'#57452D'}}>Oranlar ne diyor?</span><Percentages value={data.odds}/></div>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:24}}>
          <div style={{display:'flex',flexDirection:'column',background:'#F0ECE6',borderRadius:18,padding:'14px 28px',alignItems:'center'}}><span style={{fontSize:24,fontWeight:800,color:'#655B50'}}>Tahmin kilitli</span><span style={{fontSize:19,color:'#655B50',marginTop:5}}>{trDate(data.locked_at)}</span></div>
          <span style={{fontSize:26,fontWeight:900,color:'#855800'}}>Sen de katıl →</span>
        </div>
      </div>
    </div>,{width:1200,height:1200,headers:{'Cache-Control':'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'}});
  }catch{return new Response('Preview unavailable',{status:502});}
}

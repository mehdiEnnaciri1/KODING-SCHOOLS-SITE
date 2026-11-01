"use client";

import { useState } from "react";
import s from "./data-lab.module.css";

const samples=[{month:'Jan.',value:24},{month:'Fév.',value:38},{month:'Mars',value:31},{month:'Avr.',value:56},{month:'Mai',value:47}];
export function DataLab() {
  const [mode,setMode]=useState<'bars'|'line'>('bars');
  return <div className={s.lab}>
    <div className={s.heading}><span>Collecter. Représenter. Comprendre.</span><span className={s.dot} aria-hidden="true" /></div>
    <h4>Les données<br />prennent forme.</h4>
    <div className={s.plotHeading}><span>Livres empruntés</span><div aria-label="Type de graphique"><button aria-pressed={mode==='bars'} onClick={()=>setMode('bars')}>Barres</button><button aria-pressed={mode==='line'} onClick={()=>setMode('line')}>Courbe</button></div></div>
    <div className={s.chart} role="img" aria-label="Exemple fictif de livres empruntés : janvier 24, février 38, mars 31, avril 56, mai 47.">
      <div className={s.ticks} aria-hidden="true"><span>60</span><span>40</span><span>20</span><span>0</span></div>
      <div className={s.plot} data-mode={mode} aria-hidden="true">
        <div className={s.grid}><i/><i/><i/><i/></div>
        <div className={s.bars}>{samples.map((sample,i)=><div key={sample.month} className={s.column}><div className={s.bar} style={{height:`${sample.value/60*100}%`}} data-highlight={i===3}><span>{sample.value}</span></div><small>{sample.month}</small></div>)}</div>
        {mode==='line'&&<svg className={s.line} viewBox="0 0 500 240" preserveAspectRatio="none"><path d="M50 144L150 88L250 116L350 16L450 52L450 240H50Z" fill="#00939014"/><path d="M50 144L150 88L250 116L350 16L450 52" fill="none" stroke="#009390" strokeWidth="3" vectorEffect="non-scaling-stroke"/>{samples.map((x,i)=><circle key={x.month} cx={50+i*100} cy={240-x.value*4} r="5" fill={i===3?'#f7941d':'#167d83'}/>)}</svg>}
      </div>
    </div>
    <p>D’un tableau à un graphique, les élèves apprennent à lire et comparer des données.</p><small>Données fictives pour cette démonstration.</small>
  </div>;
}

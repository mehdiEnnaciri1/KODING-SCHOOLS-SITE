"use client";

import { useState } from "react";
import { curriculumModules, domains } from "@/domain/refonte/content";
import { CurriculumPath } from "./curriculum-path";
import { SiteHeader, SiteFooter } from "./site-navigation";
import { useHomeVersion } from "./home-version";
import base from "./koding-home.module.css";
import s from "./curriculum-explorer.module.css";

export function CurriculumExplorer() {
  const [level,setLevel]=useState(0);
  const { version, homeHref } = useHomeVersion();
  return <div className={base.site} data-version={version}>
    <SiteHeader/>
    <main id="contenu">
      <CurriculumPath level={level} onLevelChange={setLevel} />
      <div className={s.main}>
      <section key={level} id="level-programme" className={s.curriculum} role="tabpanel" aria-labelledby={`level-tab-${level}`} tabIndex={0}><div className={s.levelTitle}><h2 id="level-title">{curriculumModules[0].progression[level].level}</h2><span>{level<6?'Primaire':level<9?'Collège':'Première année du lycée'}</span></div><div className={s.subjects}>{curriculumModules.map((subject,i)=><article key={subject.label} style={{'--subject-color':['#167d83','#d78323','#a05161','#466ea1','#123a3d'][i]} as React.CSSProperties}><h3>{domains[i].name}</h3><p>{subject.progression[level].title}</p></article>)}</div></section>
      <div className={s.actions}><a href="/refonte/programme-cible.csv" download>Télécharger le curriculum · CSV <span aria-hidden="true">↓</span></a><a href="https://kodingschools.com/fr/contact-consulting/">Échanger sur le programme de mon école <span aria-hidden="true">↗</span></a></div>
      <aside className={s.adapted}><h2>Votre école peut rejoindre<br/>le programme à tout niveau.</h2><div><p>Un positionnement initial permet de choisir un programme transitoire adapté à l’âge et aux acquis des élèves. Des collégiens débutants suivent ainsi un parcours pensé pour eux.</p><p>Les programmes se différencient progressivement, généralement sur quatre à cinq ans, pour rejoindre le curriculum cible.</p><a href={`${homeHref}#ecoles`}>Comprendre le déploiement dans l’école</a></div></aside>
      </div>
    </main><SiteFooter/>
  </div>;
}

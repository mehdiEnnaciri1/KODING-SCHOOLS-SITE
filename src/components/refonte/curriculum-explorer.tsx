"use client";

import { useState } from "react";
import { curriculumModules, domains } from "@/domain/refonte/content";
import { CurriculumPath } from "./curriculum-path";
import { SiteHeader, SiteFooter } from "./site-navigation";
import { useHomeVersion } from "./home-version";
import { S, st } from "./page-kit";
import base from "./koding-home.module.css";
import s from "./curriculum-explorer.module.css";

const cycles = [
  { name: "Primaire", levels: "1AP → 6AP", description: "Les élèves découvrent les outils numériques et apprennent à construire leur raisonnement, avec des activités visuelles et des projets adaptés à leur âge.", rhythm: "Environ 1 h par semaine" },
  { name: "Collège", levels: "1AC → 3AC", description: "Les projets se complexifient : programmation, données, création et esprit critique. Les élèves relient les concepts et mobilisent leurs acquis.", rhythm: "Environ 1 h 30 par semaine" },
  { name: "Lycée", levels: "Tronc commun", description: "La première année du lycée poursuit le parcours avec la programmation, les bases de données, la création d’interfaces et la data science.", rhythm: "Un rythme à organiser avec l’école" },
] as const;

export function CurriculumExplorer() {
  const [level,setLevel]=useState(0);
  const { version } = useHomeVersion();
  return <div className={base.site} data-version={version}>
    <SiteHeader/>
    <main id="contenu">
      <CurriculumPath level={level} onLevelChange={setLevel} />
      <div className={s.main}>
      <section key={level} id="level-programme" className={s.curriculum} role="tabpanel" aria-labelledby={`level-tab-${level}`} tabIndex={0}><div className={s.levelTitle}><h2 id="level-title">{curriculumModules[0].progression[level].level}</h2><span>{level<6?'Primaire':level<9?'Collège':'Première année du lycée'}</span></div><div className={s.subjects}>{curriculumModules.map((subject,i)=><article key={subject.label} style={{'--subject-color':['#167d83','#d78323','#a05161','#466ea1','#123a3d'][i]} as React.CSSProperties}><h3>{domains[i].name}</h3><p>{subject.progression[level].title}</p></article>)}</div></section>
      <div className={s.actions}><a href="/refonte/programme-cible.csv" download>Télécharger le curriculum · CSV <span aria-hidden="true">↓</span></a><a href="/contact?profil=ecole">Échanger sur le programme de mon école <span aria-hidden="true">↗</span></a></div>
      </div>
      <section style={st("background:#ffffff")}>
        <div style={{ ...S.wrap, ...st("padding:96px 24px;display:flex;flex-direction:column;gap:48px") }}>
          <h2 style={S.h2}>Trois cycles, une progression.</h2>
          <div style={st("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:32px")}>
            {cycles.map(c => <article key={c.name} style={st("display:flex;flex-direction:column;gap:12px;padding-top:24px;border-top:2px solid #3eccc5")}>
              <span style={st("font-size:13px;font-weight:500;color:#00716f")}>{c.levels}</span>
              <h3 style={st("margin:0;font-size:24px;line-height:32px;font-weight:700")}>{c.name}</h3>
              <p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>{c.description}</p>
              <p style={st("margin:0;font-size:14px;line-height:22px;font-weight:500")}>{c.rhythm}</p>
            </article>)}
          </div>
          <div style={st("background:#f0fffe;border-radius:28px;padding:40px;display:flex;flex-direction:column;gap:12px")}>
            <h3 style={st("margin:0;font-size:24px;line-height:32px;font-weight:700")}>Vos élèves n’ont jamais fait d’informatique ?</h3>
            <p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365;max-width:70ch")}>Un positionnement initial permet de choisir le bon point de départ. Des programmes transitoires regroupent au début les niveaux qui ont des acquis proches, puis se différencient progressivement pour rejoindre le programme cible.</p>
          </div>
        </div>
      </section>
      <section style={st("background:#0e2526;color:#ffffff")}>
        <div style={{ ...S.wrap, ...st("padding:80px 24px;display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap") }}>
          <div style={st("max-width:640px;display:flex;flex-direction:column;gap:12px")}>
            <h2 style={{ ...S.h2, color: "#ffffff" }}>Le programme dans votre école.</h2>
            <p style={S.leadDark}>Déploiement, formation, équipement et rythme : les réponses pour les directeurs d’école.</p>
          </div>
          <div style={st("display:flex;gap:16px;flex-wrap:wrap")}>
            <a href="/ecoles" style={{ ...S.ghost, color: "#ffffff", borderColor: "#ffffff" }}>Pour les écoles →</a>
            <a href="/contact?profil=ecole" style={S.orange}>Demander une démo →</a>
          </div>
        </div>
      </section>
    </main><SiteFooter/>
  </div>;
}

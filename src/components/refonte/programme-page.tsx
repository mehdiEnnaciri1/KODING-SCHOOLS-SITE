"use client";

import { useEffect, useRef, useState } from "react";
import { Frame, S, st } from "./page-kit";
import v from "./programme-page.module.css";

const LEVELS = ["1AP", "2AP", "3AP", "4AP", "5AP", "6AP", "1AC", "2AC", "3AC", "Tronc commun"];
const DOMAINS = [["01", "Algorithmie & programmation"], ["02", "Technologie"], ["03", "Citoyenneté digitale"], ["04", "Bureautique & médias"], ["05", "Information & data"]] as const;
const PROG: readonly (readonly string[])[] = [["Algorithmes séquentiels & répétitions avec Scratch Jr","Répétitions & événements (Blockly et Scratch)","Autres boucles et imbrications (Blockly, Scratch et robotique)","Conditions (Blockly, robotique et électronique)","Variables et fonctions (robotique et électronique)","Web (HTML/CSS), introduction aux flowcharts et à Python","Python avancé avec IA, JavaScript","SQL, application mobile","Application mobile avec IA, programmation orientée objet 1","PHP, programmation orientée objet 2"],["La technologie autour de nous","Ordinateurs","Intelligence artificielle","Réseaux","Internet","Histoire de l’informatique & réseaux avancés","Intelligence artificielle avancée","Introduction aux bases du codage informatique","Cryptographie","Systèmes d’exploitation"],["Technologie & émotions, l’équilibre des médias, les feux de circulation sur Internet","Donnons du crédit (citer les sources), communauté en ligne, pistes numériques, la méchanceté en ligne","La recherche sur Internet, protéger son mot de passe, mon empreinte numérique, le pouvoir des mots","Mes choix de médias, informations privées et personnelles, super citoyen numérique, droits et responsabilités d’un créateur","Trouver l’équilibre dans un monde numérique, éviter le clickbait, stéréotypes de genre en ligne, les actualités en ligne","Habitudes technologiques positives, se protéger du phishing, chatter en toute sécurité, trouver des actualités crédibles","Qui es-tu en ligne ?, ma vie sur les réseaux sociaux, agir contre la cyberintimidation, comprendre les biais de l’IA","L’éthique de l’IA, le big data et nous, discussion et signaux d’alarme, les médias numériques et votre cerveau","Comprendre le business model des entreprises, l’utilisation équitable en tant que créateur, protéger sa réputation en ligne","Réseaux sociaux et émotions, risques des nouvelles technologies, lutter contre les discours haineux, le biais de confirmation"],["Musique digitale","Peinture digitale","Publication et design avec IA","Traitement de texte avec IA","Compétences en présentation avec IA","Création de page web avec IA","Production audio avec IA","Production vidéo avec IA","Modélisation 3D avec IA","UX/UI design et prototypage (Figma)"],["Données, groupes & représentation de l’information","Arbres et branches","Collecter et visualiser les données","Bases de données","Introduction aux feuilles de calcul","Excel : les fonctions de base","Excel avancé : les autres fonctions","Excel avancé : tableau croisé dynamique","Data science","Modélisation (MCD/MER)"]];

const STAGES = [
  ["Primaire", "1AP → 6AP", "Les élèves découvrent les outils numériques et apprennent à construire leur raisonnement, avec des activités visuelles et des projets adaptés à leur âge.", "Environ 1 h par semaine"],
  ["Collège", "1AC → 3AC", "Les projets se complexifient : programmation, données, création et esprit critique. Les élèves relient les concepts et mobilisent leurs acquis.", "Environ 1 h 30 par semaine"],
  ["Lycée", "Tronc commun", "La première année du lycée poursuit le parcours avec la programmation, les bases de données, la création d’interfaces et la data science.", "Un rythme à organiser avec l’école"],
] as const;

export function ProgrammePage() {
  const [level, setLevel] = useState(3);
  const [seen, setSeen] = useState(false);
  const cycles = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = cycles.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setSeen(true); observer.disconnect(); } }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const cycle = level < 6 ? "Primaire" : level < 9 ? "Collège" : "Lycée";
  return <Frame>
    <section style={st("background:#0e2526;color:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:80px 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:48px;align-items:center") }}>
        <div style={st("display:flex;flex-direction:column;gap:20px")}>
          <p style={S.eyebrowDark}>Du primaire à la première année du lycée</p>
          <h1 style={{ ...S.h1, color: "#ffffff" }}>Le curriculum cible, niveau par niveau.</h1>
          <p style={{ ...S.leadDark, maxWidth: 560 }}>10 niveaux disponibles, en français et en anglais. Choisissez un niveau pour découvrir les cinq domaines enseignés.</p>
        </div>
        <div className={v.kobotHost}>
          <span className={v.kobotShadow} aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={v.kobot} src="/charte/kobot/kobot-learning.png" alt="Kobot devant un ordinateur" draggable={false} />
        </div>
      </div>
    </section>

    <section id="niveaux" style={st("background:#f0fffe")}>
      <div style={{ ...S.wrap, ...st("padding:80px 24px;display:flex;flex-direction:column;gap:32px") }}>
        <div role="tablist" aria-label="Choisir un niveau scolaire" style={st("display:flex;flex-wrap:wrap;gap:8px")}>
          {LEVELS.map((code, i) => <button key={code} type="button" role="tab" aria-selected={i === level} onClick={() => setLevel(i)} className={v.tab} style={{ ...st("min-height:48px;padding:10px 20px;border-radius:999px;color:#0e2526;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit"), border: `1.5px solid ${i === level ? "#3eccc5" : "#cfe3e1"}`, background: i === level ? "#3eccc5" : "#ffffff" }}>{code}</button>)}
        </div>
        <div style={st("display:flex;align-items:baseline;gap:16px;flex-wrap:wrap")}>
          <h2 key={level} className={v.swap} style={st("margin:0;font-size:36px;line-height:44px;font-weight:700")}>{LEVELS[level]}</h2>
          <span style={st("font-size:16px;font-weight:500;color:#4a6365")}>{cycle}</span>
        </div>
        <ul key={level} style={st("list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:24px")}>
          {DOMAINS.map(([code, domain], d) => <li key={code} className={`${v.card} ${v.swap}`} style={{ ...st("background:#ffffff;border:1px solid #cfe3e1;border-radius:28px;padding:28px;display:flex;flex-direction:column;gap:12px"), animationDelay: `${d * 60}ms` }}>
            <span style={st("font-size:13px;font-weight:500;color:#00716f")}>{code}</span>
            <h3 style={st("margin:0;font-size:20px;line-height:28px;font-weight:700")}>{domain}</h3>
            <p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>{PROG[d][level]}</p>
          </li>)}
        </ul>
        <p style={st("margin:0;font-size:14px;line-height:22px;color:#4a6365")}>D’après le curriculum cible Koding Schools.</p>
      </div>
    </section>

    <section ref={cycles} className={seen ? v.on : undefined} style={st("background:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:96px 24px;display:flex;flex-direction:column;gap:48px") }}>
        <h2 className={v.reveal} style={S.h2}>Trois cycles, une progression.</h2>
        <div style={st("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:32px")}>
          {STAGES.map(([name, levels, description, rhythm], i) => <article key={name} className={v.reveal} style={{ ...st("display:flex;flex-direction:column;gap:12px;padding-top:24px;border-top:2px solid #3eccc5"), animationDelay: `${0.15 + i * 0.15}s` }}>
            <span style={st("font-size:13px;font-weight:500;color:#00716f")}>{levels}</span>
            <h3 style={st("margin:0;font-size:24px;line-height:32px;font-weight:700")}>{name}</h3>
            <p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>{description}</p>
            <p style={st("margin:0;font-size:14px;line-height:22px;font-weight:500")}>{rhythm}</p>
          </article>)}
        </div>
        <div className={v.reveal} style={{ ...st("background:#f0fffe;border-radius:28px;padding:40px;display:flex;flex-direction:column;gap:12px"), animationDelay: "0.6s" }}>
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
          <a href="/ecoles" style={st("color:#ffffff;font-weight:700;font-size:16px;border:1.5px solid #ffffff;border-radius:999px;padding:14px 26px;text-decoration:none;white-space:nowrap")}>Pour les écoles →</a>
          <a href="/contact?profil=ecole" style={S.orange}>Demander une démo →</a>
        </div>
      </div>
    </section>
  </Frame>;
}

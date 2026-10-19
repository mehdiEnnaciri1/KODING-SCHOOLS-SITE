"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import layout from "./koding-home.module.css";
import s from "./offer-system.module.css";

const offers = [
  {
    title: "Un programme structuré",
    description: "Dix niveaux et cinq domaines, de la première année primaire au lycée.",
  },
  {
    title: "Une plateforme pédagogique",
    description: "Les ressources du professeur, les activités des élèves et le suivi au même endroit.",
  },
  {
    title: "Des enseignants formés",
    description: "Une démonstration au lancement, puis des guides et des vidéos pour préparer les cours.",
  },
] as const;

function ProgrammeVisual() {
  return <div className={s.programmeVisual}>
    <div className={s.visualTop}><span>Le parcours</span><span>01 / 03</span></div>
    <div className={s.bigNumber}><strong>10</strong><span>niveaux<br />disponibles</span></div>
    <div className={s.levelTrack} aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index} style={{ "--tick": index } as CSSProperties} />)}</div>
    <div className={s.levelLabels}><span>1re année primaire</span><span>Tronc commun</span></div>
    <p>Le point de départ tient compte des acquis de vos élèves.</p>
  </div>;
}

function PlatformVisual() {
  return <div className={s.platformVisual}>
    <div className={s.visualTop}><span>Dans la plateforme</span><span>02 / 03</span></div>
    <h3>Une séance,<br />tous ses supports.</h3>
    <div className={s.sessionMap}>
      <div><span>01</span><strong>Préparer</strong><small>Vidéo · script</small></div>
      <div><span>02</span><strong>Animer</strong><small>Slides en classe</small></div>
      <div><span>03</span><strong>Pratiquer</strong><small>Exercices · quiz</small></div>
      <div><span>04</span><strong>Consolider</strong><small>Cahier · suivi</small></div>
    </div>
  </div>;
}

function TeacherVisual() {
  return <div className={s.teacherVisual}>
    <div className={s.visualTop}><span>La prise en main</span><span>03 / 03</span></div>
    <h3>Les enseignants<br />peuvent démarrer.</h3>
    <div className={s.teacherSteps}>
      <div><span>01</span><strong>Démonstration de lancement</strong><small>Administration et enseignants</small></div>
      <div><span>02</span><strong>Guides pratiques</strong><small>Pour les premiers pas</small></div>
      <div><span>03</span><strong>Vidéos de préparation</strong><small>Avant chaque cours</small></div>
    </div>
  </div>;
}

export function OfferSystem() {
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.18 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <section ref={section} id="dispositif" className={`${layout.wrap} ${s.section}`} data-visible={visible} aria-labelledby="intro-title">
    <div className={s.copy}>
      <p className={s.overline}>Pour votre établissement</p>
      <h2 id="intro-title">Un programme complet,<br />prêt à être enseigné.</h2>
      <div className={s.choices} role="group" aria-label="Les trois composantes de Koding Schools">
        {offers.map((offer, index) => <button type="button" key={offer.title} className={s.choice} data-active={active === index} aria-pressed={active === index} aria-controls="offer-preview" style={{ "--index": index } as CSSProperties} onClick={() => setActive(index)} onPointerEnter={event => { if (event.pointerType === "mouse") setActive(index); }}>
          <span className={s.number}>0{index + 1}</span><span className={s.choiceText}><strong>{offer.title}</strong><small>{offer.description}</small></span><span className={s.choiceArrow} aria-hidden="true">↗</span>
        </button>)}
      </div>
    </div>
    <div className={s.visualFrame} id="offer-preview" role="region" aria-label={`Aperçu : ${offers[active].title}`} aria-live="polite">
      <div className={s.visual} key={active}>{active === 0 ? <ProgrammeVisual /> : active === 1 ? <PlatformVisual /> : <TeacherVisual />}</div>
    </div>
  </section>;
}

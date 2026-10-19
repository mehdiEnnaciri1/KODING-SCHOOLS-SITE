"use client";

import { useEffect, useRef, useState } from "react";
import s from "./school-deployment.module.css";

const steps = [
  { title: "Positionner", text: "Les élèves, pour choisir un programme adapté à leurs acquis." },
  { title: "Former", text: "L’administrateur et les enseignants à la prise en main de la plateforme." },
  { title: "Configurer", text: "Les classes, les comptes enseignants et les comptes élèves." },
  { title: "Activer les comptes", text: "Et démarrer les séances." },
] as const;

function EquipmentIcon({ kind }: { kind: "computer" | "projector" | "internet" }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "computer" ? <><rect x="3" y="3" width="18" height="13" rx="2" /><path d="M12 16v5m-4 0h8" /></> : kind === "projector" ? <><path d="M3 4h18M5 4v12h14V4M12 16v5m-4 0 4-3 4 3" /><path d="m10 8 5 3-5 3Z" /></> : <><path d="M3 8a14 14 0 0 1 18 0M6 12a9 9 0 0 1 12 0m-9 4a4 4 0 0 1 6 0" /><circle cx="12" cy="20" r=".7" fill="currentColor" /></>}
  </svg>;
}

export function SchoolDeployment({ onContact }: { onContact: () => void }) {
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <section id="ecoles" className={s.section} ref={section} data-visible={visible} aria-labelledby="deployment-title">
    <div className={s.inner}>
      <header className={s.heading}><h2 id="deployment-title">Le déploiement dans votre école<span>.</span></h2></header>
      <ol className={s.timeline} aria-label="Les quatre étapes du déploiement">
        {steps.map((step, index) => <li className={s.step} key={step.title}>
          <span className={s.marker} aria-hidden="true">0{index + 1}</span>
          <div className={s.copy}><h3>{step.title}</h3><p>{step.text}</p></div>
        </li>)}
      </ol>
      <div className={s.bottom}>
        <div className={s.equipment}>
          <p className={s.equipmentTitle}>À prévoir en classe</p>
          <ul><li><EquipmentIcon kind="computer" />Ordinateurs</li><li><EquipmentIcon kind="projector" />Vidéoprojecteur</li><li><EquipmentIcon kind="internet" />Connexion Internet</li></ul>
          <p className={s.homeNote}>Pas d’ordinateur requis à la maison.</p>
        </div>
        <button className={s.contact} onClick={onContact}>Parlons de votre école <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></button>
      </div>
    </div>
  </section>;
}

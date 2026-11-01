"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { curriculumModules } from "@/domain/refonte/content";
import { useHomeVersion } from "./home-version";
import s from "./curriculum-path.module.css";

const route = "M50 112 H150 Q190 112 220 94 H250 H350 Q390 94 420 76 H450 H550 Q590 76 620 58 H650 H750 Q790 58 820 40 H850 Q890 40 920 22 H950";
const levels = curriculumModules[0].progression;

export function CurriculumPath({ level, onLevelChange }: { level: number; onLevelChange: (level: number) => void }) {
  const { version } = useHomeVersion();
  const [entered, setEntered] = useState(false);
  const section = useRef<HTMLElement>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setEntered(true); observer.disconnect(); }
    }, { threshold: 0.18 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function navigate(index: number, key: string) {
    const next = key === "ArrowRight" ? (index + 1) % 10 : key === "ArrowLeft" ? (index + 9) % 10 : key === "Home" ? 0 : key === "End" ? 9 : null;
    if (next !== null) { onLevelChange(next); tabs.current[next]?.focus(); }
  }

  return <header ref={section} className={`${s.section} ${version === "v2" ? s.v2 : ""}`} data-entered={entered}>
    <div className={s.inner}>
      {version === "v2" && <Image className={s.companion} src="/charte/kobot/kobot-learning.png" width={280} height={280} alt="" aria-hidden="true" />}
      <div className={s.heading}>
        <p>{version === "v2" ? "Du primaire à la première année du lycée" : "Du primaire au lycée"}</p><h1>Le curriculum cible,<br />niveau par niveau.</h1>
        <span>10 niveaux disponibles <i aria-hidden="true">·</i> Français & anglais</span>
        <p className={s.instruction}>Choisissez un niveau pour découvrir les cinq domaines enseignés.</p>
      </div>
      <div className={s.route}>
        <div className={s.rail} role="tablist" aria-label="Choisir un niveau scolaire">
          <svg className={s.routeLine} viewBox="0 0 1000 130" preserveAspectRatio="none" aria-hidden="true"><path className={s.baseLine} d={route} pathLength="1" /><path className={s.drawLine} d={route} pathLength="1" /></svg>
          {levels.map((item, index) => <button key={item.level} ref={node => { tabs.current[index] = node; }} className={s.stop} role="tab" id={`level-tab-${index}`} aria-label={item.level} aria-selected={level === index} aria-controls="level-programme" tabIndex={level === index ? 0 : -1} style={{ "--rise": [0, 0, 18, 18, 36, 36, 54, 54, 72, 90][index], "--index": index } as CSSProperties} onClick={() => onLevelChange(index)} onKeyDown={event => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) { event.preventDefault(); navigate(index, event.key); } }}><span>{index === 9 ? "TC" : item.level}</span><i aria-hidden="true" /></button>)}
        </div>
        <div className={s.cycles} aria-hidden="true"><span>Primaire</span><span>Collège</span><span>Lycée</span></div>
      </div>
    </div>
  </header>;
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { schoolTestimony as testimony } from "@/domain/refonte/testimony";
import s from "./school-testimony.module.css";

export function SchoolTestimony() {
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <section id="temoignage" className={s.section} ref={section} data-visible={visible} aria-labelledby="testimony-title">
    <div className={s.inner}>
      <header className={s.heading}><p>La parole aux écoles</p><h2 id="testimony-title">À l’école Planet Montessori<span>.</span></h2></header>
      <div className={s.story}>
        <div className={s.media}>
          <a className={s.poster} href={testimony.video} target="_blank" rel="noreferrer" aria-label="Voir le témoignage de Planet Montessori sur YouTube, dans un nouvel onglet">
            <Image src={testimony.image} width={820} height={475} unoptimized alt="Oumayma, enseignante d’informatique à Planet Montessori, témoigne dans sa salle de classe" />
            <span className={s.watch}><span className={s.play} aria-hidden="true"><svg viewBox="0 0 24 24" width="25" height="25"><path d="m9 5 11 7-11 7Z" fill="currentColor" /></svg></span><span><strong>Voir le témoignage</strong><small>{testimony.duration} · sur YouTube <span aria-hidden="true">↗</span></small></span></span>
          </a>
          <p className={s.mediaCaption}>L’expérience de l’école, racontée par son équipe et ses élèves.</p>
        </div>
        <figure className={s.voice}>
          <span className={s.quoteMark} aria-hidden="true">“</span>
          <blockquote cite={testimony.video}><p>« {testimony.quote} »</p></blockquote>
          <figcaption><strong>{testimony.speaker}</strong><span>{testimony.role}</span><span className={s.school}>{testimony.school}</span></figcaption>
          <p className={s.source}>{testimony.sourceNote}</p>
        </figure>
      </div>
    </div>
  </section>;
}

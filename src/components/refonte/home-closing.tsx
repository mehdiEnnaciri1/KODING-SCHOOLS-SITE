"use client";

import { useEffect, useRef, useState } from "react";
import s from "./home-closing.module.css";

export function HomeClosing({ onPresentation }: { onPresentation: () => void }) {
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!section.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  return <section id="presentation" ref={section} data-visible={visible} className={s.section} aria-labelledby="closing-title">
    <div className={s.inner}>
      <div className={s.copy}><h2 id="closing-title">Découvrez Koding Schools<br /> avec votre équipe<span>.</span></h2><p>Parcourons le programme et les ressources d’une séance, à partir des niveaux et de l’organisation de votre école.</p></div>
      <div className={s.actions}><button type="button" onClick={onPresentation}>Demander une présentation <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></button><a href="/contact?profil=ecole">Ou contactez-nous directement <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>;
}

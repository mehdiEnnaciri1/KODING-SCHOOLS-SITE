"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useHomeVersion } from "./home-version";
import s from "./adapted-path.module.css";

export function AdaptedPath({ illustration }: { illustration?: ReactNode }) {
  const { pageHref } = useHomeVersion();
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <section ref={section} id="curriculum" className={s.section} data-visible={visible} aria-labelledby="adapted-title">
    <div className={s.inner}>
      {illustration ? <div className={s.junction}>{illustration}</div> : <svg viewBox="0 0 100 100" fill="none" className={s.junction} aria-hidden="true"><path d="M4 22H96" /><path className={s.joiningLine} d="M4 78H20C50 78 42 22 76 22H96" pathLength="1" /><circle cx="7" cy="78" r="5"/><circle cx="92" cy="22" r="5"/></svg>}
      <div className={s.copy}><h2 id="adapted-title">Votre école commence aujourd’hui.<br /> Un programme adapté au niveau de vos élèves.</h2><p>Un positionnement initial permet de choisir un programme adapté à leurs acquis, même s’ils n’ont jamais fait d’informatique. La progression rejoint ensuite le programme cible.</p><a href={pageHref("programme")}>Explorez le programme cible complet <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>;
}

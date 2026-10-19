"use client";

import { useEffect, useRef, useState } from "react";
import { useHomeVersion } from "./home-version";
import s from "./partnership-gateway.module.css";

export function PartnershipGateway() {
  const { pageHref } = useHomeVersion();
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!section.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  return <section id="partenariats" ref={section} data-visible={visible} className={s.section} aria-labelledby="partnership-title">
    <div className={s.inner}>
      <div className={s.copy}>
        <p className={s.label}>Partenariats</p>
        <h2 id="partnership-title">Vous portez un projet éducatif ?</h2>
        <p className={s.description}>Fondations, entreprises, acteurs publics : découvrez notre approche et un projet réalisé.</p>
      </div>
      <a className={s.link} href={pageHref("partenariats")}><span>Découvrir<br /> les partenariats</span><span className={s.arrow} aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></span></a>
    </div>
  </section>;
}

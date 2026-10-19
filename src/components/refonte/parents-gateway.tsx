"use client";

import { useEffect, useRef, useState } from "react";
import { LOGIN_URL } from "@/domain/refonte/activation";
import { useHomeVersion } from "./home-version";
import s from "./parents-gateway.module.css";

function Arrow() {
  return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

function ServiceIcon({ name }: { name: "key" | "bookshop" | "help" }) {
  return <svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === "key" ? <><circle cx="11" cy="12" r="7" /><path d="m16 17 12 12m-5-5 4-4m-8 0 4-4" /><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" /></> : name === "bookshop" ? <><path d="M5 14v14h22V14M3 13l3-8h20l3 8M3 13c0 5 6 5 6 0 0 5 7 5 7 0 0 5 7 5 7 0 0 5 6 5 6 0M12 28V18h8v10" /><path d="M3 13h26" /></> : <><path d="M27 15c0 7-5 11-12 11H6l-4 3 2-8a12 12 0 1 1 23-6Z" /><path d="M12 11a4 4 0 1 1 6 3.5c-1.5 1-2 1.5-2 3" /><circle cx="16" cy="21" r=".8" fill="currentColor" stroke="none" /></>}
  </svg>;
}

export function ParentsGateway() {
  const { pageHref } = useHomeVersion();
  const parentsHref = pageHref("parents-licences");
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

  return <section id="parents" ref={section} data-visible={visible} className={s.section} aria-labelledby="parents-title">
    <div className={s.inner}>
      <header className={s.heading}><p>Parents & licences</p><h2 id="parents-title">Parents, c’est par ici<span>.</span></h2><p>Votre école utilise Koding Schools ? Retrouvez les démarches pour votre enfant.</p></header>
      <nav className={s.services} aria-label="Démarches des parents">
        <a className={s.activation} href={`${parentsHref}#activation`} aria-labelledby="parent-activation-title">
          <span className={s.key}><ServiceIcon name="key" /></span>
          <h3 id="parent-activation-title">Activer le compte<br />de mon enfant.</h3>
          <p>Avec ou sans identifiants, suivez le parcours adapté à votre situation.</p>
          <span className={s.start}>Commencer l’activation <span className={s.activationArrow}><Arrow /></span></span>
        </a>
        <div className={s.otherServices}>
          <a href={`${parentsHref}#librairies`} aria-labelledby="parent-bookshop-title"><span className={s.serviceIcon}><ServiceIcon name="bookshop" /></span><div><h3 id="parent-bookshop-title">Trouver une librairie</h3><p>Les points de vente partenaires,<br className={s.desktopBreak} /> près de chez vous ou en ligne.</p></div><span className={s.linkArrow}><Arrow /></span></a>
          <a href={`${parentsHref}#aide`} aria-labelledby="parent-help-title"><span className={s.serviceIcon}><ServiceIcon name="help" /></span><div><h3 id="parent-help-title">Obtenir de l’aide</h3><p>Identifiants, code de licence<br className={s.desktopBreak} /> ou accès au compte.</p></div><span className={s.linkArrow}><Arrow /></span></a>
        </div>
      </nav>
      <div className={s.bottom}><p>Compte déjà activé ? <a href={LOGIN_URL}>Se connecter <span aria-hidden="true">↗</span></a></p><a className={s.all} href={parentsHref}>Tous les repères pour les familles <Arrow /></a></div>
    </div>
  </section>;
}

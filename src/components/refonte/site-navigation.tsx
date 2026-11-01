"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LOGIN_URL } from "@/domain/refonte/activation";
import { Brand } from "./brand";
import { useHomeVersion } from "./home-version";
import s from "./site-navigation.module.css";

const BLOG_URL = "/blog";

function V2SiteHeader() {
  const { homeHref, pageHref } = useHomeVersion();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [programmeOpen, setProgrammeOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const programmeButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const programmeItems = [
    { href: pageHref("programme"), label: "Curriculum cible", detail: "Les dix niveaux et les cinq domaines" },
    { href: `${homeHref}#seance`, label: "Une séance", detail: "Ce que voient les enseignants et les élèves" },
    { href: "/ecoles", label: "Déploiement", detail: "Comment démarrer dans votre école" },
  ];

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) { setOpen(false); setProgrammeOpen(false); }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (open) menuButton.current?.focus();
      else if (programmeOpen) programmeButton.current?.focus();
      setOpen(false);
      setProgrammeOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open, programmeOpen]);

  const close = () => { setOpen(false); setProgrammeOpen(false); };
  return <>
    <a className={s.skip} href="#contenu">Aller au contenu</a>
    <header className={s.header} ref={root}>
      <div className={s.bar}>
        <Brand href={homeHref} />
        <nav className={s.desktop} aria-label="Navigation principale">
          <button ref={programmeButton} onClick={() => setProgrammeOpen(!programmeOpen)} aria-expanded={programmeOpen} aria-controls="programme-navigation">Le programme <span aria-hidden="true">⌄</span></button>
          <a href="/ecoles" aria-current={path === "/ecoles" ? "page" : undefined}>Pour les écoles</a>
          <a href={pageHref("parents-licences")} aria-current={path === pageHref("parents-licences") ? "page" : undefined}>Parents & licences</a>
          <a href={pageHref("partenariats")} aria-current={path === pageHref("partenariats") ? "page" : undefined}>Partenariats</a>
          <a href={BLOG_URL}>Blog</a>
        </nav>
        <div className={s.actions}>
          <span className={s.lang}><strong aria-current="true">FR</strong> / <a href="https://kodingschools.com/en/" hrefLang="en" lang="en">EN</a></span>
          <a className={s.login} href={LOGIN_URL}>Connexion</a>
          <button className={s.menu} ref={menuButton} onClick={() => { setOpen(!open); setProgrammeOpen(false); }} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}><span aria-hidden="true">{open ? "×" : "☰"}</span></button>
        </div>
      </div>
      {programmeOpen && <nav id="programme-navigation" className={s.discovery} aria-label="Découvrir le programme" onClick={close}>
        {programmeItems.map(item => <a key={item.href} href={item.href} aria-current={path === item.href ? "page" : undefined}><strong>{item.label}<span aria-hidden="true">↗</span></strong><span>{item.detail}</span></a>)}
      </nav>}
      {open && <nav id="mobile-navigation" className={s.mobile} aria-label="Navigation mobile" onClick={close}>
        <a className={s.mobileParents} href={pageHref("parents-licences")}>Parents & licences <span>Activer un compte · Trouver une librairie</span></a>
        <span className={s.mobileGroup}>Le programme</span>
        {programmeItems.map(item => <a className={s.mobileSub} key={item.href} href={item.href}>{item.label}</a>)}
        <a href="/ecoles">Pour les écoles</a>
        <a href={pageHref("partenariats")}>Partenariats</a>
        <a href={BLOG_URL}>Blog</a>
        <a href={`${homeHref}#temoignage`}>Témoignages</a>
        <a href={pageHref("qui-sommes-nous")}>Qui sommes-nous ?</a>
        <a href={LOGIN_URL}>Connexion</a>
        <a className={s.mobileContact} href="/contact?profil=ecole">Demander une démo <span aria-hidden="true">↗</span></a>
      </nav>}
    </header>
  </>;
}

function LegacySiteHeader() {
  const { homeHref, pageHref } = useHomeVersion();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [discover, setDiscover] = useState(false);
  const root = useRef<HTMLElement>(null);
  const more = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLButtonElement>(null);
  const discovery = [
    { href: pageHref("qui-sommes-nous"), label: "Qui sommes-nous ?", detail: "Notre mission et notre équipe" },
    { href: pageHref("partenariats"), label: "Partenariats", detail: "Projets éducatifs et collaborations" },
    { href: `${homeHref}#seance`, label: "Enseignants", detail: "Les ressources de chaque séance" },
    { href: `${homeHref}#ressources`, label: "Ressources", detail: "Articles et regards sur l’éducation digitale" },
  ];
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) { setOpen(false); setDiscover(false); } };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { if (open) menu.current?.focus(); else if (discover) more.current?.focus(); setOpen(false); setDiscover(false); } };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open, discover]);
  const close = () => { setOpen(false); setDiscover(false); };
  return <>
    <a className={s.skip} href="#contenu">Aller au contenu</a>
    <header className={s.header} ref={root}>
      <div className={s.bar}>
        <Brand href={homeHref} />
        <nav className={s.desktop} aria-label="Navigation principale">
          <a href={`${homeHref}#programme`}>Programme</a>
          <a href={`${homeHref}#ecoles`}>Établissements</a>
          <a href={`${homeHref}#temoignage`}>Témoignages</a>
          <button ref={more} onClick={() => setDiscover(!discover)} aria-expanded={discover} aria-controls="discover-navigation">Nous connaître <span aria-hidden="true">⌄</span></button>
        </nav>
        <div className={s.actions}>
          <a className={s.parents} href={pageHref("parents-licences")} aria-current={path === pageHref("parents-licences") ? "page" : undefined}>Parents & licences</a>
          <a className={s.contact} href="https://kodingschools.com/fr/contact/">Contactez-nous</a>
          <a className={s.login} href={LOGIN_URL}>Connexion</a>
          <button className={s.menu} ref={menu} onClick={() => { setOpen(!open); setDiscover(false); }} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}><span aria-hidden="true">{open ? "×" : "☰"}</span></button>
        </div>
      </div>
      {discover && <nav id="discover-navigation" className={s.discovery} aria-label="Découvrir Koding Schools" onClick={close}>{discovery.map(item => <a key={item.href} href={item.href} aria-current={path === item.href ? "page" : undefined}><strong>{item.label}<span aria-hidden="true">↗</span></strong><span>{item.detail}</span></a>)}</nav>}
      {open && <nav id="mobile-navigation" className={s.mobile} aria-label="Navigation mobile" onClick={close}><a className={s.mobileParents} href={pageHref("parents-licences")}>Parents & licences <span>Activer un compte · Trouver une librairie</span></a><a href={`${homeHref}#programme`}>Programme</a><a href={`${homeHref}#ecoles`}>Établissements</a><a href={`${homeHref}#temoignage`}>Témoignages</a>{discovery.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}<a className={s.mobileContact} href="https://kodingschools.com/fr/contact/">Contactez-nous <span aria-hidden="true">↗</span></a></nav>}
    </header>
  </>;
}

export function SiteHeader() {
  const { version } = useHomeVersion();
  return version === "v2" ? <V2SiteHeader /> : <LegacySiteHeader />;
}

export { SiteFooter } from "./site-footer";

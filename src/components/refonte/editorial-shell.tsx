"use client";

import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./site-navigation";
import { useHomeVersion } from "./home-version";
import base from "./koding-home.module.css";
import s from "./editorial-pages.module.css";

export function EditorialShell({ children, title }: { children: ReactNode; title: string }) {
  const { version, homeHref } = useHomeVersion();
  return <div className={base.site} data-version={version}><SiteHeader/><main id="contenu" className={s.main}><nav className={s.breadcrumb} aria-label="Fil d’Ariane"><a href={homeHref}>Accueil</a><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>{children}</main><SiteFooter/></div>;
}
export function PageContact({ title, text, href = "/contact?profil=ecole", label = "Contactez-nous" }: { title: string; text: string; href?: string; label?: string }) {
  return <section className={s.contactBand}><div><h2>{title}</h2><p>{text}</p></div><a href={href}>{label} <span aria-hidden="true">↗</span></a></section>;
}

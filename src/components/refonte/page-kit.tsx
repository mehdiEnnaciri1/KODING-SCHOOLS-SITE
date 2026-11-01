"use client";

import type { CSSProperties, ReactNode } from "react";
import { HomeVersionProvider } from "./home-version";
import { SiteFooter, SiteHeader } from "./site-navigation";
import base from "./koding-home.module.css";

// Les maquettes de la charte 2026 sont écrites en styles en ligne : on les reprend à l'identique.
export const st = (css: string) => Object.fromEntries(css.split(";").filter(Boolean).map(d => {
  const i = d.indexOf(":");
  return [d.slice(0, i).trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase()), d.slice(i + 1).trim()];
})) as CSSProperties;

export const S = {
  wrap: st("max-width:1200px;margin:0 auto"),
  eyebrow: st("margin:0;font-size:13px;line-height:16px;font-weight:500;letter-spacing:.04em;color:#00716f"),
  eyebrowDark: st("margin:0;font-size:13px;line-height:16px;font-weight:500;letter-spacing:.04em;color:#3eccc5"),
  h1: st("margin:0;font-size:clamp(34px,5vw,48px);line-height:1.17;font-weight:700;letter-spacing:-.01em;text-wrap:balance"),
  h2: st("margin:0;font-size:36px;line-height:44px;font-weight:700"),
  lead: st("margin:0;font-size:20px;line-height:32px;color:#4a6365"),
  leadDark: st("margin:0;font-size:20px;line-height:32px;color:#d8f5f3"),
  orange: st("background:#ff9c13;color:#0e2526;font-weight:700;font-size:16px;border-radius:999px;padding:16px 28px;text-decoration:none;white-space:nowrap"),
  ghost: st("color:#0e2526;font-weight:700;font-size:16px;border:1.5px solid #4a6365;border-radius:999px;padding:14px 26px;text-decoration:none;white-space:nowrap"),
  ink: st("background:#0e2526;color:#ffffff;font-weight:700;font-size:16px;border-radius:999px;padding:16px 28px;text-decoration:none"),
  link: st("font-weight:700;font-size:16px"),
  kobotShadow: st("height:auto;filter:drop-shadow(0 16px 40px rgba(14,37,38,.14))"),
};

export function Frame({ children }: { children: ReactNode }) {
  return <HomeVersionProvider version="v2"><div className={base.site} data-version="v2"><SiteHeader /><main id="contenu">{children}</main><SiteFooter /></div></HomeVersionProvider>;
}

export function Breadcrumb({ items }: { items: ReactNode }) {
  return <nav aria-label="Fil d’Ariane" style={st("font-size:14px;color:#4a6365")}>{items}</nav>;
}

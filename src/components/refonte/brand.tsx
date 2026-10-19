"use client";

import { useHomeVersion } from "./home-version";
import { CompanionMark } from "./companion-mark";
import s from "./koding-home.module.css";

function Head({ className = "" }: { className?: string }) {
  return <svg className={`${s.brandHead} ${className}`} viewBox="0 0 80 65" fill="none" aria-hidden="true"><path d="m25 24-7-15m37 15 7-15" stroke="#C43C48" strokeWidth="5" /><circle cx="17" cy="8" r="6" fill="#C43C48" /><circle cx="63" cy="8" r="6" fill="#C43C48" /><path d="M7 43C9 22 21 21 40 21s31 1 33 22c2 17-9 19-33 19S5 60 7 43Z" fill="#167D83" /><rect x="17" y="34" width="46" height="19" rx="8" fill="white" /><g className={s.logoEyes}><path d="M25 45q4-9 8 0m14 0q4-9 8 0" stroke="#123A3D" strokeWidth="4" strokeLinecap="round" /></g></svg>;
}
export function Brand({ href = "#accueil" }: { href?: string }) {
  const { version, homeHref } = useHomeVersion();
  return <a className={s.brand} href={href === "/refonte" ? homeHref : href} aria-label="Koding Schools, accueil">{version === "v2" ? <CompanionMark /> : <Head />}<span>Koding<br />Schools<span className={s.brandDot}>.</span></span></a>;
}

"use client";

import { useHomeVersion } from "./home-version";
import s from "./koding-home.module.css";

// Logo principal de la charte 2026 (public/charte/logos). Ne pas recolorer ni étirer.
export function Brand({ href = "#accueil" }: { href?: string }) {
  const { homeHref } = useHomeVersion();
  return <a className={s.brand} href={href === "/refonte" ? homeHref : href} aria-label="Koding Schools, accueil">
    <img className={s.brandLogo} src="/charte/logos/koding-logo-anime.svg" alt="Koding Schools" width={135} height={48} />
  </a>;
}

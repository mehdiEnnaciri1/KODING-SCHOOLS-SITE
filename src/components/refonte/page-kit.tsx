"use client";

import { useEffect, type CSSProperties, type ReactNode } from "react";
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

// Mouvement commun des maquettes : les blocs de chaque section apparaissent en remontant
// quand ils entrent dans l'écran, et les Kobot (hors hero) flottent doucement.
// Les sections marquées data-nomotion gèrent leur propre animation.
export function useSiteMotion(enabled = true) {
  useEffect(() => {
    if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ease = "cubic-bezier(.2,.7,.2,1)";
    let pending: [Element, Animation][] = [];
    const animations: Animation[] = [];
    const start = window.setTimeout(() => {
      document.querySelectorAll("main section").forEach((section, index) => {
        if (index === 0 || section.closest("[data-nomotion]")) return;
        const inner = section.firstElementChild;
        if (!inner) return;
        [...inner.children].forEach((el, k) => {
          if (el.getAnimations().length || (el as HTMLElement).style.transition) return;
          const animation = el.animate([{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "none" }], { duration: 700, delay: Math.min(k, 4) * 90, easing: ease, fill: "backwards" });
          animations.push(animation);
          if (el.getBoundingClientRect().top < window.innerHeight) animation.finish();
          else { animation.pause(); pending.push([el, animation]); }
        });
      });
      document.querySelectorAll<HTMLImageElement>('main img[src*="kobot-"]').forEach(img => {
        if (img.getAnimations().length || img.closest("[data-nomotion]") || img.closest("section") === document.querySelector("main section")) return;
        animations.push(img.animate([{ transform: "translateY(0) rotate(-2deg)" }, { transform: "translateY(-10px) rotate(2deg)" }, { transform: "translateY(0) rotate(-2deg)" }], { duration: 5500, iterations: Infinity, easing: "ease-in-out" }));
      });
      check();
    }, 400);
    function check() {
      pending = pending.filter(([el, animation]) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) { animation.play(); return false; }
        return true;
      });
    }
    const finishAll = () => { pending.forEach(([, animation]) => animation.finish()); pending = []; };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    window.addEventListener("beforeprint", finishAll);
    const fallback = window.setTimeout(() => { if (document.hidden || !document.hasFocus()) finishAll(); }, 2500);
    return () => {
      window.clearTimeout(start); window.clearTimeout(fallback);
      window.removeEventListener("scroll", check); window.removeEventListener("resize", check); window.removeEventListener("beforeprint", finishAll);
      finishAll(); animations.forEach(a => a.cancel());
    };
  }, [enabled]);
}

export function Frame({ children }: { children: ReactNode }) {
  useSiteMotion();
  return <HomeVersionProvider version="v2"><div className={base.site} data-version="v2"><SiteHeader /><main id="contenu">{children}</main><SiteFooter /></div></HomeVersionProvider>;
}

export function Breadcrumb({ items }: { items: ReactNode }) {
  return <nav aria-label="Fil d’Ariane" style={st("font-size:14px;color:#4a6365")}>{items}</nav>;
}

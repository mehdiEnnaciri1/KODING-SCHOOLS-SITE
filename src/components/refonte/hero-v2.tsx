"use client";

import { useEffect, useRef } from "react";
import { S, st } from "./page-kit";
import v from "./hero-v2.module.css";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

// Hero de la maquette : Kobot arrive, flotte, suit le défilement et la souris.
export function HeroV2({ onDemo }: { onDemo: () => void }) {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0, px = 0, py = 0, hover = false;
    const paint = () => {
      frame = 0;
      const portrait = el.querySelector<HTMLElement>("[data-kobot-portrait]");
      if (!portrait) return;
      const box = el.getBoundingClientRect();
      const t = reduced.matches ? 0 : clamp((window.innerHeight * 0.5 - box.top - box.height * 0.5) / (window.innerHeight * 0.65), -1, 1);
      const x = reduced.matches ? 0 : px, y = reduced.matches ? 0 : py, active = hover && !reduced.matches;
      portrait.style.setProperty("--kx", `${t * 24 + x * 25}px`);
      portrait.style.setProperty("--ky", `${t * -68 + y * 18 - (active ? 20 : 0)}px`);
      portrait.style.setProperty("--kt", `${t * 17 + x * 6}deg`);
      portrait.style.setProperty("--kyaw", `${x * 15}deg`);
      portrait.style.setProperty("--kp", `${y * -9}deg`);
      portrait.style.setProperty("--ks", active ? "1.065" : "1");
    };
    const update = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches || event.pointerType === "touch") return;
      hover = true;
      const box = el.getBoundingClientRect();
      px = clamp(((event.clientX - box.left) / box.width) * 2 - 1, -1, 1);
      py = clamp(((event.clientY - box.top) / box.height) * 2 - 1, -1, 1);
      update();
    };
    const leave = () => { px = 0; py = 0; hover = false; update(); };
    el.addEventListener("pointerenter", move); el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    update();
    return () => {
      el.removeEventListener("pointerenter", move); el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", update); window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <section data-screen-label="Hero" data-nomotion aria-labelledby="hero-title" style={st("background:#0e2526;color:#ffffff;overflow:hidden;min-height:calc(100vh - 84px);min-height:calc(100svh - 84px);display:flex;align-items:center")}>
    <div style={st("width:100%;max-width:1200px;margin:0 auto;padding:clamp(32px,6vh,72px) 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:clamp(24px,4vh,48px);align-items:center")}>
      <div style={st("display:flex;flex-direction:column;gap:24px")}>
        <p style={S.eyebrowDark}>Du primaire à la première année du lycée</p>
        <h1 id="hero-title" style={st("margin:0;font-size:clamp(36px,min(5vw,7.5vh),64px);line-height:1.06;font-weight:700;letter-spacing:-.02em;color:#ffffff;text-wrap:balance")}>Le numérique et l’IA, au programme de votre école.</h1>
        <p style={st("margin:0;font-size:20px;line-height:32px;color:#ffffff;max-width:560px;text-wrap:pretty")}>Un programme clé en main, des cours prêts à l’emploi et une plateforme pour aider vos enseignants à faire découvrir le numérique, la programmation et l’IA chaque semaine.</p>
        <div style={st("display:flex;gap:16px;flex-wrap:wrap;align-items:center;margin-top:8px")}>
          <button type="button" className={v.cta} onClick={onDemo} style={{ ...S.orange, border: 0, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", gap: 12, alignItems: "center" }}>Demander une démo <span aria-hidden="true">→</span></button>
          <a href="#seance" className={v.ghost} style={st("color:#ffffff;font-weight:700;font-size:16px;border:1.5px solid #ffffff;border-radius:999px;padding:14px 26px;text-decoration:none;white-space:nowrap;display:inline-flex;gap:10px;align-items:center")}><span aria-hidden="true">▶</span> Explorer une séance</a>
        </div>
        <p style={st("margin:8px 0 0;font-size:14px;line-height:22px;color:#d8f5f3")}>Le programme est disponible en <strong style={st("color:#ffffff;font-weight:700")}>Français / Anglais</strong></p>
      </div>
      <div style={st("position:relative;display:grid;place-items:center;height:min(56vh,480px);min-height:260px")}>
        <div aria-hidden="true" style={st("position:absolute;width:88%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#3eccc5 0%,#3eccc5 30%,rgba(62,204,197,0) 70%);opacity:.55")} />
        <div ref={stage} className={v.stage}>
          <span aria-hidden="true" className={v.shadow} />
          <div data-kobot-portrait className={v.portrait}><div className={v.welcome}><div className={v.float}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={v.img} src="/charte/kobot/kobot-waving.png" alt="Kobot salue les visiteurs" draggable={false} />
          </div></div></div>
        </div>
      </div>
    </div>
  </section>;
}

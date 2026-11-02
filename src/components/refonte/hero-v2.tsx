"use client";

import { S, st } from "./page-kit";
import { KobotHero } from "./kobot-hero";
import v from "./hero-v2.module.css";

// Hero de la maquette : Kobot arrive, flotte, suit le défilement et la souris.
export function HeroV2({ onDemo }: { onDemo: () => void }) {
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
        <KobotHero src="/charte/kobot/kobot-waving.png" alt="Kobot salue les visiteurs" />
      </div>
    </div>
  </section>;
}

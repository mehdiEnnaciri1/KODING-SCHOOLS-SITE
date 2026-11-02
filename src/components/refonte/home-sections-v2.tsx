"use client";

import { useRef } from "react";
import { lessonResources } from "@/domain/refonte/lesson-resources";
import { schoolTestimony as testimony } from "@/domain/refonte/testimony";
import { mediaAppearances, mediaLogos } from "@/domain/refonte/media";
import { S, st } from "./page-kit";
import { useMarquee } from "./use-marquee";
import v from "./home-sections-v2.module.css";

const copy = [
  ["01", "Préparer", "Vidéo & script", "Les notions et le déroulé du cours, avant d’entrer en classe."],
  ["02", "Animer", "Slides à projeter", "Des questions et des exemples pour faire participer les élèves."],
  ["03", "Pratiquer", "Pratique & projets", "Des activités ciblées pour s’entraîner, et surtout des projets pour créer et mobiliser les acquis."],
  ["04", "Consolider", "Cahier de l’élève", "Un cahier papier, imprimable, pour récapituler l’essentiel des cours."],
] as const;

export function ProgrammeStart() {
  return <div style={st("display:flex;align-items:center;gap:32px;flex-wrap:wrap;padding-top:48px;border-top:1px solid #cfe3e1")}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className={v.kobot} src="/charte/kobot/kobot-learning.png" alt="Kobot devant un ordinateur" />
    <div style={st("flex:1 1 420px;display:flex;flex-direction:column;gap:12px")}>
      <h3 style={st("margin:0;font-size:24px;line-height:32px;font-weight:700;color:#0e2526;text-wrap:balance")}>Votre école commence aujourd’hui. Un programme adapté au niveau de vos élèves.</h3>
      <p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365;max-width:65ch")}>Un positionnement initial permet de choisir un programme adapté à leurs acquis, même s’ils n’ont jamais fait d’informatique. La progression rejoint ensuite le programme cible.</p>
      <a href="/refonte-v2/programme" style={S.link}>Explorez le programme cible complet →</a>
    </div>
  </div>;
}

export function SeanceV2() {
  return <section id="seance" style={st("background:#f0fffe")}>
    <div style={{ ...S.wrap, ...st("padding:96px 24px;display:flex;flex-direction:column;gap:48px") }}>
      <div style={st("display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap")}>
        <div style={st("max-width:640px;display:flex;flex-direction:column;gap:12px")}>
          <p style={S.eyebrow}>Du côté des enseignants</p>
          <h2 style={{ ...S.h2, color: "#0e2526" }}>Les ressources de chaque séance.</h2>
          <p style={S.lead}>Un même cours, de sa préparation aux premières réalisations des élèves.</p>
        </div>
        <p style={st("margin:0;font-size:14px;line-height:22px;color:#4a6365")}>À découvrir ici <strong style={st("color:#0e2526;font-weight:700")}>Introduction aux algorithmes &amp; programmes</strong> · Extraits en français</p>
      </div>
      <ol style={st("list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:32px")}>
        {copy.map(([n, title, support, text], i) => <li key={n} className={v.lessonCard} style={st("background:#ffffff;border:1px solid #cfe3e1;border-radius:28px;padding:24px;display:flex;flex-direction:column;gap:16px")}>
          <div style={st("display:flex;align-items:baseline;gap:12px")}><span style={st("font-size:13px;font-weight:500;color:#00716f")}>{n}</span><h3 style={st("margin:0;font-size:24px;line-height:32px;font-weight:700")}>{title}</h3></div>
          <div style={st("aspect-ratio:4/3;border-radius:16px;border:1px solid #cfe3e1;background:#f0fffe;display:grid;place-items:center;overflow:hidden")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/refonte/seance/${lessonResources[i].image}`} alt={lessonResources[i].alt} style={st("max-width:100%;max-height:100%;object-fit:contain;display:block")} />
          </div>
          <div style={st("display:flex;flex-direction:column;gap:6px")}><h4 style={st("margin:0;font-size:16px;line-height:26px;font-weight:700")}>{support}</h4><p style={st("margin:0;font-size:14px;line-height:22px;color:#4a6365")}>{text}</p></div>
        </li>)}
      </ol>
      <a href="https://kodingschools.com/fr/aia-lia-contextuelle-pedagogique-qui-transforme-leducation/" style={st("display:flex;align-items:center;gap:20px;background:#ffffff;border:1px solid #cfe3e1;border-radius:28px;padding:20px 28px;text-decoration:none;color:#0e2526")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/refonte/aia-teacher.png" alt="AIA, l’assistant pédagogique de Koding Schools" style={st("width:64px;height:64px;border-radius:16px;object-fit:cover;flex-shrink:0")} />
        <span style={st("flex:1;display:flex;flex-direction:column;gap:4px")}><strong style={st("font-size:16px;font-weight:700")}>Mais aussi, AIA, votre assistant pédagogique.</strong><span style={st("font-size:14px;line-height:22px;color:#4a6365")}>Pour préparer une séance et adapter une explication au contexte du cours.</span></span>
        <span aria-hidden="true" style={st("font-size:20px;color:#00716f")}>↗</span>
      </a>
    </div>
  </section>;
}

export function PresseV2() {
  const host = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  useMarquee(host, rail, 48, 0.15);
  return <section id="medias" style={st("background:#ffffff")}>
    <div ref={host} style={{ ...S.wrap, ...st("padding:0 24px 96px;display:flex;flex-direction:column;gap:48px") }}>
      <h3 style={st("margin:0;padding-top:48px;border-top:1px solid #cfe3e1;font-size:24px;line-height:32px;font-weight:700;color:#0e2526")}>Ils parlent de Koding Schools.</h3>
      <ul style={st("list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:32px")}>
        {mediaAppearances.map(m => <li key={m.id}>
          <a className={v.pressCard} href={`https://www.youtube.com/watch?v=${m.video}`} target="_blank" rel="noreferrer" style={st("display:flex;flex-direction:column;gap:20px;border:1px solid #cfe3e1;border-radius:28px;padding:28px;text-decoration:none;color:#0e2526;height:100%")}>
            <div style={st("display:flex;justify-content:space-between;align-items:center;gap:16px")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/refonte/logos/${m.logo}`} alt={m.name} style={st("height:44px;width:auto;max-width:120px;object-fit:contain")} />
              <span style={st("font-size:14px;color:#4a6365")}>{m.date}</span>
            </div>
            <div><h3 style={st("margin:0;font-size:24px;line-height:32px;font-weight:700")}>{m.programme}</h3><p style={st("margin:4px 0 0;font-size:16px;line-height:26px;color:#4a6365")}>{m.presenter}</p></div>
            <span style={st("margin-top:auto;font-size:16px;font-weight:700;color:#00716f")}>Voir le passage ↗</span>
          </a>
        </li>)}
      </ul>
      <ul ref={rail} className={v.rail} aria-label="Dans les médias : Koding Schools et nos origines" style={st("list-style:none;margin:0;padding:24px 0 0;border-top:1px solid #cfe3e1;display:flex;gap:72px;align-items:center;overflow-x:auto;scrollbar-width:none")}>
        {[0, 1].map(c => mediaLogos.map(m => <li key={`${c}-${m.id}`} aria-hidden={c === 1 ? true : undefined} style={st("flex-shrink:0;display:flex;flex-direction:column;gap:4px")}>
          <a href={m.href} target="_blank" rel="noopener noreferrer" tabIndex={c === 1 ? -1 : undefined} aria-label={`Voir le contenu ${m.name} : ${m.content} (nouvel onglet)`} style={st("display:flex;align-items:center;gap:6px;text-decoration:none")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/refonte-v2/media/${m.logo}`} alt="" style={st("height:36px;width:auto;max-width:140px;object-fit:contain")} />
            <span aria-hidden="true" style={st("color:#00716f")}>↗</span>
          </a>
          {m.id === "medias24" && <span style={st("font-size:12px;color:#4a6365")}>Koding Kids · 2017</span>}
        </li>))}
      </ul>
    </div>
  </section>;
}

export function TestimonyV2() {
  return <section id="temoignage" style={st("background:#ffffff")}>
    <div style={{ ...S.wrap, ...st("padding:96px 24px 48px;display:flex;flex-direction:column;gap:48px") }}>
      <div style={st("display:flex;flex-direction:column;gap:12px")}>
        <p style={S.eyebrow}>La parole aux écoles</p>
        <h2 style={{ ...S.h2, color: "#0e2526" }}>À l’école Planet Montessori.</h2>
      </div>
      <div style={st("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:64px;align-items:center")}>
        <div style={st("display:flex;flex-direction:column;gap:12px")}>
          <a className={v.poster} href={testimony.video} target="_blank" rel="noreferrer" aria-label="Voir le témoignage de Planet Montessori sur YouTube, dans un nouvel onglet" style={st("position:relative;display:block;border-radius:28px;overflow:hidden;text-decoration:none")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={testimony.image} alt="Oumayma, enseignante d’informatique à Planet Montessori, témoigne dans sa salle de classe" style={st("display:block;width:100%;height:auto")} />
            <span style={st("position:absolute;left:24px;bottom:24px;display:flex;align-items:center;gap:16px;color:#ffffff")}>
              <span className={v.playDot} style={st("width:56px;height:56px;border-radius:50%;background:#ff9c13;color:#0e2526;display:grid;place-items:center;font-size:18px")}>▶</span>
              <span style={st("display:flex;flex-direction:column;background:#0e2526;border-radius:16px;padding:8px 14px")}><strong style={st("font-size:16px;font-weight:700")}>Voir le témoignage</strong><small style={st("font-size:13px;color:#d8f5f3")}>{testimony.duration} · sur YouTube ↗</small></span>
            </span>
          </a>
          <p style={st("margin:0;font-size:14px;line-height:22px;color:#4a6365")}>L’expérience de l’école, racontée par son équipe et ses élèves.</p>
        </div>
        <figure style={st("margin:0;display:flex;flex-direction:column;gap:24px")}>
          <blockquote cite={testimony.video} style={st("margin:0;font-size:28px;line-height:38px;font-weight:300;color:#0e2526")}>« {testimony.quote} »</blockquote>
          <figcaption style={st("display:flex;flex-direction:column;gap:2px;padding-left:16px;border-left:2px solid #ff9c13;font-size:14px;line-height:22px;color:#4a6365")}><strong style={st("font-size:16px;color:#0e2526;font-weight:700")}>{testimony.speaker}</strong><span>{testimony.role}</span><span>{testimony.school}</span></figcaption>
          <p style={st("margin:0;font-size:14px;line-height:22px;color:#4a6365")}>{testimony.sourceNote}</p>
        </figure>
      </div>
    </div>
  </section>;
}

export function ClosingV2({ onDemo }: { onDemo: () => void }) {
  return <section id="presentation" style={st("background:#0e2526;color:#ffffff")}>
    <div style={{ ...S.wrap, ...st("padding:96px 24px;display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap") }}>
      <div style={st("max-width:640px;display:flex;flex-direction:column;gap:16px")}>
        <h2 style={{ ...S.h2, color: "#ffffff" }}>Découvrez Koding Schools avec votre équipe.</h2>
        <p style={S.leadDark}>Parcourons le programme et les ressources d’une séance, à partir des niveaux et de l’organisation de votre école.</p>
      </div>
      <div style={st("display:flex;flex-direction:column;align-items:center;gap:16px")}>
        <button type="button" className={v.cta} onClick={onDemo} style={{ ...S.orange, border: 0, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", gap: 12, alignItems: "center" }}>Demander une démo <span aria-hidden="true">→</span></button>
        <a href="/contact" style={st("color:#d8f5f3;font-size:14px;text-decoration:underline;text-underline-offset:3px")}>Ou contactez-nous directement →</a>
      </div>
    </div>
  </section>;
}

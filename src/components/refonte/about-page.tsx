"use client";

import { Frame, S, st } from "./page-kit";
import { Reveal, fx } from "./reveal";

const convictions = [
  ["Apprendre en faisant", "Créer pour comprendre.", "Programmer, concevoir un média ou explorer des données : les élèves mettent les notions en pratique."],
  ["Donner les moyens d’enseigner", "Le professeur au centre.", "Les supports, les vidéos de préparation et la formation aident l’enseignant à animer ses séances."],
  ["Développer le discernement", "Questionner autant qu’utiliser.", "La citoyenneté digitale, la sécurité et l’esprit critique accompagnent l’apprentissage technique."],
] as const;
const team = [
  ["Jamila Bouselham", "Conception pédagogique", "Les apprentissages", "jamila.png"],
  ["Marouane Arrob", "Développement full stack", "La plateforme", "marouane.png"],
  ["Oualid Ait Aissa", "Data science & intelligence artificielle", "La data et l’IA", "oualid.png"],
] as const;

export function AboutPage() {
  const grid = (min: number, gap: number, extra = "") => st(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,${min}px),1fr));gap:${gap}px;${extra}`);
  return <Frame>
    <section style={st("background:#f0fffe")}>
      <div style={{ ...S.wrap, ...grid(420, 48, "padding:80px 24px;align-items:end") }}>
        <Reveal style={st("display:flex;flex-direction:column;gap:20px")}>
          <p style={S.eyebrow}>Qui sommes-nous ?</p>
          <h1 style={{ ...S.h1, fontSize: 48, lineHeight: "56px" }}>Comprendre le numérique. Pouvoir agir.</h1>
        </Reveal>
        <Reveal delay={2} style={st("display:flex;flex-direction:column;gap:16px;font-size:16px;line-height:26px;color:#4a6365")}>
          <p style={st("margin:0")}>L’IA, les données, les médias et le code font partie du monde dans lequel les enfants grandissent. Apprendre à les comprendre, à les utiliser et à les questionner fait partie de leur éducation.</p>
          <p style={st("margin:0")}>Koding Schools aide les écoles à donner une place à cet apprentissage, avec un programme progressif et des ressources pour les enseignants.</p>
        </Reveal>
      </div>
    </section>

    <section style={st("background:#ffffff")}>
      <div style={{ ...S.wrap, ...grid(420, 64, "padding:96px 24px") }}>
        <Reveal style={st("display:flex;flex-direction:column;gap:12px")}><p style={S.eyebrow}>Notre mission</p><h2 style={S.h2}>Rendre l’éducation digitale accessible à l’école.</h2></Reveal>
        <Reveal delay={2} style={st("display:flex;flex-direction:column;gap:16px")}>
          <p style={st("margin:0;font-size:28px;line-height:38px;font-weight:300")}>Permettre aux élèves d’apprendre à créer avec le numérique, tout en développant leur jugement et leur autonomie.</p>
          <p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>Pour y parvenir, nous réunissons un curriculum, une plateforme d’apprentissage et la formation des enseignants. L’école peut ainsi installer une progression dans la durée, adaptée à l’âge et au point de départ de ses élèves.</p>
          <a href="/refonte-v2/programme" style={S.link}>Découvrir le curriculum →</a>
        </Reveal>
      </div>
    </section>

    <section style={st("background:#0e2526;color:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:96px 24px;display:flex;flex-direction:column;gap:48px") }}>
        <Reveal><h2 style={{ ...S.h2, color: "#ffffff" }}>Trois convictions, au cœur du programme.</h2></Reveal>
        <div style={grid(280, 32)}>
          {convictions.map(([tag, title, text], i) => <Reveal key={tag} delay={i}>
            <article style={st("position:relative;display:flex;flex-direction:column;gap:12px;padding-top:24px;height:100%")}>
              <span className={`${fx.rule}`} aria-hidden="true" style={{ ...st("position:absolute;top:0;left:0;right:0;height:2px;background:#3eccc5"), "--d": i } as React.CSSProperties} />
              <span style={st("font-size:13px;font-weight:500;color:#3eccc5")}>{tag}</span>
              <h3 style={st("margin:0;font-size:24px;line-height:32px;font-weight:700;color:#ffffff")}>{title}</h3>
              <p style={st("margin:0;font-size:16px;line-height:26px;color:#d8f5f3")}>{text}</p>
            </article>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section style={st("background:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:96px 24px;display:flex;flex-direction:column;gap:48px") }}>
        <div style={grid(420, 48, "align-items:center")}>
          <Reveal>
            <span className={fx.photo} style={st("max-width:420px")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/refonte/equipe/malik.png" alt="Malik Bouachrine, cofondateur de Koding Schools" style={st("width:100%;aspect-ratio:1;object-fit:cover;display:block")} />
            </span>
          </Reveal>
          <Reveal delay={2} style={st("display:flex;flex-direction:column;gap:12px")}>
            <p style={S.eyebrow}>À l’origine de Koding Schools</p>
            <h2 style={S.h2}>Malik Bouachrine</h2>
            <span style={st("font-size:16px;font-weight:500")}>Dirigeant &amp; cofondateur</span>
            <p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>Ingénieur INSA Lyon, formé au management de l’innovation à Paris 1 Panthéon-Sorbonne, avec un parcours en conseil en stratégie informatique. Il porte le projet d’inscrire l’éducation digitale dans le parcours scolaire, en donnant aux enseignants les moyens de la transmettre.</p>
          </Reveal>
        </div>
        <Reveal><h2 style={st("margin:48px 0 0;font-size:28px;line-height:36px;font-weight:700")}>La pédagogie et la technologie, autour du même projet.</h2></Reveal>
        <div style={grid(260, 32)}>
          {team.map(([name, role, field, file], i) => <Reveal key={name} delay={i}>
            <article style={st("display:flex;flex-direction:column;gap:8px")}>
              <span className={fx.photo}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/refonte/equipe/${file}`} alt={name} style={st("width:100%;aspect-ratio:1;object-fit:cover;display:block")} />
              </span>
              <span style={st("margin-top:8px;font-size:13px;font-weight:500;color:#00716f")}>{field}</span>
              <h3 style={st("margin:0;font-size:20px;line-height:28px;font-weight:700")}>{name}</h3>
              <p style={st("margin:0;font-size:14px;line-height:22px;color:#4a6365")}>{role}</p>
            </article>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section style={st("background:#f0fffe")}>
      <Reveal style={{ ...S.wrap, ...st("padding:80px 24px;display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap") }}>
        <div style={st("max-width:640px;display:flex;flex-direction:column;gap:12px")}><h2 style={S.h2}>Faisons connaissance.</h2><p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>Une question sur Koding Schools, votre école ou un projet éducatif ? Notre équipe est votre interlocutrice.</p></div>
        <a className={fx.cta} href="/contact" style={S.orange}>Nous contacter →</a>
      </Reveal>
    </section>
  </Frame>;
}

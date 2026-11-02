"use client";

import { Frame, S, st } from "./page-kit";
import { Reveal, fx } from "./reveal";

const details = [
  ["Préparer les enseignants", "Formation à la plateforme, préparation des cours et accompagnement au fil des séances."],
  ["Faire pratiquer les élèves", "Des activités d’algorithmie et de programmation adaptées à des élèves débutants."],
  ["Installer un rythme", "Un pilote de trois mois, avec des séances intégrées à l’organisation scolaire."],
] as const;
const method = [
  ["01", "Les publics", "Quels élèves, quels niveaux, quels acquis de départ ?"],
  ["02", "Les conditions", "Quels enseignants, quels équipements et quelle place dans l’emploi du temps ?"],
  ["03", "Les objectifs", "Quelles compétences développer et comment observer les apprentissages ?"],
] as const;
const partners = [
  ["ebrd-gray.svg", "BERD", "Star Venture"],
  ["startup-maroc.png", "Startup Maroc", "Programme 2030"],
  ["tamwilcom-gray.svg", "Tamwilcom", ""],
  ["mastercard-foundation.png", "Mastercard Foundation", ""],
  ["la-startup-station.png", "La Startup Station", ""],
] as const;

export function PartnershipsPage() {
  const grid = (min: number, gap: number, extra = "") => st(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,${min}px),1fr));gap:${gap}px;${extra}`);
  return <Frame>
    <section style={st("background:#0e2526;color:#ffffff")}>
      <div style={{ ...S.wrap, ...grid(420, 48, "padding:80px 24px;align-items:center") }}>
        <Reveal style={st("display:flex;flex-direction:column;gap:20px")}>
          <p style={S.eyebrowDark}>Partenariats</p>
          <h1 style={{ ...S.h1, color: "#ffffff", fontSize: 48, lineHeight: "56px" }}>Des projets éducatifs qui prennent vie en classe.</h1>
          <p style={{ ...S.leadDark, maxWidth: 560 }}>Fondations, entreprises, acteurs publics : réunir un programme, des enseignants et des ressources pour faire avancer l’éducation digitale.</p>
          <a className={fx.cta} href="/contact?profil=partenaire" style={{ ...S.orange, alignSelf: "flex-start" }}>Parlons de votre projet →</a>
        </Reveal>
        <Reveal delay={2}>
          <a className={fx.cover} href="#dir-iddik" style={st("background:#ffffff;color:#0e2526;border-radius:28px;padding:32px;display:flex;flex-direction:column;gap:12px;text-decoration:none")}>
            <div style={st("display:flex;justify-content:space-between;align-items:center")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/refonte/logos/inwi.png" alt="inwi" style={st("height:44px;width:auto")} />
              <span style={st("font-size:13px;font-weight:500;color:#4a6365")}>Un projet réalisé</span>
            </div>
            <p style={st("margin:24px 0 0;font-size:14px;font-weight:500;color:#00716f")}>Dir iddik</p>
            <h2 style={st("margin:0;font-size:36px;line-height:44px;font-weight:700")}>Classes connectées.</h2>
            <span style={st("font-size:16px;color:#4a6365")}>Le numérique dans les écoles rurales ↓</span>
          </a>
        </Reveal>
      </div>
    </section>

    <section style={st("background:#f0fffe")}>
      <Reveal style={st("max-width:880px;margin:0 auto;padding:96px 24px;display:flex;flex-direction:column;gap:16px")}>
        <p style={S.eyebrow}>Notre contribution</p>
        <h2 style={{ ...S.h2, textWrap: "balance" }}>L’équipement ouvre une possibilité. L’apprentissage lui donne son sens.</h2>
        <p style={S.lead}>Un projet d’éducation digitale se construit aussi autour de ce que les élèves vont apprendre, des ressources dont les enseignants disposent et du rythme des séances.</p>
      </Reveal>
    </section>

    <section id="dir-iddik" style={st("background:#ffffff")}>
      <div style={{ ...S.wrap, ...grid(420, 64, "padding:96px 24px;align-items:start") }}>
        <Reveal style={st("display:flex;flex-direction:column;gap:16px")}>
          <p style={S.eyebrow}>Retour sur un projet</p>
          <h2 style={S.h2}>Inwi Dir iddik. Apprendre le code en milieu rural.</h2>
          <p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>Dans le cadre de l’opération « Classes connectées », Koding Schools a accompagné des enseignants pour introduire le coding dans leurs classes, y compris sans formation préalable en informatique.</p>
          <a href="https://www.linkedin.com/posts/malik-bouachrine-04b69913_t%C3%A9moignages-koding-schools-classes-connect%C3%A9es-activity-7019740220363284480-buPt" target="_blank" rel="noreferrer" style={S.link}>Découvrir les témoignages du projet ↗</a>
        </Reveal>
        <div style={st("display:flex;flex-direction:column;gap:24px")}>
          <Reveal style={st("display:flex;align-items:baseline;gap:16px;padding-bottom:24px;border-bottom:1px solid #cfe3e1")}><strong style={st("font-size:64px;line-height:68px;font-weight:700")}>50</strong><span style={st("font-size:16px;line-height:26px;color:#4a6365")}>écoles du monde rural dans le programme pilote</span></Reveal>
          {details.map(([title, text], i) => <Reveal key={title} delay={i + 1} style={st("display:flex;flex-direction:column;gap:6px;padding-bottom:24px;border-bottom:1px solid #cfe3e1")}><h3 style={st("margin:0;font-size:20px;line-height:28px;font-weight:700")}>{title}</h3><p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>{text}</p></Reveal>)}
        </div>
      </div>
    </section>

    <section style={st("background:#f0fffe")}>
      <div style={{ ...S.wrap, ...st("padding:96px 24px;display:flex;flex-direction:column;gap:48px") }}>
        <Reveal style={st("max-width:720px;display:flex;flex-direction:column;gap:16px")}>
          <p style={S.eyebrow}>Construire un projet ensemble</p>
          <h2 style={S.h2}>Partir du terrain. Définir le parcours.</h2>
          <p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>Chaque contexte est différent. Le premier échange sert à comprendre le besoin et les conditions de mise en œuvre.</p>
        </Reveal>
        <ol style={{ ...grid(280, 24), ...st("list-style:none;margin:0;padding:0") }}>
          {method.map(([n, title, text], i) => <li key={n}><Reveal delay={i} style={{ height: "100%" }}><div className={fx.lift} style={st("background:#ffffff;border:1px solid #cfe3e1;border-radius:28px;padding:28px;display:flex;flex-direction:column;gap:8px;height:100%")}><span style={st("font-size:13px;font-weight:500;color:#00716f")}>{n}</span><h3 style={st("margin:0;font-size:20px;line-height:28px;font-weight:700")}>{title}</h3><p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>{text}</p></div></Reveal></li>)}
        </ol>
      </div>
    </section>

    <section style={st("background:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:96px 24px;display:flex;flex-direction:column;gap:40px") }}>
        <Reveal style={st("display:flex;flex-direction:column;gap:12px")}><h2 style={S.h2}>Des rencontres qui font avancer le projet.</h2><p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>Programmes d’accompagnement et partenaires présents dans le parcours de Koding Schools.</p></Reveal>
        <ul style={st("list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:48px;align-items:center")}>
          {partners.map(([file, name, caption], i) => <li key={name}><Reveal delay={i} style={st("display:flex;flex-direction:column;align-items:center;gap:6px")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={fx.logo} src={`/refonte/logos/${file}`} alt={name} style={st("height:48px;width:auto;max-width:160px;object-fit:contain")} />
            <span style={st("font-size:12px;color:#4a6365;min-height:16px")}>{caption}</span>
          </Reveal></li>)}
        </ul>
      </div>
    </section>

    <section style={st("background:#0e2526;color:#ffffff")}>
      <Reveal style={{ ...S.wrap, ...st("padding:80px 24px;display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap") }}>
        <div style={st("max-width:640px;display:flex;flex-direction:column;gap:12px")}><h2 style={{ ...S.h2, color: "#ffffff" }}>Un projet d’éducation digitale ?</h2><p style={S.leadDark}>Parlons des élèves concernés, de votre contexte et de ce que vous souhaitez rendre possible.</p></div>
        <a className={fx.cta} href="/contact?profil=partenaire" style={S.orange}>Contacter l’équipe →</a>
      </Reveal>
    </section>
  </Frame>;
}

"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Frame, S, st } from "./page-kit";
import a from "./ecoles-page.module.css";

const steps = [
  ["01", "Positionner", "Les élèves, pour choisir un programme adapté à leurs acquis."],
  ["02", "Former", "L’administrateur et les enseignants à la prise en main de la plateforme."],
  ["03", "Configurer", "Les classes, les comptes enseignants et les comptes élèves."],
  ["04", "Activer les comptes", "Et démarrer les séances."],
] as const;
const resources = [
  ["Vidéo & script", "Les notions et le déroulé du cours, avant d’entrer en classe."],
  ["Slides à projeter", "Des questions et des exemples pour faire participer les élèves."],
  ["Pratique & projets", "Des activités ciblées pour s’entraîner, et des projets pour mobiliser les acquis."],
  ["Cahier de l’élève", "Un cahier papier, imprimable, pour récapituler l’essentiel des cours."],
  ["Assistant AIA", "Pour préparer une séance et adapter une explication au contexte du cours."],
] as const;
const faq = [
  ["Comment les enseignants sont-ils accompagnés ?", "Une formation de démonstration et des guides facilitent la prise en main. Pour préparer chaque séance, les enseignants disposent d’une vidéo, d’un script et de slides, ainsi que de l’assistant pédagogique AIA."],
  ["Et si nos élèves n’ont jamais fait d’informatique ?", "Un positionnement initial permet de choisir le bon point de départ. Des programmes transitoires regroupent au début les niveaux qui ont des acquis proches, puis se différencient progressivement pour rejoindre le programme cible."],
  ["Quel équipement faut-il prévoir ?", "Des ordinateurs pour les activités pratiques, un vidéoprojecteur et une connexion Internet en classe. Un ordinateur à la maison n’est pas un prérequis. Le cahier de l’élève peut être imprimé par l’école."],
  ["Quel rythme prévoir dans l’emploi du temps ?", "Nous préconisons une séance par semaine : environ 1 heure au primaire et 1 h 30 au collège. L’enseignant conserve la liberté d’adapter le déroulé et de proposer des exercices en devoirs si nécessaire."],
  ["Comment fonctionnent les licences élèves ?", "La licence couvre une année scolaire : 119 DH pour le programme en français et 149 DH en anglais. Selon l’organisation de l’école, l’activation se fait par l’établissement, avec un code de licence ou par paiement depuis le compte élève. Il faut renouveler l’activation pour l’année scolaire suivante."],
  ["Le programme est-il disponible en français et en anglais ?", "Oui. Les dix niveaux du programme sont disponibles en français et en anglais. L’école choisit la langue d’enseignement du programme."],
] as const;

export function EcolesPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const deploy = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = deploy.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setSeen(true); observer.disconnect(); } }, { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const pill = st("color:#ffffff;border:1px solid #4a6365;border-radius:999px;padding:8px 16px;font-size:15px;font-weight:500;text-decoration:none");
  const chip = st("border:1px solid #4a6365;border-radius:999px;padding:8px 16px;font-size:15px;font-weight:500");
  const light = st("background:#ffffff;border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:4px");
  return <Frame>
    <section style={st("background:#0e2526;color:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:80px 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:48px;align-items:center") }}>
        <div style={st("display:flex;flex-direction:column;gap:20px")}>
          <p style={S.eyebrowDark}>Pour les écoles</p>
          <h1 style={{ ...S.h1, color: "#ffffff" }}>Installer le programme dans votre école.</h1>
          <p style={{ ...S.leadDark, maxWidth: 560 }}>Déploiement, formation, équipement et rythme : les repères pour préparer votre première année.</p>
          <nav aria-label="Sur cette page" style={st("display:flex;gap:8px;flex-wrap:wrap")}>
            <a href="#deploiement" style={pill}>Déploiement</a><a href="#formation" style={pill}>Formation</a><a href="#equipement" style={pill}>Équipement</a><a href="#rythme" style={pill}>Rythme</a>
          </nav>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/charte/kobot/kobot-helping.png" alt="Kobot propose son aide" style={st("width:min(100%,320px);height:auto;justify-self:center")} />
      </div>
    </section>

    <section id="deploiement" ref={deploy} className={seen ? a.on : undefined} style={st("background:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:96px 24px;display:flex;flex-direction:column;gap:48px") }}>
        <h2 className={a.title} style={S.h2}>Le déploiement, en quatre étapes.</h2>
        <ol className={a.steps}>
          {steps.map(([n, title, text], i) => <li key={n} className={a.step} style={{ "--i": i } as CSSProperties}>
            <span className={a.line} aria-hidden="true" /><span className={a.dot} aria-hidden="true" />
            <span className={a.num}>{n}</span>
            <h3 className={a.stepTitle}>{title}</h3>
            <p className={a.stepText}>{text}</p>
          </li>)}
        </ol>
      </div>
    </section>

    <section id="formation" style={st("background:#f0fffe")}>
      <div style={{ ...S.wrap, ...st("padding:96px 24px;display:flex;flex-direction:column;gap:48px") }}>
        <div style={st("max-width:720px;display:flex;flex-direction:column;gap:16px")}>
          <h2 style={S.h2}>Des enseignants accompagnés.</h2>
          <p style={S.lead}>Une formation de démonstration et des guides facilitent la prise en main. Pour chaque séance, les enseignants disposent de ressources prêtes à l’emploi.</p>
        </div>
        <ul style={st("list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:16px")}>
          {resources.map(([title, text]) => <li key={title} style={st("background:#ffffff;border:1px solid #cfe3e1;border-radius:28px;padding:20px;display:flex;flex-direction:column;gap:8px")}>
            <h3 style={st("margin:0;font-size:18px;line-height:26px;font-weight:700")}>{title}</h3>
            <p style={st("margin:0;font-size:14px;line-height:22px;color:#4a6365")}>{text}</p>
          </li>)}
        </ul>
        <a href="/refonte-v2#seance" style={S.link}>Voir les ressources d’une séance →</a>
      </div>
    </section>

    <section style={st("background:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:96px 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:32px") }}>
        <article id="equipement" style={st("background:#0e2526;color:#ffffff;border-radius:28px;padding:40px;display:flex;flex-direction:column;gap:16px")}>
          <p style={S.eyebrowDark}>Équipement</p>
          <h2 style={{ ...st("margin:0;font-size:28px;line-height:36px;font-weight:700"), color: "#ffffff" }}>À prévoir en classe.</h2>
          <ul style={st("list-style:none;margin:0;padding:0;display:flex;gap:12px;flex-wrap:wrap")}><li style={chip}>Ordinateurs</li><li style={chip}>Vidéoprojecteur</li><li style={chip}>Connexion Internet</li></ul>
          <p style={st("margin:0;font-size:16px;line-height:26px;color:#d8f5f3")}>Un ordinateur à la maison n’est pas un prérequis. Le cahier de l’élève peut être imprimé par l’école.</p>
        </article>
        <article id="rythme" style={st("background:#f0fffe;border:1px solid #cfe3e1;border-radius:28px;padding:40px;display:flex;flex-direction:column;gap:16px")}>
          <p style={S.eyebrow}>Rythme</p>
          <h2 style={st("margin:0;font-size:28px;line-height:36px;font-weight:700")}>Une séance par semaine.</h2>
          <div style={st("display:grid;grid-template-columns:1fr 1fr;gap:16px")}>
            <div style={light}><span style={st("font-size:14px;color:#4a6365")}>Primaire</span><strong style={st("font-size:24px;line-height:32px")}>1 h</strong></div>
            <div style={light}><span style={st("font-size:14px;color:#4a6365")}>Collège</span><strong style={st("font-size:24px;line-height:32px")}>1 h 30</strong></div>
          </div>
          <p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>L’enseignant conserve la liberté d’adapter le déroulé et de proposer des exercices en devoirs si nécessaire.</p>
        </article>
      </div>
    </section>

    <section id="questions" style={st("background:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:0 24px 96px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:64px;align-items:start") }}>
        <div style={st("display:flex;flex-direction:column;gap:16px")}>
          <h2 style={S.h2}>Les questions des écoles.</h2>
          <p style={S.lead}>Une autre question ? <a href="/contact?profil=ecole" style={st("font-weight:700")}>Écrivez-nous →</a></p>
        </div>
        <div style={st("display:flex;flex-direction:column")}>
          {faq.map(([q, a], i) => {
            const open = i === openFaq;
            return <div key={q} style={st("border-bottom:1px solid #cfe3e1;padding:24px 0")}>
              <h3 style={st("margin:0;font-size:20px;line-height:28px")}>
                <button type="button" aria-expanded={open} aria-controls={`faq-${i}`} onClick={() => setOpenFaq(open ? -1 : i)} style={st("all:unset;box-sizing:border-box;width:100%;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:24px;font-size:20px;line-height:28px;font-weight:700;color:#0e2526")}>
                  {q}<span aria-hidden="true" style={{ ...st("flex-shrink:0;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-size:22px;font-weight:500"), background: open ? "#ff9c13" : "#d8f5f3" }}>{open ? "−" : "+"}</span>
                </button>
              </h3>
              {open && <p id={`faq-${i}`} style={st("margin:16px 0 0;font-size:16px;line-height:26px;color:#4a6365;max-width:62ch")}>{a}</p>}
            </div>;
          })}
        </div>
      </div>
    </section>

    <section style={st("background:#0e2526;color:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:80px 24px;display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap") }}>
        <div style={st("max-width:640px;display:flex;flex-direction:column;gap:12px")}>
          <h2 style={{ ...S.h2, color: "#ffffff" }}>Découvrez Koding Schools avec votre équipe.</h2>
          <p style={S.leadDark}>Parcourons le programme et les ressources d’une séance, à partir des niveaux et de l’organisation de votre école.</p>
        </div>
        <a href="/contact?profil=ecole" style={S.orange}>Demander une démo →</a>
      </div>
    </section>
  </Frame>;
}

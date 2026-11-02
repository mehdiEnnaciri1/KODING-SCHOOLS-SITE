"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LOGIN_URL } from "@/domain/refonte/activation";
import { featuredArticle, relatedArticles } from "@/domain/refonte/blog";
import { S, st } from "./page-kit";
import v from "./home-sections-v2b.module.css";

const steps = [
  ["01", "Positionner", "Les élèves, pour choisir un programme adapté à leurs acquis."],
  ["02", "Former", "L’administrateur et les enseignants à la prise en main de la plateforme."],
  ["03", "Configurer", "Les classes, les comptes enseignants et les comptes élèves."],
  ["04", "Activer les comptes", "Et démarrer les séances."],
] as const;

const faq = [
  ["Comment les enseignants sont-ils accompagnés ?", "Une formation de démonstration et des guides facilitent la prise en main. Pour préparer chaque séance, les enseignants disposent d’une vidéo, d’un script et de slides, ainsi que de l’assistant pédagogique AIA."],
  ["Et si nos élèves n’ont jamais fait d’informatique ?", "Un positionnement initial permet de choisir le bon point de départ. Des programmes transitoires regroupent au début les niveaux qui ont des acquis proches, puis se différencient progressivement pour rejoindre le programme cible."],
  ["Quel équipement faut-il prévoir ?", "Des ordinateurs pour les activités pratiques, un vidéoprojecteur et une connexion Internet en classe. Un ordinateur à la maison n’est pas un prérequis. Le cahier de l’élève peut être imprimé par l’école."],
  ["Quel rythme prévoir dans l’emploi du temps ?", "Nous préconisons une séance par semaine : environ 1 heure au primaire et 1 h 30 au collège. L’enseignant conserve la liberté d’adapter le déroulé et de proposer des exercices en devoirs si nécessaire."],
  ["Comment fonctionnent les licences élèves ?", "La licence couvre une année scolaire : 119 DH pour le programme en français et 149 DH en anglais. Selon l’organisation de l’école, l’activation se fait par l’établissement, avec un code de licence ou par paiement depuis le compte élève. Il faut renouveler l’activation pour l’année scolaire suivante."],
  ["Le programme est-il disponible en français et en anglais ?", "Oui. Les dix niveaux du programme sont disponibles en français et en anglais. L’école choisit la langue d’enseignement du programme."],
] as const;

export function DeploiementV2({ onContact }: { onContact: () => void }) {
  const node = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = node.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setSeen(true); observer.disconnect(); } }, { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const chip = st("border:1px solid #4a6365;border-radius:999px;padding:8px 16px;font-size:15px;font-weight:500");
  return <section id="ecoles" ref={node} className={seen ? v.on : undefined} style={st("background:#0e2526;color:#ffffff")}>
    <div style={{ ...S.wrap, ...st("padding:96px 24px;display:flex;flex-direction:column;gap:48px") }}>
      <h2 className={v.depTitle} style={{ ...S.h2, color: "#ffffff" }}>Le déploiement dans votre école.</h2>
      <ol style={st("list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:32px")}>
        {steps.map(([n, title, text], i) => <li key={n} className={v.step} style={{ "--i": i } as CSSProperties}>
          <span className={v.line} aria-hidden="true" /><span className={v.dot} aria-hidden="true" />
          <span className={v.num} style={st("font-size:13px;line-height:16px;font-weight:500;letter-spacing:.04em;color:#3eccc5")}>{n}</span>
          <h3 className={v.stepTitle} style={st("margin:0;font-size:24px;line-height:32px;font-weight:700;color:#ffffff")}>{title}</h3>
          <p className={v.stepText} style={st("margin:0;font-size:16px;line-height:26px;color:#d8f5f3")}>{text}</p>
        </li>)}
      </ol>
      <div style={st("display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap;padding-top:32px;border-top:1px solid #4a6365")}>
        <div style={st("display:flex;flex-direction:column;gap:12px")}>
          <p style={S.eyebrowDark}>À prévoir en classe</p>
          <ul style={st("list-style:none;margin:0;padding:0;display:flex;gap:12px;flex-wrap:wrap")}>
            {["Ordinateurs", "Vidéoprojecteur", "Connexion Internet"].map(x => <li key={x} className={v.chip} style={chip}>{x}</li>)}
          </ul>
          <p style={st("margin:0;font-size:14px;line-height:22px;color:#d8f5f3")}>Pas d’ordinateur requis à la maison.</p>
        </div>
        <button type="button" className={v.cta} onClick={onContact} style={{ ...S.orange, border: 0, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", gap: 12, alignItems: "center" }}>Parlons de votre école <span aria-hidden="true">→</span></button>
      </div>
    </div>
  </section>;
}

export function ParentsV2() {
  const row = st("display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 0;text-decoration:none;color:#0e2526");
  return <section id="parents" style={st("background:#ffffff")}>
    <div style={{ ...S.wrap, ...st("padding:0 24px 96px") }}>
      <div style={st("background:#f0fffe;border:1px solid #cfe3e1;border-radius:clamp(28px,6vw,48px);padding:clamp(24px,6vw,64px);display:flex;flex-direction:column;gap:40px")}>
        <div style={st("max-width:640px;display:flex;flex-direction:column;gap:12px")}>
          <p style={{ ...S.eyebrow, color: "#0e2526" }}>Parents &amp; licences</p>
          <h2 style={{ ...S.h2, color: "#0e2526" }}>Parents, c’est par ici.</h2>
          <p style={st("margin:0;font-size:16px;line-height:26px;color:#0e2526")}>Votre école utilise Koding Schools ? Retrouvez les démarches pour votre enfant.</p>
        </div>
        <div style={st("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:32px")}>
          <a className={v.activate} href="/refonte-v2/parents-licences#activation" style={st("background:#0e2526;color:#ffffff;border-radius:28px;padding:32px;display:flex;flex-direction:column;gap:12px;text-decoration:none")}>
            <h3 style={st("margin:0;font-size:24px;line-height:32px;font-weight:700;color:#ffffff")}>Activer le compte de mon enfant.</h3>
            <p style={st("margin:0;font-size:16px;line-height:26px;color:#d8f5f3")}>Avec ou sans identifiants, suivez le parcours adapté à votre situation.</p>
            <span style={st("margin-top:auto;padding-top:16px;border-top:1px solid #4a6365;display:flex;justify-content:space-between;align-items:center;font-size:16px;font-weight:700")}>Commencer l’activation <span className={v.arrow} style={st("width:36px;height:36px;border-radius:50%;background:#ff9c13;color:#0e2526;display:grid;place-items:center")}>→</span></span>
          </a>
          <div style={st("display:flex;flex-direction:column;background:#ffffff;border-radius:28px;padding:8px 28px")}>
            <a className={v.row} href="/parents/librairies" style={{ ...row, borderBottom: "1px solid #cfe3e1" }}><div><h3 style={st("margin:0;font-size:20px;line-height:28px;font-weight:700")}>Trouver une librairie</h3><p style={st("margin:4px 0 0;font-size:14px;line-height:22px;color:#4a6365")}>Les points de vente partenaires, près de chez vous ou en ligne.</p></div><span className={v.arrow} style={st("color:#00716f")}>→</span></a>
            <a className={v.row} href="/refonte-v2/parents-licences#aide" style={row}><div><h3 style={st("margin:0;font-size:20px;line-height:28px;font-weight:700")}>Obtenir de l’aide</h3><p style={st("margin:4px 0 0;font-size:14px;line-height:22px;color:#4a6365")}>Identifiants, code de licence ou accès au compte.</p></div><span className={v.arrow} style={st("color:#00716f")}>→</span></a>
          </div>
        </div>
        <div style={st("display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:16px;line-height:26px")}>
          <p style={st("margin:0")}>Compte déjà activé ? <a href={LOGIN_URL} style={st("font-weight:700;color:#00716f")}>Se connecter ↗</a></p>
          <a href="/refonte-v2/parents-licences" style={st("font-weight:700;color:#0e2526")}>Tous les repères pour les familles →</a>
        </div>
      </div>
    </div>
  </section>;
}

export function FaqV2() {
  const [open, setOpen] = useState(0);
  return <section id="questions" style={st("background:#ffffff")}>
    <div style={{ ...S.wrap, ...st("padding:0 24px 96px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:64px;align-items:start") }}>
      <div style={st("display:flex;flex-direction:column;gap:16px")}>
        <h2 style={{ ...S.h2, color: "#0e2526" }}>Les questions des écoles.</h2>
        <p style={S.lead}>Les repères pour préparer votre première année.</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={v.thinking} src="/charte/kobot/kobot-thinking.png" alt="Kobot se pose une question" style={st("width:200px;height:auto;margin-top:8px")} />
        <div style={st("display:flex;flex-direction:column;gap:4px;padding-top:16px;border-top:1px solid #cfe3e1")}>
          <p style={st("margin:0;font-size:16px;line-height:26px;color:#0e2526")}>Une question sur votre école ?</p>
          <a href="/contact?profil=ecole" style={S.link}>Contactez-nous →</a>
        </div>
      </div>
      <div style={st("display:flex;flex-direction:column")}>
        {faq.map(([q, a], i) => {
          const on = i === open;
          return <div key={q} className={`${v.faqItem} ${on ? v.faqOpen : ""}`}>
            <h3 style={st("margin:0")}>
              <button type="button" className={v.faqBtn} aria-expanded={on} aria-controls={`home-faq-${i}`} onClick={() => setOpen(on ? -1 : i)}>{q}<span className={v.faqIcon} aria-hidden="true">{on ? "−" : "+"}</span></button>
            </h3>
            <div className={v.faqPanel} id={`home-faq-${i}`} role="region"><div><p style={st("margin:16px 0 0;font-size:16px;line-height:26px;color:#4a6365;max-width:62ch")}>{a}</p></div></div>
          </div>;
        })}
      </div>
    </div>
  </section>;
}

export function BlogV2() {
  return <section id="ressources" style={st("background:#f0fffe")}>
    <div style={{ ...S.wrap, ...st("padding:96px 24px;display:flex;flex-direction:column;gap:48px") }}>
      <div style={st("display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap")}>
        <div style={st("display:flex;flex-direction:column;gap:12px")}><p style={S.eyebrow}>Le blog Koding Schools</p><h2 style={{ ...S.h2, color: "#0e2526" }}>Le numérique à l’école, en pratique.</h2></div>
        <Link href="/blog" style={st("font-weight:700;font-size:16px;white-space:nowrap")}>Tous les articles →</Link>
      </div>
      <div style={st("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:32px")}>
        <a className={v.postBig} href={featuredArticle.href} style={st("display:flex;flex-direction:column;gap:20px;text-decoration:none;color:#0e2526")}>
          <span className={v.frame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featuredArticle.image} alt="" style={st("width:100%;aspect-ratio:3/2;object-fit:cover;display:block")} />
          </span>
          <div style={st("display:flex;flex-direction:column;gap:8px")}><p style={st("margin:0;font-size:13px;font-weight:500;letter-spacing:.04em;color:#00716f")}>{featuredArticle.category}</p><h3 style={st("margin:0;font-size:24px;line-height:32px;font-weight:700")}>{featuredArticle.title}</h3><span style={st("font-size:16px;font-weight:700;color:#00716f")}>Lire l’article <span className={v.linkArrow}>→</span></span></div>
        </a>
        <div style={st("display:flex;flex-direction:column;gap:24px")}>
          {relatedArticles.map(ar => <a key={ar.id} className={v.postRow} href={ar.href} style={st("display:flex;gap:20px;align-items:center;text-decoration:none;color:#0e2526;padding-bottom:24px;border-bottom:1px solid #cfe3e1")}>
            <span className={v.frameSm} style={st("width:160px")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ar.id === "aia" ? "/refonte/aia-teacher.png" : ar.image} alt="" style={st("width:160px;aspect-ratio:4/3;object-fit:cover;display:block;background:#f0fffe")} />
            </span>
            <div style={st("display:flex;flex-direction:column;gap:6px")}><p style={st("margin:0;font-size:13px;font-weight:500;letter-spacing:.04em;color:#00716f")}>{ar.category}</p><h3 style={st("margin:0;font-size:20px;line-height:28px;font-weight:700")}>{ar.title}</h3><span style={st("font-size:14px;font-weight:700;color:#00716f")}>Lire l’article <span className={v.linkArrow}>→</span></span></div>
          </a>)}
        </div>
      </div>
    </div>
  </section>;
}

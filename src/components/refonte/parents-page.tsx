"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { LOGIN_URL } from "@/domain/refonte/activation";
import { Frame, S, st } from "./page-kit";
import p from "./parents-page.module.css";

const faq = [
  ["Je n’ai pas reçu les identifiants de mon enfant.", "Demandez le login et le mot de passe à l’école. Elle crée les comptes élèves. Si vous avez déjà acheté un code, conservez-le pour l’utiliser une fois les identifiants reçus."],
  ["J’ai déjà acheté un code d’activation.", "Connectez-vous avec les identifiants de l’élève, puis utilisez le code dans le parcours d’activation du compte."],
  ["Puis-je payer directement depuis le compte ?", "Oui. Si vous avez le login et le mot de passe de l’élève, connectez-vous pour activer le compte par paiement direct, sans acheter de code au préalable."],
  ["Faut-il un ordinateur à la maison ?", "Non, le programme se déroule en classe. L’école organise les séances et l’accès aux équipements. L’enseignant peut proposer des exercices complémentaires selon les besoins."],
  ["Mon code ou mon accès ne fonctionne pas.", "Contactez le support en décrivant le problème rencontré. Ne communiquez pas votre mot de passe."],
] as const;

const quick = [
  ["#activation", "Activer un compte", "Avec ou sans identifiants"],
  ["/parents/librairies", "Trouver une librairie", "Casablanca, Marrakech et en ligne"],
  ["#aide", "Obtenir de l’aide", "Compte, code ou connexion"],
] as const;

function Reveal({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  const node = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = node.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); observer.disconnect(); } }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={node} className={`${p.reveal} ${on ? p.in : ""}`} style={style}>{children}</div>;
}

export function ParentsPage() {
  const [lang, setLang] = useState(false);
  const [open, setOpen] = useState(0);
  const option = st("display:flex;justify-content:space-between;align-items:center;gap:16px;background:#ffffff;color:#0e2526;border:0;border-radius:16px;padding:16px 20px;text-align:left;cursor:pointer;font-size:16px;font-family:inherit;text-decoration:none");
  const col = st("display:flex;flex-direction:column;gap:2px");
  const small = st("font-size:14px;color:#4a6365");
  const price = st("background:#ffffff;border:1px solid #cfe3e1;border-radius:28px;padding:28px;display:flex;flex-direction:column;gap:4px");
  return <Frame>
    <section style={st("background:#f0fffe")}>
      <div style={{ ...S.wrap, ...st("padding:80px 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:48px;align-items:center") }}>
        <div style={st("display:flex;flex-direction:column;gap:20px")}>
          <p style={S.eyebrow}>Parents &amp; licences</p>
          <h1 style={S.h1}>Le programme à l’école. L’accès, ici.</h1>
          <p style={{ ...S.lead, maxWidth: 560 }}>Votre école utilise Koding Schools ? Retrouvez ici l’activation du compte de votre enfant, les licences et les librairies partenaires.</p>
        </div>
        <nav aria-label="Vos démarches" style={st("display:flex;flex-direction:column;background:#ffffff;border:1px solid #cfe3e1;border-radius:28px;padding:8px 28px")}>
          {quick.map(([href, title, sub]) => <a key={title} className={p.quick} href={href} style={st("display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 0;border-bottom:1px solid #cfe3e1;text-decoration:none;color:#0e2526")}>
            <span style={col}><strong style={st("font-size:18px")}>{title}</strong><small style={small}>{sub}</small></span><span className={p.arrow} style={st("color:#00716f")}>→</span>
          </a>)}
          <p style={st("margin:0;padding:16px 0;font-size:15px")}>Compte déjà activé ? <a href={LOGIN_URL} style={st("font-weight:700")}>Se connecter ↗</a></p>
        </nav>
      </div>
    </section>

    <section id="activation" style={st("background:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:96px 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:64px;align-items:start") }}>
        <Reveal style={st("display:flex;flex-direction:column;gap:16px")}>
          <p style={S.eyebrow}>L’accès au programme</p>
          <h2 style={S.h2}>Quelques repères pour bien démarrer.</h2>
          <p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>L’école crée le compte de votre enfant et vous transmet son login et son mot de passe. L’activation lui donne accès au programme de l’année scolaire.</p>
          <div style={st("background:#f0fffe;border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:6px")}><strong style={st("font-size:16px")}>Votre école prend en charge la licence ?</strong><p style={st("margin:0;font-size:14px;line-height:22px;color:#4a6365")}>Son administrateur active directement le compte. Vérifiez auprès de l’école avant d’acheter une licence.</p></div>
        </Reveal>
        <div style={st("background:#0e2526;color:#ffffff;border-radius:28px;padding:40px;display:flex;flex-direction:column;gap:16px")}>
          {!lang ? <div key="one" className={p.step} style={st("display:flex;flex-direction:column;gap:16px")}>
            <p style={st("margin:0;font-size:13px;font-weight:500;color:#3eccc5")}>Activer un compte élève</p>
            <h3 style={st("margin:0;font-size:24px;line-height:32px;font-weight:700")}>Avez-vous les identifiants de l’élève ?</h3>
            <p style={st("margin:0;font-size:16px;line-height:26px;color:#d8f5f3")}>Il s’agit du login et du mot de passe transmis par votre école.</p>
            <a className={p.pick} href={LOGIN_URL} style={option}><span style={col}><strong>Oui, j’ai les identifiants</strong><small style={small}>Me connecter pour utiliser un code ou payer depuis le compte.</small></span><span className={p.arrow}>›</span></a>
            <button type="button" className={p.pick} onClick={() => setLang(true)} style={option}><span style={col}><strong>Non, pas encore</strong><small style={small}>Acheter un code, puis l’utiliser une fois les identifiants reçus.</small></span><span className={p.arrow}>›</span></button>
          </div> : <div key="two" className={p.step} style={st("display:flex;flex-direction:column;gap:16px")}>
            <button type="button" className={p.back} onClick={() => setLang(false)} style={st("align-self:flex-start;background:none;border:0;color:#ffffff;font-size:14px;font-weight:700;cursor:pointer;padding:0;font-family:inherit")}>‹ Retour aux identifiants</button>
            <h3 style={st("margin:0;font-size:24px;line-height:32px;font-weight:700")}>Quelle langue votre école a-t-elle choisie ?</h3>
            <p style={st("margin:0;font-size:16px;line-height:26px;color:#d8f5f3")}>Les licences françaises et anglaises sont différentes.</p>
            <a className={p.pick} href="https://kodingschools.com/fr/manuel-fr/" style={option}><span style={col}><strong>Français</strong><small style={small}>119 DH · une année scolaire</small></span><span className={p.arrow}>›</span></a>
            <a className={p.pick} href="https://kodingschools.com/fr/manuel-en/" style={option}><span style={col}><strong>Anglais</strong><small style={small}>149 DH · une année scolaire</small></span><span className={p.arrow}>›</span></a>
            <p style={st("margin:0;font-size:14px;line-height:22px;color:#d8f5f3")}>Après l’achat, le code est disponible en PDF et envoyé par e-mail.</p>
          </div>}
        </div>
      </div>
    </section>

    <section id="licences" style={st("background:#f0fffe")}>
      <div style={{ ...S.wrap, ...st("padding:96px 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:48px;align-items:center") }}>
        <Reveal style={st("display:flex;flex-direction:column;gap:16px")}>
          <p style={S.eyebrow}>Une année scolaire</p>
          <h2 style={S.h2}>La langue est celle choisie par l’école.</h2>
          <p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>Pour activer le compte, choisissez la licence correspondant à la langue indiquée par votre établissement. À la rentrée suivante, une nouvelle licence ou une réactivation par l’école est nécessaire.</p>
        </Reveal>
        <div style={st("display:grid;grid-template-columns:1fr 1fr;gap:16px")}>
          {[["Français", 119], ["Anglais", 149]].map(([label, amount]) => <div key={label} className={p.price} style={price}><span style={st("font-size:14px;font-weight:500;color:#4a6365")}>{label}</span><strong style={st("font-size:48px;line-height:56px")}>{amount} <small style={st("font-size:20px")}>DH</small></strong><span style={small}>par élève et par année scolaire</span></div>)}
        </div>
      </div>
    </section>

    <section id="aide" style={st("background:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:96px 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:64px;align-items:start") }}>
        <Reveal style={st("display:flex;flex-direction:column;gap:16px")}>
          <p style={S.eyebrow}>Besoin d’un coup de main ?</p>
          <h2 style={S.h2}>À chaque question, le bon interlocuteur.</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={p.kobot} src="/charte/kobot/kobot-celebrating.png" alt="Kobot célèbre" style={st("width:200px;height:auto")} />
          <a href="/contact?profil=parent" style={S.link}>Contacter le support →</a>
        </Reveal>
        <div style={st("display:flex;flex-direction:column")}>
          {faq.map(([q, a], i) => {
            const on = i === open;
            return <div key={q} className={`${p.faqItem} ${on ? p.faqOpen : ""}`}>
              <h3 style={st("margin:0")}><button type="button" className={p.faqBtn} aria-expanded={on} aria-controls={`parents-faq-${i}`} onClick={() => setOpen(on ? -1 : i)}>{q}<span className={p.faqIcon} aria-hidden="true">{on ? "−" : "+"}</span></button></h3>
              <div className={p.faqPanel} id={`parents-faq-${i}`} role="region"><div><p style={st("margin:16px 0 0;font-size:16px;line-height:26px;color:#4a6365;max-width:62ch")}>{a}</p></div></div>
            </div>;
          })}
        </div>
      </div>
    </section>

    <section style={st("background:#0e2526;color:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:64px 24px;display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap") }}>
        <div style={st("max-width:640px;display:flex;flex-direction:column;gap:12px")}>
          <h2 style={st("margin:0;font-size:28px;line-height:36px;font-weight:700;color:#ffffff")}>Vous représentez une école ?</h2>
          <p style={st("margin:0;font-size:16px;line-height:26px;color:#d8f5f3")}>Découvrez comment mettre en place le programme et organiser l’activation des comptes de vos élèves.</p>
        </div>
        <a className={p.ghost} href="/ecoles" style={st("color:#ffffff;font-weight:700;font-size:16px;border:1.5px solid #ffffff;border-radius:999px;padding:14px 26px;text-decoration:none;white-space:nowrap")}>Le programme pour mon école →</a>
      </div>
    </section>
  </Frame>;
}

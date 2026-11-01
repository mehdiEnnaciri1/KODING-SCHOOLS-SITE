"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Frame, S, st } from "./page-kit";

const LEVELS = ["1AP", "2AP", "3AP", "4AP", "5AP", "6AP", "1AC", "2AC", "3AC", "Tronc commun"];
type Profil = "ecole" | "parent" | "partenaire";
const PROFILS: Record<Profil, { label: string; note: string; fields: readonly (readonly [string, string, string])[]; msg: string; submit: string }> = {
  ecole: { label: "Une école", note: "Votre demande est transmise à l’équipe qui accompagne les établissements.", fields: [["Nom et prénom", "text", "name"], ["Fonction dans l’établissement", "text", "organization-title"], ["Établissement", "text", "organization"], ["Ville", "text", "address-level2"], ["E-mail professionnel", "email", "email"], ["Téléphone", "tel", "tel"]], msg: "Votre organisation, vos questions (facultatif)", submit: "Demander une démo" },
  parent: { label: "Un parent", note: "Votre demande est transmise au support technique.", fields: [["Nom et prénom", "text", "name"], ["E-mail", "email", "email"], ["École de votre enfant", "text", "organization"], ["Login de l’élève (sans mot de passe)", "text", "off"]], msg: "Décrivez le problème rencontré", submit: "Envoyer au support" },
  partenaire: { label: "Un partenaire", note: "Votre demande est transmise à l’équipe partenariats.", fields: [["Nom et prénom", "text", "name"], ["Organisation", "text", "organization"], ["E-mail", "email", "email"], ["Téléphone", "tel", "tel"]], msg: "Votre projet : publics, contexte, objectifs", submit: "Parlons de votre projet" },
};
const isProfil = (value: string | null): value is Profil => value === "ecole" || value === "parent" || value === "partenaire";

function ContactForm() {
  const router = useRouter();
  const requested = useSearchParams().get("profil");
  const [picked, setPicked] = useState<Profil | null>(null);
  const [levels, setLevels] = useState<string[]>([]);
  const profil: Profil = picked ?? (isProfil(requested) ? requested : "ecole");
  const c = PROFILS[profil];
  const input = st("min-height:48px;padding:12px 16px;border:1px solid #4a6365;border-radius:12px;font-size:16px;color:#0e2526;background:#ffffff");
  const label = st("display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:500");
  const submit = (event: FormEvent) => { event.preventDefault(); router.push(`/merci?profil=${profil}`); };
  return <Frame>
    <section style={st("background:#f0fffe;min-height:70vh")}>
      <div style={{ ...S.wrap, ...st("padding:64px 24px 96px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:64px;align-items:start") }}>
        <div style={st("display:flex;flex-direction:column;gap:20px")}>
          <p style={S.eyebrow}>Démo et contact</p>
          <h1 style={S.h1}>Votre demande, à la bonne personne.</h1>
          <p style={S.lead}>Dites-nous d’abord qui vous êtes : votre demande arrive directement à l’interlocuteur concerné.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/charte/kobot/kobot-helping.png" alt="Kobot propose son aide" style={st("width:220px;height:auto")} />
        </div>
        <div style={st("background:#ffffff;border:1px solid #cfe3e1;border-radius:28px;padding:40px;display:flex;flex-direction:column;gap:24px")}>
          <fieldset style={st("border:0;margin:0;padding:0;display:flex;flex-direction:column;gap:12px")}>
            <legend style={st("font-size:16px;font-weight:700;margin-bottom:12px;padding:0")}>Vous êtes</legend>
            <div style={st("display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px")}>
              {(Object.keys(PROFILS) as Profil[]).map(key => <button key={key} type="button" aria-pressed={key === profil} onClick={() => setPicked(key)} style={{ ...st("min-height:56px;padding:12px;border-radius:16px;color:#0e2526;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit"), border: `1.5px solid ${key === profil ? "#3eccc5" : "#cfe3e1"}`, background: key === profil ? "#3eccc5" : "#ffffff" }}>{PROFILS[key].label}</button>)}
            </div>
            <p style={st("margin:0;font-size:14px;line-height:22px;color:#4a6365")}>{c.note}</p>
          </fieldset>
          <form onSubmit={submit} style={st("display:flex;flex-direction:column;gap:16px")} key={profil}>
            {c.fields.map(([text, type, auto]) => <label key={text} style={label}>{text}<input type={type} required autoComplete={auto} style={input} /></label>)}
            {profil === "ecole" && <fieldset style={st("border:0;margin:0;padding:0;display:flex;flex-direction:column;gap:8px")}>
              <legend style={st("font-size:14px;font-weight:500;margin-bottom:6px;padding:0")}>Niveaux concernés</legend>
              <div style={st("display:flex;flex-wrap:wrap;gap:6px")}>
                {LEVELS.map(code => { const on = levels.includes(code); return <button key={code} type="button" aria-pressed={on} onClick={() => setLevels(on ? levels.filter(x => x !== code) : [...levels, code])} style={{ ...st("min-height:40px;padding:6px 14px;border-radius:999px;color:#0e2526;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit"), border: `1.5px solid ${on ? "#3eccc5" : "#cfe3e1"}`, background: on ? "#d8f5f3" : "#ffffff" }}>{code}</button>; })}
              </div>
            </fieldset>}
            <label style={label}>{c.msg}<textarea rows={4} style={{ ...input, resize: "vertical", fontFamily: "inherit" }} /></label>
            <button type="submit" style={{ ...S.orange, border: 0, alignSelf: "flex-start", cursor: "pointer", fontFamily: "inherit" }}>{c.submit} →</button>
          </form>
        </div>
      </div>
    </section>
  </Frame>;
}

export function ContactPage() { return <Suspense fallback={null}><ContactForm /></Suspense>; }

const THANKS: Record<Profil, { note: string; label: string; href: string }> = {
  ecole: { note: "Votre demande est transmise à l’équipe qui accompagne les établissements.", label: "Découvrir le programme", href: "/refonte-v2/programme" },
  parent: { note: "Votre demande est transmise au support technique.", label: "Parents & licences", href: "/refonte-v2/parents-licences" },
  partenaire: { note: "Votre demande est transmise à l’équipe partenariats.", label: "Voir les partenariats", href: "/refonte-v2/partenariats" },
};

function Thanks() {
  const requested = useSearchParams().get("profil");
  const p = THANKS[isProfil(requested) ? requested : "ecole"];
  return <Frame>
    <section style={st("background:#f0fffe")}>
      <div style={{ ...S.wrap, ...st("padding:clamp(64px,10vh,128px) 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:48px;align-items:center") }}>
        <div style={st("display:flex;flex-direction:column;gap:20px;max-width:560px")}>
          <p style={S.eyebrow}>Demande envoyée</p>
          <h1 style={S.h1}>Merci, votre demande est envoyée.</h1>
          <p style={S.lead}>{p.note}</p>
          <div style={st("display:flex;gap:16px;flex-wrap:wrap;margin-top:8px")}>
            <a href="/refonte-v2" style={S.ink}>Retour à l’accueil</a>
            <a href={p.href} style={S.ghost}>{p.label}</a>
          </div>
        </div>
        <div style={st("display:grid;place-items:center")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/charte/kobot/kobot-celebrating.png" alt="Kobot célèbre" style={{ ...S.kobotShadow, width: "min(100%,360px)" }} />
        </div>
      </div>
    </section>
  </Frame>;
}

export function ThanksPage() { return <Suspense fallback={null}><Thanks /></Suspense>; }

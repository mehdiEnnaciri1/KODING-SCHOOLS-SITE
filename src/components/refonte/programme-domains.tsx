"use client";

import { useState } from "react";
import { S, st } from "./page-kit";
import { ProgrammeStart } from "./home-sections-v2";

// Section « Ce que vos élèves vont apprendre » de la maquette Accueil Charte 2026.
const DOMAINS = [
  { code: "01", label: "Programmation", fullName: "Algorithmie & programmation", title: "De Blockly aux langages de programmation.", description: "Les élèves commencent par des blocs visuels, puis abordent le web, Python et les applications. L’électronique et la robotique virtuelles donnent un contexte concret aux boucles, conditions et variables.", examples: [["4AP", "Programmer en électronique virtuelle"], ["3AP", "Guider un robot virtuel avec des boucles"], ["6AP", "Créer une page web en HTML et CSS"], ["3AC", "Développer une application mobile avec l’IA"]], caption: "Extrait réel du cours sur les conditions." },
  { code: "02", label: "Technologie", fullName: "Technologie", title: "Du binaire à l’intelligence artificielle.", description: "Comment l’ordinateur représente-t-il une information ? Comment fonctionne l’IA ? Le programme relie les concepts aux ordinateurs, aux réseaux et aux technologies que les élèves utilisent.", examples: [["3AP", "Découvrir l’intelligence artificielle"], ["1AC", "Approfondir le fonctionnement de l’IA"], ["2AC", "Comprendre le codage de l’information"], ["3AC", "S’initier à la cryptographie"]], caption: "À vous de jouer : changez les bits pour composer un caractère." },
  { code: "03", label: "Citoyenneté", fullName: "Citoyenneté digitale", title: "Grandir avec un regard critique.", description: "Protéger ses comptes, repérer une information douteuse, réagir au cyberharcèlement. Les situations étudiées évoluent avec l’âge et les usages des élèves.", examples: [["3AP", "Sécuriser ses mots de passe"], ["6AP", "Reconnaître le phishing et vérifier une information"], ["1AC", "Prévenir le cyberharcèlement et repérer les biais de l’IA"], ["2AC", "Comprendre l’éthique de l’IA et le big data"]], caption: "Une situation pour apprendre à repérer le phishing." },
  { code: "04", label: "Médias", fullName: "Bureautique & médias", title: "Créer des contenus dont on est fier.", description: "La création accompagne tout le parcours : images, textes, présentations, audio, vidéo et design. L’IA devient un outil que les élèves apprennent à utiliser et à questionner.", examples: [["3AP", "Publier et créer des designs avec l’IA"], ["4AP", "Rédiger et mettre en page un document"], ["5AP", "Concevoir une présentation avec l’IA"], ["1AC", "Produire un podcast avec l’IA"]], caption: "Illustration du travail de création audio." },
  { code: "05", label: "Data", fullName: "Information & data", title: "Comprendre ce que racontent les données.", description: "Classer, visualiser, calculer, puis analyser et modéliser : les élèves construisent progressivement les bases nécessaires pour travailler avec les données.", examples: [["3AP", "Collecter et représenter des données"], ["5AP", "Découvrir le tableur"], ["2AC", "Analyser avec les tableaux croisés dynamiques"], ["3AC", "S’initier à la data science"]], caption: "À vous de jouer : comparez les représentations des mêmes données." },
] as const;

const ROWS: readonly (readonly [string, number])[] = [["Jan.", 24], ["Fév.", 38], ["Mars", 31], ["Avr.", 56], ["Mai", 47]];
const WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1];
const demoTag = st("font-size:13px;font-weight:500;letter-spacing:.04em");

function Binary() {
  const [bits, setBits] = useState(65);
  const printable = bits >= 32 && bits <= 126;
  const kind = printable ? "Caractère ASCII" : bits < 32 || bits === 127 ? "Code ASCII de contrôle" : "Hors du jeu ASCII standard";
  return <div style={st("background:#0e2526;color:#ffffff;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:20px")}>
    <span style={{ ...demoTag, color: "#3eccc5" }}>Le langage des ordinateurs</span>
    <div style={st("display:flex;align-items:center;gap:24px")}>
      <span style={st("width:88px;height:88px;border-radius:16px;background:#3eccc5;color:#0e2526;display:grid;place-items:center;font-size:48px;font-weight:700")}>{printable ? String.fromCharCode(bits) : "—"}</span>
      <div style={st("display:flex;flex-direction:column;gap:2px")}><span style={st("font-size:14px;color:#d8f5f3")}>Valeur décimale</span><strong style={st("font-size:36px;line-height:44px")}>{bits}</strong><small style={st("font-size:14px;color:#d8f5f3")}>{kind}</small></div>
    </div>
    <div style={st("display:grid;grid-template-columns:repeat(8,1fr);gap:6px")}>
      {WEIGHTS.map(w => { const on = Boolean(bits & w); return <div key={w} style={st("display:flex;flex-direction:column;align-items:center;gap:6px")}>
        <button type="button" onClick={() => setBits(bits ^ w)} aria-pressed={on} aria-label={`Bit de valeur ${w}`} style={{ ...st("width:100%;aspect-ratio:1;max-width:44px;border-radius:8px;border:1.5px solid #3eccc5;font-size:18px;font-weight:700;cursor:pointer;font-family:inherit"), background: on ? "#3eccc5" : "transparent", color: on ? "#0e2526" : "#ffffff" }}>{on ? "1" : "0"}</button>
        <span style={st("font-size:12px;color:#d8f5f3")}>{w}</span>
      </div>; })}
    </div>
    <div style={st("display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:14px")}><p style={st("margin:0;color:#d8f5f3")}>Changez un bit. Observez la valeur.</p><button type="button" onClick={() => setBits(65)} style={st("background:none;border:0;color:#ffffff;font-weight:700;font-size:14px;cursor:pointer;font-family:inherit")}>Réinitialiser ↺</button></div>
  </div>;
}

function Phishing() {
  const [answer, setAnswer] = useState<"open" | "verify" | null>(null);
  const feedback = answer === "verify" ? "Le bon réflexe : accéder au service par son adresse habituelle, sans communiquer son mot de passe."
    : answer === "open" ? "L’urgence et la demande de mot de passe sont des signaux d’alerte. Vérifiez le message par un autre canal."
    : "Une mise en situation pour parler du phishing en classe.";
  const choice = st("border-radius:999px;border:1.5px solid #4a6365;padding:12px 20px;font-size:15px;font-weight:700;color:#0e2526;cursor:pointer;font-family:inherit");
  return <div style={st("background:#f0fffe;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px")}>
    <span style={{ ...demoTag, color: "#0e2526" }}>Sécurité en ligne</span>
    <div style={st("background:#ffffff;border:1px solid #cfe3e1;border-radius:16px;padding:16px 20px")}><span style={st("font-size:13px;color:#4a6365")}>Message reçu</span><p style={st("margin:6px 0 0;font-size:16px;line-height:26px;font-weight:500")}>Ton compte sera supprimé. Clique ici et donne ton mot de passe.</p></div>
    <h4 style={st("margin:0;font-size:20px;line-height:28px;font-weight:700")}>Quel réflexe adopter ?</h4>
    <div style={st("display:flex;gap:12px;flex-wrap:wrap")}>
      <button type="button" onClick={() => setAnswer("open")} style={{ ...choice, background: answer === "open" ? "#ff9c13" : "#ffffff" }}>J’ouvre le lien</button>
      <button type="button" onClick={() => setAnswer("verify")} style={{ ...choice, background: answer === "verify" ? "#3eccc5" : "#ffffff" }}>Je vérifie la source</button>
    </div>
    <p role="status" style={st("margin:0;font-size:16px;line-height:26px;color:#0e2526")}>{feedback}</p>
  </div>;
}

function Media() {
  const pill = st("background:#ffffff;border-radius:999px;padding:8px;text-align:center;font-size:14px;font-weight:500");
  return <div style={st("background:#d8f5f3;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:20px")}>
    <span style={{ ...demoTag, color: "#0e2526" }}>Production audio avec IA · 1AC</span>
    <h4 style={st("margin:0;font-size:36px;line-height:44px;font-weight:700")}>Le podcast de la classe.</h4>
    <span style={st("font-size:14px;color:#4a6365")}>Du script à la création audio</span>
    <ol style={st("list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:8px")}>
      <li style={pill}>Écrire</li><li style={pill}>Enregistrer</li><li style={pill}>Monter</li><li style={{ ...pill, background: "#ff9c13", fontWeight: 700 }}>Partager</li>
    </ol>
  </div>;
}

function Data() {
  return <div style={st("background:#f0fffe;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px")}>
    <span style={{ ...demoTag, color: "#0e2526" }}>Collecter. Représenter. Comprendre.</span>
    <h4 style={st("margin:0;font-size:36px;line-height:44px;font-weight:700")}>Les données prennent forme.</h4>
    <span style={st("font-size:14px;font-weight:500;color:#4a6365")}>Livres empruntés</span>
    <div role="img" aria-label="Exemple fictif de livres empruntés : janvier 24, février 38, mars 31, avril 56, mai 47." style={st("display:flex;align-items:flex-end;gap:12px;height:180px;padding:12px;background:#ffffff;border-radius:16px")}>
      {ROWS.map(([label, value], i) => <div key={label} style={st("flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end")}>
        <span style={st("font-size:13px;font-weight:700")}>{value}</span>
        <i style={{ display: "block", width: "100%", height: `${Math.round(value / 60 * 100)}%`, background: i === 3 ? "#ff9c13" : "#3eccc5", borderRadius: "8px 8px 0 0" }} />
        <span style={st("font-size:12px;color:#4a6365")}>{label}</span>
      </div>)}
    </div>
    <p style={st("margin:0;font-size:16px;line-height:26px")}>D’un tableau à un graphique, les élèves apprennent à lire et comparer des données.</p>
    <small style={st("font-size:13px;color:#4a6365")}>Données fictives pour cette démonstration.</small>
  </div>;
}

function Code() {
  return <div style={st("border:1px solid #cfe3e1;border-radius:16px;overflow:hidden;background:#ffffff")}>
    <div style={st("display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid #cfe3e1;font-size:14px;font-weight:500")}><span>Programmer avec Blockly</span><a href="https://kodingschools.com/wp-content/blockly/charger/text-if/C3L12/3/index.php?langue=fr" target="_blank" rel="noreferrer" style={st("font-weight:700")}>Essayer l’activité ↗</a></div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/refonte/blockly-activity.png" alt="Extrait de l’activité Koding Schools : guider Kobot à l’aide de blocs et de conditions" style={st("display:block;width:100%;height:auto")} />
    <div style={st("display:flex;gap:12px;align-items:center;padding:12px 16px;border-top:1px solid #cfe3e1;font-size:13px;font-weight:500;color:#4a6365")}><span>Blockly</span><i style={st("width:24px;height:1px;background:#cfe3e1;display:block")} /><span>HTML / CSS</span><i style={st("width:24px;height:1px;background:#cfe3e1;display:block")} /><span>Python</span></div>
  </div>;
}

export function ProgrammeDomains() {
  const [active, setActive] = useState(0);
  const d = DOMAINS[active];
  const demos = [<Code key="c" />, <Binary key="b" />, <Phishing key="p" />, <Media key="m" />, <Data key="d" />];
  return <section id="programme" style={st("background:#f0fffe")} aria-labelledby="programme-title">
    <div style={{ ...S.wrap, ...st("padding:96px 24px;display:flex;flex-direction:column;gap:48px") }}>
      <div style={st("max-width:720px;display:flex;flex-direction:column;gap:16px")}>
        <h2 id="programme-title" style={{ ...S.h2, color: "#0e2526" }}>Ce que vos élèves vont apprendre.</h2>
        <p style={S.lead}>Dès la 1re année primaire, cinq domaines pour apprendre à programmer, comprendre l’IA, créer et développer son esprit critique.</p>
      </div>
      <div role="tablist" aria-label="Les cinq domaines du programme" style={st("display:flex;flex-wrap:wrap;gap:8px")}>
        {DOMAINS.map((x, i) => <button key={x.code} type="button" role="tab" id={`domain-tab-${i}`} aria-selected={i === active} aria-controls="domain-panel" onClick={() => setActive(i)} style={{ ...st("display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:12px 22px;border-radius:999px;color:#0e2526;font-size:16px;font-weight:700;cursor:pointer;font-family:inherit"), border: `1.5px solid ${i === active ? "#3eccc5" : "#cfe3e1"}`, background: i === active ? "#3eccc5" : "#ffffff" }}><span style={{ fontSize: 13, fontWeight: 500, color: i === active ? "#0e2526" : "#4a6365" }}>{x.code}</span>{x.label}</button>)}
      </div>
      <div id="domain-panel" role="tabpanel" aria-labelledby={`domain-tab-${active}`} style={st("background:#ffffff;border:1px solid #cfe3e1;border-radius:28px;padding:40px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr));gap:48px;align-items:start")}>
        <div style={st("display:flex;flex-direction:column;gap:16px")}>
          <p style={S.eyebrow}>{d.fullName}</p>
          <h3 style={st("margin:0;font-size:24px;line-height:32px;font-weight:700;color:#0e2526")}>{d.title}</h3>
          <p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>{d.description}</p>
          <h4 style={st("margin:16px 0 0;font-size:16px;line-height:26px;font-weight:700;color:#0e2526")}>Mais aussi…</h4>
          <ul style={st("list-style:none;margin:0;padding:0;display:flex;flex-direction:column")}>
            {d.examples.map(([level, title]) => <li key={title} style={st("display:flex;gap:16px;align-items:center;padding:12px 0;border-top:1px solid #cfe3e1")}><span style={st("flex-shrink:0;min-width:64px;text-align:center;background:#d8f5f3;border-radius:999px;padding:4px 10px;font-size:13px;line-height:16px;font-weight:500;letter-spacing:.04em;color:#0e2526")}>{level}</span><strong style={st("font-size:16px;line-height:26px;font-weight:500;color:#0e2526")}>{title}</strong></li>)}
          </ul>
        </div>
        <div style={st("display:flex;flex-direction:column;gap:12px")}>
          {demos[active]}
          <p style={st("margin:0;font-size:14px;line-height:22px;color:#4a6365")}>{d.caption}</p>
        </div>
      </div>
      <ProgrammeStart />
    </div>
  </section>;
}

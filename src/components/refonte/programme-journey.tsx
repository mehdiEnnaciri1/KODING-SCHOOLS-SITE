"use client";

import Image from "next/image";
import { DataLab } from "./data-lab";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { curriculumModules, domains } from "@/domain/refonte/content";
import s from "./programme-journey.module.css";

function BinaryLab() {
  const [value, setValue] = useState(65);
  return <div className={s.binaryLab}>
    <div className={s.labHeading}><span>Le langage des ordinateurs</span></div>
    <div className={s.binaryResult} aria-live="polite"><span className={s.binaryLetter}>{value >= 32 && value <= 126 ? String.fromCharCode(value) : "—"}</span><div><span>Valeur décimale</span><strong>{value}</strong><small>{value >= 32 && value <= 126 ? "Caractère ASCII" : value < 32 || value === 127 ? "Code ASCII de contrôle" : "Hors du jeu ASCII standard"}</small></div></div>
    <div className={s.bits} aria-label="Manipuler huit bits">{[128,64,32,16,8,4,2,1].map(weight => <div key={weight}><button aria-label={`Bit de poids ${weight}`} aria-pressed={Boolean(value & weight)} onClick={() => setValue(value ^ weight)}>{value & weight ? 1 : 0}</button><span>{weight}</span></div>)}</div>
    <div className={s.labFoot}><p>Changez un bit. Observez la valeur.</p><button onClick={() => setValue(65)} aria-label="Rétablir la lettre A, valeur 65">Réinitialiser ↺</button></div>
  </div>;
}

function CitizenshipLab() {
  const [answer, setAnswer] = useState<"open" | "verify" | null>(null);
  return <div className={s.citizenshipLab}><span className={s.visualLabel}>Sécurité en ligne</span><div className={s.messageSample}><span>Message reçu</span><p>Ton compte sera supprimé. Clique ici et donne ton mot de passe.</p></div><h4>Quel réflexe adopter ?</h4><div className={s.choiceButtons}><button onClick={() => setAnswer("open")} aria-pressed={answer === "open"}>J’ouvre le lien</button><button onClick={() => setAnswer("verify")} aria-pressed={answer === "verify"}>Je vérifie la source</button></div><p role="status" className={s.feedback}>{answer === "verify" ? "Le bon réflexe : accéder au service par son adresse habituelle, sans communiquer son mot de passe." : answer === "open" ? "L’urgence et la demande de mot de passe sont des signaux d’alerte. Vérifiez le message par un autre canal." : "Une mise en situation pour parler du phishing en classe."}</p></div>;
}

function MediaLab() {
  const [take, setTake] = useState(1);
  return <div className={s.mediaVisual}>
    <span className={s.visualLabel}>Production audio avec IA · 1AC</span>
    <h4>Le podcast<br />de la classe.</h4>
    <svg key={take} className={s.waveform} data-playing={take > 0} viewBox="0 0 600 130" aria-hidden="true">{Array.from({ length: 67 }, (_, i) => {
      const height = 12 + Math.abs(Math.sin(i * .59) * Math.cos(i * .21)) * 104;
      return <rect key={i} x={i * 9} y={(130 - height) / 2} width="4" height={height} rx="2" fill={i < 41 ? '#F7941D' : '#669C9C'} style={{ "--bar": i % 9 } as CSSProperties} />;
    })}</svg>
    <div className={s.mediaTimeline}><span>Du script à la création audio</span><button onClick={() => setTake(take + 1)}>Rejouer l’aperçu <span aria-hidden="true">↗</span></button></div>
    <ol className={s.mediaTools}><li>Écrire</li><li>Enregistrer</li><li>Monter</li><li>Partager</li></ol>
    <p className={s.mediaNote}>Illustration visuelle, sans lecture audio.</p>
  </div>;
}

function DomainVisual({ active }: { active: number }) {
  if (active === 1) return <BinaryLab />;
  if (active === 2) return <CitizenshipLab />;
  if (active === 3) return <MediaLab />;
  if (active === 4) return <DataLab />;
  return <div className={s.codeVisual}><div className={s.codeHeading}><span>Programmer avec Blockly</span><a href="https://kodingschools.com/wp-content/blockly/charger/text-if/C3L12/3/index.php?langue=fr" target="_blank" rel="noreferrer" aria-label="Ouvrir la véritable activité Blockly dans un nouvel onglet">Essayer l’activité ↗</a></div><a className={s.actualCapture} href="https://kodingschools.com/wp-content/blockly/charger/text-if/C3L12/3/index.php?langue=fr" target="_blank" rel="noreferrer" aria-label="Découvrir l’activité Blockly de Koding Schools"><Image src="/refonte/blockly-activity.png" width={1280} height={900} unoptimized alt="Extrait de l’activité Koding Schools : guider Kobot à l’aide de blocs et de conditions" /></a><div className={s.languagePath}><span>Blockly</span><i aria-hidden="true" /><span>HTML / CSS</span><i aria-hidden="true" /><span>Python</span></div><small>Une activité de la plateforme Koding Schools.</small></div>;
}

export function ProgrammeJourney() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const explorer = useRef<HTMLDivElement>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedDomain = curriculumModules[active];
  useEffect(() => {
    const node = explorer.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const selectWithKeyboard = (index: number, key: string) => {
    const next = key === "ArrowRight" ? (index+1)%5 : key === "ArrowLeft" ? (index+4)%5 : key === "Home" ? 0 : key === "End" ? 4 : null;
    if (next !== null) { setActive(next); tabs.current[next]?.focus(); }
  };
  return <div ref={explorer} className={s.explorer} data-visible={visible}>
    <div className={s.domainTabs} role="tablist" aria-label="Les cinq domaines du programme">{curriculumModules.map((item,i)=><button role="tab" key={item.label} id={`domain-tab-${i}`} ref={el=>{tabs.current[i]=el;}} aria-controls="domain-panel" aria-selected={active===i} tabIndex={active===i?0:-1} onKeyDown={e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();selectWithKeyboard(i,e.key);}}} onClick={()=>setActive(i)}><span aria-hidden="true">0{i+1}</span>{item.label}</button>)}</div>
    <div key={`panel-${active}`} data-domain={active} role="tabpanel" tabIndex={0} id="domain-panel" aria-labelledby={`domain-tab-${active}`} className={s.domainPanel}>
      <div className={s.domainCopy}>
        <p className={s.fullDomain}>{domains[active].name}</p>
        <h3>{selectedDomain.title}</h3>
        <p className={s.description}>{selectedDomain.description}</p>
        <div className={s.moreActivities}>
          <h4>Mais aussi…</h4>
          <ul className={s.curriculumExamples}>{selectedDomain.examples.map((example,index)=><li key={example.level} style={{ "--step": index } as CSSProperties}><span>{example.level}</span><strong>{example.title}</strong></li>)}</ul>
        </div>
      </div>
      <div className={s.visualColumn}>
        <DomainVisual active={active} />
        <p className={s.visualCaption}>{active === 0 ? "Extrait réel du cours sur les conditions." : active === 1 ? "À vous de jouer : changez les bits pour composer un caractère." : active === 2 ? "Une situation pour apprendre à repérer le phishing." : active === 3 ? "Illustration du travail de création audio." : "À vous de jouer : comparez les représentations des mêmes données."}</p>
      </div>
    </div>

  </div>;
}

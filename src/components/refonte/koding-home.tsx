"use client";

import { useEffect, useRef, useState } from "react";
import { OfferSystem } from "./offer-system";
import { SiteHeader, SiteFooter } from "./site-navigation";
import { KobotScene } from "./kobot-scene";
import { ProgrammeJourney } from "./programme-journey";
import { AdaptedPath } from "./adapted-path";
import { ProgrammeDomains } from "./programme-domains";
import { LessonResources } from "./lesson-resources";
import { SchoolDeployment } from "./school-deployment";
import { SchoolTestimony } from "./school-testimony";
import { MediaCoverage } from "./media-coverage";
import { PresseV2, SeanceV2 } from "./home-sections-v2";
import { BlogPreview } from "./blog-preview";
import { SchoolFaq } from "./school-faq";
import { ParentsGateway } from "./parents-gateway";
import { HomeClosing } from "./home-closing";
import { HomeVersionProvider, type HomeVersion } from "./home-version";
import { CompanionSprite } from "./companion-sprite";
import s from "./koding-home.module.css";

type IconName = "arrow" | "play" | "code" | "chip" | "shield" | "pen" | "chart" | "check" | "book" | "close";
function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
    play: <path d="m9 5 11 7-11 7Z" />,
    code: <><path d="m7 7-5 5 5 5m10-10 5 5-5 5M14 4l-4 16" /></>,
    chip: <><rect x="6" y="6" width="12" height="12" rx="3" /><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4M10 10h4v4h-4Z" /></>,
    shield: <><path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6Z" /><path d="m8 12 3 3 5-6" /></>,
    pen: <><path d="m4 16 12-12 4 4L8 20l-5 1Zm9-9 4 4M3 4h5M4 3v5" /></>,
    chart: <><path d="M4 3v18h17M9 16v-5m5 5V6m5 10V9" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    book: <><path d="M12 5v16M12 5C8 2 3 3 3 3v16s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2Z" /></>,
    close: <path d="m6 6 12 12M6 18 18 6" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function KodingHome({ version = "v1" }: { version?: HomeVersion }) {
  const [modal, setModal] = useState<"demo" | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const site = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (modal) dialog.current?.showModal();
    else dialog.current?.close();
  }, [modal]);
  useEffect(() => {
    if (!modal) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [modal]);
  return <HomeVersionProvider version={version}><div ref={site} className={s.site} id="accueil" data-version={version}>
    <SiteHeader />
    <main id="contenu">
      <section className={s.hero} aria-labelledby="hero-title"><div className={`${s.wrap} ${s.heroGrid}`}>
        <div className={s.heroCopy}><p className={s.heroContext}>{version === "v2" ? "Du primaire à la première année du lycée" : "De la première année du primaire au lycée"}</p><h1 id="hero-title">Le numérique et l’IA,<br className={s.desktopBreak} /> au programme<br className={s.desktopBreak} /> de votre école.</h1><p className={s.heroLead}>{version === "v2" ? "Un programme clé en main, des cours prêts à l’emploi et une plateforme pour aider vos enseignants à faire découvrir le numérique, la programmation et l’IA chaque semaine." : "Un programme complet, une plateforme d’apprentissage et une formation pour vos enseignants. Les cours et les activités sont prêts pour une séance de numérique chaque semaine."}</p><div className={s.heroActions}><button className={s.orangeButton} onClick={() => setModal("demo")}>{version === "v2" ? "Demander une démo" : "Demander une présentation"}</button><a className={s.lightLink} href="#seance"><Icon name="play" size={18} /> Explorer une séance</a></div><div className={s.heroLanguages}><span>Le programme est disponible en</span><strong>Français <i aria-hidden="true">/</i> Anglais</strong></div></div>
        <div className={s.heroVisual}>{version === "v2" ? <KobotScene src="/refonte-v2/hero.png" alt="Le nouveau compagnon Koding Schools, au visage blanc, salue les visiteurs" floating /> : <KobotScene />}</div>
      </div></section>
      {version === "v1" && <OfferSystem />}
      {version === "v2" ? <ProgrammeDomains /> : <>
      <section id="programme" className={s.programme} aria-labelledby="programme-title"><div className={s.wrap}><div className={s.programmeHeading}><h2 id="programme-title">Ce que vos élèves vont apprendre.</h2><p>Dès la 1re année primaire, cinq domaines pour apprendre à programmer, comprendre l’IA, créer et développer son esprit critique.</p></div><ProgrammeJourney />
      </div></section>
      </>}
      {version === "v1" && <AdaptedPath />}
      {version === "v2" ? <SeanceV2 /> : <LessonResources />}
      <SchoolDeployment onContact={() => setModal("demo")} />
      <SchoolTestimony />
      {version === "v2" ? <PresseV2 /> : <MediaCoverage />}
      <ParentsGateway />
      <SchoolFaq illustration={version === "v2" ? <CompanionSprite pose="thinking" /> : undefined} />
      <BlogPreview />
      <HomeClosing onPresentation={() => setModal("demo")} />
    </main>
    <SiteFooter />
    <dialog ref={dialog} className={s.dialog} onCancel={() => setModal(null)} onClick={e => { if (e.target === e.currentTarget) setModal(null); }} aria-labelledby="dialog-title"><div className={s.dialogInner}><button className={s.closeButton} onClick={() => setModal(null)} aria-label="Fermer la fenêtre"><Icon name="close" /></button>{modal === "demo" ? <><h2 id="dialog-title">Découvrir Koding Schools pour votre école.</h2><p>Un échange pour parcourir le programme, découvrir les ressources d’une séance et identifier le point de départ de votre établissement.</p><ul><li>Vos niveaux et votre organisation</li><li>Une démonstration de la plateforme</li><li>Les étapes pour démarrer</li></ul><a className={s.orangeButton} href="/contact?profil=ecole">Contacter l’équipe</a></> : null}</div></dialog>
  </div></HomeVersionProvider>;
}

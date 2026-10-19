"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { lessonResources } from "@/domain/refonte/lesson-resources";
import s from "./lesson-resources.module.css";

type LessonResource = (typeof lessonResources)[number];
const copy = [
  { title: "Préparer", support: "Vidéo & script", text: "Les notions et le déroulé du cours, avant d’entrer en classe." },
  { title: "Animer", support: "Slides à projeter", text: "Des questions et des exemples pour faire participer les élèves." },
  { title: "Pratiquer", support: "Pratique & projets", text: "Des activités ciblées pour s’entraîner, et surtout des projets pour créer et mobiliser les acquis." },
  { title: "Consolider", support: "Cahier de l’élève", text: "Un cahier papier, imprimable, pour récapituler l’essentiel des cours." },
] as const;

export function LessonResources() {
  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState<LessonResource | null>(null);
  const section = useRef<HTMLElement>(null);
  const gallery = useRef<HTMLOListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!opened) { dialog.current?.close(); return; }
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [opened]);

  function moveGallery(direction: number) {
    const node = gallery.current;
    if (!node) return;
    const item = node.firstElementChild;
    node.scrollBy({ left: direction * ((item?.getBoundingClientRect().width ?? 280) + 24), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return <section id="seance" ref={section} className={s.section} data-visible={visible} aria-labelledby="session-title">
    <div className={s.inner}>
      <header className={s.heading}>
        <p>Du côté des enseignants</p>
        <h2 id="session-title">Les ressources de chaque séance<span>.</span></h2>
        <p>Un même cours, de sa préparation aux premières réalisations des élèves.</p>
      </header>
      <div className={s.galleryHeader}>
        <p>À découvrir ici <span>Introduction aux algorithmes & programmes</span></p>
        <div className={s.mobileControls}><button onClick={() => moveGallery(-1)} aria-label="Support précédent">←</button><button onClick={() => moveGallery(1)} aria-label="Support suivant">→</button></div>
        <span className={s.language}>Extraits en français</span>
      </div>
      <ol className={s.gallery} ref={gallery} aria-label="Les quatre supports d’une séance">
        {lessonResources.map((resource, index) => <li className={s.item} key={resource.name} data-kind={index}>
          <div className={s.step}><span>0{index + 1}</span><h3>{copy[index].title}</h3></div>
          <button className={s.scene} onClick={() => setOpened(resource)} aria-label={`Agrandir l’aperçu : ${resource.support}`}>
            <span className={s.sheet}>
              <Image src={`/refonte/seance/${resource.image}`} width={resource.width} height={resource.height} unoptimized alt={resource.alt} />
              {index === 0 && <span className={s.play} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 5 11 7-11 7Z" fill="currentColor" /></svg></span>}
              <span className={s.expand} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></span>
            </span>
          </button>
          <div className={s.description}><h4>{copy[index].support}</h4><p>{copy[index].text}</p></div>

        </li>)}
      </ol>
      <a className={s.teacherNote} href="https://kodingschools.com/fr/aia-lia-contextuelle-pedagogique-qui-transforme-leducation/">
        <span className={s.aiaMark}><Image src="/refonte/aia-teacher.png" width={96} height={96} unoptimized alt="AIA, l’assistant pédagogique de Koding Schools" /></span>
        <span><strong>Mais aussi, AIA, votre assistant pédagogique.</strong><span>Pour préparer une séance et adapter une explication au contexte du cours.</span></span>
        <span className={s.noteArrow} aria-hidden="true">↗</span>
      </a>
    </div>
    <dialog ref={dialog} className={s.dialog} aria-labelledby="lesson-dialog-title" onCancel={() => setOpened(null)} onClose={() => setOpened(null)} onClick={event => { if (event.target === event.currentTarget) setOpened(null); }}>
      <div className={s.dialogBar}><h2 id="lesson-dialog-title">{opened?.support}</h2><button onClick={() => setOpened(null)} aria-label="Fermer le support"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg></button></div>
      {opened && <div className={s.expandedPreview}><Image src={`/refonte/seance/${opened.image}`} width={opened.width} height={opened.height} unoptimized alt={opened.alt} /></div>}
      <div className={s.dialogFoot}><span>{opened?.caption}</span></div>
    </dialog>
  </section>;
}

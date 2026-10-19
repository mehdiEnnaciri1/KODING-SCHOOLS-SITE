"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { questions } from "@/domain/refonte/content";
import s from "./school-faq.module.css";

export function SchoolFaq({ illustration }: { illustration?: ReactNode }) {
  const [opened, setOpened] = useState<number | null>(0);
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!section.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  return <section id="questions" ref={section} data-visible={visible} className={s.section} aria-labelledby="faq-title">
    <div className={s.inner}>
      <header className={s.intro}>
        <span className={s.rule} aria-hidden="true" />
        <h2 id="faq-title">Les questions<br />{" "}des écoles<span>.</span></h2>
        <p>Les repères pour préparer<br className={s.desktopBreak} /> votre première année.</p>
        <div className={s.contact}><p>Une question sur votre école ?</p><a href="https://kodingschools.com/fr/contact/">Contactez-nous <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></a></div>
        {illustration}
      </header>
      <div className={s.accordion}>
        {questions.map((question, index) => {
          const expanded = opened === index;
          return <div className={s.item} data-open={expanded} key={question.q}>
            <h3><button type="button" id={`school-question-${index}`} aria-expanded={expanded} aria-controls={`school-answer-${index}`} onClick={() => setOpened(expanded ? null : index)}>
              <span>{question.q}</span><span className={s.toggle} aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12h14" /><path className={s.vertical} d="M12 5v14" /></svg></span>
            </button></h3>
            <div className={s.panel} id={`school-answer-${index}`} role="region" aria-labelledby={`school-question-${index}`} aria-hidden={!expanded} inert={!expanded}>
              <div className={s.clip}><div className={s.answer}><p>{question.a}</p></div></div>
            </div>
          </div>;
        })}
      </div>
    </div>
  </section>;
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { mediaAppearances, mediaLogos } from "@/domain/refonte/media";
import { useHomeVersion } from "./home-version";
import s from "./media-coverage.module.css";

export function MediaCoverage() {
  const { version } = useHomeVersion();
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!section.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  return <section id="medias" ref={section} data-visible={visible} className={s.section} aria-labelledby="press-title">
    <div className={s.inner}>
      <h2 id="press-title">Ils parlent de Koding Schools<span>.</span></h2>
      <ul className={s.editions}>
        {mediaAppearances.map(media => <li key={media.id}>
          <a className={s.edition} href={`https://www.youtube.com/watch?v=${media.video}`} target="_blank" rel="noreferrer" aria-label={`Voir ${media.programme} sur ${media.name}, ${media.date} — YouTube, nouvel onglet`}>
            <div className={s.masthead}>
              <div className={s.logo} data-media={media.id}><Image src={`/refonte/logos/${media.logo}`} alt={media.name} width={120} height={75} unoptimized /></div>
              <time dateTime={media.dateTime}>{media.date}</time>
            </div>
            <div className={s.article}>
              <div><h3>{media.programme}</h3><p>{media.presenter}</p></div>
              <span className={s.play} aria-hidden="true"><svg width="19" height="19" viewBox="0 0 24 24"><path d="m9 5 11 7-11 7Z" fill="currentColor" /></svg></span>
            </div>
            <span className={s.watch}>Voir le passage <span aria-hidden="true">↗</span></span>
          </a>
        </li>)}
      </ul>
      {version === "v2" && <ul className={s.pressMarks} aria-label="Dans les médias : Koding Schools et nos origines">
        {mediaLogos.map(media => <li key={media.id} data-media={media.id}>
          <a href={media.href} target="_blank" rel="noopener noreferrer" aria-label={`Voir le contenu ${media.name} : ${media.content} (nouvel onglet)`}>
            <Image src={`/refonte-v2/media/${media.logo}`} alt="" width={160} height={68} unoptimized />
            <span className={s.externalMark} aria-hidden="true">↗</span>
            {media.id === "medias24" && <span className={s.archiveNote}>Koding Kids · 2017</span>}
          </a>
        </li>)}
      </ul>}
    </div>
  </section>;
}

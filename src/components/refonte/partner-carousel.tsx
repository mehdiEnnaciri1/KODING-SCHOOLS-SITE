"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { useMarquee } from "./use-marquee";
import layout from "./koding-home.module.css";
import s from "./partner-carousel.module.css";

const partners = [
  { file: "ebrd-gray.svg", name: "BERD", programme: "Star Venture" },
  { file: "startup-maroc.png", name: "Startup Maroc", programme: "Programme 2030" },
  { file: "tamwilcom-gray.svg", name: "Tamwilcom", programme: "" },
  { file: "inwi.png", name: "inwi", programme: "" },
  { file: "mastercard-foundation.png", name: "Mastercard Foundation", programme: "" },
  { file: "la-startup-station.png", name: "La Startup Station", programme: "La Startup Station" },
];

export function PartnerCarousel() {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const visible = useMarquee(section, rail, 64);

  return <section ref={section} className={s.section} data-visible={visible} aria-labelledby="partner-title">
    <div className={`${layout.wrap} ${s.inner}`}>
      <div className={s.heading}>
        <h2 id="partner-title">Ils accompagnent notre parcours.</h2>
      </div>
      <div className={s.rail} ref={rail} role="region" aria-label="Logos des partenaires et programmes d’accompagnement">
        {[0, 1].map(copy => partners.map((partner, index) => <figure className={s.partner} style={{ "--index": index } as CSSProperties} key={`${copy}-${partner.file}`} aria-hidden={copy === 1 ? true : undefined}>
          <div className={s.logo}><Image src={`/refonte/logos/${partner.file}`} width={220} height={100} alt={copy === 0 ? partner.name : ""} unoptimized /></div>
          <figcaption>{partner.programme || partner.name}</figcaption>
        </figure>))}
      </div>
    </div>
  </section>;
}

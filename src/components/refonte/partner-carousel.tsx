"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  const inView = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = rail.current;
    const host = section.current;
    if (!node || !host) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverPointer = window.matchMedia("(hover: hover)");
    let frame = 0;
    let previousTime = 0;
    const animate = (time: number) => {
      const elapsed = previousTime ? Math.min(0.05, (time - previousTime) / 1000) : 0;
      previousTime = time;
      if (inView.current && !reducedMotion.matches && !document.hidden &&
        !(hoverPointer.matches && host.matches(":hover")) && !host.matches(":focus-within")) {
        node.scrollLeft += elapsed * 72;
        const cycle = node.scrollWidth / 2;
        if (node.scrollLeft >= cycle) node.scrollLeft -= cycle;
      }
      frame = requestAnimationFrame(animate);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    };
    const start = () => {
      if (!frame && inView.current && !reducedMotion.matches && !document.hidden) {
        frame = requestAnimationFrame(animate);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
      if (entry.isIntersecting) { setVisible(true); start(); }
      else stop();
    }, { threshold: 0.18 });
    const syncPlayback = () => {
      if (reducedMotion.matches || document.hidden) stop();
      else start();
    };
    observer.observe(host);
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      stop();
    };
  }, []);

  const move = (direction: -1 | 1) => {
    const node = rail.current;
    if (!node) return;
    const cycle = node.scrollWidth / 2;
    if (direction === -1 && node.scrollLeft < 2) node.scrollLeft = cycle;
    if (direction === 1 && node.scrollLeft >= cycle) node.scrollLeft -= cycle;
    node.scrollBy({
      left: direction * Math.min(540, node.clientWidth * 0.75),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return <section ref={section} className={s.section} data-visible={visible} aria-labelledby="partner-title">
    <div className={`${layout.wrap} ${s.inner}`}>
      <div className={s.heading}>
        <h2 id="partner-title">Ils accompagnent notre parcours.</h2>
        <div className={s.controls} aria-label="Navigation du carrousel des partenaires">
          <button type="button" onClick={() => move(-1)} aria-label="Partenaires précédents"><span aria-hidden="true">←</span></button>
          <button type="button" onClick={() => move(1)} aria-label="Partenaires suivants"><span aria-hidden="true">→</span></button>
        </div>
      </div>
      <div className={s.rail} ref={rail} role="region" aria-label="Logos des partenaires et programmes d’accompagnement" tabIndex={0} onKeyDown={event => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}>
        {[0, 1].map(copy => partners.map((partner, index) => <figure className={s.partner} style={{ "--index": index } as CSSProperties} key={`${copy}-${partner.file}`} aria-hidden={copy === 1 ? true : undefined}>
          <div className={s.logo}><Image src={`/refonte/logos/${partner.file}`} width={220} height={100} alt={copy === 0 ? partner.name : ""} unoptimized /></div>
          <figcaption>{partner.programme || partner.name}</figcaption>
        </figure>))}
      </div>
    </div>
  </section>;
}

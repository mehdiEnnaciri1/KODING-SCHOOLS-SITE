"use client";

import { useEffect, useRef } from "react";
import k from "./kobot-hero.module.css";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

// Kobot des heros : arrivée, flottement, parallaxe au défilement et inclinaison 3D qui suit la souris.
export function KobotHero({ src, alt }: { src: string; alt: string }) {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0, px = 0, py = 0, hover = false;
    const paint = () => {
      frame = 0;
      const portrait = el.querySelector<HTMLElement>("[data-kobot-portrait]");
      if (!portrait) return;
      const box = el.getBoundingClientRect();
      const t = reduced.matches ? 0 : clamp((window.innerHeight * 0.5 - box.top - box.height * 0.5) / (window.innerHeight * 0.65), -1, 1);
      const x = reduced.matches ? 0 : px, y = reduced.matches ? 0 : py, active = hover && !reduced.matches;
      portrait.style.setProperty("--kx", `${t * 24 + x * 25}px`);
      portrait.style.setProperty("--ky", `${t * -68 + y * 18 - (active ? 20 : 0)}px`);
      portrait.style.setProperty("--kt", `${t * 17 + x * 6}deg`);
      portrait.style.setProperty("--kyaw", `${x * 15}deg`);
      portrait.style.setProperty("--kp", `${y * -9}deg`);
      portrait.style.setProperty("--ks", active ? "1.065" : "1");
    };
    const update = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches || event.pointerType === "touch") return;
      hover = true;
      const box = el.getBoundingClientRect();
      px = clamp(((event.clientX - box.left) / box.width) * 2 - 1, -1, 1);
      py = clamp(((event.clientY - box.top) / box.height) * 2 - 1, -1, 1);
      update();
    };
    const leave = () => { px = 0; py = 0; hover = false; update(); };
    el.addEventListener("pointerenter", move); el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    update();
    return () => {
      el.removeEventListener("pointerenter", move); el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", update); window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={stage} className={k.stage}>
    <span aria-hidden="true" className={k.shadow} />
    <div data-kobot-portrait className={k.portrait}><div className={k.welcome}><div className={k.float}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={k.img} src={src} alt={alt} draggable={false} />
    </div></div></div>
  </div>;
}

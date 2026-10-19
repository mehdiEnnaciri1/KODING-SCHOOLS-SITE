"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import s from "./kobot-scene.module.css";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function KobotScene({ src = "/refonte/kobot-transparent.png", alt = "Kobot, le compagnon d’apprentissage de Koding Schools, au visage blanc et aux antennes corail", floating = false }: { src?: string; alt?: string; floating?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const [imageReady, setImageReady] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!imageReady || !host.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, [imageReady]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let hovered = false;
    const paint = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      // Movement follows the visitor's scrolling and stops when they stop.
      const travel = reducedMotion.matches ? 0 : clamp((window.innerHeight * 0.5 - bounds.top - bounds.height * 0.5) / (window.innerHeight * 0.65), -1, 1);
      const x = reducedMotion.matches ? 0 : pointerX;
      const y = reducedMotion.matches ? 0 : pointerY;
      const active = hovered && !reducedMotion.matches;
      element.style.setProperty("--kobot-x", `${travel * 24 + x * 25}px`);
      element.style.setProperty("--kobot-y", `${travel * -68 + y * 18 - (active ? 20 : 0)}px`);
      element.style.setProperty("--kobot-tilt", `${travel * 17 + x * 6}deg`);
      element.style.setProperty("--kobot-yaw", `${x * 15}deg`);
      element.style.setProperty("--kobot-pitch", `${y * -9}deg`);
      element.style.setProperty("--kobot-scale", active ? "1.065" : "1");
      element.dataset.hovered = String(active);
    };
    const update = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType === "touch") return;
      hovered = true;
      const bounds = element.getBoundingClientRect();
      pointerX = clamp((event.clientX - bounds.left) / bounds.width * 2 - 1, -1, 1);
      pointerY = clamp((event.clientY - bounds.top) / bounds.height * 2 - 1, -1, 1);
      update();
    };
    const leave = () => { pointerX = 0; pointerY = 0; hovered = false; update(); };
    element.addEventListener("pointerenter", move);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    reducedMotion.addEventListener("change", leave);
    finePointer.addEventListener("change", leave);
    update();
    return () => {
      element.removeEventListener("pointerenter", move);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      reducedMotion.removeEventListener("change", leave);
      finePointer.removeEventListener("change", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className={s.scene} ref={host} data-entered={entered} data-floating={floating}>
    <span className={s.ground} aria-hidden="true"/>
    <div className={s.portrait}><div className={s.entrance}>
      <div className={s.float}><Image className={s.kobot} src={src} width={1024} height={1024} priority onLoad={() => setImageReady(true)} alt={alt}/></div>
    </div></div>
  </div>;
}

"use client";

import { useEffect, useState, type RefObject } from "react";

// Défilement infini : la liste est dupliquée, on revient à zéro à la moitié.
// Pause au survol, au focus, hors écran, onglet masqué et si prefers-reduced-motion.
export function useMarquee(host: RefObject<HTMLElement | null>, rail: RefObject<HTMLElement | null>, speed: number, threshold = 0.18) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = rail.current;
    const root = host.current;
    if (!node || !root) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverPointer = window.matchMedia("(hover: hover)");
    let inView = false;
    let frame = 0;
    let previousTime = 0;
    const animate = (time: number) => {
      const elapsed = previousTime ? Math.min(0.05, (time - previousTime) / 1000) : 0;
      previousTime = time;
      if (inView && !reducedMotion.matches && !document.hidden &&
        !(hoverPointer.matches && root.matches(":hover")) && !root.matches(":focus-within")) {
        node.scrollLeft += elapsed * speed;
        const cycle = node.scrollWidth / 2;
        if (cycle > 0 && node.scrollLeft >= cycle) node.scrollLeft -= cycle;
      }
      frame = requestAnimationFrame(animate);
    };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; previousTime = 0; };
    const start = () => { if (!frame && inView && !reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(animate); };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) { setVisible(true); start(); } else stop();
    }, { threshold });
    const sync = () => { if (reducedMotion.matches || document.hidden) stop(); else start(); };
    observer.observe(root);
    reducedMotion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      stop();
    };
  }, [host, rail, speed, threshold]);

  return visible;
}

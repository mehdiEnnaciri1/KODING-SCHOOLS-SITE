"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import r from "./reveal.module.css";

// Apparition en fondu au défilement ; sans effet si prefers-reduced-motion (géré en CSS).
export function Reveal({ children, delay = 0, style, className = "" }: { children: ReactNode; delay?: number; style?: CSSProperties; className?: string }) {
  const node = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = node.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setSeen(true); observer.disconnect(); } }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={node} className={`${r.reveal} ${seen ? r.in : ""} ${className}`} style={{ ...style, "--d": delay } as CSSProperties}>{children}</div>;
}

export { r as fx };

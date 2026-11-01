"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import s from "./companion-sprite.module.css";

export function CompanionSprite({ pose }: { pose: "learning" | "thinking" }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!host.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 0.2 });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={host} className={`${s.sprite} ${s[pose]}`} data-visible={visible} aria-hidden="true"><div className={s.entrance}><Image src={`/charte/kobot/kobot-${pose}.png`} alt="" width={512} height={512} sizes="180px" className={s.image} /></div></div>;
}

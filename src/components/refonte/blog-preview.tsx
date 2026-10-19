"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { blogUrl, featuredArticle, relatedArticles } from "@/domain/refonte/blog";
import s from "./blog-preview.module.css";

function Arrow() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

export function BlogPreview() {
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!section.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  return <section id="ressources" className={s.section} ref={section} data-visible={visible} aria-labelledby="blog-title">
    <div className={s.inner}>
      <header className={s.heading}>
        <div><p>Le blog Koding Schools</p><h2 id="blog-title">Le numérique à l’école,<br />en pratique<span>.</span></h2></div>
        <a className={s.allArticles} href={blogUrl}>Tous les articles <Arrow /></a>
      </header>
      <div className={s.journal}>
        <article className={s.feature}>
          <a href={featuredArticle.href} aria-labelledby="blog-feature-title">
            <div className={s.cover}><Image src={featuredArticle.image} width={960} height={640} sizes="(max-width: 700px) 100vw, 55vw" alt="" /><span className={s.imageArrow} aria-hidden="true"><Arrow /></span></div>
            <div className={s.featureCopy}><p className={s.category}>{featuredArticle.category}</p><h3 id="blog-feature-title">{featuredArticle.title}</h3><span className={s.read}>Lire l’article <Arrow /></span></div>
          </a>
        </article>
        <div className={s.related}>
          {relatedArticles.map(article => <article key={article.id} className={s.story}>
            <a href={article.href} aria-labelledby={`blog-${article.id}-title`}>
              <div className={s.thumbnail} data-article={article.id}><Image src={article.image} width={400} height={230} sizes="(max-width: 700px) 110px, 180px" alt="" /></div>
              <div className={s.storyCopy}><p className={s.category}>{article.category}</p><h3 id={`blog-${article.id}-title`}>{article.title}</h3><span className={s.read}>Lire l’article <Arrow /></span></div>
            </a>
          </article>)}
        </div>
      </div>
    </div>
  </section>;
}

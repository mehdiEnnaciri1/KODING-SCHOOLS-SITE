"use client";

import { useState } from "react";
import Link from "next/link";
import { libraries } from "@/domain/refonte/libraries";
import { featuredArticle, relatedArticles, type BlogPreview } from "@/domain/refonte/blog";
import { Breadcrumb, Frame, S, st } from "./page-kit";

/* ───────────── Librairies ───────────── */

export function LibrairiesPage() {
  const [city, setCity] = useState("Toutes");
  const visible = libraries.filter(l => city === "Toutes" || l.city === city);
  return <Frame>
    <section style={st("background:#f0fffe")}>
      <div style={{ ...S.wrap, ...st("padding:64px 24px;display:flex;flex-direction:column;gap:16px") }}>
        <Breadcrumb items={<><a href="/refonte-v2/parents-licences">Parents &amp; licences</a> / Trouver une librairie</>} />
        <h1 style={S.h1}>Les librairies partenaires.</h1>
        <p style={{ ...S.lead, maxWidth: 640 }}>Vous pouvez aussi acheter votre code auprès d’une librairie. Précisez la langue du programme demandée par l’école.</p>
      </div>
    </section>
    <section style={st("background:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:48px 24px 96px;display:flex;flex-direction:column;gap:32px") }}>
        <div style={st("display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap")}>
          <div role="group" aria-label="Filtrer les librairies par ville" style={st("display:flex;gap:8px;flex-wrap:wrap")}>
            {["Toutes", "Casablanca", "Marrakech", "En ligne"].map(label => <button key={label} type="button" aria-pressed={label === city} onClick={() => setCity(label)} style={{ ...st("min-height:44px;padding:10px 20px;border-radius:999px;color:#0e2526;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit"), border: `1.5px solid ${label === city ? "#3eccc5" : "#cfe3e1"}`, background: label === city ? "#3eccc5" : "#ffffff" }}>{label}</button>)}
          </div>
          <p role="status" style={st("margin:0;font-size:15px;font-weight:500;color:#4a6365")}>{visible.length} {visible.length > 1 ? "adresses" : "adresse"}</p>
        </div>
        <ul style={st("list-style:none;margin:0;padding:0;display:flex;flex-direction:column;border-top:1px solid #cfe3e1")}>
          {visible.map(lb => <li key={lb.name} style={st("display:grid;grid-template-columns:minmax(0,140px) minmax(0,1fr) auto;gap:24px;align-items:center;padding:20px 0;border-bottom:1px solid #cfe3e1")}>
            <span style={st("font-size:13px;font-weight:500;color:#00716f")}>{lb.city}</span>
            <div style={st("display:flex;flex-direction:column;gap:2px")}><h2 style={st("margin:0;font-size:18px;line-height:26px;font-weight:700")}>{lb.name}</h2><p style={st("margin:0;font-size:14px;line-height:22px;color:#4a6365")}>{lb.address}</p></div>
            <a href={lb.url} target="_blank" rel="noreferrer" style={st("font-weight:700;font-size:15px;white-space:nowrap")}>{lb.city === "En ligne" ? "Voir le site" : "Itinéraire"} ↗</a>
          </li>)}
        </ul>
        <p style={st("margin:0;font-size:14px;line-height:22px;color:#4a6365")}>Annuaire repris du site Koding Schools, le 1er octobre 2026. La disponibilité des licences est à vérifier auprès de la librairie.</p>
      </div>
    </section>
  </Frame>;
}

/* ───────────── Blog ───────────── */

export function BlogPage() {
  const card = st("display:flex;flex-direction:column;gap:16px;text-decoration:none;color:#0e2526");
  const photo = st("width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:28px;display:block;background:#f0fffe");
  return <Frame>
    <section style={st("background:#f0fffe")}>
      <div style={{ ...S.wrap, ...st("padding:64px 24px;display:flex;flex-direction:column;gap:16px") }}>
        <p style={S.eyebrow}>Le blog Koding Schools</p>
        <h1 style={S.h1}>Le numérique à l’école, en pratique.</h1>
      </div>
    </section>
    <section style={st("background:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:64px 24px 96px;display:flex;flex-direction:column;gap:48px") }}>
        <a href={`/blog/${featuredArticle.id}`} style={st("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:40px;align-items:center;text-decoration:none;color:#0e2526")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={featuredArticle.image} alt="" style={photo} />
          <div style={st("display:flex;flex-direction:column;gap:12px")}><p style={S.eyebrow}>{featuredArticle.category}</p><h2 style={S.h2}>{featuredArticle.title}</h2><span style={st("font-size:16px;font-weight:700;color:#00716f")}>Lire l’article →</span></div>
        </a>
        <div style={st("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:32px;padding-top:48px;border-top:1px solid #cfe3e1")}>
          {relatedArticles.map(article => <a key={article.id} href={`/blog/${article.id}`} style={card}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.image} alt="" style={photo} />
            <p style={S.eyebrow}>{article.category}</p>
            <h3 style={st("margin:0;font-size:24px;line-height:32px;font-weight:700")}>{article.title}</h3>
            <span style={st("font-size:15px;font-weight:700;color:#00716f")}>Lire l’article →</span>
          </a>)}
        </div>
      </div>
    </section>
  </Frame>;
}

export function ArticlePage({ article }: { article: BlogPreview }) {
  return <Frame>
    <article>
      <header style={st("max-width:800px;margin:0 auto;padding:64px 24px 40px;display:flex;flex-direction:column;gap:16px")}>
        <Breadcrumb items={<><Link href="/blog">Blog</Link> / {article.category}</>} />
        <h1 style={S.h1}>{article.title}</h1>
      </header>
      <div style={st("max-width:1000px;margin:0 auto;padding:0 24px")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.image} alt="" style={st("width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:28px;display:block")} />
      </div>
      <div style={st("max-width:720px;margin:0 auto;padding:48px 24px 96px;display:flex;flex-direction:column;gap:24px")}>
        <div style={st("border:1px solid #cfe3e1;border-radius:16px;padding:32px;display:flex;flex-direction:column;gap:8px;background:#f0fffe")}>
          <strong style={st("font-size:16px")}>Lire l’article</strong>
          <p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>Cet article est publié sur le blog Koding Schools.</p>
          <a href={article.href} target="_blank" rel="noreferrer" style={st("font-weight:700;font-size:15px")}>Lire l’article ↗</a>
        </div>
      </div>
    </article>
    <section style={st("background:#f0fffe")}>
      <div style={{ ...S.wrap, ...st("padding:64px 24px;display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap") }}>
        <div style={st("max-width:640px;display:flex;flex-direction:column;gap:12px")}><h2 style={st("margin:0;font-size:28px;line-height:36px;font-weight:700")}>{article.id === "citoyennete" ? "La citoyenneté digitale, au programme de votre école." : "Le programme Koding Schools, dans votre école."}</h2><p style={st("margin:0;font-size:16px;line-height:26px;color:#4a6365")}>Cinq domaines, de la 1re année primaire au tronc commun.</p></div>
        <div style={st("display:flex;gap:16px;flex-wrap:wrap")}>
          <a href="/refonte-v2/programme" style={S.ghost}>Voir le programme →</a>
          <a href="/contact?profil=ecole" style={S.orange}>Demander une démo →</a>
        </div>
      </div>
    </section>
  </Frame>;
}

/* ───────────── 404 ───────────── */

export function NotFoundPage() {
  const tile = st("border:1px solid #cfe3e1;border-radius:28px;padding:28px;text-decoration:none;color:#0e2526;display:flex;justify-content:space-between;align-items:center;gap:16px;font-size:18px;font-weight:700");
  const links: readonly (readonly [string, string])[] = [["Accueil", "/refonte-v2"], ["Le programme", "/refonte-v2/programme"], ["Parents & licences", "/refonte-v2/parents-licences"], ["Démo et contact", "/contact"]];
  return <Frame>
    <section style={st("background:#0e2526;color:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:clamp(64px,10vh,128px) 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:48px;align-items:center") }}>
        <div style={st("display:flex;flex-direction:column;gap:20px;max-width:560px")}>
          <p style={S.eyebrowDark}>Erreur 404</p>
          <h1 style={{ ...S.h1, color: "#ffffff" }}>Cette page est introuvable.</h1>
          <p style={S.leadDark}>L’adresse a peut-être changé. Voici les pages les plus consultées.</p>
        </div>
        <div style={st("display:grid;place-items:center")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/charte/kobot/kobot-waving.png" alt="Kobot salue" style={{ ...S.kobotShadow, width: "min(100%,340px)" }} />
        </div>
      </div>
    </section>
    <section style={st("background:#ffffff")}>
      <div style={{ ...S.wrap, ...st("padding:64px 24px 96px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px") }}>
        {links.map(([label, href]) => <a key={href} href={href} style={tile}>{label}<span aria-hidden="true" style={{ color: "#00716f" }}>→</span></a>)}
      </div>
    </section>
  </Frame>;
}

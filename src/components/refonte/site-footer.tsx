"use client";

import Link from "next/link";
import { LOGIN_URL } from "@/domain/refonte/activation";
import { Brand } from "./brand";
import { useHomeVersion } from "./home-version";
import s from "./site-footer.module.css";

export function SiteFooter() {
  const { version, homeHref, pageHref } = useHomeVersion();
  return <footer className={s.footer} id="pied-de-page">
    <div className={s.inner}>
      <div className={s.grid}>
        <div className={s.signature}><Brand href={homeHref} /><p>Comprendre le numérique.<br /> Créer avec lui.<br /> Grandir avec discernement.</p><a className={s.contact} href="/contact?profil=ecole">Contactez-nous <span aria-hidden="true">↗</span></a></div>
        <nav aria-labelledby="footer-programme"><h2 id="footer-programme">Le programme</h2><a href={pageHref("programme")}>Le curriculum cible</a><a href={`${homeHref}#seance`}>{version === "v2" ? "Une séance" : "Pour les enseignants"}</a><a href={`${homeHref}#ecoles`}>{version === "v2" ? "Déploiement dans l’école" : "Pour les établissements"}</a>{version === "v1" && <><a href={`${homeHref}#temoignage`}>Témoignages</a><a href={`${homeHref}#ressources`}>Le blog</a></>}<a href={`${homeHref}#questions`}>Questions des écoles</a></nav>
        <nav aria-labelledby="footer-parents"><h2 id="footer-parents">Parents & licences</h2><a href={`${pageHref("parents-licences")}#activation`}>Activer un compte</a><a href={`/parents/librairies`}>Librairies partenaires</a><a href={`${pageHref("parents-licences")}#licences`}>Tarifs et licences</a><a href={`${pageHref("parents-licences")}#aide`}>Obtenir de l’aide</a><a href={LOGIN_URL}>Connexion</a></nav>
        <nav aria-labelledby="footer-koding"><h2 id="footer-koding">{version === "v2" ? "Découvrir Koding Schools" : "Koding Schools"}</h2>{version === "v2" && <><a href={`${homeHref}#temoignage`}>Témoignages</a><Link href="/blog">Le blog</Link></>}<a href={pageHref("qui-sommes-nous")}>Qui sommes-nous ?</a>{version === "v1" && <a href={`${pageHref("qui-sommes-nous")}#equipe`}>L’équipe</a>}<a href={pageHref("partenariats")}>Partenariats</a><a href="https://kodingschools.com/fr/diagnostic/">Diagnostic école</a></nav>
      </div>
      <div className={s.community}><p>Retrouvez aussi Koding Schools sur</p><nav aria-label="Réseaux sociaux de Koding Schools"><a href="https://ma.linkedin.com/company/koding-schools" target="_blank" rel="noreferrer" aria-label="Koding Schools sur LinkedIn, nouvel onglet"><span className={s.linkedin} aria-hidden="true">in</span>LinkedIn <span className={s.external} aria-hidden="true">↗</span></a><a href="https://www.youtube.com/@kodingschools479" target="_blank" rel="noreferrer" aria-label="Chaîne YouTube de Koding Schools, nouvel onglet"><svg width="24" height="20" viewBox="0 0 24 20" fill="none" aria-hidden="true"><rect x="1" y="3" width="22" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" /><path d="m10 6 6 4-6 4Z" fill="currentColor" /></svg>YouTube <span className={s.external} aria-hidden="true">↗</span></a></nav><a className={s.top} href="#contenu">Retour en haut <span aria-hidden="true">↑</span></a></div>
      <div className={s.legal}><span>© 2026 Koding Schools · KWF</span><nav aria-label="Informations légales"><a href="https://kodingschools.com/fr/politique-de-confidentialite-koding-schools/">Confidentialité</a><a href="https://kodingschools.com/fr/conditions-generales-de-vente-koding-schools/">Conditions de vente</a></nav><span className={s.prototype}>Prototype de refonte</span></div>
    </div>
  </footer>;
}

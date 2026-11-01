"use client";

import { useEffect, useRef, useState } from "react";
import { activationRoutes, LOGIN_URL, type ProgrammeLanguage } from "@/domain/refonte/activation";
import s from "./activation-flow.module.css";

export function ActivationFlow() {
  const [chooseLanguage, setChooseLanguage] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    heading.current?.focus();
  }, [chooseLanguage]);

  return <div className={s.flow}>
    {!chooseLanguage ? <>
      <p className={s.context}>Activer un compte élève</p>
      <h2 id="dialog-title" ref={heading} tabIndex={-1}>Avez-vous les identifiants de l’élève ?</h2>
      <p>Il s’agit du login et du mot de passe transmis par votre école.</p>
      <div className={s.options}>
        <a href={LOGIN_URL}><strong>Oui, j’ai les identifiants</strong><span>Me connecter pour utiliser un code ou payer depuis le compte.</span><span aria-hidden="true" className={s.chevron}>›</span></a>
        <button onClick={() => setChooseLanguage(true)}><strong>Non, pas encore</strong><span>Acheter un code, puis l’utiliser une fois les identifiants reçus.</span><span aria-hidden="true" className={s.chevron}>›</span></button>
      </div>
      <p className={s.note}>Si votre école prend en charge les licences, son administrateur active directement les comptes. Renseignez-vous auprès de l’école avant un achat.</p>
    </> : <>
      <button className={s.back} onClick={() => setChooseLanguage(false)}>‹ Retour aux identifiants</button>
      <p className={s.context}>Acheter un code d’activation</p>
      <h2 id="dialog-title" ref={heading} tabIndex={-1}>Quelle langue votre école a-t-elle choisie ?</h2>
      <p>Choisissez la langue du programme indiquée par l’école. Les licences françaises et anglaises sont différentes.</p>
      <div className={s.options}>
        {(["fr", "en"] as const).map((language: ProgrammeLanguage) => {
          const route = activationRoutes[language];
          return <a key={language} href={route.purchase}>
            <strong>{route.label}</strong>
            <span>{`${route.annualPrice} DH · une année scolaire`}</span>
            <span aria-hidden="true" className={s.chevron}>›</span>
          </a>;
        })}
      </div>
      <p className={s.note}>Après l’achat, le code est disponible en PDF et envoyé par e-mail. Vous avez déjà un code ? Conservez-le et demandez les identifiants à votre école.</p>
    </>}
    <a className={s.help} href="/contact?profil=parent">Besoin d’aide ? Contacter le support</a>
  </div>;
}

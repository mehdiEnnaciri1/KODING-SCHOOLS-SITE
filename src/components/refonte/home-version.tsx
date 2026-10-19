"use client";

import { createContext, useContext, type ReactNode } from "react";

export type HomeVersion = "v1" | "v2";
export type EditorialPage = "programme" | "parents-licences" | "partenariats" | "qui-sommes-nous";
const HomeVersionContext = createContext<HomeVersion>("v1");

export function HomeVersionProvider({ version, children }: { version: HomeVersion; children: ReactNode }) {
  return <HomeVersionContext.Provider value={version}>{children}</HomeVersionContext.Provider>;
}

export function useHomeVersion() {
  const version = useContext(HomeVersionContext);
  const homeHref = version === "v2" ? "/refonte-v2" : "/refonte";
  return { version, homeHref, pageHref: (page: EditorialPage) => `${homeHref}/${page}` };
}

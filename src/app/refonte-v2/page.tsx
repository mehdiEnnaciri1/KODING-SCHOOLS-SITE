import type { Metadata } from "next";
import { KodingHome } from "@/components/refonte/koding-home";

export const metadata: Metadata = {
  title: "Koding Schools — Proposition V2, nouvelle identité",
  description: "Variante de l’accueil V1 avec la nouvelle identité Koding Schools.",
  robots: { index: false, follow: false },
};

export default function RefonteV2Page() { return <KodingHome version="v2" />; }

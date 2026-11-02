import type { Metadata } from "next";
import { ProgrammePage } from "@/components/refonte/programme-page";

export const metadata: Metadata = { title: "Le curriculum cible — Koding Schools V2", robots: { index: false, follow: false } };

export default function ProgrammeV2Page() {
  return <ProgrammePage />;
}

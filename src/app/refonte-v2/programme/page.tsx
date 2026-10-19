import type { Metadata } from "next";
import { CurriculumExplorer } from "@/components/refonte/curriculum-explorer";
import { HomeVersionProvider } from "@/components/refonte/home-version";

export const metadata: Metadata = { title: "Le curriculum cible — Koding Schools V2", robots: { index: false, follow: false } };

export default function ProgrammeV2Page() {
  return <HomeVersionProvider version="v2"><CurriculumExplorer /></HomeVersionProvider>;
}

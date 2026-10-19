import type { Metadata } from "next";
import { AboutPage } from "@/components/refonte/about-page";
import { HomeVersionProvider } from "@/components/refonte/home-version";

export const metadata: Metadata = { title: "Qui sommes-nous ? — Koding Schools V2", robots: { index: false, follow: false } };

export default function AboutV2Page() {
  return <HomeVersionProvider version="v2"><AboutPage /></HomeVersionProvider>;
}

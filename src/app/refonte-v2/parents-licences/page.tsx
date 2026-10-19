import type { Metadata } from "next";
import { ParentsPage } from "@/components/refonte/parents-page";
import { HomeVersionProvider } from "@/components/refonte/home-version";

export const metadata: Metadata = { title: "Parents & licences — Koding Schools V2", robots: { index: false, follow: false } };

export default function ParentsV2Page() {
  return <HomeVersionProvider version="v2"><ParentsPage /></HomeVersionProvider>;
}

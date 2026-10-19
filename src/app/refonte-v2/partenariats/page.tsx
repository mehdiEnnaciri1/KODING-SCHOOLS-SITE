import type { Metadata } from "next";
import { PartnershipsPage } from "@/components/refonte/partnerships-page";
import { HomeVersionProvider } from "@/components/refonte/home-version";

export const metadata: Metadata = { title: "Partenariats — Koding Schools V2", robots: { index: false, follow: false } };

export default function PartenariatsV2Page() {
  return <HomeVersionProvider version="v2"><PartnershipsPage /></HomeVersionProvider>;
}

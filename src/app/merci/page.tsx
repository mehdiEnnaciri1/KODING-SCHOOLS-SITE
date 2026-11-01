import type { Metadata } from "next";
import { ThanksPage } from "@/components/refonte/contact-pages";

export const metadata: Metadata = { title: "Demande envoyée · Koding Schools", robots: { index: false } };

export default function Page() { return <ThanksPage />; }

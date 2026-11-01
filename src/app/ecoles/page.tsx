import type { Metadata } from "next";
import { EcolesPage } from "@/components/refonte/ecoles-page";

export const metadata: Metadata = { title: "Pour les écoles · Koding Schools" };

export default function Page() { return <EcolesPage />; }

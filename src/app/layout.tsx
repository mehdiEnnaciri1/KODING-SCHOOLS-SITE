import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koding Schools",
  description: "Le numérique et l’IA au programme de votre école.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}

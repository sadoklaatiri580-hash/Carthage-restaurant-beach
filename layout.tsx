import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "CARTHAGE BEACH — Restaurant · Bar | Hammam Sousse",
  description:
    "CARTHAGE BEACH, restaurant et bar à Hammam Sousse : consultez la carte (poissons, fruits de mer, vins) et réservez votre table en quelques secondes.",
  applicationName: "CARTHAGE BEACH",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    title: "CARTHAGE BEACH — Restaurant · Bar",
    description: "Restaurant & bar à Hammam Sousse. Carte digitale et réservation en ligne.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07192c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <body className="bg-cb-navy antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

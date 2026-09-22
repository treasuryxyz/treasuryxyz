import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/brand";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WalletProvider } from "@/components/wallet/WalletProvider";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-stack",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  openGraph: {
    type: "website",
    url: brand.url,
    siteName: brand.name,
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    images: [{ url: "/brand/chest-tile.webp", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    site: brand.twitterHandle,
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    images: ["/brand/chest-tile.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${jetbrains.variable} font-sans`}>
        <WalletProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </WalletProvider>
      </body>
    </html>
  );
}

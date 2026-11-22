import type { Metadata, Viewport } from "next";
import { SITE } from "@/data/terms";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE.name,
  description: SITE.tagline,
  applicationName: SITE.short,
  alternates: {
    canonical: "/",
    types: {
      "text/plain": "/llms.txt",
      "application/json": "/api/terms.json",
    },
  },
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    type: "website",
    url: absoluteUrl("/"),
    siteName: SITE.name,
    locale: "en_US",
    images: [{ url: "/og-default.svg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.tagline,
    images: ["/og-default.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eaeae8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="preload" href="/fonts/ServerMono-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="alternate" type="text/plain" title="LLM index" href="/llms.txt" />
      </head>
      <body>
        <a className="sr-only skip" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

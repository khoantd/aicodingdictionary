import type { Metadata, Viewport } from "next";
import { SITE } from "@/data/terms";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.tagline,
  alternates: {
    types: {
      "text/plain": "/llms.txt",
      "application/json": "/api/terms.json",
    },
  },
  openGraph: { title: SITE.name, description: SITE.tagline, type: "website" },
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

import type { MetadataRoute } from "next";
import { TERMS } from "@/data/terms";
import { TOURS } from "@/data/tours";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-11-22");
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/intro/"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/terms/"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/agents/"), lastModified: now, changeFrequency: "monthly", priority: 0.85 },
  ];
  for (const t of TERMS) {
    pages.push({
      url: absoluteUrl(`/terms/${t.slug}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
    pages.push({
      url: absoluteUrl(`/share/term/${t.slug}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }
  for (const tour of TOURS) {
    pages.push({
      url: absoluteUrl(`/share/tour/${tour.id}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }
  return pages;
}

/** Canonical public origin for absolute URLs (sitemap, Open Graph, share cards). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicodingdictionary-alpha.vercel.app").replace(
  /\/$/,
  "",
);

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

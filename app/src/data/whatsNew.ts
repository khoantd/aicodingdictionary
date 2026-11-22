/** Editorial changelog for the What’s new strip. Newest first. */
export interface WhatsNewItem {
  date: string;
  title: string;
  blurb: string;
  href: string;
}

export const WHATS_NEW: WhatsNewItem[] = [
  {
    date: "2026-11-22",
    title: "Share cards & discovery",
    blurb: "Permalink cards for terms and tours, sitemap for crawlers, and search on the terms index.",
    href: "/terms/",
  },
  {
    date: "2026-11-22",
    title: "Agent install kits",
    blurb: "Copy-paste MCP setup for Cursor, Claude Code, and Windsurf — plus a verify checklist.",
    href: "/agents/",
  },
  {
    date: "2026-11-22",
    title: "Two new guided tours",
    blurb: "Debugging a bad session, and Tools, skills, and MCP — short paths through the map.",
    href: "/share/tour/debugging-a-bad-session/",
  },
];

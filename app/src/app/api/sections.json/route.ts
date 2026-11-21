import { SECTIONS, TERMS } from "@/data/terms";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    sections: SECTIONS.map((s) => ({
      id: s.id,
      name: s.name,
      terms: TERMS.filter((t) => t.section === s.id).map((t) => ({ slug: t.slug, name: t.name })),
    })),
  });
}

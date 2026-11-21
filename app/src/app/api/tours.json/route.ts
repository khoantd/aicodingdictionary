import { TERM_BY_SLUG } from "@/data/terms";
import { TOURS } from "@/data/tours";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    tours: TOURS.map((t) => ({
      id: t.id,
      name: t.name,
      blurb: t.blurb,
      url: `/?tour=${t.id}&term=${t.steps[0].slug}`,
      steps: t.steps.map((s, i) => ({
        stop: i + 1,
        slug: s.slug,
        name: TERM_BY_SLUG.get(s.slug)!.name,
        why: s.note,
        definition: TERM_BY_SLUG.get(s.slug)!.def,
      })),
    })),
  });
}

import { SITE, TERMS } from "@/data/terms";
import { termToJson } from "@/lib/markdown";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    name: SITE.name,
    description: SITE.tagline,
    count: TERMS.length,
    terms: TERMS.map(termToJson),
  });
}

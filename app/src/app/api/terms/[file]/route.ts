import { TERMS, TERM_BY_SLUG } from "@/data/terms";
import { termToJson } from "@/lib/markdown";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return TERMS.map((t) => ({ file: `${t.slug}.json` }));
}

export async function GET(_req: Request, ctx: { params: Promise<{ file: string }> }) {
  const { file } = await ctx.params;
  const t = TERM_BY_SLUG.get(file.replace(/\.json$/, ""));
  if (!t) return new Response("Not found", { status: 404 });
  return Response.json(termToJson(t));
}

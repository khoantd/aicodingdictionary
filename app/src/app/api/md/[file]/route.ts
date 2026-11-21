import { TERMS, TERM_BY_SLUG } from "@/data/terms";
import { termToMarkdown } from "@/lib/markdown";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return TERMS.map((t) => ({ file: `${t.slug}.md` }));
}

export async function GET(_req: Request, ctx: { params: Promise<{ file: string }> }) {
  const { file } = await ctx.params;
  const t = TERM_BY_SLUG.get(file.replace(/\.md$/, ""));
  if (!t) return new Response("Not found", { status: 404 });
  return new Response(termToMarkdown(t), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}

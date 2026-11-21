import { SITE } from "@/data/terms";

export const dynamic = "force-static";

export function GET() {
  const text = { "text/plain": { schema: { type: "string" } } };
  const slug = [{ name: "slug", in: "path", required: true, schema: { type: "string" } }];
  return Response.json({
    openapi: "3.1.0",
    info: {
      title: SITE.name,
      version: "1.0.0",
      description: "Static, read-only files describing every dictionary term. No authentication needed.",
    },
    paths: {
      "/llms.txt": { get: { operationId: "getIndex", summary: "Index of all terms for language models", responses: { "200": { description: "Markdown index", content: text } } } },
      "/llms-full.txt": { get: { operationId: "getAllMarkdown", summary: "Every term in one Markdown document", responses: { "200": { description: "Markdown", content: text } } } },
      "/api/terms.json": { get: { operationId: "listTerms", summary: "All terms as JSON", responses: { "200": { description: "List of terms" } } } },
      "/api/sections.json": { get: { operationId: "listSections", summary: "Sections and the terms in each", responses: { "200": { description: "Sections" } } } },
      "/api/terms/{slug}.json": { get: { operationId: "getTerm", summary: "One term as JSON", parameters: slug, responses: { "200": { description: "A term" } } } },
      "/api/md/{slug}.md": { get: { operationId: "getTermMarkdown", summary: "One term as Markdown", parameters: slug, responses: { "200": { description: "Markdown", content: text } } } },
    },
  });
}

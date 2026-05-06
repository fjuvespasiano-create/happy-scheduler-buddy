import { createFileRoute } from "@tanstack/react-router";
import { CIDADES } from "@/data/locations";
import { SERVICOS } from "@/data/servicos";
import { POSTS } from "@/data/blog";

const SITE = "https://happy-scheduler-buddy.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls: string[] = [
          `${SITE}/`,
          `${SITE}/sobre`,
          `${SITE}/contato`,
          `${SITE}/atendimento`,
          `${SITE}/servicos`,
          `${SITE}/blog`,
        ];
        for (const s of SERVICOS) {
          urls.push(`${SITE}/servicos/${s.slug}`);
          for (const c of CIDADES) {
            urls.push(`${SITE}/servicos/${s.slug}/${c.slug}`);
            for (const b of c.bairros) {
              urls.push(`${SITE}/servicos/${s.slug}/${c.slug}/${b.slug}`);
            }
          }
        }
        for (const c of CIDADES) {
          urls.push(`${SITE}/atendimento/${c.slug}`);
          for (const b of c.bairros) {
            urls.push(`${SITE}/atendimento/${c.slug}/${b.slug}`);
          }
        }
        for (const p of POSTS) {
          urls.push(`${SITE}/blog/${p.slug}`);
        }
        const today = new Date().toISOString().slice(0, 10);
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>`,
  )
  .join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});

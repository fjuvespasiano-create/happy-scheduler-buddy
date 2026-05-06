import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { POSTS } from "@/data/blog";
import { COMPANY_INFO } from "@/config/whatsappTemplate";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: `Blog | ${COMPANY_INFO.nome} — Dicas de Higienização` },
      { name: "description", content: `Dicas profissionais de higienização de sofá, colchão, carro e pós-obra em ${COMPANY_INFO.regiao}.` },
      { property: "og:title", content: `Blog | ${COMPANY_INFO.nome}` },
      { property: "og:description", content: "Dicas profissionais de limpeza, higienização e estética." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border safe-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-bold">Blog</h1>
            <p className="text-xs text-muted-foreground">Dicas profissionais de higienização</p>
          </div>
        </div>
      </header>

      <div className="px-4 pt-6 space-y-3">
        {POSTS.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="block rounded-2xl bg-card border border-border p-4 hover:border-primary"
          >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-primary font-bold mb-1">
              <span>{p.categoria}</span>
              <span className="text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> {p.leitura}</span>
            </div>
            <h2 className="font-bold text-foreground mb-1">{p.titulo}</h2>
            <p className="text-xs text-muted-foreground line-clamp-2">{p.resumo}</p>
            <div className="flex items-center gap-1 text-xs text-primary font-semibold mt-2">
              Ler artigo <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

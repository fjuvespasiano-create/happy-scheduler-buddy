import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, ChevronRight, MapPin, Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { POSTS } from "@/data/blog";
import { CIDADES } from "@/data/locations";
import { COMPANY_INFO } from "@/config/whatsappTemplate";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: `Blog | ${COMPANY_INFO.nome} — Higienização em ${COMPANY_INFO.regiao}` },
      { name: "description", content: `Guias por bairro e cidade: higienização de sofá, colchão, automotiva e pós-obra em ${COMPANY_INFO.regiao}.` },
      { property: "og:title", content: `Blog | ${COMPANY_INFO.nome}` },
      { property: "og:description", content: "Dicas profissionais e atendimento por bairro." },
    ],
  }),
  component: BlogIndex,
});

const CATEGORIAS = ["Todas", "Sofá", "Colchão", "Automotiva", "Pós-Obra", "Impermeabilização", "Preços"];

function BlogIndex() {
  const [cidade, setCidade] = useState<string>("todas");
  const [categoria, setCategoria] = useState<string>("Todas");

  const filtrados = useMemo(() => {
    return POSTS.filter((p) => {
      const okCidade = cidade === "todas" || p.cidadeSlug === cidade || (cidade === "geral" && !p.cidadeSlug);
      const okCat = categoria === "Todas" || p.categoria === categoria;
      return okCidade && okCat;
    }).sort((a, b) => (a.data < b.data ? 1 : -1));
  }, [cidade, categoria]);

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border safe-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-bold">Blog</h1>
            <p className="text-xs text-muted-foreground">Atendimento por bairro • {COMPANY_INFO.regiao}</p>
          </div>
        </div>
      </header>

      {/* Filtros */}
      <div className="px-4 pt-4 space-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-bold mb-1.5 inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" /> Cidade
          </p>
          <div className="flex flex-wrap gap-1.5">
            <FilterPill active={cidade === "todas"} onClick={() => setCidade("todas")}>Todas</FilterPill>
            {CIDADES.map((c) => (
              <FilterPill key={c.slug} active={cidade === c.slug} onClick={() => setCidade(c.slug)}>
                {c.nome}
              </FilterPill>
            ))}
            <FilterPill active={cidade === "geral"} onClick={() => setCidade("geral")}>Dicas gerais</FilterPill>
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-bold mb-1.5 inline-flex items-center gap-1">
            <Filter className="h-3 w-3" /> Categoria
          </p>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIAS.map((c) => (
              <FilterPill key={c} active={categoria === c} onClick={() => setCategoria(c)}>
                {c}
              </FilterPill>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{filtrados.length} {filtrados.length === 1 ? "artigo" : "artigos"}</p>
      </div>

      <div className="px-4 pt-3 space-y-3">
        {filtrados.map((p) => (
          <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }}
            className="block rounded-2xl bg-card border border-border p-4 hover:border-primary">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-primary font-bold mb-1 flex-wrap">
              <span>{p.categoria}</span>
              <span className="text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> {p.leitura}</span>
              {p.cidadeSlug && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {CIDADES.find((c) => c.slug === p.cidadeSlug)?.nome}
                  </span>
                </>
              )}
            </div>
            <h2 className="font-bold text-foreground mb-1">{p.titulo}</h2>
            <p className="text-xs text-muted-foreground line-clamp-2">{p.resumo}</p>
            <div className="flex items-center gap-1 text-xs text-primary font-semibold mt-2">
              Ler artigo <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
        {filtrados.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-8">Nenhum artigo encontrado com esses filtros.</div>
        )}
      </div>
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
        active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-primary/10"
      }`}
    >
      {children}
    </button>
  );
}

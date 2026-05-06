import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { SERVICOS } from "@/data/servicos";
import { CIDADES } from "@/data/locations";
import { COMPANY_INFO } from "@/config/whatsappTemplate";

export const Route = createFileRoute("/servicos/")({
  head: () => ({
    meta: [
      { title: `Serviços de Higienização | ${COMPANY_INFO.nome}` },
      { name: "description", content: `Higienização de sofá, colchão, automotiva, pós-obra e impermeabilização em ${COMPANY_INFO.regiao}.` },
      { property: "og:title", content: `Serviços | ${COMPANY_INFO.nome}` },
      { property: "og:description", content: `Conheça nossos serviços de higienização e estética em ${COMPANY_INFO.regiao}.` },
    ],
  }),
  component: ServicosIndex,
});

function ServicosIndex() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border safe-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-bold">Nossos Serviços</h1>
            <p className="text-xs text-muted-foreground">{COMPANY_INFO.regiao}</p>
          </div>
        </div>
      </header>

      <div className="px-4 pt-6 space-y-3">
        {SERVICOS.map((s) => (
          <Link
            key={s.slug}
            to="/servicos/$servico"
            params={{ servico: s.slug }}
            className="flex items-center gap-3 rounded-2xl bg-card border border-border p-4 hover:border-primary"
          >
            <div className="text-3xl" aria-hidden>{s.emoji}</div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-foreground">{s.nome}</h2>
              <p className="text-xs text-muted-foreground">{s.precoBase} • {s.duracao}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        ))}
      </div>

      <section className="px-4 mt-8">
        <h2 className="font-bold text-foreground mb-3">Atendimento por cidade</h2>
        <div className="space-y-4">
          {SERVICOS.map((s) => (
            <div key={s.slug} className="rounded-2xl bg-card border border-border p-4">
              <h3 className="font-semibold text-sm text-foreground mb-2">{s.emoji} {s.nome}</h3>
              <div className="flex flex-wrap gap-2">
                {CIDADES.map((c) => (
                  <Link
                    key={c.slug}
                    to="/servicos/$servico/$cidade"
                    params={{ servico: s.slug, cidade: c.slug }}
                    className="px-3 py-1.5 rounded-full bg-muted text-foreground text-xs font-semibold hover:bg-primary/10"
                  >
                    {c.nome}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

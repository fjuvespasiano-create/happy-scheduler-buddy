import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowLeft } from "lucide-react";
import { CIDADES } from "@/data/locations";
import { COMPANY_INFO } from "@/config/whatsappTemplate";

export const Route = createFileRoute("/atendimento/")({
  head: () => {
    const title = `Áreas de Atendimento — ${COMPANY_INFO.nome}`;
    const desc = `${COMPANY_INFO.nome} atende ${CIDADES.map((c) => c.nome).join(", ")} e região. Higienização de sofás, colchões, estética automotiva e limpeza pós-obra.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: AtendimentoIndex,
});

function AtendimentoIndex() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border safe-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-bold">Áreas de Atendimento</h1>
            <p className="text-xs text-muted-foreground">{COMPANY_INFO.regiao}</p>
          </div>
        </div>
      </header>

      <div className="px-4 pt-6 space-y-6">
        {CIDADES.map((cidade) => (
          <section key={cidade.slug} className="rounded-3xl bg-card border border-border p-5">
            <Link
              to="/atendimento/$cidade"
              params={{ cidade: cidade.slug }}
              className="flex items-center gap-2 mb-3"
            >
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="font-bold text-foreground">
                {cidade.nome} <span className="text-muted-foreground font-normal">- {cidade.estadoSigla}</span>
              </h2>
            </Link>
            <div className="flex flex-wrap gap-2">
              {cidade.bairros.map((b) => (
                <Link
                  key={b.slug}
                  to="/atendimento/$cidade/$bairro"
                  params={{ cidade: cidade.slug, bairro: b.slug }}
                  className="px-3 py-1.5 rounded-full bg-muted text-foreground text-xs font-semibold hover:bg-primary/10"
                >
                  {b.nome}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

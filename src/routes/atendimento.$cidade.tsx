import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalSeoPage } from "@/components/local/LocalSeoPage";
import { findCidade, CIDADES } from "@/data/locations";
import { COMPANY_INFO } from "@/config/whatsappTemplate";

export const Route = createFileRoute("/atendimento/$cidade")({
  loader: ({ params }) => {
    const cidade = findCidade(params.cidade);
    if (!cidade) throw notFound();
    return { cidade };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { cidade } = loaderData;
    const title = `Higienização de Sofás e Estofados em ${cidade.nome} - ${cidade.estadoSigla} | ${COMPANY_INFO.nome}`;
    const desc = `Limpeza de sofás, colchões, cadeiras e estética automotiva em ${cidade.nome}/${cidade.estadoSigla}. Atendimento rápido, produtos antialérgicos. Orçamento no WhatsApp ${COMPANY_INFO.telefone}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `higienização de sofá ${cidade.nome}, limpeza de colchão ${cidade.nome}, estética automotiva ${cidade.nome}, ${cidade.bairros.map((b) => b.nome).join(", ")}` },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "pt_BR" },
        { name: "geo.region", content: `BR-${cidade.estadoSigla}` },
        { name: "geo.placename", content: cidade.nome },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `${COMPANY_INFO.nome} - ${cidade.nome}`,
            description: desc,
            telephone: COMPANY_INFO.telefone,
            areaServed: {
              "@type": "City",
              name: cidade.nome,
              containedInPlace: { "@type": "State", name: cidade.estado },
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: cidade.nome,
              addressRegion: cidade.estadoSigla,
              addressCountry: "BR",
            },
            priceRange: "$$",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "187",
            },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <h1 className="text-xl font-bold">Cidade não atendida</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Cidades disponíveis: {CIDADES.map((c) => c.nome).join(", ")}
      </p>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-8 text-center text-destructive">{error.message}</div>
  ),
  component: CidadePage,
});

function CidadePage() {
  const { cidade } = Route.useLoaderData();
  return <LocalSeoPage cidade={cidade} />;
}

import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { LocalSeoPage } from "@/components/local/LocalSeoPage";
import { findBairro } from "@/data/locations";
import { COMPANY_INFO } from "@/config/whatsappTemplate";

export const Route = createFileRoute("/atendimento/$cidade/$bairro")({
  loader: ({ params }) => {
    const found = findBairro(params.cidade, params.bairro);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { cidade, bairro } = loaderData;
    const title = `Higienização de Sofás no ${bairro.nome}, ${cidade.nome} - ${cidade.estadoSigla} | ${COMPANY_INFO.nome}`;
    const desc = `Limpeza de sofás, colchões e estofados no bairro ${bairro.nome}, em ${cidade.nome}/${cidade.estadoSigla}. Atendimento no mesmo dia, produtos antialérgicos. Orçamento WhatsApp ${COMPANY_INFO.telefone}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `higienização de sofá ${bairro.nome}, limpeza de colchão ${bairro.nome} ${cidade.nome}, estética automotiva ${bairro.nome}, limpeza pós-obra ${bairro.nome}` },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "pt_BR" },
        { name: "geo.region", content: `BR-${cidade.estadoSigla}` },
        { name: "geo.placename", content: `${bairro.nome}, ${cidade.nome}` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `${COMPANY_INFO.nome} - ${bairro.nome}`,
            description: desc,
            telephone: COMPANY_INFO.telefone,
            areaServed: {
              "@type": "Place",
              name: `${bairro.nome}, ${cidade.nome}`,
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
      <h1 className="text-xl font-bold">Bairro não encontrado</h1>
      <Link to="/" className="text-primary text-sm mt-3 inline-block">
        Voltar ao início
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-8 text-center text-destructive">{error.message}</div>
  ),
  component: BairroPage,
});

function BairroPage() {
  const { cidade, bairro } = Route.useLoaderData();
  return <LocalSeoPage cidade={cidade} bairro={bairro} />;
}

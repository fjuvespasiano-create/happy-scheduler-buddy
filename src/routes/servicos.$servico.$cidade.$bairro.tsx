import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ServicoPage } from "@/components/servicos/ServicoPage";
import { findServico, SERVICOS } from "@/data/servicos";
import { findBairro } from "@/data/locations";
import { COMPANY_INFO } from "@/config/whatsappTemplate";

export const Route = createFileRoute("/servicos/$servico/$cidade/$bairro")({
  loader: ({ params }) => {
    const servico = findServico(params.servico);
    const found = findBairro(params.cidade, params.bairro);
    if (!servico || !found) throw notFound();
    return { servico, cidade: found.cidade, bairro: found.bairro };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { servico, cidade, bairro } = loaderData;
    const local = `${bairro.nome}, ${cidade.nome} - ${cidade.estadoSigla}`;
    const title = `${servico.nome} no ${bairro.nome}, ${cidade.nome} | ${COMPANY_INFO.nome}`;
    const desc = `${servico.nome} no bairro ${bairro.nome}, ${cidade.nome}/${cidade.estadoSigla}. Atendimento rápido, ${servico.precoBase.toLowerCase()}. Orçamento WhatsApp ${COMPANY_INFO.telefone}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: [`${servico.nomeCurto} ${bairro.nome}`, `${servico.nome} ${bairro.nome} ${cidade.nome}`, ...servico.keywords.map((k) => `${k} ${bairro.nome}`)].join(", ") },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { name: "geo.region", content: `BR-${cidade.estadoSigla}` },
        { name: "geo.placename", content: local },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `${COMPANY_INFO.nome} - ${servico.nomeCurto} ${bairro.nome}`,
            description: desc,
            telephone: COMPANY_INFO.telefone,
            areaServed: { "@type": "Place", name: local },
            address: { "@type": "PostalAddress", addressLocality: cidade.nome, addressRegion: cidade.estadoSigla, addressCountry: "BR" },
            priceRange: "$$",
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "187" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: servico.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <h1 className="text-xl font-bold">Página não encontrada</h1>
      <p className="text-sm text-muted-foreground mt-2">Serviços: {SERVICOS.map((s) => s.nomeCurto).join(", ")}</p>
      <Link to="/" className="text-primary text-sm mt-3 inline-block">Início</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="p-8 text-center text-destructive">{error.message}</div>,
  component: () => {
    const { servico, cidade, bairro } = Route.useLoaderData();
    return <ServicoPage servico={servico} cidade={cidade} bairro={bairro} />;
  },
});

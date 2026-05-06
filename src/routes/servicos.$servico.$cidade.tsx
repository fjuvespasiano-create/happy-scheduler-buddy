import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ServicoPage } from "@/components/servicos/ServicoPage";
import { findServico, SERVICOS } from "@/data/servicos";
import { findCidade, CIDADES } from "@/data/locations";
import { COMPANY_INFO } from "@/config/whatsappTemplate";

export const Route = createFileRoute("/servicos/$servico/$cidade")({
  loader: ({ params }) => {
    const servico = findServico(params.servico);
    const cidade = findCidade(params.cidade);
    if (!servico || !cidade) throw notFound();
    return { servico, cidade };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { servico, cidade } = loaderData;
    const local = `${cidade.nome} - ${cidade.estadoSigla}`;
    const title = servico.metaTitle(local);
    const desc = servico.metaDescription(local);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: [...servico.keywords.map((k) => `${k} ${cidade.nome}`), ...cidade.bairros.slice(0, 6).map((b) => `${servico.nomeCurto} ${b.nome}`)].join(", ") },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { name: "geo.region", content: `BR-${cidade.estadoSigla}` },
        { name: "geo.placename", content: cidade.nome },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `${COMPANY_INFO.nome} - ${servico.nomeCurto} ${cidade.nome}`,
            description: desc,
            telephone: COMPANY_INFO.telefone,
            areaServed: { "@type": "City", name: cidade.nome },
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
      <p className="text-sm text-muted-foreground mt-2">
        Cidades: {CIDADES.map((c) => c.nome).join(", ")} • Serviços: {SERVICOS.map((s) => s.nomeCurto).join(", ")}
      </p>
      <Link to="/" className="text-primary text-sm mt-3 inline-block">Início</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="p-8 text-center text-destructive">{error.message}</div>,
  component: () => {
    const { servico, cidade } = Route.useLoaderData();
    return <ServicoPage servico={servico} cidade={cidade} />;
  },
});

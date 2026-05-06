import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ServicoPage } from "@/components/servicos/ServicoPage";
import { findServico, SERVICOS } from "@/data/servicos";
import { COMPANY_INFO } from "@/config/whatsappTemplate";

export const Route = createFileRoute("/servicos/$servico")({
  loader: ({ params }) => {
    const servico = findServico(params.servico);
    if (!servico) throw notFound();
    return { servico };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { servico } = loaderData;
    const title = servico.metaTitle();
    const desc = servico.metaDescription();
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: servico.keywords.join(", ") },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: servico.nome,
            provider: { "@type": "LocalBusiness", name: COMPANY_INFO.nome, telephone: COMPANY_INFO.telefone },
            areaServed: COMPANY_INFO.regiao,
            description: desc,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: servico.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <h1 className="text-xl font-bold">Serviço não encontrado</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Disponíveis: {SERVICOS.map((s) => s.nome).join(", ")}
      </p>
      <Link to="/" className="text-primary text-sm mt-3 inline-block">Voltar ao início</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="p-8 text-center text-destructive">{error.message}</div>,
  component: () => {
    const { servico } = Route.useLoaderData();
    return <ServicoPage servico={servico} />;
  },
});

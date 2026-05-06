import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, MessageCircle, ChevronRight, MapPin, Tag } from "lucide-react";
import { findPost, POSTS, postFaq } from "@/data/blog";
import { SERVICOS } from "@/data/servicos";
import { CIDADES, findCidade } from "@/data/locations";
import { COMPANY_INFO } from "@/config/whatsappTemplate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SITE = "https://happy-scheduler-buddy.lovable.app";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = findPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { post } = loaderData;
    const faq = postFaq(post);
    const url = `${SITE}/blog/${post.slug}`;
    const ldArticle = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.titulo,
      description: post.resumo,
      datePublished: post.data,
      dateModified: post.data,
      author: { "@type": "Organization", name: COMPANY_INFO.nome },
      publisher: {
        "@type": "Organization",
        name: COMPANY_INFO.nome,
        logo: { "@type": "ImageObject", url: `${SITE}/icon-512.png` },
      },
      mainEntityOfPage: url,
    };
    const ldFaq = faq.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;
    const ldBreadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        { "@type": "ListItem", position: 3, name: post.titulo, item: url },
      ],
    };
    return {
      meta: [
        { title: `${post.titulo} | ${COMPANY_INFO.nome}` },
        { name: "description", content: post.resumo },
        { name: "keywords", content: post.keywords.join(", ") },
        { property: "og:title", content: post.titulo },
        { property: "og:description", content: post.resumo },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "robots", content: "index,follow" },
        { rel: "canonical", href: url } as never,
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(ldArticle) },
        { type: "application/ld+json", children: JSON.stringify(ldBreadcrumb) },
        ...(ldFaq ? [{ type: "application/ld+json", children: JSON.stringify(ldFaq) }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <h1 className="text-xl font-bold">Artigo não encontrado</h1>
      <Link to="/blog" className="text-primary text-sm mt-3 inline-block">Ver blog</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="p-8 text-center text-destructive">{error.message}</div>,
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const faq = postFaq(post);
  const cidade = post.cidadeSlug ? findCidade(post.cidadeSlug) : null;
  const servico = post.servicoSlug ? SERVICOS.find((s) => s.slug === post.servicoSlug) : null;

  const wppMsg = cidade
    ? `Olá! Vi o artigo "${post.titulo}". Sou de ${cidade.nome}${post.bairroSlug ? ` (${cidade.bairros.find((b) => b.slug === post.bairroSlug)?.nome})` : ""} e quero um orçamento.`
    : `Olá! Vi o artigo "${post.titulo}" e quero um orçamento.`;
  const wpp = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(wppMsg)}`;

  // Posts relacionados: mesma cidade ou mesmo serviço
  const relacionados = POSTS.filter(
    (p) =>
      p.slug !== post.slug &&
      (p.cidadeSlug === post.cidadeSlug || p.servicoSlug === post.servicoSlug || p.categoria === post.categoria),
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border safe-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/blog" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Blog • {post.categoria}</p>
            <h1 className="text-sm font-bold text-foreground truncate">{post.titulo}</h1>
          </div>
        </div>
      </header>

      {/* Breadcrumb visual */}
      <nav className="px-4 pt-3 text-[11px] text-muted-foreground flex items-center gap-1 flex-wrap">
        <Link to="/" className="hover:text-primary">Início</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/blog" className="hover:text-primary">Blog</Link>
        {cidade && (
          <>
            <ChevronRight className="h-3 w-3" />
            <span>{cidade.nome}</span>
          </>
        )}
      </nav>

      <article className="px-4 pt-4">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-primary font-bold mb-2">
          <span className="inline-flex items-center gap-1"><Tag className="h-3 w-3" /> {post.categoria}</span>
          <span className="text-muted-foreground">•</span>
          <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> {post.leitura}</span>
          {cidade && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" /> {cidade.nome}</span>
            </>
          )}
        </div>
        <h2 className="text-2xl font-extrabold leading-tight text-foreground mb-3">{post.titulo}</h2>
        <p className="text-sm text-muted-foreground mb-4">{post.resumo}</p>

        {/* CTA acima da dobra */}
        <a href={wpp} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-2xl bg-emerald-500 text-white font-bold mb-6">
          <MessageCircle className="h-5 w-5" /> Orçamento grátis no WhatsApp
        </a>

        <div className="space-y-4">
          {post.conteudo.map((b, i) => {
            if (b.tipo === "h2") return <h3 key={i} className="text-lg font-bold text-foreground mt-4">{b.texto}</h3>;
            if (b.tipo === "p") return <p key={i} className="text-sm text-foreground leading-relaxed">{b.texto}</p>;
            if (b.tipo === "ul") return (
              <ul key={i} className="space-y-1.5 text-sm text-foreground list-disc pl-5">
                {b.itens?.map((it: string) => <li key={it}>{it}</li>)}
              </ul>
            );
            if (b.tipo === "cta") return (
              <div key={i} className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-5 text-center my-4">
                <p className="font-bold text-foreground mb-1">Atendimento hoje • Vagas limitadas</p>
                <p className="text-xs text-muted-foreground mb-3">
                  {COMPANY_INFO.nome} • {cidade ? cidade.nome : COMPANY_INFO.regiao}
                </p>
                <a href={wpp} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-white font-bold">
                  <MessageCircle className="h-5 w-5" /> Pedir orçamento grátis
                </a>
              </div>
            );
            return null;
          })}
        </div>

        {/* FAQ visível + schema */}
        {faq.length > 0 && (
          <section className="mt-8">
            <h3 className="text-lg font-bold text-foreground mb-3">Perguntas frequentes</h3>
            <Accordion type="single" collapsible className="rounded-2xl bg-card border border-border px-4">
              {faq.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b last:border-b-0">
                  <AccordionTrigger className="text-sm font-semibold text-foreground">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}
      </article>

      {/* Linkagem interna: serviço + cidade + bairros */}
      {servico && (
        <section className="px-4 mt-10">
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5">
            <p className="text-[10px] uppercase tracking-wide text-primary font-bold mb-1">Serviço relacionado</p>
            <h3 className="font-bold text-foreground mb-1">{servico.emoji} {servico.nome}</h3>
            <p className="text-xs text-muted-foreground mb-3">{servico.precoBase} • {servico.duracao}</p>
            <div className="flex flex-wrap gap-2">
              <Link to="/servicos/$servico" params={{ servico: servico.slug }}
                className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold inline-flex items-center gap-1">
                Ver serviço completo <ChevronRight className="h-3 w-3" />
              </Link>
              {(cidade ? [cidade] : CIDADES).map((c) => (
                <Link key={c.slug} to="/servicos/$servico/$cidade"
                  params={{ servico: servico.slug, cidade: c.slug }}
                  className="px-3 py-1.5 rounded-full bg-muted text-foreground text-xs font-semibold hover:bg-primary/10">
                  {servico.nomeCurto} • {c.nome}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {cidade && (
        <section className="px-4 mt-6">
          <div className="rounded-2xl bg-card border border-border p-5">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-bold mb-1">Atendemos também</p>
            <h3 className="font-bold text-foreground mb-3">Bairros próximos em {cidade.nome}</h3>
            <div className="flex flex-wrap gap-2">
              {cidade.bairros
                .filter((b) => b.slug !== post.bairroSlug)
                .slice(0, 10)
                .map((b) => (
                  servico ? (
                    <Link key={b.slug} to="/servicos/$servico/$cidade/$bairro"
                      params={{ servico: servico.slug, cidade: cidade.slug, bairro: b.slug }}
                      className="px-3 py-1.5 rounded-full bg-muted text-foreground text-xs font-semibold hover:bg-primary/10">
                      {b.nome}
                    </Link>
                  ) : (
                    <Link key={b.slug} to="/atendimento/$cidade/$bairro"
                      params={{ cidade: cidade.slug, bairro: b.slug }}
                      className="px-3 py-1.5 rounded-full bg-muted text-foreground text-xs font-semibold hover:bg-primary/10">
                      {b.nome}
                    </Link>
                  )
                ))}
            </div>
          </div>
        </section>
      )}

      {relacionados.length > 0 && (
        <section className="px-4 mt-10">
          <h3 className="font-bold text-foreground mb-3">Leia também</h3>
          <div className="space-y-2">
            {relacionados.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }}
                className="block rounded-2xl bg-card border border-border p-3 hover:border-primary">
                <p className="text-sm font-semibold text-foreground">{p.titulo}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{p.resumo}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, MessageCircle } from "lucide-react";
import { findPost, POSTS } from "@/data/blog";
import { COMPANY_INFO } from "@/config/whatsappTemplate";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = findPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.titulo} | ${COMPANY_INFO.nome}` },
        { name: "description", content: post.resumo },
        { name: "keywords", content: post.keywords.join(", ") },
        { property: "og:title", content: post.titulo },
        { property: "og:description", content: post.resumo },
        { property: "og:type", content: "article" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.titulo,
            description: post.resumo,
            datePublished: post.data,
            author: { "@type": "Organization", name: COMPANY_INFO.nome },
            publisher: { "@type": "Organization", name: COMPANY_INFO.nome },
          }),
        },
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
  const wpp = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Olá! Vi o artigo "${post.titulo}" e quero um orçamento.`)}`;
  const relacionados = POSTS.filter((p) => p.slug !== post.slug && p.categoria === post.categoria).slice(0, 3);

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

      <article className="px-4 pt-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-primary font-bold mb-2">
          <span>{post.categoria}</span>
          <span className="text-muted-foreground">•</span>
          <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> {post.leitura}</span>
        </div>
        <h2 className="text-2xl font-extrabold leading-tight text-foreground mb-3">{post.titulo}</h2>
        <p className="text-sm text-muted-foreground mb-6">{post.resumo}</p>

        <div className="space-y-4">
          {post.conteudo.map((b: typeof post.conteudo[number], i: number) => {
            if (b.tipo === "h2") return <h3 key={i} className="text-lg font-bold text-foreground mt-4">{b.texto}</h3>;
            if (b.tipo === "p") return <p key={i} className="text-sm text-foreground leading-relaxed">{b.texto}</p>;
            if (b.tipo === "ul") return (
              <ul key={i} className="space-y-1.5 text-sm text-foreground list-disc pl-5">
                {b.itens?.map((it: string) => <li key={it}>{it}</li>)}
              </ul>
            );
            if (b.tipo === "cta") return (
              <div key={i} className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-5 text-center my-4">
                <p className="font-bold text-foreground mb-2">Quer resolver isso de vez?</p>
                <p className="text-xs text-muted-foreground mb-3">A {COMPANY_INFO.nome} atende {COMPANY_INFO.regiao}</p>
                <a href={wpp} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-white font-bold">
                  <MessageCircle className="h-5 w-5" /> Pedir orçamento
                </a>
              </div>
            );
            return null;
          })}
        </div>
      </article>

      {relacionados.length > 0 && (
        <section className="px-4 mt-10">
          <h3 className="font-bold text-foreground mb-3">Leia também</h3>
          <div className="space-y-2">
            {relacionados.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="block rounded-2xl bg-card border border-border p-3 hover:border-primary"
              >
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

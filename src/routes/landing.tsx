import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Star,
  Phone,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Loader2,
  Play,
  ChevronLeft,
  ChevronRight,
  Youtube,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { submitLead } from "@/lib/leads.functions";
import { getChannelVideos, type YTVideo } from "@/lib/youtube.functions";
import logoAutoLimpeza from "@/assets/auto-limpeza-pro-logo.jpg";

const SERVICOS = [
  "Higienização de sofá",
  "Higienização de colchão",
  "Estética automotiva",
  "Impermeabilização",
  "Pós-obra",
  "Outro",
];

const SITE_URL = "https://http-autolimpezapro-agendaaqui-online.lovable.app/landing";

export const Route = createFileRoute("/landing")({
  loader: () => getChannelVideos(),
  head: ({ loaderData }) => {
    const videos = loaderData?.videos ?? [];
    const itemListLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: videos.slice(0, 10).map((v, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: v.url,
        name: v.title,
      })),
    };
    const orgLd = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Auto Limpeza Pro",
      image: "https://http-autolimpezapro-agendaaqui-online.lovable.app/icon-512.png",
      url: SITE_URL,
      telephone: "+5531980252882",
      areaServed: ["São José da Lapa", "Vespasiano", "Belo Horizonte"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "São José da Lapa",
        addressRegion: "MG",
        addressCountry: "BR",
      },
      sameAs: [`https://www.youtube.com/@${loaderData?.handle ?? ""}`],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "53",
      },
    };
    return {
      meta: [
        {
          title:
            "Auto Limpeza Pro — Higienização de Sofá, Colchão e Automotiva | Vídeos reais",
        },
        {
          name: "description",
          content:
            "Veja transformações reais em vídeo e peça seu orçamento gratuito. Higienização profissional de estofados, automotiva e pós-obra em São José da Lapa, Vespasiano e região metropolitana de BH.",
        },
        {
          name: "keywords",
          content:
            "higienização sofá vespasiano, limpeza colchão são josé da lapa, estética automotiva BH, impermeabilização sofá, antes e depois sofá",
        },
        { property: "og:title", content: "Auto Limpeza Pro — Resultados reais em vídeo" },
        {
          property: "og:description",
          content:
            "Transformações ao vivo no nosso canal. Orçamento gratuito em 15 minutos.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: SITE_URL },
        {
          property: "og:image",
          content: videos[0]
            ? videos[0].thumbnailHQ
            : "https://http-autolimpezapro-agendaaqui-online.lovable.app/icon-512.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: SITE_URL }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(orgLd),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(itemListLd),
        },
      ],
    };
  },
  component: LandingPage,
});

function LandingPage() {
  const { videos, channelUrl } = Route.useLoaderData();
  const [playing, setPlaying] = useState<YTVideo | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <TopBar channelUrl={channelUrl} />
      <Hero featured={videos[0]} onPlay={setPlaying} />
      <NetflixRow
        title="Em alta no nosso canal"
        subtitle="Últimos vídeos postados — atualizados automaticamente"
        videos={videos}
        onPlay={setPlaying}
        channelUrl={channelUrl}
      />
      <TrustStrip />
      <LeadSection />
      <CtaFinal channelUrl={channelUrl} />
      <Footer channelUrl={channelUrl} />
      {playing && <PlayerModal video={playing} onClose={() => setPlaying(null)} />}
    </div>
  );
}

/* ---------- Top bar ---------- */
function TopBar({ channelUrl }: { channelUrl: string }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0a0a0f]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg overflow-hidden ring-1 ring-primary/40">
            <img src={logoAutoLimpeza} alt="Auto Limpeza Pro" className="w-full h-full object-cover" />
          </div>
          <div className="leading-none">
            <p className="font-extrabold text-sm sm:text-base tracking-tight">
              Auto Limpeza <span className="text-primary">Pro</span>
            </p>
            <p className="text-[10px] uppercase tracking-widest text-white/50">
              Higienização profissional
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 h-9 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold"
          >
            <Youtube className="h-4 w-4 text-red-500" /> Canal
          </a>
          <a
            href="https://wa.me/5531980252882?text=Ol%C3%A1,%20quero%20um%20or%C3%A7amento."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 h-9 rounded-lg bg-success text-success-foreground text-xs sm:text-sm font-semibold"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">Falar</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero (Netflix billboard) ---------- */
function Hero({
  featured,
  onPlay,
}: {
  featured?: YTVideo;
  onPlay: (v: YTVideo) => void;
}) {
  return (
    <section className="relative overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0">
        {featured ? (
          <img
            src={featured.thumbnailHQ}
            alt=""
            aria-hidden
            className="w-full h-full object-cover opacity-40 scale-110 blur-[2px]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-[#0a0a0f] to-[#0a0a0f]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-14 sm:pt-16 sm:pb-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/40 px-3 py-1 mb-4">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              SJ Lapa • Vespasiano • Região metropolitana BH
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Seu sofá, colchão ou carro
            <br />
            <span className="text-gradient">como novo</span> — veja ao vivo.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl">
            Mais de 50 transformações reais no nosso canal. Produtos seguros para
            crianças e pets, atendimento no mesmo dia.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {featured && (
              <button
                onClick={() => onPlay(featured)}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-white text-black font-bold hover:bg-white/90 transition"
              >
                <Play className="h-5 w-5 fill-black" /> Assistir agora
              </button>
            )}
            <a
              href="#orcamento"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur text-white font-bold border border-white/20"
            >
              Pedir orçamento <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center gap-5 mt-6 text-sm">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-warning text-warning" />
              ))}
              <span className="ml-1 font-semibold">4.9/5</span>
            </div>
            <span className="text-white/60">+50 clientes satisfeitos</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Netflix-style row ---------- */
function NetflixRow({
  title,
  subtitle,
  videos,
  onPlay,
  channelUrl,
}: {
  title: string;
  subtitle?: string;
  videos: YTVideo[];
  onPlay: (v: YTVideo) => void;
  channelUrl: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  if (!videos.length) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <p className="text-sm text-white/60 mt-2">
          Conteúdo carregando do canal —{" "}
          <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="underline">
            ver no YouTube
          </a>
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between mb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs sm:text-sm text-white/60 mt-1">{subtitle}</p>}
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll(-1)}
            aria-label="Anterior"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Próximo"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-thin"
        style={{ scrollbarWidth: "thin" }}
      >
        {videos.map((v) => (
          <VideoCard key={v.id} v={v} onPlay={onPlay} />
        ))}
      </div>
    </section>
  );
}

function VideoCard({ v, onPlay }: { v: YTVideo; onPlay: (v: YTVideo) => void }) {
  return (
    <button
      onClick={() => onPlay(v)}
      className="group relative shrink-0 snap-start w-[180px] sm:w-[220px] aspect-[9/16] rounded-xl overflow-hidden bg-black/40 ring-1 ring-white/10 hover:ring-primary/60 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 text-left"
    >
      <img
        src={v.thumbnail}
        alt={v.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600/90 text-[10px] font-bold uppercase tracking-wider">
        <Youtube className="h-2.5 w-2.5" /> Short
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
        <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center">
          <Play className="h-7 w-7 fill-black text-black ml-1" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-xs sm:text-sm font-bold leading-tight line-clamp-2 drop-shadow">
          {v.title}
        </p>
      </div>
    </button>
  );
}

/* ---------- Player modal ---------- */
function PlayerModal({ video, onClose }: { video: YTVideo; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <button
        aria-label="Fechar"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className="w-full max-w-[420px] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

/* ---------- Trust strip ---------- */
function TrustStrip() {
  const items = [
    { label: "+50 clientes", sub: "atendidos" },
    { label: "4.9 / 5", sub: "avaliação" },
    { label: "8+ anos", sub: "experiência" },
    { label: "Mesmo dia", sub: "atendimento" },
  ];
  return (
    <section className="border-y border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-extrabold text-sm leading-none">{it.label}</p>
              <p className="text-[11px] text-white/60 mt-0.5">{it.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Lead form ---------- */
function LeadSection() {
  return (
    <section id="orcamento" className="max-w-7xl mx-auto px-4 py-14">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Peça seu <span className="text-gradient">orçamento gratuito</span>
          </h2>
          <p className="mt-3 text-white/70">
            Resposta em até <strong className="text-white">15 minutos</strong>. Sem
            compromisso, sem enrolação.
          </p>
          <ul className="mt-5 space-y-2">
            {[
              "Produtos hipoalergênicos e seguros para crianças e pets",
              "Equipe uniformizada e identificada",
              "Garantia de satisfação ou refazemos",
              "Aceitamos PIX, dinheiro e cartão em até 3x",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-white/85">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}

function LeadForm() {
  const submit = useServerFn(submitLead);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    servico: "",
    cidade: "",
    mensagem: "",
  });

  const onChange = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.nome.trim().length < 2) return toast.error("Informe seu nome");
    if (form.telefone.trim().length < 8) return toast.error("Telefone inválido");
    if (!form.servico) return toast.error("Escolha o serviço");
    setLoading(true);
    try {
      await submit({ data: { ...form, origem: "landing" } });
      setDone(true);
      toast.success("Pedido recebido! Vamos retornar em até 15 minutos.");
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível enviar. Tente o WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-white/5 border border-success/40 p-8 text-center backdrop-blur">
        <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
        <h3 className="mt-3 text-2xl font-bold">Pedido recebido!</h3>
        <p className="text-sm text-white/70 mt-1">
          Vamos retornar em até <strong>15 minutos</strong>.
        </p>
        <a
          href={`https://wa.me/5531980252882?text=${encodeURIComponent(
            `Olá! Acabei de pedir um orçamento de ${form.servico}. Meu nome é ${form.nome}.`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 px-5 h-11 rounded-lg bg-success text-success-foreground font-semibold"
        >
          <MessageCircle className="h-4 w-4" /> Falar agora no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur p-6 sm:p-7 space-y-3"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Orçamento grátis em 15 min</h3>
        <span className="text-[10px] px-2 py-1 rounded-full bg-success/15 text-success font-semibold">
          Sem compromisso
        </span>
      </div>

      <div>
        <Label htmlFor="nome" className="text-white/80">Nome</Label>
        <Input
          id="nome"
          value={form.nome}
          onChange={(e) => onChange("nome")(e.target.value)}
          placeholder="Como podemos te chamar?"
          maxLength={120}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
          required
        />
      </div>
      <div>
        <Label htmlFor="telefone" className="text-white/80">WhatsApp</Label>
        <Input
          id="telefone"
          type="tel"
          value={form.telefone}
          onChange={(e) => onChange("telefone")(e.target.value)}
          placeholder="(31) 9 0000-0000"
          maxLength={30}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
          required
        />
      </div>
      <div>
        <Label className="text-white/80">Serviço</Label>
        <Select value={form.servico} onValueChange={onChange("servico")}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="O que você precisa limpar?" />
          </SelectTrigger>
          <SelectContent>
            {SERVICOS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="cidade" className="text-white/80">
          Cidade / bairro (opcional)
        </Label>
        <Input
          id="cidade"
          value={form.cidade}
          onChange={(e) => onChange("cidade")(e.target.value)}
          placeholder="Ex: Nova Granja, São José da Lapa"
          maxLength={120}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
        />
      </div>
      <div>
        <Label htmlFor="mensagem" className="text-white/80">Detalhes (opcional)</Label>
        <Textarea
          id="mensagem"
          value={form.mensagem}
          onChange={(e) => onChange("mensagem")(e.target.value)}
          placeholder="Ex: sofá de 3 lugares com manchas de café"
          maxLength={1000}
          rows={3}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
        />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
          </>
        ) : (
          <>
            Quero meu orçamento <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
      <p className="text-[11px] text-white/50 text-center">
        🔒 Seus dados são usados apenas para retornar seu orçamento.
      </p>
    </form>
  );
}

/* ---------- CTA final ---------- */
function CtaFinal({ channelUrl }: { channelUrl: string }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 sm:p-12 text-center text-primary-foreground">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay [background:radial-gradient(circle_at_30%_20%,white,transparent_40%)]" />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Pronto para deixar tudo como novo?
          </h2>
          <p className="mt-2 opacity-90 text-sm sm:text-base">
            Orçamento em 15 minutos — ou veja mais transformações no nosso canal.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#orcamento"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white text-primary font-bold"
            >
              Pedir orçamento <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/5531980252882?text=Ol%C3%A1,%20quero%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-success text-success-foreground font-bold"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-black/30 backdrop-blur border border-white/30 font-bold"
            >
              <Youtube className="h-4 w-4 text-red-400" /> Ver canal
            </a>
            <a
              href="tel:+5531980252882"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white/15 backdrop-blur border border-white/30 font-bold"
            >
              <Phone className="h-4 w-4" /> Ligar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ channelUrl }: { channelUrl: string }) {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-xs text-white/60">
        <p className="font-bold text-white">Auto Limpeza Pro</p>
        <p className="mt-1">
          Higienização profissional • São José da Lapa, Vespasiano e região
        </p>
        <p className="mt-3">
          <Link to="/" className="underline hover:text-white">Início</Link> ·{" "}
          <Link to="/servicos" className="underline hover:text-white">Serviços</Link> ·{" "}
          <Link to="/sobre" className="underline hover:text-white">Sobre</Link> ·{" "}
          <Link to="/contato" className="underline hover:text-white">Contato</Link> ·{" "}
          <Link to="/blog" className="underline hover:text-white">Blog</Link> ·{" "}
          <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
            YouTube
          </a>
        </p>
      </div>
    </footer>
  );
}

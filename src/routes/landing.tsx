import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  ShieldCheck,
  Star,
  Clock,
  Phone,
  CheckCircle2,
  Sparkles,
  Sofa,
  Bed,
  Car,
  HardHat,
  ArrowRight,
  MapPin,
  MessageCircle,
  Loader2,
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { submitLead } from "@/lib/leads.functions";
import logoAutoLimpeza from "@/assets/auto-limpeza-pro-logo.jpg";
import mascote from "@/assets/mascote-auto-limpeza-pro.png";

const SERVICOS = [
  { id: "sofa", nome: "Sofá", icon: Sofa, from: 180 },
  { id: "colchao", nome: "Colchão", icon: Bed, from: 130 },
  { id: "automotiva", nome: "Estética automotiva", icon: Car, from: 200 },
  { id: "impermeabilizacao", nome: "Impermeabilização", icon: Sparkles, from: 160 },
  { id: "pos-obra", nome: "Pós-obra", icon: HardHat, from: 18 },
];

const FAQ = [
  {
    q: "Quanto tempo leva a higienização?",
    a: "Sofá de 2 a 3 lugares leva em média 1h30. Colchão king cerca de 1h. Automóvel completo de 3 a 5 horas.",
  },
  {
    q: "Os produtos são seguros para crianças e pets?",
    a: "Sim. Utilizamos produtos biodegradáveis, hipoalergênicos e atóxicos. Após a secagem o ambiente está liberado.",
  },
  {
    q: "Quais bairros vocês atendem?",
    a: "São José da Lapa, Vespasiano, Nova Granja, Morro Alto, Célvia, Santa Clara, Caieiras e região metropolitana de BH.",
  },
  {
    q: "Posso parcelar?",
    a: "Sim. Aceitamos PIX, dinheiro e cartão em até 3x sem juros.",
  },
];

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Higienização de Sofá, Colchão e Automotiva | Auto Limpeza Pro" },
      {
        name: "description",
        content:
          "Solicite seu orçamento gratuito. Higienização profissional de estofados, automotiva e pós-obra em São José da Lapa, Vespasiano e região. Atendimento no mesmo dia.",
      },
      { property: "og:title", content: "Auto Limpeza Pro — Orçamento gratuito" },
      {
        property: "og:description",
        content:
          "Estofados, automotiva e pós-obra com 8+ anos de experiência. Peça seu orçamento em 1 minuto.",
      },
      { property: "og:url", content: "https://http-autolimpezapro-agendaaqui-online.lovable.app/landing" },
    ],
    links: [
      { rel: "canonical", href: "https://http-autolimpezapro-agendaaqui-online.lovable.app/landing" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Hero />
      <TrustStrip />
      <Servicos />
      <ComoFunciona />
      <AntesDepois />
      <Depoimentos />
      <FaqSection />
      <CtaFinal />
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg overflow-hidden bg-black">
            <img src={logoAutoLimpeza} alt="Auto Limpeza Pro" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-sm sm:text-base">Auto Limpeza Pro</span>
        </Link>
        <a
          href="https://wa.me/5531980252882?text=Ol%C3%A1,%20quero%20um%20or%C3%A7amento."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 sm:px-4 h-9 rounded-lg bg-success text-success-foreground text-xs sm:text-sm font-semibold"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">WhatsApp</span>
          <span className="sm:hidden">Falar</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-accent/10" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-4 py-10 sm:py-16 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 px-3 py-1 mb-4">
            <ShieldCheck className="h-3 w-3 text-primary" />
            <span className="text-[11px] font-semibold text-primary">
              SJ Lapa • Vespasiano • Região metropolitana BH
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Seu sofá, colchão ou carro <span className="text-gradient">como novo</span> em poucas horas
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Higienização profissional com produtos seguros para crianças e pets. Receba seu orçamento
            <strong className="text-foreground"> gratuito em até 15 minutos</strong>.
          </p>

          <ul className="mt-5 grid sm:grid-cols-2 gap-2">
            {[
              "Atendimento no mesmo dia",
              "Produtos hipoalergênicos",
              "Equipe uniformizada",
              "Garantia de satisfação",
            ].map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-6 mt-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-warning text-warning" />
              ))}
              <span className="ml-1 text-sm font-semibold">4.9/5</span>
            </div>
            <span className="text-xs text-muted-foreground">+50 clientes atendidos</span>
          </div>
        </div>

        <div className="relative">
          <img
            src={mascote}
            alt="Mascote Auto Limpeza Pro"
            className="absolute -top-10 -right-4 w-28 sm:w-36 opacity-90 hidden sm:block pointer-events-none"
          />
          <LeadForm />
        </div>
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
      <div className="relative rounded-3xl bg-card border border-success/40 shadow-salon-lg p-6 text-center">
        <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
        <h3 className="mt-3 text-xl font-bold">Pedido recebido!</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Vamos retornar em até <strong>15 minutos</strong>. Para resposta imediata, chame no WhatsApp.
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
      className="relative rounded-3xl bg-card border border-border shadow-salon-lg p-5 sm:p-6 space-y-3"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Orçamento grátis em 15 min</h2>
        <span className="text-[10px] px-2 py-1 rounded-full bg-success/15 text-success font-semibold">
          Sem compromisso
        </span>
      </div>

      <div>
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          value={form.nome}
          onChange={(e) => onChange("nome")(e.target.value)}
          placeholder="Como podemos te chamar?"
          maxLength={120}
          required
        />
      </div>

      <div>
        <Label htmlFor="telefone">WhatsApp</Label>
        <Input
          id="telefone"
          type="tel"
          value={form.telefone}
          onChange={(e) => onChange("telefone")(e.target.value)}
          placeholder="(31) 9 0000-0000"
          maxLength={30}
          required
        />
      </div>

      <div>
        <Label>Serviço</Label>
        <Select value={form.servico} onValueChange={onChange("servico")}>
          <SelectTrigger>
            <SelectValue placeholder="O que você precisa limpar?" />
          </SelectTrigger>
          <SelectContent>
            {SERVICOS.map((s) => (
              <SelectItem key={s.id} value={s.nome}>
                {s.nome}
              </SelectItem>
            ))}
            <SelectItem value="Outro">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="cidade">Cidade / bairro (opcional)</Label>
        <Input
          id="cidade"
          value={form.cidade}
          onChange={(e) => onChange("cidade")(e.target.value)}
          placeholder="Ex: Nova Granja, São José da Lapa"
          maxLength={120}
        />
      </div>

      <div>
        <Label htmlFor="mensagem">Detalhes (opcional)</Label>
        <Textarea
          id="mensagem"
          value={form.mensagem}
          onChange={(e) => onChange("mensagem")(e.target.value)}
          placeholder="Ex: sofá de 3 lugares com manchas de café"
          maxLength={1000}
          rows={3}
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

      <p className="text-[11px] text-muted-foreground text-center">
        🔒 Seus dados são usados apenas para retornar seu orçamento.
      </p>
    </form>
  );
}

function TrustStrip() {
  const items = [
    { icon: ShieldCheck, label: "+50 clientes", sub: "atendidos" },
    { icon: Star, label: "4.9 / 5", sub: "avaliação" },
    { icon: Clock, label: "8+ anos", sub: "experiência" },
    { icon: MapPin, label: "Atendimento", sub: "no mesmo dia" },
  ];
  return (
    <section className="border-y border-border bg-card/40">
      <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <it.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm leading-none">{it.label}</p>
              <p className="text-[11px] text-muted-foreground">{it.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Servicos() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Serviços com preço a partir de</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Valores médios — receba seu orçamento exato em minutos
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICOS.map((s) => (
          <div
            key={s.id}
            className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-3 font-bold">{s.nome}</h3>
            <p className="text-xs text-muted-foreground">A partir de</p>
            <p className="text-2xl font-extrabold text-gradient">
              R$ {s.from}
              <span className="text-xs text-muted-foreground font-normal">,00</span>
            </p>
            <a
              href="#orcamento"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"
            >
              Pedir orçamento <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function ComoFunciona() {
  const steps = [
    { n: "1", t: "Você pede o orçamento", d: "Formulário rápido ou WhatsApp" },
    { n: "2", t: "Confirmamos o valor", d: "Resposta em até 15 minutos" },
    { n: "3", t: "Equipe vai até você", d: "Trabalho feito no mesmo dia" },
  ];
  return (
    <section className="bg-card/40 border-y border-border">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">Do pedido à limpeza em 3 passos</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl bg-background border border-border p-6">
              <div className="w-12 h-12 rounded-full gradient-primary text-primary-foreground font-bold text-lg flex items-center justify-center shadow-salon">
                {s.n}
              </div>
              <h3 className="mt-3 font-bold">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AntesDepois() {
  return (
    <section className="max-w-3xl mx-auto py-12">
      <div className="text-center mb-2 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Veja a transformação</h2>
        <p className="text-sm text-muted-foreground">Arraste o controle para comparar</p>
      </div>
      <BeforeAfterGallery servico="Sofá" />
    </section>
  );
}

function Depoimentos() {
  const reviews = [
    {
      n: "Marina S.",
      bairro: "Nova Granja",
      t: "Ficou impecável!",
      d: "Sofá de tecido claro com manchas antigas. Voltou parecendo novo. Equipe pontual e educada.",
    },
    {
      n: "Carlos R.",
      bairro: "Morro Alto",
      t: "Recomendo demais",
      d: "Higienização interna do carro perfeita. Tirou cheiro de cigarro do dono anterior.",
    },
    {
      n: "Júlia M.",
      bairro: "Vespasiano",
      t: "Atendimento 10",
      d: "Marcaram para o mesmo dia. Colchão do bebê limpo e seguro. Já contratei de novo.",
    },
  ];
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">O que dizem nossos clientes</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {reviews.map((r) => (
          <div key={r.n} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-warning text-warning" />
              ))}
            </div>
            <p className="font-bold">{r.t}</p>
            <p className="text-sm text-muted-foreground mt-1">"{r.d}"</p>
            <p className="text-xs text-muted-foreground mt-3">
              — {r.n}, {r.bairro}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-card/40 border-y border-border">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {FAQ.map((f, i) => (
            <AccordionItem
              key={i}
              value={`q${i}`}
              className="bg-background rounded-xl border border-border px-4"
            >
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CtaFinal() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <div className="rounded-3xl gradient-primary text-primary-foreground p-8 sm:p-12 text-center shadow-salon-lg">
        <h2 className="text-2xl sm:text-4xl font-extrabold">
          Pronto para deixar tudo como novo?
        </h2>
        <p className="mt-2 opacity-90 text-sm sm:text-base">
          Solicite seu orçamento agora — sem compromisso, resposta em 15 minutos.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#orcamento"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
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
            href="tel:+5531980252882"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white/15 backdrop-blur text-primary-foreground border border-white/30 font-bold"
          >
            <Phone className="h-4 w-4" /> Ligar
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">Auto Limpeza Pro</p>
        <p className="mt-1">Higienização profissional • São José da Lapa, Vespasiano e região</p>
        <p className="mt-2">
          <Link to="/" className="underline">Início</Link> ·{" "}
          <Link to="/servicos" className="underline">Serviços</Link> ·{" "}
          <Link to="/sobre" className="underline">Sobre</Link> ·{" "}
          <Link to="/contato" className="underline">Contato</Link> ·{" "}
          <Link to="/blog" className="underline">Blog</Link>
        </p>
      </div>
    </footer>
  );
}

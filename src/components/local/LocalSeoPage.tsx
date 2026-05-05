import { Link } from "@tanstack/react-router";
import { MapPin, Phone, MessageCircle, Sofa, Bed, Car, Sparkles, ShieldCheck, Star, Check, ArrowLeft } from "lucide-react";
import { COMPANY_INFO } from "@/config/whatsappTemplate";
import type { Cidade } from "@/data/locations";

interface LocalSeoPageProps {
  cidade: Cidade;
  bairro?: { slug: string; nome: string };
}

const SERVICOS = [
  { icon: Sofa, nome: "Higienização de Sofás", desc: "Remoção de ácaros, manchas e odores" },
  { icon: Bed, nome: "Limpeza de Colchões", desc: "Antialérgico e secagem rápida" },
  { icon: Car, nome: "Estética Automotiva", desc: "Higienização interna completa" },
  { icon: Sparkles, nome: "Limpeza Pós-Obra", desc: "Casa pronta para morar" },
];

export function LocalSeoPage({ cidade, bairro }: LocalSeoPageProps) {
  const localLabel = bairro
    ? `${bairro.nome}, ${cidade.nome} - ${cidade.estadoSigla}`
    : `${cidade.nome} - ${cidade.estadoSigla}`;

  const wppMsg = encodeURIComponent(
    bairro
      ? `Olá! Quero um orçamento de higienização no bairro ${bairro.nome}, ${cidade.nome}.`
      : `Olá! Quero um orçamento de higienização em ${cidade.nome}.`,
  );
  const wppUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${wppMsg}`;

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border safe-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link
            to="/"
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground"
            aria-label="Voltar para o início"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Atendemos</p>
            <h1 className="text-base font-bold text-foreground leading-tight truncate">
              {localLabel}
            </h1>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pt-6">
        <div className="rounded-3xl gradient-primary text-primary-foreground p-6 shadow-salon">
          <div className="flex items-center gap-2 text-xs font-semibold mb-2 opacity-90">
            <MapPin className="h-4 w-4" />
            <span>{localLabel}</span>
          </div>
          <h2 className="text-2xl font-extrabold leading-tight mb-2">
            Higienização de Sofás, Colchões e Estofados {bairro ? `no ${bairro.nome}` : `em ${cidade.nome}`}
          </h2>
          <p className="text-sm opacity-90 mb-4">
            {COMPANY_INFO.slogan}. Atendimento rápido, equipe uniformizada e produtos antialérgicos
            {bairro ? ` direto no bairro ${bairro.nome}` : ` em toda ${cidade.nome}`}.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={wppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-2xl bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Orçamento no WhatsApp
            </a>
            <a
              href={`tel:+55${COMPANY_INFO.whatsapp}`}
              className="flex-1 py-3 rounded-2xl bg-white/15 backdrop-blur text-white font-bold flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              {COMPANY_INFO.telefone}
            </a>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="px-4 mt-8">
        <h3 className="font-bold text-lg text-foreground mb-3">
          Serviços {bairro ? `no bairro ${bairro.nome}` : `em ${cidade.nome}`}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {SERVICOS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.nome} className="rounded-2xl bg-card border border-border p-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-sm text-foreground">{s.nome}</h4>
                <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Por que escolher */}
      <section className="px-4 mt-8">
        <div className="rounded-3xl bg-card border border-border p-5">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Por que somos a melhor escolha {bairro ? `no ${bairro.nome}` : `em ${cidade.nome}`}
          </h3>
          <ul className="space-y-2 text-sm text-foreground">
            {[
              "Equipe local — chegamos rápido na sua casa",
              "Produtos antialérgicos seguros para crianças e pets",
              "Secagem rápida (3 a 6 horas)",
              "Pagamento só após o serviço aprovado",
              "Garantia de satisfação",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Avaliações */}
      <section className="px-4 mt-8">
        <div className="rounded-3xl bg-card border border-border p-5">
          <div className="flex items-center gap-2 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm font-bold text-foreground">4.9 / 5</span>
            <span className="text-xs text-muted-foreground">— clientes em {cidade.nome}</span>
          </div>
          <p className="text-sm text-muted-foreground italic">
            "Serviço impecável aqui {bairro ? `no bairro ${bairro.nome}` : `em ${cidade.nome}`}. Sofá ficou novinho e
            secou rápido. Recomendo!" — Ana M.
          </p>
        </div>
      </section>

      {/* Bairros relacionados ou cidade pai */}
      {bairro ? (
        <section className="px-4 mt-8">
          <h3 className="font-bold text-foreground mb-3">Outros bairros que atendemos em {cidade.nome}</h3>
          <div className="flex flex-wrap gap-2">
            {cidade.bairros
              .filter((b) => b.slug !== bairro.slug)
              .map((b) => (
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
          <Link
            to="/atendimento/$cidade"
            params={{ cidade: cidade.slug }}
            className="inline-block mt-4 text-sm font-semibold text-primary"
          >
            ← Ver tudo sobre {cidade.nome}
          </Link>
        </section>
      ) : (
        <section className="px-4 mt-8">
          <h3 className="font-bold text-foreground mb-3">Bairros atendidos em {cidade.nome}</h3>
          <div className="grid grid-cols-2 gap-2">
            {cidade.bairros.map((b) => (
              <Link
                key={b.slug}
                to="/atendimento/$cidade/$bairro"
                params={{ cidade: cidade.slug, bairro: b.slug }}
                className="rounded-xl bg-card border border-border px-3 py-3 text-sm font-semibold text-foreground flex items-center gap-2 hover:border-primary"
              >
                <MapPin className="h-4 w-4 text-primary" />
                {b.nome}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="px-4 mt-8">
        <div className="rounded-3xl bg-primary/5 border border-primary/20 p-5 text-center">
          <h3 className="font-bold text-foreground mb-2">
            Atendimento hoje {bairro ? `no ${bairro.nome}` : `em ${cidade.nome}`}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            Resposta em até 5 minutos no WhatsApp
          </p>
          <a
            href={wppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-white font-bold"
          >
            <MessageCircle className="h-5 w-5" />
            Pedir orçamento agora
          </a>
        </div>
      </section>
    </div>
  );
}

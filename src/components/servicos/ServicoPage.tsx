import { Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, Phone, Check, ShieldCheck, Star, Clock, MapPin, AlertCircle, HelpCircle, Sparkles, Tag } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { COMPANY_INFO } from "@/config/whatsappTemplate";
import type { Servico } from "@/data/servicos";
import type { Cidade } from "@/data/locations";
import { TrustBadges } from "@/components/TrustBadges";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";

interface ServicoPageProps {
  servico: Servico;
  cidade?: Cidade;
  bairro?: { slug: string; nome: string };
}

export function ServicoPage({ servico, cidade, bairro }: ServicoPageProps) {
  const localCurto = bairro && cidade ? `${bairro.nome}, ${cidade.nome}` : cidade?.nome;
  const localCompleto = cidade ? `${bairro ? bairro.nome + ", " : ""}${cidade.nome} - ${cidade.estadoSigla}` : undefined;
  const wppMsg = encodeURIComponent(
    `Olá! Quero um orçamento de ${servico.nome}${localCurto ? ` em ${localCurto}` : ""}. Aproveitar o cupom *LIMPA15* (15% off na 1ª higienização).`,
  );
  const wppUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${wppMsg}`;

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border safe-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center" aria-label="Voltar">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Serviço</p>
            <h1 className="text-base font-bold text-foreground truncate">
              {servico.nomeCurto}{localCurto ? ` • ${localCurto}` : ""}
            </h1>
          </div>
        </div>
      </header>

      {/* Cupom banner */}
      <div className="px-4 pt-4">
        <div className="rounded-2xl bg-yellow-400/15 border border-yellow-500/40 px-4 py-3 flex items-center gap-3">
          <Tag className="h-5 w-5 text-yellow-700 dark:text-yellow-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-foreground">CUPOM <span className="font-mono">LIMPA15</span> — 15% OFF</p>
            <p className="text-[11px] text-muted-foreground">Válido para a 1ª higienização. Vagas limitadas esta semana.</p>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="px-4 pt-4">
        <div className="rounded-3xl gradient-primary text-primary-foreground p-6 shadow-salon">
          <div className="text-3xl mb-2" aria-hidden>{servico.emoji}</div>
          <h2 className="text-2xl font-extrabold leading-tight mb-2">
            {servico.h1(localCurto)}
          </h2>
          <p className="text-sm opacity-90 mb-4">
            {COMPANY_INFO.slogan}. {localCompleto ? `Atendimento rápido em ${localCompleto}.` : `Atendemos ${COMPANY_INFO.regiao}.`}
          </p>
          <div className="flex items-center gap-3 text-xs font-semibold mb-4 opacity-90">
            <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" /> 4.9/5</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {servico.duracao}</span>
            <span className="inline-flex items-center gap-1"><Sparkles className="h-3.5 w-3.5" /> {servico.precoBase}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <a href={wppUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 py-3 rounded-2xl bg-emerald-500 text-white font-bold flex items-center justify-center gap-2">
              <MessageCircle className="h-5 w-5" /> Orçamento no WhatsApp
            </a>
            <a href={`tel:+55${COMPANY_INFO.whatsapp}`}
              className="flex-1 py-3 rounded-2xl bg-white/15 backdrop-blur text-white font-bold flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" /> {COMPANY_INFO.telefone}
            </a>
          </div>
          <p className="text-[11px] opacity-80 mt-3 text-center">
            ⚡ Resposta em até 5 minutos • Pagamento só após o serviço aprovado
          </p>
        </div>
      </section>

      {/* Problemas */}
      <section className="px-4 mt-8">
        <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          Resolvemos esses problemas{localCurto ? ` em ${localCurto}` : ""}
        </h3>
        <ul className="space-y-2">
          {servico.problemas.map((p) => (
            <li key={p} className="flex items-start gap-2 rounded-2xl bg-card border border-border px-4 py-3 text-sm text-foreground">
              <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <BeforeAfterGallery servico={servico.nomeCurto} />

      {/* Benefícios */}
      <section className="px-4 mt-8">
        <div className="rounded-3xl bg-card border border-border p-5">
          <h3 className="font-bold text-foreground mb-3">O que você ganha</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {servico.beneficios.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Processo */}
      <section className="px-4 mt-8">
        <h3 className="font-bold text-foreground mb-3">Como funciona o atendimento</h3>
        <ol className="space-y-3">
          {servico.processo.map((p) => (
            <li key={p.titulo} className="rounded-2xl bg-card border border-border p-4">
              <h4 className="font-bold text-sm text-foreground mb-1">{p.titulo}</h4>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Diferenciais */}
      <section className="px-4 mt-8">
        <div className="rounded-3xl bg-primary/5 border border-primary/20 p-5">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Por que a {COMPANY_INFO.nome}
          </h3>
          <ul className="space-y-2">
            {servico.diferenciais.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TrustBadges />

      {/* Prova social */}
      <section className="px-4 mt-8">
        <div className="rounded-3xl bg-card border border-border p-5">
          <div className="flex items-center gap-2 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm font-bold text-foreground">4.9 / 5</span>
          </div>
          <p className="text-sm text-muted-foreground italic">
            "Atendimento impecável{localCurto ? ` em ${localCurto}` : ""}. Profissionais educados, sofá ficou novo. Recomendo!" — Ana M.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 mt-8">
        <div className="rounded-3xl bg-card border border-border p-5">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Perguntas frequentes
          </h3>
          <Accordion type="single" collapsible>
            {servico.faq.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`}>
                <AccordionTrigger className="text-sm font-semibold text-foreground text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-4 mt-8">
        <div className="rounded-3xl bg-emerald-500/10 border border-emerald-500/30 p-5 text-center">
          <h3 className="font-bold text-foreground mb-1">Agende hoje{localCurto ? ` em ${localCurto}` : ""}</h3>
          <p className="text-xs text-muted-foreground mb-3">⚡ Vagas limitadas para esta semana • Cupom LIMPA15 ativo</p>
          <a href={wppUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-white font-bold">
            <MessageCircle className="h-5 w-5" /> Pedir orçamento agora
          </a>
          {localCompleto && (
            <p className="text-[11px] text-muted-foreground mt-3 inline-flex items-center gap-1 justify-center">
              <MapPin className="h-3 w-3" /> Atendendo {localCompleto} hoje
            </p>
          )}
        </div>
      </section>

      {/* Bairros relacionados (se em cidade) */}
      {cidade && !bairro && (
        <section className="px-4 mt-8">
          <h3 className="font-bold text-foreground mb-3">{servico.nomeCurto} por bairro em {cidade.nome}</h3>
          <div className="flex flex-wrap gap-2">
            {cidade.bairros.map((b) => (
              <Link
                key={b.slug}
                to="/servicos/$servico/$cidade/$bairro"
                params={{ servico: servico.slug, cidade: cidade.slug, bairro: b.slug }}
                className="px-3 py-1.5 rounded-full bg-muted text-foreground text-xs font-semibold hover:bg-primary/10"
              >
                {b.nome}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Voltar para cidade (se em bairro) */}
      {cidade && bairro && (
        <section className="px-4 mt-8">
          <Link
            to="/servicos/$servico/$cidade"
            params={{ servico: servico.slug, cidade: cidade.slug }}
            className="text-sm font-semibold text-primary"
          >
            ← Ver {servico.nomeCurto} em toda {cidade.nome}
          </Link>
        </section>
      )}
    </div>
  );
}

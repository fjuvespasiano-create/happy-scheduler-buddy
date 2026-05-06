import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, Phone, ShieldCheck, Award, Users, Heart, Target, Eye } from "lucide-react";
import { COMPANY_INFO } from "@/config/whatsappTemplate";
import { TrustBadges } from "@/components/TrustBadges";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: `Sobre nós | ${COMPANY_INFO.nome}` },
      { name: "description", content: `Conheça a ${COMPANY_INFO.nome}: empresa local de higienização em ${COMPANY_INFO.regiao}. Equipe própria, garantia por escrito, +5 anos de mercado.` },
      { property: "og:title", content: `Sobre a ${COMPANY_INFO.nome}` },
      { property: "og:description", content: `Especialistas locais em higienização de estofados, automotiva e pós-obra.` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: COMPANY_INFO.nome,
          description: `Empresa de higienização de estofados, estética automotiva e limpeza pós-obra em ${COMPANY_INFO.regiao}.`,
          telephone: COMPANY_INFO.telefone,
          areaServed: COMPANY_INFO.regiao,
          foundingDate: "2020",
          slogan: COMPANY_INFO.slogan,
        }),
      },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  const wpp = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Olá! Quero conhecer melhor o trabalho da Auto Limpeza Pro.")}`;

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border safe-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-bold">Sobre nós</h1>
            <p className="text-xs text-muted-foreground">{COMPANY_INFO.nome}</p>
          </div>
        </div>
      </header>

      <section className="px-4 pt-6">
        <div className="rounded-3xl gradient-primary text-primary-foreground p-6 shadow-salon">
          <h2 className="text-2xl font-extrabold mb-2">Especialistas locais em higienização</h2>
          <p className="text-sm opacity-90">
            A {COMPANY_INFO.nome} nasceu em {COMPANY_INFO.regiao} com um propósito simples: entregar
            higienização profissional, honesta e acessível para famílias e empresas da região.
          </p>
        </div>
      </section>

      <section className="px-4 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: Target, t: "Missão", d: "Devolver conforto e saúde através de higienização profissional acessível." },
          { icon: Eye, t: "Visão", d: "Ser referência absoluta em higienização na região metropolitana de BH." },
          { icon: Heart, t: "Valores", d: "Honestidade no orçamento, respeito ao cliente e excelência técnica." },
        ].map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.t} className="rounded-2xl bg-card border border-border p-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground">{it.t}</h3>
              <p className="text-xs text-muted-foreground mt-1">{it.d}</p>
            </div>
          );
        })}
      </section>

      <section className="px-4 mt-8">
        <h3 className="font-bold text-foreground mb-3">Nossa história</h3>
        <div className="rounded-2xl bg-card border border-border p-5 space-y-3 text-sm text-foreground">
          <p>
            Começamos atendendo vizinhos em São José da Lapa. Em pouco tempo, a indicação boca a boca
            transformou um trabalho local em uma operação que atende toda a região metropolitana norte
            de Belo Horizonte.
          </p>
          <p>
            Hoje somos uma equipe uniformizada, com equipamento profissional próprio, produtos
            antialérgicos importados e processos definidos para entregar resultado consistente em
            cada atendimento — do sofá da família ao carro do motorista de aplicativo.
          </p>
          <p className="text-muted-foreground italic">
            "Tratamos cada cliente como se fosse da nossa rua. Porque, na maior parte dos casos, é mesmo." 
          </p>
        </div>
      </section>

      <TrustBadges />

      <section className="px-4 mt-8">
        <div className="rounded-3xl bg-emerald-500/10 border border-emerald-500/30 p-5 text-center">
          <h3 className="font-bold text-foreground mb-2">Quer conhecer nosso trabalho?</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Mande uma foto do que precisa higienizar. Resposta em até 5 minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <a href={wpp} target="_blank" rel="noopener noreferrer"
              className="flex-1 py-3 rounded-2xl bg-emerald-500 text-white font-bold flex items-center justify-center gap-2">
              <MessageCircle className="h-5 w-5" /> WhatsApp
            </a>
            <a href={`tel:+55${COMPANY_INFO.whatsapp}`}
              className="flex-1 py-3 rounded-2xl bg-muted text-foreground font-bold flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" /> Ligar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, Phone, MapPin, Clock, Mail } from "lucide-react";
import { COMPANY_INFO } from "@/config/whatsappTemplate";
import { CIDADES } from "@/data/locations";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: `Contato | ${COMPANY_INFO.nome}` },
      { name: "description", content: `Fale com a ${COMPANY_INFO.nome}: WhatsApp ${COMPANY_INFO.telefone}. Atendemos ${COMPANY_INFO.regiao}.` },
      { property: "og:title", content: `Contato — ${COMPANY_INFO.nome}` },
      { property: "og:description", content: `WhatsApp ${COMPANY_INFO.telefone} • Atendimento no mesmo dia.` },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const wpp = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Olá! Quero falar com a Auto Limpeza Pro.")}`;
  const mapaQuery = encodeURIComponent("São José da Lapa, MG");

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border safe-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-bold">Contato</h1>
            <p className="text-xs text-muted-foreground">Resposta em até 5 minutos</p>
          </div>
        </div>
      </header>

      <section className="px-4 pt-6">
        <div className="rounded-3xl gradient-primary text-primary-foreground p-6 shadow-salon">
          <h2 className="text-2xl font-extrabold mb-2">Fale com a gente agora</h2>
          <p className="text-sm opacity-90 mb-4">
            Mande uma foto pelo WhatsApp e enviamos seu orçamento em minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <a href={wpp} target="_blank" rel="noopener noreferrer"
              className="flex-1 py-3 rounded-2xl bg-emerald-500 text-white font-bold flex items-center justify-center gap-2">
              <MessageCircle className="h-5 w-5" /> WhatsApp
            </a>
            <a href={`tel:+55${COMPANY_INFO.whatsapp}`}
              className="flex-1 py-3 rounded-2xl bg-white/15 backdrop-blur text-white font-bold flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" /> {COMPANY_INFO.telefone}
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 mt-6 space-y-3">
        {[
          { icon: Phone, t: "Telefone / WhatsApp", v: COMPANY_INFO.telefone },
          { icon: Clock, t: "Horário de atendimento", v: "Segunda a sábado • 8h às 19h" },
          { icon: MapPin, t: "Região atendida", v: COMPANY_INFO.regiao },
          { icon: Mail, t: "E-mail", v: "contato@autolimpezapro.com.br" },
        ].map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.t} className="flex items-center gap-3 rounded-2xl bg-card border border-border p-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{it.t}</p>
                <p className="font-bold text-sm text-foreground truncate">{it.v}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="px-4 mt-8">
        <h3 className="font-bold text-foreground mb-3">Onde atendemos</h3>
        <div className="rounded-2xl overflow-hidden border border-border bg-card">
          <iframe
            title="Mapa de atendimento"
            src={`https://www.google.com/maps?q=${mapaQuery}&output=embed`}
            className="w-full h-64 border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {CIDADES.map((c) => (
            <Link
              key={c.slug}
              to="/atendimento/$cidade"
              params={{ cidade: c.slug }}
              className="rounded-xl bg-card border border-border p-3 text-sm font-semibold flex items-center gap-2 hover:border-primary"
            >
              <MapPin className="h-4 w-4 text-primary" />
              {c.nome}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

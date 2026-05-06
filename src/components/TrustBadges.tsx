import { ShieldCheck, Award, CreditCard, Clock, Users, Star } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, titulo: "Garantia por escrito", desc: "Refazemos sem custo" },
  { icon: Award, titulo: "+5 anos de mercado", desc: "Empresa local consolidada" },
  { icon: Users, titulo: "Equipe uniformizada", desc: "Treinada e identificada" },
  { icon: Clock, titulo: "Atendimento no mesmo dia", desc: "Resposta em até 5 min" },
  { icon: CreditCard, titulo: "Pix, dinheiro e cartão", desc: "Pagamento só após aprovação" },
  { icon: Star, titulo: "Nota 4.9/5", desc: "Clientes da região aprovam" },
];

export function TrustBadges() {
  return (
    <section className="px-4 mt-8">
      <h3 className="font-bold text-foreground mb-3">Por que pode confiar</h3>
      <div className="grid grid-cols-2 gap-2">
        {BADGES.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.titulo} className="rounded-2xl bg-card border border-border p-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-bold text-xs text-foreground leading-tight">{b.titulo}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{b.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

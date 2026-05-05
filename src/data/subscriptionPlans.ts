import { Home, Briefcase, Sparkles, Crown, Building2, Car } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PlanAudience = "residencial" | "empresarial";

export interface SubscriptionPlan {
  id: string;
  audience: PlanAudience;
  name: string;
  tagline: string;
  price: number;          // valor mensal R$
  frequency: string;      // ex: "1 visita / mês"
  highlight?: boolean;    // plano "mais escolhido"
  icon: LucideIcon;
  features: string[];
  badge?: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  // ============ RESIDENCIAL ============
  // Estratégia inspirada em Dr. Lava Tudo / Limpa Sofá:
  // 1ª visita com preço promocional (margem zero / pequeno prejuízo) para entrar
  // na casa do cliente. Ganho real vem na fidelidade 12 meses + extras.
  {
    id: "res-essencial",
    audience: "residencial",
    name: "Casa Limpa",
    tagline: "1ª visita por R$ 19 — depois assinatura trimestral",
    price: 89,
    frequency: "1 visita a cada 3 meses",
    icon: Home,
    badge: "Adesão R$ 19",
    features: [
      "1ª higienização completa por apenas R$ 19",
      "1 sofá (até 3 lugares)",
      "2 colchões (casal ou solteiro)",
      "6 cadeiras de jantar",
      "10% off em serviços extras",
      "Fidelidade 12 meses",
    ],
  },
  {
    id: "res-plus",
    audience: "residencial",
    name: "Família Premium",
    tagline: "Sua casa higienizada todo mês — 1ª visita R$ 39",
    price: 159,
    frequency: "1 visita mensal",
    highlight: true,
    badge: "Mais escolhido",
    icon: Sparkles,
    features: [
      "1ª higienização completa por R$ 39",
      "2 sofás (qualquer tamanho)",
      "3 colchões (casal ou solteiro)",
      "8 cadeiras de jantar",
      "Impermeabilização com 25% off",
      "Atendimento prioritário em até 48h",
      "Cashback de 5% em serviços extras",
      "Fidelidade 12 meses",
    ],
  },
  {
    id: "res-premium",
    audience: "residencial",
    name: "Cuidado Total",
    tagline: "Casa inteira sempre impecável",
    price: 299,
    frequency: "2 visitas mensais",
    icon: Crown,
    features: [
      "1ª higienização completa GRÁTIS",
      "Estofados ilimitados da casa",
      "Colchões e tapetes ilimitados",
      "Higienização de 1 automóvel/mês",
      "Impermeabilização inclusa 1x ao ano",
      "Atendimento em até 24h",
      "Cashback de 10% em serviços extras",
    ],
  },
  // ============ EMPRESARIAL ============
  {
    id: "emp-office",
    audience: "empresarial",
    name: "Office Care",
    tagline: "Para escritórios e clínicas",
    price: 590,
    frequency: "1 visita mensal",
    icon: Briefcase,
    features: [
      "Até 10 cadeiras de escritório",
      "1 sofá de recepção",
      "Tapetes da área comum",
      "Emissão de nota fiscal",
      "Relatório fotográfico",
    ],
  },
  {
    id: "emp-corporate",
    audience: "empresarial",
    name: "Corporate Plus",
    tagline: "Hotéis, pousadas e empresas médias",
    price: 1290,
    frequency: "2 visitas mensais",
    highlight: true,
    badge: "Mais contratado",
    icon: Building2,
    features: [
      "Estofados ilimitados por visita",
      "Até 20 colchões / mês",
      "Impermeabilização inclusa",
      "Equipe dedicada",
      "SLA de 24h para emergências",
      "Faturamento mensal",
    ],
  },
  {
    id: "emp-frota",
    audience: "empresarial",
    name: "Frota Total",
    tagline: "Locadoras e frotas corporativas",
    price: 1890,
    frequency: "Sob demanda",
    icon: Car,
    features: [
      "Até 30 higienizações automotivas/mês",
      "Higienização interna completa",
      "Coleta e entrega no pátio",
      "Relatório individual por veículo",
      "Equipe exclusiva",
      "Contrato com SLA personalizado",
    ],
  },
];

export const COMPANY_WHATSAPP = "5531980252882";

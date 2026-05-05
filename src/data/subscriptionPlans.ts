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
  // Mesma estratégia: 1ª visita demonstrativa com preço simbólico para entrar
  // no cliente. Receita real vem do contrato de 12 meses + extras + SLA.
  {
    id: "emp-office",
    audience: "empresarial",
    name: "Office Care",
    tagline: "Diagnóstico inicial por R$ 99 — escritórios e clínicas",
    price: 390,
    frequency: "1 visita mensal",
    icon: Briefcase,
    badge: "Adesão R$ 99",
    features: [
      "1ª visita demonstrativa por R$ 99 (até 5 cadeiras + 1 sofá)",
      "Por visita: até 10 cadeiras de escritório",
      "1 sofá de recepção (até 3 lugares)",
      "Tapetes da área comum (até 6 m²)",
      "Relatório fotográfico antes/depois",
      "Emissão de nota fiscal",
      "15% off em serviços extras",
      "Fidelidade 12 meses",
    ],
  },
  {
    id: "emp-corporate",
    audience: "empresarial",
    name: "Corporate Plus",
    tagline: "Hotéis, pousadas e empresas médias — adesão R$ 199",
    price: 990,
    frequency: "2 visitas mensais",
    highlight: true,
    badge: "Mais contratado",
    icon: Building2,
    features: [
      "1ª visita por R$ 199 (até 5 colchões + 2 sofás)",
      "Por visita: até 8 estofados (sofás/poltronas)",
      "Até 20 colchões por mês (somando as 2 visitas)",
      "Impermeabilização de 4 itens/mês inclusa",
      "Equipe dedicada e SLA de 24h",
      "Cashback de 8% em serviços extras",
      "Faturamento mensal com NF",
      "Fidelidade 12 meses",
    ],
  },
  {
    id: "emp-frota",
    audience: "empresarial",
    name: "Frota Total",
    tagline: "Locadoras e frotas — 1º carro grátis",
    price: 1490,
    frequency: "Sob demanda (até 30/mês)",
    icon: Car,
    badge: "1º carro grátis",
    features: [
      "1ª higienização automotiva GRÁTIS (demonstrativa)",
      "Até 30 higienizações internas/mês",
      "Escopo por carro: bancos, carpete, teto e painel",
      "Coleta e entrega no pátio incluídas",
      "Relatório individual por placa",
      "Equipe exclusiva e SLA personalizado",
      "10% off em higienização premium e couro",
      "Contrato 12 meses com NF mensal",
    ],
  },
];

export const COMPANY_WHATSAPP = "5531980252882";

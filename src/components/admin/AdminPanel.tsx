import { useMemo, useState } from "react";
import {
  Calendar,
  Wallet,
  ShoppingBag,
  BarChart3,
  User,
  LogOut,
  Search,
  Plus,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ScrollText,
} from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { toast } from "sonner";
import { useAuth, logAudit } from "@/hooks/useAuth";

interface AdminPanelProps {
  onBack: () => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  stats: {
    totalAppointments: number;
    pendingAppointments: number;
    todaySales: number;
  };
}

interface AdminPanelProps {
  onBack: () => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  stats: {
    totalAppointments: number;
    pendingAppointments: number;
    todaySales: number;
  };
}

const MODULES = [
  { icon: Calendar, label: "Agenda", desc: "Agendamentos e horários", path: "/agenda", tone: "bg-primary/10 text-primary" },
  { icon: Wallet, label: "Caixa", desc: "Abertura e fechamento", path: "/caixa", tone: "bg-emerald-500/10 text-emerald-600" },
  { icon: ShoppingBag, label: "Vendas", desc: "Histórico de vendas", path: "/vendas", tone: "bg-amber-500/10 text-amber-600" },
  { icon: BarChart3, label: "Finanças", desc: "Receitas e despesas", path: "/financas", tone: "bg-violet-500/10 text-violet-600" },
  { icon: User, label: "Empresa", desc: "Dados, equipe e ajustes", path: "/perfil", tone: "bg-cyan-500/10 text-cyan-600" },
];

const QUICK_ACTIONS = [
  { label: "Novo agendamento", icon: Calendar, path: "/agenda?new=1" },
  { label: "Nova venda", icon: Plus, path: "/vendas?new=1" },
  { label: "Abrir caixa", icon: Wallet, path: "/caixa" },
];

export function AdminPanel({ onBack, onNavigate, onLogout, stats }: AdminPanelProps) {
  const [query, setQuery] = useState("");
  const { user, isAdmin, signOut } = useAuth();

  const filteredModules = useMemo(() => {
    if (!query.trim()) return MODULES;
    const q = query.toLowerCase();
    return MODULES.filter(
      (m) => m.label.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q),
    );
  }, [query]);

  const handleLogout = async () => {
    await logAudit("admin.logout");
    await signOut();
    toast.success("Sessão encerrada");
    onLogout();
  };

  const kpis = [
    {
      label: "Agendamentos",
      value: stats.totalAppointments,
      icon: Calendar,
      tone: "text-primary",
      bg: "bg-primary/5",
    },
    {
      label: "Pendentes",
      value: stats.pendingAppointments,
      icon: AlertCircle,
      tone: "text-amber-600",
      bg: "bg-amber-500/5",
    },
    {
      label: "Vendas hoje",
      value: stats.todaySales,
      icon: TrendingUp,
      tone: "text-emerald-600",
      bg: "bg-emerald-500/5",
    },
  ];

  return (
    <AdminLayout
      title="Painel administrativo"
      subtitle="Controle operacional"
      onBack={onBack}
      breadcrumbs={[{ label: "Admin" }]}
      actions={
        <button
          onClick={handleLogout}
          aria-label="Sair"
          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition"
        >
          <LogOut className="h-5 w-5" />
        </button>
      }
    >
      <div className="p-4 space-y-5">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar módulo..."
            className="w-full pl-10 pr-3 py-3 rounded-xl bg-muted border border-transparent focus:border-primary focus:outline-none text-sm"
          />
        </div>

        {/* KPIs */}
        <section aria-label="Indicadores" className="grid grid-cols-3 gap-2">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div
                key={k.label}
                className={`rounded-2xl ${k.bg} border border-border p-3`}
              >
                <Icon className={`h-4 w-4 ${k.tone} mb-1`} />
                <p className="text-xl font-bold text-foreground leading-none">{k.value}</p>
                <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wide">
                  {k.label}
                </p>
              </div>
            );
          })}
        </section>

        {/* Ações rápidas */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Ações rápidas
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {QUICK_ACTIONS.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.label}
                  onClick={() => onNavigate(a.path.split("?")[0])}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border hover:border-primary/40 active:scale-[0.98] transition-all text-center"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-foreground leading-tight">
                    {a.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Módulos */}
        <section>
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Módulos
            </h2>
            <span className="text-[10px] text-muted-foreground">
              {filteredModules.length} de {MODULES.length}
            </span>
          </div>
          <div className="space-y-2">
            {filteredModules.map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.path}
                  onClick={() => onNavigate(m.path)}
                  className="w-full p-3.5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all flex items-center gap-3 text-left active:scale-[0.99]"
                >
                  <div className={`w-11 h-11 rounded-xl ${m.tone} flex items-center justify-center shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">{m.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{m.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              );
            })}
            {filteredModules.length === 0 && (
              <p className="text-center text-xs text-muted-foreground py-6">
                Nenhum módulo encontrado.
              </p>
            )}
          </div>
        </section>

        {/* Status do sistema */}
        <section className="rounded-2xl bg-card border border-border p-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Status
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Sistema operacional
              </span>
              <span className="text-xs text-muted-foreground">100%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-foreground">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Última atividade
              </span>
              <span className="text-xs text-muted-foreground">agora</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

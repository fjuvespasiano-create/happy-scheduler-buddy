import { useState } from "react";
import { ArrowLeft, Lock, Mail, Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth, logAudit } from "@/hooks/useAuth";

interface AdminLoginProps {
  onBack: () => void;
  onSuccess: () => void;
}

type Mode = "signin" | "signup" | "recover";

export function AdminLogin({ onBack, onSuccess }: AdminLoginProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await signIn(email.trim(), password);
        if (error) {
          toast.error("Falha no login", { description: error.message });
          return;
        }
        await logAudit("admin.login");
        toast.success("Bem-vindo!");
        onSuccess();
      } else if (mode === "signup") {
        const { error } = await signUp(email.trim(), password, name.trim() || undefined);
        if (error) {
          toast.error("Falha no cadastro", { description: error.message });
          return;
        }
        toast.success("Conta criada", {
          description: "Verifique seu e-mail para confirmar.",
        });
        setMode("signin");
      } else {
        const { supabase } = await import("@/integrations/supabase/client");
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) {
          toast.error("Erro ao enviar e-mail", { description: error.message });
          return;
        }
        toast.success("Verifique seu e-mail para redefinir a senha");
        setMode("signin");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] bg-background flex flex-col animate-fade-in">
      <header className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border safe-top">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={onBack}
            aria-label="Voltar"
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/70 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-bold text-base text-foreground">Acesso administrativo</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-salon-lg">
              <ShieldCheck className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Painel Auto Limpeza Pro</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              {mode === "signin" && "Entre com seu e-mail e senha"}
              {mode === "signup" && "Crie sua conta de operador"}
              {mode === "recover" && "Recuperar senha"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            {mode === "signup" && (
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Seu nome"
                />
              </div>
            )}

            <div>
              <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4" /> E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                className="w-full p-4 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="voce@empresa.com"
              />
            </div>

            {mode !== "recover" && (
              <div>
                <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Senha
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    className="w-full p-4 pr-12 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 shadow-salon disabled:opacity-40 active:scale-[0.98] transition-all"
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              {mode === "signin" && "Entrar no painel"}
              {mode === "signup" && "Criar conta"}
              {mode === "recover" && "Enviar e-mail de recuperação"}
            </button>

            <div className="flex flex-col gap-2 text-center text-sm">
              {mode === "signin" && (
                <>
                  <button
                    type="button"
                    onClick={() => setMode("recover")}
                    className="text-primary hover:underline"
                  >
                    Esqueci minha senha
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Não tem conta? Criar agora
                  </button>
                </>
              )}
              {mode !== "signin" && (
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ← Voltar para login
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}



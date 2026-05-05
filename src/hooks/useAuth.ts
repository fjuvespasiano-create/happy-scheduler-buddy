import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export type AppRole = "admin" | "operador" | "visualizador";

interface AuthState {
  user: User | null;
  roles: AppRole[];
  loading: boolean;
}

/**
 * Hook único de autenticação + RBAC.
 * Usa Lovable Cloud (Supabase) — sem credenciais hardcoded.
 */
export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    roles: [],
    loading: true,
  });

  useEffect(() => {
    let mounted = true;

    const loadRoles = async (userId: string): Promise<AppRole[]> => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      if (error || !data) return [];
      return data.map((r) => r.role as AppRole);
    };

    // 1) listener PRIMEIRO (evita race)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      const user = session?.user ?? null;
      setState((s) => ({ ...s, user, loading: !!user }));
      if (user) {
        // defer pra evitar deadlock no callback
        setTimeout(async () => {
          const roles = await loadRoles(user.id);
          if (mounted) setState({ user, roles, loading: false });
        }, 0);
      } else {
        setState({ user: null, roles: [], loading: false });
      }
    });

    // 2) checa sessão atual
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      const user = data.session?.user ?? null;
      if (user) {
        const roles = await loadRoles(user.id);
        if (mounted) setState({ user, roles, loading: false });
      } else {
        setState({ user: null, roles: [], loading: false });
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const hasRole = (role: AppRole) => state.roles.includes(role);
  const isAdmin = hasRole("admin");
  const isAuthenticated = !!state.user;

  const signIn = async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { display_name: displayName ?? email.split("@")[0] },
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    ...state,
    isAuthenticated,
    isAdmin,
    hasRole,
    signIn,
    signUp,
    signOut,
  };
}

/** Registra ação no log de auditoria. Silencioso — não bloqueia UI. */
export async function logAudit(
  action: string,
  opts?: { entity?: string; entityId?: string; metadata?: Record<string, unknown> },
) {
  try {
    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;
    if (!userId) return;
    await supabase.from("audit_log").insert({
      user_id: userId,
      action,
      entity: opts?.entity ?? null,
      entity_id: opts?.entityId ?? null,
      metadata: (opts?.metadata ?? null) as never,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    });
  } catch {
    /* noop */
  }
}

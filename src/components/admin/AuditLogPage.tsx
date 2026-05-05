import { useEffect, useState } from "react";
import { ScrollText, Calendar, Loader2 } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface AuditLogPageProps {
  onBack: () => void;
}

interface AuditEntry {
  id: string;
  user_id: string | null;
  action: string;
  entity: string | null;
  entity_id: string | null;
  metadata: unknown;
  created_at: string;
}

export function AuditLogPage({ onBack }: AuditLogPageProps) {
  const { isAdmin } = useAuth();
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }
    supabase
      .from("audit_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => {
        setEntries((data ?? []) as AuditEntry[]);
        setLoading(false);
      });
  }, [isAdmin]);

  return (
    <AdminLayout
      title="Auditoria"
      subtitle="Últimas 100 ações registradas"
      onBack={onBack}
      breadcrumbs={[{ label: "Admin", onClick: onBack }, { label: "Auditoria" }]}
    >
      <div className="p-4">
        {!isAdmin ? (
          <p className="text-center text-sm text-muted-foreground py-12">
            Apenas administradores podem ver o log de auditoria.
          </p>
        ) : loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : entries.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-12">
            Nenhuma ação registrada ainda.
          </p>
        ) : (
          <div className="space-y-2">
            {entries.map((e) => (
              <div
                key={e.id}
                className="rounded-xl bg-card border border-border p-3 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <ScrollText className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">{e.action}</p>
                  {e.entity && (
                    <p className="text-xs text-muted-foreground">
                      {e.entity}
                      {e.entity_id ? ` · ${e.entity_id}` : ""}
                    </p>
                  )}
                  <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(e.created_at).toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

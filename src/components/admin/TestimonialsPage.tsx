import { useMemo, useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Star, Trash2, Plus, Loader2, MessageSquareQuote } from "lucide-react";
import { toast } from "sonner";
import { useBlogTestimonials } from "@/hooks/useBlogTestimonials";
import { POSTS } from "@/data/blog";
import { CIDADES } from "@/data/locations";

interface Props {
  onBack: () => void;
}

export function TestimonialsPage({ onBack }: Props) {
  const { items, loading, add, remove } = useBlogTestimonials();
  const [filter, setFilter] = useState<string>("");

  const filtered = useMemo(
    () =>
      filter
        ? items.filter((i) => i.post_slug === filter || (filter === "__global__" && !i.post_slug))
        : items,
    [items, filter],
  );

  return (
    <AdminLayout
      title="Depoimentos"
      subtitle="Prova social por post (SEO local)"
      onBack={onBack}
      breadcrumbs={[{ label: "Admin", onClick: onBack }, { label: "Depoimentos" }]}
    >
      <div className="p-4 space-y-4">
        <NewForm onAdd={add} />

        <div>
          <label className="text-[10px] font-bold uppercase text-muted-foreground">
            Filtrar
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-xl bg-muted text-sm"
          >
            <option value="">Todos ({items.length})</option>
            <option value="__global__">Globais (todos os posts)</option>
            {POSTS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.titulo.slice(0, 60)}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <p className="text-center text-sm text-muted-foreground py-6">Carregando…</p>
        )}

        <div className="space-y-2">
          {filtered.map((t) => {
            const post = POSTS.find((p) => p.slug === t.post_slug);
            return (
              <div key={t.id} className="rounded-2xl border border-border bg-card p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-foreground truncate">{t.nome}</p>
                      <div className="flex shrink-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < t.estrelas ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground mb-1">
                      📍 {t.bairro || "—"} {post ? `• ${post.titulo.slice(0, 40)}…` : "• Global"}
                    </p>
                    <p className="text-xs text-foreground leading-snug">"{t.texto}"</p>
                  </div>
                  <button
                    onClick={() => remove(t.id).then(() => toast.success("Removido"))}
                    className="p-2 rounded-lg bg-destructive/10 text-destructive shrink-0"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <MessageSquareQuote className="h-10 w-10 mx-auto mb-2 opacity-40" />
              <p className="text-xs">Nenhum depoimento ainda.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function NewForm({ onAdd }: { onAdd: ReturnType<typeof useBlogTestimonials>["add"] }) {
  const [nome, setNome] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidadeSlug, setCidadeSlug] = useState("");
  const [postSlug, setPostSlug] = useState("");
  const [estrelas, setEstrelas] = useState(5);
  const [texto, setTexto] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!nome.trim() || !texto.trim()) {
      return toast.error("Nome e texto são obrigatórios");
    }
    setBusy(true);
    try {
      await onAdd({
        nome: nome.trim(),
        bairro: bairro.trim(),
        cidade_slug: cidadeSlug || null,
        post_slug: postSlug || null,
        estrelas,
        texto: texto.trim(),
      });
      toast.success("Depoimento adicionado");
      setNome("");
      setBairro("");
      setTexto("");
      setEstrelas(5);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-3 space-y-2">
      <p className="text-[10px] font-bold uppercase text-muted-foreground">
        Novo depoimento
      </p>
      <div className="grid grid-cols-2 gap-2">
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do cliente *"
          className="px-3 py-2 rounded-xl bg-muted text-sm"
        />
        <input
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          placeholder="Bairro"
          className="px-3 py-2 rounded-xl bg-muted text-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <select
          value={cidadeSlug}
          onChange={(e) => setCidadeSlug(e.target.value)}
          className="px-3 py-2 rounded-xl bg-muted text-sm"
        >
          <option value="">Cidade (opcional)</option>
          {CIDADES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.nome}
            </option>
          ))}
        </select>
        <select
          value={postSlug}
          onChange={(e) => setPostSlug(e.target.value)}
          className="px-3 py-2 rounded-xl bg-muted text-sm"
        >
          <option value="">Global (todos os posts)</option>
          {POSTS.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.titulo.slice(0, 50)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground mr-1">Avaliação:</span>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setEstrelas(n)}
            aria-label={`${n} estrelas`}
          >
            <Star
              className={`h-5 w-5 ${n <= estrelas ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`}
            />
          </button>
        ))}
      </div>

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Texto curto do depoimento *"
        rows={3}
        className="w-full px-3 py-2 rounded-xl bg-muted text-sm resize-none"
      />

      <button
        onClick={submit}
        disabled={busy}
        className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        Adicionar
      </button>
    </div>
  );
}

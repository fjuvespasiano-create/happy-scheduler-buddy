import { useMemo, useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Upload, Trash2, ImagePlus, Plus, X, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import { useBlogMedia, useBlogPairs, type BlogMedia } from "@/hooks/useBlogMedia";
import { POSTS } from "@/data/blog";
import { SERVICOS } from "@/data/servicos";
import { CIDADES } from "@/data/locations";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

interface Props {
  onBack: () => void;
}

export function BlogMediaPage({ onBack }: Props) {
  const { media, loading, upload, remove, update } = useBlogMedia();
  const [tab, setTab] = useState<"upload" | "biblioteca" | "pares">("upload");
  const [postSlug, setPostSlug] = useState<string>(POSTS[0]?.slug ?? "");
  const [search, setSearch] = useState("");

  const filteredMedia = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return media;
    return media.filter(
      (m) =>
        m.alt.toLowerCase().includes(q) ||
        m.titulo.toLowerCase().includes(q) ||
        m.path.toLowerCase().includes(q),
    );
  }, [media, search]);

  return (
    <AdminLayout
      title="Mídia do blog"
      subtitle="Antes/Depois — biblioteca reutilizável"
      onBack={onBack}
      breadcrumbs={[{ label: "Admin", onClick: onBack }, { label: "Mídia" }]}
    >
      <div className="px-4 pt-4">
        <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-muted text-xs font-semibold">
          {(["upload", "biblioteca", "pares"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-2 rounded-lg capitalize ${tab === t ? "bg-background text-foreground shadow" : "text-muted-foreground"}`}
            >
              {t === "pares" ? "Pares por post" : t}
            </button>
          ))}
        </div>
      </div>

      {tab === "upload" && <UploadForm onUpload={upload} />}

      {tab === "biblioteca" && (
        <div className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por alt, título ou nome do arquivo..."
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-muted text-sm focus:outline-none"
            />
          </div>
          {loading && <p className="text-center text-sm text-muted-foreground py-6">Carregando...</p>}
          <div className="grid grid-cols-2 gap-3">
            {filteredMedia.map((m) => (
              <MediaCard key={m.id} item={m} onDelete={() => remove(m).then(() => toast.success("Removida"))} onUpdate={update} />
            ))}
          </div>
          {!loading && filteredMedia.length === 0 && (
            <p className="text-center text-xs text-muted-foreground py-10">Nenhuma imagem ainda.</p>
          )}
        </div>
      )}

      {tab === "pares" && (
        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">Post</label>
            <select
              value={postSlug}
              onChange={(e) => setPostSlug(e.target.value)}
              className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted text-sm"
            >
              {POSTS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.titulo.slice(0, 70)}
                </option>
              ))}
            </select>
          </div>
          <PairsManager postSlug={postSlug} library={media} />
        </div>
      )}
    </AdminLayout>
  );
}

function UploadForm({ onUpload }: { onUpload: ReturnType<typeof useBlogMedia>["upload"] }) {
  const [kind, setKind] = useState<"antes" | "depois">("antes");
  const [alt, setAlt] = useState("");
  const [titulo, setTitulo] = useState("");
  const [servicoSlug, setServicoSlug] = useState<string>("");
  const [cidadeSlug, setCidadeSlug] = useState<string>("");
  const [bairroSlug, setBairroSlug] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const cidade = CIDADES.find((c) => c.slug === cidadeSlug);

  const handleSubmit = async () => {
    if (!file) return toast.error("Escolha uma imagem");
    if (!alt.trim()) return toast.error("Alt text obrigatório (SEO)");
    setBusy(true);
    try {
      await onUpload({
        file,
        kind,
        alt: alt.trim(),
        titulo: titulo.trim() || alt.trim(),
        servicoSlug: servicoSlug || undefined,
        cidadeSlug: cidadeSlug || undefined,
        bairroSlug: bairroSlug || undefined,
      });
      toast.success("Imagem enviada e otimizada");
      setFile(null);
      setAlt("");
      setTitulo("");
    } catch (e) {
      toast.error((e as Error).message || "Falha no upload");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="p-4 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {(["antes", "depois"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`py-2.5 rounded-xl text-sm font-bold capitalize ${kind === k ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
          >
            {k}
          </button>
        ))}
      </div>

      <label className="block">
        <div className="aspect-video rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 bg-muted/40 hover:bg-muted cursor-pointer overflow-hidden">
          {file ? (
            <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
          ) : (
            <>
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Selecionar imagem (JPG/PNG)</span>
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </label>

      <div className="grid grid-cols-2 gap-2">
        <select value={servicoSlug} onChange={(e) => setServicoSlug(e.target.value)} className="px-3 py-2.5 rounded-xl bg-muted text-sm">
          <option value="">Serviço (opcional)</option>
          {SERVICOS.map((s) => <option key={s.slug} value={s.slug}>{s.nome}</option>)}
        </select>
        <select value={cidadeSlug} onChange={(e) => { setCidadeSlug(e.target.value); setBairroSlug(""); }} className="px-3 py-2.5 rounded-xl bg-muted text-sm">
          <option value="">Cidade (opcional)</option>
          {CIDADES.map((c) => <option key={c.slug} value={c.slug}>{c.nome}</option>)}
        </select>
      </div>
      {cidade && (
        <select value={bairroSlug} onChange={(e) => setBairroSlug(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-muted text-sm">
          <option value="">Bairro (opcional)</option>
          {cidade.bairros.map((b) => <option key={b.slug} value={b.slug}>{b.nome}</option>)}
        </select>
      )}

      <input
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
        placeholder="Alt text — ex: Sofá higienizado no Centro de Vespasiano"
        className="w-full px-3 py-2.5 rounded-xl bg-muted text-sm"
      />
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título da imagem (opcional)"
        className="w-full px-3 py-2.5 rounded-xl bg-muted text-sm"
      />

      <p className="text-[11px] text-muted-foreground">
        ✅ Compressão automática (máx 1600px, ~82% qualidade) • Nome SEO: <code>{kind}/{servicoSlug || "img"}-{bairroSlug || ""}-{cidadeSlug || ""}-{kind}.jpg</code>
      </p>

      <button
        onClick={handleSubmit}
        disabled={busy}
        className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
        Enviar imagem
      </button>
    </div>
  );
}

function MediaCard({
  item,
  onDelete,
  onUpdate,
}: {
  item: BlogMedia;
  onDelete: () => void;
  onUpdate: (id: string, patch: Partial<Pick<BlogMedia, "alt" | "titulo">>) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [alt, setAlt] = useState(item.alt);
  const [titulo, setTitulo] = useState(item.titulo);
  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-card">
      <div className="aspect-square relative">
        <img src={item.url} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
        <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${item.kind === "antes" ? "bg-zinc-900 text-white" : "bg-emerald-500 text-white"}`}>
          {item.kind.toUpperCase()}
        </span>
      </div>
      <div className="p-2 space-y-1">
        {editing ? (
          <>
            <input value={alt} onChange={(e) => setAlt(e.target.value)} className="w-full text-[11px] px-2 py-1 rounded-md bg-muted" />
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full text-[11px] px-2 py-1 rounded-md bg-muted" />
            <div className="flex gap-1">
              <button
                onClick={async () => {
                  await onUpdate(item.id, { alt, titulo });
                  toast.success("Atualizado");
                  setEditing(false);
                }}
                className="flex-1 py-1 rounded-md bg-primary text-primary-foreground text-[11px] font-bold"
              >
                Salvar
              </button>
              <button onClick={() => setEditing(false)} className="px-2 py-1 rounded-md bg-muted text-[11px]">Cancelar</button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[11px] font-semibold text-foreground line-clamp-2">{item.alt || "(sem alt)"}</p>
            <p className="text-[10px] text-muted-foreground line-clamp-1">{item.titulo}</p>
            <div className="flex gap-1">
              <button onClick={() => setEditing(true)} className="flex-1 py-1 rounded-md bg-muted text-[11px] font-semibold">Editar</button>
              <button onClick={onDelete} className="p-1 rounded-md bg-destructive/10 text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PairsManager({ postSlug, library }: { postSlug: string; library: BlogMedia[] }) {
  const { pairs, addPair, removePair, loading } = useBlogPairs(postSlug);
  const [antesId, setAntesId] = useState<string>("");
  const [depoisId, setDepoisId] = useState<string>("");
  const [legenda, setLegenda] = useState("");

  const antesList = library.filter((m) => m.kind === "antes");
  const depoisList = library.filter((m) => m.kind === "depois");

  const canAdd = pairs.length < 3 && antesId && depoisId;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border p-3 bg-card space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase">
          Novo par ({pairs.length}/3)
        </p>
        <div className="grid grid-cols-2 gap-2">
          <select value={antesId} onChange={(e) => setAntesId(e.target.value)} className="px-2 py-2 rounded-lg bg-muted text-xs">
            <option value="">Imagem ANTES...</option>
            {antesList.map((m) => <option key={m.id} value={m.id}>{m.alt || m.path}</option>)}
          </select>
          <select value={depoisId} onChange={(e) => setDepoisId(e.target.value)} className="px-2 py-2 rounded-lg bg-muted text-xs">
            <option value="">Imagem DEPOIS...</option>
            {depoisList.map((m) => <option key={m.id} value={m.id}>{m.alt || m.path}</option>)}
          </select>
        </div>
        <input value={legenda} onChange={(e) => setLegenda(e.target.value)} placeholder="Legenda (opcional)" className="w-full px-3 py-2 rounded-lg bg-muted text-xs" />
        <button
          disabled={!canAdd}
          onClick={async () => {
            try {
              await addPair({ antesId, depoisId, legenda });
              setAntesId(""); setDepoisId(""); setLegenda("");
              toast.success("Par adicionado");
            } catch (e) {
              toast.error((e as Error).message);
            }
          }}
          className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" /> Adicionar par
        </button>
      </div>

      {loading && <p className="text-center text-sm text-muted-foreground">Carregando pares...</p>}

      <div className="space-y-3">
        {pairs.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border p-3 bg-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-foreground">Par #{p.posicao + 1}</p>
              <button onClick={() => removePair(p.id)} className="p-1.5 rounded-lg bg-destructive/10 text-destructive">
                <X className="h-4 w-4" />
              </button>
            </div>
            {p.antes && p.depois && (
              <BeforeAfterSlider
                antesUrl={p.antes.url}
                depoisUrl={p.depois.url}
                antesAlt={p.antes.alt}
                depoisAlt={p.depois.alt}
                legenda={p.legenda}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

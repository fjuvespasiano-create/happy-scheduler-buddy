import { useState } from "react";
import { Trash2, Plus, ExternalLink, Info } from "lucide-react";
import { useIntegrationsSettings, type Testimonial } from "@/hooks/useIntegrationsSettings";
import { toast } from "sonner";

function Field({
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-foreground">{label}</span>
      {hint && <span className="block text-[11px] text-muted-foreground mt-0.5">{hint}</span>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full px-3 py-2.5 rounded-xl bg-muted border border-transparent focus:border-primary focus:outline-none text-sm"
      />
    </label>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-card rounded-2xl border border-border p-4 space-y-3">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function IntegrationsSection() {
  const { settings, update, addTestimonial, removeTestimonial } = useIntegrationsSettings();
  const [draft, setDraft] = useState<Omit<Testimonial, "id">>({
    name: "",
    neighborhood: "",
    city: "",
    rating: 5,
    text: "",
  });

  const handleSave = () => toast.success("Configurações salvas");

  const handleAddTestimonial = () => {
    if (!draft.name.trim() || !draft.text.trim()) {
      toast.error("Preencha nome e depoimento");
      return;
    }
    addTestimonial(draft);
    setDraft({ name: "", neighborhood: "", city: "", rating: 5, text: "" });
    toast.success("Depoimento adicionado");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/20">
        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-foreground">
          Centralize aqui todas as informações que dependem de você (chaves de API, IDs de
          rastreio, links e depoimentos reais). Os dados são salvos localmente neste navegador.
        </p>
      </div>

      <Group title="Analytics & Rastreio">
        <Field
          label="Google Analytics 4 (GA4)"
          hint="Formato: G-XXXXXXXXXX"
          value={settings.ga4Id}
          onChange={(v) => update({ ga4Id: v })}
          placeholder="G-XXXXXXXXXX"
        />
        <Field
          label="Google Tag Manager (GTM)"
          hint="Formato: GTM-XXXXXXX"
          value={settings.gtmId}
          onChange={(v) => update({ gtmId: v })}
          placeholder="GTM-XXXXXXX"
        />
        <Field
          label="Facebook / Meta Pixel ID"
          value={settings.fbPixelId}
          onChange={(v) => update({ fbPixelId: v })}
          placeholder="1234567890"
        />
      </Group>

      <Group title="Google Meu Negócio">
        <Field
          label="Place ID"
          hint="Encontre em developers.google.com/maps/documentation/places/web-service/place-id"
          value={settings.googlePlaceId}
          onChange={(v) => update({ googlePlaceId: v })}
          placeholder="ChIJ..."
        />
        <Field
          label="URL do iframe (Google Maps)"
          hint="No Maps → Compartilhar → Incorporar mapa → copie o src do iframe"
          value={settings.googleMapsEmbedUrl}
          onChange={(v) => update({ googleMapsEmbedUrl: v })}
          placeholder="https://www.google.com/maps/embed?pb=..."
        />
        <Field
          label="Link de avaliações no Google"
          value={settings.googleReviewsUrl}
          onChange={(v) => update({ googleReviewsUrl: v })}
          placeholder="https://g.page/r/..."
        />
        <Field
          label="Link do Perfil da Empresa"
          value={settings.googleBusinessUrl}
          onChange={(v) => update({ googleBusinessUrl: v })}
          placeholder="https://g.co/kgs/..."
        />
        <a
          href="https://www.google.com/business/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          Abrir Google Meu Negócio <ExternalLink className="h-3 w-3" />
        </a>
      </Group>

      <Group title="Contato (público no site)">
        <Field
          label="E-mail"
          value={settings.contactEmail}
          onChange={(v) => update({ contactEmail: v })}
          placeholder="contato@autolimpezapro.com.br"
        />
        <Field
          label="Telefone"
          value={settings.contactPhone}
          onChange={(v) => update({ contactPhone: v })}
          placeholder="(31) 98025-2882"
        />
        <Field
          label="WhatsApp (com DDI)"
          hint="Apenas números, ex.: 5531980252882"
          value={settings.contactWhatsapp}
          onChange={(v) => update({ contactWhatsapp: v })}
          placeholder="5531980252882"
        />
      </Group>

      <Group title="Redes sociais">
        <Field
          label="Instagram"
          value={settings.instagramUrl}
          onChange={(v) => update({ instagramUrl: v })}
          placeholder="https://instagram.com/autolimpezapro"
        />
        <Field
          label="Facebook"
          value={settings.facebookUrl}
          onChange={(v) => update({ facebookUrl: v })}
          placeholder="https://facebook.com/autolimpezapro"
        />
        <Field
          label="TikTok"
          value={settings.tiktokUrl}
          onChange={(v) => update({ tiktokUrl: v })}
          placeholder="https://tiktok.com/@autolimpezapro"
        />
      </Group>

      <Group title="Depoimentos reais de clientes">
        <div className="space-y-2">
          {settings.testimonials.length === 0 && (
            <p className="text-xs text-muted-foreground">Nenhum depoimento cadastrado.</p>
          )}
          {settings.testimonials.map((t) => (
            <div
              key={t.id}
              className="p-3 rounded-xl bg-muted border border-border flex items-start gap-2"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {t.name}{" "}
                  <span className="text-xs text-muted-foreground font-normal">
                    • {t.neighborhood}
                    {t.city ? `, ${t.city}` : ""} • {t.rating}★
                  </span>
                </p>
                <p className="text-xs text-foreground/80 mt-1">{t.text}</p>
              </div>
              <button
                onClick={() => removeTestimonial(t.id)}
                className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive shrink-0"
                aria-label="Remover"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-3 space-y-2">
          <p className="text-xs font-semibold text-foreground">Adicionar depoimento</p>
          <div className="grid grid-cols-2 gap-2">
            <input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="Nome"
              className="px-3 py-2 rounded-xl bg-muted text-sm"
            />
            <input
              value={draft.neighborhood}
              onChange={(e) => setDraft({ ...draft, neighborhood: e.target.value })}
              placeholder="Bairro"
              className="px-3 py-2 rounded-xl bg-muted text-sm"
            />
            <input
              value={draft.city}
              onChange={(e) => setDraft({ ...draft, city: e.target.value })}
              placeholder="Cidade"
              className="px-3 py-2 rounded-xl bg-muted text-sm"
            />
            <select
              value={draft.rating}
              onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
              className="px-3 py-2 rounded-xl bg-muted text-sm"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} estrela{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={draft.text}
            onChange={(e) => setDraft({ ...draft, text: e.target.value })}
            placeholder="Depoimento do cliente..."
            rows={3}
            className="w-full px-3 py-2 rounded-xl bg-muted text-sm"
          />
          <button
            onClick={handleAddTestimonial}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
          >
            <Plus className="h-4 w-4" /> Adicionar depoimento
          </button>
        </div>
      </Group>

      <button
        onClick={handleSave}
        className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold"
      >
        Salvar configurações
      </button>

      <p className="text-[11px] text-muted-foreground text-center">
        Para uso em produção em múltiplos dispositivos, estas chaves podem ser movidas para o
        backend (Lovable Cloud).
      </p>
    </div>
  );
}

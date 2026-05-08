import { Star } from "lucide-react";
import { usePublicTestimonials } from "@/hooks/useBlogTestimonials";

export function TestimonialsBlock({ postSlug }: { postSlug: string }) {
  const items = usePublicTestimonials(postSlug);
  if (items.length === 0) return null;

  return (
    <section className="px-4 mt-10">
      <h3 className="text-lg font-bold text-foreground mb-3">
        O que clientes da região dizem
      </h3>
      <div className="space-y-3">
        {items.map((t) => (
          <article
            key={t.id}
            className="rounded-2xl bg-card border border-border p-4"
          >
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-bold text-foreground">{t.nome}</p>
              <div className="flex" aria-label={`${t.estrelas} estrelas`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < t.estrelas
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
            {t.bairro && (
              <p className="text-[11px] text-muted-foreground mb-2">
                📍 {t.bairro}
              </p>
            )}
            <p className="text-sm text-foreground leading-relaxed">"{t.texto}"</p>
          </article>
        ))}
      </div>
    </section>
  );
}

import { ReactNode } from "react";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  onClick?: () => void;
}

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  children: ReactNode;
}

/**
 * Layout padrão de TODAS as telas administrativas.
 * - Botão voltar fixo no canto superior esquerdo
 * - Breadcrumb padronizado
 * - Título + subtítulo
 * - Slot para ações no header (botões primários)
 */
export function AdminLayout({
  title,
  subtitle,
  onBack,
  breadcrumbs,
  actions,
  children,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-lg border-b border-border safe-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="Voltar"
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/70 transition shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1 min-w-0">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav
                aria-label="breadcrumb"
                className="flex items-center gap-1 text-[11px] text-muted-foreground mb-0.5 truncate"
              >
                <Home className="h-3 w-3" />
                {breadcrumbs.map((c, i) => (
                  <span key={i} className="flex items-center gap-1 truncate">
                    <ChevronRight className="h-3 w-3 shrink-0" />
                    {c.onClick ? (
                      <button
                        onClick={c.onClick}
                        className="hover:text-foreground truncate"
                      >
                        {c.label}
                      </button>
                    ) : (
                      <span className="text-foreground/80 truncate">{c.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
            <h1 className="font-bold text-base text-foreground leading-tight truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] text-muted-foreground truncate">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

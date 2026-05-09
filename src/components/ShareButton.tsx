import { useState } from "react";
import { Share2, Check, Copy, X } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  url: string;
  title: string;
  text: string;
  className?: string;
}

const WPP_ICON = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
  </svg>
);

export function ShareButton({ url, title, text, className }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // user canceled or unsupported -> fallback
      }
    }
    setOpen(true);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copiado!");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Não foi possível copiar");
    }
  };

  const shareText = `${title}\n\n${text}\n\n${url}`;
  const enc = encodeURIComponent;
  const links = [
    {
      label: "WhatsApp",
      icon: WPP_ICON,
      tone: "bg-emerald-500 text-white",
      href: `https://wa.me/?text=${enc(shareText)}`,
    },
    {
      label: "Facebook",
      tone: "bg-blue-600 text-white",
      icon: <span className="font-bold text-sm">f</span>,
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    },
    {
      label: "X / Twitter",
      tone: "bg-foreground text-background",
      icon: <span className="font-bold text-sm">𝕏</span>,
      href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
    },
    {
      label: "Telegram",
      tone: "bg-sky-500 text-white",
      icon: <span className="font-bold text-sm">✈</span>,
      href: `https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`,
    },
    {
      label: "LinkedIn",
      tone: "bg-blue-700 text-white",
      icon: <span className="font-bold text-xs">in</span>,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    },
    {
      label: "E-mail",
      tone: "bg-muted text-foreground",
      icon: <span className="text-sm">✉</span>,
      href: `mailto:?subject=${enc(title)}&body=${enc(shareText)}`,
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Compartilhar"
        className={
          className ??
          "w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition"
        }
      >
        <Share2 className="h-5 w-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full sm:max-w-md bg-background rounded-t-3xl sm:rounded-3xl border-t sm:border border-border p-5 pb-7 safe-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-foreground">Compartilhar</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{title}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-border hover:border-primary/40 active:scale-95 transition"
                >
                  <div
                    className={`w-11 h-11 rounded-2xl ${l.tone} flex items-center justify-center shadow-sm`}
                  >
                    {l.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-foreground">{l.label}</span>
                </a>
              ))}
            </div>

            <button
              onClick={copyLink}
              className="w-full flex items-center gap-2 p-3 rounded-2xl bg-muted hover:bg-primary/10 transition"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-xs font-semibold text-foreground">
                  {copied ? "Link copiado" : "Copiar link"}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">{url}</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

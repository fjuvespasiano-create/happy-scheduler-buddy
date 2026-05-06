import { useState, useRef } from "react";

interface BeforeAfterProps {
  servico: string;
}

const COLORS: Record<string, { antes: string; depois: string; emoji: string }> = {
  "Sofá": { antes: "#7a6a55", depois: "#3d5a8c", emoji: "🛋️" },
  "Colchão": { antes: "#a89070", depois: "#e8eef5", emoji: "🛏️" },
  "Automotiva": { antes: "#3a3a3a", depois: "#1a1a1a", emoji: "🚗" },
  "Pós-Obra": { antes: "#a39078", depois: "#f0e8d8", emoji: "🧱" },
  "Impermeabilização": { antes: "#5a6a7a", depois: "#3b6fa0", emoji: "🛡️" },
};

function Slide({ antes, depois, emoji, label }: { antes: string; depois: string; emoji: string; label: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(5, Math.min(95, p)));
  };

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-border select-none cursor-ew-resize"
      onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      {/* Depois (fundo) */}
      <div
        className="absolute inset-0 flex items-center justify-center text-6xl"
        style={{ background: `linear-gradient(135deg, ${depois}, ${depois}dd)` }}
        aria-hidden
      >
        <span className="opacity-30">{emoji}</span>
        <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold">DEPOIS</span>
      </div>
      {/* Antes (clip) */}
      <div
        className="absolute inset-0 flex items-center justify-center text-6xl"
        style={{
          background: `linear-gradient(135deg, ${antes}, ${antes}aa)`,
          clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`,
        }}
        aria-hidden
      >
        <span className="opacity-40 grayscale">{emoji}</span>
        <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-zinc-800 text-white text-[10px] font-bold">ANTES</span>
      </div>
      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-xs font-bold text-zinc-700">
          ⇆
        </div>
      </div>
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded-full">
        {label}
      </p>
    </div>
  );
}

export function BeforeAfterGallery({ servico }: BeforeAfterProps) {
  const c = COLORS[servico] || COLORS["Sofá"];
  return (
    <section className="px-4 mt-8">
      <h3 className="font-bold text-foreground mb-1">Antes e depois</h3>
      <p className="text-xs text-muted-foreground mb-3">Arraste o controle para comparar</p>
      <div className="space-y-3">
        <Slide {...c} label="Trabalho real • cliente da região" />
      </div>
      <p className="text-[10px] text-muted-foreground mt-2 text-center italic">
        * Imagens ilustrativas. Galeria de fotos reais sob demanda no WhatsApp.
      </p>
    </section>
  );
}

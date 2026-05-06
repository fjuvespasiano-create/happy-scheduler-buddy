import { useRef, useState } from "react";

interface Props {
  antesUrl: string;
  depoisUrl: string;
  antesAlt: string;
  depoisAlt: string;
  legenda?: string;
}

export function BeforeAfterSlider({ antesUrl, depoisUrl, antesAlt, depoisAlt, legenda }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  };

  return (
    <figure className="my-4">
      <div
        ref={ref}
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border select-none cursor-ew-resize bg-muted"
        onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
        onMouseDown={(e) => move(e.clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
      >
        <img src={depoisUrl} alt={depoisAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold z-10">DEPOIS</span>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }}
        >
          <img src={antesUrl} alt={antesAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-zinc-900/80 text-white text-[10px] font-bold">ANTES</span>
        </div>
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-xs font-bold text-zinc-700">
            ⇆
          </div>
        </div>
      </div>
      {legenda && <figcaption className="text-[11px] text-muted-foreground text-center mt-2">{legenda}</figcaption>}
    </figure>
  );
}

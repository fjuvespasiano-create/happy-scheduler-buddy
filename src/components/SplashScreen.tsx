import { useEffect, useState } from "react";
import mascote from "@/assets/mascote-auto-limpeza-pro.png";
import logo from "@/assets/auto-limpeza-pro-logo.jpg";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    // Duração menor: 900ms (reduced) ou 1300ms (normal)
    const showMs = mq.matches ? 700 : 1100;
    const fadeMs = 250;

    const t1 = setTimeout(() => setFading(true), showMs);
    const t2 = setTimeout(() => setVisible(false), showMs + fadeMs);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent transition-opacity duration-300 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div
        className={`relative flex flex-col items-center gap-5 ${
          reducedMotion ? "" : "animate-fade-in"
        }`}
      >
        <div className="w-16 h-16 rounded-2xl bg-black overflow-hidden shadow-xl">
          <img src={logo} alt="" className="w-full h-full object-cover" />
        </div>
        <img
          src={mascote}
          alt=""
          className={`w-44 h-44 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] ${
            reducedMotion ? "" : "animate-scale-in"
          }`}
        />
        <div className="text-center">
          <p className="text-white font-extrabold text-xl tracking-tight">Auto Limpeza Pro</p>
          <p className="text-white/80 text-[11px] mt-0.5">Higienização profissional</p>
        </div>
        {!reducedMotion && (
          <div className="mt-2 flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{ animationDelay: "300ms" }} />
          </div>
        )}
      </div>
    </div>
  );
}

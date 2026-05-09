import { useEffect, useState } from "react";
import mascote from "@/assets/mascote-auto-limpeza-pro.png";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    // Splash bem rápido para não atrapalhar o carregamento
    const showMs = mq.matches ? 350 : 600;
    const fadeMs = 200;

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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent transition-opacity duration-200 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <img
        src={mascote}
        alt=""
        className={`w-44 h-44 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] ${
          reducedMotion ? "" : "animate-fade-in"
        }`}
      />
    </div>
  );
}

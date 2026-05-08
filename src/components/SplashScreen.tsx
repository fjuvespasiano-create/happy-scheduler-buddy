import { useEffect, useState } from "react";
import mascote from "@/assets/mascote-auto-limpeza-pro.png";
import logo from "@/assets/auto-limpeza-pro-logo.jpg";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1600);
    const t2 = setTimeout(() => setVisible(false), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-700">
        <div className="w-20 h-20 rounded-2xl bg-black overflow-hidden shadow-2xl">
          <img src={logo} alt="" className="w-full h-full object-cover" />
        </div>
        <img
          src={mascote}
          alt=""
          className="w-56 h-56 object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.4)] animate-bounce"
          style={{ animationDuration: "1.4s" }}
        />
        <div className="text-center">
          <p className="text-white font-extrabold text-2xl tracking-tight">Auto Limpeza Pro</p>
          <p className="text-white/80 text-xs mt-1">Higienização profissional</p>
        </div>
        <div className="mt-4 flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

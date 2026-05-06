import { useLocation } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/config/whatsappTemplate";

function buildMessage(pathname: string): string {
  if (pathname.startsWith("/servicos/")) {
    const parts = pathname.split("/").filter(Boolean);
    const servico = parts[1]?.replace(/-/g, " ");
    const cidade = parts[2]?.replace(/-/g, " ");
    const bairro = parts[3]?.replace(/-/g, " ");
    let local = "";
    if (bairro) local = ` no bairro ${bairro}, ${cidade}`;
    else if (cidade) local = ` em ${cidade}`;
    return `Olá! Quero um orçamento de ${servico}${local}.`;
  }
  if (pathname.startsWith("/atendimento/")) {
    const parts = pathname.split("/").filter(Boolean);
    const cidade = parts[1]?.replace(/-/g, " ");
    const bairro = parts[2]?.replace(/-/g, " ");
    if (bairro) return `Olá! Preciso de higienização no bairro ${bairro}, ${cidade}.`;
    if (cidade) return `Olá! Preciso de higienização em ${cidade}.`;
  }
  if (pathname.startsWith("/blog/")) {
    return `Olá! Vi um artigo no blog e quero um orçamento.`;
  }
  if (pathname.startsWith("/contato")) {
    return `Olá! Quero falar com a ${COMPANY_INFO.nome}.`;
  }
  return `Olá! Quero um orçamento da ${COMPANY_INFO.nome}.`;
}

export function WhatsAppFab() {
  const { pathname } = useLocation();
  // Ocultar nas rotas administrativas/sistema
  if (pathname.startsWith("/admin") || pathname.startsWith("/reset-password") || pathname === "/") {
    return null;
  }
  const msg = encodeURIComponent(buildMessage(pathname));
  const url = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${msg}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 z-[60] flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-2xl animate-in fade-in slide-in-from-bottom-2"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-sm">WhatsApp</span>
    </a>
  );
}

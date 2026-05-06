import { useEffect, useState } from "react";

export interface Testimonial {
  id: string;
  name: string;
  neighborhood: string;
  city: string;
  rating: number;
  text: string;
}

export interface IntegrationsSettings {
  // Analytics & Tracking
  ga4Id: string;          // ex.: G-XXXXXXX
  gtmId: string;          // ex.: GTM-XXXXXXX
  fbPixelId: string;      // ex.: 1234567890
  // Google Local
  googlePlaceId: string;
  googleMapsEmbedUrl: string;
  googleReviewsUrl: string;
  googleBusinessUrl: string;
  // Redes sociais
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  // Contato (sobrescrevem padrões)
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string; // formato 5531999999999
  // Conteúdo dependente do dono
  testimonials: Testimonial[];
}

const STORAGE_KEY = "alp_integrations_v1";

const DEFAULTS: IntegrationsSettings = {
  ga4Id: "",
  gtmId: "",
  fbPixelId: "",
  googlePlaceId: "",
  googleMapsEmbedUrl: "",
  googleReviewsUrl: "",
  googleBusinessUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  tiktokUrl: "",
  contactEmail: "",
  contactPhone: "",
  contactWhatsapp: "",
  testimonials: [],
};

function load(): IntegrationsSettings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

export function useIntegrationsSettings() {
  const [settings, setSettings] = useState<IntegrationsSettings>(() => load());

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  const update = (patch: Partial<IntegrationsSettings>) =>
    setSettings((prev) => ({ ...prev, ...patch }));

  const addTestimonial = (t: Omit<Testimonial, "id">) =>
    setSettings((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { ...t, id: crypto.randomUUID() }],
    }));

  const removeTestimonial = (id: string) =>
    setSettings((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));

  return { settings, update, addTestimonial, removeTestimonial };
}

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Testimonial {
  id: string;
  post_slug: string | null;
  nome: string;
  bairro: string;
  cidade_slug: string | null;
  estrelas: number;
  texto: string;
  posicao: number;
  created_at: string;
}

export interface NewTestimonial {
  post_slug?: string | null;
  nome: string;
  bairro: string;
  cidade_slug?: string | null;
  estrelas: number;
  texto: string;
}

export function useBlogTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("blog_testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setItems(data as Testimonial[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(async (t: NewTestimonial) => {
    const { data, error } = await supabase
      .from("blog_testimonials")
      .insert({
        post_slug: t.post_slug ?? null,
        nome: t.nome,
        bairro: t.bairro,
        cidade_slug: t.cidade_slug ?? null,
        estrelas: t.estrelas,
        texto: t.texto,
      })
      .select("*")
      .single();
    if (error) throw error;
    setItems((s) => [data as Testimonial, ...s]);
  }, []);

  const remove = useCallback(async (id: string) => {
    await supabase.from("blog_testimonials").delete().eq("id", id);
    setItems((s) => s.filter((x) => x.id !== id));
  }, []);

  const update = useCallback(
    async (id: string, patch: Partial<NewTestimonial>) => {
      const { data, error } = await supabase
        .from("blog_testimonials")
        .update(patch)
        .eq("id", id)
        .select("*")
        .single();
      if (error) throw error;
      setItems((s) => s.map((x) => (x.id === id ? (data as Testimonial) : x)));
    },
    [],
  );

  return { items, loading, add, remove, update, refresh };
}

// Público: depoimentos de um post (inclui globais com post_slug = null)
export function usePublicTestimonials(postSlug: string) {
  const [items, setItems] = useState<Testimonial[]>([]);
  useEffect(() => {
    let alive = true;
    supabase
      .from("blog_testimonials")
      .select("*")
      .or(`post_slug.eq.${postSlug},post_slug.is.null`)
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (alive && data) setItems(data as Testimonial[]);
      });
    return () => {
      alive = false;
    };
  }, [postSlug]);
  return items;
}

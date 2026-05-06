import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { compressImage, slugifyName } from "@/lib/imageCompress";

export interface BlogMedia {
  id: string;
  path: string;
  url: string;
  kind: "antes" | "depois";
  alt: string;
  titulo: string;
  servico_slug: string | null;
  cidade_slug: string | null;
  bairro_slug: string | null;
  width: number | null;
  height: number | null;
  size_bytes: number | null;
  created_at: string;
}

export interface BlogPair {
  id: string;
  post_slug: string;
  posicao: number;
  antes_id: string;
  depois_id: string;
  legenda: string;
  antes?: BlogMedia;
  depois?: BlogMedia;
}

export interface UploadInput {
  file: File;
  kind: "antes" | "depois";
  alt: string;
  titulo: string;
  servicoSlug?: string;
  cidadeSlug?: string;
  bairroSlug?: string;
}

export function useBlogMedia() {
  const [media, setMedia] = useState<BlogMedia[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_media")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setMedia(data as BlogMedia[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const upload = useCallback(async (input: UploadInput): Promise<BlogMedia> => {
    const compressed = await compressImage(input.file, { maxWidth: 1600, quality: 0.82 });
    const parts = [
      input.servicoSlug,
      input.bairroSlug,
      input.cidadeSlug,
      input.kind,
      Date.now().toString(36),
    ].filter(Boolean) as string[];
    const baseName = slugifyName(parts.join("-")) || `img-${Date.now()}`;
    const path = `${input.kind}/${baseName}.${compressed.ext}`;

    const { error: upErr } = await supabase.storage
      .from("blog-media")
      .upload(path, compressed.blob, { contentType: `image/${compressed.ext}`, upsert: false });
    if (upErr) throw upErr;

    const { data: pub } = supabase.storage.from("blog-media").getPublicUrl(path);
    const url = pub.publicUrl;

    const { data: row, error: insErr } = await supabase
      .from("blog_media")
      .insert({
        path,
        url,
        kind: input.kind,
        alt: input.alt,
        titulo: input.titulo,
        servico_slug: input.servicoSlug ?? null,
        cidade_slug: input.cidadeSlug ?? null,
        bairro_slug: input.bairroSlug ?? null,
        width: compressed.width,
        height: compressed.height,
        size_bytes: compressed.size,
      })
      .select("*")
      .single();
    if (insErr) throw insErr;

    setMedia((m) => [row as BlogMedia, ...m]);
    return row as BlogMedia;
  }, []);

  const remove = useCallback(async (item: BlogMedia) => {
    await supabase.storage.from("blog-media").remove([item.path]);
    await supabase.from("blog_media").delete().eq("id", item.id);
    setMedia((m) => m.filter((x) => x.id !== item.id));
  }, []);

  const update = useCallback(async (id: string, patch: Partial<Pick<BlogMedia, "alt" | "titulo">>) => {
    const { data, error } = await supabase.from("blog_media").update(patch).eq("id", id).select("*").single();
    if (error) throw error;
    setMedia((m) => m.map((x) => (x.id === id ? (data as BlogMedia) : x)));
  }, []);

  return { media, loading, upload, remove, update, refresh };
}

export function useBlogPairs(postSlug?: string) {
  const [pairs, setPairs] = useState<BlogPair[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!postSlug) {
      setPairs([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_post_pairs")
      .select("*, antes:antes_id(*), depois:depois_id(*)")
      .eq("post_slug", postSlug)
      .order("posicao", { ascending: true });
    if (!error && data) setPairs(data as unknown as BlogPair[]);
    setLoading(false);
  }, [postSlug]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addPair = useCallback(
    async (input: { antesId: string; depoisId: string; legenda: string }) => {
      if (!postSlug) return;
      const posicao = pairs.length;
      const { error } = await supabase.from("blog_post_pairs").insert({
        post_slug: postSlug,
        posicao,
        antes_id: input.antesId,
        depois_id: input.depoisId,
        legenda: input.legenda,
      });
      if (error) throw error;
      await refresh();
    },
    [postSlug, pairs.length, refresh],
  );

  const removePair = useCallback(
    async (id: string) => {
      await supabase.from("blog_post_pairs").delete().eq("id", id);
      await refresh();
    },
    [refresh],
  );

  return { pairs, loading, addPair, removePair, refresh };
}

// Hook público (sem auth) para o blog: busca pares prontos para um post
export function usePublicPairs(postSlug: string) {
  const [pairs, setPairs] = useState<BlogPair[]>([]);
  useEffect(() => {
    let alive = true;
    supabase
      .from("blog_post_pairs")
      .select("*, antes:antes_id(*), depois:depois_id(*)")
      .eq("post_slug", postSlug)
      .order("posicao", { ascending: true })
      .then(({ data }) => {
        if (alive && data) setPairs(data as unknown as BlogPair[]);
      });
    return () => {
      alive = false;
    };
  }, [postSlug]);
  return pairs;
}

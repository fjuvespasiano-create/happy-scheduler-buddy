
-- Bucket público
insert into storage.buckets (id, name, public)
values ('blog-media', 'blog-media', true)
on conflict (id) do nothing;

-- Tabela de mídia (biblioteca reutilizável)
create table if not exists public.blog_media (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  url text not null,
  kind text not null check (kind in ('antes','depois')),
  alt text not null default '',
  titulo text not null default '',
  servico_slug text,
  cidade_slug text,
  bairro_slug text,
  width int,
  height int,
  size_bytes int,
  created_at timestamptz not null default now(),
  created_by uuid
);
create index if not exists blog_media_kind_idx on public.blog_media(kind);
create index if not exists blog_media_local_idx on public.blog_media(servico_slug, cidade_slug, bairro_slug);

alter table public.blog_media enable row level security;

create policy "media public read" on public.blog_media for select using (true);
create policy "media admin insert" on public.blog_media for insert to authenticated with check (has_role(auth.uid(), 'admin'::app_role));
create policy "media admin update" on public.blog_media for update to authenticated using (has_role(auth.uid(), 'admin'::app_role));
create policy "media admin delete" on public.blog_media for delete to authenticated using (has_role(auth.uid(), 'admin'::app_role));

-- Pares antes/depois por post
create table if not exists public.blog_post_pairs (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  posicao int not null default 0,
  antes_id uuid not null references public.blog_media(id) on delete restrict,
  depois_id uuid not null references public.blog_media(id) on delete restrict,
  legenda text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists pairs_post_idx on public.blog_post_pairs(post_slug, posicao);

alter table public.blog_post_pairs enable row level security;
create policy "pairs public read" on public.blog_post_pairs for select using (true);
create policy "pairs admin insert" on public.blog_post_pairs for insert to authenticated with check (has_role(auth.uid(), 'admin'::app_role));
create policy "pairs admin update" on public.blog_post_pairs for update to authenticated using (has_role(auth.uid(), 'admin'::app_role));
create policy "pairs admin delete" on public.blog_post_pairs for delete to authenticated using (has_role(auth.uid(), 'admin'::app_role));

-- Storage policies
create policy "blog-media public read" on storage.objects for select using (bucket_id = 'blog-media');
create policy "blog-media admin write" on storage.objects for insert to authenticated with check (bucket_id = 'blog-media' and has_role(auth.uid(), 'admin'::app_role));
create policy "blog-media admin update" on storage.objects for update to authenticated using (bucket_id = 'blog-media' and has_role(auth.uid(), 'admin'::app_role));
create policy "blog-media admin delete" on storage.objects for delete to authenticated using (bucket_id = 'blog-media' and has_role(auth.uid(), 'admin'::app_role));

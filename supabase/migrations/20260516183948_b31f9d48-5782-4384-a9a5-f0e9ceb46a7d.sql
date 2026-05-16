
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  telefone text not null,
  servico text not null,
  cidade text,
  mensagem text,
  origem text default 'landing',
  status text not null default 'novo',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "Anyone can insert leads"
  on public.leads for insert
  to anon, authenticated
  with check (true);

create policy "Admins read leads"
  on public.leads for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins update leads"
  on public.leads for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

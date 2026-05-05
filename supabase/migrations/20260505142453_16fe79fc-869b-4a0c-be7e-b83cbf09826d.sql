
create table public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.push_subscriptions enable row level security;

create policy "Users manage own subscriptions"
on public.push_subscriptions for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Anonymous can insert subscriptions"
on public.push_subscriptions for insert
to anon
with check (user_id is null);

create index push_subscriptions_user_id_idx on public.push_subscriptions(user_id);

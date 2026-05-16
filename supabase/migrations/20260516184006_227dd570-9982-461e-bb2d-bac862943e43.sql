
drop policy if exists "Anyone can insert leads" on public.leads;

create policy "Public can submit leads"
  on public.leads for insert
  to anon, authenticated
  with check (
    length(trim(nome)) between 2 and 120
    and length(trim(telefone)) between 8 and 30
    and length(trim(servico)) between 2 and 80
    and (mensagem is null or length(mensagem) <= 1000)
  );

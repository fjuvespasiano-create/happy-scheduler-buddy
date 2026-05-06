
drop policy if exists "blog-media public read" on storage.objects;
create policy "blog-media admin list" on storage.objects for select to authenticated using (bucket_id = 'blog-media' and has_role(auth.uid(), 'admin'::app_role));

CREATE TABLE public.blog_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_slug text,
  nome text NOT NULL,
  bairro text NOT NULL DEFAULT '',
  cidade_slug text,
  estrelas integer NOT NULL DEFAULT 5,
  texto text NOT NULL,
  posicao integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid,
  CONSTRAINT estrelas_range CHECK (estrelas BETWEEN 1 AND 5)
);

CREATE INDEX idx_blog_testimonials_post ON public.blog_testimonials(post_slug);

ALTER TABLE public.blog_testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "testimonials public read" ON public.blog_testimonials
  FOR SELECT TO public USING (true);

CREATE POLICY "testimonials admin insert" ON public.blog_testimonials
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "testimonials admin update" ON public.blog_testimonials
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "testimonials admin delete" ON public.blog_testimonials
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
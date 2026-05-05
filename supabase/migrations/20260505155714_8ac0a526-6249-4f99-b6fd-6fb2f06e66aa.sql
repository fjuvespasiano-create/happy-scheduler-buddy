
INSERT INTO storage.buckets (id, name, public) 
VALUES ('orcamento-fotos', 'orcamento-fotos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Fotos de orcamento publicamente visiveis"
ON storage.objects FOR SELECT
USING (bucket_id = 'orcamento-fotos');

CREATE POLICY "Qualquer um pode enviar foto de orcamento"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'orcamento-fotos');

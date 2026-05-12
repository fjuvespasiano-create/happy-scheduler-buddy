
-- 1) Remove broad public SELECT policy that allows listing the bucket
DROP POLICY IF EXISTS "Fotos de orcamento publicamente visiveis" ON storage.objects;

-- 2) Replace permissive INSERT policy with a tighter version
DROP POLICY IF EXISTS "Qualquer um pode enviar foto de orcamento" ON storage.objects;

CREATE POLICY "orcamento-fotos restricted upload"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'orcamento-fotos'
  AND lower(name) ~ '^[0-9a-f-]{36}\.(jpg|jpeg|png|webp|heic)$'
  AND coalesce((metadata->>'size')::bigint, 0) <= 8388608
  AND (metadata->>'mimetype') IN ('image/jpeg','image/png','image/webp','image/heic','image/heif')
);

-- 3) Bucket-level constraints (defense in depth)
UPDATE storage.buckets
SET file_size_limit = 8388608,
    allowed_mime_types = ARRAY['image/jpeg','image/png','image/webp','image/heic','image/heif']
WHERE id = 'orcamento-fotos';

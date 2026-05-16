CREATE TABLE public.app_secrets (
  key text PRIMARY KEY,
  value text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.app_secrets ENABLE ROW LEVEL SECURITY;
-- No policies on purpose: only service role (supabaseAdmin) can read/write.

CREATE TRIGGER update_app_secrets_updated_at
BEFORE UPDATE ON public.app_secrets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
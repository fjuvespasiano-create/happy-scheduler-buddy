import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const leadSchema = z.object({
  nome: z.string().trim().min(2).max(120),
  telefone: z.string().trim().min(8).max(30).regex(/^[0-9+()\-\s]+$/),
  servico: z.string().trim().min(2).max(80),
  cidade: z.string().trim().max(120).optional().nullable(),
  mensagem: z.string().trim().max(1000).optional().nullable(),
  origem: z.string().trim().max(40).optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("leads").insert({
      nome: data.nome,
      telefone: data.telefone,
      servico: data.servico,
      cidade: data.cidade ?? null,
      mensagem: data.mensagem ?? null,
      origem: data.origem ?? "landing",
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

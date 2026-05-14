import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import {
  saveSubscriptionRow,
  deleteSubscriptionByEndpoint,
  sendPushToAll,
  type PushPayload,
} from "./push.server";

const SubscriptionSchema = z.object({
  endpoint: z.string().url().max(2048),
  p256dh: z.string().min(1).max(512),
  auth: z.string().min(1).max(256),
  user_agent: z.string().max(512).optional().nullable(),
});

export const saveSubscription = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SubscriptionSchema.parse(input))
  .handler(async ({ data }) => {
    // Anonymous save path — never trust client-supplied user_id.
    // Authenticated users should call saveMySubscription instead.
    await saveSubscriptionRow({ ...data, user_id: null });
    return { ok: true };
  });

/**
 * Authenticated save — derives user_id server-side from the verified session.
 */
export const saveMySubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SubscriptionSchema.parse(input))
  .handler(async ({ data, context }) => {
    await saveSubscriptionRow({ ...data, user_id: context.userId });
    return { ok: true };
  });

/**
 * Remove subscription. Authenticated callers can only remove their own;
 * anonymous callers may only remove subscriptions with user_id IS NULL.
 */
export const removeSubscription = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ endpoint: z.string().url().max(2048) }).parse(input),
  )
  .handler(async ({ data }) => {
    // Look up the subscription first to verify ownership
    const { data: sub, error } = await supabaseAdmin
      .from("push_subscriptions")
      .select("user_id")
      .eq("endpoint", data.endpoint)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!sub) return { ok: true }; // already gone, no-op

    // If subscription is owned by a user, only that user (via auth) may delete it.
    if (sub.user_id) {
      throw new Response("Unauthorized", { status: 401 });
    }

    // Anonymous subscription — allow deletion (typically called by the same browser on unsubscribe)
    await deleteSubscriptionByEndpoint(data.endpoint);
    return { ok: true };
  });

/**
 * Authenticated variant: lets a logged-in user delete their own subscription.
 */
export const removeMySubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ endpoint: z.string().url().max(2048) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await supabaseAdmin
      .from("push_subscriptions")
      .delete()
      .eq("endpoint", data.endpoint)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const PayloadSchema = z.object({
  title: z.string().min(1).max(120),
  body: z.string().min(1).max(500),
  url: z.string().max(2048).optional(),
  icon: z.string().max(2048).optional(),
  tag: z.string().max(120).optional(),
});

/**
 * Broadcast — admin only.
 */
export const broadcastNotification = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => PayloadSchema.parse(input))
  .handler(async ({ data, context }) => {
    // Verify admin role server-side
    const { data: roleRow, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (roleError) throw new Error(roleError.message);
    if (!roleRow) {
      throw new Response("Forbidden: admin role required", { status: 403 });
    }

    const result = await sendPushToAll(data as PushPayload);
    return result;
  });

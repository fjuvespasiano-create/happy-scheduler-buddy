import webpush from "web-push";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// VAPID keys MUST come from env. No hardcoded fallback for the private key.
let vapidConfigured = false;
function ensureVapid() {
  if (vapidConfigured) return;
  const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY;
  const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
  const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "mailto:contato@cleanpro.app";
  if (!VAPID_PUBLIC || !VAPID_PRIVATE) {
    throw new Error(
      "VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY must be configured as server secrets.",
    );
  }
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);
  vapidConfigured = true;
}

export type PushPayload = {
  title: string;
  body: string;
  url?: string;
  icon?: string;
  tag?: string;
};

export async function saveSubscriptionRow(input: {
  endpoint: string;
  p256dh: string;
  auth: string;
  user_agent?: string | null;
  user_id?: string | null;
}) {
  const { error } = await supabaseAdmin
    .from("push_subscriptions")
    .upsert(
      {
        endpoint: input.endpoint,
        p256dh: input.p256dh,
        auth: input.auth,
        user_agent: input.user_agent ?? null,
        user_id: input.user_id ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "endpoint" },
    );
  if (error) throw new Error(error.message);
}

export async function deleteSubscriptionByEndpoint(endpoint: string) {
  await supabaseAdmin.from("push_subscriptions").delete().eq("endpoint", endpoint);
}

export async function sendPushToAll(payload: PushPayload) {
  ensureVapid();
  const { data, error } = await supabaseAdmin
    .from("push_subscriptions")
    .select("endpoint,p256dh,auth");
  if (error) throw new Error(error.message);

  const subs = data ?? [];
  const body = JSON.stringify(payload);
  let sent = 0;
  let removed = 0;

  await Promise.all(
    subs.map(async (s) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: s.endpoint,
            keys: { p256dh: s.p256dh, auth: s.auth },
          },
          body,
        );
        sent++;
      } catch (err: any) {
        const status = err?.statusCode;
        if (status === 404 || status === 410) {
          await deleteSubscriptionByEndpoint(s.endpoint);
          removed++;
        } else {
          console.warn("[push] send failed", status, err?.body);
        }
      }
    }),
  );

  return { total: subs.length, sent, removed };
}

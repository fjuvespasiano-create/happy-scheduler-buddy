import webpush from "web-push";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const VAPID_PUBLIC =
  "BErvgUs0I_ao6Zy_G3fbeepeuJwLhwkRdBGQOGFFpmBNUn7lsyvHQHmnRsMhHm0dxdIcdYAf-gUJ1t0FNwyRjTo";
const VAPID_PRIVATE = "HWu_K5GlDfrXLNbo_9fOamjzW_yIanZQu3SpbgYLsf0";
const VAPID_SUBJECT = "mailto:contato@cleanpro.app";

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);

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

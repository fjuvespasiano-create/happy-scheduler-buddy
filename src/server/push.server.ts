import webpush from "web-push";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// VAPID keys are auto-generated on first use and stored in `app_secrets`.
// No env vars, no hardcoded secrets, no manual setup needed.
type VapidPair = { publicKey: string; privateKey: string; subject: string };
let vapidCache: VapidPair | null = null;

async function loadVapidFromDb(): Promise<Partial<VapidPair>> {
  const { data, error } = await supabaseAdmin
    .from("app_secrets")
    .select("key,value")
    .in("key", ["vapid_public", "vapid_private", "vapid_subject"]);
  if (error) throw new Error(error.message);
  const map = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
  return {
    publicKey: map.vapid_public,
    privateKey: map.vapid_private,
    subject: map.vapid_subject,
  };
}

async function persistVapid(pair: VapidPair): Promise<void> {
  const rows = [
    { key: "vapid_public", value: pair.publicKey },
    { key: "vapid_private", value: pair.privateKey },
    { key: "vapid_subject", value: pair.subject },
  ];
  const { error } = await supabaseAdmin
    .from("app_secrets")
    .upsert(rows, { onConflict: "key" });
  if (error) throw new Error(error.message);
}

async function ensureVapid(): Promise<VapidPair> {
  if (vapidCache) {
    webpush.setVapidDetails(vapidCache.subject, vapidCache.publicKey, vapidCache.privateKey);
    return vapidCache;
  }
  const existing = await loadVapidFromDb();
  let pair: VapidPair;
  if (existing.publicKey && existing.privateKey) {
    pair = {
      publicKey: existing.publicKey,
      privateKey: existing.privateKey,
      subject: existing.subject || "mailto:contato@autolimpezapro.app",
    };
  } else {
    const generated = webpush.generateVAPIDKeys();
    pair = {
      publicKey: generated.publicKey,
      privateKey: generated.privateKey,
      subject: existing.subject || "mailto:contato@autolimpezapro.app",
    };
    await persistVapid(pair);
  }
  webpush.setVapidDetails(pair.subject, pair.publicKey, pair.privateKey);
  vapidCache = pair;
  return pair;
}

export async function getVapidPublic(): Promise<string> {
  const pair = await ensureVapid();
  return pair.publicKey;
}

export async function rotateVapidKeys(): Promise<string> {
  const generated = webpush.generateVAPIDKeys();
  const pair: VapidPair = {
    publicKey: generated.publicKey,
    privateKey: generated.privateKey,
    subject: vapidCache?.subject || "mailto:contato@autolimpezapro.app",
  };
  await persistVapid(pair);
  // Old subscriptions are now invalid; wipe so we don't try to send with mismatched keys.
  await supabaseAdmin.from("push_subscriptions").delete().neq("endpoint", "");
  webpush.setVapidDetails(pair.subject, pair.publicKey, pair.privateKey);
  vapidCache = pair;
  return pair.publicKey;
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
  await ensureVapid();
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
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
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

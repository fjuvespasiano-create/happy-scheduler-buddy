import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
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
  user_id: z.string().uuid().optional().nullable(),
});

export const saveSubscription = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SubscriptionSchema.parse(input))
  .handler(async ({ data }) => {
    await saveSubscriptionRow(data);
    return { ok: true };
  });

export const removeSubscription = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ endpoint: z.string().url().max(2048) }).parse(input),
  )
  .handler(async ({ data }) => {
    await deleteSubscriptionByEndpoint(data.endpoint);
    return { ok: true };
  });

const PayloadSchema = z.object({
  title: z.string().min(1).max(120),
  body: z.string().min(1).max(500),
  url: z.string().max(2048).optional(),
  icon: z.string().max(2048).optional(),
  tag: z.string().max(120).optional(),
});

export const broadcastNotification = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => PayloadSchema.parse(input))
  .handler(async ({ data }) => {
    const result = await sendPushToAll(data as PushPayload);
    return result;
  });

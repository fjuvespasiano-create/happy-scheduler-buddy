/**
 * Registro do service worker e helpers de notificação push.
 *
 * Importante: o SW NUNCA registra dentro de iframes ou hosts de preview do
 * Lovable (evita cache poluído na edição). Em produção (build publicado) o SW
 * é registrado normalmente via /sw.js.
 */

const isInIframe = (() => {
  if (typeof window === "undefined") return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();

const isPreviewHost =
  typeof window !== "undefined" &&
  (window.location.hostname.includes("id-preview--") ||
    window.location.hostname.includes("lovableproject.com"));

export function shouldRegisterPWA(): boolean {
  if (typeof window === "undefined") return false;
  if (!("serviceWorker" in navigator)) return false;
  if (isInIframe) return false;
  if (isPreviewHost) return false;
  return true;
}

export async function registerPWA(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return null;

  // Em preview/iframe: limpa qualquer SW antigo e sai
  if (!shouldRegisterPWA()) {
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
    } catch {}
    return null;
  }

  try {
    const reg = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
    // Atualiza em background
    reg.update().catch(() => {});
    return reg;
  } catch (err) {
    console.warn("[PWA] register failed", err);
    return null;
  }
}

// =============== Notificações ===============

export type NotificationPermissionState =
  | "default"
  | "granted"
  | "denied"
  | "unsupported";

export function getNotificationPermission(): NotificationPermissionState {
  if (typeof window === "undefined" || !("Notification" in window))
    return "unsupported";
  return Notification.permission as NotificationPermissionState;
}

export async function requestNotificationPermission(): Promise<NotificationPermissionState> {
  if (typeof window === "undefined" || !("Notification" in window))
    return "unsupported";
  if (Notification.permission === "granted") {
    await ensurePushSubscription().catch(() => {});
    return "granted";
  }
  if (Notification.permission === "denied") return "denied";
  const result = await Notification.requestPermission();
  if (result === "granted") {
    await ensurePushSubscription().catch(() => {});
  }
  return result as NotificationPermissionState;
}

export async function showNotification(
  title: string,
  options?: NotificationOptions,
) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  const opts: NotificationOptions = {
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    lang: "pt-BR",
    ...options,
  };

  if ("serviceWorker" in navigator) {
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg) {
      await reg.showNotification(title, opts);
      return;
    }
  }
  new Notification(title, opts);
}

// === Web Push subscription ===

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) out[i] = raw.charCodeAt(i);
  return out;
}

/**
 * Garante uma push subscription. Requer VITE_VAPID_PUBLIC_KEY para enviar
 * push do servidor; sem ela, apenas notificações locais funcionam.
 */
export async function ensurePushSubscription(): Promise<PushSubscription | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return null;
  if (!("PushManager" in window)) return null;

  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return null;

  const existing = await reg.pushManager.getSubscription();
  const { VAPID_PUBLIC_KEY } = await import("./vapid");
  const { saveSubscription } = await import("@/server/push.functions");

  const sub =
    existing ??
    (await reg.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY).buffer as ArrayBuffer,
      })
      .catch((err) => {
        console.warn("[PWA] push subscribe failed", err);
        return null;
      }));

  if (!sub) return null;

  try {
    const json = sub.toJSON();
    await saveSubscription({
      data: {
        endpoint: sub.endpoint,
        p256dh: json.keys?.p256dh ?? "",
        auth: json.keys?.auth ?? "",
        user_agent: navigator.userAgent.slice(0, 500),
      },
    });
  } catch (err) {
    console.warn("[PWA] save subscription failed", err);
  }
  return sub;
}

// Lembrete local agendado via setTimeout (válido enquanto a aba viver).
export function scheduleLocalReminder(
  title: string,
  body: string,
  whenMs: number,
) {
  const delay = whenMs - Date.now();
  if (delay <= 0) {
    void showNotification(title, { body });
    return;
  }
  const safeDelay = Math.min(delay, 24 * 60 * 60 * 1000);
  setTimeout(() => {
    void showNotification(title, { body });
  }, safeDelay);
}

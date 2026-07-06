/**
 * Minimal Calendly API v2 client (server-side).
 * Docs: https://developer.calendly.com/api-docs
 */
const API = "https://api.calendly.com";

function token() {
  return process.env.CALENDLY_API_TOKEN;
}

async function call(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch (e) {
    /* non-JSON */
  }
  if (!res.ok) {
    const err = new Error(`Calendly ${res.status}: ${text?.slice(0, 300)}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

/** Current user + organization. */
export async function getMe() {
  return call("/users/me");
}

/** Fetch a scheduled event by its URI. */
export async function getScheduledEvent(eventUri) {
  // eventUri is the full https://api.calendly.com/scheduled_events/<uuid>
  const path = eventUri.replace(API, "");
  return call(path);
}

/**
 * Create an organization webhook subscription.
 * Returns the created resource (includes the signing key once).
 */
export async function createWebhookSubscription({
  url,
  organization,
  user,
  events = ["invitee.created", "invitee.canceled"],
}) {
  return call("/webhook_subscriptions", {
    method: "POST",
    body: JSON.stringify({
      url,
      events,
      organization,
      scope: "organization",
      signing_key_used: true,
    }),
  });
}

/** List existing webhook subscriptions for an organization. */
export async function listWebhookSubscriptions(organization) {
  const q = new URLSearchParams({ organization, scope: "organization" });
  return call(`/webhook_subscriptions?${q.toString()}`);
}

export async function deleteWebhookSubscription(uri) {
  const path = uri.replace(API, "");
  return call(path, { method: "DELETE" });
}

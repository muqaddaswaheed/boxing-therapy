/**
 * Registers the Calendly webhook subscription so bookings sync into our DB.
 * Run AFTER the site is deployed to a public URL.
 *
 *   node --env-file=.env.local scripts/setup-calendly-webhook.mjs
 *
 * Requires in .env.local: CALENDLY_API_TOKEN, CALENDLY_ORG_URI, and PUBLIC_BASE_URL
 * (e.g. https://boxingtherapiepremium.ch). It prints the signing key — copy it
 * into CALENDLY_WEBHOOK_SIGNING_KEY and redeploy.
 */
const API = "https://api.calendly.com";
const token = process.env.CALENDLY_API_TOKEN;
const org = process.env.CALENDLY_ORG_URI;
const base = process.env.PUBLIC_BASE_URL;

if (!token || !org || !base) {
  console.error(
    "Missing env. Need CALENDLY_API_TOKEN, CALENDLY_ORG_URI, PUBLIC_BASE_URL."
  );
  process.exit(1);
}

const secret = process.env.CALENDLY_WEBHOOK_TOKEN;
const callbackUrl =
  `${base.replace(/\/$/, "")}/api/calendly/webhook` +
  (secret ? `?token=${secret}` : "");

async function api(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(`${res.status}: ${text}`);
  return json;
}

// Remove any existing subscription pointing at our callback (avoid duplicates).
const existing = await api(
  `/webhook_subscriptions?organization=${encodeURIComponent(org)}&scope=organization`
);
for (const w of existing?.collection || []) {
  if (w.callback_url === callbackUrl) {
    await api(w.uri.replace(API, ""), { method: "DELETE" });
    console.log("Removed existing subscription:", w.uri);
  }
}

const created = await api("/webhook_subscriptions", {
  method: "POST",
  body: JSON.stringify({
    url: callbackUrl,
    events: ["invitee.created", "invitee.canceled"],
    organization: org,
    scope: "organization",
    signing_key_used: true,
  }),
});

const res = created.resource;
console.log("\n✓ Webhook subscription created:");
console.log("  callback:", callbackUrl);
console.log("  uri:", res.uri);
console.log("\n>>> Add this to .env.local, then redeploy:");
console.log(`CALENDLY_WEBHOOK_SIGNING_KEY="${res.signing_key || ""}"`);

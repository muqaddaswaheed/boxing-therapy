/**
 * Session types and pack definitions — single source of truth shared by the
 * booking form, the API and the admin panel.
 */

// Group session rates (from the Tarifs page)
export const SESSION_TYPES = {
  solo: { key: "solo", participants: 1, priceCHF: 120, label: "Solo" },
  duo: { key: "duo", participants: 2, priceCHF: 200, label: "Duo" },
  trio: { key: "trio", participants: 3, priceCHF: 280, label: "Trio" },
  group: { key: "group", participants: 4, priceCHF: 340, label: "Groupe" },
};

export const SESSION_TYPE_KEYS = Object.keys(SESSION_TYPES);

export function participantsFor(sessionType) {
  return SESSION_TYPES[sessionType]?.participants || 1;
}

// Packs (Promotion page) — each pack is for ONE person only.
export const PACKS = {
  pack5: { key: "pack5", sessions: 5, priceCHF: 500, label: "Pack 5 cours" },
  pack10: { key: "pack10", sessions: 10, priceCHF: 950, label: "Pack 10 cours" },
};

export const PAYMENT_METHODS = ["transfer", "cash", "code"];

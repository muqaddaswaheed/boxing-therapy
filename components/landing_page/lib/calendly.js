/**
 * Calendly booking links — one per language.
 *
 * ⚠️ PLACEHOLDERS — replace each value with the client's real Calendly link.
 * To send the custom confirmation email in the user's chosen language, the
 * client creates one Calendly EVENT TYPE per language (each with its own
 * Workflow email in that language) and pastes the matching links below.
 *
 * If there's only ONE event for now, point all three at the same link — the
 * `locale` param (added automatically) still shows Calendly's own UI/system
 * emails in the selected language.
 */
export const CALENDLY_LINKS = {
  fr: "https://calendly.com/idreesdev538/30min",
  en: "https://calendly.com/idreesdev538/30min",
  de: "https://calendly.com/idreesdev538/30min",
};

// Dark-theme colors for the embed (brand: black + gold).
export const CALENDLY_THEME = {
  hide_gdpr_banner: "1",
  background_color: "0a0a0a",
  text_color: "f4f4f5",
  primary_color: "d4af37",
};

/** Plain booking link for the given language (used for the fallback anchor). */
export function getCalendlyLink(lang = "fr") {
  return CALENDLY_LINKS[lang] || CALENDLY_LINKS.fr;
}

/** Full embed URL: language link + theme params + locale for the widget. */
export function getCalendlyUrl(lang = "fr") {
  const params = new URLSearchParams({ ...CALENDLY_THEME, locale: lang });
  return `${getCalendlyLink(lang)}?${params.toString()}`;
}

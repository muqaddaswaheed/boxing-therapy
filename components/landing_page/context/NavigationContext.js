"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { TRANSLATIONS } from "../i18n/translations";
import { localeOf } from "../lib/calendar";

/**
 * Tab navigation + language. Mirrors the original show()/choosePack()/setLang()
 * helpers and adds a functional FR/EN/DE i18n layer.
 */
const NavigationContext = createContext(null);

export const PAGES = [
  "home",
  "about",
  "coach",
  "agenda",
  "promo",
  "pay",
  "contact",
  "reglement",
];

const LANG_KEY = "bt_lang";
const DEFAULT_LANG = "fr";

/** Pick the best supported language from the browser's preferences. */
function detectBrowserLang() {
  if (typeof navigator === "undefined") return DEFAULT_LANG;
  const prefs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language || ""];
  for (const pref of prefs) {
    const code = pref.toLowerCase().split("-")[0]; // "en-US" -> "en"
    if (TRANSLATIONS[code]) return code;
  }
  return DEFAULT_LANG;
}

export function NavigationProvider({ children }) {
  const [activePage, setActivePage] = useState("home");
  const [lang, setLangState] = useState("fr");
  const [payInfo, setPayInfo] = useState({ pack: "—", amount: "—" });
  // Desired session type to pre-select in the booking form (solo/duo/trio/group).
  const [bookingSession, setBookingSession] = useState("solo");
  // Whether the booking was started from a Pack 5/10 (enables the pack-code option).
  const [bookingFromPack, setBookingFromPack] = useState(false);
  // Which pack was chosen ("pack5" | "pack10" | "").
  const [bookingPack, setBookingPack] = useState("");

  // On mount: a previously saved choice wins; otherwise auto-detect from
  // the browser's preferred languages (falling back to French).
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(LANG_KEY);
    } catch (e) {
      /* ignore */
    }
    if (saved && TRANSLATIONS[saved]) setLangState(saved);
    else setLangState(detectBrowserLang());
  }, []);

  // Keep <html lang> in sync for accessibility / SEO.
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l) => {
    if (!TRANSLATIONS[l]) return;
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch (e) {
      /* ignore */
    }
  }, []);

  const navigate = useCallback((id) => {
    setActivePage(id);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const choosePack = useCallback(
    (pack, amount) => {
      setPayInfo({ pack, amount });
      navigate("pay");
    },
    [navigate]
  );

  // Open the booking form (Agenda) pre-set to a given session type.
  // fromPack = true only when coming from Pack 5/10 (allows the pack-code option).
  const bookSession = useCallback(
    (sessionType = "solo", fromPack = false, pack = "") => {
      setBookingSession(sessionType);
      setBookingFromPack(!!fromPack);
      setBookingPack(pack);
      navigate("agenda");
    },
    [navigate]
  );

  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;

  const value = {
    activePage,
    navigate,
    lang,
    setLang,
    locale: localeOf(lang),
    t,
    payInfo,
    choosePack,
    bookingSession,
    bookingFromPack,
    bookingPack,
    bookSession,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return ctx;
}

"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

/**
 * Tab-based navigation for the single-page site. Mirrors the original
 * `show(id)` / `choosePack(name, amount)` / `setLang(l)` helpers.
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

export function NavigationProvider({ children }) {
  const [activePage, setActivePage] = useState("home");
  const [lang, setLang] = useState("fr");
  const [payInfo, setPayInfo] = useState({ pack: "—", amount: "—" });

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

  const value = {
    activePage,
    navigate,
    lang,
    setLang,
    payInfo,
    choosePack,
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

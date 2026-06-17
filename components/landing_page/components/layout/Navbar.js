"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import BrandLogo from "../../ui/BrandLogo";
import { useNavigation } from "../../context/NavigationContext";

const NAV_LINKS = [
  { id: "about", label: "À propos" },
  { id: "coach", label: "Coach" },
  { id: "promo", label: "Promotion" },
  { id: "contact", label: "Contact" },
  { id: "agenda", label: "Agenda" },
  { id: "reglement", label: "Règlement" },
];

const LANGS = ["fr", "en", "de"];

// Scroll distance (px) over which the header fully collapses. Larger = slower.
const RANGE = 260;
const COMPACT_H = 66;

// Logo geometry
const LOGO_H = 140; // base rendered height (px)
const LOGO_W = (LOGO_H * 599) / 419; // keep source aspect ratio
const LOGO_END_H = 46; // height once docked top-left
const LOGO_END_SCALE = LOGO_END_H / LOGO_H;

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const lerp = (a, b, t) => a + (b - a) * t;

const Navbar = () => {
  const { activePage, navigate, lang, setLang } = useNavigation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // 0 = expanded (top), 1 = collapsed (docked top-left)
  const [p, setP] = useState(0);
  const [dims, setDims] = useState({ w: 1280, desktop: true });

  useEffect(() => {
    const measure = () =>
      setDims({ w: window.innerWidth, desktop: window.innerWidth >= 1024 });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setP(clamp(window.scrollY / RANGE, 0, 1));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (id) => {
    navigate(id);
    setMobileOpen(false);
  };

  // ---- continuous geometry from scroll progress ----
  const H_EXP = dims.desktop ? 286 : 212;
  const padX = dims.desktop ? 28 : 16;

  const containerH = lerp(H_EXP, COMPACT_H, p);

  // Logo moves a touch faster than the bar collapses so it clears the centre
  // (where the nav settles) before the nav rises into place.
  const lp = 1 - (1 - p) * (1 - p); // easeOut
  const centerX = (dims.w - LOGO_W) / 2;
  const logoX = lerp(centerX, padX, lp);
  const logoY = lerp(30, (COMPACT_H - LOGO_END_H) / 2, lp);
  const logoScale = lerp(1, LOGO_END_SCALE, lp);

  const cornerTop = lerp(8, 22, p); // lang / hamburger vertical drift

  const LangSwitch = ({ size = 13 }) => (
    <div className="flex items-center gap-[10px]">
      {LANGS.map((l, i) => (
        <React.Fragment key={l}>
          {i > 0 && <span className="h-[13px] w-px bg-bord" />}
          <button
            onClick={() => setLang(l)}
            style={{ fontSize: size }}
            className={`cursor-pointer px-[5px] py-1 font-bold uppercase tracking-[0.12em] transition-colors duration-200 ${
              lang === l ? "text-gold" : "text-gris hover:text-white"
            }`}
          >
            {l}
          </button>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${0.4 + 0.55 * p})`,
        backdropFilter: `blur(${12 * p}px)`,
        WebkitBackdropFilter: `blur(${12 * p}px)`,
        borderBottom: `1px solid rgba(58, 47, 18, ${p})`,
        boxShadow: `0 8px 30px -12px rgba(0,0,0,${0.9 * p})`,
      }}
    >
      <div className="relative overflow-hidden" style={{ height: containerH }}>
        {/* Single logo — shrinks + travels from centre to top-left, then locks */}
        <button
          onClick={() => go("home")}
          aria-label="Accueil"
          className="absolute left-0 top-0 cursor-pointer"
          style={{
            transform: `translate(${logoX}px, ${logoY}px) scale(${logoScale})`,
            transformOrigin: "top left",
          }}
        >
          <BrandLogo size={LOGO_H} priority />
        </button>

        {/* Desktop nav — centred, anchored to the bottom so it rises with the bar */}
        <nav
          className="absolute hidden items-center gap-1 lg:flex"
          style={{ left: "50%", transform: "translateX(-50%)", bottom: 11 }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className={`relative cursor-pointer px-[16px] py-2 text-[13px] font-bold uppercase tracking-[0.16em] transition-colors duration-200 ${
                activePage === link.id ? "text-gold" : "text-blanc hover:text-gold"
              }`}
            >
              {link.label}
              {activePage === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-[16px] -bottom-[2px] h-[2px] rounded-full bg-gold"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Language — top-right, drifts to vertical centre (desktop) */}
        <div
          className="absolute hidden lg:block"
          style={{ right: padX, top: cornerTop }}
        >
          <LangSwitch size={lerp(13, 12, p)} />
        </div>

        {/* Hamburger — top-right (mobile/tablet) */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          className="absolute flex items-center text-blanc lg:hidden"
          style={{ right: padX, top: cornerTop }}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-bord lg:hidden"
          >
            <div className="flex flex-col px-4 py-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  className={`py-[14px] text-left text-[14px] font-bold uppercase tracking-[0.18em] transition-colors ${
                    activePage === link.id ? "text-gold" : "text-blanc"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="border-t border-bord pt-4">
                <LangSwitch />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

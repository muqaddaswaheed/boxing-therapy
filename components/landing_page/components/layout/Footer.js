"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import BrandLogo from "../../ui/BrandLogo";
import { useNavigation } from "../../context/NavigationContext";

const FOOTER_LINKS = [
  { id: "about", label: "Le Premium" },
  { id: "coach", label: "Le Coach" },
  { id: "agenda", label: "Agenda" },
  { id: "promo", label: "Tarifs" },
  { id: "contact", label: "Contact" },
  { id: "reglement", label: "Règlement" },
];

const CONTACT_ITEMS = [
  { icon: MapPin, lines: ["Rue Saint-Pierre 6B", "1700 Fribourg, Suisse"] },
  { icon: Phone, lines: ["078 320 05 83"], href: "tel:+41783200583" },
  {
    icon: Mail,
    lines: ["boxingtherapiepremium@gmail.com"],
    href: "mailto:boxingtherapiepremium@gmail.com",
  },
];

const Footer = () => {
  const { navigate } = useNavigation();

  return (
    <footer className="border-t border-bord bg-black">
      {/* Gold accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-12 px-7 py-16 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div onClick={() => navigate("home")} className="mb-6 cursor-pointer">
            <BrandLogo size={120} />
          </div>
          <p className="max-w-[260px] text-[14px] leading-relaxed text-gris">
            La boxe, votre thérapie. Un accompagnement 100% individuel, à votre
            rythme et sans jugement.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="mb-5 text-[11px] font-black uppercase tracking-[0.2em] text-gris-fonce">
            Navigation
          </h4>
          <ul className="flex flex-col gap-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.id}>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => navigate(link.id)}
                  className="text-[14px] font-semibold text-blanc transition-colors hover:text-gold"
                >
                  {link.label}
                </motion.button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-5 text-[11px] font-black uppercase tracking-[0.2em] text-gris-fonce">
            Contact
          </h4>
          <ul className="flex flex-col gap-4">
            {CONTACT_ITEMS.map((item, i) => {
              const body = (
                <span className="flex flex-col text-[14px] leading-relaxed text-gris">
                  {item.lines.map((line) => (
                    <span key={line} className="break-words">
                      {line}
                    </span>
                  ))}
                </span>
              );
              return (
                <li key={i} className="flex items-start gap-3">
                  <item.icon className="mt-[2px] h-[18px] w-[18px] flex-none text-gold" />
                  {item.href ? (
                    <a href={item.href} className="transition-colors hover:text-white">
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-bord px-7 py-6">
        <p className="mx-auto max-w-[1080px] text-center text-[12px] text-gris-fonce">
          © {2026} Boxing Therapie Premium — Fribourg, Suisse. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

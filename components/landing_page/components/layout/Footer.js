"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import BrandLogo from "../../ui/BrandLogo";
import { useNavigation } from "../../context/NavigationContext";

const CONTACT_META = [
  {
    icon: MapPin,
    href: "https://www.google.com/maps/search/?api=1&query=Rue+Saint-Pierre+6B+1700+Fribourg",
    external: true,
  },
  { icon: Phone, href: "tel:+41783200583" },
  { icon: Mail, href: "mailto:boxingtherapiepremium@gmail.com" },
];

const Footer = () => {
  const { navigate, t } = useNavigation();
  const links = t.footer.links;
  const contactItems = CONTACT_META.map((meta, i) => ({
    ...meta,
    lines: t.footer.contactLines[i],
  }));

  return (
    <footer className="border-t border-bord bg-black">
      {/* Gold accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-12 px-7 py-16 text-center md:grid-cols-3 md:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <div onClick={() => navigate("home")} className="mb-6 cursor-pointer">
            <BrandLogo size={120} />
          </div>
          <p className="max-w-[260px] text-[14px] leading-relaxed text-gris">
            {t.footer.tagline}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="mb-5 text-[11px] font-black uppercase tracking-[0.2em] text-gris-fonce">
            {t.footer.navTitle}
          </h4>
          <ul className="flex flex-col items-center gap-3 md:items-start">
            {links.map((link) => (
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
            {t.footer.contactTitle}
          </h4>
          <ul className="flex flex-col items-center gap-4 md:items-start">
            {contactItems.map((item, i) => {
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
                <li
                  key={i}
                  className="flex items-start justify-center gap-3 md:justify-start"
                >
                  <item.icon className="mt-[2px] h-[18px] w-[18px] flex-none text-gold" />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="transition-colors hover:text-white"
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
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
          © {2026} Boxing Therapie Premium — {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

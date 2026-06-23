"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Plane, ArrowRight } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import { useNavigation } from "../context/NavigationContext";

const CARD_META = [
  { icon: MapPin },
  { icon: Phone, href: "tel:+41783200583" },
  { icon: Mail, href: "mailto:boxingtherapiepremium@gmail.com" },
  { icon: Plane, iconClass: "-rotate-45" },
];

const Contact = () => {
  const { navigate, t } = useNavigation();
  const tr = t.contact;
  const cards = CARD_META.map((meta, i) => ({ ...meta, ...tr.cards[i] }));

  return (
    <section id="contact" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[1080px]">
        <div className="text-center">
          <Eyebrow>{tr.eyebrow}</Eyebrow>
          <h2 className="font-display mt-[18px] text-[clamp(34px,6vw,58px)] font-extrabold leading-none text-white">
            {tr.titleA}
            <span className="text-gold">{tr.titleB}</span>
          </h2>
        </div>

        <div className="mt-[46px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
              className="rounded-[16px] border border-bord bg-carte px-[26px] py-[30px] transition-colors duration-200 hover:border-gold"
            >
              <div className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-[12px] bg-gold/[0.14]">
                <card.icon
                  className={`h-6 w-6 text-gold ${card.iconClass || ""}`}
                  strokeWidth={2}
                />
              </div>
              <h3 className="font-display mb-[10px] text-[18px] font-extrabold text-white">
                {card.title}
              </h3>
              {card.lead ? (
                <p className="text-[15px] leading-[1.65] text-gris">
                  <span className="font-bold text-white">{card.lead}</span>{" "}
                  {card.body}
                </p>
              ) : (
                <p className="text-[15px] leading-[1.65] text-gris">
                  {card.href ? (
                    <a
                      href={card.href}
                      className="break-all text-[12px] text-white no-underline transition-colors hover:text-gold lg:text-[11px]"
                    >
                      {card.lines.join(" ")}
                    </a>
                  ) : (
                    card.lines.map((line, i) => (
                      <React.Fragment key={line}>
                        {line}
                        {i < card.lines.length - 1 && <br />}
                      </React.Fragment>
                    ))
                  )}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="red" onClick={() => navigate("agenda")}>
            {tr.cta} <ArrowRight className="h-[18px] w-[18px]" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;

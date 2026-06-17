"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import { useNavigation } from "../context/NavigationContext";

const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: "Adresse",
    lines: ["Rue Saint-Pierre 6B", "1700 Fribourg", "Suisse"],
  },
  {
    icon: Phone,
    title: "Téléphone",
    lines: ["078 320 05 83"],
    href: "tel:+41783200583",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["boxingtherapiepremium@gmail.com"],
    href: "mailto:boxingtherapiepremium@gmail.com",
  },
];

const Contact = () => {
  const { navigate } = useNavigation();

  return (
    <section id="contact" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[1080px]">
        <div className="text-center">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="font-display mt-[18px] text-[clamp(34px,6vw,58px)] font-extrabold leading-none text-white">
            Nous <span className="text-gold">trouver</span>
          </h2>
        </div>

        <div className="mt-[46px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {CONTACT_CARDS.map((card, index) => (
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
                <card.icon className="h-6 w-6 text-gold" strokeWidth={2} />
              </div>
              <h3 className="font-display mb-[10px] text-[18px] font-extrabold text-white">
                {card.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-gris">
                {card.href ? (
                  <a
                    href={card.href}
                    className="break-all text-white no-underline transition-colors hover:text-gold"
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
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="red" onClick={() => navigate("agenda")}>
            Réserver une séance <ArrowRight className="h-[18px] w-[18px]" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;

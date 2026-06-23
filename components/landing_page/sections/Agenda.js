"use client";

import React from "react";
import { motion } from "framer-motion";
import Eyebrow from "../ui/Eyebrow";
import CalendlyEmbed from "../components/CalendlyEmbed";
import { useNavigation } from "../context/NavigationContext";

/**
 * Booking is handled by Calendly (Plan A). The coach manages availability and
 * blocked dates directly in Calendly, which also sends the confirmation email.
 * The booking link lives in ../lib/calendly.js (swap the placeholder there).
 */
const Agenda = () => {
  const { t, lang } = useNavigation();
  const tr = t.agenda;

  return (
    <section id="agenda" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[860px]">
        <div className="text-center">
          <Eyebrow>{tr.eyebrow}</Eyebrow>
          <h2 className="font-display mt-[18px] text-[clamp(34px,6vw,58px)] font-extrabold leading-none text-white">
            {tr.title}
          </h2>
          <p className="mx-auto mt-[22px] max-w-[520px] text-[18px] leading-[1.7] text-gris">
            {tr.subtitle}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 overflow-hidden rounded-[16px] border border-bord bg-carte p-2 md:p-3"
        >
          <CalendlyEmbed lang={lang} fallbackLabel={tr.openExternal} />
        </motion.div>
      </div>
    </section>
  );
};

export default Agenda;

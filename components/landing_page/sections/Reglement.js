"use client";

import React from "react";
import { motion } from "framer-motion";
import Eyebrow from "../ui/Eyebrow";
import RichText from "../ui/RichText";
import { useNavigation } from "../context/NavigationContext";

const Reglement = () => {
  const { t } = useNavigation();
  const tr = t.reglement;
  return (
    <section id="reglement" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[820px]">
        <div className="text-center">
          <Eyebrow>{tr.eyebrow}</Eyebrow>
          <h2 className="font-display mt-[18px] text-[clamp(34px,6vw,58px)] font-extrabold leading-none text-white">
            {tr.titleA}
            <span className="text-gold">{tr.titleB}</span>
          </h2>
          <p className="mx-auto mt-[22px] max-w-[680px] text-[18px] leading-[1.7] text-gris">
            {tr.lead}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-[14px]">
          {tr.rules.map((rule, index) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.08, 0.4) }}
              className="flex items-start gap-[18px] rounded-[14px] border border-bord bg-carte px-6 py-6"
            >
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gold text-[16px] font-extrabold text-[#0b0b0d]">
                {index + 1}
              </div>
              <div>
                <h3 className="font-display mb-2 text-[17px] font-extrabold text-white">
                  {rule.title}
                </h3>
                <p className="text-[15px] leading-[1.7] text-gris">
                  <RichText text={rule.body} />
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-[13px] leading-[1.7] text-gris-fonce">
          {tr.note}
        </p>
      </div>
    </section>
  );
};

export default Reglement;

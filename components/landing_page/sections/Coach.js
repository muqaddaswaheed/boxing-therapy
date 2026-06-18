"use client";

import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import { useNavigation } from "../context/NavigationContext";

const Coach = () => {
  const { t } = useNavigation();
  const tr = t.coach;
  return (
    <section id="coach" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[1080px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow>{tr.eyebrow}</Eyebrow>
          <h2 className="font-display mt-[18px] text-[clamp(34px,6vw,58px)] font-extrabold leading-none tracking-[-0.01em] text-white">
            {tr.name}
          </h2>
        </motion.div>

        <div className="mt-[46px] grid grid-cols-1 items-start gap-12 md:grid-cols-[0.8fr_1.2fr]">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto aspect-[3/4] w-full max-w-[340px] overflow-hidden rounded-[16px] border border-bord bg-black md:max-w-none"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gris-fonce">
              <User className="h-12 w-12" strokeWidth={1.5} />
              <span className="text-[12px] font-semibold uppercase tracking-[0.22em]">
                {tr.photoPlaceholder}
              </span>
            </div>
            <span className="absolute bottom-4 left-4 rounded-[8px] bg-gold px-[14px] py-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white">
              {tr.name}
            </span>
          </motion.div>

          {/* Bio */}
          <div className="space-y-[18px]">
            {tr.bio.map((para, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                className={
                  index === 0
                    ? "text-[20px] font-semibold leading-[1.55] text-blanc"
                    : "text-[16px] leading-[1.85] text-gris"
                }
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Coach stats */}
        <div className="mt-11 grid grid-cols-2 gap-[14px] md:grid-cols-4">
          {tr.stats.map((stat, index) => (
            <motion.div
              key={stat.lab}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-[14px] border border-bord bg-carte px-[14px] py-6 text-center"
            >
              <div className="font-display text-[clamp(24px,4vw,34px)] font-extrabold leading-none text-white">
                {stat.num}
              </div>
              <div className="mt-2 text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.12em] text-gris">
                {stat.lab}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coach;

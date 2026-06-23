"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import RichText from "../ui/RichText";
import { useNavigation } from "../context/NavigationContext";

// Price/currency data is language-neutral; text comes from translations by index.
const PACK_META = [
  { old: "600 CHF", cur: "CHF", price: "500", popular: false, amount: "500 CHF" },
  { old: "1 200 CHF", cur: "CHF", price: "950", popular: true, amount: "950 CHF" },
];

const Tarifs = () => {
  const { choosePack, t } = useNavigation();
  const tr = t.tarifs;
  const packs = PACK_META.map((meta, i) => ({ ...meta, ...tr.packs[i] }));

  return (
    <section id="promo" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[1080px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Eyebrow>{tr.eyebrow}</Eyebrow>
          <h2 className="font-display mt-[18px] text-[clamp(34px,6vw,58px)] font-extrabold leading-none tracking-[-0.01em] text-white">
            {tr.titleA}
            <span className="text-gold">{tr.titleB}</span>
          </h2>
          <p className="mx-auto mt-[22px] max-w-[680px] text-[18px] leading-[1.7] text-gris">
            {tr.lead}
          </p>
        </motion.div>

        <div className="mx-auto mt-[46px] grid max-w-[720px] grid-cols-1 items-stretch gap-[18px] md:grid-cols-2">
          {packs.map((pack, index) => (
            <motion.div
              key={pack.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`relative flex flex-col rounded-[18px] border bg-carte px-[26px] py-[34px] text-center ${
                pack.popular ? "border-gold" : "border-bord"
              }`}
            >
              {pack.popular && (
                <span className="absolute -top-[13px] left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-[30px] bg-gold px-4 py-[7px] text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#0b0b0d]">
                  <Star className="h-3 w-3 fill-current" /> {pack.ribbon}
                </span>
              )}

              <div className="mb-[6px] text-[14px] font-extrabold uppercase tracking-[0.08em]">
                {pack.title}
              </div>
              <div className="mb-[22px] min-h-[34px] text-[13px] text-gris">
                {pack.subtitle}
              </div>

              <div className="h-[22px] text-[17px] font-semibold text-gris-fonce line-through">
                {pack.old || " "}
              </div>
              <div className="mt-1 font-display text-[46px] font-extrabold leading-none">
                <span className="align-super text-[17px] font-bold text-white">
                  {pack.cur}
                </span>{" "}
                {pack.price}
              </div>
              <div className="mt-2 text-[13px] text-gris">{pack.per}</div>

              <span
                className={`mt-[14px] inline-block rounded-[30px] bg-rouge px-[14px] py-[6px] text-[12px] font-extrabold text-white ${
                  pack.save ? "" : "invisible"
                }`}
              >
                {pack.save || "."}
              </span>

              <div className="mt-auto pt-6">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => choosePack(pack.title, pack.amount)}
                  className={`w-full cursor-pointer rounded-[10px] border px-4 py-[15px] text-[14px] font-bold transition-colors duration-200 hover:border-gold ${
                    pack.popular
                      ? "border-gold bg-gold text-[#0b0b0d]"
                      : "border-bord bg-carte text-blanc"
                  }`}
                >
                  {pack.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Student discount */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-6 rounded-[18px] border border-bord bg-carte px-[34px] py-[30px] text-center"
        >
          <div className="text-[42px] font-extrabold leading-none text-rouge">
            −10%
          </div>
          <div className="max-w-[500px] text-[16px] leading-[1.6] text-gris">
            <RichText text={tr.studentText} strongClassName="text-blanc" />
          </div>
        </motion.div>

        <p className="mt-6 text-center text-[13px] leading-[1.7] text-gris-fonce">
          {tr.note}
        </p>
      </div>
    </section>
  );
};

export default Tarifs;

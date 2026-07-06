"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import { useNavigation } from "../context/NavigationContext";

// Price/currency data is language-neutral; text comes from translations by index.
const TIER_META = [
  { type: "solo", cur: "CHF", price: "120", amount: "120 CHF", popular: false, badgeColor: "red" },
  { type: "duo", cur: "CHF", price: "200", amount: "200 CHF", popular: false, badgeColor: "red" },
  { type: "trio", cur: "CHF", price: "280", amount: "280 CHF", popular: true, badgeColor: "gold" },
  { type: "group", cur: "CHF", price: "340", amount: "340 CHF", popular: false, badgeColor: "red" },
];

const GroupRates = () => {
  const { bookSession, t } = useNavigation();
  const tr = t.grouprates;
  const tiers = TIER_META.map((meta, i) => ({ ...meta, ...tr.tiers[i] }));

  return (
    <section id="tarifs" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[760px]">
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
          <p className="mx-auto mt-[22px] max-w-[560px] text-[18px] leading-[1.7] text-gris">
            {tr.lead}
          </p>
        </motion.div>

        <div className="mt-[46px] grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className={`relative flex flex-col rounded-[22px] border px-6 py-9 text-center ${
                tier.popular
                  ? "border-gold bg-gradient-to-br from-[#241c08] via-black to-black shadow-premium"
                  : "border-bord bg-carte"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-[15px] left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-[30px] bg-gold px-[18px] py-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#0b0b0d]">
                  <Star className="h-[14px] w-[14px] fill-current" /> {tr.ribbon}
                </span>
              )}

              {/* Tier label */}
              <div
                className={`text-[14px] font-extrabold uppercase tracking-[0.22em] ${
                  tier.popular ? "text-gold" : "text-gris-fonce"
                }`}
              >
                {tier.tier}
              </div>
              {/* Persons */}
              <div className="mt-[6px] text-[20px] font-extrabold text-white">
                {tier.persons}
              </div>

              {/* Price */}
              <div className="mt-7 flex items-baseline justify-center gap-2">
                <span className="text-[17px] font-bold text-gris-fonce">
                  {tier.cur}
                </span>
                <span className="font-display text-[clamp(48px,9vw,60px)] font-extrabold leading-none text-white">
                  {tier.price}
                </span>
              </div>
              <div className="mt-3 text-[15px] text-gris">{tier.sub}</div>

              {/* Badge */}
              <div className="mt-6 flex justify-center">
                <span
                  className={`inline-block rounded-[30px] px-[16px] py-[7px] text-[13px] font-extrabold ${
                    tier.badgeColor === "gold"
                      ? "bg-gold/15 text-gold"
                      : "bg-rouge/15 text-rouge"
                  }`}
                >
                  {tier.badge}
                </span>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-7">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => bookSession(tier.type)}
                  className={`w-full cursor-pointer rounded-[12px] border px-4 py-[15px] text-[15px] font-bold transition-colors duration-200 hover:border-gold ${
                    tier.popular
                      ? "border-gold bg-gold text-[#0b0b0d]"
                      : "border-bord bg-carte text-blanc"
                  }`}
                >
                  {tier.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] leading-[1.7] text-gris-fonce">
          {tr.note}
        </p>
      </div>
    </section>
  );
};

export default GroupRates;

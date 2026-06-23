"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import RichText from "../ui/RichText";
import CopyButton from "../ui/CopyButton";
import { BANK } from "../lib/bank";
import { useNavigation } from "../context/NavigationContext";

const METHOD_META = [
  { bank: true, highlight: true },
  { bank: false, highlight: false },
];

const Payment = () => {
  const { navigate, payInfo, t } = useNavigation();
  const tr = t.payment;
  const methods = METHOD_META.map((meta, i) => ({ ...meta, ...tr.methods[i] }));

  return (
    <section id="pay" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[640px]">
        <div className="text-center">
          <Eyebrow>{tr.eyebrow}</Eyebrow>
          <h2 className="font-display mt-[18px] text-[clamp(34px,6vw,58px)] font-extrabold leading-none text-white">
            {tr.titleA}
            <span className="text-gold">{tr.titleB}</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex justify-between gap-4 rounded-[14px] border border-bord bg-carte px-6 py-[22px]"
        >
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-gris">
              {tr.pack}
            </div>
            <div className="mt-[6px] text-[20px] font-extrabold text-white">
              {payInfo.pack}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-[0.16em] text-gris">
              {tr.amount}
            </div>
            <div className="mt-[6px] text-[20px] font-extrabold text-gold">
              {payInfo.amount}
            </div>
          </div>
        </motion.div>

        <p className="my-[22px] text-center text-[15px] leading-[1.7] text-gris">
          <RichText text={tr.intro} />
        </p>

        {methods.map((method, index) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`mb-3 rounded-[12px] border bg-carte px-[18px] py-4 ${
              method.highlight ? "border-gold" : "border-bord"
            }`}
          >
            <div className="mb-[6px] flex items-center gap-2 text-[15px] font-extrabold">
              {method.title}
              {method.badge && (
                <span className="rounded-[20px] bg-gold px-2 py-[3px] text-[10px] tracking-[0.08em] text-[#0b0b0d]">
                  {method.badge}
                </span>
              )}
            </div>
            <div className="text-[14px] leading-[1.6] text-gris">
              {method.description}
            </div>
            {method.bank && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between gap-3 text-[14px]">
                  <span className="text-gris-fonce">{tr.holder}</span>
                  <span className="text-right font-bold text-blanc">
                    {BANK.holder}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-[6px] border border-dashed border-gold bg-noir px-[10px] py-2">
                  <div className="min-w-0 flex-1">
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-gris-fonce">
                      IBAN
                    </span>
                    <span className="break-all font-mono text-[15px] font-bold text-blanc">
                      {BANK.iban}
                    </span>
                  </div>
                  <CopyButton value={BANK.iban} />
                </div>
                <div className="flex items-center justify-between gap-3 text-[14px]">
                  <span className="text-gris-fonce">SWIFT/BIC</span>
                  <span className="font-mono font-bold text-blanc">
                    {BANK.swift}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        ))}

        <div className="mt-4 flex gap-[10px] rounded-[12px] border border-gold bg-gold/10 px-4 py-[14px] text-[13px] leading-[1.6] text-[#e8a8a4]">
          <CheckCircle className="h-5 w-5 flex-none text-rouge" strokeWidth={2} />
          <div>
            <RichText text={tr.notice} strongClassName="text-blanc" />
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="red"
            onClick={() => navigate("agenda")}
            className="w-full justify-center"
          >
            {tr.ctaBook} <ArrowRight className="h-[18px] w-[18px]" />
          </Button>
        </div>
        <div className="mt-[14px] text-center">
          <button
            onClick={() => navigate("promo")}
            className="cursor-pointer text-[13px] text-gris underline"
          >
            {tr.back}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Payment;

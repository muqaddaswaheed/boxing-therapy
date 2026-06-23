"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import RichText from "../ui/RichText";
import CopyButton from "../ui/CopyButton";
import { BANK } from "../lib/bank";
import { useNavigation } from "../context/NavigationContext";

/**
 * Booking confirmation modal. Presentational — driven entirely by props.
 */
const BookingModal = ({ open, when, name, email, onClose }) => {
  const { t } = useNavigation();
  const tr = t.modal;
  const holderLabel = t.payment.holder;
  const noteText = tr.note
    .replace("{name}", name || "")
    .replace("{email}", email || "");
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-5"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25 }}
            className="max-h-[90vh] w-full max-w-[480px] overflow-y-auto rounded-[18px] border border-gold bg-noir px-[30px] py-[34px]"
          >
            <div className="mx-auto mb-[18px] flex h-16 w-16 items-center justify-center rounded-full bg-gold">
              <Check className="h-[34px] w-[34px] text-[#0b0b0d]" strokeWidth={3} />
            </div>

            <h3 className="font-display mb-[6px] text-center text-[23px] font-extrabold">
              {tr.title}
            </h3>
            <div className="mb-5 text-center text-[17px] font-bold text-gold">
              {when}
            </div>

            <p className="mb-[22px] text-center text-[14px] leading-[1.6] text-gris">
              <RichText text={noteText} strongClassName="text-blanc" />
            </p>

            <div className="mb-3 rounded-[12px] border border-gold bg-carte px-[18px] py-4">
              <div className="mb-[6px] text-[15px] font-extrabold">{tr.place}</div>
              <div className="text-[14px] leading-[1.6] text-gris">
                Rue Saint-Pierre 6B
                <br />
                1700 Fribourg
              </div>
            </div>

            <div className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.1em]">
              {tr.howToPay}
            </div>

            <div className="mb-3 rounded-[12px] border border-bord bg-carte px-[18px] py-4">
              <div className="mb-[6px] flex items-center gap-2 text-[15px] font-extrabold">
                {tr.transfer}
                <span className="rounded-[20px] bg-gold px-2 py-[3px] text-[10px] tracking-[0.08em] text-[#0b0b0d]">
                  IBAN
                </span>
              </div>
              <div className="text-[14px] leading-[1.6] text-gris">
                {tr.transferDesc}
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between gap-3 text-[14px]">
                  <span className="text-gris-fonce">{holderLabel}</span>
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
            </div>

            <div className="mb-3 rounded-[12px] border border-bord bg-carte px-[18px] py-4">
              <div className="mb-[6px] text-[15px] font-extrabold">{tr.cash}</div>
              <div className="text-[14px] leading-[1.6] text-gris">
                {tr.cashDesc}
              </div>
            </div>

            <div className="mt-4 flex gap-[10px] rounded-[12px] border border-gold bg-gold/10 px-4 py-[14px] text-[13px] leading-[1.6] text-gris">
              <AlertCircle className="h-5 w-5 flex-none text-gold" strokeWidth={2} />
              <div>
                <RichText text={tr.cancel} strongClassName="text-blanc" />
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-5 w-full cursor-pointer rounded-[10px] bg-gold px-4 py-[15px] text-[14px] font-bold text-[#0b0b0d] transition-colors hover:bg-gold-light"
            >
              {tr.done}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;

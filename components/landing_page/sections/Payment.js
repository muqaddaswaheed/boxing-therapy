"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import { useNavigation } from "../context/NavigationContext";

const PAYMENT_METHODS = [
  {
    title: "Virement bancaire",
    badge: "IBAN",
    description:
      "Effectuez le virement sur le compte ci-dessous (indiquez votre nom + la formule en communication) :",
    iban: "CH00 0000 0000 0000 0000 0",
    highlight: true,
  },
  {
    title: "Espèces à la salle",
    badge: null,
    description:
      "Vous pouvez aussi régler en cash directement à la salle, avec le coach : Rue Saint-Pierre 6B, 1700 Fribourg.",
    iban: null,
    highlight: false,
  },
];

const Payment = () => {
  const { navigate, payInfo } = useNavigation();

  return (
    <section id="pay" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[640px]">
        <div className="text-center">
          <Eyebrow>Paiement</Eyebrow>
          <h2 className="font-display mt-[18px] text-[clamp(34px,6vw,58px)] font-extrabold leading-none text-white">
            Votre <span className="text-gold">commande</span>
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
              Formule choisie
            </div>
            <div className="mt-[6px] text-[20px] font-extrabold text-white">
              {payInfo.pack}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-[0.16em] text-gris">
              Montant
            </div>
            <div className="mt-[6px] text-[20px] font-extrabold text-gold">
              {payInfo.amount}
            </div>
          </div>
        </motion.div>

        <p className="my-[22px] text-center text-[15px] leading-[1.7] text-gris">
          Réglez votre commande par l'un des moyens ci-dessous. Dès que votre
          paiement est confirmé, vous recevez un{" "}
          <b className="text-white">email de confirmation de votre pack</b> — vous
          pouvez ensuite réserver vos séances une par une, quand vous le
          souhaitez.
        </p>

        {PAYMENT_METHODS.map((method, index) => (
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
            {method.iban && (
              <div className="mt-2 break-all rounded-[6px] border border-dashed border-gold bg-noir px-[10px] py-2 font-mono text-[15px] font-bold">
                {method.iban}
              </div>
            )}
          </motion.div>
        ))}

        <div className="mt-4 flex gap-[10px] rounded-[12px] border border-gold bg-gold/10 px-4 py-[14px] text-[13px] leading-[1.6] text-[#e8a8a4]">
          <CheckCircle className="h-5 w-5 flex-none text-rouge" strokeWidth={2} />
          <div>
            <b className="text-blanc">Après réception de votre paiement</b>, vous
            recevrez un email de confirmation avec votre crédit de séances. Vous
            pourrez alors réserver vos dates ci-dessous.
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="red"
            onClick={() => navigate("agenda")}
            className="w-full justify-center"
          >
            Réserver mes séances <ArrowRight className="h-[18px] w-[18px]" />
          </Button>
        </div>
        <div className="mt-[14px] text-center">
          <button
            onClick={() => navigate("promo")}
            className="cursor-pointer text-[13px] text-gris underline"
          >
            Retour aux tarifs
          </button>
        </div>
      </div>
    </section>
  );
};

export default Payment;

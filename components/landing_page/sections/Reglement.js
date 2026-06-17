"use client";

import React from "react";
import { motion } from "framer-motion";
import Eyebrow from "../ui/Eyebrow";

const RULES = [
  {
    title: "Annulation 24 heures à l'avance",
    body: (
      <>
        Toute séance doit être annulée au minimum{" "}
        <b className="text-white">24 heures à l'avance</b>. Passé ce délai, la
        séance est considérée comme due et ne pourra être ni remboursée, ni
        reportée.
      </>
    ),
  },
  {
    title: "Aptitude médicale",
    body: (
      <>
        Avant de commencer, chaque participant s'engage à vérifier son{" "}
        <b className="text-white">aptitude à pratiquer la boxe</b>, si nécessaire
        auprès de son médecin ou de son assurance. La pratique se fait en pleine
        connaissance de son état de santé.
      </>
    ),
  },
  {
    title: "Assurance obligatoire",
    body: (
      <>
        Chaque participant doit disposer de sa propre{" "}
        <b className="text-white">assurance responsabilité civile (RC)</b> et
        d'une <b className="text-white">assurance accident</b> valable. En cas de
        blessure, les frais relèvent de l'assurance personnelle du participant.
      </>
    ),
  },
  {
    title: "Responsabilité",
    body: (
      <>
        La pratique de la boxe comporte des risques. Chaque participant pratique{" "}
        <b className="text-white">sous sa propre responsabilité</b>. Boxing
        Therapie Premium et son coach ne peuvent être tenus responsables des
        blessures, accidents ou dommages survenant pendant ou après les séances.
      </>
    ),
  },
  {
    title: "Paiement",
    body: (
      <>
        Les séances et packs se règlent par{" "}
        <b className="text-white">virement bancaire (IBAN)</b> ou en{" "}
        <b className="text-white">espèces à la salle</b>. L'accès aux
        réservations est confirmé une fois le paiement reçu. Les packs ne sont pas
        remboursables.
      </>
    ),
  },
  {
    title: "Respect & consignes",
    body: (
      <>
        Chaque participant s'engage à respecter les consignes du coach, le
        matériel et les autres pratiquants. Le coach se réserve le droit de
        refuser ou d'interrompre une séance en cas de comportement inapproprié ou
        de risque pour la sécurité.
      </>
    ),
  },
];

const Reglement = () => {
  return (
    <section id="reglement" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[820px]">
        <div className="text-center">
          <Eyebrow>Règlement</Eyebrow>
          <h2 className="font-display mt-[18px] text-[clamp(34px,6vw,58px)] font-extrabold leading-none text-white">
            Conditions &amp; <span className="text-gold">règlement</span>
          </h2>
          <p className="mx-auto mt-[22px] max-w-[680px] text-[18px] leading-[1.7] text-gris">
            En réservant une séance ou un pack, chaque participant accepte le
            règlement ci-dessous.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-[14px]">
          {RULES.map((rule, index) => (
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
                <p className="text-[15px] leading-[1.7] text-gris">{rule.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-[13px] leading-[1.7] text-gris-fonce">
          En réservant, vous reconnaissez avoir lu et accepté l'ensemble de ces
          conditions.
        </p>
      </div>
    </section>
  );
};

export default Reglement;

"use client";

import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";

const BIO = [
  {
    lead: true,
    text: "La boxe a commencé comme un moyen de me défendre. Elle est devenue ma thérapie, puis ma vocation.",
  },
  {
    text: "Je pratique la boxe depuis l'âge de 12 ans. Au départ, je voulais simplement apprendre à me défendre face aux moqueries et aux humiliations. Mais dès ma première salle, j'ai ressenti autre chose : un apaisement profond. La boxe n'était plus un sport, c'était un équilibre.",
  },
  {
    text: "Pendant le Covid, j'ai continué à m'entraîner avec discipline et à partager ma passion sur les réseaux. Des amis sont venus, puis des amis d'amis. Sans salle, sans douche, dehors, par tous les temps. En quelques mois, nous sommes passés de 5 à 50 élèves.",
  },
  {
    text: "Porté par ma famille, mes amis et mes proches, j'ai ouvert une première salle de 140 m². Six mois plus tard, le club comptait déjà 150 membres. Aujourd'hui, c'est une salle de 400 m² qui accueille plus de 300 passionnés.",
  },
  {
    text: "Au fil des années, j'ai enseigné la boxe à de nombreuses personnes — et certaines ont à leur tour ouvert leurs propres salles de boxe. C'est ma plus grande fierté. À ce jour, j'ai accompagné plus de 300 personnes en cours privé.",
  },
  {
    text: "J'enseigne avec patience et passion : ce sont mes deux moteurs. Et je n'arrête jamais d'apprendre. À travers mes voyages, j'enseigne la boxe mais j'apprends aussi des autres coachs, pour offrir à mes élèves la meilleure qualité d'entraînement possible.",
  },
];

const COACH_STATS = [
  { num: "10 ans", lab: "D'expérience" },
  { num: "250+", lab: "Membres en cours collectif" },
  { num: "300+", lab: "Élèves formés en privé" },
  { num: "400 m²", lab: "Salle d'entraînement" },
];

const Coach = () => {
  return (
    <section id="coach" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[1080px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow>Le Professeur</Eyebrow>
          <h2 className="font-display mt-[18px] text-[clamp(34px,6vw,58px)] font-extrabold leading-none tracking-[-0.01em] text-white">
            Evariste
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
                Ta photo ici
              </span>
            </div>
            <span className="absolute bottom-4 left-4 rounded-[8px] bg-gold px-[14px] py-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white">
              Evariste
            </span>
          </motion.div>

          {/* Bio */}
          <div className="space-y-[18px]">
            {BIO.map((para, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                className={
                  para.lead
                    ? "text-[20px] font-semibold leading-[1.55] text-blanc"
                    : "text-[16px] leading-[1.85] text-gris"
                }
              >
                {para.text}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Coach stats */}
        <div className="mt-11 grid grid-cols-2 gap-[14px] md:grid-cols-4">
          {COACH_STATS.map((stat, index) => (
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

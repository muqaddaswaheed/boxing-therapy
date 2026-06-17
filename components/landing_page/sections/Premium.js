"use client";

import React from "react";
import { motion } from "framer-motion";
import { CircleCheck, User, TrendingUp, ArrowRight } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import { useNavigation } from "../context/NavigationContext";

const FEATURES = [
  {
    icon: CircleCheck,
    title: "Sans jugement",
    text: "Pas de regard des autres, pas de pression. Vous progressez dans un cadre rassurant.",
  },
  {
    icon: User,
    title: "100% sur vous",
    text: "Le coach n'a qu'un seul élève : vous. Toute son attention sur chaque détail.",
  },
  {
    icon: TrendingUp,
    title: "Plein potentiel",
    text: "Un programme adapté à votre niveau et vos objectifs, pour aller plus loin.",
  },
];

const Premium = () => {
  const { navigate } = useNavigation();

  return (
    <section id="about" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[1080px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow>Le Premium</Eyebrow>
          <h2 className="font-display mt-[18px] text-[clamp(34px,6vw,58px)] font-extrabold leading-none tracking-[-0.01em] text-white">
            Votre boxe. Votre rythme.
            <br />
            <span>Rien que pour vous.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 max-w-[760px] space-y-5"
        >
          <p className="text-[18px] leading-[1.8] text-blanc">
            Beaucoup de personnes rêvent de boxer… mais n'osent pas franchir la
            porte d'une salle. La peur du{" "}
            <strong className="text-white">regard des autres</strong>, l'anxiété,
            le sentiment de ne pas être à la hauteur. En cours collectif, le coach
            partage son attention entre des dizaines d'élèves : difficile de
            prendre le temps pour chacun.
          </p>
          <p className="text-[18px] leading-[1.8] text-gris">
            C'est exactement pour cela qu'est né le cours{" "}
            <strong className="text-white">Premium</strong>. Un espace où vous êtes
            seul face au coach, où chaque séance est pensée pour vous : corriger
            vos lacunes, progresser à votre rythme et révéler votre plein
            potentiel.
          </p>
        </motion.div>

        <div className="mt-[46px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
              className="rounded-[16px] border border-bord bg-carte px-[26px] py-[30px] transition-colors duration-200 hover:border-gold"
            >
              <div className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-[12px] bg-gold/[0.14]">
                <feature.icon className="h-6 w-6 text-gold" strokeWidth={2} />
              </div>
              <h3 className="font-display mb-[10px] text-[18px] font-extrabold text-white">
                {feature.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-gris">{feature.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-[54px] rounded-[14px] border border-bord bg-carte p-10 text-center"
        >
          <p className="text-[clamp(20px,3vw,26px)] font-bold uppercase leading-[1.45] text-white">
            Vous serez coaché par un professeur{" "}
            <span className="text-rouge">passionné et patient</span>, qui avance{" "}
            <span className="text-rouge">à votre rythme, sans pression</span>.
          </p>
        </motion.div>

        <div className="mt-10 text-center">
          <Button variant="red" onClick={() => navigate("agenda")}>
            Réserver ma séance <ArrowRight className="h-[18px] w-[18px]" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Premium;

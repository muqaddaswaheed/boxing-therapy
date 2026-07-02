"use client";

import React from "react";
import { motion } from "framer-motion";
import { CircleCheck, User, TrendingUp, ArrowRight } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import RichText from "../ui/RichText";
import { useNavigation } from "../context/NavigationContext";

const FEATURE_ICONS = [CircleCheck, User, TrendingUp];

const Premium = () => {
  const { navigate, t } = useNavigation();
  const tr = t.premium;
  const features = tr.features.map((f, i) => ({ ...f, icon: FEATURE_ICONS[i] }));

  return (
    <section id="about" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[1080px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow>{tr.eyebrow}</Eyebrow>
          <h2 className="font-display mt-[18px] text-[clamp(34px,6vw,58px)] font-extrabold leading-none tracking-[-0.01em] text-white">
            {tr.titleA}
            <br />
            <span>{tr.titleB}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 max-w-[760px] space-y-5"
        >
          {tr.intro.map((paragraph, index) => (
            <p
              key={index}
              className={`text-[18px] leading-[1.8] ${
                index === 0 ? "text-blanc" : "text-gris"
              }`}
            >
              <RichText text={paragraph} />
            </p>
          ))}
        </motion.div>

        <div className="mt-[46px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {features.map((feature, index) => (
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
            <RichText text={tr.quote} strongClassName="text-rouge" />
          </p>
        </motion.div>

        <div className="mt-10 text-center">
          <Button variant="red" onClick={() => navigate("agenda")}>
            {tr.cta} <ArrowRight className="h-[18px] w-[18px]" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Premium;

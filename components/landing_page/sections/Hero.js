"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import { useNavigation } from "../context/NavigationContext";

const Hero = () => {
  const { navigate, t } = useNavigation();
  const tr = t.hero;

  return (
    <section id="home" className="px-4 md:px-7">
      {/* HERO — above the fold, so it uses `animate` (plays on load) */}
      <div className="mx-auto max-w-[1080px] pb-[50px] pt-[70px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow>{tr.eyebrow}</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display mt-7 text-[clamp(42px,12vw,108px)] font-extrabold leading-[0.92] tracking-[-0.02em] text-white"
        >
          {tr.titleA}
          <span className="block">{tr.titleB}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ transformOrigin: "left" }}
          className="my-[30px] h-1 w-[90px] rounded-[3px] bg-gold"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-[520px] text-[clamp(18px,3vw,22px)] leading-[1.5] text-gris"
        >
          {tr.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col gap-[14px] sm:flex-row sm:flex-wrap"
        >
          <Button
            variant="red"
            onClick={() => navigate("agenda")}
            className="w-full justify-center sm:w-auto"
          >
            {tr.ctaBook} <ArrowRight className="h-[18px] w-[18px]" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("about")}
            className="w-full justify-center sm:w-auto"
          >
            <Play className="h-[16px] w-[16px] fill-current" /> {tr.ctaDiscover}
          </Button>
        </motion.div>
      </div>

      {/* STATS */}
      <div className="mx-auto grid max-w-[1080px] grid-cols-2 gap-[14px] pb-20 pt-[30px] md:grid-cols-4">
        {tr.stats.map((stat, index) => (
          <motion.div
            key={stat.lab}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="rounded-[14px] border border-bord bg-carte px-4 py-[30px] text-center"
          >
            <div className="font-display text-[clamp(30px,5vw,44px)] font-extrabold leading-none text-white">
              {stat.num}
            </div>
            <div className="mt-[10px] text-[12px] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-gris">
              {stat.lab}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero;

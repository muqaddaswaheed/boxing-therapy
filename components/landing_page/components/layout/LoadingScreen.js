"use client";

import React from "react";
import { motion } from "framer-motion";
import BrandLogo from "../../ui/BrandLogo";

/**
 * Branded full-screen splash: logo fades up, then a thin progress bar
 * sweeps. Shown for the first few seconds.
 */
const LoadingScreen = () => {
  return (
    <motion.div
      key="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex items-center justify-center"
      >
        <BrandLogo size={150} priority />
      </motion.div>

      <div className="mt-12 h-[3px] w-[180px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-gold"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-[12px] font-semibold uppercase tracking-[0.3em] text-gris-fonce"
      >
        Boxing Therapie Premium
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;

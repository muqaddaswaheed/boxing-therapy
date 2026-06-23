"use client";

import React from "react";
import { motion } from "framer-motion";

// 078 320 05 83 (Switzerland) → international format for wa.me (drop leading 0, prefix 41)
const WHATSAPP_NUMBER = "41783200583";

const PRESET = {
  fr: "Bonjour, je souhaite réserver un cours de boxe.",
  en: "Hello, I'd like to book a boxing session.",
  de: "Hallo, ich möchte eine Boxstunde buchen.",
};

const FloatingWhatsApp = ({ lang = "fr" }) => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    PRESET[lang] || PRESET.fr
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-5 z-[70] flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_-4px_rgba(37,211,102,0.6)] md:bottom-6 md:right-6 md:h-12 md:w-12"
    >
      {/* Pulsing ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />
      <svg
        viewBox="0 0 32 32"
        className="relative h-6 w-6 fill-white"
        aria-hidden="true"
      >
        <path d="M16.004 0h-.008C7.174 0 .002 7.174.002 16c0 3.497 1.13 6.74 3.05 9.37L1.05 31.2l6.02-1.926A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.826 32 16S24.83 0 16.004 0Zm9.32 22.59c-.387 1.09-1.92 1.996-3.142 2.26-.836.178-1.927.32-5.6-1.203-4.7-1.948-7.726-6.723-7.962-7.034-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.426 1.58-3.847.346-.35.917-.51 1.464-.51.177 0 .336.01.48.017.42.018.63.043.907.705.346.83 1.184 2.877 1.284 3.087.102.21.17.456.034.766-.127.31-.24.448-.45.69-.21.243-.41.43-.62.69-.19.227-.405.473-.174.87.232.39 1.03 1.7 2.214 2.753 1.526 1.36 2.79 1.78 3.227 1.96.327.135.715.103.953-.146.302-.32.674-.85 1.05-1.372.268-.373.604-.42.96-.286.36.127 2.27 1.07 2.66 1.264.39.194.65.29.745.45.094.166.094.948-.293 2.04Z" />
      </svg>
    </motion.a>
  );
};

export default FloatingWhatsApp;

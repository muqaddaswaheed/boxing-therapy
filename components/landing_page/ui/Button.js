"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Brand button. `variant="red"` is the solid gold CTA; `variant="ghost"`
 * is the outlined dark variant. (Original class names .btn-red / .btn-ghost.)
 */
const VARIANTS = {
  red: "bg-gold text-[#0b0b0d] hover:bg-gold-light",
  ghost: "bg-black text-blanc border border-gold hover:border-gris-fonce",
};

const Button = ({
  children,
  variant = "red",
  onClick,
  type = "button",
  className = "",
}) => (
  <motion.button
    type={type}
    onClick={onClick}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    className={`inline-flex cursor-pointer items-center gap-3 rounded-[12px] px-[30px] py-[18px] text-[15px] font-bold tracking-[0.01em] transition-colors duration-200 ${VARIANTS[variant]} ${className}`}
  >
    {children}
  </motion.button>
);

export default Button;

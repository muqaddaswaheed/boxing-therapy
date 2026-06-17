"use client";

import React from "react";

/**
 * Small uppercase eyebrow label with a gold dot — the section header's
 * top line throughout the site.
 */
const Eyebrow = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-[10px] rounded-[40px] border border-bord px-[18px] py-[9px] text-[12px] font-semibold uppercase tracking-[0.22em] text-gris ${className}`}
  >
    <span className="h-2 w-2 rounded-full bg-gold" />
    {children}
  </span>
);

export default Eyebrow;

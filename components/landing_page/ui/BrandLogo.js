"use client";

import React from "react";
import Image from "next/image";

/**
 * Size-prop wrapper around next/image for the Boxing Therapie logo.
 * Reused in Navbar, Footer and LoadingScreen.
 */
const BrandLogo = ({ size = 160, priority = false, className = "" }) => {
  // Source asset is 599 x 419 → preserve aspect ratio from the height.
  const width = Math.round((size * 599) / 419);
  return (
    <Image
      src="/logo.png"
      alt="Boxing Therapie Premium"
      width={width}
      height={size}
      priority={priority}
      className={`h-auto w-auto select-none object-contain ${className}`}
      style={{ height: size, width: "auto", maxWidth: "92%" }}
    />
  );
};

export default BrandLogo;

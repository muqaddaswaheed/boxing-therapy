"use client";

import React from "react";

/**
 * Shimmer placeholders used as next/dynamic() loading fallbacks so the
 * page never flashes an empty gap while a section chunk loads.
 */
export const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-shimmer-sweep rounded-[12px] bg-white/[0.04] ${className}`}
  />
);

export const SkeletonText = ({ lines = 3, className = "" }) => (
  <div className={`flex flex-col gap-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className="h-4"
        // last line is shorter
      />
    ))}
  </div>
);

export const SkeletonCard = () => (
  <div className="rounded-[16px] border border-bord p-8">
    <Skeleton className="mb-5 h-12 w-12 rounded-[12px]" />
    <Skeleton className="mb-3 h-5 w-1/2" />
    <SkeletonText lines={2} />
  </div>
);

export const SkeletonHeroBlock = () => (
  <div className="mx-auto max-w-[1080px] px-7 py-20">
    <Skeleton className="mb-8 h-9 w-64 rounded-full" />
    <Skeleton className="mb-4 h-24 w-3/4" />
    <Skeleton className="mb-8 h-1 w-24" />
    <Skeleton className="h-6 w-1/2" />
  </div>
);

export const SkeletonBanner = () => (
  <div className="mx-auto my-10 max-w-[1080px] px-7">
    <Skeleton className="h-32 w-full rounded-[18px]" />
  </div>
);

export const SkeletonSection = ({ cards = 3 }) => (
  <div className="mx-auto max-w-[1080px] px-7 py-16">
    <Skeleton className="mb-6 h-8 w-40 rounded-full" />
    <Skeleton className="mb-10 h-14 w-2/3" />
    <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
      {Array.from({ length: cards }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);

export default Skeleton;

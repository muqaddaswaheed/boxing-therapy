"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";

import {
  NavigationProvider,
  useNavigation,
} from "@/components/landing_page/context/NavigationContext";
import Navbar from "@/components/landing_page/components/layout/Navbar";
import Footer from "@/components/landing_page/components/layout/Footer";
import LoadingScreen from "@/components/landing_page/components/layout/LoadingScreen";
import Hero from "@/components/landing_page/sections/Hero";
import {
  SkeletonSection,
  SkeletonBanner,
} from "@/components/landing_page/ui/Skeleton";

// Below-the-fold tabs are code-split with skeleton fallbacks. The
// animation-heavy / client-only Agenda also opts out of SSR.
const Premium = dynamic(() => import("@/components/landing_page/sections/Premium"), {
  loading: () => <SkeletonSection cards={3} />,
});
const Coach = dynamic(() => import("@/components/landing_page/sections/Coach"), {
  loading: () => <SkeletonSection cards={4} />,
});
const Agenda = dynamic(() => import("@/components/landing_page/sections/Agenda"), {
  loading: () => <SkeletonBanner />,
  ssr: false,
});
const Tarifs = dynamic(() => import("@/components/landing_page/sections/Tarifs"), {
  loading: () => <SkeletonSection cards={3} />,
});
const Payment = dynamic(() => import("@/components/landing_page/sections/Payment"), {
  loading: () => <SkeletonBanner />,
  ssr: false,
});
const Contact = dynamic(() => import("@/components/landing_page/sections/Contact"), {
  loading: () => <SkeletonSection cards={3} />,
});
const Reglement = dynamic(
  () => import("@/components/landing_page/sections/Reglement"),
  { loading: () => <SkeletonSection cards={3} /> }
);

const PAGE_COMPONENTS = {
  home: Hero,
  about: Premium,
  coach: Coach,
  agenda: Agenda,
  promo: Tarifs,
  pay: Payment,
  contact: Contact,
  reglement: Reglement,
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Boxing Therapie Premium",
  description:
    "Cours de boxe 100% individuels à Fribourg. Une méthode claire et progressive, sans jugement.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rue Saint-Pierre 6B",
    addressLocality: "Fribourg",
    postalCode: "1700",
    addressCountry: "CH",
  },
  telephone: "+41783200583",
  email: "boxingtherapiepremium@gmail.com",
  priceRange: "CHF 95–120",
  sport: "Boxing",
};

function SiteContent() {
  const { activePage } = useNavigation();
  const ActiveSection = PAGE_COMPONENTS[activePage] || Hero;

  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveSection />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-mesh min-h-screen">
      <Script
        id="schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NavigationProvider>
              <SiteContent />
            </NavigationProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

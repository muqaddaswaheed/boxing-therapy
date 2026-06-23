"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

import {
  NavigationProvider,
  useNavigation,
} from "@/components/landing_page/context/NavigationContext";
import Navbar from "@/components/landing_page/components/layout/Navbar";
import Footer from "@/components/landing_page/components/layout/Footer";
import FloatingWhatsApp from "@/components/landing_page/components/FloatingWhatsApp";
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
  loading: () => <SkeletonSection cards={2} />,
});
const GroupRates = dynamic(
  () => import("@/components/landing_page/sections/GroupRates"),
  { loading: () => <SkeletonSection cards={4} /> }
);
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
  tarifs: GroupRates,
  pay: Payment,
  contact: Contact,
  reglement: Reglement,
};

function SiteContent() {
  const { activePage, lang } = useNavigation();
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
      <FloatingWhatsApp lang={lang} />
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
      {/* Content is always mounted (and server-rendered) so crawlers receive
          the real hero copy and headings in the initial HTML. The branded
          splash is an overlay that fades out on top of it. */}
      <NavigationProvider>
        <SiteContent />
      </NavigationProvider>
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>
    </div>
  );
}

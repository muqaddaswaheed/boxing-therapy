import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://boxingtherapiepremium.ch";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Boxing Therapie Premium — Coaching de boxe individuel à Fribourg",
    template: "%s · Boxing Therapie Premium",
  },
  description:
    "Cours de boxe 100% individuels à Fribourg. Une méthode claire et progressive, sans jugement. Un coach, un élève : vous. Réservez votre séance Premium.",
  keywords: [
    "boxe Fribourg",
    "cours de boxe privé",
    "coaching boxe individuel",
    "boxing therapie",
    "boxe thérapie",
    "cours de boxe Suisse",
  ],
  authors: [{ name: "Boxing Therapie Premium" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: SITE_URL,
    siteName: "Boxing Therapie Premium",
    title: "Boxing Therapie Premium — La boxe, votre thérapie",
    description:
      "Cours de boxe 100% individuels à Fribourg. Un coach, un élève : vous.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boxing Therapie Premium",
    description:
      "Cours de boxe 100% individuels à Fribourg. Un coach, un élève : vous.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${manrope.variable} antialiased`}
    >
      <body className="bg-mesh min-h-screen text-blanc">{children}</body>
    </html>
  );
}

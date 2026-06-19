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
  applicationName: "Boxing Therapie Premium",
  authors: [{ name: "Boxing Therapie Premium" }],
  creator: "Boxing Therapie Premium",
  publisher: "Boxing Therapie Premium",
  category: "Sports",
  keywords: [
    "boxe Fribourg",
    "cours de boxe Fribourg",
    "cours de boxe privé",
    "coaching boxe individuel",
    "boxe thérapie",
    "boxing therapie",
    "cours de boxe privé Suisse",
    "boxe femme Fribourg",
    "salle de boxe Fribourg",
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      "fr-CH": SITE_URL,
      "en": SITE_URL,
      "de-CH": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/logo.png" },
  },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    alternateLocale: ["en_US", "de_CH"],
    url: SITE_URL,
    siteName: "Boxing Therapie Premium",
    title: "Boxing Therapie Premium — La boxe, votre thérapie",
    description:
      "Cours de boxe 100% individuels à Fribourg. Un coach, un élève : vous.",
    images: [
      {
        url: "/logo.png",
        width: 599,
        height: 419,
        alt: "Boxing Therapie Premium — logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boxing Therapie Premium — La boxe, votre thérapie",
    description:
      "Cours de boxe 100% individuels à Fribourg. Un coach, un élève : vous.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  // Replace with the real token from Google Search Console once verified.
  // verification: { google: "your-google-site-verification-token" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

// Server-rendered structured data so search engines always receive it in the
// initial HTML (the page itself is gated behind a client loading screen).
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": `${SITE_URL}/#business`,
  name: "Boxing Therapie Premium",
  url: SITE_URL,
  description:
    "Cours de boxe 100% individuels à Fribourg. Une méthode claire et progressive, sans jugement. Un coach, un élève : vous.",
  image: `${SITE_URL}/logo.png`,
  logo: `${SITE_URL}/logo.png`,
  sport: "Boxing",
  priceRange: "CHF 95–120",
  currenciesAccepted: "CHF",
  telephone: "+41783200583",
  email: "boxingtherapiepremium@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rue Saint-Pierre 6B",
    addressLocality: "Fribourg",
    postalCode: "1700",
    addressRegion: "FR",
    addressCountry: "CH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.8065,
    longitude: 7.1619,
  },
  areaServed: {
    "@type": "City",
    name: "Fribourg",
  },
  knowsLanguage: ["fr", "en", "de"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${manrope.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED_DATA),
          }}
        />
      </head>
      <body className="bg-mesh min-h-screen text-blanc">{children}</body>
    </html>
  );
}

// Emitted at /manifest.webmanifest and auto-linked into <head>. Enables
// "Add to Home Screen" / installable PWA behaviour and gives Android Chrome
// the brand colours and icons. Icons reuse the generated app icons.
export default function manifest() {
  return {
    name: "Boxing Therapie Premium",
    short_name: "Boxing Premium",
    description:
      "Cours de boxe 100% individuels à Fribourg. Un coach, un élève : vous.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#d4af37",
    lang: "fr",
    categories: ["sports", "health", "fitness"],
    icons: [
      {
        src: "/logo.png",
        sizes: "599x419",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

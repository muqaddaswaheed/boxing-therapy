const SITE_URL = "https://boxingtherapiepremium.ch";

// Emitted at /robots.txt — tells crawlers everything is indexable and
// points them at the sitemap. Only build/internal paths are disallowed.
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/404", "/500"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

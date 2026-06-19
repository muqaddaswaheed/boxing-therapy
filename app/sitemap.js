
export const revalidate = 86400; // 24 hours

const baseUrl = "https://boxingtherapiepremium.ch";

const languageAlternates = {
  fr: baseUrl,
  en: baseUrl,
  de: baseUrl,
  "x-default": baseUrl,
};

export default async function sitemap() {
  const lastModified = new Date();

  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: languageAlternates },
    },
  ];

  return [...staticRoutes];
}

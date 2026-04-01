import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://millatsakib.github.io/",
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://millatsakib.github.io/dokan/",
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://millatsakib.github.io/dokan/about_us.html",
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://millatsakib.github.io/dokan/services.html",
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://millatsakib.github.io/dokan/contact.html",
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://millatsakib.github.io/dokan/feedback.html",
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}

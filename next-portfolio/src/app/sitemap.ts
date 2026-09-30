import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2024-12-01");

  return [
    {
      url: "https://millatsakib.com/",
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://millatsakib.com/#about",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://millatsakib.com/#projects",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://millatsakib.com/#skills",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://millatsakib.com/#contact",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}

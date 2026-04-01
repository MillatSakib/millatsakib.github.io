import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/dokan/about_us.html", "/dokan/contact.html", "/dokan/feedback.html", "/dokan/services.html"],
        disallow: ["/login.html", "/IoT_Project/Control_Panel/", "/index.html", "/dokan/index.html"],
      },
    ],
    sitemap: "https://millatsakib.github.io/sitemap.xml",
  };
}

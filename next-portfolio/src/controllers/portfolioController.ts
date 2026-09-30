import { portfolioData, type PortfolioData } from "@/models/portfolioModel";
import { getContent, getProfileImage, getAboutText, getCvUrl } from "@/lib/portfolio-db";

export interface PortfolioViewModel extends PortfolioData {
  currentYear: number;
}

export async function getPortfolioViewModel(): Promise<PortfolioViewModel> {
  const [content, profileImageUrl, aboutText, cvUrl] = await Promise.all([getContent(), getProfileImage(), getAboutText(), getCvUrl()]);
  
  const hero = {
    ...portfolioData.hero,
    ...(cvUrl ? { resumeUrl: cvUrl } : {})
  };

  const navLinks = portfolioData.navLinks.map((link) => 
    link.label === "Resume" && cvUrl ? { ...link, href: cvUrl } : link
  );

  return {
    ...portfolioData,
    hero,
    navLinks,
    about: {
      ...portfolioData.about,
      ...(profileImageUrl ? { imageSrc: profileImageUrl } : {}),
      ...(aboutText ? { description: aboutText } : {}),
    },
    skills: content.categories,
    projects: content.projects,
    currentYear: new Date().getFullYear(),
  };
}

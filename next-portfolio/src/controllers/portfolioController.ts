import { portfolioData, type PortfolioData } from "@/models/portfolioModel";
import { getContent, getProfileImage } from "@/lib/portfolio-db";

export interface PortfolioViewModel extends PortfolioData {
  currentYear: number;
}

export async function getPortfolioViewModel(): Promise<PortfolioViewModel> {
  const [content, profileImageUrl] = await Promise.all([getContent(), getProfileImage()]);
  // forcing recompile to flush cache
  return {
    ...portfolioData,
    about: profileImageUrl
      ? { ...portfolioData.about, imageSrc: profileImageUrl }
      : portfolioData.about,
    skills: content.categories,
    projects: content.projects,
    currentYear: new Date().getFullYear(),
  };
}

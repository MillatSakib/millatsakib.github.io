import { portfolioData, type PortfolioData } from "@/models/portfolioModel";

export interface PortfolioViewModel extends PortfolioData {
  currentYear: number;
}

export function getPortfolioViewModel(): PortfolioViewModel {
  return {
    ...portfolioData,
    currentYear: new Date().getFullYear(),
  };
}

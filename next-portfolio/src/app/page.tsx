import { getPortfolioViewModel } from "@/controllers/portfolioController";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";

export const dynamic = "force-dynamic";
// Force recompile to refresh cache
export default async function Home() {
  const viewModel = await getPortfolioViewModel();

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-transparent text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="noise-bg absolute inset-0 opacity-50" />
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute left-1/3 top-2/3 h-72 w-72 rounded-full bg-cyan-400/8 blur-3xl" />
      </div>

      <Navbar
        brandName={viewModel.brandName}
        logoSrc={viewModel.logoSrc}
        links={viewModel.navLinks}
      />

      <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <HeroSection hero={viewModel.hero} />

        <div className="mt-24 space-y-28 sm:mt-32 sm:space-y-32">
          <AboutSection about={viewModel.about} />
          <SkillsSection categories={viewModel.skills} />
          <ProjectsSection projects={viewModel.projects} />
          <ContactSection
            contactMethods={viewModel.contactMethods}
          />
        </div>
      </main>

      <Footer
        ownerName={viewModel.ownerName}
        socials={viewModel.socials}
        currentYear={viewModel.currentYear}
      />
    </div>
  );
}

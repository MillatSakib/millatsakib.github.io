"use client";

import { FaArrowDown, FaCircle, FaDownload, FaEnvelope } from "react-icons/fa";
import NeonButton from "@/components/ui/NeonButton";
import { useTypewriter } from "@/hooks/useTypewriter";
import type { HeroData } from "@/models/portfolioModel";

interface HeroSectionProps {
  hero: HeroData;
}

export default function HeroSection({ hero }: HeroSectionProps) {
  const typedRole = useTypewriter({ words: hero.roles });

  return (
    <section id="hero" aria-label="Introduction" className="scroll-mt-28 pt-8 sm:pt-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-indigo-950/30 backdrop-blur-md sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="relative max-w-4xl">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-200 sm:text-sm"><FaCircle className="text-[8px]" /> {hero.greeting}</p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-6xl lg:text-7xl">
          {hero.name}
        </h1>

        <h2 className="mt-7 max-w-2xl text-xl font-semibold leading-relaxed text-slate-300 sm:text-2xl">
          I build <span className="text-amber-200">useful, thoughtful products</span>
          <br />
          as a{" "}
          <span className="relative inline-flex items-center">
            {/* invisible placeholder keeps the width of the longest word */}
            <span className="invisible select-none" aria-hidden="true">
              {hero.roles.reduce((a, b) => (a.length >= b.length ? a : b), "")}
            </span>
            {/* actual typed text with cursor overlaid absolutely */}
            <span className="absolute left-0 top-0 inline-flex items-center whitespace-nowrap text-violet-200">
              {typedRole}
              <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-amber-200" aria-hidden="true" />
            </span>
          </span>
        </h2>

        <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-slate-300">
          <FaCircle className="text-[8px] text-emerald-300" />
          {hero.statusLabel}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <NeonButton href={hero.resumeUrl} external title="Download CV">
            <FaDownload className="text-sm" />
            <span>Download CV</span>
          </NeonButton>

          <NeonButton href={`mailto:${hero.email}`} title={hero.email}>
            <FaEnvelope className="text-sm" />
            <span>Contact Me</span>
          </NeonButton>
        </div>
        <a href="#about" className="mt-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-400 transition hover:text-amber-200"><FaArrowDown /> Scroll to explore</a>
        </div>
      </div>
    </section>
  );
}

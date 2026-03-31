"use client";

import { FaCircle, FaDownload, FaEnvelope } from "react-icons/fa";
import NeonButton from "@/components/ui/NeonButton";
import { useTypewriter } from "@/hooks/useTypewriter";
import type { HeroData } from "@/models/portfolioModel";

interface HeroSectionProps {
  hero: HeroData;
}

export default function HeroSection({ hero }: HeroSectionProps) {
  const typedRole = useTypewriter({ words: hero.roles });

  return (
    <section className="scroll-mt-28 pt-8 sm:pt-12">
      <div className="relative max-w-4xl rounded-3xl border border-slate-700/70 bg-slate-900/50 p-6 shadow-[0_24px_60px_-38px_rgba(15,23,42,1)] backdrop-blur-sm sm:p-9">
        <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

        <p className="text-base font-semibold text-emerald-300 sm:text-lg">{hero.greeting}</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          {hero.name}
        </h1>

        <h2 className="mt-6 text-2xl font-bold text-emerald-300 sm:text-3xl">
          I am {" "}
          <span className="inline-flex min-h-10 items-center text-cyan-300">{typedRole}</span>
          <span className="ml-1 inline-block h-7 w-[2px] animate-pulse bg-cyan-200" aria-hidden="true" />
        </h2>

        <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-slate-200">
          <FaCircle className="text-[11px] text-emerald-400" />
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
      </div>
    </section>
  );
}

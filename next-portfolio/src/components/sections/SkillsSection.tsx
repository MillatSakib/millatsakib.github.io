"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SkillCategory, SkillIconKey, SkillItem } from "@/models/portfolioModel";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

function SkillIcon({ iconKey, iconUrl }: { iconKey: SkillIconKey; iconUrl?: string }) {
  if (iconKey === "upload" && iconUrl) {
    return (
      <Image
        src={iconUrl}
        alt="Skill icon"
        width={26}
        height={26}
        className="h-[26px] w-[26px] select-none object-contain"
        draggable={false}
      />
    );
  }

  if (iconKey === "node") {
    return <FaNodeJs className="text-[1.4rem] text-[#5eb63d]" />;
  }

  if (iconKey === "express") {
    return <SiExpress className="text-[1.2rem] text-white" />;
  }

  if (iconKey === "custom" || iconKey === "upload") {
    return <span className="font-display text-xl font-bold text-amber-200">✦</span>;
  }

  const imageMap: Record<Exclude<SkillIconKey, "node" | "express" | "custom" | "upload">, string> = {
    react: "/images/react.png",
    mongodb: "/images/mongodb.png",
    git: "/images/git.png",
    github: "/images/github.png",
    gitlab: "/images/gitlab.png",
  };

  return (
    <Image
      src={imageMap[iconKey]}
      alt={`${iconKey} icon`}
      width={26}
      height={26}
      className="h-[26px] w-[26px] select-none object-contain"
      draggable={false}
    />
  );
}

export default function SkillsSection({ categories }: SkillsSectionProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<SkillCategory["id"]>(
    categories[0]?.id ?? "web",
  );

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId) ?? categories[0],
    [activeCategoryId, categories],
  );

  if (!activeCategory) {
    return null;
  }

  return (
    <section id="skills" aria-label="My Skills" className="scroll-mt-28">
      <SectionHeading title="My Skills" />

      <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,1)] backdrop-blur-sm sm:p-7">
        <div className="mb-7 inline-flex rounded-xl border border-slate-700 bg-slate-950/80 p-1">
          {categories.map((category) => {
            const isActive = activeCategoryId === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategoryId(category.id)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] transition-all sm:px-6 ${
                  isActive
                    ? "bg-amber-300 text-slate-950 shadow-[0_0_28px_-12px_rgba(247,185,85,0.95)]"
                    : "text-slate-300 hover:text-amber-200"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeCategory.items.map((skill: SkillItem, index) => (
            <article
              key={`${activeCategory.id}-${skill.name}`}
              className="group relative select-none overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200/45 hover:bg-white/[0.08] hover:shadow-[0_18px_35px_-22px_rgba(247,185,85,0.7)]"
            >
              <div className="relative flex w-full flex-col items-center justify-center pt-3 text-center">
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-400/10 blur-2xl transition group-hover:bg-amber-300/15" />
                <span className="absolute right-0 top-0 font-display text-xs font-semibold tracking-[0.2em] text-slate-600">0{index + 1}</span>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] transition group-hover:border-amber-200/30 group-hover:bg-amber-200/10">
                  <SkillIcon iconKey={skill.iconKey} iconUrl={skill.iconUrl} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white transition group-hover:text-amber-100">{skill.name}</h3>
                <div className="mt-2 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                  {activeCategory.label} skill
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

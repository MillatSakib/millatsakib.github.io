"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SkillCategory, SkillIconKey, SkillItem } from "@/models/portfolioModel";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

function getProgressToneClass(skill: SkillItem): string {
  if (skill.tone === "danger") {
    return "from-rose-400 to-rose-500";
  }

  if (skill.tone === "warning") {
    return "from-amber-400 to-amber-500";
  }

  if (skill.tone === "info") {
    return "from-sky-400 to-indigo-500";
  }

  return "from-emerald-400 to-emerald-500";
}

function SkillIcon({ iconKey }: { iconKey: SkillIconKey }) {
  if (iconKey === "node") {
    return <FaNodeJs className="text-[1.4rem] text-[#5eb63d]" />;
  }

  if (iconKey === "express") {
    return <SiExpress className="text-[1.2rem] text-slate-700" />;
  }

  const imageMap: Record<Exclude<SkillIconKey, "node" | "express">, string> = {
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
      className="h-[26px] w-[26px] object-contain"
    />
  );
}

export default function SkillsSection({ categories }: SkillsSectionProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<SkillCategory["id"]>(
    categories[0]?.id ?? "web",
  );
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(sectionElement);

    return () => observer.disconnect();
  }, []);

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId) ?? categories[0],
    [activeCategoryId, categories],
  );

  if (!activeCategory) {
    return null;
  }

  return (
    <section id="skills" ref={sectionRef} className="scroll-mt-28">
      <SectionHeading title="My Skills" />

      <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,1)] backdrop-blur-sm sm:p-7">
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
                    ? "bg-indigo-500 text-white shadow-[0_0_28px_-12px_rgba(99,102,241,0.95)]"
                    : "text-slate-300 hover:text-indigo-200"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-5">
          {activeCategory.items.map((skill) => (
            <div
              key={`${activeCategory.id}-${skill.name}`}
              className="flex flex-col gap-2 transition-transform duration-300 hover:scale-[1.01] sm:flex-row sm:items-stretch sm:gap-0"
            >
              <div className="inline-flex items-center gap-3 rounded-xl border border-slate-700 bg-white px-4 py-2 text-base font-bold text-sky-600 sm:min-w-56 sm:rounded-r-none">
                <SkillIcon iconKey={skill.iconKey} />
                <span>{skill.name}</span>
              </div>

              <div className="relative h-11 flex-1 overflow-hidden rounded-xl border border-slate-700 bg-slate-950/85 sm:rounded-l-none">
                <div
                  className={`flex h-full items-center justify-end bg-gradient-to-r pr-3 text-xs font-bold text-slate-950 transition-[width] duration-1000 ease-out sm:text-sm ${getProgressToneClass(skill)}`}
                  style={{ width: hasAnimated ? `${skill.level}%` : "0%" }}
                >
                  {hasAnimated ? `${skill.level}%` : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

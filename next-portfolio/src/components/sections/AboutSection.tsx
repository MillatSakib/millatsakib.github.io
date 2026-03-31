import Image from "next/image";
import NeonButton from "@/components/ui/NeonButton";
import SectionHeading from "@/components/ui/SectionHeading";
import type { AboutData } from "@/models/portfolioModel";
import { FaCode, FaUserPlus } from "react-icons/fa";

interface AboutSectionProps {
  about: AboutData;
}

export default function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="scroll-mt-28">
      <SectionHeading title={about.title} />

      <div className="grid items-center gap-8 lg:grid-cols-[minmax(220px,380px)_1fr]">
        <div className="group mx-auto max-w-[340px]">
          <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70 p-3">
            <Image
              src={about.imageSrc}
              alt={about.imageAlt}
              width={600}
              height={600}
              className="h-auto w-full rounded-xl object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              sizes="(max-width: 768px) 70vw, 340px"
            />
          </div>
        </div>

        <div>
          <p className="text-base leading-8 text-slate-200 sm:text-lg">{about.description}</p>

          <div className="mt-7 flex flex-wrap gap-3 sm:justify-end">
            <NeonButton href={about.projectCtaUrl}>
              <FaCode className="text-sm" />
              <span>My Project</span>
            </NeonButton>

            <NeonButton href={about.hireMeUrl} external title="Contact me on LinkedIn">
              <FaUserPlus className="text-sm" />
              <span>Hire Me</span>
            </NeonButton>
          </div>
        </div>
      </div>
    </section>
  );
}

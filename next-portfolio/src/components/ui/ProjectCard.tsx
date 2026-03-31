import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import type { Project, ProjectLink } from "@/models/portfolioModel";

interface ProjectCardProps {
  project: Project;
}

function ProjectLinkIcon({ type }: { type: ProjectLink["type"] }) {
  if (type === "live") {
    return <HiOutlineExternalLink className="text-lg" />;
  }

  return <FaGithub className="text-lg" />;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70 shadow-[0_16px_50px_-28px_rgba(15,23,42,0.95)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/45 hover:shadow-[0_22px_55px_-25px_rgba(15,23,42,1)]">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#324f77]">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
      </div>

      <div className="flex h-full flex-col p-6">
        <h3 className="font-display text-3xl font-semibold text-white">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{project.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-700/70 pt-5">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 text-slate-200 transition-all duration-200 hover:border-emerald-300 hover:text-emerald-300"
            >
              <ProjectLinkIcon type={link.type} />
            </a>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((item) => (
            <span
              key={`${project.title}-${item}`}
              className="rounded-full border border-emerald-300/25 bg-emerald-400/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-200"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

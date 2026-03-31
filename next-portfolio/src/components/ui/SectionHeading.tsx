interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      {subtitle ? (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.32em] text-emerald-300/80">
          {subtitle}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      <div className="mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400" />
    </div>
  );
}

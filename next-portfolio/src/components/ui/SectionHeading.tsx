interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4">
      <div>
      {subtitle ? (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.32em] text-amber-200/80">
          {subtitle}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      <div className="mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-violet-400" />
      </div>
      <span className="hidden pb-1 text-xs font-bold uppercase tracking-[0.25em] text-slate-500 sm:block">04 / 05</span>
    </div>
  );
}

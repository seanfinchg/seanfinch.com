import React from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import { useTheme } from "../contexts/themeContext";
import { getThemeClasses } from "../utils/themeUtils";
import { experiences, type ExperienceProps } from "../data/experiences";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { isCurrentlyActive } from "../utils/experienceUtils";

const ExperienceItem: React.FC<{ exp: ExperienceProps; index: number }> = ({
  exp,
  index,
}) => {
  const { theme } = useTheme();
  const ref = useScrollReveal();
  const isActive = isCurrentlyActive(exp.dateRange);

  return (
    <div
      ref={ref}
      className="scroll-reveal relative pl-14 mb-8"
      style={{ transitionDelay: `${Math.min(index * 70, 350)}ms` }}
    >
      {/* Timeline node */}
      <div
        className={`absolute left-[0.85rem] top-2 w-7 h-7 rounded-full z-10 flex items-center justify-center shadow-md overflow-hidden
        ${
          exp.featured
            ? "ring-2 ring-sky-400/60 shadow-sky-500/30"
            : "ring-1 ring-neutral-500/40"
        }`}
      >
        {exp.logo ? (
          <img
            src={exp.logo}
            alt={exp.company}
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            className={`text-xs font-bold ${exp.featured ? "text-white bg-sky-500 w-full h-full flex items-center justify-center" : "text-muted-foreground"}`}
          >
            {exp.company[0]}
          </span>
        )}
      </div>

      {/* Date + location */}
      <p className="text-[11px] font-monospace text-muted-foreground mb-1.5 tracking-wide">
        <span style={{ color: "#6fa8f8" }}>{exp.dateRange}</span>
        <span className="opacity-40 mx-1.5">·</span>
        {exp.location}
      </p>

      {/* Card */}
      <div
        className={`p-4 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg
        ${
          exp.featured
            ? "border-sky-500/30 dark:border-sky-500/25 bg-sky-500/[0.03] dark:bg-sky-500/[0.06]"
            : theme === "light"
              ? "border-slate-300/80 bg-white/75 shadow-sm"
              : "border-neutral-700/50 bg-neutral-800/20"
        }`}
      >
        <div className="flex items-start gap-3 mb-3">
          {exp.logo && (
            <img
              src={exp.logo}
              alt={exp.company}
              className="w-10 h-10 object-contain rounded shrink-0 mt-0.5"
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-0.5">
              <h3 className="text-lg font-bold font-jost leading-tight">
                {exp.company}
              </h3>
              {exp.featured && (
                <span className="text-[10px] font-monospace px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/25">
                  FEATURED
                </span>
              )}
              {isActive && (
                <span className="flex items-center gap-1 text-[10px] font-monospace text-green-600 dark:text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot inline-block" />
                  Active
                </span>
              )}
            </div>
            <p className="text-sm font-monospace text-muted-foreground leading-tight">
              {exp.title}
            </p>
          </div>
        </div>
        <ul className="space-y-1.5 text-base leading-relaxed font-raleway mb-3">
          {exp.description.map((item, j) => (
            <li key={j} className="flex gap-2">
              <span className="text-sky-500 dark:text-sky-400 shrink-0 font-monospace mt-0.5 text-sm">
                ›
              </span>
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
        <a
          href={exp.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-monospace font-semibold transition-colors duration-150
            ${theme === "light"
              ? "text-sky-700 border-sky-200 bg-sky-50 hover:bg-sky-100"
              : "text-sky-400 border-sky-800/50 bg-sky-900/20 hover:bg-sky-800/40"}`}
        >
          Website →
        </a>
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  const { theme } = useTheme();

  usePageMeta(
    "Experience",
    "Cybersecurity internships and co-ops — Palo Alto Networks, Neuralink, Audax Group, CENIC, and more.",
  );

  const sorted = [...experiences].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
  );

  return (
    <div className={`flex flex-col items-center ${getThemeClasses(theme)}`}>
      {/* Hero */}
      <div className="relative w-full py-14 px-4 text-center overflow-hidden mb-2">
        <div
          className="absolute inset-0 dot-grid-bg text-gray-200 dark:text-gray-700 opacity-40 pointer-events-none"
          aria-hidden="true"
        />
        <p className="relative font-monospace text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
          Career
        </p>
        <h1 className="relative text-5xl md:text-6xl font-jost font-extrabold bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-gradient mb-3">
          Experience
        </h1>
        <p className="relative font-raleway text-muted-foreground text-sm max-w-xs mx-auto">
          Internships, co-ops, and the roles that shaped my skills.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative w-full max-w-3xl mx-auto px-4 pb-16">
        <div className="absolute left-[1.35rem] top-0 bottom-0 w-px bg-gradient-to-b from-sky-400/80 via-blue-500/40 to-indigo-500/10" />
        {sorted.map((exp, i) => (
          <ExperienceItem key={i} exp={exp} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Experience;

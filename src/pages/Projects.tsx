import React from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";
import { getThemeClasses } from "../utils/themeUtils";
import { projects, type ProjectProps } from "../data/projects";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FaGithub, FaExternalLinkAlt, FaSitemap } from "react-icons/fa";

const ProjectItem: React.FC<{ proj: ProjectProps; index: number }> = ({
  proj,
  index,
}) => {
  const { theme } = useTheme();
  const ref = useScrollReveal();
  const isActive = proj.dateRange.includes("Present");

  return (
    <div
      ref={ref}
      className="scroll-reveal relative pl-14 mb-8"
      style={{ transitionDelay: `${Math.min(index * 70, 350)}ms` }}
    >
      {/* Timeline node */}
      <div
        className={`absolute left-[0.85rem] top-2 w-7 h-7 rounded-full z-10 flex items-center justify-center shadow-md font-bold text-xs
        ${
          proj.featured
            ? "bg-emerald-500 ring-2 ring-emerald-400/60 shadow-emerald-500/30 text-white"
            : theme === "light"
              ? "bg-slate-300 ring-1 ring-neutral-400/40 text-neutral-600"
              : "bg-neutral-700 ring-1 ring-neutral-500/40 text-neutral-300"
        }`}
      >
        {proj.title[0]}
      </div>

      {/* Date */}
      <p className="text-[11px] font-monospace text-muted-foreground mb-1.5 tracking-wide flex items-center gap-2">
        <span style={{ color: "#98d898" }}>{proj.dateRange}</span>
        {isActive && (
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot inline-block" />
            Active
          </span>
        )}
      </p>

      {/* Card */}
      <div
        className={`p-4 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg
        ${
          proj.featured
            ? "border-emerald-500/30 dark:border-emerald-500/25 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.06]"
            : theme === "light"
              ? "border-slate-300/80 bg-white/75 shadow-sm"
              : "border-neutral-700/50 bg-neutral-800/20"
        }`}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-bold font-jost leading-tight">
            {proj.title}
          </h3>
          {proj.featured && (
            <span className="text-[10px] font-monospace px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 shrink-0">
              FEATURED
            </span>
          )}
        </div>

        {Array.isArray(proj.description) ? (
          <ul className="space-y-1.5 text-base leading-relaxed font-raleway mb-3">
            {proj.description.map((item, j) => (
              <li key={j} className="flex gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 shrink-0 font-monospace mt-0.5 text-sm">
                  ›
                </span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-base leading-relaxed font-raleway text-muted-foreground mb-3">
            {proj.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 mb-3">
          {proj.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] font-monospace rounded bg-sky-600/80 dark:bg-sky-700/70 text-white"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {proj.githubLink && (
            <a
              href={proj.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-monospace font-semibold transition-colors duration-150
                ${theme === "light"
                  ? "text-sky-700 border-sky-200 bg-sky-50 hover:bg-sky-100"
                  : "text-sky-400 border-sky-800/50 bg-sky-900/20 hover:bg-sky-800/40"}`}
            >
              <FaGithub size={14} /> GitHub
            </a>
          )}
          {proj.demoLink &&
            (proj.demoLink.startsWith("/") ? (
              <Link
                to={proj.demoLink}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-monospace font-semibold transition-colors duration-150
                  ${theme === "light"
                    ? "text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
                    : "text-emerald-400 border-emerald-800/50 bg-emerald-900/20 hover:bg-emerald-800/40"}`}
              >
                <FaExternalLinkAlt size={12} /> Demo
              </Link>
            ) : (
              <a
                href={proj.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-monospace font-semibold transition-colors duration-150
                  ${theme === "light"
                    ? "text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
                    : "text-emerald-400 border-emerald-800/50 bg-emerald-900/20 hover:bg-emerald-800/40"}`}
              >
                <FaExternalLinkAlt size={12} /> Demo
              </a>
            ))}
          {proj.diagrams && proj.diagrams.length > 0 && (
            <Link
              to="/projects/homelab"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-monospace font-semibold transition-colors duration-150
                ${theme === "light"
                  ? "text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
                  : "text-emerald-400 border-emerald-800/50 bg-emerald-900/20 hover:bg-emerald-800/40"}`}
            >
              <FaSitemap size={13} /> Diagrams
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const { theme } = useTheme();

  usePageMeta(
    "Projects",
    "Cybersecurity, homelab, and software projects built by Sean Finch.",
  );

  const sorted = [...projects].sort(
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
          Work
        </p>
        <h1 className="relative text-5xl md:text-6xl font-jost font-extrabold bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent animate-gradient mb-3">
          Projects
        </h1>
        <p className="relative font-raleway text-muted-foreground text-sm max-w-xs mx-auto">
          Side projects, tools, and things I've built.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative w-full max-w-3xl mx-auto px-4 pb-16">
        <div className="absolute left-[1.35rem] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-400/80 via-green-500/40 to-teal-500/10" />
        {sorted.map((proj, i) => (
          <ProjectItem key={i} proj={proj} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Projects;

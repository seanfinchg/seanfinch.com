import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";
import { ProjectProps } from "../data/projects";
import { FaGithub, FaExternalLinkAlt, FaSitemap } from "react-icons/fa";
import {
  getCardClasses,
  getFeaturedProjectCardClasses,
} from "../utils/themeUtils";

interface ProjectCardProps extends ProjectProps {
  featured?: boolean;
  hideContent?: boolean;
  badgeLabel?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  githubLink,
  demoLink,
  dateRange,
  featured = false,
  hideContent = false,
  badgeLabel,
  diagrams,
}) => {
  const { theme } = useTheme();

  const linkClass =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-monospace font-semibold " +
    "transition-colors duration-150 " +
    (theme === "light"
      ? "text-sky-700 border-sky-200 bg-sky-50 hover:bg-sky-100"
      : "text-sky-400 border-sky-800/50 bg-sky-900/20 hover:bg-sky-800/40");

  const cardContent = (
    <div className="w-full mb-4 font-raleway">
      <div className="flex items-start justify-between mb-2 gap-4">
        <h2 className="text-3xl font-bold font-jost">{title}</h2>
        {hideContent && (
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-monospace text-sm font-bold transition-colors whitespace-nowrap">
            Details →
          </button>
        )}
      </div>
      {!hideContent && Array.isArray(description) && (
        <ul className="list-disc pl-5 space-y-2 mb-3 text-base leading-relaxed">
          {description.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
      {!hideContent && !Array.isArray(description) && (
        <p className="mb-3 text-base leading-relaxed">{description}</p>
      )}
      {!hideContent && (
        <>
          <h3 className="font-bold mb-1.5 font-monospace text-sm">
            Technologies employed:
          </h3>
          <div className="mb-3 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="inline-block bg-sky-600 dark:bg-sky-700 text-white rounded px-2 py-0.5 text-xs font-bold font-monospace transition-colors duration-150 hover:bg-sky-500 dark:hover:bg-sky-600 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </>
      )}
      {dateRange && (
        <p className="text-sm mb-3 italic font-monospace">{dateRange}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {!hideContent && githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <FaGithub size={14} /> GitHub
          </a>
        )}
        {!hideContent && demoLink && (
          <>
            {demoLink.startsWith("/") || demoLink.startsWith("#") ? (
              <Link to={demoLink} className={linkClass}>
                <FaExternalLinkAlt size={12} /> Demo
              </Link>
            ) : (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <FaExternalLinkAlt size={12} /> Demo
              </a>
            )}
          </>
        )}
        {!hideContent && diagrams && diagrams.length > 0 && (
          <Link to="/projects/homelab" className={linkClass}>
            <FaSitemap size={13} /> Diagrams
          </Link>
        )}
      </div>
    </div>
  );

  const hoverClasses =
    "transition-all duration-200 hover:-translate-y-1 hover:shadow-xl";

  const regularClasses = `w-full md:w-1/2 mb-8 p-4 rounded-lg shadow-lg border-2 ${getCardClasses(theme)} ${hoverClasses}`;

  const featuredClasses = `relative w-full md:w-1/2 mb-8 p-4 rounded-lg shadow-2xl border-4 ${getFeaturedProjectCardClasses(theme)} font-raleway ${hoverClasses} cursor-pointer`;

  const wrapperClasses = featured ? featuredClasses : regularClasses;

  return (
    <div className={wrapperClasses}>
      {featured && (
        <div className="absolute -top-4 left-4 bg-green-700 text-white px-4 py-1 rounded-full text-sm font-bold font-monospace">
          ⭐ {badgeLabel || title}
        </div>
      )}
      <div className={featured ? "pt-4" : ""}>{cardContent}</div>
    </div>
  );
};

export default ProjectCard;

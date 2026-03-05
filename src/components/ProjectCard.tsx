import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";
import { ProjectProps } from "../data/projects";
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

  const cardContent = (
    <div className="w-full mb-4 font-raleway">
      <div className="flex items-start justify-between mb-2 gap-4">
        <h2 className="text-3xl font-bold font-jost">{title}</h2>
        {hideContent && (
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded font-monospace text-base font-bold transition-colors whitespace-nowrap">
            Click for details
          </button>
        )}
      </div>
      {!hideContent && Array.isArray(description) && (
        <ul className="list-disc pl-5 space-y-2 mb-2">
          {description.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
      {!hideContent && !Array.isArray(description) && (
        <p className="mb-2">{description}</p>
      )}
      {!hideContent && (
        <>
          <h3 className="font-bold mb-1 font-monospace">
            Technologies employed:
          </h3>
          <div className="mb-2 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="inline-block bg-blue-500 text-light-mode rounded-full px-2 py-1 text-xs font-bold font-monospace"
              >
                {tech}
              </span>
            ))}
          </div>
        </>
      )}
      {dateRange && (
        <p className="text-sm mb-2 italic font-monospace">{dateRange}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {!hideContent && githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline font-monospace"
          >
            GitHub
          </a>
        )}
        {!hideContent && demoLink && (
          <>
            {demoLink.startsWith("/") || demoLink.startsWith("#") ? (
              <Link
                to={demoLink}
                className="text-blue-500 underline font-monospace"
              >
                Demonstration
              </Link>
            ) : (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline font-monospace"
              >
                Demonstration
              </a>
            )}
          </>
        )}
        {!hideContent && diagrams && diagrams.length > 0 && (
          <Link
            to="/projects/homelab"
            className="text-blue-500 underline font-monospace"
          >
            Diagrams
          </Link>
        )}
      </div>
    </div>
  );

  const regularClasses = `w-full md:w-1/2 mb-8 p-4 rounded-lg shadow-lg border-2 ${getCardClasses(
    theme,
  )}`;

  const featuredClasses = `relative w-full md:w-1/2 mb-8 p-4 rounded-lg shadow-2xl border-4 ${getFeaturedProjectCardClasses(
    theme,
  )} font-raleway`;

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

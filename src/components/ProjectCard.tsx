import React from "react";
import { useTheme } from "../contexts/themeContext";
import { ProjectProps } from "../data/projects";
import FeaturedCard from "./FeaturedCard";

interface ProjectCardProps extends ProjectProps {
  featured?: boolean;
  hideContent?: boolean;
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
}) => {
  const { theme } = useTheme();

  const cardContent = (
    <div className="w-full mb-4 font-raleway">
      <h2 className="text-2xl font-bold mb-2 font-jost">{title}</h2>
      {!hideContent && <p className="mb-2">{description}</p>}
      {!hideContent && (
        <div className="mb-2 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-block bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold font-monospace"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      {dateRange && (
        <p className="text-sm mb-2 italic font-monospace">{dateRange}</p>
      )}
      {!hideContent && (
        <div className="flex flex-wrap gap-2">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline font-monospace"
            >
              GitHub
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline font-monospace"
            >
              Demo
            </a>
          )}
        </div>
      )}
    </div>
  );

  const baseClasses = `w-full md:w-1/2 mb-8 p-4 rounded-lg shadow-lg border-2 ${
    theme === "light"
      ? "border-light-mode text-dark-mode bg-white"
      : "border-dark-mode text-light-mode bg-gray-900"
  }`;

  return featured ? (
    <FeaturedCard type="project" label={title} className={baseClasses}>
      {cardContent}
    </FeaturedCard>
  ) : (
    <div className={baseClasses}>{cardContent}</div>
  );
};

export default ProjectCard;

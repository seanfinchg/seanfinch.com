import React from "react";
import { useTheme } from "../contexts/themeContext";
import { ProjectProps } from "../data/projects";

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
      {hideContent && (
        <div className="text-sm italic text-gray-500">
          Click to view more details...
        </div>
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
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline font-monospace"
          >
            Demonstration
          </a>
        )}
      </div>
    </div>
  );

  const regularClasses = `w-full md:w-1/2 mb-8 p-4 rounded-lg shadow-lg border-2 ${
    theme === "light"
      ? "border-dark-mode text-dark-mode bg-light-mode"
      : "border-light-mode text-light-mode bg-dark-mode"
  }`;

  const featuredClasses = `relative w-full md:w-1/2 mb-8 p-4 rounded-lg shadow-2xl border-4 ${
    theme === "light"
      ? "border-green-500 bg-green-50 text-dark-mode"
      : "border-green-400 bg-green-900/20 text-light-mode"
  }`;

  const wrapperClasses = featured ? featuredClasses : regularClasses;

  return (
    <div className={wrapperClasses}>
      {featured && (
        <div className="absolute -top-4 left-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold font-monospace">
          ⭐ {title}
        </div>
      )}
      <div className={featured ? "pt-4" : ""}>{cardContent}</div>
    </div>
  );
};

export default ProjectCard;

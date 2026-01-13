import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";
import { projects, ProjectProps } from "../data/projects";

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  technologies,
  githubLink,
  demoLink,
  dateRange,
}) => {
  const { theme } = useTheme();

  {
    projects.map((proj, i) => (
      <ProjectCard key={i} {...proj} featured={proj.featured} />
    ));
  }

  return (
    <div
      className={`w-full md:w-1/2 mb-8 p-4 border-${theme === "light" ? "light-mode" : "dark-mode"} border-2 rounded-lg text-${theme === "light" ? "dark-mode" : "light-mode"} m-4 font-raleway shadow-lg`}
    >
      <h2 className="text-2xl font-bold mb-2 font-jost">{title}</h2>
      <p className="mb-2">{description}</p>
      <h3 className="font-bold mb-1 font-monospace">Technologies employed:</h3>
      <div className="mb-2">
        {technologies.map((tech) => (
          <span
            className="inline-block bg-blue-500 text-light-mode rounded-full px-2 py-1 text-xs font-bold mr-3 mb-2 font-monospace"
            key={tech}
          >
            {tech}
          </span>
        ))}
      </div>
      {dateRange && (
        <p className="text-sm mb-2 italic font-monospace">{dateRange}</p>
      )}
      {githubLink && (
        <a
          href={githubLink}
          className="text-blue-500 underline font-monospace mx-1 my-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      )}
      {demoLink && (
        <a
          href={demoLink}
          className="text-blue-500 underline font-monospace mx-1 my-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Demonstration
        </a>
      )}
    </div>
  );
};

const Projects: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Projects - Sean Finch • SoCal";
  }, []);

  return (
    <div
      className={`flex flex-col items-center ${theme === "light" ? "bg-light-mode text-dark-mode" : "bg-dark-mode text-light-mode"} pt-16 p-4 font-roboto-slab`}
    >
      <h1 className="text-4xl font-bold mb-8 font-jost">Projects</h1>
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
};

export default Projects;

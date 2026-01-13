import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

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
        <ProjectCard key={index} {...project} featured={project.featured} />
      ))}
    </div>
  );
};

export default Projects;

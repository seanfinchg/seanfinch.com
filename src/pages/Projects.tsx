import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";

interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  demoLink: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  technologies,
  githubLink,
  demoLink,
}) => {
  const { theme } = useTheme();

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
      {githubLink && (
        <a
          href={githubLink}
          className="text-blue-500 underline font-monospace"
          target="_blank"
          rel="noopener noreferrer"
        >
          Access project code
        </a>
      )}
      {demoLink && (
        <a
          href={demoLink}
          className="text-blue-500 underline font-monospace"
          target="_blank"
          rel="noopener noreferrer"
        >
          Demo here
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

  const projects: ProjectProps[] = [
    {
      title: "Personal Website",
      description:
        "This website, constructed utilizing React, Tailwind CSS, and TypeScript, functions as a professional portfolio to exhibit my range of projects and technical abilities. It represents my proficiency in contemporary web development technologies and responsive design principles.",
      technologies: [
        "JavaScript",
        "HTML",
        "React",
        "Tailwind CSS",
        "TypeScript",
      ],
      githubLink: "https://github.com/seanfinchg/seanfinch.com",
      demoLink: "",
    },
    {
      title: "Homelab Initiatives",
      description:
        "My homelab initiatives encompass the establishment of essential records backup, photo backup, and home video backup systems for my family. I have previously utilized Ubuntu Server and TrueNAS Scale, and currently, I am operating Proxmox.",
      technologies: ["Ubuntu Server", "TrueNAS Scale", "Proxmox", "Docker"],
      githubLink: "",
      demoLink: "",
    },
    {
      title: "BiblioConnect",
      description:
        "A book recommendation application that allows users to discover new books based on their preferences. The application was developed using React, Express, and MongoDB. Developed for PawHacks 2024 alongside Jonathan Ding, Eric Huang, and Shishir Pokhrel.",
      technologies: [
        "JavaScript",
        "HTML",
        "React",
        "Tailwind CSS",
        "TypeScript",
        "Express",
        "MongoDB",
      ],
      githubLink: "https://github.com/seanfinchg/BiblioConnect",
      demoLink: "",
    },
  ];

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

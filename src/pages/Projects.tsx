import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";

interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  demoLink: string;
  dateRange: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  technologies,
  githubLink,
  demoLink,
  dateRange,
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

  const projects: ProjectProps[] = [
    {
      title: "Storefront Website",
      description:
        "This responsive website was designed and developed to showcase baked goods and ensure accessibility across devices. Dynamic features were implemented to enhance user engagement and provide seamless navigation, creating a user-friendly shopping experience. Additionally, a robust checkout system was integrated to streamline order tracking and facilitate efficient product delivery, ensuring a smooth and satisfying experience for customers.",
      technologies: ["React.js", "Tailwind", "TypeScript"],
      githubLink: "https://github.com/seanfinchg/finchfamilyfudge.com",
      demoLink: "https://finchfamilyfudge.com/",
      dateRange: "Nov 2024 – Present",
    },
    {
      title: "ThreeTrios",
      description:
        "ThreeTrios is a strategic card game developed with a focus on Object-Oriented Design principles, leveraging abstraction and polymorphism to enhance code reusability and user engagement. The project features a modular MVC architecture built with encapsulation, ensuring scalability and simplifying the integration of new features. Comprehensive unit and integration tests were implemented to validate game logic, delivering a robust and error-free gameplay experience while maintaining high development standards.",
      technologies: ["Java", "JUnit", "Swing"],
      githubLink: "",
      demoLink: "",
      dateRange: "October 2024 – December 2024",
    },
    {
      title: "Personal Website",
      description:
        "This website, built using React, Tailwind CSS, and TypeScript, serves as a professional portfolio to highlight my projects and technical expertise. It features a responsive design to enhance accessibility and personal branding, integrates light and dark mode with device theme detection and a manual toggle for user personalization, and leverages modern web technologies to optimize performance, reducing load times and improving the overall user experience.",
      technologies: ["React.js", "Tailwind", "TypeScript"],
      githubLink: "https://github.com/seanfinchg/seanfinch.com",
      demoLink: "https://seanfinch.com/",
      dateRange: "March 2024 – Present",
    },
    {
      title: "Homelab Infrastructue",
      description:
        "My homelab initiatives focus on creating efficient and reliable backup systems for personal records, family photos, and home videos. Currently, I leverage Proxmox for home virtualization, streamlining backup management and enhancing data security. Previously, I have worked with Ubuntu Server and TrueNAS Scale. I also actively explore various platforms to optimize system performance, scalability, and future-proofing, ensuring a robust and adaptable home infrastructure.",
      technologies: ["Proxmox", "Docket", "CasaOS", "Caddy"],
      githubLink: "",
      demoLink: "",
      dateRange: "June 2022 – Present",
    },
    {
      title: "BiblioConnect",
      description:
        "A book recommendation application that allows users to discover new books based on their preferences. The application was developed using React.js, Express.js, and SQLite. Developed for PawHacks 2024 alongside Jonathan Ding, Eric Huang, and Shishir Pokhrel. Currently a work in progress.",
      technologies: [
        "TypeScript",
        "JavaScript",
        "HTML",
        "React.js",
        "Tailwind CSS",
        "Express.js",
        "SQLite",
      ],
      githubLink: "https://github.com/Biblio-Connect/BiblioConnect",
      demoLink: "https://biblioconnect.seanfinch.com/",
      dateRange: "March 2024 – March 2024",
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

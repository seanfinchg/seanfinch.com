export interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  demoLink: string;
  dateRange: string;
  featured?: boolean;
}

export const projects: ProjectProps[] = [
  {
    title: "Homelab Infrastructue",
    description:
      "Production-grade virtualized environment powered by TrueNAS SCALE with Docker containerization for 15+ self-hosted services. Implements ZFS-based RAID redundancy with automated snapshot scheduling for zero data loss. Secured external access via Tailscale mesh VPN and Nginx reverse proxy with certificate-based authentication and TLS encryption.",
    technologies: ["TrueNAS SCALE", "Docker", "Tailscale", "Nginx"],
    githubLink: "",
    demoLink: "",
    dateRange: "June 2022 – Present",
    featured: true,
  },
  {
    title: "FTP Client",
    description:
      "Developed a basic FTP Client to interface with a server to send, receive, and transfer files between the server and the client.",
    technologies: ["Python"],
    githubLink: "",
    demoLink: "",
    dateRange: "January 2024 – January 2024",
  },
  {
    title: "TCP Client",
    description:
      "Developed a basic TCP Client to interface with a server to solve a Worldle-like word game.",
    technologies: ["Python"],
    githubLink: "",
    demoLink: "",
    dateRange: "January 2024 – January 2024",
  },
  {
    title: "ThreeTrios",
    description:
      "ThreeTrios is a strategic card game developed with a focus on Object-Oriented Design principles, leveraging abstraction and polymorphism to enhance code reusability and user engagement. The project features a modular MVC architecture built with encapsulation, ensuring scalability and simplifying the integration of new features. Comprehensive unit and integration tests were implemented to validate game logic, delivering a robust and error-free gameplay experience while maintaining high development standards.",
    technologies: ["Java", "JUnit", "Swing"],
    githubLink: "",
    demoLink: "",
    dateRange: "December 2024 – December 2024",
  },
  {
    title: "NUFS File System",
    description:
      "Engineered an in-memory filesystem using the FUSE API, supporting over 20 file operations. Designed modular components for efficient bitmap, block, and storage management, facilitating streamlined file allocation and system performance.",
    technologies: ["C", "FUSE"],
    githubLink: "",
    demoLink: "",
    dateRange: "December 2024 – December 2024",
  },
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
    title: "Mini-Shell",
    description:
      "Developed a custom Linux shell in C, supporting built-in commands, piping, and input tokenization with advanced features like quoted strings and special characters. Integrated POSIX system calls for process execution and inter-process communication, ensuring robust functionality.",
    technologies: ["C", "Python", "POSIX"],
    githubLink: "",
    demoLink: "",
    dateRange: "October 2024 – October 2024",
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
  {
    title: "Personal Website",
    description:
      "This website, built using React, Tailwind CSS, and TypeScript, serves as a professional portfolio to highlight my projects and technical expertise. It features a responsive design to enhance accessibility and personal branding, integrates light and dark mode with device theme detection and a manual toggle for user personalization, and leverages modern web technologies to optimize performance, reducing load times and improving the overall user experience.",
    technologies: ["React.js", "Tailwind", "TypeScript"],
    githubLink: "https://github.com/seanfinchg/seanfinch.com",
    demoLink: "https://seanfinch.com/",
    dateRange: "March 2024 – Present",
  },
];

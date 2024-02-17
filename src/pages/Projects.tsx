import { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";

function Projects() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Projects - Sean Finch • SoCal";
  }, []);

  return (
    <div className={`flex flex-col items-center ${theme === 'dark' ? 'text-white' : 'text-black'} bg-${theme === 'dark' ? 'gray-900' : 'gray-200'} pt-16 p-4 font-roboto-slab`}>
      <h1 className="text-4xl font-bold mb-8 font-jost">Projects</h1>

      <div className={`w-full md:w-1/2 mb-8 p-4 bg-${theme === 'dark' ? 'gray-950' : 'white'} border-${theme === 'dark' ? 'gray-700' : 'gray-300'} border-2 rounded-lg text-${theme === 'dark' ? 'white' : 'black'} m-4 font-raleway shadow-lg`}>
        <h2 className="text-2xl font-bold mb-2 font-jost">Personal Website</h2>
        <p className="mb-2">
          This website, constructed utilizing React, Tailwind CSS, and TypeScript, functions as a professional portfolio to exhibit my range of projects and technical abilities. It represents my proficiency in contemporary web development technologies and responsive design principles.
        </p>
        <p className="mb-2">
          The development of this project facilitated the enhancement of my skills in managing state in a React application and the creation of responsive web designs.
        </p>
        <h3 className="font-bold mb-1 font-monospace">Technologies employed:</h3>
        <div className="mb-2">
          {["JavaScript", "HTML", "React", "Tailwind CSS", "TypeScript"].map((tech) => (
            <span className="inline-block bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold mr-3 mb-2 font-monospace" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <a href="https://github.com/seanfinchg/seanfinch.com" className="text-blue-500 underline font-monospace" target="_blank" rel="noopener noreferrer">
          Access project code
        </a>
      </div>

      <div className={`w-full md:w-1/2 p-4 bg-${theme === 'dark' ? 'gray-950' : 'white'} border-${theme === 'dark' ? 'gray-700' : 'gray-300'} border-2 rounded-lg text-${theme === 'dark' ? 'white' : 'black'} m-4 font-raleway shadow-lg`}>
        <h2 className="text-2xl font-bold mb-2 font-jost">Homelab Initiatives</h2>
        <p className="mb-2">
          My homelab initiatives encompass the establishment of essential records backup, photo backup, and home video backup systems for my family. I have previously utilized Ubuntu Server and TrueNAS Scale, and currently, I am operating Proxmox.
        </p>
        <p className="mb-2">
          These initiatives have imparted practical experience in the setup and management of home servers, the execution of data backup and recovery procedures, and the operation of various server operating systems.
        </p>
        <h3 className="font-bold mb-1 font-monospace">Technologies employed:</h3>
        <div className="mb-2">
          {["Ubuntu Server", "TrueNAS Scale", "Proxmox", "Docker"].map((tech) => (
            <span className="inline-block bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold mr-3 mb-2 font-monospace" key={tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
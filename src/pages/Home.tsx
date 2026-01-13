import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";
import { useNavigate } from "react-router-dom";
import {
  FaGithub,
  // FaInstagram,
  // FaReddit,
  FaLinkedin,
  // FaSpotify,
  // FaYoutube,
} from "react-icons/fa";
import { experiences } from "../data/experiences";
import { projects } from "../data/projects";

interface SocialMediaButtonProps {
  url: string;
  children: React.ReactNode;
}

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({
  url,
  children,
}) => {
  const { theme } = useTheme();
  const buttonClass = `flex justify-center mx-2 my-1 px-4 py-2 text-base font-jost font-medium border border-transparent rounded-lg hover:border-indigo-600 cursor-pointer transition-colors duration-200 ${theme === "light" ? "bg-ultra-light-mode text-ultra-dark-mode" : "bg-ultra-dark-mode text-light-mode"}`;

  const openLinkInNewTab = () => {
    window.open(url, "_blank");
  };

  return (
    <button className={buttonClass} onClick={openLinkInNewTab}>
      {children}
    </button>
  );
};

function Home() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home - Sean Finch • SoCal";
  }, []);

  const socialMediaLinks = [
    { url: "https://github.com/seanfinchg", icon: <FaGithub size={30} /> },
    // {
    //   url: "https://www.instagram.com/seanfinchh/",
    //   icon: <FaInstagram size={30} />,
    // },
    {
      url: "https://www.linkedin.com/in/sean-finch-g",
      icon: <FaLinkedin size={30} />,
    },
    // {
    //   url: "https://open.spotify.com/user/31zrqevhky5vln3wuz3uuixspku4",
    //   icon: <FaSpotify size={30} />,
    // },
    // {
    //   url: "https://www.youtube.com/channel/UC-0Oz_dgX4-MzMO_KNH7XuA",
    //   icon: <FaYoutube size={30} />,
    // },
  ];

  const featuredExperience = experiences.find((exp) => exp.featured);
  const featuredProject = projects.find((proj) => proj.featured);

  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const handleNavigate = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <div
      className={`flex justify-center ${theme === "light" ? "bg-light-mode text-ultra-dark-mode" : "bg-dark-mode text-light-mode"}`}
    >
      <div className="w-full">
        <div className="flex flex-col items-center text-center">
          <p className="mt-20 mb-12 text-7xl font-jost font-extrabold">
            Sean Finch
          </p>
          <p className="mb-4 mx-4 text-l font-raleway font-bold">
            Seeking Fall 2026 Cybersecurity/Infrastructure Co-op
          </p>
          <p className="mb-2 mx-4 font-raleway font-bold">
            B.S. Cybersecurity | Music Minor
          </p>
          <p className="mb-4 mx-4 font-raleway font-bold">
            Northeastern University | Class of 2027
          </p>
          <p className="mb-8 mx-4 font-raleway font-bold">
            Student, Homelabber, Musician
          </p>
        </div>
        <div>
          <div className="flex justify-center flex-wrap">
            {socialMediaLinks.map((link, index) => (
              <SocialMediaButton key={index} url={link.url}>
                {link.icon}
              </SocialMediaButton>
            ))}
          </div>
          <div className="my-2.5 flex justify-center items-center flex-wrap">
            <SocialMediaButton url="/resume.pdf">Resume</SocialMediaButton>
            {/* <a href="https://www.buymeacoffee.com/seanfinch">
              <img
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee!&emoji=☕&slug=seanfinch&button_colour=FF5F5F&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00"
                width="200"
                height="auto"
              />
            </a> */}
            <SocialMediaButton url="/music_resume.pdf">
              Music Resume
            </SocialMediaButton>
          </div>
        </div>

        {/* Featured Section */}
        {(featuredExperience || featuredProject) && (
          <div className="mt-12 mb-8 px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 font-jost">
              Featured
            </h2>

            {/* Featured Experience */}
            {featuredExperience && (
              <div
                className={`mb-6 p-6 border-4 ${
                  theme === "light"
                    ? "border-blue-500 bg-blue-50"
                    : "border-blue-400 bg-blue-900/20"
                } rounded-lg shadow-2xl relative cursor-pointer hover:scale-[1.02] transition-transform group`}
                onClick={() => handleNavigate("/experience")}
              >
                <div className="absolute -top-4 left-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold font-monospace">
                  ⭐ UPCOMING ROLE
                </div>
                <h3 className="text-2xl font-bold mb-1 mt-2 font-jost">
                  {featuredExperience.title}
                </h3>
                <p className="text-xl font-semibold mb-1 font-jost">
                  {featuredExperience.company}
                </p>
                <p className="text-sm italic mb-3 font-monospace">
                  {featuredExperience.location} | {featuredExperience.dateRange}
                </p>
                <p className="font-raleway">
                  {truncateText(featuredExperience.description[0], 150)}
                </p>
                <p className="mt-3 text-blue-500 font-semibold text-sm group-hover:underline">
                  Click to learn more →
                </p>
              </div>
            )}

            {/* Featured Project */}
            {featuredProject && (
              <div
                className={`mb-6 p-6 border-4 ${
                  theme === "light"
                    ? "border-green-500 bg-green-50"
                    : "border-green-400 bg-green-900/20"
                } rounded-lg shadow-2xl relative cursor-pointer hover:scale-[1.02] transition-transform group`}
                onClick={() => handleNavigate("/projects")}
              >
                <div className="absolute -top-4 left-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold font-monospace">
                  ⭐ FEATURED PROJECT
                </div>
                <h3 className="text-2xl font-bold mb-2 mt-2 font-jost">
                  {featuredProject.title}
                </h3>
                <p className="font-raleway mb-3">
                  {truncateText(featuredProject.description, 180)}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {featuredProject.technologies
                    .slice(0, 4)
                    .map((tech, index) => (
                      <span
                        key={index}
                        className="inline-block bg-green-500 text-white rounded-full px-3 py-1 text-xs font-bold font-monospace"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
                <p className="mt-3 text-green-600 font-semibold text-sm group-hover:underline">
                  Click to learn more →
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

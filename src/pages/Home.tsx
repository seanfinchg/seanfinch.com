import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";
import {
  FaGithub,
  FaInstagram,
  FaReddit,
  FaLinkedin,
  FaSpotify,
  FaYoutube,
} from "react-icons/fa";

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
  useEffect(() => {
    document.title = "Home - Sean Finch • SoCal";
  }, []);

  const socialMediaLinks = [
    { url: "https://github.com/seanfinchg", icon: <FaGithub size={30} /> },
    {
      url: "https://www.instagram.com/straight.up.sean/",
      icon: <FaInstagram size={30} />,
    },
    {
      url: "https://www.reddit.com/user/mk7sean",
      icon: <FaReddit size={30} />,
    },
    {
      url: "https://www.linkedin.com/in/sean-finch-g",
      icon: <FaLinkedin size={30} />,
    },
    {
      url: "https://open.spotify.com/user/31zrqevhky5vln3wuz3uuixspku4",
      icon: <FaSpotify size={30} />,
    },
    {
      url: "https://www.youtube.com/channel/UC-0Oz_dgX4-MzMO_KNH7XuA",
      icon: <FaYoutube size={30} />,
    },
  ];

  return (
    <div
      className={`flex justify-center ${theme === "light" ? "bg-light-mode text-ultra-dark-mode" : "bg-dark-mode text-light-mode"}`}
    >
      <div className="w-full">
        <div className="flex flex-col items-center text-center">
          <p className="mt-20 mb-12 text-7xl font-jost font-extrabold">
            Sean Finch
          </p>
          <p className="mb-12 text-xs font-jost font-extrabold">
            the one and only
          </p>
          <p className="mb-4 mx-4 font-raleway font-bold">
            Computer Science at Northeastern University c/o 2027
          </p>
          <p className="mb-8 mx-4 font-raleway font-bold">
            Student, Homelabber, Musician, and more
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
          <div className="my-2.5 flex justify-center flex-wrap">
            <SocialMediaButton url="/resume.pdf">Resume</SocialMediaButton>
            <a href="https://www.buymeacoffee.com/seanfinch"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee!&emoji=☕&slug=seanfinch&button_colour=FF5F5F&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00" /></a>
            <SocialMediaButton url="/music_resume.pdf">
              Music Resume
            </SocialMediaButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

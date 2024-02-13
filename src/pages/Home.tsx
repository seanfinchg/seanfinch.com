import React from "react";
import { FaGithub, FaInstagram, FaReddit, FaLinkedin, FaSpotify, FaYoutube } from "react-icons/fa";
import { useTheme } from "../contexts/themeContext";

interface SocialMediaButtonProps {
  url: string;
  children: React.ReactNode;
}

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({ url, children }) => {
  const { theme } = useTheme();
  const buttonClass = `flex justify-center mx-2 my-1 px-4 py-2 text-base font-medium border border-transparent rounded-lg hover:border-indigo-600 cursor-pointer transition-colors duration-200 ${
    theme === "light" ? "bg-ultra-light-mode text-ultra-dark-mode" : "bg-ultra-dark-mode text-light-mode"
  }`;

  const openLinkInNewTab = () => {
    window.open(url, "_blank");
  };

  return <button className={buttonClass} onClick={openLinkInNewTab}>{children}</button>;
};

function Home() {
  const { theme } = useTheme();

  return (
    <div className={`flex justify-center ${theme === "light" ? "bg-light-mode text-ultra-dark-mode" : "bg-dark-mode text-light-mode"}`}>
      <div className="w-full">
        <div className="flex flex-col items-center text-center">
          <p className="mt-20 mb-12 text-7xl font-jost font-extrabold">Sean Finch</p>
          <p className="mb-12 text-xs font-jost font-extrabold">the one and only</p>
          <p className="mb-4 mx-4 font-raleway font-bold">Computer Science @ Northeastern University c/o 2027</p>
          <p className="mb-8 mx-4 font-raleway font-bold">Student, Homelabber, Musician, and more</p>
        </div>
        <div>
          <div className="flex justify-center flex-wrap">
            <SocialMediaButton url="https://github.com/seanfinchg"><FaGithub size={30} /></SocialMediaButton>
            <SocialMediaButton url="https://www.instagram.com/straight.up.sean/"><FaInstagram size={30} /></SocialMediaButton>
            <SocialMediaButton url="https://www.reddit.com/user/mk7sean"><FaReddit size={30} /></SocialMediaButton>
            <SocialMediaButton url="https://www.linkedin.com/in/sean-finch-21803927b/"><FaLinkedin size={30} /></SocialMediaButton>
            <SocialMediaButton url="https://open.spotify.com/user/31zrqevhky5vln3wuz3uuixspku4"><FaSpotify size={30} /></SocialMediaButton>
            <SocialMediaButton url="https://www.youtube.com/channel/UC-0Oz_dgX4-MzMO_KNH7XuA"><FaYoutube size={30} /></SocialMediaButton>
          </div>
          <div className="my-2.5 flex justify-center flex-wrap">
            <SocialMediaButton url="https://300021720.wixsite.com/aotaportfolio">Music Portfolio</SocialMediaButton>
            <SocialMediaButton url="https://docs.google.com/document/d/19Yhwee36co-cGrTDsVJUwNw30nKb_iQjcCVFIlCAKtg/edit?usp=sharing">Resume</SocialMediaButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { getThemeClasses } from "../utils/themeUtils";

const Contact: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Contact - Sean Finch • SoCal";
  }, []);

  const openLinkInNewTab = (url: string): void => {
    window.open(url, "_blank");
  };

  const buttonClass = `flex items-center justify-center mx-2 my-1 px-4 py-2 text-base font-jost font-medium border border-transparent rounded-lg cursor-pointer transition-colors duration-200`;

  return (
    <div
      className={`flex justify-center ${getThemeClasses(theme)}`}
    >
      <div className="w-full mx-4 md:mx-0">
        <div className="flex flex-col items-center text-center mt-16">
          <h1 className="text-4xl font-bold mb-4 font-jost">Contact Me</h1>
          <p className="mb-6 text-muted-foreground font-raleway">
            Reach me directly — I check both regularly.
          </p>
          <div
            className={`w-full md:w-1/2 mb-8 p-6 border-2 rounded-lg m-4 font-raleway shadow-lg
              ${theme === "light" ? "border-ultra-light-mode" : "border-ultra-dark-mode"}`}
          >
            <div className="mb-6 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-3 font-jost">Email</h2>
              <button
                onClick={() => openLinkInNewTab("mailto:contact@seanfinch.com")}
                className={`${buttonClass} transition-all duration-150 hover:scale-105
                  ${theme === "light" ? "bg-ultra-light-mode text-ultra-dark-mode hover:border-indigo-600" : "bg-ultra-dark-mode text-light-mode hover:border-indigo-600"}`}
              >
                <FaEnvelope size={28} className="mr-2" />
                contact@seanfinch.com
              </button>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-3 font-jost">LinkedIn</h2>
              <button
                onClick={() =>
                  openLinkInNewTab("https://www.linkedin.com/in/sean-finch-g")
                }
                className={`${buttonClass} transition-all duration-150 hover:scale-105
                  ${theme === "light" ? "bg-linkedin text-light-mode hover:border-ultra-dark-mode" : "bg-linkedin text-light-mode hover:border-ultra-light-mode"}`}
              >
                <FaLinkedin size={28} className="mr-2" />
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
